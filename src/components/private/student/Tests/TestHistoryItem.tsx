import React, { useState } from 'react';
import { Clock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TestAttempt {
  date: string;
  percentage: number;
}

interface TestHistoryItemProps {
  percentage: number;
  name: string;
  date: string;
  ball: number;
  score: string;
  time: string;
  attempts?: TestAttempt[];
}

const TestHistoryItem = ({ 
  percentage, 
  name, 
  date, 
  ball, 
  score, 
  time,
  attempts = [],
}: TestHistoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getColorTheme = (value: number) => {
    if (value >= 80) return { bg: 'bg-[#E8FFF0]', text: 'text-[#22C55E]' };
    if (value >= 60) return { bg: 'bg-[#FFF6ED]', text: 'text-surface-tint' };
    return { bg: 'bg-[#FFF0F0]', text: 'text-[#F04438]' };
  };

  const selectedColor = getColorTheme(percentage);
  
  // Calculate if trend is going down on latest attempt compared to previous
  const isTrendDown = attempts.length > 1 && attempts[attempts.length - 1].percentage < attempts[attempts.length - 2].percentage;

  return (
    <div className="bg-white p-6 rounded-[28px] border border-[#F2F4F7] shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
      <div className="flex flex-col gap-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-5">
          {/* Progress Circle Equivalent */}
          <div className={`w-14 h-14 rounded-2xl ${selectedColor.bg} ${selectedColor.text} flex items-center justify-center font-black text-[15px] shrink-0 transition-transform duration-300 group-hover:scale-105`}>
            {percentage}%
          </div>

          <div className="space-y-1">
            <h4 className="text-[17px] font-black text-[#141F38] tracking-tight">{name}</h4>
            <p className="text-[#98A2B3] text-[11px] font-bold leading-tight tracking-widest">{date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
          <div className="bg-[#F8F9FA] rounded-xl p-3 text-center transition-colors group-hover:bg-[#F0F2F5] flex flex-col items-center justify-center gap-1">
             <p className="text-[10px] text-[#98A2B3] font-bold uppercase flex items-center justify-center gap-1">To'g'ri</p>
             <p className="font-black text-[#141F38] text-[15px]">{score}</p>
          </div>
          <div className="bg-[#F8F9FA] rounded-xl p-3 text-center transition-colors group-hover:bg-[#F0F2F5] flex flex-col items-center justify-center gap-1">
             <p className="text-[10px] text-[#98A2B3] font-bold uppercase flex items-center justify-center gap-1"><Clock className="w-3 h-3"/> Vaqt</p>
             <p className="font-black text-[#141F38] text-[15px]">{time}</p>
          </div>
           <div className="bg-[#F8F9FA] rounded-xl p-3 text-center transition-colors group-hover:bg-[#F0F2F5] flex flex-col items-center justify-center gap-1">
             <p className="text-[10px] text-[#98A2B3] font-bold uppercase flex items-center justify-center gap-1">Urinish</p>
             <p className="font-black text-[#141F38] text-[15px]">{(attempts?.length || 1)} marta</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && attempts && attempts.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pt-6 mt-4 border-t border-[#F2F4F7]"
          >
            <p className="text-[#98A2B3] font-bold text-[11px] uppercase tracking-widest mb-4">Urinishlar tarixi:</p>
            <div className="space-y-3">
              {attempts.map((attempt, index) => {
                const colors = getColorTheme(attempt.percentage);
                return (
                  <div key={index} className="flex justify-between items-center text-[13px] font-bold">
                    <span className="text-[#667085]">{index + 1}-urinish ({attempt.date})</span>
                    <span className={colors.text}>
                      {attempt.percentage}% {index > 0 && attempt.percentage < attempts[index - 1].percentage ? '↓' : attempt.percentage > (index > 0 ? attempts[index - 1].percentage : 0) ? '↑' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Warning block */}
            {isTrendDown && (
              <div className="mt-5 flex items-center gap-2 text-surface-tint text-[12px] font-bold">
                <Activity className="w-4 h-4 shrink-0" />
                <span>⚠️ Ball kamaymoqda — mavzuni qayta o'rganing</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestHistoryItem;
