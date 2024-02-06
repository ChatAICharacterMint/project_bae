import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

interface FeatureCarouselProps {
    characters: Array<any>,
}

const FeatureCarousel = (props: FeatureCarouselProps): React.JSX.Element => {


    return (
        <div className='w-full flex justify-center'>
            <Carousel
                infiniteLoop
                transitionTime={500}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
            >
                {
                    props.characters.map( (item, idx) => 
                        <div key={idx} className="flex items-center px-2">
                            <div className='w-[120px] h-[120px] flex flex-col rounded-[2rem] cursor-pointer'>
                                <div className=''>

                                </div>
                                <div className=''>
                                    
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