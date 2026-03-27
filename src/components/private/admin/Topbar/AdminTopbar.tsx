import { Bell, Moon, Search, Menu } from 'lucide-react';

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  return (
    <header className="h-16 md:h-20 bg-white border-b border-[#F2F4F7] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-[#F9FAFB] text-[#667085]">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#98A2B3] group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Qidirish..." 
            className="w-full bg-[#F9FAFB] border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
        </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="p-2 md:p-3 rounded-xl hover:bg-[#F9FAFB] transition-all relative">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-[#667085]" />
          <span className="absolute top-2 right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#F04438] border-2 border-white rounded-full" />
        </button>
        
        <button className="p-2 md:p-3 rounded-xl hover:bg-[#F9FAFB] transition-all hidden sm:block">
          <Moon className="w-5 h-5 md:w-6 md:h-6 text-[#667085]" />
        </button>

        <div className="h-10 w-px bg-[#F2F4F7] mx-1 md:mx-2 hidden sm:block" />

        <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#1D2939]">Ismoil R.</p>
            <p className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Super Admin</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 border-2 border-primary/20 p-0.5 group cursor-pointer transition-all hover:scale-105 active:scale-95">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop" 
              alt="User" 
              className="w-full h-full rounded-[14px] object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
