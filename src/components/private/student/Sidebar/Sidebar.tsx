import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  FileText,
  BarChart2,
  PieChart,
  User,
  LogOut,
  RefreshCcw,
  X
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useLogout } from '@/hooks/useAuth';
import { customAlert } from '@/components/ui/CustomAlert';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const menuItems = [
    { icon: Home, label: 'Bosh sahifa', path: '/student/dashboard' },
    { icon: BookOpen, label: 'Darslar xaritasi', path: '/student/lessons' },
    { icon: FileText, label: 'Testlar', path: '/student/tests' },
    { icon: BarChart2, label: 'Reyting', path: '/student/rating' },
    { icon: PieChart, label: 'Analitika', path: '/student/analytics' },
    { icon: RefreshCcw, label: 'Mavzular dinamikasi', path: '/student/review' },
    { icon: User, label: 'Profil', path: '/student/profile' },
  ];

  const handleLogout = () => {
    customAlert.confirm({
      variant: 'warning',
      title: 'Tizimdan chiqish',
      description: 'Haqiqatdan ham tizimdan chiqmoqchimisiz?',
      confirmText: 'Ha, chiqish',
      cancelText: 'Bekor qilish',
      icon: LogOut,
      onConfirm: () => {
        logout();
      },
    });
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 bg-white dark:bg-[#111111] border-r border-[#F2F4F7] dark:border-white/10 flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      <div className="px-6 mb-12 flex items-center justify-between">
        <img src="/img/Mask group.png" alt="Ustoznation Logo" className="h-8" />
        <button className="lg:hidden text-[#98A2B3] hover:bg-[#F2F4F7] p-2 rounded-xl transition-colors" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      <div className="pt-6 border-t border-[#F2F4F7]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#F04438] font-black text-sm hover:bg-[#FEE4E2] transition-all"
        >
          <LogOut className="w-5 h-5" />
          Chiqish
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
