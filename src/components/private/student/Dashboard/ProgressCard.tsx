import React from 'react';
import { Trophy } from 'lucide-react';

interface ProgressCardProps {
  level: number;
  title: string;
  percentage: number;
  remaining: number;
}

const ProgressCard = ({ level, title, percentage, remaining }: ProgressCardProps) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col items-center text-center space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Trophy className="w-4 h-4 md:w-5 md:h-5" />
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Daraja progressi</span>
      </div>

      <div className="space-y-0.5 md:space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-primary">Level {level}</h2>
        <p className="text-base md:text-lg font-bold text-[#141F38]">{title}</p>
      </div>

      <div className="w-full space-y-4">
        <div className="w-full h-3.5 bg-[#F2F4F7] rounded-full overflow-hidden">
          <div 
            className="h-full bg-surface-tint rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/80 font-bold text-xs">Yutuqlar</span>
          <span className="text-surface-tint">
            {percentage}%
          </span>
           <span className="opacity-40">•</span>
           <span>Keyingi darajagacha {remaining}% qoldi</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
