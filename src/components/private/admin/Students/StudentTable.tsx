import { useNavigate } from 'react-router-dom';
import { ChevronRight, Flame } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  username: string;
  level: number;
  ball: number;
  streak: number;
  average: string;
  progress: number;
  status: string;
  avatar: string;
}

const students: Student[] = [
  { id: 1, name: 'Sardor Rahimov', username: '@sardor_2024', level: 7, ball: 2850, streak: 30, average: '88%', progress: 92, status: '5 daq oldin', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Nodira Aliyeva', username: '@nodira_a', level: 6, ball: 2720, streak: 25, average: '82%', progress: 85, status: '12 daq oldin', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Jasur Karimov', username: '@jasur_pro', level: 6, ball: 2680, streak: 22, average: '79%', progress: 80, status: '30 daq oldin', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Malika Ergasheva', username: '@malika_en', level: 5, ball: 2450, streak: 18, average: '74%', progress: 68, status: '1 soat oldin', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Bekzod Tursunov', username: '@bekzod_99', level: 4, ball: 2200, streak: 15, average: '70%', progress: 55, status: '3 soat oldin', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Dilnoza Karimova', username: '@dilnoza_k', level: 4, ball: 2100, streak: 14, average: '68%', progress: 52, status: '5 soat oldin', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Otabek Saidov', username: '@otabek_s', level: 3, ball: 1800, streak: 10, average: '65%', progress: 40, status: '1 kun oldin', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Gulnora Raximova', username: '@gulnora_r', level: 3, ball: 1650, streak: 8, average: '62%', progress: 35, status: '2 soat oldin', avatar: 'https://i.pravatar.cc/150?u=8' },
];

const StudentTable = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl md:rounded-[40px] border border-[#F2F4F7] overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[800px] text-left border-collapse whitespace-nowrap">
          <thead>
          <tr className="border-b border-[#F2F4F7]">
            <th className="px-8 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Talaba ↑↓</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest text-center">Daraja ↑↓</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest text-center">Ball ↑↓</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest text-center">Streak ↑↓</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest text-center">O'rtacha ↑↓</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Progress</th>
            <th className="px-6 py-6 text-[11px] font-black text-[#98A2B3] uppercase tracking-widest">Holat</th>
            <th className="pr-8 py-6"></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr 
              key={student.id} 
              onClick={() => navigate(`/admin/students/${student.id}`)}
              className="hover:bg-[#F9FAFB] transition-all cursor-pointer group border-b border-[#F2F4F7]/50 last:border-none"
            >
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary overflow-hidden relative">
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#1D2939] group-hover:text-primary transition-colors">{student.name}</h4>
                    <p className="text-[11px] font-bold text-[#98A2B3]">{student.username}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center">
                  <span className="bg-[#EEF4FF] text-[#3538CD] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#E0EAFF]">
                    Lvl {student.level}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-center font-black text-[#1D2939] text-sm">{student.ball.toLocaleString()}</td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-1.5 font-black text-[#1D2939] text-sm">
                  {student.streak}
                  <Flame className="w-4 h-4 text-[#F04438]" fill="currentColor" />
                </div>
              </td>
              <td className="px-6 py-5 text-center font-black text-[#12B76A] text-sm">{student.average}</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-[#F2F4F7] rounded-full overflow-hidden min-w-[100px]">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        student.progress > 80 ? 'bg-[#12B76A]' : student.progress > 50 ? 'bg-primary' : 'bg-[#F04438]'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-[#98A2B3]">{student.progress}%</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
                  <span className="text-[11px] font-bold text-[#667085]">{student.status}</span>
                </div>
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
