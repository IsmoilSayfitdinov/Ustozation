import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProfileStatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

const ProfileStatCard = ({ icon: Icon, value, label }: ProfileStatCardProps) => {
  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col items-center text-center gap-2 md:gap-3 hover:shadow-lg transition-all duration-300 group">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-tint/10 flex items-center justify-center text-surface-tint group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="space-y-0.5">
        <p className="text-xl md:text-2xl font-black text-[#141F38]">{value}</p>
        <p className="text-[#98A2B3] text-sm font-bold uppercase tracking-widest text-[10px]">{label}</p>
      </div>
    </div>
  );
};

export default ProfileStatCard;
