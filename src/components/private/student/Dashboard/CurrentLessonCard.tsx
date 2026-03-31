import React from 'react';
import { Play } from 'lucide-react';

interface CurrentLessonCardProps {
  title: string;
  completed: number;
  total: number;
  onContinue?: () => void;
}

const CurrentLessonCard = ({ title, completed, total, onContinue }: CurrentLessonCardProps) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-white p-5 rounded-[28px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Play className="w-5 h-5 text-primary fill-primary" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-black text-[#141F38] mb-0.5">{title}</h3>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8C94A3]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">menu_book</span>
                <span>{total} dars</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">task_alt</span>
                <span>{completed}/{total} tugallangan</span>
              </div>
            </div>
            
            <div className="w-full max-w-[180px] h-1.5 bg-[#F2F4F7] rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={onContinue}
          className="px-4 py-2 bg-primary text-white rounded-[14px] text-[11px] font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-300 whitespace-nowrap border-none cursor-pointer hidden sm:block"
        >
          Davom etish
        </button>
      </div>
      
      <button 
          onClick={onContinue}
          className="w-full mt-4 px-4 py-2.5 bg-primary text-white rounded-[14px] text-[11px] font-bold tracking-wide transition-all border-none cursor-pointer sm:hidden block"
        >
          Davom etish
        </button>
    </div>
  );
};

export default CurrentLessonCard;
