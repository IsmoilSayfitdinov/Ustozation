import { LineChart as LineChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1-hafta', value: 60 },
  { name: '2-hafta', value: 75 },
  { name: '3-hafta', value: 65 },
  { name: '4-hafta', value: 90 },
];

const RetryTrendChart = () => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <LineChartIcon className="w-5 h-5 text-primary" />
        <h3 className="text-sm md:text-base font-black text-[#141F38]">Qayta urinish trendi</h3>
      </div>
      
      <div className="flex-1 w-full min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
            <XAxis 
              dataKey="name" 
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#8C94A3', fontSize: 10, fontWeight: 600 }}
              dy={10}
              stroke="#F2F4F7"
            />
            <YAxis 
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#8C94A3', fontSize: 10, fontWeight: 600 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              stroke="#F2F4F7"
            />
            <Tooltip 
              cursor={{ fill: '#F2F4F7', opacity: 0.4 }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} maxBarSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RetryTrendChart;
