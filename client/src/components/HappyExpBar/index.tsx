import React, { useEffect, useState } from 'react'
import HappySVG_0 from '@/assets/images/icon/happy_0.svg';
import HappySVG_1 from '@/assets/images/icon/happy_1.svg';
import HappySVG_2 from '@/assets/images/icon/happy_2.svg';
import HappySVG_3 from '@/assets/images/icon/happy_3.svg';
import HappySVG_4 from '@/assets/images/icon/happy_4.svg';

import './happy.scss';

interface HappyExpBarProps {
    exp: number;
}

export default function HappyExpBar ( props: HappyExpBarProps ) {

    const happyExpRange = [
        -100, -50, 50, 100
    ]
    
    const [ happyIndex, SetHappyIndex] = useState(2)

    const HappySVG = [
        <HappySVG_0 key='0' />,
        <HappySVG_1 key='1' />,
        <HappySVG_2 key='2' />,
        <HappySVG_3 key='3' />,
        <HappySVG_4 key='4' />,
    ]
    const getHappyIndex = (exp: number) => {
        for(let i = 0; i < happyExpRange.length; i++)
            if(exp < happyExpRange[i])
                return i
        return 4;
    }
    const getHappyScale = (exp: number) => {
        if(exp < -100) return -100
        if(exp > 100) return 100
        return exp
    }
    const getHappyColor = (exp: number) => {
        return `hsl(${ 100 + getHappyScale(exp) } 70% 35% / 1)`;
    }

    useEffect(() => {
        const index = getHappyIndex(props.exp)
        SetHappyIndex(index)
    }, [props.exp])

    return (
        <div className="happy-index relative flex items-center py-[6px]">
            <div className="flex gap-[30px] px-[30px] py-[6px] bg-[#1E2026] rounded-[110px]">
                {
                    HappySVG.map( (item, idx) => 
                        <div key={idx} className='opacity-[0.45]'>
                            {item}
                        </div>
                    )
                }
            </div>
            {
                <div className="absolute p-[6px] rounded-full" style={{ left: `${110 + getHappyScale(props.exp)}px`, backgroundColor: `${getHappyColor(props.exp)}`}} >
                    <div className='active flex justify-center items-center w-[28px] h-[28px]'>
                        {HappySVG[happyIndex]}
                    </div> 
                </div>
            }
        </div>
    )

}