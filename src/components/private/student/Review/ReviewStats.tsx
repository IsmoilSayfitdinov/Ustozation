import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ReviewStatProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const ReviewStat = ({ label, value, icon: Icon, color }: ReviewStatProps) => (
  <div className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] flex items-center gap-4">
    <div 
      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}1A` }}
    >
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <p className="text-[#667085] text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-[#141F38]">{value}</p>
    </div>
  </div>
);

interface ReviewStatsProps {
  stats: ReviewStatProps[];
}

const ReviewStats = ({ stats }: ReviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <ReviewStat key={index} {...stat} />
      ))}
    </div>
  );
};

export default ReviewStats;
