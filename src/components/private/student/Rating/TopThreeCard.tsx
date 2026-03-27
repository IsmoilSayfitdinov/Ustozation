import React from 'react';
import { Trophy, Medal, Flame } from 'lucide-react';

interface TopThreeCardProps {
  rank: 1 | 2 | 3;
  name: string;
  score: number;
  streak: number;
}

const TopThreeCard = ({ rank, name, score, streak }: TopThreeCardProps) => {
  const isFirst = rank === 1;

  return (
    <div className={`p-8 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
      isFirst 
        ? 'bg-surface-tint text-white shadow-xl shadow-surface-tint/20 scale-105 z-10' 
        : 'bg-white text-[#141F38] border border-[#F2F4F7] shadow-sm'
    }`}>
      {/* Icon Wrapper */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-2 transition-transform duration-500 group-hover:scale-110 shadow-lg ${
        isFirst ? 'bg-white/20' : 'bg-[#141F38] text-white'
      }`}>
        {isFirst ? (
          <Trophy className="w-8 h-8" />
        ) : (
          <Medal className="w-8 h-8" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className={`text-xl font-black tracking-tight ${isFirst ? 'text-white' : 'text-[#141F38]'}`}>
          {name}
        </h3>
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-black ${isFirst ? 'text-white' : 'text-surface-tint'}`}>
            {score}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <Flame className={`w-4 h-4 ${isFirst ? 'text-white/80' : 'text-surface-tint'}`} />
            <span className={`text-xs font-bold uppercase tracking-widest ${isFirst ? 'text-white/80' : 'text-[#98A2B3]'}`}>
              {streak} kunlik streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopThreeCard;
