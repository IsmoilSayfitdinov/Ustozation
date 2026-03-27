import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-medium text-sm ${
        active 
          ? 'bg-[#F2F4F7] text-[#141F38] font-bold shadow-sm' 
          : 'text-on-surface-variant hover:bg-surface-variant/10 hover:text-primary'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-on-surface-variant'}`} />
      <span>{label}</span>
      {active && <div className="ml-auto w-1 h-4 bg-primary rounded-full" />}
    </button>
  );
};

export default SidebarItem;
