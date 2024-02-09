import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import SidebarItem from './SidebarItem';

import ExploreSVG from '@/assets/images/icon/explore.svg';
import UserSVG from '@/assets/images/icon/user.svg';
import ChatSVG from '@/assets/images/icon/chat.svg';
import ToolSVG from '@/assets/images/icon/tool.svg';
import GameSVG from '@/assets/images/icon/gamepad.svg';
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
                        <SidebarItem 
                            text="Explore" link="/explore"
                            isCollapsed={collapsed}
                            isActive={location.pathname.includes('/explore')}
                            Icon={ExploreSVG}
                        />
                        <SidebarItem 
                            text="Chat" link="/chat"
                            isCollapsed={collapsed}
                            isActive={location.pathname.includes('/chat')}
                            Icon={ChatSVG}
                        />
                        <SidebarItem 
                            text="MyBae" link="/mybae"
                            isCollapsed={collapsed}
                            isActive={location.pathname.includes('/mybae')}
                            Icon={ToolSVG}
                        />
                        {/* <SidebarItem 
                            text="Axie" link="/game"
                            isCollapsed={collapsed}
                            isActive={location.pathname.includes('/game')}
                            Icon={GameSVG}
                        /> */}
                        <SidebarItem 
                            text="Profile" link="/profile"
                            isCollapsed={collapsed}
                            isActive={location.pathname.includes('/profile')}
                            Icon={UserSVG}
                        />
                    </div>
                    <button className="flex justify-center gap-4">
                        <LogoutSVG />
                        <div className={`${collapsed && 'hidden'} transition duration-300 delay-150 ease-in-out`}>Sign Out</div>
                    </button>
                </div>
                {
                    !collapsed &&
                    <div className='flex gap-[1rem] py-[2rem]'>
                        <NavLink to="https://discord.com/invite/qPbw93b6KK" className="navbar-item">
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