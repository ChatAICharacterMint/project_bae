import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import ExploreSVG from '@/assets/images/icon/explore.svg';
import UserSVG from '@/assets/images/icon/user.svg';
import ChatSVG from '@/assets/images/icon/chat.svg';
import ToolSVG from '@/assets/images/icon/tool.svg';
import LogoutSVG from '@/assets/images/icon/logout.svg';
import TelegramSVG from '@/assets/images/telegram.svg';
import DiscordSVG from '@/assets/images/discord.svg';
import TwitterSVG from '@/assets/images/twitter.svg';

const logoURL = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png';

interface SidebarProps {
    onCollapsed: () => void
}

const Sidebar = (props: SidebarProps) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // TODO - disable navigation on page loading for live chat
    return (
        <div className={`sidebar flex-shrink-0 h-screen ${ collapsed ? 'w-[64px] px-[16px]' : 'w-[180px] px-[32px]'} bg-[#0d0d0d] text-[#fff] text-[16px] leading-normal`}>

            <div className='w-full h-full flex flex-col items-center'>
                <img className={`${ collapsed ? 'w-[32px] rounded-[4px]' : 'w-[64px] rounded-[10px]'} py-[2rem] cursor-pointer`} src={logoURL} alt='Project BAE'
                    onClick={() => { 
                        setCollapsed(!collapsed)
                        props.onCollapsed()
                    }}
                />

                <div className='flex flex-col flex-grow justify-between py-[2rem]'>
                    <div className="navbar flex flex-col gap-[1rem]">
                        <NavLink to="/explore" className={`navbar-item flex gap-[1rem] p-3 rounded-[1rem] ${location.pathname == '/explore' && "bg-[#17181c] text-[#5974ff]"}`}>
                            <ExploreSVG style={{ stroke: location.pathname == '/explore' ? '#5974ff' : '#fff' }}/>
                            <div className={`${collapsed && 'hidden'}`}>Explore</div>
                        </NavLink>
                        <NavLink to="/chat" className={`navbar-item flex gap-[1rem] p-3 rounded-[1rem] ${location.pathname == '/chat' && "bg-[#17181c] text-[#5974ff]"}`}>
                            <ChatSVG style={{ stroke: location.pathname == '/chat' ? '#5974ff' : '#fff' }}/>
                            <div className={`${collapsed && 'hidden'}`}>Chat</div>
                        </NavLink>
                        <NavLink to="/mybae" className={`navbar-item flex gap-[1rem] p-3 rounded-[1rem] ${location.pathname == '/mybae' && "bg-[#17181c] text-[#5974ff]"}`}>
                            <ToolSVG style={{ stroke: location.pathname == '/mybae' ? '#5974ff' : '#fff' }}/>
                            <div className={`${collapsed && 'hidden'}`}>MyBae</div>
                        </NavLink>
                        <NavLink to="/profile" className={`navbar-item flex gap-[1rem] p-3 rounded-[1rem] ${location.pathname == '/profile' && "bg-[#17181c] text-[#5974ff]"}`}>
                            <UserSVG style={{ stroke: location.pathname == '/profile' ? '#5974ff' : '#fff' }}/>
                            <div className={`${collapsed && 'hidden'}`}>Profile</div>
                        </NavLink>
                        
                    </div>
                    <button className="flex justify-center gap-4">
                        <LogoutSVG />
                        <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>Sign Out</div>
                    </button>
                </div>
                {
                    !collapsed &&
                    <div className='flex gap-[1rem] py-[2rem]'>
                        <NavLink to="https://discord.gg/e8ZdjNcNWb" className="navbar-item">
                            <DiscordSVG />
                        </NavLink>
                        <NavLink to="https://t.me/mycopilotbae" className="navbar-item">
                            <TelegramSVG />
                        </NavLink>
                        <NavLink to="https://twitter.com/mycopilotbae" className="navbar-item">
                            <TwitterSVG />
                        </NavLink>
                    </div>
                }
                
            </div>
        </div>
    );
}

export default Sidebar;