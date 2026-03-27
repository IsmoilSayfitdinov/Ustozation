import { Target, Sparkles } from 'lucide-react';

const topics = [
  { name: 'Present Continuous', students: 23, percentage: 45, color: 'bg-[#F04438]' },
  { name: 'Past Perfect', students: 18, percentage: 38, color: 'bg-[#F04438]' },
  { name: 'Conditionals', students: 15, percentage: 32, color: 'bg-[#F97316]' },
  { name: 'Modal verbs', students: 12, percentage: 28, color: 'bg-[#F97316]' },
];

const DifficultTopics = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Qiyin mavzular</h3>
          <p className="text-xs md:text-sm font-bold text-[#667085] mt-1 italic opacity-70">Eng ko'p xatoliklar</p>
        </div>
        <div className="p-2.5 md:p-3 bg-red-50 rounded-xl md:rounded-2xl">
          <Target className="w-6 h-6 md:w-8 md:h-8 text-[#F04438]" />
        </div>
      </div>

      <div className="space-y-6 md:space-y-8 flex-1">
        {topics.map((topic, index) => (
          <div key={index} className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <span className="font-black text-sm md:text-base text-[#1D2939] truncate">{topic.name}</span>
                <span className="text-[8px] md:text-[10px] shrink-0 font-black text-[#667085] bg-[#F9FAFB] px-1.5 md:px-2 py-0.5 rounded-full border border-[#F2F4F7]">
                  {topic.students} talaba
                </span>
              </div>
              <span className="font-black text-sm md:text-base text-[#1D2939] shrink-0">{topic.percentage}%</span>
            </div>
            <div className="h-2 md:h-2.5 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <div 
                className={`h-full ${topic.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 bg-[#FFF9F5] p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-primary/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
           <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary" />
        </div>
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="p-1 md:p-1.5 bg-primary/20 rounded-md md:rounded-lg">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          </div>
          <span className="text-[9px] md:text-[11px] font-black text-primary uppercase tracking-[0.2em]">AI tavsiya</span>
        </div>
        <p className="relative z-10 text-[11px] md:text-xs font-bold leading-relaxed text-[#1D2939] opacity-80 italic">
          Present Continuous mavzusida eng ko'p xatolik kuzatilmoqda. Bu mavzu bo'yicha qo'shimcha mashqlar yaratish tavsiya etiladi.
        </p>
      </div>
    </div>
  );
};

export default DifficultTopics;
