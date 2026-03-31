import { useState } from 'react';
import { Plus, X, HelpCircle, Layers, CheckCircle, AlertTriangle, Save, Check, Loader2 } from 'lucide-react';
import QuestionCard from '@/components/private/admin/Tests/QuestionCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses } from '@/hooks/useCourses';
import { useCourseQuizzes, useQuizDetail, useCreateQuestion, useDeleteQuestion } from '@/hooks/useQuizzes';

const Tests = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [answers, setAnswers] = useState(['', '', '', '']);

  const { data: courses } = useCourses();
  const { data: quizzes, isLoading: quizzesLoading } = useCourseQuizzes(Number(selectedCourseId) || 0);
  const { data: quizDetail, isLoading: quizLoading } = useQuizDetail(Number(selectedQuizId) || 0);

  const createQuestionMutation = useCreateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const quizOptions = (quizzes ?? []).map(q => ({ label: `${q.title} (${q.question_count} savol)`, value: String(q.id) }));

  const questions = quizDetail?.questions ?? [];

  const handleCreateQuestion = () => {
    if (!selectedQuizId || !questionText.trim()) return;
    const answerPayloads = answers.map((text, idx) => ({
      text,
      is_correct: idx === correctOption,
      order: idx + 1,
    })).filter(a => a.text.trim());

    if (answerPayloads.length < 2) return;

    createQuestionMutation.mutate(
      {
        quizId: Number(selectedQuizId),
        data: {
          text: questionText,
          order: questions.length + 1,
          answers: answerPayloads,
        },
      },
      {
        onSuccess: () => {
          setShowAddForm(false);
          setQuestionText('');
          setAnswers(['', '', '', '']);
          setCorrectOption(0);
        },
      }
    );
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Testlar</h2>
      </div>

      {/* Course & Quiz Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
          <CustomSelect
            options={courseOptions}
            value={selectedCourseId}
            onChange={(val) => { setSelectedCourseId(val); setSelectedQuizId(''); }}
            placeholder="Guruhni tanlang..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Test tanlang</label>
          {quizzesLoading ? (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F2F4F7] rounded-xl">
              <Loader2 className="w-4 h-4 animate-spin text-[#98A2B3]" />
              <span className="text-sm text-[#98A2B3] font-medium">Yuklanmoqda...</span>
            </div>
          ) : (
            <CustomSelect
              options={quizOptions}
              value={selectedQuizId}
              onChange={setSelectedQuizId}
              placeholder="Testni tanlang..."
            />
          )}
        </div>
      </div>

      {/* Summary Cards */}
      {quizDetail && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1D2939]">{questions.length}</h3>
              <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Jami savollar</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#002D5B]/10 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#002D5B] flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1D2939]">{quizDetail.max_score}</h3>
              <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Max ball</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#12B76A] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1D2939]">{quizDetail.passing_score}</h3>
              <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">O'tish balli</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F04438]/10 flex items-center justify-center shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#F04438] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1D2939]">-{quizDetail.penalty_per_retake}</h3>
              <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest mt-0.5">Retake jarima</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Button */}
      {selectedQuizId && !showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group w-full md:w-auto"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Savol qo'shish
        </button>
      )}

      {/* Inline Add Form */}
      {showAddForm && (
        <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border-2 border-primary/20 shadow-2xl shadow-primary/5 animate-in zoom-in-95 duration-300 relative">
          <button
            onClick={() => setShowAddForm(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl hover:bg-[#F9FAFB] text-[#98A2B3] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl md:text-2xl font-black text-[#1D2939] mb-6">Yangi savol</h3>

          <div className="space-y-6">
            {/* Question Text */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Savol matni</label>
              <textarea
                placeholder="Masalan: She ___ to school every day."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full bg-[#F9FAFB] border-none rounded-[24px] py-4 px-6 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[100px] resize-none"
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {answers.map((answer, idx) => (
                <div key={idx} className="relative group/opt">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    correctOption === idx ? 'bg-[#12B76A] text-white shadow-lg' : 'bg-white border border-[#F2F4F7] text-[#98A2B3]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <input
                    type="text"
                    placeholder={`Javob ${idx + 1}...`}
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[idx] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="w-full bg-[#F9FAFB] border-none rounded-[20px] py-4 pl-16 pr-12 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <button
                    onClick={() => setCorrectOption(idx)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      correctOption === idx ? 'bg-[#12B76A] border-[#12B76A]' : 'border-[#F2F4F7] hover:border-[#12B76A]/30'
                    }`}
                  >
                    {correctOption === idx && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleCreateQuestion}
              disabled={createQuestionMutation.isPending || !questionText.trim() || answers.filter(a => a.trim()).length < 2}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {createQuestionMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {createQuestionMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {quizLoading ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#F97316] animate-spin" />
              </div>
            </div>
            <p className="text-sm font-bold text-[#98A2B3]">Savollar yuklanmoqda...</p>
          </div>
        </div>
      ) : !selectedQuizId ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center">
                <Layers className="w-14 h-14 text-[#3538CD]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center border-4 border-white">
                <HelpCircle className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Guruh va testni tanlang</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed">
              Savollarni ko'rish va tahrirlash uchun avval yuqoridagi ro'yxatdan guruh va testni tanlang
            </p>
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex items-center justify-center">
                <HelpCircle className="w-14 h-14 text-[#98A2B3]" />
              </div>
              <div className="absolute -top-2 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center border-4 border-white">
                <Plus className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Savollar hali yo'q</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed mb-6">
              Bu testda hali savollar qo'shilmagan. "Savol qo'shish" tugmasini bosib birinchi savolingizni yarating
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Savol qo'shish
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              number={idx + 1}
              category={quizDetail?.quiz_type.name ?? ''}
              points={0}
              penalty={0}
              question={q.text}
              options={q.answers.map((a, i) => ({
                id: String.fromCharCode(65 + i),
                text: a.text,
                isCorrect: false, // teacher view shows is_correct from backend
              }))}
              media={q.media?.[0] && (q.media[0].media_type === 'image' || q.media[0].media_type === 'video') ? {
                type: q.media[0].media_type,
                url: q.media[0].file,
              } : undefined}
              onDelete={() => {
                if (window.confirm("Savolni o'chirishni xohlaysizmi?")) {
                  deleteQuestionMutation.mutate(q.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tests;
