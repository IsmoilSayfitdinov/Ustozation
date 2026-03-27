import React, { useState } from 'react';
import { STUDENT_PROFILE, ACHIEVEMENTS } from '@/data/student';
import ProfileHeader from '@/components/private/student/Profile/ProfileHeader';
import ProfileStatCard from '@/components/private/student/Profile/ProfileStatCard';
import AchievementCard from '@/components/private/student/Profile/AchievementCard';
import EditProfileForm from '@/components/private/student/Profile/EditProfileForm';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(STUDENT_PROFILE);

  const handleSave = (values: any) => {
    setProfile(prev => ({
      ...prev,
      ...values
    }));
    setIsEditing(false);
  };

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
            {/* Header Section */}
            <ProfileHeader 
              firstName={profile.firstName}
              lastName={profile.lastName}
              email={profile.email}
              level={profile.level}
              isPremium={profile.isPremium}
              avatar={profile.avatar}
              onEdit={() => setIsEditing(true)}
            />

            {/* Statistics Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38] ml-2">Statistika</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {profile.stats.map((stat, index) => (
                  <ProfileStatCard 
                    key={index}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>

            {/* Achievements Section */}
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
              initialValues={{
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                bio: profile.bio
              }}
              avatar={profile.avatar}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
