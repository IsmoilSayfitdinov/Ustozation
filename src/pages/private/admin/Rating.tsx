import { Trophy, Medal, Star, Award, Crown, Loader2, Flame } from 'lucide-react';
import { useRanking } from '@/hooks/useGamification';

const Rating = () => {
  const { data: ranking, isLoading } = useRanking();

  const allRanking = ranking ?? [];
  const top3 = allRanking.slice(0, 3);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Reyting</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-[#98A2B3]">Reyting yuklanmoqda...</p>
          </div>
        </div>
      ) : allRanking.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center">
                <Trophy className="w-14 h-14 text-[#F97316]" />
              </div>
              <div className="absolute -top-3 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center border-4 border-white animate-bounce">
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Reyting hali bo'sh</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed">
              Talabalar test topshirgandan so'ng reyting avtomatik shakllanadi. Ball, streak va vaqt bo'yicha saralanadi.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {top3.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {/* 2nd Place */}
              <div className="order-2 md:order-1 flex flex-col items-center justify-end group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl md:rounded-[32px] bg-white border-4 border-[#F2F4F7] flex items-center justify-center text-2xl md:text-3xl font-black text-primary shadow-xl group-hover:scale-110 transition-transform duration-500">
                    {getInitials(top3[1].username)}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#EAECF0] text-[#475467] font-black text-xs px-4 py-1.5 rounded-full shadow-lg border border-white">
                    2-o'rin
                  </div>
                </div>
                <div className="text-center space-y-1 mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-black text-[#1D2939]">{top3[1].username}</h3>
                  <p className="text-xs font-bold text-[#98A2B3]">{top3[1].total_points.toLocaleString()} ball</p>
                </div>
                <div className="w-full h-24 md:h-40 bg-gradient-to-b from-[#EAECF0]/50 to-transparent rounded-t-[32px] md:rounded-t-[40px] border-t-2 border-[#EAECF0] flex items-center justify-center">
                  <Medal className="w-8 h-8 md:w-12 md:h-12 text-[#98A2B3] opacity-50" strokeWidth={1.5} />
                </div>
              </div>

              {/* 1st Place */}
              <div className="order-1 md:order-2 flex flex-col items-center justify-end group -mt-6 md:-mt-12 scale-105 md:scale-110 relative z-10">
                <div className="relative mb-6 md:mb-8">
                  <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                    <Crown className="w-8 h-8 md:w-10 md:h-10 fill-primary" />
                  </div>
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[40px] bg-white border-4 border-primary flex items-center justify-center text-3xl md:text-4xl font-black text-primary shadow-2xl group-hover:scale-110 transition-transform duration-700 ring-8 ring-primary/5">
                    {getInitials(top3[0].username)}
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white font-black text-sm px-6 py-2 rounded-full shadow-xl border-2 border-white">
                    1-o'rin
                  </div>
                </div>
                <div className="text-center space-y-1 mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">{top3[0].username}</h3>
                  <p className="text-xs md:text-sm font-bold text-[#98A2B3]">{top3[0].total_points.toLocaleString()} ball</p>
                </div>
                <div className="w-full h-32 md:h-56 bg-gradient-to-b from-primary/10 to-transparent rounded-t-[32px] md:rounded-t-[48px] border-t-2 border-primary/20 flex items-center justify-center">
                  <Trophy className="w-10 h-10 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3 flex flex-col items-center justify-end group">
                <div className="relative mb-4 md:mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl md:rounded-[32px] bg-white border-4 border-[#F2F4F7] flex items-center justify-center text-2xl md:text-3xl font-black text-primary shadow-xl group-hover:scale-110 transition-transform duration-500">
                    {getInitials(top3[2].username)}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FEF6EE] text-[#B93815] font-black text-xs px-4 py-1.5 rounded-full shadow-lg border border-white">
                    3-o'rin
                  </div>
                </div>
                <div className="text-center space-y-1 mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-black text-[#1D2939]">{top3[2].username}</h3>
                  <p className="text-xs font-bold text-[#98A2B3]">{top3[2].total_points.toLocaleString()} ball</p>
                </div>
                <div className="w-full h-20 md:h-32 bg-gradient-to-b from-[#FEF6EE]/50 to-transparent rounded-t-[32px] md:rounded-t-[40px] border-t-2 border-[#FEF6EE] flex items-center justify-center">
                  <Award className="w-8 h-8 md:w-12 md:h-12 text-[#B93815] opacity-50" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden shadow-2xl shadow-black/2">
            <div className="p-4 md:p-8 border-b border-[#F2F4F7] flex items-center gap-4 bg-[#F9FAFB]/50">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Star className="w-5 h-5 fill-primary" />
              </div>
              <h3 className="text-xl font-black text-[#1D2939]">Guruh reytingi</h3>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[500px] border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F9FAFB]/30">
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">#</th>
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Talaba</th>
                    <th className="text-center py-4 px-4 md:py-6 md:px-8 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Streak</th>
                    <th className="text-right py-4 px-4 md:py-6 md:px-8 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Ball</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F4F7]">
                  {allRanking.map((student) => (
                    <tr key={student.student_id} className="group hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-4 px-4 md:py-6 md:px-8">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                          student.rank === 1 ? 'bg-primary text-white' :
                          student.rank === 2 ? 'bg-[#EAECF0] text-[#475467]' :
                          student.rank === 3 ? 'bg-[#FEF6EE] text-[#B93815]' :
                          'text-[#1D2939]'
                        }`}>
                          {student.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4 md:py-6 md:px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-primary font-black text-sm shrink-0">
                            {getInitials(student.username)}
                          </div>
                          <span className="font-black text-sm text-[#1D2939] group-hover:text-primary transition-colors">{student.username}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:py-6 md:px-8">
                        <div className="flex items-center justify-center gap-1 font-black text-sm text-[#1D2939]">
                          {student.streak}
                          <Flame className="w-4 h-4 text-[#F04438]" fill="currentColor" />
                        </div>
                      </td>
                      <td className="py-4 px-4 md:py-6 md:px-8 text-right font-black text-[#1D2939]">
                        {student.total_points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Rating;
