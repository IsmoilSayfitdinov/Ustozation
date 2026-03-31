import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  subLabel?: string;
  iconBg: string;
  iconColor: string;
  actionText?: string;
  onAction?: () => void;
}

const StatCard = ({ 
  icon: Icon, 
  value, 
  label,  
  iconBg, 
  iconColor,
  onAction,
}: StatCardProps) => {
  return (
    <div 
      onClick={onAction}
      className={`bg-white p-4 lg:p-5 rounded-[24px] lg:rounded-[32px] border border-[#F2F4F7] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 transition-all duration-300 group ${onAction ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div 
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex flex-shrink-0 items-center justify-center transition-transform group-hover:scale-110"
          style={{ 
            backgroundColor: iconBg === 'primary' ? '#F97316' : iconBg.includes('var') ? undefined : iconBg,
            background: iconBg.includes('linear') ? iconBg : undefined
          }}
        >
          <Icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: iconBg === 'primary' ? 'white' : iconColor }} />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-base lg:text-xl font-black text-[#141F38] leading-none mb-1">{value}</span>
          <p className="text-[10px] lg:text-xs font-semibold text-[#8C94A3] truncate">{label}</p>
        </div>
      </div>

      <ChevronRight className={`w-4 h-4 lg:w-5 lg:h-5 text-[#8C94A3] ${onAction ? 'group-hover:text-primary group-hover:translate-x-1 transition-all' : 'opacity-0'}`} />
    </div>
  );
};

export default StatCard;
