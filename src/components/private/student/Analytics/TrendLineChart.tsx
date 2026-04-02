import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { usePoints } from '@/hooks/useGamification';

const TrendLineChart = () => {
  const { data: pointsData } = usePoints();

  const weeklyData = useMemo(() => {
    const now = new Date();
    return [0, 1, 2, 3].map(i => {
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() - i * 7);
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekStart.getDate() - 7);

      let total = 0;
      if (pointsData?.history) {
        for (const entry of pointsData.history) {
          const date = new Date(entry.created_at);
          if (date >= weekStart && date < weekEnd && entry.points > 0) {
            total += entry.points;
          }
        }
      }
      return { label: `${4 - i}-hafta`, value: total };
    }).reverse();
  }, [pointsData]);

  const maxVal = Math.max(...weeklyData.map(d => d.value), 1);
  const hasData = weeklyData.some(d => d.value > 0);

  // SVG points
  const width = 400;
  const height = 120;
  const padding = 10;
  const points = weeklyData.map((d, i) => {
    const x = padding + (i / (weeklyData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value / maxVal) * (height - padding * 2));
    return { x, y };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;

  return (
    <div className="bg-white p-6 md:p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-[#141F38]">Haftalik ball trendi</h3>

      {hasData ? (
        <div className="flex-1 relative min-h-[160px] w-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#trendGradient)" />
            <path d={linePath} fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="#F97316" stroke="white" strokeWidth="2.5" />
            ))}
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-[10px] font-bold text-[#98A2B3] px-1 uppercase tracking-widest">
            {weeklyData.map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-[#D0D5DD]" />
          </div>
          <p className="text-sm font-bold text-[#98A2B3]">Hali ma'lumot yo'q</p>
          <p className="text-[10px] font-medium text-[#D0D5DD]">Test topshiring — trend ko'rinadi</p>
        </div>
      )}
    </div>
  );
};

export default TrendLineChart;
