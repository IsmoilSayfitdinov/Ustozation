import { useState } from 'react';
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Search, Filter, Award, Crown } from 'lucide-react';

const rankingData = [
  { id: 1, name: 'Sardor Rahimov', level: 12, xp: 15420, trend: 'up', rank: 1, avatar: 'S' },
  { id: 2, name: 'Nodira Aliyeva', level: 11, xp: 14200, trend: 'up', rank: 2, avatar: 'N' },
  { id: 3, name: 'Jasur Karimov', level: 11, xp: 13850, trend: 'down', rank: 3, avatar: 'J' },
  { id: 4, name: 'Malika Ergasheva', level: 10, xp: 12100, trend: 'up', rank: 4, avatar: 'M' },
  { id: 5, name: 'Bekzod Tursunov', level: 9, xp: 11500, trend: 'up', rank: 5, avatar: 'B' },
  { id: 6, name: 'Dilnoza Karimova', level: 9, xp: 10800, trend: 'down', rank: 6, avatar: 'D' },
  { id: 7, name: 'Umid Abdullayev', level: 8, xp: 9600, trend: 'up', rank: 7, avatar: 'U' },
  { id: 8, name: 'Lola Azizova', level: 8, xp: 9200, trend: 'up', rank: 8, avatar: 'L' },
];

const Rating = () => {
  const [activeTab, setActiveTab] = useState('Oylik');
  const top3 = rankingData.slice(0, 3);
  const others = rankingData.slice(3);

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Reyting</h2>
        <div className="flex items-center gap-2 bg-[#F2F4F7] p-1.5 rounded-2xl border border-[#E4E7EC]">
          {['Haftalik', 'Oylik', 'Umumiy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-white text-primary shadow-lg shadow-black/5' 
                  : 'text-[#98A2B3] hover:text-[#1D2939]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 flex flex-col items-center justify-end group">
           <div className="relative mb-4 md:mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl md:rounded-[32px] bg-white border-[3px] md:border-4 border-[#F2F4F7] flex items-center justify-center text-2xl md:text-4xl font-black text-primary shadow-xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                 <img src={`https://ui-avatars.com/api/?name=${top3[1].name}&background=random`} alt={top3[1].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#EAECF0] text-[#475467] font-black text-xs px-4 py-1.5 rounded-full shadow-lg border border-white">
                 2-o'rin
              </div>
           </div>
           <div className="text-center space-y-1 mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-black text-[#1D2939]">{top3[1].name}</h3>
              <p className="text-[10px] md:text-xs font-bold text-[#98A2B3]">Level {top3[1].level} • {top3[1].xp.toLocaleString()} XP</p>
           </div>
           <div className="w-full h-24 md:h-40 bg-linear-to-b from-[#EAECF0]/50 to-transparent rounded-t-[32px] md:rounded-t-[40px] border-t-2 border-[#EAECF0] flex items-center justify-center">
              <Medal className="w-8 h-8 md:w-12 md:h-12 text-[#98A2B3] opacity-50" strokeWidth={1.5} />
           </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 flex flex-col items-center justify-end group -mt-6 md:-mt-12 scale-105 md:scale-110 relative z-10">
           <div className="relative mb-6 md:mb-8">
              <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                 <Crown className="w-8 h-8 md:w-10 md:h-10 fill-primary" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[40px] bg-white border-[3px] md:border-4 border-primary flex items-center justify-center text-3xl md:text-5xl font-black text-primary shadow-xl md:shadow-2xl group-hover:scale-110 transition-transform duration-700 overflow-hidden ring-4 md:ring-8 ring-primary/5">
                 <img src={`https://ui-avatars.com/api/?name=${top3[0].name}&background=primary&color=fff`} alt={top3[0].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white font-black text-sm px-6 py-2 rounded-full shadow-xl border-2 border-white">
                 1-o'rin
              </div>
           </div>
           <div className="text-center space-y-1 mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">{top3[0].name}</h3>
              <p className="text-xs md:text-sm font-bold text-[#98A2B3]">Level {top3[0].level} • {top3[0].xp.toLocaleString()} XP</p>
           </div>
           <div className="w-full h-32 md:h-56 bg-linear-to-b from-primary/10 to-transparent rounded-t-[32px] md:rounded-t-[48px] border-t-2 border-primary/20 flex items-center justify-center">
              <Trophy className="w-10 h-10 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
           </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 md:order-3 flex flex-col items-center justify-end group">
           <div className="relative mb-4 md:mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl md:rounded-[32px] bg-white border-[3px] md:border-4 border-[#F2F4F7] flex items-center justify-center text-2xl md:text-4xl font-black text-primary shadow-xl group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                 <img src={`https://ui-avatars.com/api/?name=${top3[2].name}&background=random`} alt={top3[2].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FEF6EE] text-[#B93815] font-black text-xs px-4 py-1.5 rounded-full shadow-lg border border-white">
                 3-o'rin
              </div>
           </div>
           <div className="text-center space-y-1 mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-black text-[#1D2939]">{top3[2].name}</h3>
              <p className="text-[10px] md:text-xs font-bold text-[#98A2B3]">Level {top3[2].level} • {top3[2].xp.toLocaleString()} XP</p>
           </div>
           <div className="w-full h-20 md:h-32 bg-linear-to-b from-[#FEF6EE]/50 to-transparent rounded-t-[32px] md:rounded-t-[40px] border-t-2 border-[#FEF6EE] flex items-center justify-center">
              <Award className="w-8 h-8 md:w-12 md:h-12 text-[#B93815] opacity-50" strokeWidth={1.5} />
           </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden shadow-2xl shadow-black/2">
        <div className="p-4 md:p-8 border-b border-[#F2F4F7] flex flex-col md:flex-row md:items-center justify-between bg-[#F9FAFB]/50 gap-4">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <Star className="w-5 h-5 fill-primary" />
              </div>
              <h3 className="text-xl font-black text-[#1D2939]">Global Leaderboard</h3>
           </div>
           <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
              <input 
                type="text" 
                placeholder="Talaba qidirish..." 
                className="w-full bg-white border border-[#E4E7EC] rounded-xl py-2 pl-12 pr-6 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all md:w-64"
              />
           </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
           <table className="w-full min-w-[600px] border-collapse whitespace-nowrap">
              <thead>
                 <tr className="bg-[#F9FAFB]/30">
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Rank</th>
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Talaba</th>
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Mavsumiy trend</th>
                    <th className="text-left py-4 px-4 md:py-6 md:px-8 text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Level</th>
                    <th className="text-right py-4 px-4 md:py-6 md:px-8 text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Jami XP</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                 {rankingData.map((student) => (
                    <tr key={student.id} className="group hover:bg-[#F9FAFB] transition-colors">
                       <td className="py-4 px-4 md:py-6 md:px-8">
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-black text-xs md:text-sm ${
                             student.rank === 1 ? 'bg-primary text-white' :
                             student.rank === 2 ? 'bg-[#EAECF0] text-[#475467]' :
                             student.rank === 3 ? 'bg-[#FEF6EE] text-[#B93815]' :
                             'text-[#1D2939]'
                          }`}>
                             {student.rank}
                          </div>
                       </td>
                       <td className="py-4 px-4 md:py-6 md:px-8">
                          <div className="flex items-center gap-2 md:gap-4">
                             <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#EEF4FF] flex shrink-0 items-center justify-center text-primary font-black text-base md:text-lg overflow-hidden border border-[#F2F4F7]">
                                <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt={student.name} />
                             </div>
                             <span className="font-black text-sm md:text-base text-[#1D2939] group-hover:text-primary transition-colors whitespace-nowrap">{student.name}</span>
                          </div>
                       </td>
                       <td className="py-4 px-4 md:py-6 md:px-8 font-black text-xs md:text-sm whitespace-nowrap">
                          <div className={`flex items-center gap-1 md:gap-2 ${student.trend === 'up' ? 'text-[#12B76A]' : 'text-[#F04438]'}`}>
                             {student.trend === 'up' ? (
                                <>
                                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                                  <span>+12 pozitsiya</span>
                                </>
                             ) : (
                                <>
                                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                                  <span>-2 pozitsiya</span>
                                </>
                             )}
                          </div>
                       </td>
                       <td className="py-4 px-4 md:py-6 md:px-8 whitespace-nowrap">
                          <span className="px-2 py-1 md:px-3 bg-[#EEF4FF] text-[#3538CD] font-black text-[9px] md:text-[10px] rounded-lg tracking-widest uppercase">
                             Lvl {student.level}
                          </span>
                       </td>
                       <td className="py-4 px-4 md:py-6 md:px-8 text-right font-black text-[#1D2939] whitespace-nowrap">
                          {student.xp.toLocaleString()} XP
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Rating;
