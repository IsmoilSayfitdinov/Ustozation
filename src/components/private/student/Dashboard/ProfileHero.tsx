import { Flame } from 'lucide-react';
import type { User } from '@/types/api';
import type { StudentDashboard } from '@/types/api';
import { getMedal, getStreakMedal } from '@/lib/medals';

interface ProfileHeroProps {
  user: User | null;
  dashboard: StudentDashboard | undefined;
}

const ProfileHero = ({ user, dashboard }: ProfileHeroProps) => {
  const avatarText = user?.profile?.full_name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'U';
  
  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <div className="relative">
          <div className="w-16 h-16 md:w-[88px] md:h-[88px] bg-primary rounded-[20px] md:rounded-[28px] flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-lg shadow-primary/20">
            {avatarText}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
            <div className="bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-white text-xs">⭐</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-black text-[#141F38] mb-1">{user?.profile?.full_name || user?.username || 'Foydalanuvchi'}</h2>
          <div className="flex items-center gap-2 mb-2">
            {(() => {
              const medal = dashboard?.rank ? getMedal(dashboard.rank) : null;
              const streakM = getStreakMedal(dashboard?.current_streak || 0);
              return (
                <>
                  <span className="px-2 py-0.5 rounded text-[10px] md:text-xs font-bold bg-[#3B82F6] text-white tracking-wide">
                    {medal ? `${medal.emoji} ${medal.label}` : `Top ${dashboard?.rank || '?'}`}
                  </span>
                  {streakM && (
                    <span className="px-2 py-0.5 rounded text-[10px] md:text-xs font-bold" style={{ backgroundColor: `${streakM.color}15`, color: streakM.color }}>
                      {streakM.emoji} {streakM.label}
                    </span>
                  )}
                </>
              );
            })()}
            <span className="text-xs md:text-sm font-semibold text-[#8C94A3]">
              Level {dashboard?.course_name ? dashboard.course_name : 'N/A'}
            </span>
          </div>
          <p className="text-[#8C94A3] text-xs md:text-sm italic">
            "{dashboard?.current_streak || 0} kunlik streak ajoyib! Davom et!"
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto flex justify-end">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-gradient-to-br from-[#FF8433] to-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 mb-2">
            <Flame className="w-7 h-7 md:w-9 md:h-9 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black text-[#141F38] leading-none mb-0.5">{dashboard?.current_streak || 0}</span>
          <span className="text-[10px] md:text-xs font-semibold text-[#8C94A3]">kunlik streak</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
