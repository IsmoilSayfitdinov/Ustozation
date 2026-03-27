import { Edit, Trash2, CheckCircle2, Play, Image as ImageIcon } from 'lucide-react';

interface QuestionCardProps {
  number: number;
  category: string;
  points: number;
  penalty: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const QuestionCard = ({ number, category, points, penalty, question, options, media, onEdit, onDelete }: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-[32px] border border-[#F2F4F7] overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
      {/* Media Section */}
      {media && (
        <div className="relative h-48 overflow-hidden bg-black/5">
          {media.type === 'video' ? (
            <div className="relative h-full w-full">
               <img src={media.thumbnail || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop'} alt="Video thumbnail" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
               </div>
               <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                  Video savol
               </div>
            </div>
          ) : (
            <div className="relative h-full w-full">
               <img src={media.url} alt="Question media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                  Rasmli savol
               </div>
            </div>
          )}
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              {number}
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#EEF4FF] text-[#3538CD] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#E0EAFF]">
                {category}
              </span>
              <span className="px-3 py-1 bg-[#F9FAFB] text-[#1D2939] text-[10px] font-black rounded-full border border-[#F2F4F7]">
                {points} ball
              </span>
              <span className={`px-3 py-1 text-[10px] font-black rounded-full border ${
                penalty > 0 ? 'bg-[#FEF6EE] text-[#B93815] border-[#F9DBAF]' : 'bg-[#FEF2F2] text-[#F04438] border-[#FEE4E2]'
              }`}>
                {penalty > 0 ? `-${penalty} jarima` : 'No penalty'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={onEdit} className="p-2 rounded-xl hover:bg-[#F9FAFB] text-[#98A2B3] hover:text-primary transition-all">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={onDelete} className="p-2 rounded-xl hover:bg-[#FEF2F2] text-[#98A2B3] hover:text-[#F04438] transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <h4 className="text-xl font-black text-[#1D2939] leading-tight group-hover:text-primary transition-colors">
          "{question}"
        </h4>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <div 
              key={option.id}
              className={`p-4 rounded-2xl border ${
                option.isCorrect 
                  ? 'bg-[#ECFDF3] border-[#12B76A] text-[#12B76A]' 
                  : 'bg-[#F9FAFB] border-[#F2F4F7] text-[#667085]'
              } relative flex items-center justify-between group/option`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black opacity-40">{option.id}.</span>
                <span className="text-sm font-bold">{option.text}</span>
              </div>
              {option.isCorrect && <CheckCircle2 className="w-4 h-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
