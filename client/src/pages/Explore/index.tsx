import React, { useRef, useState, useContext } from "react";

import NewsCarousel from "@/components/NewsCarousel";
import FeatureCarousel from "@/components/featureCarousel";
import CharacterList from "@/components/CharacterList";
import SearchSVG from '@/assets/images/icon/search.svg';

import { AppContext } from '@/contexts';

const Explore: React.FC = () => {
    const searchRef = useRef(null)
    const [searchResult, setSearchResult] = useState([]);

    const context = useContext(AppContext);
    const [config, setConfig] = useState(context.config.state);

    const projectBae_news = [
        {
            img: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1706948201/news/quwsscu9skrrrqbhiji8.webp',
            title: 'Discord Forum',
            description: 'Jump into the rabbit hole of Prompt.',
            button: 'Join Now',
            url: ''
        },
        {
            img: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1706948201/news/vi8cwhgsb7mhazzjlua4.webp',
            title: 'BAE NFT',
            description: 'Become a premium member to open Beta features by minting BAE NFT.',
            button: 'Mint Now',
            url: 'https://www.mycopilotbae.com/mint-bae'
        },
        {
            img: 'https://res.cloudinary.com/dtysxszqe/image/upload/v1706948201/news/c4iawvtqvv3y6fssrqx1.webp',
            title: 'Publish your BAE',
            description: 'Build and publish an awesome BAE to earn.',
            button: 'Publish Now',
            url: '/mybae'
        }
    ]

    return (
        <div className="h-screen flex flex-col">
            <div className="flex justify-between items-center h-[90px] px-[4rem] sticky">
                <h1 className="text-[32px] text-[#fff] font-semibold">
                    Explore BAE
                </h1>
                <div className="flex items-center gap-3 border-[2px] border-[#2b2e3b] rounded-[1.5rem] px-[1rem] py-[0.5rem] bg-[#17181c] ">
                    <SearchSVG />
                    <input ref={searchRef}
                    className="outline-none bg-transparent text-[#fff] leading-[24px] lg:w-[360px]"
                    placeholder="Search BAE ..."
                    onKeyUp={ (evt) => {
                        if(evt.key === 'Enter') {
                            console.log('search bae ...')
                        }
                    }}
                />
                </div>
                
            </div>
            
            <div className="flex flex-col gap-[2rem] pb-[2rem] overflow-y-auto thin-scroll">
                <NewsCarousel news={projectBae_news} />
                <div className="flex flex-col px-[4rem] lg:px-[6rem] gap-[2rem]">
                    <CharacterList 
                        title="Hot BAE"
                        characters={config.characters}
                    />
                    <FeatureCarousel characters={config.characters} />
                    <CharacterList 
                        title="New BAE"
                        characters={config.characters}
                    />
                </div>
            </div>
        </div>
    )
}

export default Explore;