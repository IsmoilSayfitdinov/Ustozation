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
import { WEEKLY_DATA } from '@/data/student';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded-xl shadow-xl border border-[#F2F4F7] z-50">
        <p className="text-[10px] font-bold text-[#98A2B3] mb-0.5">{payload[0].payload.day}</p>
        <p className="text-xs font-black text-surface-tint">
          {payload[0].value} ta so'z
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyBarChart = () => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8 h-full flex flex-col">
      <h3 className="text-lg font-bold text-[#141F38]">Haftalik so'z o'rganish</h3>
      
      <div className="flex-1 min-h-[200px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
              {WEEKLY_DATA.map((entry, index) => (
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
