import { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, ArrowRight, Trophy, ChevronDown, ChevronUp, AlertTriangle, BookOpen, Clock, BarChart3, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizDetail, useStartAttempt, useSubmitAttempt } from '@/hooks/useQuizzes';
import type { SubmitAnswerPayload } from '@/types/api';

interface TestPlayerProps {
  quizId: number;
  onClose: () => void;
}

const TestPlayer = ({ quizId, onClose }: TestPlayerProps) => {
  const [state, setState] = useState<'start' | 'playing' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Timers to track time spent per question
  const questionStartRef = useRef<number>(Date.now());
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});

  const { data: quiz, isLoading: quizLoading } = useQuizDetail(quizId);
  const startAttempt = useStartAttempt();
  const submitAttempt = useSubmitAttempt();

  const questions = quiz?.questions ?? [];

  // ===== Anti-cheat: tab switch detection =====
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const MAX_TAB_WARNINGS = 3;

  useEffect(() => {
    if (state !== 'playing') return;

    const handleVisibility = () => {
      if (document.hidden) {
        setTabWarnings(prev => {
          const next = prev + 1;
          setShowTabWarning(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [state]);

  // Auto-submit when max warnings reached
  useEffect(() => {
    if (tabWarnings >= MAX_TAB_WARNINGS && state === 'playing' && attemptId) {
      handleComplete();
    }
  }, [tabWarnings]);

  // ===== Anti-cheat: prevent page leave =====
  useEffect(() => {
    if (state !== 'playing') return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Test davom etmoqda. Sahifadan chiqmoqchimisiz?';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state]);

  // ===== Anti-cheat: block screenshot keys & right click =====
  useEffect(() => {
    if (state !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        setTabWarnings(prev => prev + 1);
        setShowTabWarning(true);
      }
      // Block Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Block Ctrl+Shift+S (screenshot in some browsers)
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
      }
      // Block Ctrl+P (print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
      }
      // Block F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // CSS: prevent selection & drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [state]);

  // Timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (state === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (state === 'playing' && timeLeft === 0 && questions.length > 0) {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  // Track time start for active question
  useEffect(() => {
    if (state === 'playing') {
      questionStartRef.current = Date.now();
    }
  }, [currentQuestionIndex, state]);

  const handleStart = () => {
    startAttempt.mutate(quizId, {
      onSuccess: (data) => {
        setAttemptId(data.attempt_id);
        setTimeLeft(data.time_limit ?? quiz?.time_limit ?? 900);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setQuestionTimes({});
        setState('playing');
        questionStartRef.current = Date.now();
      },
    });
  };

  const handleSelectOption = (questionId: number, answerId: number) => {
    // Record time spent on this question
    const timeSpent = (Date.now() - questionStartRef.current) / 1000;
    setQuestionTimes(prev => ({
      ...prev,
      [questionId]: (prev[questionId] || 0) + timeSpent
    }));

    setAnswers(prev => ({ ...prev, [questionId]: answerId }));

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleComplete();
      }
    }, 500); // Small delay to let user see selection
  };

  const handleComplete = useCallback(() => {
    if (!attemptId) return;

    // Record time for last question if not already set by an answer
    const currentQId = questions[currentQuestionIndex]?.id;
    if (currentQId && !answers[currentQId]) {
      const timeSpent = (Date.now() - questionStartRef.current) / 1000;
      setQuestionTimes(prev => ({
        ...prev,
        [currentQId]: (prev[currentQId] || 0) + timeSpent
      }));
    }

    const answerPayload: SubmitAnswerPayload[] = questions.map(q => ({
      question_id: q.id,
      answer_id: answers[q.id] ?? null,
    }));

    submitAttempt.mutate(
      { attemptId, answers: answerPayload },
      {
        onSuccess: () => {
          setState('results');
          setShowDetails(true);
        },
      }
    );
  }, [attemptId, answers, questions, currentQuestionIndex]);

  if (quizLoading) {
    return (
      <div className="bg-[#F8F9FA] min-h-[500px] rounded-[32px] p-10 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-surface-tint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const result = submitAttempt.data;
  const scorePercent = result ? Math.round((result.adjusted_score / result.max_possible_score) * 100) : 0;

  const correctCount = result?.answers?.filter(a => a.is_correct)?.length || 0;
  const incorrectCount = (result?.answers?.length || 0) - correctCount;

  return (
    <div className="bg-[#F8F9FA] min-h-[500px] rounded-[32px] p-5 md:p-8 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {state === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center w-full max-w-lg bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-[#F2F4F7] dark:border-white/10 shadow-lg space-y-6"
          >
            <div className="w-20 h-20 bg-surface-tint rounded-2xl mx-auto flex items-center justify-center text-4xl shadow-xl shadow-surface-tint/20">
              🧠
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-[#141F38] dark:text-white">{quiz?.title ?? 'Testni boshlash'}</h2>
              <p className="text-[#667085] font-black text-sm">
                {questions.length} ta savol · {Math.floor((quiz?.time_limit ?? 900) / 60)} daqiqa
              </p>
              {quiz?.description && (
                <p className="text-[#667085] text-sm font-semibold mx-auto p-4 bg-[#F8F9FA] dark:bg-white/5 rounded-xl">{quiz.description}</p>
              )}
            </div>

            {/* Qoidalar */}
            <div className="bg-[#FFF6ED] dark:bg-[#F97316]/10 border border-[#FDBA74]/30 dark:border-[#F97316]/20 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#F97316] shrink-0" />
                <h4 className="text-sm font-black text-[#141F38] dark:text-white">Test qoidalari</h4>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Test davomida boshqa sahifaga o'tish taqiqlanadi",
                  "Tab almashtirsangiz — ogohlantirish beriladi (3 ta imkoniyat)",
                  "3 marta ogohlantirish — test avtomatik topshiriladi",
                  "Screenshot, print va nusxa olish bloklangan",
                  "Vaqt tugasa — test avtomatik topshiriladi",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#F97316]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-black text-[#F97316]">{i + 1}</span>
                    </div>
                    <span className="text-[12px] md:text-[13px] font-semibold text-[#667085] dark:text-white/60 leading-snug">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleStart}
              disabled={startAttempt.isPending}
              className="bg-surface-tint text-white w-full py-4 rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20 disabled:opacity-70"
            >
              {startAttempt.isPending ? 'Boshlanmoqda...' : "Roziman, boshlash"}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
               onClick={onClose}
               className="text-[#98A2B3] font-bold text-sm mx-auto hover:text-[#141F38] dark:hover:text-white transition-colors"
            >
               Orqaga
            </button>
          </motion.div>
        )}

        {state === 'playing' && currentQuestion && (
          <motion.div
            key={`playing-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full space-y-6 md:space-y-8"
          >
            {/* Tab Warning Overlay */}
            <AnimatePresence>
              {showTabWarning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#141F38]/95 backdrop-blur-md z-[200] flex items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white dark:bg-[#1a1a1a] rounded-[32px] p-8 md:p-10 max-w-md w-full text-center shadow-2xl space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF0F0] flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-[#F04438]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#141F38] dark:text-white">Ogohlantirish!</h3>
                      <p className="text-sm font-medium text-[#667085] dark:text-white/60 mt-2 leading-relaxed">
                        Siz test oynasidan chiqdingiz. Bu harakatlar qayd etiladi.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {Array.from({ length: MAX_TAB_WARNINGS }).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i < tabWarnings ? 'bg-[#F04438]' : 'bg-[#F2F4F7]'}`} />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#F04438]">
                      {tabWarnings >= MAX_TAB_WARNINGS
                        ? "Limitga yetildi — test avtomatik topshirildi!"
                        : `${MAX_TAB_WARNINGS - tabWarnings} ta imkoniyat qoldi. Keyin test avtomatik topshiriladi.`}
                    </p>
                    {tabWarnings < MAX_TAB_WARNINGS && (
                      <button
                        onClick={() => setShowTabWarning(false)}
                        className="w-full py-3.5 bg-[#F04438] text-white font-black text-sm rounded-xl hover:bg-[#DC2626] transition-colors"
                      >
                        Tushundim, davom etaman
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header / Progress Card */}
            <div className="bg-white p-5 md:p-6 rounded-[24px] border border-[#F2F4F7] flex items-center justify-between shadow-sm">
              <p className="text-sm font-black text-[#667085] flex items-center gap-2">
                 Savol <span className="text-[#141F38] bg-[#F8F9FA] px-2 py-0.5 rounded-md">{currentQuestionIndex + 1}/{questions.length}</span>
              </p>
              <div className="flex items-center gap-3">
                {tabWarnings > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF0F0] border border-[#F04438]/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F04438]" />
                    <span className="text-[11px] font-black text-[#F04438]">{tabWarnings}/{MAX_TAB_WARNINGS}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-[#F8F9FA] px-3 py-1.5 rounded-lg border border-[#EAECF0]">
                  <Timer className="w-4 h-4 text-[#98A2B3]" />
                  <span className="text-[13px] font-black text-[#141F38]">
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar Line */}
            <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-surface-tint"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white p-6 md:p-10 rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-8">
              <h3 className="text-[20px] md:text-[24px] font-black text-[#141F38] leading-tight">
                {currentQuestion.text}
              </h3>

              {/* Media */}
              {currentQuestion.media?.length > 0 && (
                <div className="space-y-4">
                  {currentQuestion.media.map((m) => (
                    <div key={m.id} className="rounded-2xl overflow-hidden bg-[#141F38]">
                      {m.media_type === 'image' && (
                        <img src={m.file} alt="Question Media" className="w-full max-h-[400px] object-contain mx-auto" />
                      )}
                      {m.media_type === 'audio' && (
                        <audio controls src={m.file} className="w-full" />
                      )}
                      {/* Video mockup handling based on structure, assume 'video' exists or use standard HTML5 */}
                      {m.media_type === 'video' && (
                        <video controls src={m.file} className="w-full max-h-[400px]" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Answers Grid */}
              <div className="grid gap-3">
                {currentQuestion.answers.map((answer, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = answers[currentQuestion.id] === answer.id;
                  
                  return (
                    <button
                      key={answer.id}
                      onClick={() => handleSelectOption(currentQuestion.id, answer.id)}
                      className={`w-full p-4 md:p-5 text-left flex items-center gap-4 transition-all duration-300 rounded-[20px] outline-none group ${
                        isSelected
                          ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/20 scale-[1.01]'
                          : 'bg-[#F8F9FA] text-[#141F38] hover:bg-[#F0F2F5] hover:scale-[1.01]'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white text-[#22C55E]'
                          : 'bg-white text-[#141F38] shadow-sm group-hover:bg-[#141F38] group-hover:text-white'
                      }`}>
                        {letter}
                      </span>
                      <span className="text-[15px] font-bold">{answer.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {state === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            {/* Top Results Card */}
            <div className="bg-white p-8 md:p-10 rounded-[40px] border border-[#F2F4F7] shadow-sm text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-sm">
                {result?.is_passed ? '🎉' : '😔'}
              </div>
              <h2 className="text-2xl font-black text-[#141F38]">Natija</h2>
              <p className="text-[#667085] text-sm mt-1 mb-4 font-bold tracking-tight">
                 {result?.is_passed ? "Tabriklaymiz! Siz o'tdingiz!" : "Afsuski, yetarli ball to'play olmadingiz."}
              </p>
              
              <div className="inline-block bg-[#FFF6ED] text-surface-tint px-4 py-1.5 rounded-full text-xs font-black mb-8 border border-surface-tint/20">
                Ball: {result?.adjusted_score ?? 0}/{result?.max_possible_score ?? 0}
              </div>

              {/* Circle Graph */}
              <div className="relative w-[200px] h-[200px] mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                   <circle cx="100" cy="100" r="88" stroke="#F2F4F7" strokeWidth="24" fill="transparent" />
                   <circle 
                      cx="100" cy="100" r="88" 
                      stroke="#22C55E" strokeWidth="24" fill="transparent" 
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 88} 
                      strokeDashoffset={(2 * Math.PI * 88) * (1 - scorePercent/100)} 
                      className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                   <span className="text-5xl font-black text-[#22C55E] tracking-tighter">{scorePercent}%</span>
                   <span className="text-[11px] uppercase tracking-widest text-[#667085] font-black">{questions.length} savol</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-[13px] font-black text-[#141F38] mb-8">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#22C55E]"/> To'g'ri: {correctCount}
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#F2F4F7]"/> Noto'g'ri: {incorrectCount}
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-surface-tint hover:bg-[#EA580C] text-white w-full max-w-sm mx-auto py-4 rounded-2xl font-black text-sm flex justify-center items-center gap-2 shadow-xl shadow-surface-tint/20 transition-all active:scale-[0.98]"
              >
                <Trophy className="w-5 h-5"/>
                Yakunlash va reytingni ko'rish
              </button>
            </div>

            {/* Answer Breakdown Accordion */}
            {result?.answers && result.answers.length > 0 && (
              <div className="bg-white rounded-[32px] border border-[#F2F4F7] shadow-sm overflow-hidden">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-surface-tint" />
                    <span className="text-[15px] font-black text-[#141F38]">Har bir savol tafsiloti</span>
                  </div>
                  {showDetails ? <ChevronUp className="w-5 h-5 text-[#98A2B3]"/> : <ChevronDown className="w-5 h-5 text-[#98A2B3]"/>}
                </button>
                
                <AnimatePresence>
                  {showDetails && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 'auto' }} 
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3">
                        {result.answers.map((a, i) => {
                          const qId = questions[i]?.id;
                          const timeTaken = qId ? questionTimes[qId] : undefined;
                          const timeDisplay = timeTaken ? `${timeTaken.toFixed(1)}s` : '-';
                          
                          return (
                            <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${a.is_correct ? 'bg-[#FAFDFA] border-[#E8FFF0]' : 'bg-[#FFF0F0]/50 border-[#FFF0F0]'}`}>
                              <div className="flex items-center gap-4 flex-1">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black shrink-0 ${a.is_correct ? 'bg-[#E8FFF0] text-[#22C55E]' : 'bg-[#FFF0F0] text-[#F04438]'}`}>
                                  {i + 1}
                                </span>
                                <p className="text-[13px] font-bold text-[#141F38] line-clamp-2">{a.question_text}</p>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                 {/* Mock logic showing a slow question warning dynamically if > 15s */}
                                 {timeTaken && timeTaken > 15 && (
                                   <div className="hidden sm:flex items-center gap-2 bg-[#FFF6ED] text-surface-tint px-3 py-1 rounded-lg text-[10px] font-black">
                                     <AlertTriangle className="w-3 h-3"/> Uzoq vaqt ketdi
                                   </div>
                                 )}
                                 <span className="text-[13px] font-black text-[#98A2B3] bg-white px-3 py-1 rounded-lg border border-[#F2F4F7]">{timeDisplay}</span>
                              </div>
                            </div>
                          );
                        })}
                        {/* Static warning bar mimicking mockup */}
                        <div className="p-4 bg-[#FFF6ED] border border-[#FDBA74]/30 rounded-2xl flex items-center gap-3 mt-4">
                           <AlertTriangle className="w-5 h-5 text-surface-tint shrink-0"/>
                           <p className="text-[12px] font-bold text-[#141F38]">Ba'zi savollarda ustoz belgilagan vaqtdan (15s) oshib ketdingiz.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* AI Recommendations Area */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF6ED] text-surface-tint flex items-center justify-center">
                    <BarChart3 className="w-4 h-4"/>
                  </div>
                  <h3 className="text-lg font-black text-[#141F38]">AI Tavsiyalar</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Mocked recommendations to match Image 5 */}
                  <div className="bg-white p-5 rounded-3xl border border-[#F2F4F7] shadow-sm hover:shadow-md transition-all space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFF0F0] text-[#F04438] flex items-center justify-center">
                           <BookOpen className="w-5 h-5"/>
                        </div>
                        <h4 className="font-black text-[#141F38] text-[15px]">Present Continuous</h4>
                     </div>
                     <p className="text-[#667085] text-[12px] font-semibold leading-relaxed">
                       Siz Present Continuous mavzusida qiyinchilikka duch kelayapsiz. 2-modul 3-darsni qayta ko'rib chiqishingiz tavsiya qilinadi.
                     </p>
                     <button className="text-surface-tint font-black text-[12px] flex items-center gap-1 hover:gap-2 transition-all w-full pt-2">
                        Darsga o'tish <ArrowRight className="w-3 h-3"/>
                     </button>
                  </div>
                  
                  <div className="bg-white p-5 rounded-3xl border border-[#F2F4F7] shadow-sm hover:shadow-md transition-all space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFF6ED] text-surface-tint flex items-center justify-center">
                           <p className="font-black">A</p>
                        </div>
                        <h4 className="font-black text-[#141F38] text-[15px]">Vocabulary - Daily Life</h4>
                     </div>
                     <p className="text-[#667085] text-[12px] font-semibold leading-relaxed">
                       Kundalik hayot so'zlari bo'yicha ba'zi xatolar bor. Qo'shimcha mashq qilish tavsiya etiladi.
                     </p>
                     <button className="text-surface-tint font-black text-[12px] flex items-center gap-1 hover:gap-2 transition-all w-full pt-2">
                        Darsga o'tish <ArrowRight className="w-3 h-3"/>
                     </button>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-[#F2F4F7] shadow-sm hover:shadow-md transition-all space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#E8FFF0] text-[#22C55E] flex items-center justify-center">
                           <RotateCcw className="w-5 h-5"/>
                        </div>
                        <h4 className="font-black text-[#141F38] text-[15px]">Past Simple</h4>
                     </div>
                     <p className="text-[#667085] text-[12px] font-semibold leading-relaxed">
                       Past Simple mavzusini yaxshi o'zlashtirgansiz! Davom eting!
                     </p>
                     <button className="text-surface-tint font-black text-[12px] flex items-center gap-1 hover:gap-2 transition-all w-full pt-2">
                        Keyingi dars <ArrowRight className="w-3 h-3"/>
                     </button>
                  </div>
               </div>
            </div>
            
            <div className="pt-8 pb-12 flex justify-center">
               <button onClick={onClose} className="text-[#98A2B3] font-bold text-sm bg-white border border-[#F2F4F7] px-8 py-3 rounded-xl hover:bg-[#F8F9FA] transition-colors">
                 Orqaga qaytish
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestPlayer;
