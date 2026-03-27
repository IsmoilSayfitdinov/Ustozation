import React from 'react';
import { AlertCircle, TrendingUp, LucideIcon } from 'lucide-react';

interface AIAnalysisCardProps {
  type: 'warning' | 'success';
  title: string;
  description: string;
}

const AIAnalysisCard = ({ type, title, description }: AIAnalysisCardProps) => {
  const isWarning = type === 'warning';
  
  const colors = isWarning 
    ? {
        bg: 'bg-orange-50',
        border: 'border-orange-200/50',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
      }
    : {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200/50',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-500',
      };

  const Icon: LucideIcon = isWarning ? AlertCircle : TrendingUp;

  return (
    <div className={`${colors.bg} ${colors.border} border p-6 rounded-[28px] flex items-center gap-6 group hover:shadow-lg transition-all duration-300`}>
      <div className={`${colors.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
        <Icon className={`${colors.iconColor} w-6 h-6`} />
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-black text-[#141F38] tracking-tight">{title}</h4>
        <p className="text-[#667085] text-sm font-semibold leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisCard;
