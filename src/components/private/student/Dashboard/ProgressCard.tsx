import React from 'react';
import { Award } from 'lucide-react';

interface ProgressCardProps {
  level: number;
  title: string;
  percentage: number;
  remaining: number;
  children?: React.ReactNode;
}

const ProgressCard = ({ level, title, percentage, remaining, children }: ProgressCardProps) => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col items-center justify-center space-y-5 h-full transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-2 self-start mb-2">
        <Award className="w-5 h-5 text-primary" />
        <span className="text-sm md:text-base font-black text-[#141F38]">Daraja progressi</span>
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-3xl md:text-[40px] leading-none font-black text-primary">Level {level}</h2>
        <p className="text-xs md:text-sm font-semibold text-[#8C94A3]">{title}</p>
      </div>

      <div className="w-full space-y-3 pt-2">
        <div className="w-full h-2.5 bg-[#F2F4F7] rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-center">
          <span className="text-[11px] md:text-xs font-bold text-[#8C94A3]">
            {percentage}% — Keyingi darajagacha {remaining}% qoldi
          </span>
        </div>
      </div>
      
      {children && (
        <div className="w-full pt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
