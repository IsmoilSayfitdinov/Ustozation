import { useState } from 'react';
import { Search, Users, Loader2, GraduationCap } from 'lucide-react';
import StudentTable from '@/components/private/admin/Students/StudentTable';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useCourseStudents } from '@/hooks/useCourses';

const Students = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Barchasi');

  const { data: courses } = useCourses();
  const { data: students, isLoading } = useCourseStudents(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));

  const filteredStudents = (students ?? []).filter((s) => {
    const matchesSearch = s.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'Barchasi' ||
      (activeTab === 'Faol' && s.is_active) ||
      (activeTab === 'Nofaol' && !s.is_active);
    return matchesSearch && matchesTab;
  });

  const activeCount = (students ?? []).filter(s => s.is_active).length;

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Talabalar</h2>
      </div>

      {/* Course Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
        <CustomSelect
          options={courseOptions}
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          placeholder="Guruhni tanlang..."
        />
      </div>

      {!selectedCourseId ? (
        /* Empty State - No Course Selected */
        <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 flex items-center justify-center">
                <GraduationCap className="w-11 h-11 text-[#F97316]" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#F2F4F7] flex items-center justify-center">
                <Search className="w-4 h-4 text-[#98A2B3]" />
              </div>
            </div>
            <h3 className="text-xl font-black text-[#1D2939] mb-2">Guruhni tanlang</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-md leading-relaxed">
              Talabalar ro'yxatini ko'rish uchun yuqoridagi ro'yxatdan guruhni tanlang
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#12B76A] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">{students?.length ?? 0}</h3>
                <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Jami talabalar</p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-black text-base">{activeCount}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">{activeCount}</h3>
                <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Faol talabalar</p>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <StudentTable students={filteredStudents} courseId={Number(selectedCourseId)} />
          )}
        </>
      )}
    </div>
  );
};

export default Students;
