import { useState } from 'react';
import { Flame, BookOpen, Trophy, BarChart3, Clock } from 'lucide-react';
import ProfileHeader from '@/components/private/student/Profile/ProfileHeader';
import ProfileStatCard from '@/components/private/student/Profile/ProfileStatCard';
import AchievementCard from '@/components/private/student/Profile/AchievementCard';
import EditProfileForm from '@/components/private/student/Profile/EditProfileForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useMe } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useAnalytics';
import { useStreak } from '@/hooks/useGamification';

const ACHIEVEMENTS = [
  { id: 1, title: '7 kunlik streak', description: 'Ketma-ket 7 kun mashq', icon: '🔥' },
  { id: 2, title: '100 ta so\'z', description: '100 ta yangi so\'z o\'rgandingiz', icon: '📚' },
  { id: 3, title: 'Birinchi test', description: 'Birinchi testni topshirdingiz', icon: '🏆' },
  { id: 4, title: 'Top 10', description: 'Reytingda top 10 ga kirdingiz', icon: '⭐' },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading: userLoading } = useMe();
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: streak } = useStreak();

  if (userLoading || dashLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fullName = user?.profile?.full_name || user?.username || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const avatar = firstName.charAt(0).toUpperCase() || 'U';

  const stats = [
    { label: 'Streak', value: `${streak?.current_streak ?? 0} kun`, icon: Flame },
    { label: 'Testlar', value: `${dashboard?.total_quizzes_passed ?? 0} topshirildi`, icon: BookOpen },
    { label: 'Reyting', value: dashboard?.rank ? `#${dashboard.rank}` : '—', icon: Trophy },
    { label: 'O\'rtacha ball', value: `${Math.round(dashboard?.average_score ?? 0)}%`, icon: BarChart3 },
    { label: 'Qo\'shilgan', value: user?.date_joined ? new Date(user.date_joined).getFullYear() + '-yil' : '—', icon: Clock },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-black text-[#141F38] tracking-tight">Profil</h1>
      </div>

      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            <ProfileHeader
              firstName={firstName}
              lastName={lastName}
              email={user?.telegram_username || '—'}
              level={dashboard?.course_name || 'Kurs tanlanmagan'}
              isPremium={false}
              avatar={avatar}
              onEdit={() => setIsEditing(true)}
            />

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38] ml-2">Statistika</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                  <ProfileStatCard
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38] ml-2">Yutuqlar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ACHIEVEMENTS.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.description}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <EditProfileForm
              avatar={avatar}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
