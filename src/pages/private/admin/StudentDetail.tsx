import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, TrendingUp, CheckSquare, Zap, Flame } from 'lucide-react';
import StudentProfileCard from '@/components/private/admin/Students/StudentProfileCard';

const skills = [
  { name: 'Vocabulary', progress: 78, color: 'bg-primary' },
  { name: 'Grammar', progress: 65, color: 'bg-[#002D5B]' },
  { name: 'Listening', progress: 82, color: 'bg-[#12B76A]' },
  { name: 'Reading', progress: 71, color: 'bg-[#F04438]' },
];

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, you'd fetch this using the id
  const student = {
    id: 1,
    name: 'Sardor Rahimov',
    username: '@sardor_2024',
    level: 7,
    streak: 30,
    lastSeen: '5 daq',
    avatar: 'https://i.pravatar.cc/150?u=1',
    stats: [
      { label: 'Umumiy ball', value: '2850', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
      { label: 'Testlar', value: '45', icon: CheckSquare, color: 'text-[#002D5B]', bg: 'bg-[#002D5B]/10' },
      { label: 'O\'rtacha ball', value: '88%', icon: Zap, color: 'text-[#12B76A]', bg: 'bg-[#12B76A]/10' },
      { label: 'Streak', value: '30 kun', icon: Flame, color: 'text-[#F04438]', bg: 'bg-[#F04438]/10' },
    ]
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/admin/students')}>
           <div className="p-3 bg-white border border-[#F2F4F7] rounded-2xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
             <ArrowLeft className="w-5 h-5" />
           </div>
           <h2 className="text-4xl font-black text-[#1D2939] tracking-tight">Talabalar</h2>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group">
          <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          Export
        </button>
      </div>

      <StudentProfileCard 
        name={student.name}
        username={student.username}
        level={student.level}
        streak={student.streak}
        lastSeen={student.lastSeen}
        avatar={student.avatar}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {student.stats.map((stat, idx) => (
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

      {/* Skills Progress */}
      <div className="bg-white p-10 rounded-[40px] border border-[#F2F4F7] space-y-10">
        <h3 className="text-2xl font-black text-[#1D2939]">Ko'nikmalar progressi</h3>
        
        <div className="space-y-10">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-4">
               <div className="flex justify-between items-center px-2">
                  <span className="font-black text-[#1D2939] text-sm">{skill.name}</span>
                  <span className="font-black text-[#1D2939] text-sm">{skill.progress}%</span>
               </div>
               <div className="h-2.5 w-full bg-[#F2F4F7] rounded-full overflow-hidden group">
                  <div 
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                    style={{ width: `${skill.progress}%` }}
                  />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
