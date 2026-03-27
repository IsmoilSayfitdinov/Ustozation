import React from 'react';

interface TestHistoryItemProps {
  percentage: number;
  name: string;
  date: string;
  ball: number;
  score: string;
  time: string;
  color: 'success' | 'warning' | 'error';
}

const TestHistoryItem = ({ 
  percentage, 
  name, 
  date, 
  ball, 
  score, 
  time,
  color 
}: TestHistoryItemProps) => {
  const colorMap = {
    success: { bg: 'bg-[#22C55E1A]', text: 'text-[#22C55E]' },
    warning: { bg: 'bg-surface-tint/10', text: 'text-surface-tint' },
    error: { bg: 'bg-[#DC26261A]', text: 'text-[#DC2626]' },
  };

  const selectedColor = colorMap[color];

  return (
    <div className="bg-white p-5 rounded-[28px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-between group">
      <div className="flex items-center gap-6">
        {/* Progress Circle */}
        <div className={`w-14 h-14 rounded-2xl ${selectedColor.bg} ${selectedColor.text} flex items-center justify-center font-black text-sm shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          {percentage}%
        </div>

        <div className="space-y-1">
          <h4 className="text-lg font-black text-[#141F38] tracking-tight">{name}</h4>
          <p className="text-[#98A2B3] text-xs font-bold leading-tight uppercase tracking-widest">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-10 text-right">
        <div>
          <span className="text-xl font-black text-[#141F38] tracking-tight">{ball} ball</span>
        </div>
        
        <div className="flex flex-col items-end gap-0.5 min-w-[100px]">
          <span className="text-[#667085] text-sm font-bold">{score}</span>
          <span className="text-[#98A2B3] text-xs font-bold">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default TestHistoryItem;
