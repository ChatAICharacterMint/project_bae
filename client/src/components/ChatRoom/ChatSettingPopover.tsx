import React, { useState } from 'react'
import { ArrowContainer } from 'react-tiny-popover'
import { Switch, Select, Option } from '@material-tailwind/react';

import { languagesX } from '@/utils/azureVoices';

interface SettingPopoverProps {
    position: any, 
    childRect: any, 
    popoverRect: any
}

export default function SettingPopover (props: SettingPopoverProps) {

    const [showCaption, setShowCaption] = useState(true)
    const [audio, setAudio] = useState(true)
    const [audioAutoPlay, setAudioAutoPlay] = useState(true)
    const [language, setLanguage] = useState<string | undefined>('en')

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
                        <Switch className="h-full w-full checked:bg-[#5974ff]" 
                            crossOrigin={undefined} checked={showCaption}
                            onChange={() => setShowCaption(!showCaption) }
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className=''>Audio AutoPlay</span>
                        <Switch className="h-full w-full checked:bg-[#5974ff]" 
                            crossOrigin={undefined} checked={audioAutoPlay}
                            onChange={() => setAudioAutoPlay(!audioAutoPlay) }
                        />
                    </div>
                    <div className='flex justify-between'>
                        <span className=''>Audio</span>
                        <Switch className="h-full w-full checked:bg-[#5974ff]" 
                            crossOrigin={undefined} checked={audio}
                            onChange={() => setAudio(!audio) }
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span>
                            Your Speaking Language
                        </span>
                        <Select label='language' placeholder="Select Language"
                            value={language} onChange={(val) => setLanguage(val)}
                        >
                            {
                                languagesX.map( (item, idx) => 
                                    <Option key={idx} value={item["code"]}>{item["localName"]}</Option>
                                )
                            }
                        </Select>
                    </div>
                </div>
            </div>
        </ArrowContainer>
    )

}