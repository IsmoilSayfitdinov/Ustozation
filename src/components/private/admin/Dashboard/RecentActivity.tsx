const activities = [
  { id: 1, user: 'Sardor Rahimov', action: 'Present Simple testini yakunladi', time: '5 daq', progress: '95%', color: 'bg-[#F97316]' },
  { id: 2, user: 'Nodira Aliyeva', action: 'Vocabulary darsini o\'qidi', time: '12 daq', progress: null, color: 'bg-[#002D5B]' },
  { id: 3, user: 'Jasur Karimov', action: 'Past Simple testini yakunladi', time: '30 daq', progress: '68%', color: 'bg-[#F97316]' },
  { id: 4, user: 'Malika Ergasheva', action: 'Audio darsni tingladi', time: '1 soat', progress: null, color: 'bg-[#002D5B]' },
  { id: 5, user: 'Bekzod Tursunov', action: 'Grammar testini boshladi', time: '2 soat', progress: null, color: 'bg-[#12B76A]' },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] h-full">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-[#1D2939]">So'nggi faoliyat</h3>
          <p className="text-xs md:text-sm font-bold text-[#667085] mt-1 italic opacity-70">Realtime yangilanishlar</p>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#12B76A] animate-pulse" />
          <span className="text-[10px] md:text-xs font-black text-[#12B76A] uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 md:gap-5 group cursor-pointer transition-all hover:translate-x-1">
            <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-[14px] md:rounded-2xl ${activity.color} flex items-center justify-center font-black text-white text-sm md:text-base shadow-xl shadow-black/5 group-hover:scale-110 transition-transform`}>
              {activity.user.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-black text-sm md:text-base text-[#1D2939] group-hover:text-primary transition-colors truncate">{activity.user}</h4>
                {activity.progress && (
                  <span className="text-[8px] md:text-[10px] shrink-0 font-black text-[#12B76A] bg-[#ECFDF3] px-1.5 md:px-2 py-0.5 rounded-full border border-[#D1FADF]">
                    {activity.progress}
                  </span>
                )}
              </div>
              <p className="text-[10px] md:text-xs font-bold text-[#667085] mt-0.5 truncate">{activity.action}</p>
            </div>

            <div className="text-right shrink-0 ml-2">
              <p className="text-[8px] md:text-[10px] font-black text-[#98A2B3] italic uppercase tracking-wider">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
