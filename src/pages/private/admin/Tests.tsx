import { useState } from 'react';
import { Plus, X, HelpCircle, Layers, CheckCircle, AlertTriangle, Save, Check, Loader2, Trash2, Clock, Pencil } from 'lucide-react';
import QuestionCard from '@/components/private/admin/Tests/QuestionCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useCourseLessons } from '@/hooks/useCourses';
import { useCourseQuizzes, useQuizDetail, useCreateQuestion, useDeleteQuestion, useCreateQuiz, useUpdateQuiz, useDeleteQuiz, useQuizTypes, useCreateQuizType, useUploadMedia, useDeleteMedia, useUpdateAnswers } from '@/hooks/useQuizzes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuizSchema, type CreateQuizSchema } from '@/schemas/private/admin/quiz';
import { customAlert } from '@/components/ui/CustomAlert';

const Tests = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  // Form state for questions
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const { data: courses } = useCourses();
  const { data: quizzes, isLoading: quizzesLoading } = useCourseQuizzes(Number(selectedCourseId) || 0);
  const { data: quizDetail, isLoading: quizLoading } = useQuizDetail(Number(selectedQuizId) || 0);
  const { data: quizTypes } = useQuizTypes();
  const { data: courseLessons } = useCourseLessons(Number(selectedCourseId) || 0);

  const createQuestionMutation = useCreateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const createQuizMutation = useCreateQuiz();
  const updateQuizMutation = useUpdateQuiz();
  const deleteQuizMutation = useDeleteQuiz();
  const uploadMediaMutation = useUploadMedia();
  const deleteMediaMutation = useDeleteMedia();
  const createQuizTypeMutation = useCreateQuizType();
  const updateAnswersMutation = useUpdateAnswers();
  const [showCreateType, setShowCreateType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeSlug, setNewTypeSlug] = useState('');
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [editQuizData, setEditQuizData] = useState({ title: '', max_score: '', passing_score: '', penalty_per_retake: '', time_limit: '', is_active: true });

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const quizOptions = (quizzes ?? []).map(q => ({ label: `${q.title} (${q.question_count} savol)`, value: String(q.id) }));
  const quizTypeOptions = (quizTypes ?? []).map(t => ({ label: t.name, value: String(t.id) }));
  const lessonOptions = (courseLessons ?? []).map(cl => ({ label: `${cl.module_title} → ${cl.lesson.title}`, value: String(cl.lesson.id) }));

  // Quiz create form
  const { register: regQuiz, handleSubmit: handleQuizSubmit, control: quizControl, reset: resetQuiz, formState: { errors: quizErrors } } = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: { title: '', description: '', lesson: '', quiz_type: '', max_score: '100', passing_score: '60', penalty_per_retake: '10', time_limit: '900' },
  });

  const onCreateQuiz = (data: CreateQuizSchema) => {
    createQuizMutation.mutate({
      title: data.title,
      description: data.description || '',
      lesson: Number(data.lesson),
      course: Number(selectedCourseId),
      quiz_type: Number(data.quiz_type),
      max_score: Number(data.max_score),
      passing_score: Number(data.passing_score),
      penalty_per_retake: Number(data.penalty_per_retake) || 10,
      time_limit: Number(data.time_limit) || 900,
    }, {
      onSuccess: () => { setShowCreateQuiz(false); resetQuiz(); },
    });
  };

  const handleDeleteQuiz = () => {
    if (!selectedQuizId) return;
    customAlert.confirm({
      variant: 'warning',
      title: "Testni o'chirish",
      description: "Bu test va barcha savollari o'chiriladi. Davom etasizmi?",
      confirmText: "O'chirish",
      cancelText: 'Bekor qilish',
      icon: Trash2,
      onConfirm: () => {
        deleteQuizMutation.mutate(Number(selectedQuizId), {
          onSuccess: () => setSelectedQuizId(''),
        });
      },
    });
  };

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
        onSuccess: (data) => {
          // Upload media if selected
          if (mediaFile && data?.data?.id) {
            const formData = new FormData();
            formData.append('file', mediaFile);
            formData.append('media_type', mediaFile.type.startsWith('image') ? 'image' : mediaFile.type.startsWith('audio') ? 'audio' : 'video');
            uploadMediaMutation.mutate({ questionId: data.data.id, formData });
          }
          setShowAddForm(false);
          setQuestionText('');
          setAnswers(['', '', '', '']);
          setCorrectOption(0);
          setMediaFile(null);
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

      {/* Quiz Actions */}
      {selectedCourseId && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCreateQuiz(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Yangi test yaratish
          </button>
          {selectedQuizId && quizDetail && (
            <>
              <button
                onClick={() => {
                  setEditQuizData({
                    title: quizDetail.title,
                    max_score: String(quizDetail.max_score),
                    passing_score: String(quizDetail.passing_score),
                    penalty_per_retake: String(quizDetail.penalty_per_retake),
                    time_limit: String(quizDetail.time_limit),
                    is_active: true,
                  });
                  setShowEditQuiz(true);
                }}
                className="flex items-center gap-2 bg-[#F2F4F7] text-[#141F38] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#E4E7EC] transition-all"
              >
                <Pencil className="w-4 h-4" /> Sozlamalar
              </button>
              <button
                onClick={handleDeleteQuiz}
                className="flex items-center gap-2 bg-[#FEE4E2] text-[#F04438] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F04438] hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" /> O'chirish
              </button>
            </>
          )}
        </div>
      )}

      {/* Create Quiz Form */}
      {showCreateQuiz && (
        <form onSubmit={handleQuizSubmit(onCreateQuiz)} className="bg-white p-6 md:p-8 rounded-3xl border-2 border-primary/20 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#1D2939]">Yangi test yaratish</h3>
            <button type="button" onClick={() => { setShowCreateQuiz(false); resetQuiz(); }} className="p-2 rounded-xl hover:bg-[#F9FAFB]">
              <X className="w-5 h-5 text-[#98A2B3]" />
            </button>
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
                <button type="button" onClick={() => setShowCreateType(!showCreateType)} className="text-[10px] font-bold text-primary hover:underline">
                  + Yangi tur
                </button>
              </div>
              {showCreateType && (
                <div className="flex gap-2 mb-2">
                  <input placeholder="Nomi" value={newTypeName} onChange={(e) => { setNewTypeName(e.target.value); setNewTypeSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-')); }} className="flex-1 px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-medium outline-none" />
                  <button type="button" onClick={() => { if (newTypeName) { createQuizTypeMutation.mutate({ name: newTypeName, slug: newTypeSlug }, { onSuccess: () => { setNewTypeName(''); setNewTypeSlug(''); setShowCreateType(false); } }); } }} disabled={!newTypeName || createQuizTypeMutation.isPending} className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-bold disabled:opacity-50">
                    {createQuizTypeMutation.isPending ? '...' : 'Qo\'shish'}
                  </button>
                </div>
              )}
              <select {...regQuiz('quiz_type')} className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.quiz_type ? 'border-red-400' : 'border-[#F2F4F7]'}`}>
                <option value="">Turni tanlang</option>
                {quizTypeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {quizErrors.quiz_type && <p className="text-red-500 text-[11px] font-bold ml-1">{quizErrors.quiz_type.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Max ball *</label>
              <input {...regQuiz('max_score')} type="number" placeholder="100" className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.max_score ? 'border-red-400' : 'border-[#F2F4F7]'}`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">O'tish balli *</label>
              <input {...regQuiz('passing_score')} type="number" placeholder="60" className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.passing_score ? 'border-red-400' : 'border-[#F2F4F7]'}`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Retake jarima</label>
              <input {...regQuiz('penalty_per_retake')} type="number" placeholder="10" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Vaqt limiti (soniya) *</label>
              <input {...regQuiz('time_limit')} type="number" placeholder="900 (15 daqiqa)" className={`w-full px-4 py-3 bg-[#F9FAFB] border rounded-xl text-sm font-medium outline-none ${quizErrors.time_limit ? 'border-red-400' : 'border-[#F2F4F7]'}`} />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Tavsif</label>
              <textarea {...regQuiz('description')} placeholder="Test haqida qisqacha..." className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none min-h-[80px] resize-none" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={createQuizMutation.isPending} className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-70">
              {createQuizMutation.isPending ? 'Yaratilmoqda...' : '+ Test yaratish'}
            </button>
            <button type="button" onClick={() => { setShowCreateQuiz(false); resetQuiz(); }} className="px-6 py-3 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">
              Bekor qilish
            </button>
          </div>
        </form>
      )}

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

      {/* Edit Quiz Inline */}
      {showEditQuiz && quizDetail && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#1D2939]">Test sozlamalarini tahrirlash</h3>
            <button onClick={() => setShowEditQuiz(false)} className="p-2 rounded-xl hover:bg-[#F9FAFB]"><X className="w-4 h-4 text-[#98A2B3]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Test nomi</label>
              <input value={editQuizData.title} onChange={(e) => setEditQuizData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Max ball</label>
              <input type="number" value={editQuizData.max_score} onChange={(e) => setEditQuizData(p => ({ ...p, max_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">O'tish balli</label>
              <input type="number" value={editQuizData.passing_score} onChange={(e) => setEditQuizData(p => ({ ...p, passing_score: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Retake jarima</label>
              <input type="number" value={editQuizData.penalty_per_retake} onChange={(e) => setEditQuizData(p => ({ ...p, penalty_per_retake: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Vaqt (soniya)</label>
              <input type="number" value={editQuizData.time_limit} onChange={(e) => setEditQuizData(p => ({ ...p, time_limit: e.target.value }))} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#667085] ml-1">Holat</label>
              <button
                onClick={() => setEditQuizData(p => ({ ...p, is_active: !p.is_active }))}
                className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-colors ${editQuizData.is_active ? 'bg-[#E8FFF0] text-[#22C55E]' : 'bg-[#FFF0F0] text-[#F04438]'}`}
              >
                {editQuizData.is_active ? 'Aktiv' : 'Nofaol'}
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              updateQuizMutation.mutate({ id: Number(selectedQuizId), data: {
                title: editQuizData.title || undefined,
                max_score: Number(editQuizData.max_score) || undefined,
                passing_score: Number(editQuizData.passing_score) || undefined,
                penalty_per_retake: Number(editQuizData.penalty_per_retake) || undefined,
                time_limit: Number(editQuizData.time_limit) || undefined,
                is_active: editQuizData.is_active,
              }}, { onSuccess: () => setShowEditQuiz(false) });
            }}
            disabled={updateQuizMutation.isPending}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-70"
          >
            {updateQuizMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      )}

      {/* Add Question Button */}
      {selectedQuizId && !showAddForm && !showEditQuiz && (
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

            {/* Media Upload */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest ml-4">Media (ixtiyoriy — rasm, audio, video)</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*,audio/*,video/*"
                  onChange={(e) => setMediaFile(e.target.files?.[0] ?? null)}
                  className="flex-1 text-sm font-medium text-[#667085] file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-bold file:text-xs file:cursor-pointer hover:file:bg-primary/20 transition-all"
                />
                {mediaFile && (
                  <button onClick={() => setMediaFile(null)} className="p-2 rounded-xl hover:bg-[#FEE4E2] text-[#F04438]">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {mediaFile && (
                <p className="text-xs font-medium text-[#98A2B3] ml-4">{mediaFile.name} ({(mediaFile.size / 1024).toFixed(0)} KB)</p>
              )}
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
