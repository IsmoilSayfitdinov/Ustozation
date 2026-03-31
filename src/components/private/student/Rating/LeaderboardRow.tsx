import React from 'react';
import { Flame, Clock } from 'lucide-react';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  streak: number;
  score: number;
  avgTime?: number;
  isCurrentUser?: boolean;
}

const LeaderboardRow = ({ rank, name, streak, score, avgTime, isCurrentUser }: LeaderboardRowProps) => {
  const getRankColor = () => {
    if (rank === 1) return 'text-surface-tint';
    if (rank === 2) return 'text-surface-tint';
    if (rank === 3) return 'text-surface-tint';
    return 'text-[#98A2B3]';
  };

  const getRankBg = () => {
    if (rank === 1) return 'bg-surface-tint/10';
    if (rank === 2) return 'bg-surface-tint/10';
    if (rank === 3) return 'bg-surface-tint/10';
    return 'bg-[#F8F9FA]';
  };

  return (
    <div className={`p-4 md:px-8 md:py-5 rounded-[24px] border border-[#F2F4F7] shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-between group ${
      isCurrentUser ? 'bg-[#FFF7ED] border-[#F9731633]' : 'bg-white'
    }`}>
      <div className="flex items-center gap-6">
        {/* Rank */}
        <span className={`text-sm font-black w-8 text-center ${getRankColor()}`}>
          #{rank}
        </span>

        {/* Avatar */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm transition-transform duration-300 group-hover:scale-110 ${
          isCurrentUser ? 'bg-surface-tint text-white' : 'bg-[#F2F4F7] text-[#141F38]'
        }`}>
          {name.charAt(0)}
        </div>

        <div className="space-y-0.5">
          <h4 className={`text-base font-black tracking-tight ${isCurrentUser ? 'text-surface-tint' : 'text-[#141F38]'}`}>
            {name} {isCurrentUser && <span className="text-xs opacity-80">(Siz)</span>}
          </h4>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-surface-tint" />
            <span className="text-[#98A2B3] text-xs font-bold">{streak} kun</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {avgTime !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 text-right">
            <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span className="text-sm font-bold text-[#98A2B3]">
              {Math.floor(avgTime / 60)}:{String(avgTime % 60).padStart(2, '0')}
            </span>
          </div>
        )}
        <div className="text-right">
          <span className="text-lg font-black text-[#141F38] tracking-tight">{score}</span>
          <p className="text-[#98A2B3] text-[10px] font-bold uppercase tracking-widest -mt-1">ball</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
