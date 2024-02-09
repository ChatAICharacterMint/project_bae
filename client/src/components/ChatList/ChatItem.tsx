import React from 'react';
import { ICharacter } from '@/utils/types';

interface ChatItemProps {
    character: ICharacter,
    isSelected: boolean
}

export default function ChatItem (props: ChatItemProps): React.JSX.Element {

    return (
        <div className={`w-full h-[64px] flex items-center gap-2 p-2 rounded-[1rem] cursor-pointer ${props.isSelected ? 'bg-[#5974ff]' : 'bg-[#171717]'}`}>
            <img className='w-[48px] h-[48px] rounded-full'
                src={props.character.thumbnail} alt='' 
            />
            <div className='hidden md:flex h-full flex-grow flex-col justify-between'>
                <span className='text-[#fff] text-[1.2rem] text-left capitalize'>
                    { props.character.name }
                </span>
                {/* last message & last time */}
                <p className='w-[40px] md:w-[100px] lg:w-[160px] xl:w-[200px] text-[#b8bccf] text-[13px] text-left capitalize bg-transparent whitespace-nowrap overflow-hidden text-ellipsis'>
                    { props.character.bio }
                </p>
            </div>
            
        </div>
    );
}