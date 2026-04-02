import { useMemo } from 'react';
import { Flame, Zap } from 'lucide-react';
import { useStreak, usePoints } from '@/hooks/useGamification';

const StreakGraph = () => {
  const { data: streak } = useStreak();
  const { data: pointsData } = usePoints();

  const days = useMemo(() => {
    const currentStreak = streak?.current_streak ?? 0;
    const now = new Date();

    const dayActivity: Record<string, number> = {};
    if (pointsData?.history) {
      for (const entry of pointsData.history) {
        if (entry.points > 0) {
          const date = new Date(entry.created_at).toISOString().slice(0, 10);
          dayActivity[date] = (dayActivity[date] || 0) + 1;
        }
      }
    }

    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const dayIndex = 29 - i;
      const activity = dayActivity[dateStr] || 0;

      let status: 'twice' | 'once' | 'light' | 'none';
      if (dayIndex < currentStreak) {
        status = activity >= 3 ? 'twice' : activity >= 1 ? 'once' : 'light';
      } else {
        status = activity > 0 ? 'light' : 'none';
      }

      return { id: i, status };
    });
  }, [streak, pointsData]);

  const activeCount = days.filter(d => d.status !== 'none').length;

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          <h3 className="text-sm md:text-base font-black text-[#141F38]">Streak grafigi (30 kun)</h3>
        </div>
        <span className="text-xs font-bold text-[#98A2B3]">{activeCount}/30 kun faol</span>
      </div>

      {activeCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
            <Zap className="w-7 h-7 text-[#D0D5DD]" />
          </div>
          <p className="text-sm font-bold text-[#98A2B3]">Hali faollik yo'q</p>
          <p className="text-[10px] font-medium text-[#D0D5DD]">Test topshiring — streak boshlanadi!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 md:gap-2">
            {days.map((day) => (
              <div
                key={day.id}
                className={`aspect-square rounded-[8px] md:rounded-[12px] transition-all duration-300 hover:scale-105 ${
                  day.status === 'twice' ? 'bg-[#6D2D03]'
                    : day.status === 'once' ? 'bg-[#F97316]'
                    : day.status === 'light' ? 'bg-[#FFB782]'
                    : 'bg-[#F2F4F7]'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#6D2D03]" />
              <span className="text-[11px] font-bold text-[#8C94A3]">Ko'p faollik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#F97316]" />
              <span className="text-[11px] font-bold text-[#8C94A3]">Faol kun</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#FFB782]" />
              <span className="text-[11px] font-bold text-[#8C94A3]">Ozgina faollik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#F2F4F7]" />
              <span className="text-[11px] font-bold text-[#8C94A3]">Faol emas</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StreakGraph;
