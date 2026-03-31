import { Flame, BookMarked, Trophy, Sparkles } from 'lucide-react';
import StatCard from '@/components/private/student/Dashboard/StatCard';
import WeeklyBarChart from '@/components/private/student/Analytics/WeeklyBarChart';
import GrammarLevelList from '@/components/private/student/Analytics/GrammarLevelList';
import StreakGrid from '@/components/private/student/Analytics/StreakGrid';
import TrendLineChart from '@/components/private/student/Analytics/TrendLineChart';
import AIAnalysisCard from '@/components/private/student/Analytics/AIAnalysisCard';
import { useDashboard, useInsights } from '@/hooks/useAnalytics';
import { useStreak } from '@/hooks/useGamification';

const StudentAnalytics = () => {
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: streak, isLoading: streakLoading } = useStreak();
  const { data: insights } = useInsights();

  if (dashLoading || streakLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { icon: Flame, value: String(streak?.current_streak ?? 0), label: "kunlik streak", iconBg: "rgba(249, 115, 22, 0.1)", iconColor: "#F97316" },
    { icon: BookMarked, value: String(dashboard?.total_points ?? 0), label: "Umumiy ball", iconBg: "rgba(249, 115, 22, 0.1)", iconColor: "#F97316" },
    { icon: Trophy, value: `${Math.round(dashboard?.average_score ?? 0)}%`, label: "O'rtacha ball", iconBg: "#141F381A", iconColor: "#141F38" },
  ];

  const aiInsights = (insights ?? []).map((i) => ({
    type: (i.weak_areas.length > 0 ? 'warning' : 'success') as 'warning' | 'success',
    title: i.quiz_title,
    description: i.insight_text,
  }));

  return (
    <>
      <h2 className='text-3xl font-black text-[#141F38] tracking-tight mb-4'>Analitika</h2>

      <div className='bg-[#F8F9FA] p-4 md:p-8 rounded-[40px] space-y-16'>
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38]">Yutuqlaringiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} iconBg={stat.iconBg} iconColor={stat.iconColor} />
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38]">Analitika</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeeklyBarChart />
            <GrammarLevelList />
            <StreakGrid />
            <TrendLineChart />
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38] flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-surface-tint" />
            AI Tahlili
          </h3>
          <div className="space-y-4">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, index) => (
                <AIAnalysisCard key={index} type={insight.type} title={insight.title} description={insight.description} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
                <p className="text-[#98A2B3] font-bold">AI tahlillar hali mavjud emas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAnalytics;
