import { useMemo } from 'react';
import { LineChart as LineChartIcon, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePoints } from '@/hooks/useGamification';

const RetryTrendChart = () => {
  const { data: pointsData } = usePoints();

  const weeklyData = useMemo(() => {
    const now = new Date();
    const weeks = [0, 1, 2, 3].map(i => {
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() - i * 7);
      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekStart.getDate() - 7);
      return { start: weekStart, end: weekEnd, label: `${4 - i}-hafta` };
    }).reverse();

    return weeks.map(week => {
      let totalPoints = 0;
      if (pointsData?.history) {
        for (const entry of pointsData.history) {
          const date = new Date(entry.created_at);
          if (date >= week.start && date < week.end && entry.points > 0) {
            totalPoints += entry.points;
          }
        }
      }
      return { name: week.label, value: totalPoints };
    });
  }, [pointsData]);

  const maxValue = Math.max(...weeklyData.map(d => d.value), 1);
  const hasData = weeklyData.some(d => d.value > 0);

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <LineChartIcon className="w-5 h-5 text-primary" />
        <h3 className="text-sm md:text-base font-black text-[#141F38]">Haftalik ball trendi</h3>
      </div>

      {hasData ? (
        <div className="flex-1 w-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
              <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fill: '#8C94A3', fontSize: 10, fontWeight: 600 }} dy={10} stroke="#F2F4F7" />
              <YAxis axisLine={true} tickLine={false} tick={{ fill: '#8C94A3', fontSize: 10, fontWeight: 600 }} domain={[0, Math.ceil(maxValue * 1.2)]} stroke="#F2F4F7" />
              <Tooltip cursor={{ fill: '#F2F4F7', opacity: 0.4 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => [`${value} ball`, 'Ball']} />
              <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-[#D0D5DD]" />
          </div>
          <p className="text-sm font-bold text-[#98A2B3]">Ma'lumot yetarli emas</p>
          <p className="text-[10px] font-medium text-[#D0D5DD]">Test topshiring — haftalik trend ko'rinadi</p>
        </div>
      )}
    </div>
  );
};

export default RetryTrendChart;
