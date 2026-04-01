import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { usePoints } from '@/hooks/useGamification';

const DAY_NAMES = ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { day: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-xl border border-[#F2F4F7] z-50">
        <p className="text-[10px] font-bold text-[#98A2B3] mb-0.5">{payload[0].payload.day}</p>
        <p className="text-xs font-black text-surface-tint">
          {payload[0].value} ball
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyBarChart = () => {
  const { data: pointsData } = usePoints();

  const weeklyData = useMemo(() => {
    const now = new Date();
    const dayMap: Record<string, number> = {};

    // Initialize all 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayName = DAY_NAMES[d.getDay()];
      dayMap[dayName] = 0;
    }

    // Aggregate points from history for last 7 days
    if (pointsData?.history) {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);

      for (const entry of pointsData.history) {
        const entryDate = new Date(entry.created_at);
        if (entryDate >= weekAgo && entry.points > 0) {
          const dayName = DAY_NAMES[entryDate.getDay()];
          if (dayName in dayMap) {
            dayMap[dayName] += entry.points;
          }
        }
      }
    }

    const today = DAY_NAMES[now.getDay()];
    return Object.entries(dayMap).map(([day, count]) => ({
      day,
      count,
      active: day === today,
    }));
  }, [pointsData]);

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8 h-full flex flex-col">
      <h3 className="text-lg font-bold text-[#141F38]">Haftalik ball</h3>

      <div className="flex-1 min-h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F2F4F7" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#98A2B3', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#98A2B3', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#F97316', opacity: 0.05 }}
            />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              barSize={32}
            >
              {weeklyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.active ? '#F97316' : '#F973161A'}
                  className="transition-all duration-300 hover:brightness-110"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyBarChart;
