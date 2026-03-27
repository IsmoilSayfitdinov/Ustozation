import { Book, Headphones, Edit, Trash2, Clock, Users } from 'lucide-react';

interface LessonCardProps {
  title: string;
  type: 'text' | 'audio';
  duration: string;
  students: number;
  status: 'Faol' | 'Qoralama';
  onEdit?: () => void;
  onDelete?: () => void;
}

const LessonCard = ({ title, type, duration, students, status, onEdit, onDelete }: LessonCardProps) => {
  const Icon = type === 'text' ? Book : Headphones;
  const iconBg = type === 'text' ? 'bg-[#F97316]' : 'bg-[#002D5B]';

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F2F4F7] group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform duration-500`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === 'Faol' ? 'bg-[#ECFDF3] text-[#12B76A] border border-[#D1FADF]' : 'bg-[#F9FAFB] text-[#667085] border border-[#F2F4F7]'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-4 mb-8 relative z-10">
        <h4 className="text-xl font-black text-[#1D2939] line-clamp-1 group-hover:text-primary transition-colors">{title}</h4>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#98A2B3]">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#98A2B3]">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold">{students}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#F2F4F7] pt-6 relative z-10">
        <button 
          onClick={onEdit}
          className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-[#F9FAFB] transition-all text-[#667085] hover:text-primary font-black text-xs uppercase tracking-widest"
        >
          <Edit className="w-4 h-4" />
          Tahrirlash
        </button>
        <button 
          onClick={onDelete}
          className="flex items-center justify-center gap-2 py-2 rounded-xl hover:bg-[#FEF2F2] transition-all text-[#667085] hover:text-[#F04438] font-black text-xs uppercase tracking-widest"
        >
          <Trash2 className="w-4 h-4" />
          O'chirish
        </button>
      </div>

      {/* Decorative background element */}
       <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${type === 'text' ? 'bg-primary/5' : 'bg-[#002D5B]/5'} rounded-full blur-3xl z-0 group-hover:scale-150 transition-transform duration-700`} />
    </div>
  );
};

export default LessonCard;
