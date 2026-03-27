import { useState } from 'react';
import { Plus, X, Search, Book, Headphones, Eye, Save } from 'lucide-react';
import LessonCard from '@/components/private/admin/Lessons/LessonCard';

const initialLessons = [
  { id: 1, title: 'Salomlashish iboralari', type: 'text', duration: '15 daq', students: 142, status: 'Faol' },
  { id: 2, title: 'O\'zini tanishtirish', type: 'text', duration: '20 daq', students: 128, status: 'Faol' },
  { id: 3, title: 'Listening: Daily Greetings', type: 'audio', duration: '10 daq', students: 95, status: 'Faol' },
  { id: 4, title: 'Present Simple', type: 'text', duration: '25 daq', students: 0, status: 'Qoralama' },
  { id: 5, title: 'Listening: At the Market', type: 'audio', duration: '12 daq', students: 82, status: 'Faol' },
  { id: 6, title: 'Describing People', type: 'text', duration: '18 daq', students: 0, status: 'Qoralama' },
];

const Lessons = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [newLesson, setNewLesson] = useState({ title: '', type: 'text' });

  const filteredLessons = lessons.filter(lesson => {
    if (activeTab === 'Barchasi') return true;
    if (activeTab === 'Matn') return lesson.type === 'text';
    if (activeTab === 'Audio') return lesson.type === 'audio';
    return true;
  });

  const handleAddLesson = () => {
    if (newLesson.title) {
      setLessons([
        { 
          id: Date.now(), 
          title: newLesson.title, 
          type: newLesson.type as 'text' | 'audio', 
          duration: '0 daq', 
          students: 0, 
          status: 'Qoralama' 
        },
        ...lessons
      ]);
      setNewLesson({ title: '', type: 'text' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Darslar</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-90" />
          Yangi dars
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center">
              <Book className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">4</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Matn-darslari</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#002D5B]/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#002D5B] flex items-center justify-center">
               <Headphones className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">2</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Audio-darslar</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#12B76A] flex items-center justify-center">
               <Eye className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">4</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Faol darslar</p>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex items-center gap-1 md:gap-2 p-1.5 bg-white w-full sm:w-fit rounded-2xl border border-[#F2F4F7] overflow-x-auto no-scrollbar">
        {['Barchasi', 'Matn', 'Audio'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 sm:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 md:gap-2 whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-[#667085] hover:text-[#1D2939]'
            }`}
          >
            {tab === 'Matn' && <Book className="w-3 h-3 md:w-3.5 md:h-3.5" />}
            {tab === 'Audio' && <Headphones className="w-3 h-3 md:w-3.5 md:h-3.5" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Inline Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border-2 border-primary/20 shadow-2xl shadow-primary/5 animate-in zoom-in-95 duration-300 relative">
          <button 
            onClick={() => setShowAddForm(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl hover:bg-[#F9FAFB] text-[#98A2B3] transition-all"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <h3 className="text-xl md:text-2xl font-black text-[#1D2939] mb-6 md:mb-8">Yangi dars qo'shish</h3>
          
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Dars nomi</label>
              <input 
                type="text" 
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                placeholder="Dars nomini kiriting..." 
                className="w-full bg-[#F9FAFB] border-none rounded-[16px] md:rounded-[20px] py-3 md:py-4 px-4 md:px-6 text-xs md:text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <button
                onClick={() => setNewLesson({ ...newLesson, type: 'text' })}
                className={`w-full sm:flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-[16px] md:rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all border-2 ${
                  newLesson.type === 'text' 
                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' 
                    : 'bg-white text-[#667085] border-[#F2F4F7] hover:border-primary/30'
                }`}
              >
                <Book className="w-4 h-4 md:w-5 md:h-5" />
                Matn
              </button>
              <button
                onClick={() => setNewLesson({ ...newLesson, type: 'audio' })}
                className={`w-full sm:flex-1 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4 rounded-[16px] md:rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all border-2 ${
                  newLesson.type === 'audio' 
                    ? 'bg-[#002D5B] text-white border-[#002D5B] shadow-xl shadow-[#002D5B]/20' 
                    : 'bg-white text-[#667085] border-[#F2F4F7] hover:border-[#002D5B]/30'
                }`}
              >
                <Headphones className="w-4 h-4 md:w-5 md:h-5" />
                Audio
              </button>
            </div>

            <button 
              onClick={handleAddLesson}
              className="w-full bg-primary text-white py-4 md:py-5 rounded-[16px] md:rounded-[20px] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              Saqlash
            </button>
          </div>
        </div>
      )}

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLessons.map((lesson) => (
          <LessonCard 
            key={lesson.id}
            title={lesson.title}
            type={lesson.type as 'text' | 'audio'}
            duration={lesson.duration}
            students={lesson.students}
            status={lesson.status as 'Faol' | 'Qoralama'}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
