import React from 'react';
import { Award, Zap, Book, Target, Star, Trophy, Flame } from 'lucide-react';

const achievements = [
  { icon: Book, label: 'Birinchi dars', color: 'text-blue-500', isLocked: false },
  { icon: Flame, label: '7 kun streak', color: 'text-orange-500', isLocked: false }, 
  { icon: Target, label: '100 so\'z', color: 'text-green-500', isLocked: false },
  { icon: Award, label: 'Grammar master', color: 'text-yellow-500', isLocked: true },
  { icon: Zap, label: '30 kun streak', color: 'text-blue-400', isLocked: true },
  { icon: Star, label: 'Top 3', color: 'text-amber-500', isLocked: true },
];

const Achievements = () => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-4 md:space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-sm md:text-base font-black text-[#141F38]">Yutuqlar</h3>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {achievements.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
              item.isLocked 
                ? 'opacity-40 grayscale' 
                : 'bg-[#F8F9FA] hover:shadow-md cursor-pointer hover:-translate-y-0.5'
            }`}
          >
            <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.isLocked ? 'text-gray-500' : item.color}`} />
            <span className={`text-[11px] md:text-xs font-bold leading-none ${item.isLocked ? 'text-gray-500' : 'text-[#141F38]'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
