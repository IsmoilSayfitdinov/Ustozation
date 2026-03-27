import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/private/student/Sidebar/Sidebar';
import Topbar from '@/components/private/student/Topbar/Topbar';

const StudentLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FCFCFD]">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="p-4 md:p-8 pb-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentLayout;
