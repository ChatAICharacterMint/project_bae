import React from 'react';
import { NavLink } from "react-router-dom";
import PlusSquareSVG from '@static/images/icon/plus-square.svg';
import UserSVG from '@static/images/icon/user.svg';
import QuestSVG from '@static/images/icon/quest.svg';
import AwardSVG from '@static/images/icon/cup.svg';
import GamePadSVG from '@static/images/icon/gamepad.svg';
import CurrencySVG from '@static/images/icon/currency.svg';
import HandShakeSVG from '@static/images/icon/handshake.svg';
import CogSVG from '@static/images/icon/cog.svg';
import LogoutSVG from '@static/images/icon/logout.svg';

const avatarImgLink = 'https://res.cloudinary.com/dtysxszqe/image/upload/v1702964717/ylt3yueyrhxd1vobi5qc.png';

const Sidebar = () => {

    return (
    <div className="hidden sm:block flex-shrink-0 sidebar w-[240px] h-screen p-[36px] bg-[#000] text-[#fff] text-[16px] leading-normal">
        <div className='h-full flex flex-col items-center px-[2px]'>
            <div className='h-full flex flex-col items-center gap-[40px]'>
                <NavLink to="#">
                    <img className="rounded-[10px]" src={avatarImgLink} alt='avatar' />
                </NavLink>
                <NavLink to="#">
                    <button className="flex rounded-[10px] bg-[#E23D3D] px-[25px] py-[12px] gap-[16px]">
                        <PlusSquareSVG />
                        <span className='font-bold'>Subscribe</span>
                    </button>
                </NavLink>
                <div className='flex flex-col flex-grow justify-between'>
                    <div className="navbar flex flex-col gap-[30px]">
                        <NavLink to="/" className="navbar-item flex gap-[1rem]">
                            <UserSVG />
                            <span>Automise</span>
                        </NavLink>
                        <NavLink to="#" className="navbar-item flex gap-[1rem]">
                            <QuestSVG />
                            <span>Quest</span>
                        </NavLink>
                        <NavLink to="#" className="navbar-item flex gap-[1rem]">
                            <AwardSVG />
                            <span>Awards</span>
                        </NavLink>
                        <NavLink to="#" className="navbar-item flex gap-[1rem]">
                            <GamePadSVG />
                            <span>Games</span>
                        </NavLink>
                        <NavLink to="#" className="navbar-item flex gap-[1rem]">
                            <CurrencySVG />
                            <span>Currency</span>
                        </NavLink>
                        <NavLink to="#" className="navbar-item flex gap-[1rem]">
                            <HandShakeSVG />
                            <span>Partnership</span>
                        </NavLink>
                        <NavLink to="/settings" className="navbar-item flex gap-[1rem]">
                            <CogSVG />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                    <button className="flex pb-[48px] gap-4">
                        <LogoutSVG />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Sidebar;