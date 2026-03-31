import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface TestTypeCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  count: number;
  iconBg: string;
  iconColor: string;
  passedCount?: number;
  failedCount?: number;
  onClick?: () => void;
}

const TestTypeCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  count, 
  iconBg, 
  iconColor, 
  passedCount = 0,
  failedCount = 0,
  onClick 
}: TestTypeCardProps) => {
  // Safe calculation for the donut chart
  const total = passedCount + failedCount || 1; // Prevent div by 0 for display empty
  const percentage = (passedCount + failedCount) > 0 ? Math.round((passedCount / total) * 100) : 0;
  
  // SVG Ring properties
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col gap-6"
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: iconBg }}
              >
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              
              <div className="space-y-0.5">
                <h4 className="text-[17px] font-black text-[#141F38] tracking-tight">{title}</h4>
                <p className="text-[#667085] text-[12px] font-bold leading-tight">{subtitle}</p>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-[#98A2B3] group-hover:text-surface-tint group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      <div className="h-px w-full bg-[#F2F4F7]" />

      <div className="flex items-center justify-between">
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="#EAECF0"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke={iconColor}
              strokeWidth="6"
              fill="transparent"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[14px] font-black text-[#141F38]">{percentage}%</span>
          </div>
        </div>

        <div className="space-y-1.5 flex-1 ml-6">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: iconColor }} />
              <span className="text-[#667085]">O'tgan</span>
            </div>
            <span className="text-[#141F38]">{passedCount} ta</span>
          </div>
          
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E4E7EC]" />
              <span className="text-[#667085]">O'tmagan</span>
            </div>
            <span className="text-[#141F38]">{failedCount} ta</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span />
        <span className="text-[11px] font-black text-[#667085]">
          Jami: {count} ta
        </span>
      </div>
    </div>
  );
};

export default TestTypeCard;
