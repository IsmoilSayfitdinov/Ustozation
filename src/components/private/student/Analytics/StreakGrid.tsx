import React from 'react';
import { STREAK_DAYS } from '@/data/student';

const StreakGrid = () => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#141F38]">Streak Taqviyimi</h3>
        <p className="text-sm font-semibold text-[#667085]">Oxirgi 30 kun</p>
      </div>
      
      <div className="grid grid-cols-7 gap-3">
        {STREAK_DAYS.map((item, index) => (
          <div 
            key={index}
            className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] font-bold transition-all ${
              item.status === 'active' 
                ? 'bg-surface-tint border-surface-tint text-white shadow-lg shadow-surface-tint/20' 
                : item.status === 'missed'
                ? 'bg-[#FEE4E2] border-[#FEE4E2] text-[#F04438]'
                : 'bg-[#F9FAFB] border-[#F2F4F7] text-[#98A2B3]'
            }`}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakGrid;
