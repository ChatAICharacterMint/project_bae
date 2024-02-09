import React from 'react';
import BaeItem from './BaeItem';
import { useNavigate } from 'react-router-dom'
import PlusSVG from '@/assets/images/icon/plus.svg'

interface BaeListProps {
    list: Array<any>,
    drafts: Array<any>
}

const BaeList = (props: BaeListProps): React.JSX.Element => {
    const selected = 1;
    const navigate = useNavigate();

    return (
        <div className='flex flex-col gap-4 overflow-y-auto thin-scroll'>
            <div className='flex flex-col gap-2 '>
                {
                    props.list.map( (item, idx) => 
                        <BaeItem key={idx} character={item} 
                            isSelected={ idx == selected }
                        />
                    )
                }
                <button className='flex items-center justify-center gap-4 p-3 rounded-[2rem] bg-[#2b2e3b]'
                    onClick={() => navigate("/mybae/create")}
                >
                    <PlusSVG stroke='#5974ff'/>
                    <span className='text-[#5974ff]'>
                        Create a BAE
                    </span>
                </button>
            </div>
            {
                props.drafts.length > 0 &&
                <div className='h-[1px] bg-[#46484b]'></div>
            }
            {
                props.drafts.length > 0 &&
                <div className='flex flex-col gap-[1rem]'>
                    <div className='flex gap-1'>
                        <span className='text-[#8C9196]'>
                            Drafts
                        </span>
                    </div>
                    {
                        props.drafts.map( (item, idx) => 
                            <BaeItem key={idx} character={item} 
                                isSelected={ idx == -1 }
                            />
                        )
                    }
                </div>
            }
            
        </div>
    )
}

export default BaeList;