import { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { useStreak, usePoints } from '@/hooks/useGamification';

const StreakGrid = () => {
  const { data: streak } = useStreak();
  const { data: pointsData } = usePoints();

  const days = useMemo(() => {
    const now = new Date();

    // Real faollik — points history dan kunlik activity
    const activeDays = new Set<string>();
    if (pointsData?.history) {
      for (const entry of pointsData.history) {
        if (entry.points > 0) {
          activeDays.add(new Date(entry.created_at).toISOString().slice(0, 10));
        }
      }
    }

    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const day = i + 1;
      const isActive = activeDays.has(dateStr);
      const isFuture = date > now;

      let status: 'active' | 'missed' | 'upcoming';
      if (isFuture) {
        status = 'upcoming';
      } else if (isActive) {
        status = 'active';
      } else {
        status = 'missed';
      }

      return { day, status };
    });
  }, [pointsData]);

  const activeCount = days.filter(d => d.status === 'active').length;
  const hasAnyActivity = activeCount > 0;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#141F38]">Streak Taqvimi</h3>
        <p className="text-sm font-semibold text-[#667085]">
          {streak?.current_streak ?? 0} kunlik streak
        </p>
      </div>

      {hasAnyActivity ? (
        <>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3">
            {days.map((item, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg border flex items-center justify-center text-[10px] font-bold transition-all ${
                  item.status === 'active'
                    ? 'bg-surface-tint border-surface-tint text-white shadow-lg shadow-surface-tint/20'
                    : item.status === 'missed'
                    ? 'bg-[#FEE4E2] border-[#FEE4E2] text-[#F04438]'
                    : 'bg-[#F9FAFB] border-[#F2F4F7] text-[#98A2B3]'
                }`}
              >
                {item.day}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-surface-tint" />
              <span className="text-[#667085]">Faol ({activeCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#FEE4E2]" />
              <span className="text-[#667085]">O'tkazilgan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#F9FAFB] border border-[#F2F4F7]" />
              <span className="text-[#667085]">Bo'sh</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-surface-tint/5 flex items-center justify-center">
            <Calendar className="w-7 h-7 text-[#D0D5DD]" />
          </div>
          <p className="text-sm font-bold text-[#98A2B3]">Faollik hali yo'q</p>
          <p className="text-[10px] font-medium text-[#D0D5DD]">Test topshiring — taqvim to'ladi!</p>
        </div>
      )}
    </div>
  );
};

export default StreakGrid;
