import React, { useState, useEffect } from 'react'
import { ArrowContainer } from 'react-tiny-popover'
import Switch from "react-switch";

import { LANGUAGE_TO_VOICE_MAPPING_LIST } from '@/utils/azureVoices';

interface SettingPopoverProps {
    position: any, 
    childRect: any, 
    popoverRect: any
}

const SettingPopover = (props: SettingPopoverProps) => {

    const [showCaption, setShowCaption] = useState(true)
    const [audio, setAudio] = useState(true)
    const [audioAutoPlay, setAudioAutoPlay] = useState(true)
    const [language, setLanguage] = useState('en-US')
    const [availableLanguages, setAvailableLanguages] = useState<Array<string>>([]);

    useEffect(() => {
        const languages: Array<string> = [];
        LANGUAGE_TO_VOICE_MAPPING_LIST.map( item => {
          const lang = `${item.voice.split('-')[0]}-${item.voice.split('-')[1]}`;
          if(!languages.includes(lang)) languages.push(lang);
        })
        setAvailableLanguages(languages)
    }, [])

    return (
        <ArrowContainer
            position={props.position}
            childRect={props.childRect}
            popoverRect={props.popoverRect}
            arrowColor={'#3d3d3d'}
            arrowSize={10}
            arrowStyle={{ opacity: 0.7 }}
            className='popover-arrow-container'
            arrowClassName='popover-arrow'
        >
            <div className='w-[300px] h-[240px] flex flex-col gap-4 p-[1rem] text-[#fff] bg-[#0d0d0d] border-[1px] border-[#3d3d3d] rounded-[1rem]'>
                <span className='text-[13px]'>
                    Chat Settings
                </span>
                <div className='flex flex-col gap-2 pt-4'>
                    <div className='flex justify-between'>
                        <span className=''>Caption</span>
                        <Switch checked={showCaption}
                            height={24}
                            onChange={(checked) => {
                                setShowCaption(checked);
                                // context.config.setConfig({
                                // ...context.config.state,
                                // showCaption: checked
                                // });
                            }} 
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className=''>Audio AutoPlay</span>
                        <Switch checked={audioAutoPlay}
                            height={24}
                            onChange={(checked) => {
                                setAudioAutoPlay(checked);
                                // context.config.setConfig({
                                // ...context.config.state,
                                // showCaption: checked
                                // });
                            }} 
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className=''>Audio</span>
                        <Switch checked={audio}
                            height={24}
                            onChange={(checked) => {
                                setAudio(checked);
                                // context.config.setConfig({
                                // ...context.config.state,
                                // showCaption: checked
                                // });
                            }} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span>
                            Your Speaking Language
                        </span>
                        <select
                            className='outline-none rounded-xl border-[1px] border-[3d3d3d] py-1 text-[#000]'
                            name='language'
                            value={language}
                            onChange={ (evt) => {
                                // setLanguage(evt.target.value);
                                // context.config.setConfig({
                                // ...context.config.state,
                                // language: evt.target.value
                                // });
                            }}
                        >
                            {
                                availableLanguages.map( (item, idx) => 
                                    <option key={idx} value={item}>{item}</option>
                                )
                            }
                            </select>
                    </div>
                </div>
            </div>
        </ArrowContainer>
    )

}

export default SettingPopover;