import React from 'react';

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
}

const AchievementCard = ({ icon, title, description }: AchievementCardProps) => {
  return (
    <div className="bg-white p-5 md:p-8 rounded-3xl md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col items-center text-center gap-2 md:gap-4 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      <div className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-500 drop-shadow-md">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-black text-[#141F38]">{title}</h4>
        <p className="text-[#667085] text-xs font-semibold leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;
