import { useState } from 'react';
import { Plus, X, Search, HelpCircle, Layers, CheckCircle, AlertTriangle, Save, Type, Image as ImageIcon, Video, Check } from 'lucide-react';
import QuestionCard from '@/components/private/admin/Tests/QuestionCard';

const initialQuestions = [
  {
    id: 1,
    number: 1,
    category: 'Vocabulary',
    points: 20,
    penalty: 5,
    question: 'Book so\'zining tarjimasi nima?',
    options: [
      { id: 'A', text: 'Daftar', isCorrect: false },
      { id: 'B', text: 'Kitob', isCorrect: true },
      { id: 'C', text: 'Qalam', isCorrect: false },
      { id: 'D', text: 'Ruchka', isCorrect: false },
    ]
  },
  {
    id: 2,
    number: 2,
    category: 'Grammar',
    points: 20,
    penalty: 5,
    question: 'She ___ to school every day.',
    options: [
      { id: 'A', text: 'Go', isCorrect: false },
      { id: 'B', text: 'Goes', isCorrect: true },
      { id: 'C', text: 'Going', isCorrect: false },
      { id: 'D', text: 'Gone', isCorrect: false },
    ]
  },
  {
    id: 3,
    number: 3,
    category: 'Vocabulary',
    points: 15,
    penalty: 3,
    question: 'Rasmdagi narsa nima?',
    media: {
      type: 'image' as const,
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop'
    },
    options: [
      { id: 'A', text: 'Olma', isCorrect: false },
      { id: 'B', text: 'Kitob', isCorrect: true },
      { id: 'C', text: 'Mashina', isCorrect: false },
      { id: 'D', text: 'Uy', isCorrect: false },
    ]
  },
  {
    id: 4,
    number: 4,
    category: 'Vocabulary',
    points: 25,
    penalty: 8,
    question: 'Videodagi hayvon qaysi?',
    media: {
      type: 'video' as const,
      url: 'https://example.com/video.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2059&auto=format&fit=crop'
    },
    options: [
      { id: 'A', text: 'Sher', isCorrect: true },
      { id: 'B', text: 'Fil', isCorrect: false },
      { id: 'C', text: 'Zebra', isCorrect: false },
      { id: 'D', text: 'Ayiq', isCorrect: false },
    ]
  }
];

const Tests = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [questionType, setQuestionType] = useState<'text' | 'image' | 'video'>('text');
  const [category, setCategory] = useState<'Vocabulary' | 'Grammar'>('Vocabulary');
  const [correctOption, setCorrectOption] = useState<string>('A');

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Testlar</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group w-full md:w-auto"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Savol qo'shish
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">{questions.length}</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Jami savollar</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#002D5B]/10 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#002D5B] flex items-center justify-center">
               <Layers className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">2</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Vocabulary</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#12B76A] flex items-center justify-center">
               <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[#1D2939]">2</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Grammar</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] flex items-center gap-4 md:gap-6 group hover:shadow-xl transition-all h-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#F04438]/10 flex items-center justify-center shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#F04438] flex items-center justify-center">
               <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">5 ball</h3>
            <p className="text-[10px] md:text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">O'rtacha jarima</p>
          </div>
        </div>
      </div>

      {/* Inline Add Form */}
      {showAddForm && (
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border-2 border-primary/20 shadow-2xl shadow-primary/5 animate-in zoom-in-95 duration-300 relative">
          <button 
            onClick={() => setShowAddForm(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl hover:bg-[#F9FAFB] text-[#98A2B3] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl md:text-2xl font-black text-[#1D2939] mb-4">Yangi savol</h3>
          
          <div className="space-y-8">
            {/* Question Type Tabs */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Savol turi</label>
              <div className="flex items-center gap-4 bg-[#F9FAFB] p-2 rounded-3xl border border-[#F2F4F7]">
                {[
                  { id: 'text', label: 'Matnli', icon: Type },
                  { id: 'image', label: 'Rasmli', icon: ImageIcon },
                  { id: 'video', label: 'Videoli', icon: Video },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setQuestionType(type.id as any)}
                    className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                      questionType === type.id 
                        ? (type.id === 'video' ? 'bg-[#F04438] text-white shadow-lg shadow-[#F04438]/20' : 'bg-white text-[#1D2939] shadow-lg border border-[#F2F4F7]')
                        : 'text-[#667085] hover:text-[#1D2939]'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Upload (Conditional) */}
            {(questionType === 'image' || questionType === 'video') && (
              <div className="p-6 md:p-8 border-2 border-dashed border-[#F2F4F7] rounded-3xl md:rounded-[32px] bg-[#F9FAFB] flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-all">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${questionType === 'video' ? 'bg-[#F04438]/10 text-[#F04438]' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
                   {questionType === 'video' ? <Video className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-[#1D2939]">{questionType === 'video' ? 'Video URL manzili' : 'Rasm yuklash'}</p>
                  <p className="text-xs font-bold text-[#98A2B3] mt-1">{questionType === 'video' ? 'MP4 formatidagi video linkini yoki YouTube linkini kiriting' : 'JPG, PNG yoki GIF. Max 5MB'}</p>
                </div>
                <input 
                  type="text" 
                  placeholder={questionType === 'video' ? 'https://...' : 'Rasm linki...'} 
                  className="w-full bg-white border border-[#F2F4F7] py-3 px-6 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}

            {/* Category Toggle */}
            <div className="flex items-center gap-4 bg-[#F9FAFB] p-2 rounded-3xl border border-[#F2F4F7] w-fit">
              {['Vocabulary', 'Grammar'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`px-8 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    category === cat 
                      ? 'bg-[#002D5B] text-white shadow-lg' 
                      : 'text-[#667085] hover:text-[#1D2939]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Question Text */}
            <div className="space-y-3">
               <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Savol matni</label>
               <textarea 
                  placeholder="Masalan: 'Videoda qaysi so'z aytildi?'" 
                  className="w-full bg-[#F9FAFB] border-none rounded-[24px] py-4 px-6 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[100px] resize-none"
               />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <div key={opt} className="relative group/opt">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    correctOption === opt ? 'bg-[#12B76A] text-white shadow-lg' : 'bg-white border border-[#F2F4F7] text-[#98A2B3]'
                  }`}>
                    {opt}
                  </div>
                  <input 
                    type="text" 
                    placeholder={`Javob ${opt === 'A' ? '1' : opt === 'B' ? '2' : opt === 'C' ? '3' : '4'}...`}
                    className="w-full bg-[#F9FAFB] border-none rounded-[20px] py-4 pl-16 pr-12 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <button 
                    onClick={() => setCorrectOption(opt)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      correctOption === opt ? 'bg-[#12B76A] border-[#12B76A]' : 'border-[#F2F4F7] hover:border-[#12B76A]/30'
                    }`}
                  >
                    {correctOption === opt && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Points and Penalty */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Ball (to'g'ri javob)</label>
                <input type="number" defaultValue="20" className="w-full bg-[#F9FAFB] border-none rounded-[20px] py-4 px-6 text-sm font-black text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Jarima (qayta topshirishda)</label>
                <input type="number" defaultValue="5" className="w-full bg-[#F9FAFB] border-none rounded-[20px] py-4 px-6 text-sm font-black text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
            </div>

            <button 
              className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl md:rounded-[24px] font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Saqlash
            </button>
          </div>
        </div>
      )}

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {questions.map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
};

export default Tests;
