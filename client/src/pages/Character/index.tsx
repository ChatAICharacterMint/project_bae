import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import useTextToSpeech from "@/utils/textToSpeech";
import useDidStream from "@/utils/streaming_did";
import useLive2d from '@/utils/live2d';
import Socket from '@/utils/socket';
import { AppContext } from '@/contexts';

import HappyIndex from '@/components/HappyIndex';
import LocationSVG from '@/assets/images/icon/location.svg';
import BadgeSVG from '@/assets/images/icon/badge.svg';
import SendSVG from '@/assets/images/icon/send.svg';
import MicSVG from '@/assets/images/icon/mic.svg';
import MenuSVG from '@/assets/images/icon/menu.svg';

const avatarImgLink = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png';

const emotions = [
    "very bad", "bad", "normal", "good", "very good"
];
const emotionalExp = [
    -2, -1.5, 0.3, 1, 1.5
]
const happyExpRange = [
    -20, -5, 5, 20
]

// const socket = Socket.instance;

const Character: React.FC = () => {

    const context = useContext(AppContext);
    const [caption, setCaption] = useState<string | null>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const exp = useRef(0);
    const [happyIndex, setHappyIndex] = useState(2);
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    // const { convert, setOnProcessCallback } = useTextToSpeech();
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
        console.log("#################");
    }, []);

    useEffect(() => {
        console.log('## initialize...')
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
        const diff = index == -1 ? 0 : emotionalExp[index]
        exp.current += diff;

        for(let i = 0; i < happyExpRange.length; i++)
            if(exp.current <= happyExpRange[i]) { 
                setHappyIndex(i); 
                return {
                    emotion: emotion,
                    message: message
                }
            }

        setHappyIndex(4)
        return {
            emotion: emotion,
            message: message
        }
    }

    return (
    <div className="h-full flex flex-col justify-between ml-0 sm:ml-[24px] gap-[2rem]">
        <div className="w-full h-[110px] flex justify-between items-center bg-[#000] text-[#fff] rounded-0 sm:rounded-bl-[20px] px-[25px] py-[21px]">
            <div className="hidden sm:flex flex-col gap-[6px]">
                <span className="font-bold">Happiness Index</span>
                <HappyIndex index={happyIndex} />
            </div>
            <div className="sm:hidden flex items-center gap-[2rem]">
                <MenuSVG />
                <NavLink to="#">
                    <img className="rounded-[10px] w-[48px] h-[48px]" src={avatarImgLink} alt='avatar' />
                </NavLink>
            </div>
            <div className="flex gap-[40px]">
                <LocationSVG />
                <BadgeSVG />
            </div>
        </div>
        <div className="w-full flex-grow flex flex-col gap-[2rem] pl-[2rem] sm:pl-0 pr-[2rem] pb-[2rem]">
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
            
            <div className="h-[70px] flex items-center gap-[12px] px-[14px] bg-[#26282F] rounded-[20px]">
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
                            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
                        }}
                        onTouchEnd={() => {
                            SpeechRecognition.stopListening();
                            setTimeout(() => {
                                resetTranscript();
                            }, 1000);
                            sendTextMessage(transcript);
                        }}
                        onMouseDown={() => {
                            SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
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
                <button className="hidden sm:block p-[10px] pl-[9px] bg-[#E23D3D] rounded-[10px]"
                    onClick={ () => { 
                        if(messageRef.current) {
                            sendTextMessage(messageRef.current.value);
                            messageRef.current.value = '';
                        }
                    }}
                >
                    <SendSVG />
                </button>
                <audio id='voice' className='hidden' />
            </div>
        </div>
    </div>
    );
};
  
export default Character;