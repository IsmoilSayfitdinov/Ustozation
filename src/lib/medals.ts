// Medal tizimi — top 3 uchun oltin/kumush/bronza

export const MEDALS = {
  1: { emoji: '🥇', label: 'Oltin', color: '#FFD700', bg: 'bg-[#FFFBEB]', border: 'border-[#FFD700]', text: 'text-[#B8860B]' },
  2: { emoji: '🥈', label: 'Kumush', color: '#C0C0C0', bg: 'bg-[#F8F9FA]', border: 'border-[#C0C0C0]', text: 'text-[#6B7280]' },
  3: { emoji: '🥉', label: 'Bronza', color: '#CD7F32', bg: 'bg-[#FFF8F0]', border: 'border-[#CD7F32]', text: 'text-[#92400E]' },
} as const;

export type MedalRank = 1 | 2 | 3;

export const getMedal = (rank: number) => MEDALS[rank as MedalRank] || null;

// Test natijasi uchun medallar
export const getScoreMedal = (percent: number) => {
  if (percent >= 90) return { emoji: '🏆', label: 'A\'lo', color: '#FFD700', bg: 'bg-[#FFFBEB]' };
  if (percent >= 75) return { emoji: '🎖️', label: 'Yaxshi', color: '#22C55E', bg: 'bg-[#E8FFF0]' };
  if (percent >= 60) return { emoji: '✅', label: 'O\'tdi', color: '#3B82F6', bg: 'bg-[#EEF4FF]' };
  return null;
};

// Streak medallar
export const getStreakMedal = (days: number) => {
  if (days >= 30) return { emoji: '🔥', label: '30+ kun', color: '#F97316' };
  if (days >= 14) return { emoji: '⚡', label: '14+ kun', color: '#EAB308' };
  if (days >= 7) return { emoji: '💪', label: '7+ kun', color: '#22C55E' };
  return null;
};
