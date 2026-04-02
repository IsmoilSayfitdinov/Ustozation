import { useState } from 'react';
import { Plus, X, HelpCircle, Layers, CheckCircle, AlertTriangle, Save, Check, Loader2, Trash2, Clock, Pencil, BookOpen } from 'lucide-react';
import QuestionCard from '@/components/private/admin/Tests/QuestionCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useLevels, useLevelDetail } from '@/hooks/useCourses';
import { useCourseQuizzes, useQuizDetail, useCreateQuestion, useUpdateQuestion, useDeleteQuestion, useCreateQuiz, useUpdateQuiz, useDeleteQuiz, useQuizTypes, useCreateQuizType, useUploadMedia, useDeleteMedia, useUpdateAnswers } from '@/hooks/useQuizzes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizSchema } from '@/schemas/private/admin/quiz';
import { customAlert } from '@/components/ui/CustomAlert';
import { toast } from 'sonner';

type Tab = 'create' | 'results';

const Tests = () => {
  const [activeTab, setActiveTab] = useState<Tab>('create');

  // ===== CREATE TAB STATE =====
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [editQuizData, setEditQuizData] = useState({ title: '', max_score: '', passing_score: '', penalty_per_retake: '', time_limit: '', is_active: true });

  // Question form state
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // ===== RESULTS TAB STATE =====
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseQuizId, setSelectedCourseQuizId] = useState('');

  // ===== DATA =====
  const { data: levels } = useLevels();
  const { data: levelDetail } = useLevelDetail(Number(selectedLevelId) || 0);
  const { data: quizTypes } = useQuizTypes();
  const { data: courses } = useCourses();
  const { data: courseQuizzes, isLoading: courseQuizzesLoading } = useCourseQuizzes(Number(selectedCourseId) || 0);
  const { data: quizDetail, isLoading: quizLoading } = useQuizDetail(Number(selectedQuizId || selectedCourseQuizId) || 0);

  // ===== MUTATIONS =====
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

  // ===== OPTIONS =====
  const levelOptions = (levels ?? []).map(l => ({ label: l.name, value: String(l.id) }));
  const lessonOptions = (levelDetail?.modules ?? []).flatMap(m =>
    m.lessons.map(l => ({ label: `${m.title} → ${l.title}`, value: String(l.id) }))
  );
  const quizTypeOptions = (quizTypes ?? []).map(t => ({ label: t.name, value: String(t.id) }));
  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const courseQuizOptions = (courseQuizzes ?? []).map(q => ({ label: `${q.title} (${q.question_count} savol)`, value: String(q.id) }));
  const questions = quizDetail?.questions ?? [];

  // Quiz create form
  const { register: regQuiz, handleSubmit: handleQuizSubmit, reset: resetQuiz, formState: { errors: quizErrors } } = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: { title: '', description: '', lesson: '', quiz_type: '', max_score: '100', passing_score: '60', penalty_per_retake: '10', time_limit: '900' },
  });

  const onCreateQuiz = (data: CreateQuizSchema) => {
    createQuizMutation.mutate({
      title: data.title,
      description: data.description || '',
      lesson: Number(data.lesson),
      course: null, // Template — barcha guruhlarga taalluqli
      quiz_type: Number(data.quiz_type),
      max_score: Number(data.max_score),
      passing_score: Number(data.passing_score),
      penalty_per_retake: Number(data.penalty_per_retake) || 10,
      time_limit: Number(data.time_limit) || 900,
    }, {
      onSuccess: () => { setShowCreateQuiz(false); resetQuiz(); },
    });
  };

  const handleDeleteQuiz = (quizId: string) => {
    customAlert.confirm({
      variant: 'warning',
      title: "Testni o'chirish",
      description: "Bu test va barcha savollari o'chiriladi.",
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => {
        deleteQuizMutation.mutate(Number(quizId), {
          onSuccess: () => { setSelectedQuizId(''); setSelectedCourseQuizId(''); },
        });
      },
    });
  };

  const handleCreateQuestion = () => {
    const activeQuizId = selectedQuizId || selectedCourseQuizId;
    if (!activeQuizId || !questionText.trim()) {
      toast.error("Savol matnini kiriting");
      return;
    }
    const answerPayloads = answers.map((text, idx) => ({
      text, is_correct: idx === correctOption, order: idx + 1,
    })).filter(a => a.text.trim());

    if (answerPayloads.length < 2) { toast.error("Kamida 2 ta javob kiritilishi shart"); return; }
    if (!answerPayloads.some(a => a.is_correct)) { toast.error("Kamida 1 ta to'g'ri javob belgilanishi kerak"); return; }

    createQuestionMutation.mutate(
      { quizId: Number(activeQuizId), data: { text: questionText, order: questions.length + 1, answers: answerPayloads } },
      {
        onSuccess: (data) => {
          if (mediaFile && data?.data?.id) {
            const formData = new FormData();
            formData.append('file', mediaFile);
            formData.append('media_type', mediaFile.type.startsWith('image') ? 'image' : mediaFile.type.startsWith('audio') ? 'audio' : 'video');
            uploadMediaMutation.mutate({ questionId: data.data.id, formData });
          }
          setShowAddForm(false);
          setQuestionText(''); setAnswers(['', '', '', '']); setCorrectOption(0); setMediaFile(null);
        },
      }
    );
  };

  const activeQuizId = selectedQuizId || selectedCourseQuizId;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Testlar</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-[#F9FAFB] p-1.5 rounded-2xl border border-[#F2F4F7] w-fit">
        <button onClick={() => setActiveTab('create')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-white text-[#141F38] shadow-sm' : 'text-[#98A2B3]'}`}>
          <Plus className="w-4 h-4" /> Test yaratish
        </button>
        <button onClick={() => setActiveTab('results')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'results' ? 'bg-white text-[#141F38] shadow-sm' : 'text-[#98A2B3]'}`}>
          <Layers className="w-4 h-4" /> Guruh testlari
        </button>
      </div>

      {/* ============ CREATE TAB ============ */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          {/* Level → Lesson selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Daraja tanlang</label>
              <CustomSelect options={levelOptions} value={selectedLevelId} onChange={(val) => { setSelectedLevelId(val); setSelectedQuizId(''); }} placeholder="Darajani tanlang..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Dars tanlang</label>
              {!selectedLevelId ? (
                <p className="text-sm text-[#98A2B3] font-medium px-4 py-3 bg-[#F2F4F7] rounded-xl">Avval darajani tanlang</p>
              ) : lessonOptions.length === 0 ? (
                <p className="text-sm text-[#98A2B3] font-medium px-4 py-3 bg-[#F2F4F7] rounded-xl">Bu darajada darslar yo'q</p>
              ) : (
                <p className="text-xs text-[#98A2B3] font-medium ml-1">{lessonOptions.length} ta dars mavjud</p>
              )}
            </div>
          </div>

          {/* Create Quiz Button */}
          {selectedLevelId && lessonOptions.length > 0 && (
            <button onClick={() => setShowCreateQuiz(true)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all">
              <Plus className="w-4 h-4" /> Yangi test yaratish
            </button>
          )}

          {/* Create Quiz Form */}
          {showCreateQuiz && (
            <form onSubmit={handleQuizSubmit(onCreateQuiz)} className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary/20 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#1D2939]">Yangi test yaratish</h3>
                <button type="button" onClick={() => { setShowCreateQuiz(false); resetQuiz(); }} className="p-2 rounded-xl hover:bg-[#F9FAFB]"><X className="w-5 h-5 text-[#98A2B3]" /></button>
              </div>
              <div className="bg-[#FFF6ED] border border-[#FDBA74]/30 rounded-xl p-3">
                <p className="text-[11px] font-medium text-[#F97316]">Test darsga biriktiriladi. Guruh yaratilganda avtomatik klonlanadi.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">Test nomi *</label>
                  <input {...regQuiz('title')} placeholder="Masalan: Present Simple Quiz" className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none focus:border-primary/30 ${quizErrors.title ? 'border-red-400' : 'border-[#F2F4F7]'}`} />
                  {quizErrors.title && <p className="text-red-500 text-[11px] font-bold ml-1">{quizErrors.title.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">Dars *</label>
                  <select {...regQuiz('lesson')} className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.lesson ? 'border-red-400' : 'border-[#F2F4F7]'}`}>
                    <option value="">Darsni tanlang</option>
                    {lessonOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {quizErrors.lesson && <p className="text-red-500 text-[11px] font-bold ml-1">{quizErrors.lesson.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#667085] ml-1">Test turi *</label>
                    <button type="button" onClick={() => setShowCreateType(!showCreateType)} className="text-[10px] font-bold text-primary hover:underline">+ Yangi tur</button>
                  </div>
                  {showCreateType && (
                    <div className="flex gap-2 mb-2">
                      <input placeholder="Nomi" value={newTypeName} onChange={(e) => { setNewTypeName(e.target.value); setNewTypeSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')); }} className="flex-1 px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-medium outline-none" />
                      <button type="button" onClick={() => { if (newTypeName) { createQuizTypeMutation.mutate({ name: newTypeName, slug: newTypeSlug }, { onSuccess: () => { setNewTypeName(''); setNewTypeSlug(''); setShowCreateType(false); } }); } }} disabled={!newTypeName || createQuizTypeMutation.isPending} className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-bold disabled:opacity-50">
                        {createQuizTypeMutation.isPending ? '...' : "Qo'shish"}
                      </button>
                    </div>
                  )}
                  <select {...regQuiz('quiz_type')} className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.quiz_type ? 'border-red-400' : 'border-[#F2F4F7]'}`}>
                    <option value="">Turni tanlang</option>
                    {quizTypeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">Max ball *</label>
                  <input {...regQuiz('max_score')} type="number" placeholder="100" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">O'tish balli *</label>
                  <input {...regQuiz('passing_score')} type="number" placeholder="60" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">Retake jarima</label>
                  <input {...regQuiz('penalty_per_retake')} type="number" placeholder="10" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Vaqt (soniya) *</label>
                  <input {...regQuiz('time_limit')} type="number" placeholder="900" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-[#667085] ml-1">Tavsif</label>
                  <textarea {...regQuiz('description')} placeholder="Test haqida..." className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none min-h-[80px] resize-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={createQuizMutation.isPending} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-70">
                  {createQuizMutation.isPending ? 'Yaratilmoqda...' : '+ Test yaratish'}
                </button>
                <button type="button" onClick={() => { setShowCreateQuiz(false); resetQuiz(); }} className="px-6 py-3 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">Bekor qilish</button>
              </div>
            </form>
          )}

          {/* Level Lessons + Quizzes tree */}
          {selectedLevelId && levelDetail && !showCreateQuiz && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-[#1D2939]">{levelDetail.name} — Darslar va testlar</h3>
              {levelDetail.modules.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
                  <p className="text-[#98A2B3] font-bold">Bu darajada modullar yo'q</p>
                </div>
              ) : (
                levelDetail.modules.map(mod => (
                  <div key={mod.id} className="space-y-2">
                    <h4 className="text-sm font-black text-[#667085] uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> {mod.title}
                    </h4>
                    <div className="space-y-2 pl-2">
                      {mod.lessons.map(lesson => (
                        <div key={lesson.id} className="bg-white p-4 rounded-2xl border border-[#F2F4F7] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#141F38]">{lesson.title}</p>
                            <p className="text-[11px] text-[#98A2B3]">{lesson.description || 'Tavsif yo\'q'}</p>
                          </div>
                          <span className="text-[10px] font-bold text-[#98A2B3] bg-[#F9FAFB] px-3 py-1 rounded-lg">ID: {lesson.id}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* ============ RESULTS TAB ============ */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {/* Course → Quiz selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
              <CustomSelect options={courseOptions} value={selectedCourseId} onChange={(val) => { setSelectedCourseId(val); setSelectedCourseQuizId(''); }} placeholder="Guruhni tanlang..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Test tanlang</label>
              {courseQuizzesLoading ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-[#F2F4F7] rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-[#98A2B3]" />
                  <span className="text-sm text-[#98A2B3]">Yuklanmoqda...</span>
                </div>
              ) : (
                <CustomSelect options={courseQuizOptions} value={selectedCourseQuizId} onChange={setSelectedCourseQuizId} placeholder="Testni tanlang..." />
              )}
            </div>
          </div>

          {/* Quiz Actions */}
          {selectedCourseQuizId && quizDetail && (
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => { setEditQuizData({ title: quizDetail.title, max_score: String(quizDetail.max_score), passing_score: String(quizDetail.passing_score), penalty_per_retake: String(quizDetail.penalty_per_retake), time_limit: String(quizDetail.time_limit), is_active: true }); setShowEditQuiz(true); }}
                className="flex items-center gap-2 bg-[#F2F4F7] text-[#141F38] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#E4E7EC] transition-all">
                <Pencil className="w-4 h-4" /> Sozlamalar
              </button>
              <button onClick={() => handleDeleteQuiz(selectedCourseQuizId)}
                className="flex items-center gap-2 bg-[#FEE4E2] text-[#F04438] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F04438] hover:text-white transition-all">
                <Trash2 className="w-4 h-4" /> O'chirish
              </button>
            </div>
          )}

          {/* Edit Quiz Inline */}
          {showEditQuiz && quizDetail && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#1D2939]">Test sozlamalarini tahrirlash</h3>
                <button onClick={() => setShowEditQuiz(false)} className="p-2 rounded-xl hover:bg-[#F9FAFB]"><X className="w-4 h-4 text-[#98A2B3]" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Test nomi</label><input value={editQuizData.title} onChange={(e) => setEditQuizData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Max ball</label><input type="number" value={editQuizData.max_score} onChange={(e) => setEditQuizData(p => ({ ...p, max_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">O'tish balli</label><input type="number" value={editQuizData.passing_score} onChange={(e) => setEditQuizData(p => ({ ...p, passing_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Retake jarima</label><input type="number" value={editQuizData.penalty_per_retake} onChange={(e) => setEditQuizData(p => ({ ...p, penalty_per_retake: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Vaqt (soniya)</label><input type="number" value={editQuizData.time_limit} onChange={(e) => setEditQuizData(p => ({ ...p, time_limit: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" /></div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-[#667085] ml-1">Holat</label><button onClick={() => setEditQuizData(p => ({ ...p, is_active: !p.is_active }))} className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-colors ${editQuizData.is_active ? 'bg-[#E8FFF0] text-[#22C55E]' : 'bg-[#FFF0F0] text-[#F04438]'}`}>{editQuizData.is_active ? 'Aktiv' : 'Nofaol'}</button></div>
              </div>
              <button onClick={() => { updateQuizMutation.mutate({ id: Number(selectedCourseQuizId), data: { title: editQuizData.title || undefined, max_score: Number(editQuizData.max_score) || undefined, passing_score: Number(editQuizData.passing_score) || undefined, penalty_per_retake: Number(editQuizData.penalty_per_retake) || undefined, time_limit: Number(editQuizData.time_limit) || undefined, is_active: editQuizData.is_active } }, { onSuccess: () => setShowEditQuiz(false) }); }}
                disabled={updateQuizMutation.isPending} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-70">
                {updateQuizMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
            </div>
          )}

          {/* Quiz Summary */}
          {quizDetail && activeQuizId && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-6 h-6 text-primary" /></div><div><h3 className="text-2xl font-black text-[#1D2939]">{questions.length}</h3><p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Savollar</p></div></div>
              <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-[#002D5B]/10 flex items-center justify-center"><Layers className="w-6 h-6 text-[#002D5B]" /></div><div><h3 className="text-2xl font-black text-[#1D2939]">{quizDetail.max_score}</h3><p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Max ball</p></div></div>
              <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-[#12B76A]/10 flex items-center justify-center"><CheckCircle className="w-6 h-6 text-[#12B76A]" /></div><div><h3 className="text-2xl font-black text-[#1D2939]">{quizDetail.passing_score}</h3><p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">O'tish balli</p></div></div>
              <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7] flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-[#F04438]/10 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-[#F04438]" /></div><div><h3 className="text-xl font-black text-[#1D2939]">-{quizDetail.penalty_per_retake}</h3><p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Jarima</p></div></div>
            </div>
          )}

          {/* Add Question */}
          {activeQuizId && !showAddForm && !showEditQuiz && (
            <button onClick={() => setShowAddForm(true)} className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all w-full md:w-auto">
              <Plus className="w-5 h-5" /> Savol qo'shish
            </button>
          )}

          {/* Question Form */}
          {showAddForm && (
            <div className="bg-white p-6 md:p-10 rounded-3xl border-2 border-primary/20 shadow-2xl space-y-6 relative">
              <button onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl hover:bg-[#F9FAFB] text-[#98A2B3]"><X className="w-5 h-5" /></button>
              <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">Yangi savol</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Savol matni</label>
                  <textarea placeholder="Masalan: She ___ to school every day." value={questionText} onChange={(e) => setQuestionText(e.target.value)} className="w-full bg-[#F9FAFB] border-none rounded-[24px] py-4 px-6 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px] resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {answers.map((answer, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${correctOption === idx ? 'bg-[#12B76A] text-white shadow-lg' : 'bg-white border border-[#F2F4F7] text-[#98A2B3]'}`}>{String.fromCharCode(65 + idx)}</div>
                      <input type="text" placeholder={`Javob ${idx + 1}...`} value={answer} onChange={(e) => { const n = [...answers]; n[idx] = e.target.value; setAnswers(n); }} className="w-full bg-[#F9FAFB] border-none rounded-[20px] py-4 pl-16 pr-12 text-sm font-bold text-[#1D2939] focus:ring-2 focus:ring-primary/20 outline-none" />
                      <button onClick={() => setCorrectOption(idx)} className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${correctOption === idx ? 'bg-[#12B76A] border-[#12B76A]' : 'border-[#F2F4F7] hover:border-[#12B76A]/30'}`}>{correctOption === idx && <Check className="w-3.5 h-3.5 text-white" />}</button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Media (ixtiyoriy)</label>
                  <div className="flex items-center gap-4">
                    <input type="file" accept="image/*,audio/*,video/*" onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)} className="flex-1 text-sm font-medium text-[#667085] file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs file:cursor-pointer" />
                    {mediaFile && <button onClick={() => setMediaFile(null)} className="p-2 rounded-xl hover:bg-[#FEE4E2] text-[#F04438]"><X className="w-4 h-4" /></button>}
                  </div>
                </div>
                <button onClick={handleCreateQuestion} disabled={createQuestionMutation.isPending || !questionText.trim() || answers.filter(a => a.trim()).length < 2}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                  {createQuestionMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {createQuestionMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          {!selectedCourseId ? (
            <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
              <div className="flex flex-col items-center justify-center py-28 px-6">
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center"><Layers className="w-14 h-14 text-[#3538CD]" /></div>
                </div>
                <h3 className="text-2xl font-black text-[#1D2939] mb-3">Guruh va testni tanlang</h3>
                <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg">Savollarni ko'rish va tahrirlash uchun guruh va testni tanlang</p>
              </div>
            </div>
          ) : quizLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
          ) : !activeQuizId ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
              <p className="text-[#98A2B3] font-bold">Testni tanlang</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
              <HelpCircle className="w-12 h-12 text-[#D0D5DD] mx-auto mb-4" />
              <p className="text-[#98A2B3] font-bold text-lg">Savollar hali yo'q</p>
              <p className="text-[#D0D5DD] text-sm mt-1">"Savol qo'shish" tugmasini bosing</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((q, idx) => (
                <QuestionCard
                  key={q.id}
                  number={idx + 1}
                  questionId={q.id}
                  category={quizDetail?.quiz_type.name ?? ''}
                  question={q.text}
                  answers={q.answers.map((a: { id: number; text: string; is_correct?: boolean; order: number }) => ({ id: a.id, text: a.text, is_correct: a.is_correct, order: a.order }))}
                  media={q.media ?? []}
                  onDelete={() => { customAlert.confirm({ variant: 'warning', title: "Savolni o'chirish", description: `${idx + 1}-savol o'chiriladi.`, confirmText: "O'chirish", cancelText: 'Bekor qilish', icon: Trash2, onConfirm: () => deleteQuestionMutation.mutate(q.id) }); }}
                  onEditQuestion={(qId, data) => { updateQuestionMutation.mutate({ questionId: qId, data }); }}
                  onUpdateAnswers={(qId, answerData) => { updateAnswersMutation.mutate({ questionId: qId, answers: answerData }); }}
                  onUploadMedia={(qId, file, mediaType) => { const fd = new FormData(); fd.append('file', file); fd.append('media_type', mediaType); uploadMediaMutation.mutate({ questionId: qId, formData: fd }); }}
                  onDeleteMedia={(mediaId) => { deleteMediaMutation.mutate(mediaId); }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tests;
