import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
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
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`sidebar flex-shrink-0 h-screen ${ collapsed ? 'w-[64px] px-[16px]' : 'w-[180px] px-[32px]'} bg-[#0d0d0d] text-[#fff] text-[16px] leading-normal transition duration-300 delay-150 ease-in-out`}>

            <div className='h-full flex flex-col items-center'>
                <img className={`${ collapsed ? 'w-[32px] rounded-[4px]' : 'w-[64px] rounded-[10px]'} py-[2rem] cursor-pointer`} src={logoURL} alt='Project BAE'
                    onClick={() => { 
                        setCollapsed(!collapsed)
                        props.onCollapsed()
                    }}
                />

                <div className='flex flex-col flex-grow justify-between py-[2rem]'>
                    <div className="navbar flex flex-col gap-[30px]">
                        <NavLink to="/explore" className="navbar-item flex gap-[1rem]">
                            <ExploreSVG />
                            <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>Explore</div>
                        </NavLink>
                        <NavLink to="/chat" className="navbar-item flex gap-[1rem]">
                            <ChatSVG />
                            <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>Chat</div>
                        </NavLink>
                        <NavLink to="/mybae" className="navbar-item flex gap-[1rem]">
                            <ToolSVG />
                            <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>MyBae</div>
                        </NavLink>
                        <NavLink to="/profile" className="navbar-item flex gap-[1rem]">
                            <UserSVG />
                            <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>Profile</div>
                        </NavLink>
                        
                    </div>
                    <button className="flex gap-4">
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