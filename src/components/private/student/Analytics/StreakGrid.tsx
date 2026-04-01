import { useMemo } from 'react';
import { useStreak } from '@/hooks/useGamification';

const StreakGrid = () => {
  const { data: streak } = useStreak();

  const days = useMemo(() => {
    const currentStreak = streak?.current_streak ?? 0;

    return Array.from({ length: 30 }, (_, i) => {
      const dayIndex = 29 - i; // 29 = today, 0 = 30 days ago
      const day = i + 1;

      let status: 'active' | 'missed' | 'upcoming';
      if (dayIndex < currentStreak) {
        status = 'active';
      } else if (dayIndex < 30 && dayIndex >= currentStreak) {
        // Days before streak - some missed, some might be before user joined
        status = dayIndex < currentStreak + 5 ? 'missed' : 'upcoming';
      } else {
        status = 'upcoming';
      }

      return { day, status };
    });
  }, [streak]);

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#141F38]">Streak Taqvimi</h3>
        <p className="text-sm font-semibold text-[#667085]">
          {streak?.current_streak ?? 0} kunlik streak
        </p>
      </div>

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
    </div>
  );
};

export default StreakGrid;
