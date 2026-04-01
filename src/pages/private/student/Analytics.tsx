import { Flame, BookMarked, Trophy, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import StatCard from '@/components/private/student/Dashboard/StatCard';
import WeeklyBarChart from '@/components/private/student/Analytics/WeeklyBarChart';
import GrammarLevelList from '@/components/private/student/Analytics/GrammarLevelList';
import StreakGrid from '@/components/private/student/Analytics/StreakGrid';
import TrendLineChart from '@/components/private/student/Analytics/TrendLineChart';
import AIAnalysisCard from '@/components/private/student/Analytics/AIAnalysisCard';
import { useDashboard, useInsights, useVocabulary, useGrammarMastery } from '@/hooks/useAnalytics';
import { useStreak, usePoints } from '@/hooks/useGamification';

const StudentAnalytics = () => {
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: streak, isLoading: streakLoading } = useStreak();
  const { data: insights } = useInsights();
  const { data: vocabulary } = useVocabulary();
  const { data: grammarTopics } = useGrammarMastery();
  const { data: pointsData } = usePoints();

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

        {/* Vocabulary */}
        {vocabulary && vocabulary.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#141F38] flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              Lug'at ({vocabulary.length} ta so'z)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vocabulary.slice(0, 12).map((word) => (
                <div key={word.id} className="bg-white p-4 rounded-2xl border border-[#F2F4F7] hover:border-primary/20 hover:shadow-md transition-all">
                  <p className="text-base font-black text-[#141F38]">{word.word}</p>
                  <p className="text-sm font-medium text-[#667085] mt-0.5">{word.translation}</p>
                  {word.lesson_title && (
                    <p className="text-[10px] font-bold text-[#98A2B3] mt-2 uppercase tracking-wider">{word.lesson_title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar Mastery */}
        {grammarTopics && grammarTopics.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#141F38] flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#22C55E]" />
              Grammatika darajasi
            </h3>
            <div className="bg-white p-6 rounded-3xl border border-[#F2F4F7]">
              <div className="space-y-5">
                {grammarTopics.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#141F38]">{topic.topic}</span>
                      <span className="text-sm font-black text-primary">{Math.round(topic.mastery_percentage)}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${topic.mastery_percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Points History */}
        {pointsData && pointsData.history.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#141F38]">Ball tarixi</h3>
              <span className="text-lg font-black text-primary">{pointsData.total_points} ball</span>
            </div>
            <div className="bg-white rounded-3xl border border-[#F2F4F7] divide-y divide-[#F2F4F7]">
              {pointsData.history.slice(0, 10).map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#141F38] truncate">{entry.reason}</p>
                    <p className="text-[11px] font-medium text-[#98A2B3]">{new Date(entry.created_at).toLocaleDateString('uz')}</p>
                  </div>
                  <span className={`text-sm font-black shrink-0 ml-4 ${entry.points > 0 ? 'text-[#22C55E]' : 'text-[#F04438]'}`}>
                    {entry.points > 0 ? '+' : ''}{entry.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentAnalytics;
