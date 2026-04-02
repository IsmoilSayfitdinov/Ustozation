import { Flame, BookOpen, Trophy, TrendingUp, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '@/components/private/student/Dashboard/StatCard';
import CurrentLessonCard from '@/components/private/student/Dashboard/CurrentLessonCard';
import StreakGraph from '@/components/private/student/Dashboard/StreakGraph';
import ProgressCard from '@/components/private/student/Dashboard/ProgressCard';
import Achievements from '@/components/private/student/Dashboard/Achievements';
import ProfileHero from '@/components/private/student/Dashboard/ProfileHero';
import RatingCard from '@/components/private/student/Dashboard/RatingCard';
import RetryTrendChart from '@/components/private/student/Dashboard/RetryTrendChart';
import { StartTestCard, OverallScoreCard } from '@/components/private/student/Dashboard/ActionCards';

import { useDashboard } from '@/hooks/useAnalytics';
import { useStreak, useRanking } from '@/hooks/useGamification';
import { useAuthStore } from '@/store/useAuthStore';

const StudentHome = () => {
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: streak, isLoading: streakLoading } = useStreak();
  const { data: ranking, isLoading: rankingLoading } = useRanking();
  const { user } = useAuthStore();

  const isLoading = dashLoading || streakLoading || rankingLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentUserRank = ranking?.find(r => r.student_id === user?.id)?.rank || null;
  const isNewUser = !dashboard?.total_quizzes_taken && !dashboard?.total_points;

  const passRate = dashboard?.total_quizzes_taken
    ? Math.round((dashboard.total_quizzes_passed / dashboard.total_quizzes_taken) * 100)
    : 0;

  const stats = [
    {
      icon: BookOpen,
      value: `${dashboard?.total_quizzes_passed ?? 0}/${dashboard?.total_quizzes_taken ?? 0}`,
      label: "Testlar topshirildi",
      iconBg: "rgba(249, 115, 22, 0.1)",
      iconColor: "#F97316",
    },
    {
      icon: TrendingUp,
      value: `${Math.round(dashboard?.average_score ?? 0)}%`,
      label: "O'rtacha ball",
      iconBg: "#141F381A",
      iconColor: "#141F38",
    },
    {
      icon: Trophy,
      value: `${dashboard?.total_points ?? 0}`,
      label: "Umumiy ball",
      iconBg: "#10B9811A",
      iconColor: "#10B981",
    },
  ];

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold text-[#141F38] tracking-tight mb-4 md:mb-6'>Bosh sahifa</h2>

      <div className='bg-[#F8F9FA] p-4 md:p-6 lg:p-8 rounded-[32px] md:rounded-[40px] space-y-4 md:space-y-6'>

        {/* Top Profile Hero */}
        <ProfileHero user={user} dashboard={dashboard || undefined} />

        {/* Welcome Banner for new users */}
        {isNewUser && (
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[#EA580C] to-orange-500 rounded-[24px] md:rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-orange-500/20 border border-white/10 group">
            
            {/* Dekorativ orqa fon elementlari (Yorug'lik effektlari) */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              
              {/* Ikonka (Glassmorphism effekti bilan) */}
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-12">
                <Rocket className="w-10 h-10 text-white drop-shadow-md" />
              </div>

              {/* Matn qismi */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight text-white drop-shadow-sm">
                  Xush kelibsiz! 🎉
                </h3>
                <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                  Birinchi testingizni topshiring va o'z darajangizni aniqlang. Har bir test — yangi bilim va imkoniyat demakdir!
                </p>
              </div>

              {/* Harakatga chorlovchi tugma (CTA) */}
              <Link 
                to="/student/tests" 
                className="group/btn flex items-center gap-2 bg-white text-[#EA580C] px-8 py-4 rounded-2xl font-bold text-base hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 active:translate-y-0 active:scale-95 shrink-0"
              >
                <span className='text-black dark:text-white'>Testni boshlash</span>
                {/* Silliq suriladigan strelka ikonka */}
                <svg 
                  className="w-5 h-5 dark:text-white text-black transition-transform duration-300 group-hover/btn:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
            </div>
          </div>
        )}

        {/* Middle Section: Ratings & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <RatingCard ranking={ranking} currentUserRank={currentUserRank} />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 md:gap-6">
            <CurrentLessonCard
              title={dashboard?.course_name || "Kurs tanlanmagan"}
              completed={dashboard?.total_quizzes_passed ?? 0}
              total={dashboard?.total_quizzes_taken || 1}
            />
            <StartTestCard />
            <OverallScoreCard score={Math.round(dashboard?.average_score ?? 0)} />
          </div>
        </div>

        {/* Stats Row */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              iconBg={stat.iconBg}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Streak Graph */}
        <StreakGraph />

        {/* Bottom Section: Progress & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ProgressCard
            level={dashboard?.rank ?? 0}
            title={dashboard?.course_name || "—"}
            percentage={passRate}
            remaining={100 - passRate}
          />
          <RetryTrendChart />
        </div>

        {/* Achievements */}
        <Achievements />
      </div>
    </>
  );
};

export default StudentHome;
