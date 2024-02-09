import React, { useState, useEffect, useRef, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Popover } from 'react-tiny-popover'

import HappyExpBar from './HappyExpBar';
import SettingPopover from "./ChatSettingPopover";

import useDidStream from "@/utils/streaming_did";
import useLive2d from '@/utils/live2d';
import Socket from '@/utils/socket';
import { AppContext } from '@/contexts';

import AnimeSVG from '@/assets/images/icon/anime.svg';
import MicSVG from '@/assets/images/icon/mic.svg';
import CogSVG from '@/assets/images/icon/cog.svg';

const emotions = [
    "very bad", "bad", "normal", "good", "very good"
];
const emotionalExp = [
    -25, -18, 8, 15, 20
]

const ChatRoom: React.FC = () => {

    const context = useContext(AppContext);
    const [isAnime, setIsAnime] = useState(false);
    const [caption, setCaption] = useState<string | null>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const exp = useRef(0)
    const last_at = useRef(0)
    const [happyExp, setHappyExp] = useState(0)
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const { 
        talkVideo,
        talkDid,
        connectDid,
        destoryDid,
        setDidTalkStartCallback,
        setDidTalkEndCallback,
    } = useDidStream();

    const {
        initializeLive2D,
        releaseLive2D,
        talkLive2D,
        setLive2DTalkStartCallback,
        setLive2DTalkEndCallback
    } = useLive2d();

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.log("Browser doesn't support speech recognition.")
        }
    });

    useEffect(() => {
        const lastChat = localStorage.getItem(context.config.state.selectedCharacter.name);
        if(lastChat) {
            exp.current = JSON.parse(lastChat)['exp']
            last_at.current = JSON.parse(lastChat)['last_at']
            setHappyExp(exp.current)
        } else {
            setHappyExp(0)
        }

        if(context.config.state.selectedCharacter.type === 'image') {
            connectDid();
            setDidTalkEndCallback(() => {
                setCaption(null);
            })
        } else if(context.config.state.selectedCharacter.type === 'live2d') {
            initializeLive2D();
            setLive2DTalkEndCallback(() => {
                setCaption(null);
            })
        }

        Socket.emit('init_bot', { message: context.config.state.selectedCharacter })

        Socket.on('@response', (res: { message: any; }) => {
            const c = context.config.state.selectedCharacter
            if(res.message && res.message !== '') {
                const reply = analyzeReply(res.message)
                console.log(reply)
                if(c.type === 'image') {
                    setDidTalkStartCallback(() => {
                        setCaption(reply.message)
                    })
                    talkDid(reply.message);
                } else if(c.type === 'live2d') {
                    setLive2DTalkStartCallback(() => {
                        setCaption(reply.message)
                    })
                    talkLive2D(reply.message, reply.emotion, c.voice)
                }
                
            }
        });

        return () => {
            Socket.off('@response');
            destoryDid();
            releaseLive2D();
        }

    }, [context.config.state.selectedCharacter])

    const sendTextMessage = (text: string | undefined) => {
        if(text) {
            Socket.emit('chat', {
                message: text
            })
        }
    };

    const analyzeReply = (text: string) => {
        const temp = text.split('##')
        const emotion = temp[1] ? temp[1] : 'normal'
        const message = temp[2] ? temp[2] : text

        // #TODO: emotional evolution linear profile or curved profile

        const index = emotions.indexOf(emotion)
        exp.current += index == -1 ? 0 : emotionalExp[index]
        last_at.current = new Date().getTime()
        localStorage.setItem(context.config.state.selectedCharacter.name, JSON.stringify({
            'exp': exp.current,
            'last_at': last_at.current
        }));
        setHappyExp(exp.current)

        return {
            emotion: emotion,
            message: message
        }
    }

    return (
    <div className="h-screen flex flex-col justify-between gap-[1rem]">
        <div className="w-full h-[80px] flex justify-between items-center bg-[#0d0d0d] rounded-bl-[20px] px-[25px] py-[21px]">
            <div className="flex flex-col gap-[6px]">
                <HappyExpBar exp={happyExp} />
            </div>
            <div className="flex gap-[40px]">
                {/* trending, anime chat, setting, maximize */}
                <div className="cursor-pointer" onClick={() => setIsAnime(!isAnime)}>
                    <AnimeSVG style={{ stroke: isAnime ? "#5974ff" : "#fff"}}/>
                </div>
                <Popover
                    isOpen={isSettingsOpen}
                    positions={['bottom', 'left']}
                    padding={10}
                    reposition={true} 
                    onClickOutside={() => setIsSettingsOpen(false)}
                    content={({position, childRect, popoverRect}) =>
                        <SettingPopover position={position} childRect={childRect} popoverRect={popoverRect} />
                    }
                >
                    <div className="cursor-pointer" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                        <CogSVG />
                    </div>
                </Popover>
            </div>
        </div>
        <div className="w-full flex-grow flex flex-col pr-[1rem]">
            <div className="relative w-full aspect-auto flex-grow flex justify-center items-start overflow-hidden rounded-[20px] border-[1px] border-[#0004] bg-[#000b]">
                {
                    context.config.state.selectedCharacter.type === 'image' &&
                    <video ref={talkVideo} autoPlay muted playsInline className="absolute top-0 left-0 h-full w-full object-cover object-top"></video>
                }
                {
                    context.config.state.selectedCharacter.type === 'live2d' &&
                    <div id="live2d-container" className='absolute top-0 left-0 h-full w-full object-cover object-top'>
                        <canvas id="live2d" className='w-full h-full rounded-[20px]'></canvas>
                    </div>
                }
                
                {
                    context.config.state.showCaption && (caption != null || transcript !== '') && (
                        <div className="absolute bottom-2 text-[#fff] bg-[#0004] rounded-[10px] px-[16px] py-[10px] mx-auto"
                            style={{
                                maxWidth: 'calc(100% - 4rem)'
                            }}
                        >
                            { caption ? caption : transcript }
                        </div>
                    )
                }
            </div>
            
            <div className="h-[70px] flex items-center gap-[12px] px-[14px] my-[1rem] bg-[#26282F] rounded-[20px]">
                <input ref={messageRef}
                    className="flex-grow h-full pl-[20px] bg-transparent outline-none caret-[#E23D3D] text-[#fff] leading-[24px]"
                    placeholder="Type here"
                    onKeyUp={ (evt) => {
                        if(evt.key === 'Enter') {
                            if(messageRef.current) {
                                sendTextMessage(messageRef.current.value);
                                messageRef.current.value = '';
                            }
                        }
                    }}
                />
                {
                    <button className={`p-[10px] rounded-full ${listening && 'bg-[#0e0e0e]'}`}
                        onTouchStart={() => {
                            SpeechRecognition.startListening({ continuous: true, language: context.config.state.language });
                        }}
                        onTouchEnd={() => {
                            SpeechRecognition.stopListening();
                            setTimeout(() => {
                                resetTranscript();
                            }, 1000);
                            sendTextMessage(transcript);
                        }}
                        onMouseDown={() => {
                            SpeechRecognition.startListening({ continuous: true, language: context.config.state.language });
                        }}
                        onMouseUp={() => {
                            SpeechRecognition.stopListening();
                            setTimeout(() => {
                                resetTranscript();
                            }, 1000);
                            sendTextMessage(transcript);
                        }}
                    >
                        <MicSVG />
                    </button>
                }
                {/* <button className="hidden sm:block p-[10px] pl-[9px] bg-[#E23D3D] rounded-[10px]"
                    onClick={ () => { 
                        if(messageRef.current) {
                            sendTextMessage(messageRef.current.value);
                            messageRef.current.value = '';
                        }
                    }}
                >
                    <SendSVG />
                </button> */}
                <audio id='voice' className='hidden' />
            </div>
        </div>
    </div>
    );
};
  
export default ChatRoom;