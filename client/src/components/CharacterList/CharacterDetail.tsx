import React from 'react';
import { ICharacter } from '@/utils/types';

interface CharacterDetailProps {
    character: ICharacter,
}

const CharacterDetail = (props: CharacterDetailProps): React.JSX.Element => {

    const trimString = (str: string, limit: number) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

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
            <div className='flex flex-col justify-between'>
                <p className='text-[#fff] text-left capitalize bg-transparent'>
                    { trimString(props.character.bio, 38) }
                </p>
                <span className='text-[#b8bccf] text-[12px] text-left capitalize'>
                    { props.character.name }
                </span>
            </div>
            
        </div>
    );
}

export default CharacterDetail;