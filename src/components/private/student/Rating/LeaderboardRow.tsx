import { Flame, Clock } from 'lucide-react';
import { getMedal } from '@/lib/medals';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  streak: number;
  score: number;
  avgTime?: number;
  isCurrentUser?: boolean;
}

const LeaderboardRow = ({ rank, name, streak, score, avgTime, isCurrentUser }: LeaderboardRowProps) => {
  const medal = getMedal(rank);

  return (
    <div className={`p-4 md:px-8 md:py-5 rounded-[24px] border shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-between group ${
      isCurrentUser ? 'bg-[#FFF7ED] border-[#F97316]/20' : medal ? `${medal.bg} ${medal.border}` : 'bg-white border-[#F2F4F7]'
    }`}>
      <div className="flex items-center gap-4 md:gap-6">
        {/* Rank + Medal */}
        <div className="w-10 text-center shrink-0">
          {medal ? (
            <span className="text-2xl">{medal.emoji}</span>
          ) : (
            <span className="text-sm font-black text-[#98A2B3]">#{rank}</span>
          )}
        </div>

        {/* Avatar */}
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm transition-transform duration-300 group-hover:scale-110 ${
          isCurrentUser ? 'bg-primary text-white' : medal ? `${medal.bg} ${medal.text} border ${medal.border}` : 'bg-[#F2F4F7] text-[#141F38]'
        }`}>
          {name.charAt(0)}
        </div>

        <div className="space-y-0.5">
          <h4 className={`text-sm md:text-base font-black tracking-tight ${isCurrentUser ? 'text-primary' : 'text-[#141F38]'}`}>
            {name} {isCurrentUser && <span className="text-xs opacity-80">(Siz)</span>}
          </h4>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-[#98A2B3] text-xs font-bold">{streak} kun</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {avgTime !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span className="text-sm font-bold text-[#98A2B3]">
              {Math.floor(avgTime / 60)}:{String(avgTime % 60).padStart(2, '0')}
            </span>
          </div>
        )}
        <div className="text-right">
          <span className="text-lg font-black text-[#141F38]">{score}</span>
          <p className="text-[#98A2B3] text-[9px] font-bold uppercase tracking-widest">ball</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
