import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, CheckSquare, Zap, Flame, Loader2, UserX, Clock, Download } from 'lucide-react';
import { useStudentDetail } from '@/hooks/useAnalytics';
import { analyticsApi } from '@/api/analytics';
import { toast } from 'sonner';

const StudentDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = Number(searchParams.get('course')) || 0;
  const studentId = Number(id) || 0;

  const { data: student, isLoading } = useStudentDetail(courseId, studentId);

  const handleDownloadPdf = async () => {
    try {
      const res = await analyticsApi.getStudentPdf(courseId, studentId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `student_${studentId}_report.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("PDF yuklab olishda xatolik");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-sm font-bold text-[#98A2B3]">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!student || !courseId) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center mb-6">
          <UserX className="w-11 h-11 text-[#F04438]" />
        </div>
        <h3 className="text-2xl font-black text-[#1D2939] mb-2">Talaba topilmadi</h3>
        <p className="text-sm font-medium text-[#98A2B3] text-center max-w-md mb-8">
          Ushbu talaba haqida ma'lumot topilmadi. Talabalar ro'yxatiga qaytib qayta urinib ko'ring.
        </p>
        <button
          onClick={() => navigate('/admin/students')}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Ortga qaytish
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Umumiy ball', value: student.total_points.toLocaleString(), icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Testlar', value: String(student.total_attempts), icon: CheckSquare, color: 'text-[#002D5B]', bg: 'bg-[#002D5B]/10' },
    { label: "O'rtacha ball", value: `${Math.round(student.average_score)}%`, icon: Zap, color: 'text-[#12B76A]', bg: 'bg-[#12B76A]/10' },
    { label: 'Streak', value: `${student.current_streak} kun`, icon: Flame, color: 'text-[#F04438]', bg: 'bg-[#F04438]/10' },
  ];

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/admin/students')}>
          <div className="p-3 bg-white border border-[#F2F4F7] rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <h2 className="text-4xl font-black text-[#1D2939] tracking-tight">Talaba</h2>
        </div>
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group"
        >
          <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          PDF
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-10 rounded-[40px] border border-[#F2F4F7] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
        <div className="flex items-center gap-10">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center font-black text-[#F97316] text-3xl shrink-0 group-hover:rotate-3 transition-transform duration-500">
            {getInitials(student.username)}
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-[#1D2939] tracking-tight group-hover:text-primary transition-colors">
              {student.username}
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-primary text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-primary/20">
                {student.current_streak} Streak
              </span>
              <span className="bg-[#F9FAFB] border border-[#F2F4F7] text-[#12B76A] text-[11px] font-black px-4 py-1.5 rounded-full">
                {Math.round(student.pass_rate)}% muvaffaqiyat
              </span>
              <span className="bg-[#F9FAFB] border border-[#F2F4F7] text-[#667085] text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                O'rt. {Math.round(student.avg_time / 60)} daq
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] group hover:shadow-xl transition-all">
            <div className="flex flex-col gap-6">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-[#1D2939] tracking-tight">{stat.value}</h3>
                <p className="text-[11px] font-black text-[#98A2B3] uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      {student.recent_insights.length > 0 && (
        <div className="bg-white p-10 rounded-[40px] border border-[#F2F4F7] space-y-6">
          <h3 className="text-2xl font-black text-[#1D2939]">AI Tahlillar</h3>
          <div className="space-y-4">
            {student.recent_insights.map((insight, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#FFF8F4] to-[#FFFBF5] p-6 rounded-2xl border border-orange-100">
                <p className="text-sm font-medium text-[#1D2939] leading-relaxed">{insight.text}</p>
                <p className="text-[10px] font-bold text-[#98A2B3] mt-3">
                  {new Date(insight.date).toLocaleDateString('uz-UZ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
