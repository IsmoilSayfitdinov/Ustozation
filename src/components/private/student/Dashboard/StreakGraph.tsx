import React from 'react';
import { Flame } from 'lucide-react';

const StreakGraph = () => {
  // Mock data for 30 days
  const days = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    status: Math.random() > 0.8 ? 'twice' : Math.random() > 0.4 ? 'once' : Math.random() > 0.2 ? 'light' : 'none'
  }));

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-4 md:space-y-6">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-primary" />
        <h3 className="text-sm md:text-base font-black text-[#141F38]">Streak grafigi (30 kun)</h3>
      </div>

      <div className="grid grid-cols-10 gap-1.5 md:gap-2">
        {days.map((day) => (
          <div 
            key={day.id}
            className={`aspect-square rounded-[8px] md:rounded-[12px] transition-all duration-300 hover:scale-105 cursor-pointer ${
              day.status === 'twice' 
                ? 'bg-[#6D2D03]' 
                : day.status === 'once'
                ? 'bg-[#F97316]'
                : day.status === 'light'
                ? 'bg-[#FFB782]'
                : 'bg-[#F2F4F7]'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#F97316]" />
          <span className="text-[11px] font-bold text-[#8C94A3]">Ko'p marta topshirgan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#F2F4F7]" />
          <span className="text-[11px] font-bold text-[#8C94A3]">Qayta topshirgan</span>
        </div>
      </div>
    </div>
  );
};

export default StreakGraph;
