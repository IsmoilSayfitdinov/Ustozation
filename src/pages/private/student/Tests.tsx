import { useState, useMemo } from 'react';
import { Play, Lock, Clock, HelpCircle, Trophy } from 'lucide-react';
import TestPlayer from '@/components/private/student/Tests/TestPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/hooks/useAnalytics';
import { useCourses, useCourseLessons } from '@/hooks/useCourses';

const StudentTests = () => {
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const { data: dashboard } = useDashboard();
  const { data: courses } = useCourses();

  const enrolledCourse = useMemo(() => {
    if (!courses || !dashboard?.course_name) return null;
    return courses.find(c => c.title === dashboard.course_name) ?? null;
  }, [courses, dashboard]);

  const { data: courseLessons, isLoading } = useCourseLessons(enrolledCourse?.id ?? 0);

  const modules = useMemo(() => {
    if (!courseLessons) return [];
    const map = new Map<string, typeof courseLessons>();
    for (const cl of courseLessons) {
      const key = cl.module_title || 'Umumiy';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(cl);
    }
    return Array.from(map.entries()).map(([title, lessons]) => ({
      title,
      lessons,
      quizCount: lessons.reduce((sum, l) => sum + (l.quizzes?.length ?? 0), 0),
      unlockedCount: lessons.filter(l => l.is_unlocked).length,
    }));
  }, [courseLessons]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-surface-tint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight mb-4 md:mb-6'>Testlar</h2>

      <AnimatePresence mode="wait">
        {!selectedQuizId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8'
          >
            {!enrolledCourse ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-[#F2F4F7]">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-[#D0D5DD]" />
                </div>
                <p className="text-[#98A2B3] font-bold text-lg">Siz hali kursga yozilmagansiz</p>
                <p className="text-[#D0D5DD] font-medium text-sm mt-2">Kursga yoziling va testlarni ishlang</p>
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-[#F2F4F7]">
                <p className="text-[#98A2B3] font-bold">Hozircha testlar mavjud emas</p>
              </div>
            ) : (
              modules.map((mod) => (
                <div key={mod.title} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#141F38]">{mod.title}</h3>
                    <span className="text-xs font-bold text-[#98A2B3]">
                      {mod.quizCount} test · {mod.unlockedCount}/{mod.lessons.length} ochiq
                    </span>
                  </div>

                  <div className="space-y-3">
                    {mod.lessons.map((cl) => {
                      const quizzes = cl.quizzes ?? [];
                      const hasQuiz = quizzes.length > 0;

                      return (
                        <div key={cl.id} className="space-y-2">
                          <div className={`bg-white p-4 rounded-2xl border border-[#F2F4F7] flex items-center gap-4 ${
                            !cl.is_unlocked ? 'opacity-50' : ''
                          }`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              cl.is_unlocked ? 'bg-primary/10 text-primary' : 'bg-[#F2F4F7] text-[#98A2B3]'
                            }`}>
                              {cl.is_unlocked ? <Play className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-[#141F38]">{cl.lesson.title}</p>
                              <p className="text-[11px] text-[#98A2B3] font-medium">
                                {hasQuiz ? `${quizzes.length} ta test` : "Test yo'q"}
                                {!cl.is_unlocked && ' · Qulflangan'}
                              </p>
                            </div>
                          </div>

                          {cl.is_unlocked && hasQuiz && (
                            <div className="pl-6 md:pl-14 space-y-2">
                              {quizzes.map((quiz) => (
                                <div
                                  key={quiz.id}
                                  onClick={() => setSelectedQuizId(quiz.id)}
                                  className="bg-white p-4 rounded-xl border border-[#F2F4F7] flex items-center justify-between hover:shadow-md hover:border-primary/20 cursor-pointer transition-all group"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                      <Trophy className="w-4 h-4 text-primary group-hover:text-white" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-bold text-[#141F38] truncate">{quiz.title}</p>
                                      <div className="flex items-center gap-3 text-[10px] font-medium text-[#98A2B3] mt-0.5">
                                        <span>{quiz.quiz_type_name}</span>
                                        <span>·</span>
                                        <span>{quiz.question_count} savol</span>
                                        <span>·</span>
                                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{Math.floor(quiz.time_limit / 60)} daq</span>
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    Boshlash →
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <TestPlayer
              quizId={selectedQuizId}
              onClose={() => setSelectedQuizId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentTests;
