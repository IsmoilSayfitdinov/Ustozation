import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RankingEntry } from '@/types/api';

interface RatingCardProps {
  ranking: RankingEntry[] | undefined;
  currentUserRank: number | null;
}

const RatingCard = ({ ranking, currentUserRank }: RatingCardProps) => {
  const displayRanking = (ranking || []).slice(0, 4);

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-base md:text-lg font-black text-[#141F38]">Reyting</h3>
        </div>
        <Link to="/student/rating" className="text-xs font-bold text-primary flex items-center hover:opacity-80 transition-opacity">
          Barchasi <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {displayRanking.map((user, idx) => (
            <div
              key={user.student_id}
              className={`flex items-center justify-between p-2.5 rounded-[12px] md:rounded-2xl transition-colors ${
                user.rank === currentUserRank ? 'bg-[#FFEEDD]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full ${
                  user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                  user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                  user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                  'text-[#8C94A3]'
                }`}>
                  {user.rank}
                </span>
                
                <div className="flex items-center gap-2">
                   <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                     {user.username.charAt(0).toUpperCase()}
                   </div>
                   <span className={`text-sm font-bold ${user.rank === currentUserRank ? 'text-primary' : 'text-[#141F38]'}`}>
                     {user.username} {user.rank === currentUserRank && '(Sen)'}
                   </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#8C94A3]">{user.total_points} ball</span>
              </div>
            </div>
          ))}
        </div>

        {currentUserRank && (
          <div className="pt-4 border-t border-gray-100 mt-2 text-center text-xs font-bold text-[#8C94A3]">
             Sening o'rning: <span className="text-primary">#{currentUserRank}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
