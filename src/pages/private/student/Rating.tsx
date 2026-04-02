import { useState, useMemo } from 'react';
import TopThreeCard from '@/components/private/student/Rating/TopThreeCard';
import LeaderboardRow from '@/components/private/student/Rating/LeaderboardRow';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRanking } from '@/hooks/useGamification';
import { useAuthStore } from '@/store/useAuthStore';

const ITEMS_PER_PAGE = 5;

const StudentRating = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ranking, isLoading } = useRanking();
  const { user } = useAuthStore();

  const topThree = useMemo(() => {
    if (!ranking || ranking.length < 3) return [];
    const sorted = [...ranking].sort((a, b) => a.rank - b.rank);
    return [
      sorted.find(s => s.rank === 2),
      sorted.find(s => s.rank === 1),
      sorted.find(s => s.rank === 3),
    ].filter(Boolean);
  }, [ranking]);

  const filteredRating = useMemo(() => {
    if (!ranking) return [];
    return ranking.filter(student =>
      student.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ranking, searchQuery]);

  const totalPages = Math.ceil(filteredRating.length / ITEMS_PER_PAGE);
  const paginatedRating = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRating.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRating, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight mb-4 md:mb-6'>Reyting</h2>

      <div className='bg-[#F8F9FA] p-5 md:p-12 rounded-3xl md:rounded-[40px] space-y-10 md:space-y-16'>
        {topThree.length >= 3 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#141F38]">Top 3 o'quvchi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <TopThreeCard rank={2} name={topThree[0]!.username} score={topThree[0]!.total_points} streak={topThree[0]!.streak} />
              <TopThreeCard rank={1} name={topThree[1]!.username} score={topThree[1]!.total_points} streak={topThree[1]!.streak} />
              <TopThreeCard rank={3} name={topThree[2]!.username} score={topThree[2]!.total_points} streak={topThree[2]!.streak} />
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-xl font-bold text-[#141F38]">To'liq reyting</h3>
            <div className="relative group max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#98A2B3] group-focus-within:text-surface-tint transition-colors" />
              <input
                type="text"
                placeholder="Ism bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#F2F4F7] rounded-2xl text-sm font-semibold text-[#141F38] focus:outline-none focus:border-surface-tint/20 focus:ring-4 focus:ring-surface-tint/5 transition-all placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <div className="space-y-4">
            {paginatedRating.length > 0 ? (
              paginatedRating.map((student) => (
                <LeaderboardRow
                  key={student.student_id}
                  rank={student.rank}
                  name={student.username}
                  streak={student.streak}
                  score={student.total_points}
                  avgTime={student.avg_time}
                  isCurrentUser={student.student_id === user?.id}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-[#F2F4F7]">
                <p className="text-[#98A2B3] font-bold">Hech qanday natija topilmadi</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 rounded-xl bg-white border border-[#F2F4F7] flex items-center justify-center text-[#141F38] hover:border-surface-tint/20 hover:text-surface-tint disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => handlePageChange(page)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${currentPage === page ? 'bg-surface-tint text-white shadow-lg shadow-surface-tint/20' : 'bg-white border border-[#F2F4F7] text-[#141F38] hover:border-surface-tint/20 hover:text-surface-tint'}`}>
                    {page}
                  </button>
                ))}
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 rounded-xl bg-white border border-[#F2F4F7] flex items-center justify-center text-[#141F38] hover:border-[#F9731633] hover:text-[#F97316] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentRating;
