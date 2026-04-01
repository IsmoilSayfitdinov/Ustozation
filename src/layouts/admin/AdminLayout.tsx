import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/private/admin/Sidebar/AdminSidebar';
import AdminTopbar from '@/components/private/admin/Topbar/AdminTopbar';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FCFCFD] dark:bg-[#0a0a0a]">
      <AdminSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <AdminTopbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        
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

export default AdminLayout;
