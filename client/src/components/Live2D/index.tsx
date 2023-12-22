import React, { useEffect, useLayoutEffect } from 'react';
import { ICharacter } from "@/utils/types";

import { LAppDelegate } from './lappdelegate';
// import { LAppLive2DManager } from './lapplive2dmanager';
import * as LAppDefine from './lappdefine';

interface Live2DProps {
    character: ICharacter,
}

const Live2D = (props: Live2DProps): React.JSX.Element => {

    // #TODO: fix Non-power-of-two image issue and edge alias
    const back = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1703229724/mtsdwadts1yhvzmcr3wv.png';

    useLayoutEffect(() => {

        function updateSize() {
            LAppDelegate.getInstance().onResize();
        }
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    useEffect(() => {
        console.log('props', props)
        LAppDefine.lappdefineSet.setBackImage(back);
        
        if (LAppDelegate.getInstance().initialize() == false) {
            return;
        }

        LAppDelegate.getInstance().run();

        // window.onbeforeunload = () => LAppDelegate.releaseInstance();

        return () => {
            LAppDelegate.releaseInstance();
        }
        
    }, []);
    
    return (
        <div id="live2d-container" className='absolute top-0 left-0 h-full w-full object-cover object-top'>
            <canvas id="live2d" className='w-full h-full rounded-[20px]'></canvas>
            <audio id='voice' className='hidden' />
        </div>
    )
};

export default Live2D;