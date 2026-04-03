import { useState, useMemo } from 'react';
import { Users, BookOpen, TrendingUp, AlertTriangle, Calendar, Loader2, BarChart3, Trophy, Flame, Sparkles } from 'lucide-react';
import StatCard from '@/components/private/admin/Dashboard/StatCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useCourseStudents } from '@/hooks/useCourses';
import { useCourseStats } from '@/hooks/useAnalytics';
import { useRanking } from '@/hooks/useGamification';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AdminHome = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: courses } = useCourses();
  const { data: stats, isLoading } = useCourseStats(Number(selectedCourseId) || 0);
  const { data: ranking } = useRanking();
  const { data: students } = useCourseStudents(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const today = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short', day: 'numeric' });

  // Top 3 talabalar
  const topThree = useMemo(() => {
    if (!ranking) return [];
    return [...ranking].sort((a, b) => a.rank - b.rank).slice(0, 3);
  }, [ranking]);

  // Haftalik statistika — real data mavjud emas, umumiy statsdan ko'rsatamiz
  const summaryCards = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "O'rtacha ball", value: `${Math.round(stats.average_score)}%` },
      { label: "Muvaffaqiyat", value: `${Math.round(stats.pass_rate)}%` },
      { label: "Jami urinishlar", value: String(stats.total_attempts) },
      { label: "Qiyin mavzular", value: String(stats.hardest_lessons.length) },
    ];
  }, [stats]);

  // So'nggi talabalar (faoliyat sifatida)
  const recentStudents = useMemo(() => {
    if (!students) return [];
    return [...students]
      .sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime())
      .slice(0, 5);
  }, [students]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (active && payload?.[0]) {
      return (
        <div className="bg-[#141F38] text-white px-3 py-2 rounded-xl text-xs font-black shadow-xl">
          O'rtacha: {payload[0].value}%
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
        <div className="bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-[#F2F4F7] flex items-center gap-2 md:gap-3 shadow-sm">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
          <span className="text-xs md:text-sm font-bold text-[#667085]">
            Bugun: <span className="text-[#1D2939] font-black">{today}</span>
          </span>
        </div>
      </div>

      {/* Course Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
        <CustomSelect
          options={courseOptions}
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          placeholder="Statistika ko'rish uchun guruhni tanlang..."
        />
      </div>

      {!selectedCourseId ? (
        <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <BarChart3 className="w-14 h-14 text-[#F97316]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-4 border-white">
                <Users className="w-5 h-5 text-[#3538CD]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Statistikani ko'ring</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed">
              Guruhingiz statistikasi ko'rish uchun yuqoridan guruhni tanlang
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard label="Jami Talabalar" value={String(stats.student_count)} icon={Users} color="orange" />
            <StatCard label="Faol Darslar" value={String(stats.total_attempts)} icon={BookOpen} color="navy" />
            <StatCard label="O'rtacha Ball" value={`${Math.round(stats.average_score)}`} icon={TrendingUp} color="green" />
            <StatCard label="Qiyin Mavzular" value={String(stats.hardest_lessons.length)} icon={AlertTriangle} color={stats.hardest_lessons.length > 3 ? "red" : "orange"} />
          </div>

          {/* Middle Row: Chart + Top Students */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Mavzular bo'yicha natijalar — real data */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#1D2939]">Mavzular bo'yicha natija</h3>
                  <p className="text-xs font-medium text-[#98A2B3] mt-0.5">O'rtacha ball (eng qiyin → oson)</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#98A2B3]">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  O'rtacha ball
                </div>
              </div>
              {stats.hardest_lessons.length > 0 ? (
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.hardest_lessons.map(l => ({ name: l.quiz__lesson__title, value: Math.round(l.avg) }))} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                      <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#F2F4F7" />
                      <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#98A2B3', fontSize: 12, fontWeight: 600 }} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 11, fontWeight: 700 }} width={120} />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                        {stats.hardest_lessons.map((l, i) => (
                          <Cell key={i} fill={l.avg < 40 ? '#F04438' : l.avg < 60 ? '#F97316' : l.avg < 80 ? '#EAB308' : '#22C55E'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center">
                  <p className="text-sm font-bold text-[#98A2B3]">Hali test natijalari yo'q</p>
                </div>
              )}
            </div>

            {/* Top talabalar */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#1D2939]">Top talabalar</h3>
                  <p className="text-xs font-medium text-[#98A2B3] mt-0.5">Eng yaxshi natijalar</p>
                </div>
                <Trophy className="w-5 h-5 text-[#EAB308]" />
              </div>
              <div className="space-y-4">
                {topThree.length > 0 ? topThree.map((s, idx) => {
                  const colors = ['text-[#F97316] bg-[#FFF6ED] border-[#FDBA74]', 'text-[#98A2B3] bg-[#F9FAFB] border-[#E4E7EC]', 'text-[#CD7F32] bg-[#FFF8F0] border-[#DEB887]'];
                  return (
                    <div key={s.student_id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F9FAFB] transition-colors">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black ${colors[idx] || colors[2]}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#1D2939] truncate">{s.username}</p>
                        <p className="text-[10px] font-bold text-[#98A2B3]">Level {s.rank} · {s.streak}<Flame className="w-3 h-3 inline text-orange-400 ml-0.5" /></p>
                      </div>
                      <span className="text-sm font-black text-[#1D2939]">{s.total_points} <span className="text-[10px] text-[#98A2B3]">ball</span></span>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#98A2B3] font-medium text-center py-8">Reyting ma'lumoti yo'q</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Activity + Hardest Topics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* So'nggi faoliyat */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#1D2939]">So'nggi faoliyat</h3>
                  <p className="text-xs font-medium text-[#98A2B3] mt-0.5">Realtime yangilanishlar</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8FFF0] text-[#22C55E]">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[10px] font-black">Live</span>
                </div>
              </div>
              <div className="space-y-3">
                {recentStudents.length > 0 ? recentStudents.map((s) => {
                  const initials = (s.full_name || s.username).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                  const colors = ['bg-[#22C55E]', 'bg-[#3B82F6]', 'bg-[#F97316]', 'bg-[#8B5CF6]', 'bg-[#EC4899]'];
                  const timeAgo = Math.floor((Date.now() - new Date(s.enrolled_at).getTime()) / 86400000);
                  return (
                    <div key={s.student_id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F9FAFB] transition-colors">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black ${colors[Math.floor(Math.random() * 5)]}`}>
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1D2939] truncate">{s.full_name || s.username}</p>
                        <p className="text-[10px] font-medium text-[#98A2B3]">Kursga qo'shildi</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#98A2B3] shrink-0">{timeAgo === 0 ? 'Bugun' : `${timeAgo} kun`}</span>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-[#98A2B3] font-medium text-center py-8">Faoliyat yo'q</p>
                )}
              </div>
            </div>

            {/* Qiyin mavzular + AI tavsiya */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#1D2939]">Qiyin mavzular</h3>
                  <p className="text-xs font-medium text-[#98A2B3] mt-0.5">Eng ko'p xatoliklar</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-[#F04438]" />
              </div>

              {stats.hardest_lessons.length > 0 ? (
                <div className="space-y-5">
                  {stats.hardest_lessons.map((lesson, idx) => {
                    const color = lesson.avg < 40 ? '#F04438' : lesson.avg < 60 ? '#F97316' : '#EAB308';
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#1D2939]">{lesson.quiz__lesson__title}</span>
                            <span className="text-[10px] font-bold text-[#98A2B3] bg-[#F9FAFB] px-2 py-0.5 rounded">{stats.total_attempts} talaba</span>
                          </div>
                          <span className="text-sm font-black" style={{ color }}>{Math.round(lesson.avg)}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#F9FAFB] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${lesson.avg}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}

                  {/* AI Tavsiya */}
                  <div className="mt-6 p-4 bg-[#F9FAFB] rounded-2xl border border-[#F2F4F7] flex items-start gap-3">
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
