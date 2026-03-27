import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface TestTypeCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  count: number;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}

const TestTypeCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  count, 
  iconBg, 
  iconColor, 
  onClick 
}: TestTypeCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between cursor-pointer group"
    >
      <div className="flex items-center gap-5">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-7 h-7" style={{ color: iconColor }} />
        </div>
        
        <div className="space-y-0.5">
          <h4 className="text-lg font-black text-[#141F38] tracking-tight">{title}</h4>
          <p className="text-[#667085] text-xs font-bold leading-tight">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[#667085] text-sm font-bold">{count} ta</span>
        <div className="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center group-hover:bg-surface-tint group-hover:text-white transition-colors duration-300">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default TestTypeCard;
