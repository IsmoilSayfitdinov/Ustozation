import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import type { CourseStudent } from '@/types/api';

interface StudentTableProps {
  students: CourseStudent[];
  courseId: number;
}

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

const StudentTable = ({ students = [], courseId }: StudentTableProps) => {
  const navigate = useNavigate();

  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden">
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F2F4F7] to-[#E4E7EC] flex items-center justify-center mb-6">
            <Users className="w-9 h-9 text-[#98A2B3]" />
          </div>
          <h3 className="text-xl font-black text-[#1D2939] mb-2">Hali talabalar yo'q</h3>
          <p className="text-sm font-medium text-[#98A2B3] text-center max-w-sm">
            Bu guruhga hali hech kim yozilmagan. Talabalar ro'yxatdan o'tib guruhga qo'shilganda bu yerda ko'rinadi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[600px] text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#F2F4F7]">
              <th className="px-8 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Talaba</th>
              <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Telegram</th>
              <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Qo'shilgan</th>
              <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest text-center">Holat</th>
              <th className="pr-8 py-6"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.student_id}
                onClick={() => navigate(`/admin/students/${student.student_id}?course=${courseId}`)}
                className="hover:bg-[#F9FAFB] transition-all cursor-pointer group border-b border-[#F2F4F7]/50 last:border-none"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center font-black text-[#F97316] text-sm shrink-0">
                      {getInitials(student.full_name || student.username)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#1D2939] group-hover:text-primary transition-colors">
                        {student.full_name || student.username}
                      </h4>
                      <p className="text-[11px] font-bold text-[#98A2B3]">@{student.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-[#667085]">
                    {student.telegram_username || '—'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-[#667085]">
                    {new Date(student.enrolled_at).toLocaleDateString('uz-UZ')}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    student.is_active
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${student.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    {student.is_active ? 'Faol' : 'Nofaol'}
                  </span>
                </td>
                <td className="pr-8 py-5 text-right">
                  <ChevronRight className="w-5 h-5 text-[#98A2B3] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
