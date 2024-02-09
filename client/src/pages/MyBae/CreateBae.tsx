import React, { useState, useEffect } from 'react';
import { 
    Switch,
    Select,
    Option
} from '@material-tailwind/react';
import ImageCrop from '@/components/ImageCrop';

import { languagesX } from '@/utils/azureVoices';
import { LANGUAGE_TO_VOICE_MAPPING_LIST } from '@/utils/azureVoices';

const availableChatModels = [
    'GPT 3.5',
    'GPT 3.5-16k',
    'GPT 4',
    'GPT 4 Turbo'
]

export default function CreateBae (): React.JSX.Element {

    const [isPublish, setIsPublish] = useState(false)

    const [availableVoices, setAvailableVoices] = useState<Array<string>>([])

    const [avatar, setAvatar] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [intro, setIntro] = useState<string>('')
    const [language, setLanguage] = useState<string | undefined>('')
    const [voice, setVoice] = useState<string | undefined>('')
    const [prompt, setPrompt] = useState<string>('')

    const [chatModel, setChatModel] = useState<string | undefined>('GPT 3.5')

    function trimText(str: string, limit: number) {
        return str.slice(0, limit)
    }
    
    function onChangeLanguage(lang: string | undefined) {
        setLanguage(lang)
        if(lang) {
            const voices: React.SetStateAction<string[]> = []
            LANGUAGE_TO_VOICE_MAPPING_LIST.map( item => {
                const code = item.voice.split('-')[0]
                if(code == lang) voices.push(item.voice.split('-')[2].replace('Neural', ''))
            })
            setAvailableVoices(voices)
            console.log(voices[0])
            setVoice(voices[0])
        }
    }

    function completeCreateBae() {
        
    }

    function cancelCreateBae() {

    }

    useEffect(() => {
        setLanguage('en')
    }, [])

    return (
        <div className='relative h-full flex flex-col p-4'>
            <div className="w-full h-[80px] flex items-center justify-between bg-[#171717] rounded-t-[2rem] p-[2rem]">
                <div>
                    <span className='text-[24px] font-medium'>
                        Create a BAE
                    </span>
                    <p className='text-[12px] text-[#b8bccf]'>
                        Customize your BAE to others. <a className='text-[#5974ff] underline cursor-pointer'>Learn More</a>
                    </p>
                </div>
                <label className='flex justify-between items-center gap-2'>
                    <span className=''>Publish BAE</span>
                    <Switch className="h-full w-full checked:bg-[#5974ff]" 
                        crossOrigin={undefined} checked={isPublish}
                        onChange={() => setIsPublish(!isPublish) }
                    />
                </label>
            </div>
            <div className='w-full flex-grow my-[2px] bg-[#171717] overflow-y-auto thin-scroll px-12 py-4'>
                <form className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label>Avatar</label>
                        <div className='flex items-end'>
                            <ImageCrop 
                                onSelected={(img)=>{ setAvatar(img) }}
                            />
                            <p className='text-[13px] text-[#b8bccf]'>File types supported: JPG, PNG, WEBM. Max size: 1M</p>
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label>Name</label>
                        <div className='flex items-center border-[1px] border-[#b8bccf] px-4 py-2 rounded-[1rem]'>
                            <input className='w-full h-full bg-transparent outline-none' type='text' placeholder='Input a name of your BAE' required
                                maxLength={30}
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                            <span>{name.length}/30</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Description</label>
                        <div className='flex flex-col items-end border-[1px] border-[#b8bccf] px-4 pt-4 pb-2 rounded-[1rem]'>
                            <textarea className='w-full h-full bg-transparent outline-none resize-none thin-scroll' placeholder='This will be showed to the others'
                                rows={8}
                                value={description} onChange={(e) => setDescription(trimText(e.target.value, 500))}
                            />
                            <span>{description.length}/500</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-8'>
                        <div className='flex items-center gap-4'>
                            <label>Language</label>
                            <Select id='language' label='language' placeholder="Select Language"
                                value={language} onChange={(val) => onChangeLanguage(val)}
                            >
                                {
                                    languagesX.map( (item, idx) => 
                                        <Option key={idx} value={item["code"]}>{item["localName"]}</Option>
                                    )
                                }
                            </Select>
                        </div>
                        <div className='flex items-center gap-4'>
                            <label>Voice</label>
                            <Select id='voice' label='voice' placeholder="Select Voice"
                                value={voice} onChange={(val) => setVoice(val)}
                            >
                                {
                                    availableVoices.map( (item, idx) => 
                                        <Option key={idx} value={item}>{item}</Option>
                                    )
                                }
                            </Select>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>Intro Message</label>
                        <div className='flex flex-col items-end border-[1px] border-[#b8bccf] px-4 pt-4 pb-2 rounded-[1rem]'>
                            <textarea className='w-full h-full bg-transparent outline-none resize-none thin-scroll' placeholder='This is the first message your BAE will send.'
                                rows={8}
                                value={intro} onChange={(e) => setIntro(trimText(e.target.value, 500))}
                            />
                            <span>{intro.length}/500</span>
                        </div>
                    </div>
                    <div className='h-[1px] bg-[#b8bccf] my-4'></div>
                    <div className='flex flex-col gap-4'>
                        <span className='text-center text-[1.2rem] font-medium'>Prompt Setting</span>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <label className='flex-shrink-0'>Model Configuration</label>
                                <div>
                                    <Select id='model' label='model' placeholder="Select Model"
                                        value={chatModel} onChange={(val) => setChatModel(val)}
                                    >
                                        {
                                            availableChatModels.map( (item, idx) => 
                                                <Option key={idx} value={item}>{item}</Option>
                                            )
                                        }
                                    </Select>
                                </div>
                            </div>
                           <div>

                           </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <label>Prompt</label>

                            </div>
                            <div className='flex flex-col items-end border-[1px] border-[#b8bccf] px-4 pt-4 pb-2 rounded-[1rem]'>
                                <textarea className='w-full h-full bg-transparent outline-none resize-none thin-scroll' placeholder='Input your prompt directly or modify templates.'
                                    rows={8}
                                    value={prompt} onChange={(e) => setPrompt(trimText(e.target.value, 1000))}
                                />
                                <span>{prompt.length}/1000</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full h-[80px] flex items-center justify-end gap-4 bg-[#171717] rounded-b-[2rem] p-[2rem]">
                <button className='bg-[#1e7039] rounded-[2rem] px-8 py-3'
                    onClick={() => {completeCreateBae()}}
                >
                    <span className='text-[1.2rem] font-medium'>Save</span>
                </button>
                <button className='bg-[#701c2e] rounded-[2rem] px-8 py-3'
                    onClick={() => {cancelCreateBae()}}
                >
                    <span className='text-[1.2rem] font-medium'>Cancel</span>
                </button>
            </div>
        </div>
    )
}