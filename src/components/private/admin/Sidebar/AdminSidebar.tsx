import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  CheckSquare,
  Book,
  Award,
  PieChart,
  FileText,
  LogOut,
  X,
  Layers,
  Globe,
  GraduationCap
} from 'lucide-react';
import SidebarItem from '@/components/private/student/Sidebar/SidebarItem';
import { useLogout } from '@/hooks/useAuth';
import { customAlert } from '@/components/ui/CustomAlert';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isOpen = false, onClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const menuItems = [
    { icon: LayoutGrid, label: 'Bosh sahifa', path: '/admin/dashboard' },
    { icon: Users, label: 'Talabalar', path: '/admin/students' },
    { icon: Layers, label: 'Guruhlar', path: '/admin/groups' },
    { icon: Book, label: "O'quv dasturi", path: '/admin/lessons' },
    { icon: CheckSquare, label: 'Testlar', path: '/admin/tests' },
    { icon: Award, label: 'Reyting', path: '/admin/rating' },
    { icon: PieChart, label: 'Analitika', path: '/admin/analytics' },
    { icon: FileText, label: 'Hisobotlar', path: '/admin/reports' },
    { icon: GraduationCap, label: "O'qituvchilar", path: '/admin/teachers' },
    { icon: Globe, label: 'Landing sahifa', path: '/admin/landing' },
  ];

  const handleLogout = () => {
    customAlert.confirm({
      variant: 'warning',
      title: 'Tizimdan chiqish',
      description: 'Haqiqatdan ham tizimdan chiqmoqchimisiz? Barcha saqlangan sessiyangiz tugaydi.',
      confirmText: 'Ha, chiqish',
      cancelText: 'Bekor qilish',
      icon: LogOut,
      onConfirm: () => {
        logout();
      },
    });
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 bg-white border-r border-[#F2F4F7] flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      <div className="px-6 mb-12 flex items-center justify-between">
        <img src="/img/Mask group.png" alt="Ustoznation Logo" className="h-8 md:h-10" />
        <button className="lg:hidden text-[#98A2B3] hover:bg-[#F2F4F7] p-2 rounded-xl" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
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

export default AdminSidebar;
