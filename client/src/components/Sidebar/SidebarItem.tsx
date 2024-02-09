import React from 'react';
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
    text: string,
    link: string,
    isCollapsed: boolean,
    isActive: boolean,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export default function SidebarItem (props: SidebarItemProps): React.JSX.Element {

    return (
        <NavLink to={props.link} className={`navbar-item flex gap-[1rem] p-3 rounded-[1rem] ${props.isActive && "bg-[#17181c] text-[#5974ff]"}`}>
            <props.Icon style={{ stroke: props.isActive ? '#5974ff' : '#fff' }}/>
            <div className={`${props.isCollapsed && 'hidden'}`}>{props.text}</div>
        </NavLink>
    );
}