import { useState, useMemo } from 'react';
import { BookOpen, Star, Clock, BarChart3 } from 'lucide-react';
import TestHeaderCard from '@/components/private/student/Tests/TestHeaderCard';
import TestTypeCard from '@/components/private/student/Tests/TestTypeCard';
import TestHistoryItem from '@/components/private/student/Tests/TestHistoryItem';
import TestPlayer from '@/components/private/student/Tests/TestPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizTypes, useCourseQuizzes, useAttemptHistory } from '@/hooks/useQuizzes';
import { useDashboard } from '@/hooks/useAnalytics';
import { useCourses } from '@/hooks/useCourses';

const TYPE_ICONS: Record<string, { icon: typeof BookOpen; iconBg: string; iconColor: string }> = {
  grammar: { icon: BookOpen, iconBg: '#F973161A', iconColor: '#F97316' },
  vocabulary: { icon: Star, iconBg: '#F973161A', iconColor: '#F97316' },
  listening: { icon: Clock, iconBg: '#10B9811A', iconColor: '#10B981' },
  reading: { icon: BarChart3, iconBg: '#EAB3081A', iconColor: '#EAB308' },
};
const DEFAULT_ICON = { icon: BookOpen, iconBg: '#F973161A', iconColor: '#F97316' };

// Wrapper: quiz + uning attempt tarixi
function QuizHistoryRow({ quiz, onSelect }: { quiz: any; onSelect: () => void }) {
  const { data: attempts } = useAttemptHistory(quiz.id);

  const lastAttempt = attempts?.[0];
  const perc = lastAttempt ? Math.round((lastAttempt.adjusted_score / lastAttempt.max_possible_score) * 100) : 0;
  const attemptData = (attempts ?? []).map(a => ({
    date: new Date(a.submitted_at).toLocaleDateString('uz'),
    percentage: Math.round((a.adjusted_score / a.max_possible_score) * 100),
  }));

  return (
    <div onClick={onSelect} className="cursor-pointer">
      <TestHistoryItem
        percentage={lastAttempt ? perc : 0}
        name={quiz.title}
        date={quiz.quiz_type.name}
        ball={lastAttempt?.adjusted_score ?? quiz.passing_score}
        score={lastAttempt ? `${lastAttempt.adjusted_score}/${lastAttempt.max_possible_score}` : `0/${quiz.max_score}`}
        time={lastAttempt ? `${Math.floor(lastAttempt.time_spent / 60)}:${String(lastAttempt.time_spent % 60).padStart(2, '0')}` : `${Math.floor(quiz.time_limit / 60)} daq`}
        attempts={attemptData}
      />
    </div>
  );
}

const StudentTests = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<{ id: number } | null>(null);

  const { data: dashboard } = useDashboard();
  const { data: courses } = useCourses();
  const { data: quizTypes, isLoading: typesLoading } = useQuizTypes();

  const enrolledCourse = useMemo(() => {
    if (!courses || !dashboard?.course_name) return null;
    return courses.find(c => c.title === dashboard.course_name) ?? null;
  }, [courses, dashboard]);

  const { data: courseQuizzes, isLoading: quizzesLoading } = useCourseQuizzes(enrolledCourse?.id ?? 0);

  const isLoading = typesLoading || quizzesLoading;

  // Group quizzes by type with counts
  const quizzesByType = useMemo(() => {
    if (!quizTypes || !courseQuizzes) return [];
    return quizTypes.map(qt => {
      const quizzes = courseQuizzes.filter(q => q.quiz_type.id === qt.id);
      const iconData = TYPE_ICONS[qt.slug] || DEFAULT_ICON;
      return {
        id: qt.id,
        name: qt.name,
        description: qt.description,
        count: quizzes.length,
        passedCount: 0, // API doesn't provide per-type pass count directly
        failedCount: 0,
        ...iconData,
        quizzes,
      };
    }).filter(qt => qt.count > 0);
  }, [quizTypes, courseQuizzes]);

  const allQuizzes = useMemo(() => courseQuizzes ?? [], [courseQuizzes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-surface-tint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight'>Testlar</h2>
      </div>

      <AnimatePresence mode="wait">
        {!selectedQuiz ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8 md:space-y-12'
          >
            {/* Header Featured Card */}
            {allQuizzes.length > 0 && (
              <div onClick={() => setSelectedQuiz(allQuizzes[0])} className="cursor-pointer transition-transform hover:scale-[1.02]">
                <TestHeaderCard />
              </div>
            )}

            {/* Quiz Types Section */}
            {quizzesByType.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#141F38]">Test turlari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quizzesByType.map((qt) => (
                    <TestTypeCard
                      key={qt.id}
                      icon={qt.icon}
                      title={qt.name}
                      subtitle={qt.description}
                      count={qt.count}
                      passedCount={qt.passedCount}
                      failedCount={qt.failedCount}
                      iconBg={qt.iconBg}
                      iconColor={qt.iconColor}
                      onClick={() => {
                        if (qt.quizzes.length > 0) setSelectedQuiz(qt.quizzes[0]);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Available Quizzes / Test History */}
            {allQuizzes.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#141F38]">Test tarixi</h3>
                <div className="space-y-4">
                  {allQuizzes.map((quiz) => (
                    <QuizHistoryRow key={quiz.id} quiz={quiz} onSelect={() => setSelectedQuiz(quiz)} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-[#F2F4F7]">
                <p className="text-[#98A2B3] font-bold">Hozircha testlar mavjud emas</p>
              </div>
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
              quizId={selectedQuiz.id}
              onClose={() => setSelectedQuiz(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentTests;
