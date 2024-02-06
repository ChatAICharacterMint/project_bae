import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props : LayoutProps) {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <Sidebar onCollapsed={() => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
      }} />
      <div className='bg-[#1b1b1d]' style={{ width: isSidebarCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 180px)'}}>
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
