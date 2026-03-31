import { useState } from 'react';
import { Users, BookOpen, TrendingUp, AlertTriangle, Calendar, Loader2, BarChart3 } from 'lucide-react';
import StatCard from '@/components/private/admin/Dashboard/StatCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses } from '@/hooks/useCourses';
import { useCourseStats } from '@/hooks/useAnalytics';

const AdminHome = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: courses } = useCourses();
  const { data: stats, isLoading } = useCourseStats(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));
  const today = new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      {/* Header with date */}
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
        /* Empty State */
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
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
              Guruhingiz statistikasi — talabalar soni, o'rtacha ball, muvaffaqiyat foizi va eng qiyin mavzularni ko'rish uchun yuqoridan guruhni tanlang
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-[#98A2B3]">Statistika yuklanmoqda...</p>
          </div>
        </div>
      ) : stats ? (
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <StatCard
              label="Jami Talabalar"
              value={String(stats.student_count)}
              icon={Users}
              color="orange"
            />
            <StatCard
              label="O'rtacha Ball"
              value={`${Math.round(stats.average_score)}%`}
              icon={TrendingUp}
              color="green"
            />
            <StatCard
              label="Jami Urinishlar"
              value={String(stats.total_attempts)}
              icon={BookOpen}
              color="navy"
            />
            <StatCard
              label="Muvaffaqiyat"
              value={`${Math.round(stats.pass_rate)}%`}
              icon={AlertTriangle}
              color={stats.pass_rate >= 70 ? "green" : "red"}
            />
          </div>

          {/* Hardest Lessons */}
          {stats.hardest_lessons.length > 0 && (
            <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] space-y-6">
              <div>
                <h4 className="text-2xl font-black text-[#1D2939] tracking-tight">Eng qiyin mavzular</h4>
                <p className="text-xs font-bold text-[#98A2B3] mt-1">O'rtacha ball eng past bo'lgan darslar</p>
              </div>
              <div className="space-y-6">
                {stats.hardest_lessons.map((lesson, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-sm font-black text-[#1D2939]">{lesson.quiz__lesson__title}</span>
                      <span className="text-sm font-black text-[#F04438]">{Math.round(lesson.avg)}%</span>
                    </div>
                    <div className="h-3 w-full bg-[#F9FAFB] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out bg-[#F04438]"
                        style={{ width: `${lesson.avg}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default AdminHome;
