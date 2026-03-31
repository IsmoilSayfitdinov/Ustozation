import { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, Loader2, BarChart3, PieChart } from 'lucide-react';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses } from '@/hooks/useCourses';
import { useCourseStats } from '@/hooks/useAnalytics';

const Analytics = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: courses } = useCourses();
  const { data: stats, isLoading } = useCourseStats(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Analitika</h2>

      {/* Course Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
        <CustomSelect
          options={courseOptions}
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          placeholder="Analitika uchun guruhni tanlang..."
        />
      </div>

      {!selectedCourseId ? (
        /* Empty State */
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center">
                <PieChart className="w-14 h-14 text-[#7C3AED]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center border-4 border-white">
                <BarChart3 className="w-5 h-5 text-[#12B76A]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Analitikani ko'ring</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed">
              Guruhingiz bo'yicha batafsil statistika — o'rtacha ball, muvaffaqiyat foizi va eng qiyin mavzularni ko'rish uchun guruhni tanlang
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-[#98A2B3]">Analitika yuklanmoqda...</p>
          </div>
        </div>
      ) : stats ? (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1D2939]">{stats.student_count}</h3>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Talabalar</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#002D5B] flex items-center justify-center shadow-lg shadow-[#002D5B]/20 group-hover:rotate-6 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1D2939]">{Math.round(stats.average_score)}%</h3>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">O'rtacha ball</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#002D5B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#12B76A] flex items-center justify-center shadow-lg shadow-[#12B76A]/20 group-hover:rotate-6 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1D2939]">{Math.round(stats.pass_rate)}%</h3>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Muvaffaqiyat</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#12B76A]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F2F4F7] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F04438] flex items-center justify-center shadow-lg shadow-[#F04438]/20 group-hover:rotate-6 transition-transform">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1D2939]">{stats.total_attempts}</h3>
                  <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">Jami urinishlar</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#F04438]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

          {/* Hardest Lessons */}
          {stats.hardest_lessons.length > 0 && (
            <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] space-y-6 md:space-y-10 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black text-[#1D2939] tracking-tight">Qiyinlik darajasi</h4>
                  <p className="text-xs font-bold text-[#98A2B3] mt-1">Eng past natijali mavzular</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#3538CD]" />
                </div>
              </div>

              <div className="space-y-8 pb-4">
                {stats.hardest_lessons.map((item, idx) => {
                  const avg = Math.round(item.avg);
                  const color = avg < 50 ? '#F04438' : avg < 70 ? '#F79009' : '#12B76A';
                  return (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: color, borderColor: 'white', outline: `2px solid ${color}20` }} />
                          <span className="text-sm font-black text-[#1D2939]">{item.quiz__lesson__title}</span>
                        </div>
                        <span className="text-sm font-black" style={{ color }}>{avg}%</span>
                      </div>
                      <div className="h-3 w-full bg-[#F9FAFB] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${avg}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stats.hardest_lessons.length === 0 && (
            <div className="bg-white rounded-[40px] border border-[#F2F4F7] p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-[#12B76A]" />
              </div>
              <h3 className="text-lg font-black text-[#1D2939] mb-2">Hali ma'lumot yetarli emas</h3>
              <p className="text-sm font-medium text-[#98A2B3] max-w-md mx-auto">
                Talabalar test topshirgandan so'ng qiyinlik darajasi tahlili bu yerda paydo bo'ladi
              </p>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Analytics;
