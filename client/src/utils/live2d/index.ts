import { useRef, useContext } from 'react';
import { AppContext } from '@/contexts';
import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

const useLive2D = () => {

    const context = useContext(AppContext);
    const OnTalkStart = useRef(() => {});
    const OnTalkEnd = useRef(() => {});

    function updateSize() {
        LAppDelegate.getInstance().onResize();
    }

    const initializeLive2D = () => {
        const character = context.config.state.selectedCharacter
        LAppDefine.lappdefineSet.setBackImage(context.config.state.background);
        LAppDefine.lappdefineSet.setModel(character.model)
        
        if (LAppDelegate.getInstance().initialize() == false) {
            return false;
        }

        window.addEventListener('resize', updateSize);

        const audio = document.getElementById("voice");
        if(!audio) return false;

        audio.addEventListener("play", function() {
            OnTalkStart.current();
        });
        audio.addEventListener("ended", function() {
            OnTalkEnd.current();
        });
        
        LAppDelegate.getInstance().run();
        return true;
    }

    const releaseLive2D = () => {
        LAppDelegate.releaseInstance();
        window.removeEventListener('resize', updateSize);
        const audio = document.getElementById("voice");
        if(!audio) return;
        audio.removeEventListener("play", function() {
            OnTalkStart.current();
        });
        audio.removeEventListener("ended", function() {
            OnTalkEnd.current();
        });

    }

    const talkLive2D = (text: string, emotion: string, voice: string) => {
        LAppDelegate.getInstance().startVoiceConversation(voice, text, emotion)
        
    }

    const setLive2DTalkStartCallback = (callback: any) => {
        OnTalkStart.current = callback;
    }

    const setLive2DTalkEndCallback = (callback: any) => {
        OnTalkEnd.current = callback;
    }

    return {
        initializeLive2D,
        releaseLive2D,
        talkLive2D,
        setLive2DTalkStartCallback,
        setLive2DTalkEndCallback
    }
    
};

export default useLive2D;