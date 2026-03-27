import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Book, Brain, TrendingUp, TrendingDown, Target, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const vocabData = [
  { name: '1-hafta', value: 850 },
  { name: '2-hafta', value: 1200 },
  { name: '3-hafta', value: 1050 },
  { name: '4-hafta', value: 1350 },
];

const difficultyData = [
  { topic: 'Conditionals', count: 45, percentage: 92, color: '#F04438' },
  { topic: 'Perfect Tenses', count: 38, percentage: 85, color: '#F79009' },
  { topic: 'Passive Voice', count: 32, percentage: 78, color: '#FACC15' },
  { topic: 'Reported Speech', count: 28, percentage: 72, color: '#12B76A' },
];

const grammarTopics = [
  { name: 'Present Simple', percentage: 85, students: 142, trend: 'up' },
  { name: 'Present Continuous', percentage: 55, students: 98, trend: 'down' },
  { name: 'Past Simple', percentage: 72, students: 120, trend: 'up' },
  { name: 'Past Continuous', percentage: 45, students: 78, trend: 'down' },
  { name: 'Future Simple', percentage: 60, students: 105, trend: 'up' },
  { name: 'Modals', percentage: 38, students: 65, trend: 'down' },
];

const CircularProgress = ({ percentage, color = '#12B76A', size = 60 }: { percentage: number, color?: string, size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F2F4F7"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-[#1D2939]">{percentage}%</span>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Analitika</h2>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">4,250</h3>
                <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest leading-relaxed">Jami so'zlar o'rganildi</p>
              </div>
              <div className="flex items-center gap-1.5 text-[#12B76A] font-black text-xs">
                 <TrendingUp className="w-4 h-4" />
                 <span>+320</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#002D5B] flex items-center justify-center shadow-lg shadow-[#002D5B]/20 group-hover:rotate-6 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">59%</h3>
                <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest leading-relaxed">Grammar o'rtacha</p>
              </div>
              <div className="flex items-center gap-1.5 text-[#12B76A] font-black text-xs">
                 <TrendingUp className="w-4 h-4" />
                 <span>+4%</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#002D5B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#12B76A] flex items-center justify-center shadow-lg shadow-[#12B76A]/20 group-hover:rotate-6 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Present Simple</h3>
                <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest leading-relaxed">Eng yuqori mavzu</p>
              </div>
              <div className="font-black text-xs text-[#12B76A]">85%</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#12B76A]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F04438] flex items-center justify-center shadow-lg shadow-[#F04438]/20 group-hover:rotate-6 transition-transform">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Modals</h3>
                <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest leading-relaxed">Eng past mavzu</p>
              </div>
              <div className="font-black text-xs text-[#F04438]">38%</div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#F04438]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>

      {/* Progress Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vocabulary Progress Bar Chart */}
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] space-y-6 md:space-y-10 group hover:shadow-2xl transition-all duration-500">
           <div className="flex items-center justify-between">
              <div>
                 <h4 className="text-2xl font-black text-[#1D2939] tracking-tight">Lug'at progressi</h4>
                 <p className="text-xs font-bold text-[#98A2B3] mt-1">Haftalik o'rganilgan so'zlar</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                 <Target className="w-6 h-6 text-[#3538CD]" />
              </div>
           </div>

           <div className="h-[200px] md:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vocabData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#98A2B3', fontSize: 10, fontWeight: 800 }} 
                    dy={16}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB', radius: 24 }}
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', padding: '16px' }}
                    labelStyle={{ fontWeight: 900, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[24, 24, 24, 24]} 
                    barSize={80}
                  >
                    {vocabData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 3 ? '#F97316' : '#FFBD80'} 
                        className="transition-all duration-500 hover:fill-primary"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Difficulty Ranking */}
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] space-y-6 md:space-y-10 group hover:shadow-2xl transition-all duration-500">
           <div className="flex items-center justify-between">
              <div>
                 <h4 className="text-2xl font-black text-[#1D2939] tracking-tight">Qiyinlik darajasi</h4>
                 <p className="text-xs font-bold text-[#98A2B3] mt-1">Eng ko'p xato mavzular</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                 <Target className="w-6 h-6 text-[#3538CD]" />
              </div>
           </div>

           <div className="space-y-8 pb-4">
              {difficultyData.map((item, idx) => (
                <div key={idx} className="space-y-3">
                   <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: item.color, borderColor: 'white', outline: `2px solid ${item.color}20` }} />
                         <span className="text-sm font-black text-[#1D2939]">{item.topic}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">{item.count} talaba</span>
                         <span className="text-sm font-black text-[#1D2939]">{item.percentage}%</span>
                      </div>
                   </div>
                   <div className="h-3 w-full bg-[#F9FAFB] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.percentage}%`, backgroundColor: '#F04438' }}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Grammar Topics Mastering Grid */}
      <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] space-y-6 md:space-y-10 group hover:shadow-2xl transition-all duration-500">
         <div className="flex items-center justify-between">
            <div>
               <h4 className="text-2xl font-black text-[#1D2939] tracking-tight">Grammar darajasi</h4>
               <p className="text-xs font-bold text-[#98A2B3] mt-1">Barcha mavzular bo'yicha o'zlashtirilganlik</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F0F5FF] flex items-center justify-center">
               <Brain className="w-6 h-6 text-[#155EEF]" />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grammarTopics.map((topic, idx) => (
              <div key={idx} className="bg-[#F9FAFB] p-6 rounded-[32px] flex items-center justify-between border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300 group/card">
                 <div className="flex items-center gap-4">
                    <CircularProgress percentage={topic.percentage} color={topic.percentage > 70 ? '#12B76A' : topic.percentage > 50 ? '#F79009' : '#F04438'} size={60} />
                    <div className="space-y-0.5">
                       <h5 className="text-sm font-black text-[#1D2939] group-hover/card:text-primary transition-colors">{topic.name}</h5>
                       <div className="flex items-center gap-2">
                          <p className="text-[10px] font-bold text-[#98A2B3]">{topic.students} talaba</p>
                          <div className={`flex items-center gap-0.5 font-black text-[10px] ${topic.trend === 'up' ? 'text-[#12B76A]' : 'text-[#F04438]'}`}>
                             {topic.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                             <span>{topic.trend === 'up' ? "O'sish" : "Pasayish"}</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className={`transition-all duration-500 opacity-40 group-hover/card:opacity-100 ${topic.trend === 'up' ? 'text-[#12B76A]' : 'text-[#F04438]'}`}>
                    {topic.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                 </div>
              </div>
            ))}
         </div>

         {/* AI Analysis Final Section */}
         <div className="bg-[#FFF4ED] p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-primary/10 relative group/ai overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover/ai:scale-150 transition-transform duration-1000" />
            <div className="flex items-start gap-4 relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover/ai:rotate-12 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
               </div>
               <div className="space-y-2">
                  <h5 className="text-xs font-black text-primary uppercase tracking-[0.2em]">AI tahlil</h5>
                  <p className="text-sm font-bold text-[#667085] leading-relaxed max-w-4xl">
                    Modals va Past Continuous mavzularida pasayish kuzatilmoqda. Bu mavzular bo'yicha interaktiv mashqlar va qo'shimcha audio darslar qo'shish samarali bo'lishi mumkin. So'zlarni o'zlashtirish tezligi rejadagidek ketmoqda.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
