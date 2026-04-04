import React from 'react';
import { Settings, PenLine } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  isPremium: boolean;
  avatar: string;
  onEdit: () => void;
}

const ProfileHeader = ({ 
  firstName, 
  lastName, 
  email, 
  level, 
  isPremium, 
  avatar,
  onEdit 
}: ProfileHeaderProps) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border border-[#F2F4F7] shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8 group">
      {/* Avatar */}
      <div className="w-24 h-24 md:w-32 md:h-32 bg-surface-tint rounded-3xl flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-xl shadow-surface-tint/20 group-hover:scale-105 transition-transform duration-300">
        {avatar}
      </div>

      {/* Info */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-[#141F38] tracking-tight">{firstName} {lastName}</h2>
          <p className="text-[#667085] font-semibold flex items-center justify-center md:justify-start gap-2 mt-1">
            <span className="opacity-60 text-lg">✉</span> {email}
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-3">
          {isPremium && (
            <span className="px-4 py-1.5 bg-surface-tint text-white text-xs font-black rounded-full shadow-sm">
              Premium
            </span>
          )}
          <span className="px-4 py-1.5 bg-[#F2F4F7] text-[#667085] text-xs font-black rounded-full">
            {level}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
        <button 
          onClick={onEdit}
          className="bg-surface-tint text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm flex flex-1 items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-surface-tint/20"
        >
          <PenLine className="w-4 h-4" />
          <span className="whitespace-nowrap">Tahrirlash</span>
        </button>
     
      </div>
    </div>
  );
};

export default ProfileHeader;
