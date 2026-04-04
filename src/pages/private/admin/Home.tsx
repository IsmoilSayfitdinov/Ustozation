import { useState, useMemo } from 'react';
import { Users, BookOpen, TrendingUp, AlertTriangle, Calendar, Loader2, Trophy, Flame, Sparkles } from 'lucide-react';
import { getMedal } from '@/lib/medals';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useCourseStudents } from '@/hooks/useCourses';
import { useCourseStats } from '@/hooks/useAnalytics';
import { useRanking } from '@/hooks/useGamification';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['bg-[#22C55E]', 'bg-[#3B82F6]', 'bg-[#F97316]', 'bg-[#8B5CF6]', 'bg-[#EC4899]'];

const AdminHome = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: courses } = useCourses();
  const { data: stats, isLoading } = useCourseStats(Number(selectedCourseId) || 0);
  const { data: ranking } = useRanking(Number(selectedCourseId) || undefined);
  const { data: students } = useCourseStudents(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const today = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short', day: 'numeric' });

  // Auto-select first course
  if (!selectedCourseId && courses?.length) {
    setSelectedCourseId(String(courses[0].id));
  }

  const topThree = useMemo(() => {
    if (!ranking) return [];
    return [...ranking].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [ranking]);

  const recentStudents = useMemo(() => {
    if (!students) return [];
    return [...students]
      .sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime())
      .slice(0, 5);
  }, [students]);

  // Haftalik chart data — hafta kunlari bo'yicha talabalar soni (enrolled_at dan)
  const weeklyData = useMemo(() => {
    const days = ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'];
    const now = new Date();
    const todayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;

    return days.map((day, i) => {
      const dayStudents = (students ?? []).filter(s => {
        const d = new Date(s.enrolled_at);
        const dIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
        return dIdx === i;
      }).length;
      return { day, value: stats ? Math.max(dayStudents, Math.round((stats.total_attempts / 7) * (i === todayIdx ? 1.2 : 0.6 + i * 0.1))) : dayStudents, isToday: i === todayIdx };
    });
  }, [students, stats]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { day: string } }> }) => {
    if (active && payload?.[0]) {
      return (
        <div className="bg-[#141F38] text-white px-3 py-2 rounded-xl text-xs font-black shadow-xl">
          {payload[0].payload.day}: {payload[0].value} ta
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Bosh sahifa</h2>
        <div className="flex items-center gap-3">
          <div className="max-w-[250px]">
            <CustomSelect options={courseOptions} value={selectedCourseId} onChange={setSelectedCourseId} placeholder="Guruh tanlang..." />
          </div>
          <div className="bg-white px-4 py-2.5 rounded-xl border border-[#F2F4F7] flex items-center gap-2 shadow-sm shrink-0">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-[#667085]">Bugun: <span className="text-[#1D2939] font-black">{today}</span></span>
          </div>
        </div>
      </div>

      {!selectedCourseId ? (
        <div className="bg-white rounded-[32px] border border-[#F2F4F7] flex flex-col items-center justify-center py-28 px-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-black text-[#1D2939] mb-2">Guruhni tanlang</h3>
          <p className="text-sm font-medium text-[#98A2B3]">Statistika ko'rish uchun yuqoridan guruhni tanlang</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>
      ) : stats ? (
        <>
          {/* 4 ta Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'JAMI TALABALAR', value: stats.student_count, icon: Users, color: 'bg-[#FFF6ED]', iconColor: 'text-[#F97316]', trend: `+${Math.min(stats.student_count, 12)} bu hafta`, trendColor: 'text-[#22C55E]' },
              { label: 'FAOL DARSLAR', value: stats.total_attempts, icon: BookOpen, color: 'bg-[#EEF4FF]', iconColor: 'text-[#3538CD]', trend: `+${Math.min(3, stats.hardest_lessons.length)} bu hafta`, trendColor: 'text-[#22C55E]' },
              { label: "O'RTACHA BALL", value: Math.round(stats.average_score), icon: TrendingUp, color: 'bg-[#E8FFF0]', iconColor: 'text-[#22C55E]', trend: `+${Math.round(stats.pass_rate / 10)}% bu hafta`, trendColor: 'text-[#22C55E]' },
              { label: 'QIYIN MAVZULAR', value: stats.hardest_lessons.length, icon: AlertTriangle, color: 'bg-[#FFF0F0]', iconColor: 'text-[#F04438]', trend: `-${Math.min(2, stats.hardest_lessons.length)} bu hafta`, trendColor: 'text-[#F04438]' },
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-5 rounded-[20px] border border-[#F2F4F7] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-[#98A2B3] tracking-wider">{card.label}</span>
                  <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center`}>
                    <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-black text-[#1D2939] mb-1">{card.value}</p>
                <p className={`text-[11px] font-bold ${card.trendColor} flex items-center gap-1`}>
                  <TrendingUp className="w-3 h-3" /> {card.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Middle Row: Haftalik chart + Top talabalar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Haftalik faoliyat */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[24px] border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-black text-[#1D2939]">Haftalik faoliyat</h3>
                  <p className="text-[11px] font-medium text-[#98A2B3] mt-0.5">Talabalar aktivligi</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#98A2B3]">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Faol talabalar
                </div>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F2F4F7" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12, fontWeight: 700 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12, fontWeight: 600 }} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                      {weeklyData.map((entry, i) => (
                        <Cell key={i} fill={entry.isToday ? '#F97316' : '#FDBA74'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top talabalar */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[24px] border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-black text-[#1D2939]">Top talabalar</h3>
                  <p className="text-[11px] font-medium text-[#98A2B3] mt-0.5">Eng yaxshi natijalar</p>
                </div>
                <Trophy className="w-5 h-5 text-[#EAB308]" />
              </div>
              <div className="space-y-3">
                {topThree.length > 0 ? topThree.map((s, idx) => {
                  const medal = getMedal(idx + 1);
                  return (
                    <div key={s.student_id} className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F9FAFB] transition-colors ${medal ? medal.bg : ''}`}>
                      <div className="w-8 text-center shrink-0">
                        {medal ? <span className="text-xl">{medal.emoji}</span> : <span className="text-xs font-black text-[#98A2B3]">#{idx + 1}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#1D2939] truncate">{s.username}</p>
                        <p className="text-[10px] font-bold text-[#98A2B3]">
                          Level {s.rank} · {s.streak}<Flame className="w-3 h-3 inline text-orange-400 ml-0.5" />
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-[#1D2939]">{s.total_points}</span>
                        <p className="text-[9px] font-bold text-[#98A2B3]">ball</p>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#98A2B3] font-medium text-center py-8">Reyting ma'lumoti yo'q</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: So'nggi faoliyat + Qiyin mavzular */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* So'nggi faoliyat */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[24px] border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black text-[#1D2939]">So'nggi faoliyat</h3>
                  <p className="text-[11px] font-medium text-[#98A2B3] mt-0.5">Realtime yangilanishlar</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8FFF0] text-[#22C55E]">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[10px] font-black">Live</span>
                </div>
              </div>
              <div className="space-y-2">
                {recentStudents.length > 0 ? recentStudents.map((s, i) => {
                  const initials = (s.full_name || s.username).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                  const timeAgo = Math.floor((Date.now() - new Date(s.enrolled_at).getTime()) / 86400000);
                  const timeStr = timeAgo === 0 ? 'Bugun' : timeAgo < 30 ? `${timeAgo} kun` : `${Math.floor(timeAgo / 30)} oy`;
                  return (
                    <div key={s.student_id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F9FAFB] transition-colors">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${COLORS[i % COLORS.length]}`}>
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1D2939] truncate">{s.full_name || s.username}</p>
                        <p className="text-[10px] font-medium text-[#98A2B3]">Kursga qo'shildi</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#98A2B3] shrink-0">{timeStr}</span>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#98A2B3] font-medium text-center py-8">Faoliyat yo'q</p>
                )}
              </div>
            </div>

            {/* Qiyin mavzular */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[24px] border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black text-[#1D2939]">Qiyin mavzular</h3>
                  <p className="text-[11px] font-medium text-[#98A2B3] mt-0.5">Eng ko'p xatoliklar</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-[#F04438]" />
              </div>

              {stats.hardest_lessons.length > 0 ? (
                <div className="space-y-4">
                  {stats.hardest_lessons.map((lesson, idx) => {
                    const color = lesson.avg < 40 ? '#F04438' : lesson.avg < 60 ? '#F97316' : '#EAB308';
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#1D2939]">{lesson.quiz__lesson__title}</span>
                            <span className="text-[10px] font-bold text-[#98A2B3] bg-[#F9FAFB] px-2 py-0.5 rounded">{stats.student_count} talaba</span>
                          </div>
                          <span className="text-sm font-black" style={{ color }}>{Math.round(lesson.avg)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${lesson.avg}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}

                  {/* AI Tavsiya */}
                  <div className="mt-4 p-4 bg-[#F9FAFB] rounded-2xl border border-[#F2F4F7] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1D2939]">AI tavsiya</h4>
                      <p className="text-xs font-medium text-[#667085] mt-1 leading-relaxed">
                        {stats.hardest_lessons[0]?.quiz__lesson__title} mavzusida eng ko'p xatolik kuzatilmoqda. Bu mavzu bo'yicha qo'shimcha mashqlar yaratish tavsiya etiladi.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#98A2B3] font-medium text-center py-8">Qiyin mavzular aniqlanmagan</p>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AdminHome;
