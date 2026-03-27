import React from 'react';
import { Award, Zap, Book, Target, Star, Trophy, Flame } from 'lucide-react';

const achievements = [
  { icon: Book, label: 'Birinchi dars', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Flame, label: '7 kun streak', color: 'text-orange-500', bg: 'bg-orange-50' }, 
  { icon: Target, label: '100 so\'z', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Award, label: 'Grammar master', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Zap, label: '30 kun streak', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Star, label: 'Top 3', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const Achievements = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-6 md:space-y-8">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
        <h3 className="text-xs md:text-sm font-bold text-[#141F38]">Yutuqlar</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {achievements.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-2 md:space-y-3 group cursor-pointer">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${item.bg}`}>
              <item.icon className={`w-5 h-5 md:w-7 md:h-7 ${item.color}`} />
            </div>
            <span className="text-[10px] md:text-[11px] font-bold text-on-surface-variant leading-tight max-w-[80px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
