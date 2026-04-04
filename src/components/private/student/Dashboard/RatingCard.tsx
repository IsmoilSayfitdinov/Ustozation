import { ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMedal } from '@/lib/medals';
import type { RankingEntry } from '@/types/api';

interface RatingCardProps {
  ranking: RankingEntry[] | undefined;
  currentUserRank: number | null;
}

const RatingCard = ({ ranking, currentUserRank }: RatingCardProps) => {
  const displayRanking = (ranking || []).slice(0, 4);
  const currentMedal = currentUserRank ? getMedal(currentUserRank) : null;

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <h3 className="text-base md:text-lg font-black text-[#141F38]">Reyting</h3>
        </div>
        <Link to="/student/rating" className="text-xs font-bold text-primary flex items-center hover:opacity-80 transition-opacity">
          Barchasi <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3">
        {displayRanking.length > 0 ? (
          <div className="space-y-2">
            {displayRanking.map((user) => {
              const medal = getMedal(user.rank);
              const isCurrent = user.rank === currentUserRank;
              return (
                <div
                  key={user.student_id}
                  className={`flex items-center justify-between p-2.5 rounded-2xl transition-colors ${
                    isCurrent ? 'bg-[#FFF7ED] border border-primary/10' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Medal or rank number */}
                    <div className="w-8 text-center shrink-0">
                      {medal ? (
                        <span className="text-xl">{medal.emoji}</span>
                      ) : (
                        <span className="text-xs font-black text-[#98A2B3]">#{user.rank}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        medal ? `${medal.bg} ${medal.text} border ${medal.border}` : 'bg-[#F2F4F7] text-[#667085]'
                      }`}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={`text-sm font-bold ${isCurrent ? 'text-primary' : 'text-[#141F38]'}`}>
                        {user.username} {isCurrent && '(Sen)'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#667085]">{user.total_points}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-6 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F9FAFB] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#D0D5DD]" />
            </div>
            <p className="text-sm font-bold text-[#98A2B3]">Reyting hali bo'sh</p>
          </div>
        )}

        {currentUserRank && (
          <div className="pt-3 border-t border-[#F2F4F7] text-center text-xs font-bold text-[#98A2B3]">
            Sening o'rning: {currentMedal ? <span className="text-lg">{currentMedal.emoji}</span> : <span className="text-primary">#{currentUserRank}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
