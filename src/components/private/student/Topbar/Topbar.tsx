import { useState } from 'react';
import { Bell, Moon, Sun, User, Settings, LogOut, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useNotifications } from '@/hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme, isDark } = useThemeStore();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarLetter = (user?.profile?.full_name?.[0] || user?.username?.[0] || 'U').toUpperCase();

  return (
    <header className="h-16 md:h-20 bg-white dark:bg-[#111111] border-b border-[#F2F4F7] dark:border-white/6 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-[#F9FAFB] dark:hover:bg-white/10 text-[#667085] dark:text-white/60 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 min-w-0 md:hidden"></div>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-3 relative shrink-0">
        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(true)}
          className="relative p-2 md:p-2.5 w-10 h-10 md:w-12 md:h-12 cursor-pointer flex items-center justify-center bg-[#F4F4F6] dark:bg-white/10 rounded-xl md:rounded-2xl text-[#667085] dark:text-white/60 hover:text-primary transition-all duration-300"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-[#F04438] rounded-full border-2 border-white dark:border-[#111111] flex items-center justify-center">
              <span className="text-[9px] font-black text-white leading-none">{unreadCount > 9 ? '9+' : unreadCount}</span>
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden sm:flex p-2 md:p-2.5 cursor-pointer w-10 h-10 md:w-12 md:h-12 items-center justify-center bg-[#F4F4F6] dark:bg-white/10 rounded-xl md:rounded-2xl text-[#667085] dark:text-white/60 hover:text-primary transition-all duration-300"
          title={isDark() ? "Yorug' rejim" : "Qorong'u rejim"}
        >
          {isDark() ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
        </button>

        {/* Avatar Dropdown */}
        <div className="relative">
          <Avatar
            className='w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-white font-black text-xs md:text-sm">{avatarLetter}</AvatarFallback>
          </Avatar>

        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </header>
  );
};

export default Topbar;
