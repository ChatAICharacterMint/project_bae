import { useEffect, useRef } from 'react';
import config from 'config';

const useDidStream = () => {
  const DID_API_KEY = config.REACT_APP_DID_API_KEY;
  const DID_API_URL = "https://api.d-id.com";
  const maxRetryCount = 3;
  const maxDelaySec = 4;
  const idleVideo = 'or_idle.mp4';

  // @ts-ignore
  const RTCPeerConnection = ( window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection ).bind(window);

  let peerConnection: any;
  let streamId: any;
  let sessionId: any;
  let sessionClientAnswer: any;

  let statsIntervalId: any;
  let videoIsPlaying: any;
  let lastBytesReceived: any;
  
  const talkVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    connect();

    return () => {
      destory();
    }
  }, [])

  const connect = async () => {
    // check connect status
    if (peerConnection && peerConnection.connectionState === 'connected') {
      return;
    }
  
    stopAllStreams();
    closePC();
  
    const sessionResponse = await fetchWithRetries(`${DID_API_URL}/talks/streams`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: 'https://d-id-public-bucket.s3.amazonaws.com/or-roman.jpg',
      }),
    });
  
    const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json();
    streamId = newStreamId;
    sessionId = newSessionId;
  
    try {
      sessionClientAnswer = await createPeerConnection(offer, iceServers);
    } catch (e) {
      console.log('error during streaming setup', e);
      stopAllStreams();
      closePC();
      return;
    }
  
    const sdpResponse = await fetch(`${DID_API_URL}/talks/streams/${streamId}/sdp`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: sessionClientAnswer,
        session_id: sessionId,
      }),
    });
  };

  const destory = async () => {
    await fetch(`${DID_API_URL}/talks/streams/${streamId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${DID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    });
  
    stopAllStreams();
    closePC();
  };

  const talkDid = async (text: string) => {
    // connectionState not supported in firefox
    if (peerConnection?.signalingState === 'stable' || peerConnection?.iceConnectionState === 'connected') {
      const talkResponse = await fetchWithRetries(`${DID_API_URL}/talks/streams/${streamId}`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${DID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: {
            type: 'text',
            ssml: 'true',
            provider: {
              type: 'microsoft',
              voice_id: 'en-US-JennyNeural'
            },
            input: text
          },
          driver_url: 'bank://lively/',
          config: {
            stitch: true,
          },
          session_id: sessionId,
        }),
      });
    }
  };

  function onIceCandidate(event: any) {
    console.log('onIceCandidate', event);
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
  
      fetch(`${DID_API_URL}/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${DID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      });
    }
  }
  function onIceConnectionStateChange() {
    if (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed') {
      stopAllStreams();
      closePC();
    }
  }
  function onVideoStatusChange(videoIsPlaying: any, stream: any) {
    if (videoIsPlaying) {
      const remoteStream = stream;
      setVideoElement(remoteStream);
    } else {
      playIdleVideo();
    }
  }
  function onTrack(event: any) {
  
    if (!event.track) return;
  
    statsIntervalId = setInterval(async () => {
      const stats = await peerConnection.getStats(event.track);
      stats.forEach((report: any) => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          const videoStatusChanged = videoIsPlaying !== report.bytesReceived > lastBytesReceived;
  
          if (videoStatusChanged) {
            videoIsPlaying = report.bytesReceived > lastBytesReceived;
            onVideoStatusChange(videoIsPlaying, event.streams[0]);
          }
          lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }
  async function createPeerConnection(offer: any, iceServers: any) {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
      peerConnection.addEventListener('icecandidate', onIceCandidate, true);
      peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
      peerConnection.addEventListener('track', onTrack, true);
    }
  
    await peerConnection.setRemoteDescription(offer);
    console.log('set remote sdp OK');
  
    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('create local sdp OK');
  
    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');
  
    return sessionClientAnswer;
  }
  function closePC(pc = peerConnection) {
    if (!pc) return;
    console.log('stopping peer connection');
    pc.close();
    pc.removeEventListener('icecandidate', onIceCandidate, true);
    pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
    pc.removeEventListener('track', onTrack, true);
    clearInterval(statsIntervalId);
    console.log('stopped peer connection');
    if (pc === peerConnection) {
      peerConnection = null;
    }
  }

  function setVideoElement(stream: any) {
    if(!talkVideo.current) return;
    if (!stream) return;
    console.log('playing stream')
    talkVideo.current.srcObject = stream;
    talkVideo.current.loop = false;
  
    // safari hotfix
    if (talkVideo.current.paused) {
      talkVideo.current
        .play()
        .then((_) => {})
        .catch((e) => {});
    }
  }
  
  function playIdleVideo() {
    if(!talkVideo.current) return;
    talkVideo.current.srcObject = null;
    talkVideo.current.src = idleVideo;
    talkVideo.current.loop = true;

    if (talkVideo.current.paused) {
      talkVideo.current
        .play()
        .then((_) => {})
        .catch((e) => {});
    }
  }
  
  function stopAllStreams() {
    if(!talkVideo.current) return;
    if (talkVideo.current.srcObject) {
      console.log('stopping video streams');
      // @ts-ignore
      talkVideo.current.srcObject.getTracks().forEach((track: any) => track.stop());
      talkVideo.current.srcObject = null;
    }
  }

  async function fetchWithRetries (url: any, options: any, retries = 1): Promise<any> {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= maxRetryCount) {
        const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 1000;
  
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        console.log(`Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`);
        return fetchWithRetries(url, options, retries + 1);
      } else {
        throw new Error(`Max retries exceeded. error: ${err}`);
      }
    }
  }
  
  return {
    talkVideo,
    talkDid
  }
}

export default useDidStream;