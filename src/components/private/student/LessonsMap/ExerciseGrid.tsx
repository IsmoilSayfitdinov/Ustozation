import React from 'react';
import { Book, Edit3, Layers, ClipboardCheck } from 'lucide-react';

const exercises = [
  {
    title: 'Vocabulary',
    subtitle: "So'z boyligini oshiring",
    icon: Book,
    bg: 'bg-[#F97316]',
  },
  {
    title: 'Grammar',
    subtitle: "Grammatikani mustahkamlang",
    icon: Edit3,
    bg: 'bg-[#192E5B]',
  },
  {
    title: 'Audio test',
    subtitle: "Jumlalar tuzing",
    icon: Layers,
    bg: 'bg-[#B14EE3]',
  },
  {
    title: 'Video test',
    subtitle: "Bilimingizni sinang",
    icon: ClipboardCheck,
    bg: 'bg-[#31BC9B]',
  }
];

const ExerciseGrid = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-[#141F38]">Mashqlar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {exercises.map((ex, index) => (
          <div 
            key={index}
            className={`relative overflow-hidden p-5 md:p-6 rounded-[24px] md:rounded-[28px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${ex.bg}`}
          >
            {/* Decorative Circle overlay */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-sm" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[2px] translate-x-8 -translate-y-12" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-12 md:gap-16">
              <div className="w-10 h-10 border border-white/30 rounded-[14px] flex items-center justify-center backdrop-blur-sm self-start">
                <ex.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>

              <div>
                <h4 className="text-sm md:text-base font-black tracking-tight">{ex.title}</h4>
                <p className="text-white/80 text-[10px] md:text-[11px] font-semibold mt-0.5 leading-tight">{ex.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGrid;
