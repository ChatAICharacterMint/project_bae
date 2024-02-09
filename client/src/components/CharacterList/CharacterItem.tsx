import React from 'react';
import { ICharacter } from '@/utils/types';

interface CharacterItemProps {
    character: ICharacter,
}

const CharacterItem = (props: CharacterItemProps): React.JSX.Element => {

    return (
        <div className='flex w-[280px] h-[80px] gap-2 cursor-pointer'>
            <div className="relative w-[80px] h-[80px] rounded-[1rem] flex-shrink-0 bg-gray-800"
                onClick={() => {

                }}
            >
                <img className='w-[80px] h-[80px] rounded-[1rem]'
                    src={props.character.thumbnail} alt='' 
                />
            </div>
            <div className='flex flex-col justify-between border-b border-gray-600 py-1'>
                <p className='text-[#fff] text-left capitalize bg-transparent' style={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    lineClamp: '2',
                    boxOrient: 'vertical',
                    textOverflow: '...'
                }}>
                    { props.character.bio }
                </p>
                <span className='text-[#b8bccf] text-[12px] text-left capitalize'>
                    { props.character.name }
                </span>
            </div>
            
        </div>
    );
}

export default CharacterItem;