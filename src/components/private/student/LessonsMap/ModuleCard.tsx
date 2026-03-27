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
  const percentage = (completedLessons / lessons) * 100;

  return (
    <div className={`bg-white p-6 rounded-[28px] border border-[#F2F4F7] shadow-sm transition-all duration-300 ${
      status === 'locked' ? 'opacity-60 grayscale' : 'hover:shadow-lg'
    }`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Icon Circle */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
          status === 'completed' 
            ? 'bg-[#E1F9EB] text-[#22C55E] border-[#22C55E1A]' 
            : status === 'current'
              ? 'bg-[#FFF1E7] text-[#F97316] border-[#F973161A]'
              : 'bg-[#F2F4F7] text-[#98A2B3] border-[#F2F4F7]'
        }`}>
          {status === 'completed' ? (
            <Check className="w-7 h-7" />
          ) : status === 'current' ? (
            <Play className="w-7 h-7 fill-current" />
          ) : (
            <Lock className="w-7 h-7" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 w-full space-y-3">
          <div>
            <h4 className="text-lg font-black text-[#141F38] tracking-tight">{title}</h4>
            <p className="text-surface-tint font-bold text-sm tracking-wide">
              {percentage}% Tugallangan
            </p>
            <div className="flex items-center gap-4 text-[#667085] text-xs font-bold mt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">book</span>
                {lessons} dars
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span>
                {completedLessons}/{lessons} tugallangan
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                status === 'completed' ? 'bg-[#22C55E]' : 'bg-surface-tint'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {status === 'current' && (
          <button 
            onClick={onAction}
            className="w-full md:w-auto px-6 py-3 bg-surface-tint text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-surface-tint/20 transition-all active:scale-95 whitespace-nowrap cursor-pointer border-none"
          >
            Testdan o'tish
          </button>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;
