import { useState } from 'react';
import { Bell, Moon, User, Settings, LogOut, X, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { STUDENT_PROFILE } from '@/data/student';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  onMenuClick?: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const notifications = [
    { title: 'Yangi dars!', desc: '2-modul 4-dars ochildi.', time: '5 daqiqa oldin' },
    { title: 'Reyting yangilandi', desc: 'Siz top 10 ga kirdingiz!', time: '1 soat oldin' },
  ];

  return (
    <header className="h-16 md:h-20 bg-white border-b border-[#F2F4F7] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-[#F9FAFB] text-[#667085] transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 min-w-0 md:hidden"></div>
      </div>

      <div className="flex items-center justify-end gap-2 md:gap-4 relative shrink-0">
        {/* Notifications Button */}
        <button 
          onClick={() => setShowNotifications(true)}
          className="p-2 md:p-2.5 w-10 h-10 md:w-12 md:h-12 cursor-pointer flex items-center justify-center bg-[#F4F4F6] rounded-xl md:rounded-[28px] border border-[#FFFFFF33] text-[#667085] hover:text-surface-tint transition-all duration-300 relative"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#F04438] rounded-full border-2 border-white animate-pulse"></span>
        </button>

        {/* Theme Toggle (Static) */}
        <button className="hidden sm:flex p-2 md:p-2.5 cursor-pointer w-10 h-10 md:w-12 md:h-12 items-center justify-center bg-[#F4F4F6] rounded-xl md:rounded-[28px] border border-[#FFFFFF33] text-[#667085] hover:text-surface-tint transition-all duration-300">
          <Moon className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Avatar Dropdown Wrapper */}
        <div className="relative">
          <Avatar 
            className='w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:ring-2 hover:ring-surface-tint transition-all'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <AvatarImage src="" />
            <AvatarFallback className="bg-surface-tint text-white font-black text-xs md:text-sm">{STUDENT_PROFILE.avatar}</AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-[#F2F4F7] rounded-3xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <button 
                    onClick={() => { navigate('/student/profile'); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#141F38] font-bold text-sm hover:bg-[#F9FAFB] transition-all"
                  >
                    <User className="w-4 h-4 text-surface-tint" />
                    Profil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#141F38] font-bold text-sm hover:bg-[#F9FAFB] transition-all">
                    <Settings className="w-4 h-4 text-[#667085]" />
                    Sozlamalar
                  </button>
                  <div className="h-px bg-[#F2F4F7] my-2 mx-2" />
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#F04438] font-bold text-sm hover:bg-[#FEE4E2]/50 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Chiqish
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notifications Dialog */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowNotifications(false)}
               className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 z-101 border border-[#F2F4F7]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-[#141F38]">Bildirishnomalar</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-[#F9FAFB] rounded-xl transition-all"
                >
                  <X className="w-6 h-6 text-[#98A2B3]" />
                </button>
              </div>

              <div className="space-y-4">
                {notifications.map((n, i) => (
                  <div key={i} className="p-5 bg-[#F9FAFB] rounded-3xl border border-[#F2F4F7] hover:border-surface-tint transition-all group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-surface-tint/10 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-surface-tint" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#141F38]">{n.title}</h4>
                      <p className="text-sm text-[#667085] mt-0.5">{n.desc}</p>
                      <p className="text-[10px] font-bold text-[#98A2B3] mt-2 uppercase tracking-widest">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowNotifications(false)}
                className="w-full mt-8 bg-[#F2F4F7] text-[#141F38] py-4 rounded-2xl font-black text-sm hover:bg-[#EAECF0] transition-all"
              >
                Barchasini o'qilgan deb belgilash
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Topbar;
