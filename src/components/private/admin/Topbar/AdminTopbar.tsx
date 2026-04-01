import { useState, useEffect } from 'react';
import { Bell, Moon, Sun, Search, Menu } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationPanel from '@/components/private/student/Topbar/NotificationPanel';
import SearchPanel from './SearchPanel';

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  const { toggleTheme, isDark } = useThemeStore();
  const { user } = useAuthStore();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const name = user?.profile?.full_name || user?.username || 'Admin';

  // Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: Event) => setShowSearch(true);
    document.addEventListener('open-search', handler);
    return () => document.removeEventListener('open-search', handler);
  }, []);
  const role = user?.role === 'admin' ? 'Super Admin' : "O'qituvchi";

  return (
    <header className="h-16 md:h-20 bg-white dark:bg-[#111111] border-b border-[#F2F4F7] dark:border-white/6 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-white/10 text-[#667085] dark:text-white/60">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 max-w-xl hidden md:block">
          <button
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-3 bg-[#F9FAFB] dark:bg-white/5 rounded-2xl py-3 pl-4 pr-3 text-left hover:bg-[#F2F4F7] dark:hover:bg-white/8 transition-colors group"
          >
            <Search className="w-5 h-5 text-[#98A2B3] group-hover:text-primary transition-colors" />
            <span className="flex-1 text-sm font-medium text-[#C0C5CD] dark:text-white/25">Qidirish...</span>
            <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-white/10 border border-[#E4E7EC] dark:border-white/10 text-[10px] font-bold text-[#98A2B3]">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(true)}
          className="relative p-2 md:p-3 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-white/10 transition-all"
        >
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-[#667085] dark:text-white/60" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-[#F04438] rounded-full border-2 border-white dark:border-[#111111] flex items-center justify-center">
              <span className="text-[9px] font-black text-white leading-none">{unreadCount > 9 ? '9+' : unreadCount}</span>
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 md:p-3 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-white/10 transition-all hidden sm:block"
          title={isDark() ? "Yorug' rejim" : "Qorong'u rejim"}
        >
          {isDark()
            ? <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            : <Moon className="w-5 h-5 md:w-6 md:h-6 text-[#667085]" />
          }
        </button>

        <div className="h-10 w-px bg-[#F2F4F7] dark:bg-white/10 mx-1 md:mx-2 hidden sm:block" />

        <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#1D2939] dark:text-white">{name}</p>
            <p className="text-[11px] font-bold text-[#667085] dark:text-white/50 uppercase tracking-wider">{role}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-black text-sm">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Search Panel */}
      <SearchPanel
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />
    </header>
  );
};

export default AdminTopbar;
