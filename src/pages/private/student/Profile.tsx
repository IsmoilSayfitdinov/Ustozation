import { useState } from 'react';
import { Flame, BookOpen, Trophy, BarChart3, Clock, Lock, Eye, EyeOff } from 'lucide-react';
import ProfileHeader from '@/components/private/student/Profile/ProfileHeader';
import ProfileStatCard from '@/components/private/student/Profile/ProfileStatCard';
import AchievementCard from '@/components/private/student/Profile/AchievementCard';
import EditProfileForm from '@/components/private/student/Profile/EditProfileForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useMe, useChangePassword, useUnenroll } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { LogOut as LogOutIcon } from 'lucide-react';
import { useDashboard } from '@/hooks/useAnalytics';
import { useStreak, useBadges, useMyBadges } from '@/hooks/useGamification';

const BADGE_ICONS: Record<string, string> = {
  first_quiz: '🏆',
  streak_days: '🔥',
  quizzes_passed: '📚',
  total_points: '⭐',
};

const ChangePasswordSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ old_password: '', new_password: '', new_password_confirm: '' });
  const [error, setError] = useState('');
  const changePassword = useChangePassword();

  const handleSubmit = () => {
    setError('');
    if (form.new_password.length < 8) { setError("Yangi parol kamida 8 ta belgi bo'lishi kerak"); return; }
    if (form.new_password !== form.new_password_confirm) { setError("Parollar mos kelmadi"); return; }
    changePassword.mutate(form, {
      onSuccess: () => { setShowForm(false); setForm({ old_password: '', new_password: '', new_password_confirm: '' }); },
      onError: () => setError("Joriy parol noto'g'ri yoki server xatosi"),
    });
  };

  if (!showForm) {
    return (
      <button onClick={() => setShowForm(true)} className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-[#F2F4F7] hover:border-primary/20 hover:shadow-md transition-all w-full text-left group">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
          <Lock className="w-5 h-5 text-primary group-hover:text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-[#141F38]">Parolni o'zgartirish</p>
          <p className="text-[11px] font-medium text-[#98A2B3]">Xavfsizlik uchun parolni yangilang</p>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#F2F4F7] space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-black text-[#141F38]">Parolni o'zgartirish</h4>
        <button onClick={() => { setShowForm(false); setError(''); }} className="p-2 rounded-xl hover:bg-[#F2F4F7] text-[#98A2B3]">
          <Lock className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <input type={showOld ? 'text' : 'password'} placeholder="Joriy parol" value={form.old_password} onChange={(e) => setForm(p => ({ ...p, old_password: e.target.value }))}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-primary/30 pr-12" />
          <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="relative">
          <input type={showNew ? 'text' : 'password'} placeholder="Yangi parol (kamida 8 ta belgi)" value={form.new_password} onChange={(e) => setForm(p => ({ ...p, new_password: e.target.value }))}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-primary/30 pr-12" />
          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <input type="password" placeholder="Yangi parolni tasdiqlang" value={form.new_password_confirm} onChange={(e) => setForm(p => ({ ...p, new_password_confirm: e.target.value }))}
          className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#F2F4F7] rounded-xl text-sm font-medium outline-none focus:border-primary/30" />
      </div>
      {error && <p className="text-[#F04438] text-xs font-bold">{error}</p>}
      <div className="flex gap-3">
        <button onClick={handleSubmit} disabled={changePassword.isPending || !form.old_password || !form.new_password}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm disabled:opacity-60">
          {changePassword.isPending ? 'Saqlanmoqda...' : "O'zgartirish"}
        </button>
        <button onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-[#F2F4F7] text-[#667085] rounded-xl font-bold text-sm">Bekor qilish</button>
      </div>
    </div>
  );
};

const UnenrollSection = ({ courseName }: { courseName: string }) => {
  const unenroll = useUnenroll();
  const { data: courses } = useCourses();
  const course = courses?.find(c => c.title === courseName);

  if (!course) return null;

  return (
    <button
      onClick={() => {
        if (window.confirm(`"${courseName}" kursidan chiqmoqchimisiz?`)) {
          unenroll.mutate(course.id);
        }
      }}
      disabled={unenroll.isPending}
      className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-[#FEE4E2] hover:border-[#F04438]/30 hover:shadow-md transition-all w-full text-left group"
    >
      <div className="w-10 h-10 rounded-xl bg-[#FEE4E2] flex items-center justify-center group-hover:bg-[#F04438] transition-colors">
        <LogOutIcon className="w-5 h-5 text-[#F04438] group-hover:text-white" />
      </div>
      <div>
        <p className="text-sm font-black text-[#F04438]">{unenroll.isPending ? 'Chiqilmoqda...' : 'Kursdan chiqish'}</p>
        <p className="text-[11px] font-medium text-[#98A2B3]">{courseName}</p>
      </div>
    </button>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading: userLoading } = useMe();
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: streak } = useStreak();
  const { data: allBadges } = useBadges();
  const { data: myBadges } = useMyBadges();

  const earnedIds = new Set((myBadges ?? []).map(b => b.badge.id));
  const badges = (allBadges ?? []).map(b => ({
    id: b.id,
    title: b.name,
    description: b.description,
    icon: b.icon || BADGE_ICONS[b.condition_type] || '🎯',
    earned: earnedIds.has(b.id),
  }));

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
      <div className="flex items-center justify-between mb-5">
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
              {badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {badges.map((badge) => (
                    <div key={badge.id} className={`${badge.earned ? '' : 'opacity-40 grayscale'}`}>
                      <AchievementCard
                        icon={badge.icon}
                        title={badge.title}
                        description={badge.description}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[#F2F4F7]">
                  <p className="text-[#98A2B3] font-bold text-sm">Yutuqlar tez kunda qo'shiladi</p>
                </div>
              )}
            </div>

            {/* Parol o'zgartirish va kursdan chiqish */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38] ml-2">Xavfsizlik</h3>
              <ChangePasswordSection />
              {dashboard?.course_name && <UnenrollSection courseName={dashboard.course_name} />}
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
