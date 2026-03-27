import React from 'react';
import { Flame } from 'lucide-react';

const StreakGraph = () => {
  // Mock data for 30 days
  const days = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    status: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'twice' : 'once') : 'none'
  }));

  return (
    <div className="bg-white mt-4 md:mt-[24px] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#F2F4F7] shadow-sm space-y-4 md:space-y-6">
      <div className="flex items-center gap-2">
        <Flame color='#F97015' className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        <h3 className="text-xs md:text-sm font-bold text-[#141F38]">Streak grafigi (30 kun)</h3>
      </div>

      <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {days.map((day) => (
          <div 
            key={day.id}
            className={`aspect-square rounded-lg transition-all duration-500 hover:scale-110 cursor-pointer ${
              day.status === 'twice' 
                ? 'bg-[#6D2D03]' 
                : day.status === 'once'
                ? 'bg-[#FA802E]'
                : 'bg-[#F2F4F7]'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#FA802E]" />
          <span className="text-xs font-semibold text-on-surface-variant">Bir marta topshirilgan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#6D2D03]" />
          <span className="text-xs font-semibold text-on-surface-variant">Qayta topshirilgan</span>
        </div>
      </div>
    </div>
  );
};

export default StreakGraph;
