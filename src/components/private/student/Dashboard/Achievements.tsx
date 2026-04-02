import { Trophy, Loader2 } from 'lucide-react';
import { useBadges, useMyBadges } from '@/hooks/useGamification';

const BADGE_ICONS: Record<string, string> = {
  first_quiz: '🏆',
  streak_days: '🔥',
  quizzes_passed: '📚',
  total_points: '⭐',
};

const Achievements = () => {
  const { data: allBadges, isLoading: badgesLoading } = useBadges();
  const { data: myBadges, isLoading: myLoading } = useMyBadges();

  const isLoading = badgesLoading || myLoading;
  const earnedIds = new Set((myBadges ?? []).map(b => b.badge.id));

  const badges = (allBadges ?? []).map(b => ({
    id: b.id,
    label: b.name,
    icon: b.icon || BADGE_ICONS[b.condition_type] || '🎯',
    description: b.description,
    earned: earnedIds.has(b.id),
  }));

  return (
    <div className="bg-white p-5 md:p-6 rounded-[28px] md:rounded-[32px] border border-[#F2F4F7] shadow-sm space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-sm md:text-base font-black text-[#141F38]">Yutuqlar</h3>
        </div>
        {badges.length > 0 && (
          <span className="text-xs font-bold text-[#98A2B3]">
            {badges.filter(b => b.earned).length}/{badges.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-5 h-5 text-[#98A2B3] animate-spin" />
        </div>
      ) : badges.length > 0 ? (
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              title={badge.description}
              className={`flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
                badge.earned
                  ? 'bg-[#F8F9FA] hover:shadow-md cursor-pointer hover:-translate-y-0.5'
                  : 'opacity-40 grayscale'
              }`}
            >
              <span className="text-base">{badge.icon}</span>
              <span className={`text-[11px] md:text-xs font-bold leading-none ${badge.earned ? 'text-[#141F38]' : 'text-gray-500'}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#98A2B3] text-xs font-medium text-center py-4">Yutuqlar tez kunda qo'shiladi</p>
      )}
    </div>
  );
};

export default Achievements;
