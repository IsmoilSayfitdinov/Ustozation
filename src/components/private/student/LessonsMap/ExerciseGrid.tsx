import React from 'react';
import { Book, Edit3, Layers, ClipboardCheck } from 'lucide-react';

const exercises = [
  {
    title: 'Vocabulary',
    subtitle: "So'z boyligini oshiring",
    icon: Book,
    gradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
    shadow: 'shadow-[#F9731633]'
  },
  {
    title: 'Grammar',
    subtitle: "Grammatikani mustahkamlang",
    icon: Edit3,
    gradient: 'linear-gradient(135deg, #141F38 0%, #1E3A8A 100%)',
    shadow: 'shadow-[#141F3833]'
  },
  {
    title: 'Sentence Builder',
    subtitle: "Jumla tuzing",
    icon: Layers,
    gradient: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)',
    shadow: 'shadow-[#A855F733]'
  },
  {
    title: 'Practice Test',
    subtitle: "Bilimingizni sinang",
    icon: ClipboardCheck,
    gradient: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
    shadow: 'shadow-[#22C55E33]'
  }
];

const ExerciseGrid = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#141F38]">Mashqlar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {exercises.map((ex, index) => (
          <div 
            key={index}
            className={`relative overflow-hidden p-8 rounded-[32px] text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${ex.shadow}`}
            style={{ background: ex.gradient }}
          >
            {/* Decorative Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ex.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-black tracking-tight">{ex.title}</h4>
                <p className="text-white/80 text-sm font-semibold mt-1">{ex.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseGrid;
