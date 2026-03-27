interface StudentProfileCardProps {
  name: string;
  username: string;
  level: number;
  streak: number;
  lastSeen: string;
  avatar: string;
}

const StudentProfileCard = ({ name, username, level, streak, lastSeen, avatar }: StudentProfileCardProps) => {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-[#F2F4F7] relative overflow-hidden group">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
      
      <div className="flex items-center gap-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-[40px] bg-primary/10 p-1 group-hover:rotate-6 transition-transform duration-500">
            <img src={avatar} alt={name} className="w-full h-full object-cover rounded-[36px] shadow-2xl shadow-primary/20" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#12B76A] border-4 border-white w-8 h-8 rounded-full shadow-lg" />
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-[#1D2939] tracking-tight group-hover:text-primary transition-colors">{name}</h2>
            <p className="text-lg font-bold text-[#667085] opacity-60 uppercase tracking-widest">{username}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-primary/20">
              Level {level}
            </span>
            <span className="bg-[#F9FAFB] border border-[#F2F4F7] text-[#1D2939] text-[11px] font-black px-4 py-1.5 rounded-full">
              {streak} Streak
            </span>
            <span className="bg-[#F9FAFB] border border-[#F2F4F7] text-[#667085] text-[11px] font-bold px-4 py-1.5 rounded-full italic">
              {lastSeen} oldin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCard;
