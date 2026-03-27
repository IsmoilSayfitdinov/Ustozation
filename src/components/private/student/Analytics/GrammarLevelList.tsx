import React from 'react';
import { GRAMMAR_LEVELS } from '@/data/student';

const GrammarLevelList = () => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8">
      <h3 className="text-lg font-bold text-[#141F38]">Grammatika darajasi</h3>
      
      <div className="space-y-6">
        {GRAMMAR_LEVELS.map((level, index) => (
          <div key={index} className="space-y-2 group cursor-pointer">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-[#141F38] group-hover:text-surface-tint transition-colors">{level.name}</span>
              <span className="text-[#98A2B3]">{level.level}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <div 
                className="h-full bg-surface-tint transition-all duration-1000 group-hover:brightness-110"
                style={{ width: `${level.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarLevelList;
