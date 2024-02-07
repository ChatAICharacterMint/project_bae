import React, { useState } from 'react';
import Carousel from "react-simply-carousel";

interface FeatureCarouselProps {
    characters: Array<any>,
}

const FeatureCarousel = (props: FeatureCarouselProps): React.JSX.Element => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    return (
        <div className='w-full flex justify-center'>
            <Carousel
                itemsToShow={4}
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
            >
                {
                    props.characters.map( (item, idx) => 
                        <div key={idx} className="flex items-center px-2">
                            <div className='w-[320px] h-[280px] flex flex-col rounded-[1.5rem] cursor-pointer bg-[#66c69a]'>
                                <div className='h-[200px] flex flex-col justify-end p-2 rounded-t-[1.5rem]'>
                                    <span className='text-[#fff] text-[24px] font-medium'>
                                        Featured
                                    </span>
                                </div>
                                <div className='flex items-center justify-between flex-grow px-4 text-[#fff] bg-[#0000004d] rounded-b-[1.5rem]'>
                                    <div className='flex gap-1'>
                                        <img className='w-[60px] h-[60px] rounded-[1rem]'
                                            src={item.thumbnail} alt='' 
                                        />
                                        <div className='flex flex-col justify-end p-2'>
                                            <span>
                                                {item.name}
                                            </span>
                                        </div>
                                        
                                    </div>
                                    <button className='rounded-[1rem] bg-[#000b] px-2 py-1'>
                                        Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Carousel>
        </div>
        
    )
}

export default FeatureCarousel;