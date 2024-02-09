import React, { useRef, useContext } from "react";
import ChatList from "@/components/ChatList/ChatList";
import { AppContext } from '@/contexts';

import SearchSVG from '@/assets/images/icon/search.svg';

const ChatRoom = React.lazy(() => import("@/components/ChatRoom"))

const Chat: React.FC = () => {
    const searchRef = useRef(null)
    const context = useContext(AppContext);
    // const [searchResult, setSearchResult] = useState([]);

    return (
        <div className="w-full flex">
            <div className="w-[320px] h-screen flex flex-col gap-4 pl-4 pr-6 pt-8">
                <div className="flex items-center justify-between">
                    <span className="text-[32px] font-semibold">
                        Chat
                    </span>
                    <div className="">
                        0 BAE
                    </div>
                </div>
                <div className="flex items-center gap-3 border-[2px] border-[#2b2e3b] rounded-[1.5rem] px-3 py-1 bg-[#17181c] ">
                    <SearchSVG />
                    <input ref={searchRef}
                        className="w-full outline-none bg-transparent text-[14px] leading-[24px]"
                        placeholder="Search in chats"
                        onKeyUp={ (evt) => {
                            if(evt.key === 'Enter') {
                                console.log('search in chats')
                            }
                        }}
                    />
                </div>
                <ChatList pinned={[]} chats={context.config.state.characters} />
            </div>
            <div className="flex-grow">
                <ChatRoom />
            </div>
        </div>
    );
};

export default Chat;