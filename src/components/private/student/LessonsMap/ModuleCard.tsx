import React from 'react';
import { Check, Play, Lock } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  lessons: number;
  completedLessons: number;
  status: 'completed' | 'current' | 'locked';
  onAction?: () => void;
}

const ModuleCard = ({ title, lessons, completedLessons, status, onAction }: ModuleCardProps) => {
  const percentage = lessons > 0 ? (completedLessons / lessons) * 100 : 0;

  return (
    <div className={`bg-white p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-[#F2F4F7] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 ${
      status === 'locked' ? 'opacity-70' : 'hover:shadow-md'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative">
        <div className="flex items-center gap-4 flex-1">
          {/* Icon Circle */}
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${
            status === 'completed' 
              ? 'bg-[#E1F9EB] text-[#22C55E]' 
              : status === 'current'
                ? 'bg-[#FFF1E7] text-[#F97316]'
                : 'bg-[#F2F4F7] text-[#98A2B3]'
          }`}>
            {status === 'completed' ? (
              <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
            ) : status === 'current' ? (
              <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" strokeWidth={2} />
            ) : (
              <Lock className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 w-full space-y-1">
            <h4 className="text-sm md:text-base font-black text-[#141F38]">{title}</h4>
            <div className="flex items-center gap-3 text-[#8C94A3] text-[11px] md:text-xs font-semibold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                {lessons} dars
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {completedLessons}/{lessons} tugallangan
              </span>
            </div>

            {/* Progress Bar (Only visible if not locked) */}
            {status !== 'locked' && (
              <div className="w-full h-1 md:h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden mt-3">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    status === 'completed' ? 'bg-[#22C55E]' : 'bg-[#F97316]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Button for Current Module */}
        {status === 'current' && (
          <div className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto flex justify-end">
            <button 
              onClick={onAction}
              className="w-full md:w-auto px-6 py-2 md:py-2.5 bg-[#F97316] text-white rounded-[20px] font-bold text-[11px] md:text-xs transition-all active:scale-95 cursor-pointer border-none hover:bg-[#F97316]/90 shadow-sm"
            >
              Testdan o'tish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
