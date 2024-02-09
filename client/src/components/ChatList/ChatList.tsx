import React from 'react';
import ChatItem from './ChatItem';
import PinSVG from '@/assets/images/icon/pin.svg'

interface ChatListProps {
    pinned: Array<any>,
    chats: Array<any>
}

const ChatList = (props: ChatListProps): React.JSX.Element => {
    const selected = 1;

    return (
        <div className='flex flex-col gap-4 overflow-y-auto thin-scroll'>
            {
                props.pinned.length > 0 &&
                <div className='flex flex-col gap-2 '>
                    <div className='flex gap-1'>
                        <PinSVG />
                        <span className='text-[#8C9196]'>
                            Pinned Chats
                        </span>
                    </div>
                    {
                        props.chats.map( (item, idx) => 
                            <ChatItem key={idx} character={item} 
                                isSelected={ idx == selected }
                            />
                        )
                    }
                </div>
            }
            {
                props.pinned.length > 0 &&
                <div className='h-[1px] bg-[#46484b]'></div>
            }
            <div className='flex flex-col gap-2 '>
                {
                    props.chats.map( (item, idx) => 
                        <ChatItem key={idx} character={item} 
                            isSelected={ idx == selected }
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ChatList;