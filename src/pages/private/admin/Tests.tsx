import { useState } from 'react';
import { Plus, X, HelpCircle, CheckCircle, Save, Check, Loader2, Trash2, BookOpen, ChevronRight, ArrowLeft, Layers, Pencil } from 'lucide-react';
import QuestionCard from '@/components/private/admin/Tests/QuestionCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useLevels, useLevelDetail, useCourses } from '@/hooks/useCourses';
import { useTemplateQuizzes, useCourseQuizzes, useQuizDetail, useCreateQuestion, useUpdateQuestion, useDeleteQuestion, useCreateQuiz, useUpdateQuiz, useDeleteQuiz, useQuizTypes, useCreateQuizType, useUploadMedia, useDeleteMedia, useUpdateAnswers } from '@/hooks/useQuizzes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizSchema } from '@/schemas/private/admin/quiz';
import { customAlert } from '@/components/ui/CustomAlert';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

type Tab = 'template' | 'course';
type Step = 'list' | 'quiz-detail';

const Tests = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';

  // Tab & Navigation — admin shablon, teacher guruh
  const [activeTab, setActiveTab] = useState<Tab>(isAdmin ? 'template' : 'course');
  const [step, setStep] = useState<Step>('list');
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  // Course tab
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseQuizId, setSelectedCourseQuizId] = useState('');
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [editQuizData, setEditQuizData] = useState({ title: '', max_score: '', passing_score: '', penalty_per_retake: '', time_limit: '', is_active: true });

  // Question form
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState(0);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // Data
  const { data: levels } = useLevels();
  const { data: levelDetail } = useLevelDetail(Number(selectedLevelId) || 0);
  const { data: templateQuizzes } = useTemplateQuizzes(Number(selectedLevelId) || 0);
  const { data: quizTypes } = useQuizTypes();
  const { data: courses } = useCourses();
  const { data: courseQuizzes, isLoading: courseQuizzesLoading } = useCourseQuizzes(Number(selectedCourseId) || 0);
  const activeQuizId = selectedQuizId || selectedCourseQuizId;
  const { data: quizDetail, isLoading: quizLoading } = useQuizDetail(Number(activeQuizId) || 0);

  // Mutations
  const createQuizMutation = useCreateQuiz();
  const updateQuizMutation = useUpdateQuiz();
  const deleteQuizMutation = useDeleteQuiz();
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const uploadMediaMutation = useUploadMedia();
  const deleteMediaMutation = useDeleteMedia();
  const createQuizTypeMutation = useCreateQuizType();
  const updateAnswersMutation = useUpdateAnswers();
  const [showCreateType, setShowCreateType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeSlug, setNewTypeSlug] = useState('');

  // Options
  const levelOptions = (levels ?? []).map(l => ({ label: l.name, value: String(l.id) }));
  const lessonOptions = (levelDetail?.modules ?? []).flatMap(m =>
    m.lessons.map(l => ({ label: `${m.title} → ${l.title}`, value: String(l.id) }))
  );
  const quizTypeOptions = (quizTypes ?? []).map(t => ({ label: t.name, value: String(t.id) }));
  const questions = quizDetail?.questions ?? [];

  // Quiz create form
  const { register: regQuiz, handleSubmit: handleQuizSubmit, reset: resetQuiz, setValue: setQuizValue, watch: watchQuiz, formState: { errors: quizErrors } } = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: { title: '', description: '', lesson: '', quiz_type: '', max_score: '100', passing_score: '60', penalty_per_retake: '10', time_limit: '900' },
  });
  const watchedLesson = watchQuiz('lesson');
  const watchedQuizType = watchQuiz('quiz_type');

  const onCreateQuiz = (data: CreateQuizSchema) => {
    const payload: any = {
      title: data.title,
      description: data.description || '',
      lesson: Number(data.lesson),
      quiz_type: Number(data.quiz_type),
      max_score: Number(data.max_score),
      passing_score: Number(data.passing_score),
      penalty_per_retake: Number(data.penalty_per_retake) || 10,
      time_limit: Number(data.time_limit) || 900,
    };
    createQuizMutation.mutate(payload, {
      onSuccess: () => { setShowCreateQuiz(false); resetQuiz(); },
    });
  };

  const handleCreateQuestion = () => {
    if (!activeQuizId || !questionText.trim()) { toast.error("Savol matnini kiriting"); return; }
    const answerPayloads = answers.map((text, idx) => ({
      text, is_correct: idx === correctOption, order: idx + 1,
    })).filter(a => a.text.trim());
    if (answerPayloads.length < 2) { toast.error("Kamida 2 ta javob kerak"); return; }
    if (!answerPayloads.some(a => a.is_correct)) { toast.error("Kamida 1 ta to'g'ri javob kerak"); return; }

    createQuestionMutation.mutate(
      { quizId: Number(activeQuizId), data: { text: questionText, order: questions.length + 1, answers: answerPayloads } },
      {
        onSuccess: (data) => {
          if (mediaFile && data?.data?.id) {
            const fd = new FormData();
            fd.append('file', mediaFile);
            fd.append('media_type', mediaFile.type.startsWith('image') ? 'image' : mediaFile.type.startsWith('audio') ? 'audio' : 'video');
            uploadMediaMutation.mutate({ questionId: data.data.id, formData: fd });
          }
          setShowAddQuestion(false); setQuestionText(''); setAnswers(['', '', '', '']); setCorrectOption(0); setMediaFile(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        {step === 'quiz-detail' && (
          <button onClick={() => { setStep('list'); setSelectedQuizId(''); }} className="p-2 rounded-xl hover:bg-[#F2F4F7] text-[#98A2B3] hover:text-[#141F38] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">
          {step === 'list' ? 'Testlar' : quizDetail?.title || 'Test'}
        </h2>
      </div>

      {/* ========== LIST VIEW ========== */}
      {step === 'list' && (
        <div className="space-y-8">
          {/* Tabs — admin: shablon | teacher: guruh testlari */}
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-[#F2F4F7] shadow-sm w-fit">
            {isAdmin && (
              <button onClick={() => setActiveTab('template')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black tracking-tight transition-all duration-300 ${activeTab === 'template' ? 'bg-gradient-to-r from-primary to-[#EA580C] text-white shadow-lg shadow-primary/20' : 'text-[#98A2B3] hover:text-[#667085]'}`}>
                <BookOpen className="w-4 h-4" /> Shablon testlar
              </button>
            )}
            {(isTeacher || isAdmin) && (
              <button onClick={() => setActiveTab('course')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black tracking-tight transition-all duration-300 ${activeTab === 'course' ? 'bg-gradient-to-r from-[#141F38] to-[#1E3A5F] text-white shadow-lg shadow-[#141F38]/20' : 'text-[#98A2B3] hover:text-[#667085]'}`}>
                <Layers className="w-4 h-4" /> Guruh testlari
              </button>
            )}
          </div>

          {/* ===== TEMPLATE TAB ===== */}
          {activeTab === 'template' && (
          <>
          {/* Step 1: Level */}
          <div className="bg-white p-6 md:p-8 rounded-[28px] border border-[#F2F4F7] shadow-sm space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[#EA580C] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/20">1</div>
              <div>
                <h3 className="text-lg font-black text-[#1D2939]">Daraja tanlang</h3>
                <p className="text-xs font-medium text-[#98A2B3]">Level → Module → Lesson ierarxiyasini ko'ring</p>
              </div>
            </div>
            <div className="max-w-md">
              <CustomSelect options={levelOptions} value={selectedLevelId} onChange={(val) => { setSelectedLevelId(val); setSelectedQuizId(''); }} placeholder="Darajani tanlang..." />
            </div>
          </div>

          {/* Step 2: Modules + Lessons */}
          {selectedLevelId && levelDetail && (
            <div className="bg-white p-6 md:p-8 rounded-[28px] border border-[#F2F4F7] shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">2</div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#1D2939]">{levelDetail.name} — Modullar va darslar</h3>
                  <p className="text-xs font-medium text-[#98A2B3]">{levelDetail.modules.length} ta modul, {levelDetail.modules.reduce((s, m) => s + m.lessons.length, 0)} ta dars</p>
                </div>
              </div>

              {levelDetail.modules.length === 0 ? (
                <div className="text-center py-12 bg-[#F9FAFB] rounded-2xl border border-dashed border-[#E4E7EC]">
                  <BookOpen className="w-10 h-10 text-[#D0D5DD] mx-auto mb-3" />
                  <p className="text-[#98A2B3] font-bold">Bu darajada modullar yo'q</p>
                  <p className="text-[#D0D5DD] text-xs mt-1">"O'quv dasturi" sahifasida yarating</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {levelDetail.modules.map((mod, modIdx) => (
                    <div key={mod.id} className="rounded-2xl border border-[#F2F4F7] overflow-hidden hover:shadow-md transition-shadow">
                      <div className="px-5 py-4 bg-gradient-to-r from-[#F8F9FA] to-white border-b border-[#F2F4F7] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 font-black text-xs">{modIdx + 1}</div>
                        <h4 className="text-sm font-black text-[#141F38]">{mod.title}</h4>
                        <span className="text-[10px] font-bold text-[#98A2B3] bg-[#F2F4F7] px-2 py-0.5 rounded-full ml-auto">{mod.lessons.length} dars</span>
                      </div>
                      <div className="divide-y divide-[#F9FAFB]">
                        {mod.lessons.map((lesson, lesIdx) => (
                          <div key={lesson.id} className="px-5 py-3 flex items-center gap-3 hover:bg-[#F9FAFB] transition-colors">
                            <div className="w-6 h-6 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[10px] font-bold text-[#98A2B3]">{lesIdx + 1}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#141F38] truncate">{lesson.title}</p>
                              {lesson.description && <p className="text-[10px] text-[#C0C5CD] truncate">{lesson.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Create Quiz */}
          {selectedLevelId && lessonOptions.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-[28px] border border-[#F2F4F7] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-green-500/20">3</div>
                  <div>
                    <h3 className="text-lg font-black text-[#1D2939]">Test yarating</h3>
                    <p className="text-xs font-medium text-[#98A2B3]">Darsga test biriktiring — guruh yaratilganda avtomatik klonlanadi</p>
                  </div>
                </div>
                {!showCreateQuiz && (
                  <button onClick={() => setShowCreateQuiz(true)} className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#EA580C] text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                    <Plus className="w-4 h-4" /> Yangi test
                  </button>
                )}
              </div>

              {showCreateQuiz && (
                <form onSubmit={handleQuizSubmit(onCreateQuiz)} className="bg-gradient-to-br from-[#FFF7ED] to-white p-6 md:p-8 rounded-2xl border-2 border-primary/20 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Plus className="w-5 h-5 text-white" /></div>
                      <h4 className="text-lg font-black text-[#1D2939]">Yangi test yaratish</h4>
                    </div>
                    <button type="button" onClick={() => { setShowCreateQuiz(false); resetQuiz(); }} className="p-2 rounded-xl hover:bg-white/80"><X className="w-5 h-5 text-[#98A2B3]" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-[#667085] ml-1">Test nomi *</label>
                      <input {...regQuiz('title')} placeholder="Masalan: Present Simple Quiz" className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.title ? 'border-red-400' : 'border-[#F2F4F7]'}`} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#667085] ml-1">Dars tanlang *</label>
                      <CustomSelect
                        options={lessonOptions}
                        value={watchedLesson}
                        onChange={(val) => setQuizValue('lesson', val, { shouldValidate: true })}
                        placeholder="Darsni tanlang..."
                        className={quizErrors.lesson ? 'ring-2 ring-red-400 rounded-xl' : ''}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#667085] ml-1">Test turi *</label>
                        <button type="button" onClick={() => setShowCreateType(!showCreateType)} className="text-[10px] font-bold text-primary hover:underline">+ Yangi tur</button>
                      </div>
                      {showCreateType && (
                        <div className="flex gap-2 mb-2">
                          <input placeholder="Nomi" value={newTypeName} onChange={(e) => { setNewTypeName(e.target.value); setNewTypeSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')); }} className="flex-1 px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs outline-none" />
                          <button type="button" onClick={() => { if (newTypeName) createQuizTypeMutation.mutate({ name: newTypeName, slug: newTypeSlug }, { onSuccess: () => { setNewTypeName(''); setNewTypeSlug(''); setShowCreateType(false); } }); }} disabled={!newTypeName} className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-bold disabled:opacity-50">Qo'shish</button>
                        </div>
                      )}
                      <CustomSelect
                        options={quizTypeOptions}
                        value={watchedQuizType}
                        onChange={(val) => setQuizValue('quiz_type', val, { shouldValidate: true })}
                        placeholder="Turni tanlang..."
                        className={quizErrors.quiz_type ? 'ring-2 ring-red-400 rounded-xl' : ''}
                      />
                    </div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Max ball</label><input {...regQuiz('max_score')} type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">O'tish balli</label><input {...regQuiz('passing_score')} type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Jarima</label><input {...regQuiz('penalty_per_retake')} type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Vaqt (soniya)</label><input {...regQuiz('time_limit')} type="number" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                  </div>
                  <button type="submit" disabled={createQuizMutation.isPending} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-70">
                    {createQuizMutation.isPending ? 'Yaratilmoqda...' : '+ Test yaratish'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Step 4: Template quizzes list */}
          {templateQuizzes && templateQuizzes.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-[28px] border border-[#F2F4F7] shadow-sm space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/20">4</div>
                <div>
                  <h3 className="text-lg font-black text-[#1D2939]">Savollar qo'shing</h3>
                  <p className="text-xs font-medium text-[#98A2B3]">Test ustiga bosing va savollar qo'shing</p>
                </div>
              </div>
              <div className="space-y-3">
                {templateQuizzes.map(quiz => (
                  <div
                    key={quiz.id}
                    onClick={() => { setSelectedQuizId(String(quiz.id)); setStep('quiz-detail'); }}
                    className="p-5 rounded-2xl border border-[#F2F4F7] flex items-center justify-between hover:shadow-lg hover:border-primary/30 cursor-pointer transition-all duration-300 group bg-gradient-to-r from-white to-[#FAFAFA] hover:from-[#FFF7ED] hover:to-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary group-hover:to-[#EA580C] transition-all duration-300 shadow-sm">
                        <CheckCircle className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-[15px] font-black text-[#141F38] group-hover:text-primary transition-colors">{quiz.title}</p>
                        <div className="flex items-center gap-3 text-[11px] font-semibold text-[#98A2B3] mt-1">
                          <span className="px-2 py-0.5 bg-[#EEF4FF] text-[#3538CD] rounded-md text-[10px] font-bold">{quiz.quiz_type.name}</span>
                          <span>{quiz.question_count} savol</span>
                          <span>·</span>
                          <span>{Math.floor(quiz.time_limit / 60)} daq</span>
                          <span>·</span>
                          <span>{quiz.max_score} ball</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Savollar →</span>
                      <ChevronRight className="w-5 h-5 text-[#D0D5DD] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedLevelId && templateQuizzes && templateQuizzes.length === 0 && !showCreateQuiz && lessonOptions.length > 0 && (
            <div className="text-center py-14 bg-gradient-to-b from-[#F9FAFB] to-white rounded-[28px] border border-dashed border-[#E4E7EC]">
              <div className="w-16 h-16 rounded-2xl bg-[#F2F4F7] flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-[#D0D5DD]" />
              </div>
              <p className="text-[#98A2B3] font-black text-lg">Bu darajada testlar hali yo'q</p>
              <p className="text-[#D0D5DD] text-sm mt-2">Yuqoridagi "Yangi test" tugmasini bosing</p>
            </div>
          )}
          </>
          )}

          {/* ===== COURSE TAB ===== */}
          {activeTab === 'course' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
                  <CustomSelect options={(courses ?? []).map(c => ({ label: c.title, value: String(c.id) }))} value={selectedCourseId} onChange={(val) => { setSelectedCourseId(val); setSelectedCourseQuizId(''); }} placeholder="Guruhni tanlang..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Test tanlang</label>
                  {courseQuizzesLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#F2F4F7] rounded-xl"><Loader2 className="w-4 h-4 animate-spin text-[#98A2B3]" /></div>
                  ) : (
                    <CustomSelect options={(courseQuizzes ?? []).map(q => ({ label: `${q.title} (${q.question_count} savol)`, value: String(q.id) }))} value={selectedCourseQuizId} onChange={(val) => setSelectedCourseQuizId(val)} placeholder="Testni tanlang..." />
                  )}
                </div>
              </div>

              {/* Quiz actions — teacher: to'liq CRUD, admin: faqat ko'rish */}
              {selectedCourseQuizId && quizDetail && (
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={() => { setSelectedCourseQuizId(selectedCourseQuizId); setSelectedQuizId(''); setStep('quiz-detail'); }}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
                    <BookOpen className="w-4 h-4" /> Savollarni ko'rish
                  </button>
                  {isTeacher && (
                    <>
                      <button onClick={() => { setEditQuizData({ title: quizDetail.title, max_score: String(quizDetail.max_score), passing_score: String(quizDetail.passing_score), penalty_per_retake: String(quizDetail.penalty_per_retake), time_limit: String(quizDetail.time_limit), is_active: true }); setShowEditQuiz(true); }}
                        className="flex items-center gap-2 bg-[#F2F4F7] text-[#141F38] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#E4E7EC] transition-all">
                        <Pencil className="w-4 h-4" /> Sozlamalar
                      </button>
                      <button onClick={() => { customAlert.confirm({ variant: 'warning', title: "Testni o'chirish", description: "Bu test o'chiriladi.", confirmText: "O'chirish", cancelText: 'Bekor', icon: Trash2, onConfirm: () => deleteQuizMutation.mutate(Number(selectedCourseQuizId), { onSuccess: () => setSelectedCourseQuizId('') }) }); }}
                        className="flex items-center gap-2 bg-[#FEE4E2] text-[#F04438] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F04438] hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" /> O'chirish
                  </button>
                    </>
                  )}
                </div>
              )}

              {/* Edit quiz form — faqat teacher */}
              {isTeacher && showEditQuiz && quizDetail && (
                <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#1D2939]">Test sozlamalarini tahrirlash</h3>
                    <button onClick={() => setShowEditQuiz(false)} className="p-2 rounded-xl hover:bg-[#F9FAFB]"><X className="w-4 h-4 text-[#98A2B3]" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Nom</label><input value={editQuizData.title} onChange={(e) => setEditQuizData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Max ball</label><input type="number" value={editQuizData.max_score} onChange={(e) => setEditQuizData(p => ({ ...p, max_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">O'tish balli</label><input type="number" value={editQuizData.passing_score} onChange={(e) => setEditQuizData(p => ({ ...p, passing_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Jarima</label><input type="number" value={editQuizData.penalty_per_retake} onChange={(e) => setEditQuizData(p => ({ ...p, penalty_per_retake: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                    <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Vaqt (son)</label><input type="number" value={editQuizData.time_limit} onChange={(e) => setEditQuizData(p => ({ ...p, time_limit: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm outline-none" /></div>
                  </div>
                  <button onClick={() => { updateQuizMutation.mutate({ id: Number(selectedCourseQuizId), data: { title: editQuizData.title || undefined, max_score: Number(editQuizData.max_score) || undefined, passing_score: Number(editQuizData.passing_score) || undefined, penalty_per_retake: Number(editQuizData.penalty_per_retake) || undefined, time_limit: Number(editQuizData.time_limit) || undefined, is_active: editQuizData.is_active } }, { onSuccess: () => setShowEditQuiz(false) }); }}
                    disabled={updateQuizMutation.isPending} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm disabled:opacity-70">
                    {updateQuizMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
                  </button>
                </div>
              )}

              {!selectedCourseId && (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
                  <Layers className="w-12 h-12 text-[#D0D5DD] mx-auto mb-3" />
                  <p className="text-[#98A2B3] font-bold">Guruh tanlang</p>
                  <p className="text-[#D0D5DD] text-xs mt-1">Klonlangan testlar va natijalarni ko'rish uchun</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========== STEP 2: Quiz Detail → Questions ========== */}
      {step === 'quiz-detail' && (
        <div className="space-y-6">
          {quizLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : !quizDetail ? (
            <div className="text-center py-20"><p className="text-[#98A2B3] font-bold">Test topilmadi</p></div>
          ) : (
            <>
              {/* Quiz info cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#F2F4F7] text-center">
                  <p className="text-2xl font-black text-[#1D2939]">{questions.length}</p>
                  <p className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">Savollar</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#F2F4F7] text-center">
                  <p className="text-2xl font-black text-[#1D2939]">{quizDetail.max_score}</p>
                  <p className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">Max ball</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#F2F4F7] text-center">
                  <p className="text-2xl font-black text-[#1D2939]">{quizDetail.passing_score}</p>
                  <p className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">O'tish balli</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#F2F4F7] text-center">
                  <p className="text-2xl font-black text-[#1D2939]">{Math.floor(quizDetail.time_limit / 60)} daq</p>
                  <p className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">Vaqt</p>
                </div>
              </div>

              {/* Actions — admin: shablon CRUD | teacher: guruh CRUD | admin+guruh: faqat ko'rish */}
              {(isAdmin || isTeacher) && !(isAdmin && activeTab === 'course') && (
                <div className="flex flex-wrap gap-3">
                  {!showAddQuestion && (
                    <button onClick={() => setShowAddQuestion(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
                      <Plus className="w-4 h-4" /> Savol qo'shish
                    </button>
                  )}
                  <button onClick={() => { customAlert.confirm({ variant: 'warning', title: "Testni o'chirish", description: "Bu test va barcha savollari o'chiriladi.", confirmText: "O'chirish", cancelText: 'Bekor qilish', icon: Trash2, onConfirm: () => deleteQuizMutation.mutate(Number(activeQuizId), { onSuccess: () => { setStep('list'); setSelectedQuizId(''); setSelectedCourseQuizId(''); } }) }); }}
                    className="flex items-center gap-2 bg-[#FEE4E2] text-[#F04438] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F04438] hover:text-white transition-all">
                    <Trash2 className="w-4 h-4" /> O'chirish
                  </button>
                </div>
              )}

              {/* Add Question Form */}
              {showAddQuestion && (
                <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary/20 shadow-xl space-y-5 relative">
                  <button onClick={() => setShowAddQuestion(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-[#F9FAFB]"><X className="w-5 h-5 text-[#98A2B3]" /></button>
                  <h3 className="text-xl font-black text-[#1D2939]">Yangi savol</h3>
                  <textarea placeholder="Savol matni..." value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="w-full bg-[#F9FAFB] rounded-2xl py-4 px-5 text-sm font-bold outline-none min-h-[80px] resize-none border-none focus:ring-2 focus:ring-primary/20" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {answers.map((a, idx) => (
                      <div key={idx} className="relative">
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${correctOption === idx ? 'bg-[#12B76A] text-white' : 'bg-[#F2F4F7] text-[#98A2B3]'}`}>{String.fromCharCode(65 + idx)}</div>
                        <input type="text" placeholder={`Javob ${idx + 1}`} value={a} onChange={(e) => { const n = [...answers]; n[idx] = e.target.value; setAnswers(n); }} className="w-full bg-[#F9FAFB] rounded-xl py-3.5 pl-14 pr-12 text-sm font-medium outline-none border-none focus:ring-2 focus:ring-primary/20" />
                        <button onClick={() => setCorrectOption(idx)} className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${correctOption === idx ? 'bg-[#12B76A] border-[#12B76A]' : 'border-[#E4E7EC]'}`}>{correctOption === idx && <Check className="w-3.5 h-3.5 text-white" />}</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*,audio/*,video/*" onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)} className="text-xs font-medium text-[#667085] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs file:cursor-pointer" />
                    {mediaFile && <button onClick={() => setMediaFile(null)} className="text-[#F04438] text-xs font-bold">Bekor qilish</button>}
                  </div>
                  <button onClick={handleCreateQuestion} disabled={createQuestionMutation.isPending || !questionText.trim()} className="w-full bg-primary text-white py-3.5 rounded-xl font-black text-sm shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2">
                    {createQuestionMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {createQuestionMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
                  </button>
                </div>
              )}

              {/* Questions list */}
              {questions.length === 0 && !showAddQuestion ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
                  <HelpCircle className="w-12 h-12 text-[#D0D5DD] mx-auto mb-3" />
                  <p className="text-[#98A2B3] font-bold text-lg">Savollar hali yo'q</p>
                  <p className="text-[#D0D5DD] text-xs mt-1">"Savol qo'shish" tugmasini bosing</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {questions.map((q, idx) => (
                    <QuestionCard
                      key={q.id}
                      number={idx + 1}
                      questionId={q.id}
                      category={quizDetail.quiz_type.name}
                      question={q.text}
                      answers={q.answers.map((a: { id: number; text: string; is_correct?: boolean; order: number }) => ({ id: a.id, text: a.text, is_correct: a.is_correct, order: a.order }))}
                      media={q.media ?? []}
                      onDelete={() => { customAlert.confirm({ variant: 'warning', title: "Savolni o'chirish", confirmText: "O'chirish", cancelText: 'Bekor qilish', icon: Trash2, description: `${idx + 1}-savol`, onConfirm: () => deleteQuestionMutation.mutate(q.id) }); }}
                      onEditQuestion={(qId, data) => updateQuestionMutation.mutate({ questionId: qId, data })}
                      onUpdateAnswers={(qId, ans) => updateAnswersMutation.mutate({ questionId: qId, answers: ans })}
                      onUploadMedia={(qId, file, type) => { const fd = new FormData(); fd.append('file', file); fd.append('media_type', type); uploadMediaMutation.mutate({ questionId: qId, formData: fd }); }}
                      onDeleteMedia={(mId) => deleteMediaMutation.mutate(mId)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Tests;
