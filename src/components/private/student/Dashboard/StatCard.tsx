import React from 'react';
import { LucideIcon } from 'lucide-react';

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
  subLabel, 
  iconBg, 
  iconColor,
  actionText,
  onAction,
}: StatCardProps) => {
  return (
    <div className="bg-white p-5 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4 md:gap-6">
      <div 
        className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-black/5"
        style={{ 
          background: iconBg.includes('linear') ? iconBg : `linear-gradient(135deg, ${iconColor}22 0%, ${iconColor}11 100%)`,
          backgroundColor: !iconBg.includes('linear') ? iconBg : undefined
        }}
      >
        <div className={`w-full h-full rounded-2xl md:rounded-full flex items-center justify-center ${iconBg === 'primary' ? 'bg-primary' : ''}`}
             style={{ background: iconBg === 'primary' ? 'linear-gradient(135deg, #FF8433 0%, #F97316 100%)' : undefined }}>
           <Icon className="w-7 h-7 md:w-10 md:h-10" style={{ color: iconBg === 'primary' ? 'white' : iconColor }} />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-4xl font-black text-[#141F38] leading-none">{value}</span>
          {subLabel && <span className="text-sm md:text-lg">{subLabel}</span>}
        </div>
        <div className="mt-1 flex items-center justify-between gap-4">
          <p className="text-[#667085] text-sm md:text-base font-semibold truncate leading-tight">{label}</p>
          {actionText && (
            <button 
              onClick={onAction}
              className="text-surface-tint text-[13px] font-black hover:underline cursor-pointer py-0.5 whitespace-nowrap flex items-center gap-1.5 transition-all hover:gap-2 border-none bg-transparent"
            >
              {actionText}
              <span className="text-lg">→</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default StatCard;
