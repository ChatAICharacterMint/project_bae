import React from 'react';
import { ICharacter } from '@/utils/types';
import CheckSVG from '@/assets/images/icon/check.svg';

interface BaeItemProps {
    character: ICharacter,
    isSelected: boolean
}

export default function BaeItem (props: BaeItemProps): React.JSX.Element {
    const isPublished = true;

    return (
        <div className={`w-full h-[64px] flex items-center gap-2 p-2 rounded-[1rem] cursor-pointer ${props.isSelected ? 'bg-[#5974ff]' : 'bg-[#171717]'}`}>
            <div className='relative'>
                <img className='w-[48px] h-[48px] rounded-full'
                    src={props.character.thumbnail} alt='' 
                />
                {
                    isPublished &&
                    <div className='absolute -right-2 -bottom-1'>
                        <CheckSVG fill="#f2ff36" />
                    </div>
                    
                }
            </div>
            
            <div className='h-full flex flex-col justify-between'>
                <span className='text-[#fff] text-[1.2rem] text-left capitalize'>
                    { props.character.name }
                </span>
                {/* last message & last time */}
                <p className='w-[200px] text-[#b8bccf] text-[13px] text-left capitalize bg-transparent whitespace-nowrap overflow-hidden text-ellipsis'>
                    { props.character.bio }
                </p>
            </div>
            
        </div>
    );
}