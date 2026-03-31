import { useMemo } from 'react';
import { BookOpen, CheckSquare, TrendingUp, Target, Clock, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/hooks/useAnalytics';
import { useGrammarMastery } from '@/hooks/useAnalytics';
import { usePoints } from '@/hooks/useGamification';
import { useCourses, useCourseLessons } from '@/hooks/useCourses';

const DAY_NAMES = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Juma', 'Shan'];

const DynamicsStatsTab = () => {
  const { data: dashboard } = useDashboard();
  const { data: grammarTopics } = useGrammarMastery();
  const { data: pointsData } = usePoints();
  const { data: courses } = useCourses();

  const enrolledCourse = useMemo(() => {
    if (!courses || !dashboard?.course_name) return null;
    return courses.find(c => c.title === dashboard.course_name) ?? null;
  }, [courses, dashboard]);

  const { data: courseLessons } = useCourseLessons(enrolledCourse?.id ?? 0);

  const totalLessons = courseLessons?.length ?? 0;
  const completedLessons = courseLessons?.filter(l => l.is_unlocked).length ?? 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const grammarCount = grammarTopics?.length ?? 0;
  const grammarAvg = grammarTopics && grammarCount > 0
    ? Math.round(grammarTopics.reduce((s, t) => s + t.mastery_percentage, 0) / grammarCount)
    : 0;

  // Weekly activity from points history
  const weeklyActivity = useMemo(() => {
    const now = new Date();
    const dayMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dayMap[DAY_NAMES[d.getDay()]] = 0;
    }

    if (pointsData?.history) {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      for (const entry of pointsData.history) {
        const date = new Date(entry.created_at);
        if (date >= weekAgo && entry.points > 0) {
          const name = DAY_NAMES[date.getDay()];
          if (name in dayMap) dayMap[name] += entry.points;
        }
      }
    }

    return Object.entries(dayMap).map(([day, value]) => ({ day, value }));
  }, [pointsData]);

  const maxActivity = Math.max(...weeklyActivity.map(d => d.value), 1);

  const stats = [
    { icon: BookOpen, value: String(totalLessons), label: 'Jami darslar', color: '#F97316' },
    { icon: CheckSquare, value: String(completedLessons), label: 'Yakunlangan', color: '#10B981' },
    { icon: TrendingUp, value: `${progressPercent}%`, label: 'Umumiy progress', color: '#F97316' },
    { icon: Target, value: `${dashboard?.total_quizzes_passed ?? 0}`, label: 'Testlar topshirildi', color: '#F97316' },
    { icon: Clock, value: `${Math.round(dashboard?.average_score ?? 0)}%`, label: "O'rtacha ball", color: '#667085' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 rounded-3xl border border-[#F2F4F7] shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow"
            >
              <Icon className="w-5 h-5 mb-1" style={{ color: stat.color }} />
              <h3 className="text-2xl font-black text-[#141F38]">{stat.value}</h3>
              <p className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-widest leading-tight">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bars Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-surface-tint" />
            <h4 className="font-black text-[#141F38] text-lg">Grammatika</h4>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-[#667085]">{grammarCount} mavzu</span>
            <span className="text-[13px] font-black text-[#141F38]">{grammarAvg}%</span>
          </div>
          <div className="h-3 w-full bg-[#FFF6ED] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-surface-tint rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${grammarAvg}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-5 h-5 text-[#10B981]" />
            <h4 className="font-black text-[#141F38] text-lg">Darslar</h4>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-[#667085]">{completedLessons}/{totalLessons}</span>
            <span className="text-[13px] font-black text-[#141F38]">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-[#E8FFF0] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#10B981] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-8 rounded-[40px] border border-[#F2F4F7] shadow-sm"
      >
        <h4 className="font-black text-[#141F38] tracking-tight mb-8">Haftalik faollik</h4>

        <div className="flex items-end justify-between h-48 md:h-56 px-2 lg:px-12 gap-2">
          {weeklyActivity.map((day, i) => {
            const heightPercent = maxActivity > 0 ? (day.value / maxActivity) * 100 : 0;
            return (
              <div key={i} className="flex flex-col items-center gap-3 w-full group">
                <div className="w-full flex justify-center bg-transparent h-full items-end pb-2 relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 transition-opacity bg-[#141F38] text-white text-[10px] font-black py-1 px-2 rounded-lg pointer-events-none">
                    {day.value} ball
                  </div>
                  <motion.div
                    className="w-10 md:w-14 bg-surface-tint rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    style={{ minHeight: day.value > 0 ? '24px' : '0px' }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider">{day.day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicsStatsTab;
