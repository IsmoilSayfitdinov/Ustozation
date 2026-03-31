import { useState } from 'react';
import { FileText, Zap, Download, ChevronRight, Flame, Loader2, Users, ClipboardList } from 'lucide-react';
import CustomSelect from '@/components/ui/CustomSelect';
import { useCourses, useCourseStudents } from '@/hooks/useCourses';
import { useStudentDetail } from '@/hooks/useAnalytics';
import { analyticsApi } from '@/api/analytics';
import { toast } from 'sonner';

const StudentReportCard = ({ studentId, courseId }: { studentId: number; courseId: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: student, isLoading } = useStudentDetail(courseId, studentId);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

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

  if (isLoading || !student) {
    return (
      <div className="bg-white rounded-[32px] border border-[#F2F4F7] p-6 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-[32px] border border-[#F2F4F7] transition-all duration-500 overflow-hidden ${
      isExpanded ? 'shadow-2xl shadow-black/10' : 'hover:shadow-xl hover:shadow-black/5'
    }`}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 md:p-6 flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex shrink-0 items-center justify-center text-primary font-black text-lg shadow-lg group-hover:rotate-6 transition-transform">
            {getInitials(student.username)}
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-[#1D2939] group-hover:text-primary transition-colors">{student.username}</h4>
            <p className="text-sm font-bold text-[#98A2B3]">{student.total_points.toLocaleString()} ball</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-right hidden sm:block">
            <div className="flex items-center justify-end gap-1.5">
              <p className="text-xl font-black text-[#1D2939]">{student.current_streak}</p>
              <Flame className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">streak</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xl font-black text-[#12B76A]">{Math.round(student.average_score)}%</p>
            <p className="text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">o'rtacha</p>
          </div>
          <ChevronRight className={`w-6 h-6 text-[#98A2B3] group-hover:text-primary transition-all duration-300 ${
            isExpanded ? 'rotate-90' : ''
          }`} />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-6 pt-4 md:px-10 md:pb-10 md:pt-6 border-t border-[#F9FAFB] animate-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
            {[
              { label: 'Umumiy ball', value: student.total_points.toLocaleString() },
              { label: 'Urinishlar', value: String(student.total_attempts) },
              { label: 'Streak', value: `${student.current_streak} kun` },
              { label: "Muvaffaqiyat", value: `${Math.round(student.pass_rate)}%` },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F9FAFB] p-4 md:p-6 rounded-2xl text-center space-y-1">
                <p className="text-xl md:text-2xl font-black text-[#1D2939]">{item.value}</p>
                <p className="text-[9px] md:text-[10px] font-black text-[#98A2B3] uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>

          {student.recent_insights.length > 0 && (
            <div className="bg-[#FFF4ED] p-8 rounded-[32px] border border-primary/10 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-black text-primary uppercase tracking-widest">AI xulosasi</h5>
                  <p className="text-sm font-bold text-[#667085] leading-relaxed">
                    {student.recent_insights[0].text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleDownloadPdf}
            className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            PDF yuklab olish
          </button>
        </div>
      )}
    </div>
  );
};

const Reports = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: courses } = useCourses();
  const { data: students, isLoading } = useCourseStudents(Number(selectedCourseId) || 0);

  const courseOptions = (courses ?? []).map(c => ({ label: c.title, value: String(c.id) }));

  const handleDownloadAll = async () => {
    try {
      const res = await analyticsApi.getStudentsListPdf(Number(selectedCourseId));
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `course_${selectedCourseId}_students_report.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("PDF yuklab olishda xatolik");
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#1D2939] tracking-tight">Hisobotlar</h2>
        {selectedCourseId && students && students.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group"
          >
            <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            Hammasi PDF
          </button>
        )}
      </div>

      {/* Course Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#667085] ml-1 uppercase tracking-wider">Guruh tanlang</label>
        <CustomSelect
          options={courseOptions}
          value={selectedCourseId}
          onChange={setSelectedCourseId}
          placeholder="Hisobotlar uchun guruhni tanlang..."
        />
      </div>

      {!selectedCourseId ? (
        /* Empty State */
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-28 px-6">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <ClipboardList className="w-14 h-14 text-[#3538CD]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center border-4 border-white">
                <FileText className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#1D2939] mb-3">Hisobotlarni ko'ring</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-lg leading-relaxed">
              Har bir talaba bo'yicha batafsil statistika, AI tahlil va PDF hisobotlarni ko'rish uchun guruhni tanlang
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-bold text-[#98A2B3]">Talabalar yuklanmoqda...</p>
          </div>
        </div>
      ) : !students?.length ? (
        <div className="bg-white rounded-[40px] border border-[#F2F4F7] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F2F4F7] to-[#E4E7EC] flex items-center justify-center mb-6">
              <Users className="w-9 h-9 text-[#98A2B3]" />
            </div>
            <h3 className="text-xl font-black text-[#1D2939] mb-2">Talabalar yo'q</h3>
            <p className="text-sm font-medium text-[#98A2B3] text-center max-w-sm">
              Bu guruhda hali talabalar yo'q
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <StudentReportCard
              key={student.student_id}
              studentId={student.student_id}
              courseId={Number(selectedCourseId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
