import { Trophy, Flame } from 'lucide-react';

const students = [
  { id: 1, name: 'Sardor R.', level: 7, points: 30, score: 2850, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Nodira A.', level: 6, points: 25, score: 2720, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Jasur K.', level: 6, points: 22, score: 2680, avatar: 'https://i.pravatar.cc/150?u=3' },
];

const TopStudents = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] h-full">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Top talabalar</h3>
          <p className="text-xs md:text-sm font-bold text-[#667085] mt-1 italic opacity-70">Eng yaxshi natijalar</p>
        </div>
        <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary opacity-30" />
      </div>

      <div className="space-y-4 md:space-y-6">
        {students.map((student, index) => (
          <div 
            key={student.id} 
            className="flex items-center gap-3 md:gap-5 p-3 md:p-5 rounded-2xl md:rounded-[24px] border border-transparent hover:border-[#F2F4F7] hover:bg-[#F9FAFB] transition-all duration-300 group"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center font-black text-white text-base md:text-lg ${
              index === 0 ? 'bg-primary' : index === 1 ? 'bg-[#002D5B]' : 'bg-[#12B76A]'
            } shadow-lg shadow-black/5`}>
              {index + 1}
            </div>
            
            <img src={student.avatar} alt={student.name} className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-[14px] md:rounded-2xl object-cover ring-2 md:ring-4 ring-white shadow-md" />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-sm md:text-base text-[#1D2939] group-hover:text-primary transition-colors truncate">{student.name}</h4>
              <p className="text-[10px] md:text-xs font-bold text-[#667085] flex items-center gap-1.5 mt-0.5 md:mt-1 truncate">
                Level {student.level} · {student.points}
                <Flame className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#F04438] shrink-0" fill="currentColor" />
              </p>
            </div>

            <div className="text-right shrink-0 ml-2">
              <p className="text-lg md:text-xl font-black text-[#1D2939]">{student.score}</p>
              <p className="text-[8px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">ball</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudents;
