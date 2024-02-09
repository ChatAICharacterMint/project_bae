import React from 'react';
import CharacterItem from './CharacterItem';

interface CharacterListProps {
    title: string,
    characters: Array<any>
}

const CharacterList = (props: CharacterListProps): React.JSX.Element => {


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <h2 className='text-[24px] text-[#fff] font-medium'>
                    {props.title}
                </h2>
                <span className='text-[#5974ff] cursor-pointer'>
                    More
                </span>
            </div>
            <div className='flex flex-wrap gap-[1rem] p-[1rem]'>
                {
                    props.characters.map( (item, idx) => 
                        <CharacterItem key={idx} character={item} />
                    )
                }
            </div>
        </div>
    )
}

export default CharacterList;