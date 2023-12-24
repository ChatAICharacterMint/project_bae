import { useRef, useContext, useLayoutEffect } from 'react';
import { AppContext } from '@/contexts';
import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

const useLive2D = () => {

    const context = useContext(AppContext);
    const OnTalkStart = useRef(() => {});
    const OnTalkEnd = useRef(() => {});

    useLayoutEffect(() => {

        function updateSize() {
            LAppDelegate.getInstance().onResize();
        }
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const initializeLive2D = () => {
        const character = context.config.state.selectedCharacter
        LAppDefine.lappdefineSet.setBackImage(character.config.back_img);
        LAppDefine.lappdefineSet.setModel(character.model)
        
        if (LAppDelegate.getInstance().initialize() == false) {
            return false;
        }
        
        LAppDelegate.getInstance().run();
        return true;
    }

    const releaseLive2D = () => {
        LAppDelegate.releaseInstance();
    }

    const talkLive2D = (text: string, language?: string) => {
        LAppDelegate.getInstance().startVoiceConversation(language ? language : "en-US", text)
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