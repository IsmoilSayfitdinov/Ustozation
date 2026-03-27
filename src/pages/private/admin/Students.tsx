import { Search, Download } from 'lucide-react';
import StudentTable from '@/components/private/admin/Students/StudentTable';
import { useState } from 'react';

const Students = () => {
  const [activeTab, setActiveTab] = useState('Barchasi');

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Talabalar</h2>
        <button className="flex items-center gap-2 bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group w-full sm:w-auto justify-center">
          <Download className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-0.5" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#12B76A] flex items-center justify-center">
              <span className="text-white font-black text-lg md:text-xl">6</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">6</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Faol talabalar</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center">
               <span className="text-white font-black text-lg md:text-xl">74</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">74</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">O'rtacha ball</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#F04438]/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#F04438] flex items-center justify-center">
               <span className="text-white font-black text-lg md:text-xl">18</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">18 kun</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">O'rtacha streak</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-white p-2 md:p-4 rounded-3xl md:rounded-[32px] border border-[#F2F4F7]">
        <div className="relative w-full md:max-w-md ml-2 md:ml-4">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#98A2B3]" />
          <input 
            type="text" 
            placeholder="Ism yoki username bo'yicha qidirish..." 
            className="w-full bg-transparent border-none py-2 md:py-3 pl-6 md:pl-8 text-xs md:text-sm font-bold text-[#1D2939] focus:ring-0 outline-none placeholder:text-[#98A2B3]"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2 p-1.5 bg-[#F9FAFB] rounded-2xl border border-[#F2F4F7] w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Barchasi', 'Faol', 'Nofaol'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-[#667085] hover:text-[#1D2939]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <StudentTable />
    </div>
  );
};

export default Students;
