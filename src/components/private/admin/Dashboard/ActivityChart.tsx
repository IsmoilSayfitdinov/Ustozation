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

const data = [
  { name: 'Du', value: 35 },
  { name: 'Se', value: 55 },
  { name: 'Cho', value: 30 },
  { name: 'Pa', value: 70 },
  { name: 'Ju', value: 65 },
  { name: 'Sha', value: 25 },
  { name: 'Ya', value: 15 },
];

const ActivityChart = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] h-full flex flex-col w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Haftalik faoliyat</h3>
          <p className="text-xs md:text-sm font-bold text-[#667085] mt-1 italic opacity-70">Talabalar aktivligi</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs font-black text-[#667085] uppercase tracking-wider">Faol talabalar</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F2F4F7" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#98A2B3', fontSize: 13, fontWeight: 700 }}
              dy={15}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 900, marginBottom: '4px', color: '#1D2939' }}
              itemStyle={{ color: '#F97316', fontWeight: 800 }}
            />
            <Bar 
              dataKey="value" 
              radius={[15, 15, 15, 15]} 
              barSize={60}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.value > 50 ? '#F97316' : '#FFB17D'} 
                  className="transition-all duration-500 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
