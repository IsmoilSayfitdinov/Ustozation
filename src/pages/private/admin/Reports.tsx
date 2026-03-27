import { useState } from 'react';
import { FileText, Calendar, Zap, Printer, Download, Search, ChevronRight, Flame } from 'lucide-react';

const initialReports = [
  { id: 1, name: 'Sardor Rahimov', level: 7, lastReport: '2 kun oldin', words: 342, streak: 30, average: 88, avatar: 'S' },
  { id: 2, name: 'Nodira Aliyeva', level: 6, lastReport: '5 kun oldin', words: 278, streak: 25, average: 82, avatar: 'N' },
  { id: 3, name: 'Jasur Karimov', level: 6, lastReport: '1 hafta oldin', words: 265, streak: 22, average: 79, avatar: 'J' },
  { id: 4, name: 'Malika Ergasheva', level: 5, lastReport: '3 kun oldin', words: 234, streak: 18, average: 74, avatar: 'M' },
  { id: 5, name: 'Bekzod Tursunov', level: 4, lastReport: '1 hafta oldin', words: 198, streak: 15, average: 70, avatar: 'B' },
  { id: 6, name: 'Dilnoza Karimova', level: 4, lastReport: '4 kun oldin', words: 186, streak: 14, average: 68, avatar: 'D' },
];

const Reports = () => {
  const [reports] = useState(initialReports);
  const [expandedId, setExpandedId] = useState<number | null>(1); // Default expand the first one for demo

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Hisobotlar</h2>
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[#F2F4F7] text-[#667085] px-4 md:px-6 py-3 rounded-2xl font-black text-xs md:text-sm hover:bg-[#E4E7EC] transition-all active:scale-95 group">
            <Printer className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">Chop etish</span>
            <span className="sm:hidden">Chop etish</span>
          </button>
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary text-white px-4 md:px-6 py-3 rounded-2xl font-black text-xs md:text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group">
            <Download className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">Yuklab olish</span>
            <span className="sm:hidden">Yuklab olish</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[38px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-[18px] bg-primary flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">6</h3>
            <p className="text-[10px] md:text-[12px] font-black text-[#98A2B3] uppercase tracking-widest mt-1">Jami hisobotlar</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[38px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-[#002D5B]/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-[18px] bg-[#002D5B] flex items-center justify-center">
               <Calendar className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">4</h3>
            <p className="text-[10px] md:text-[12px] font-black text-[#98A2B3] uppercase tracking-widest mt-1">So'nggi hafta</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[38px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-16 h-16 rounded-[24px] bg-[#12B76A]/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-[18px] bg-[#12B76A] flex items-center justify-center">
               <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">6</h3>
            <p className="text-[10px] md:text-[12px] font-black text-[#98A2B3] uppercase tracking-widest mt-1">AI xulosalar</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-[#98A2B3]" />
        <input 
          type="text" 
          placeholder="Talaba qidirish..." 
          className="w-full bg-white border border-[#F2F4F7] py-4 md:py-6 pl-14 md:pl-20 pr-6 md:pr-8 rounded-[24px] md:rounded-[28px] text-sm md:text-base font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 transition-all outline-none placeholder:text-[#98A2B3]"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className={`bg-white rounded-[32px] border border-[#F2F4F7] transition-all duration-500 overflow-hidden relative ${
              expandedId === report.id ? 'shadow-2xl shadow-black/10' : 'hover:shadow-xl hover:shadow-black/5'
            }`}
          >
            {/* Header / Clickable Area */}
            <div 
              onClick={() => setExpandedId(expandedId === report.id ? null : report.id)}
              className="p-4 md:p-6 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4 md:gap-6 relative z-10 w-full sm:w-auto">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[22px] bg-primary flex shrink-0 items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                  {report.avatar}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h4 className="text-lg md:text-xl font-black text-[#1D2939] group-hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-none">{report.name}</h4>
                    <span className="bg-[#002D5B] text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg whitespace-nowrap">Lvl {report.level}</span>
                  </div>
                  <p className="text-sm font-bold text-[#98A2B3]">So'nggi hisobot: {report.lastReport}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-12 relative z-10 md:mr-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xl font-black text-[#1D2939]">{report.words}</p>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">so'z</p>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="flex items-center justify-end gap-1.5">
                    <p className="text-xl font-black text-[#1D2939]">{report.streak}</p>
                    <Flame className="w-5 h-5 text-primary" fill="currentColor" />
                  </div>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">streak</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xl font-black text-[#12B76A]">{report.average}%</p>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">o'rtacha</p>
                </div>
                <ChevronRight className={`w-6 h-6 text-[#98A2B3] group-hover:text-primary transition-all duration-300 ${
                  expandedId === report.id ? 'rotate-90' : ''
                }`} />
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === report.id && (
              <div className="px-4 pb-6 pt-4 md:px-10 md:pb-10 md:pt-6 border-t border-[#F9FAFB] animate-in slide-in-from-top-4 duration-500">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
                   {[
                     { label: 'Jami so\'zlar', value: `${report.words}`, color: 'text-[#1D2939]' },
                     { label: 'Testlar', value: '45', color: 'text-[#1D2939]' },
                     { label: 'Streak', value: `${report.streak} kun`, color: 'text-[#1D2939]' },
                     { label: 'O\'rtacha ball', value: `${report.average}%`, color: 'text-[#12B76A]' },
                   ].map((item, idx) => (
                     <div key={idx} className="bg-[#F9FAFB] p-4 md:p-6 rounded-2xl md:rounded-[24px] text-center space-y-1">
                        <p className="text-xl md:text-2xl font-black text-[#1D2939]">{item.value}</p>
                        <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">{item.label}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-[#FFF4ED] p-8 rounded-[32px] border border-primary/10 mb-8 relative group">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                         <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-2">
                         <h5 className="text-sm font-black text-primary uppercase tracking-widest">AI xulosasi</h5>
                         <p className="text-sm font-bold text-[#667085] leading-relaxed">
                           Talaba yaxshi o'sish ko'rsatmoqda. Grammar bo'yicha qo'shimcha mashq tavsiya qilinadi. Vocabulary tezligi o'rtachadan yuqori.
                         </p>
                      </div>
                   </div>
                </div>

                <button className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl md:rounded-[24px] font-black text-sm md:text-base uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3">
                  <Download className="w-5 h-5 md:w-6 md:h-6" />
                  PDF yuklab olish
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
