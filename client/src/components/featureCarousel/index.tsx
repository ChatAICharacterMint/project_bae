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
                            <div className='w-[320px] h-[280px] flex flex-col rounded-[1.5rem] cursor-pointer' style={{ 
                                backgroundImage: 'url(https://res.cloudinary.com/dtysxszqe/image/upload/v1703229724/mtsdwadts1yhvzmcr3wv.png)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <div className='h-[200px] flex flex-col justify-end p-2 rounded-t-[1.5rem] '>
                                    <span className='text-[24px] font-medium'>
                                        Featured
                                    </span>
                                </div>
                                <div className='flex items-center justify-between flex-grow px-4 bg-[#000d] rounded-b-[1.5rem]'>
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
                                    <button className='rounded-[1rem] bg-[#15152d] px-3 py-2'>
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