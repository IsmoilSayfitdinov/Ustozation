import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, Timer, CheckCircle2, XCircle } from 'lucide-react';
import { TEST_QUESTIONS } from '@/data/student';
import { motion, AnimatePresence } from 'framer-motion';

interface TestPlayerProps {
  onClose: () => void;
}

const TestPlayer = ({ onClose }: TestPlayerProps) => {
  const [state, setState] = useState<'start' | 'playing' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer: any;
    if (state === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const handleStart = () => {
    setState('playing');
    setTimeLeft(60);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionId });
    
    // Auto-advance after small delay
    setTimeout(() => {
      if (currentQuestionIndex < TEST_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleComplete();
      }
    }, 400);
  };

  const handleComplete = () => {
    let correct = 0;
    TEST_QUESTIONS.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setState('results');
  };

  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / TEST_QUESTIONS.length) * 100;

  return (
    <div className="bg-[#F8F9FA] min-h-[500px] rounded-[32px] p-6 md:p-10 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {state === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-surface-tint rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-xl shadow-surface-tint/20">
              🧠
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#141F38]">Testni boshlash</h2>
              <p className="text-[#667085] font-semibold">{TEST_QUESTIONS.length} ta savol · 60 soniya</p>
            </div>
            <button 
              onClick={handleStart}
              className="bg-surface-tint text-white px-10 py-4 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20"
            >
              Boshlash <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {state === 'playing' && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-3xl space-y-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-[#98A2B3] uppercase tracking-widest">
                Savol {currentQuestionIndex + 1}/{TEST_QUESTIONS.length}
              </p>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#F2F4F7] shadow-sm">
                <Timer className="w-5 h-5 text-surface-tint" />
                <span className="text-sm font-black text-[#141F38]">{timeLeft}s</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-surface-tint"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white p-10 md:p-14 rounded-[40px] border border-[#F2F4F7] shadow-sm space-y-10">
              <h3 className="text-2xl font-black text-[#141F38] leading-tight">
                {currentQuestion.question}
              </h3>

              <div className="grid gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-6 lg:p-7 rounded-3xl border text-left flex items-center gap-6 transition-all group ${
                      answers[currentQuestionIndex] === option.id
                        ? 'bg-surface-tint border-surface-tint text-white shadow-lg shadow-surface-tint/20'
                        : 'bg-[#F9FAFB] border-[#F2F4F7] hover:bg-white hover:border-surface-tint/50 text-[#667085] hover:text-[#141F38]'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      answers[currentQuestionIndex] === option.id
                        ? 'bg-white text-surface-tint'
                        : 'bg-white text-[#98A2B3] group-hover:text-surface-tint'
                    }`}>
                      {option.id}
                    </span>
                    <span className="text-lg font-bold">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {state === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-10"
          >
            <div className="w-24 h-24 bg-surface-tint/10 rounded-3xl mx-auto flex items-center justify-center text-5xl">
              🎉
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-[#141F38]">Natija</h2>
              <div className="space-y-1">
                <p className="text-6xl font-black text-surface-tint">{score}/{TEST_QUESTIONS.length}</p>
                <p className="text-[#98A2B3] font-bold text-lg">{(score / TEST_QUESTIONS.length) * 100}% to'g'ri</p>
              </div>
            </div>

            <div className="h-3 w-64 bg-[#F2F4F7] rounded-full mx-auto overflow-hidden">
               <motion.div 
                className={`h-full ${score >= 3 ? 'bg-green-500' : 'bg-red-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(score / TEST_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <div className="flex items-center gap-4 justify-center">
              <button 
                onClick={handleStart}
                className="bg-surface-tint text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20"
              >
                <RotateCcw className="w-5 h-5" />
                Qayta urinish
              </button>
              <button 
                onClick={onClose}
                className="bg-[#F2F4F7] text-[#141F38] px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-[#EAECF0] transition-all"
              >
                Yopish
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestPlayer;
