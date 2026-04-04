import { Flame } from 'lucide-react';
import { getMedal } from '@/lib/medals';

interface TopThreeCardProps {
  rank: 1 | 2 | 3;
  name: string;
  score: number;
  streak: number;
}

const TopThreeCard = ({ rank, name, score, streak }: TopThreeCardProps) => {
  const isFirst = rank === 1;
  const medal = getMedal(rank);

  return (
    <div className={`p-6 md:p-8 rounded-[32px] flex flex-col items-center justify-center text-center space-y-3 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
      isFirst
        ? 'bg-gradient-to-br from-[#FFD700] to-[#F59E0B] text-white shadow-xl shadow-[#FFD700]/30 scale-105 z-10'
        : rank === 2
          ? 'bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] text-[#141F38] border border-[#C0C0C0]/30 shadow-md'
          : 'bg-gradient-to-br from-[#FFF8F0] to-[#FFEDD5] text-[#141F38] border border-[#CD7F32]/20 shadow-md'
    }`}>
      {/* Medal */}
      <div className="text-5xl group-hover:scale-125 transition-transform duration-500">
        {medal?.emoji}
      </div>

      {/* Rank badge */}
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        isFirst ? 'bg-white/25 text-white' : rank === 2 ? 'bg-[#C0C0C0]/20 text-[#6B7280]' : 'bg-[#CD7F32]/15 text-[#92400E]'
      }`}>
        {rank}-o'rin · {medal?.label}
      </div>

      <div className="space-y-1">
        <h3 className={`text-lg font-black tracking-tight ${isFirst ? 'text-white' : 'text-[#141F38]'}`}>
          {name}
        </h3>
        <span className={`text-3xl font-black ${isFirst ? 'text-white' : 'text-[#1D2939]'}`}>
          {score}
        </span>
        <div className="flex items-center justify-center gap-1.5">
          <Flame className={`w-4 h-4 ${isFirst ? 'text-white/80' : 'text-[#F97316]'}`} />
          <span className={`text-[11px] font-bold ${isFirst ? 'text-white/80' : 'text-[#98A2B3]'}`}>
            {streak} kunlik streak
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopThreeCard;
