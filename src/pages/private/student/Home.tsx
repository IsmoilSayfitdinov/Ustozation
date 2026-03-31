import { Flame, BookMarked, Trophy, BookOpen } from 'lucide-react';
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

  const stats = [
    {
      icon: BookOpen,
      value: String(dashboard?.total_quizzes_taken || 0),
      label: "So'zlar o'rganildi",
      iconBg: "rgba(249, 115, 22, 0.1)",
      iconColor: "#F97316",
    },
    {
      icon: Flame,
      value: `${Math.round(dashboard?.average_score ?? 0)}%`,
      label: "Grammar darajasi",
      iconBg: "#141F38",
      iconColor: "#FFFFFF",
    },
    {
      icon: BookMarked,
      value: `${dashboard?.total_points ?? 0} ball / ${Math.round(dashboard?.average_score ?? 0)}%`,
      label: "Reading",
      iconBg: "#10B9811A",
      iconColor: "#10B981",
    },
  ];

  const passRate = dashboard?.total_quizzes_taken
    ? Math.round((dashboard.total_quizzes_passed / dashboard.total_quizzes_taken) * 100)
    : 0;

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold text-[#141F38] tracking-tight mb-4 md:mb-6'>Bosh sahifa</h2>

      <div className='bg-[#F8F9FA] p-4 md:p-6 lg:p-8 rounded-[32px] md:rounded-[40px] space-y-4 md:space-y-6'>
        
        {/* Top Profile Hero */}
        <ProfileHero user={user} dashboard={dashboard || undefined} />

        {/* Middle Section: Ratings & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Rating Card */}
          <div className="lg:col-span-7 xl:col-span-8">
            <RatingCard ranking={ranking} currentUserRank={currentUserRank} />
          </div>

          {/* Actions Column */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 md:gap-6">
            <CurrentLessonCard
              title={dashboard?.course_name ?? "Present Continuous"}
              completed={dashboard?.total_quizzes_passed ?? 5}
              total={dashboard?.total_quizzes_taken || 12}
            />
            <StartTestCard />
            <OverallScoreCard score={Math.round(dashboard?.average_score ?? 89)} />
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
        <div className="w-full">
           <StreakGraph />
        </div>

        {/* Bottom Section: Progress & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ProgressCard
            level={dashboard?.rank ?? 5}
            title={dashboard?.course_name ?? "Elementary"}
            percentage={passRate || 69}
            remaining={(100 - (passRate || 69))}
          >
             <CurrentLessonCard
                title={dashboard?.course_name ?? "Present Continuous"}
                completed={dashboard?.total_quizzes_passed ?? 5}
                total={dashboard?.total_quizzes_taken || 12}
              />
          </ProgressCard>
          
          <RetryTrendChart />
        </div>

        {/* Achievements */}
        <div className="w-full">
          <Achievements />
        </div>

      </div>
    </>
  );
};

export default StudentHome;
