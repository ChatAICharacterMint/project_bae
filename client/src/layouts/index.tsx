import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props : LayoutProps) {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [toast, setToast] = useState<string | null>(null);
  function showToast(text: string, timeout = 1000) {
    setToast(text);

    setTimeout(() => {
      setToast(null);
    }, timeout);
  }

  return (
    <div className='relative w-full h-screen flex overflow-hidden text-[#fff]'>
      <Sidebar onCollapsed={() => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
      }} />
      <div className='bg-[#1b1b1d]' style={{ width: isSidebarCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 180px)'}}>
        {props.children}
      </div>
      {
        toast &&
        <div className="absolute flex justify-center w-fit mx-auto my-0 top-[2rem] left-0 right-0 px-[1rem] py-[0.5rem] bg-[#0006] rounded-[1rem] transition-all duration-200">
          <span className='text-[#fff]'>{toast}</span>
        </div>
      }
    </div>
  );
}

export default Layout;
