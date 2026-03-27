import React from 'react';
import { Play } from 'lucide-react';

interface CurrentLessonCardProps {
  title: string;
  completed: number;
  total: number;
  onContinue?: () => void;
}

const CurrentLessonCard = ({ title, completed, total, onContinue }: CurrentLessonCardProps) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-[18px] md:rounded-full bg-surface-tint/5 flex items-center justify-center shrink-0 shadow-sm border border-surface-tint/10">
        <Play className="w-6 h-6 md:w-8 md:h-8 text-surface-tint fill-surface-tint" />
      </div>

      <div className="flex-1 min-w-0 space-y-2 md:space-y-3 w-full text-center md:text-left">
        <div className="space-y-1">
          <h3 className="text-lg md:text-2xl font-black text-[#141F38] tracking-tight truncate">{title}</h3>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-on-surface-variant">
             <div className="flex items-center gap-1.5 text-sm font-bold">
                <span className="material-symbols-outlined text-lg">book</span>
                {total} dars
             </div>
             <div className="flex items-center gap-1.5 text-sm font-bold">
                <span className="material-symbols-outlined text-lg">schedule</span>
                {completed}/{total} tugallangan
             </div>
          </div>
        </div>
        
        <div className="w-full h-3 bg-[#F2F4F7] rounded-full overflow-hidden">
          <div 
            className="h-full bg-surface-tint rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button 
        onClick={onContinue}
        className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-surface-tint text-white rounded-xl md:rounded-2xl font-headline font-black text-xs md:text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-300 whitespace-nowrap border-none cursor-pointer"
      >
        Davom etish
      </button>
    </div>
  );
};

export default CurrentLessonCard;
