import React from 'react';
import StatCard from '@/components/private/student/Dashboard/StatCard';
import CurrentLessonCard from '@/components/private/student/Dashboard/CurrentLessonCard';
import StreakGraph from '@/components/private/student/Dashboard/StreakGraph';
import ProgressCard from '@/components/private/student/Dashboard/ProgressCard';
import Achievements from '@/components/private/student/Dashboard/Achievements';
import { DASHBOARD_STATS } from '@/data/student';

const StudentHome = () => {
  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold text-[#141F38] tracking-tight mb-4 md:mb-0'>Bosh sahifa</h2>

      <div className='bg-[#F8F9FA] p-4 md:p-[24px] rounded-3xl md:rounded-[28px] space-y-6 md:space-y-8'>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <StatCard 
              icon={DASHBOARD_STATS[0].icon}
              value={DASHBOARD_STATS[0].value}
              label={DASHBOARD_STATS[0].label}
              iconBg={DASHBOARD_STATS[0].iconBg}
              iconColor={DASHBOARD_STATS[0].iconColor}
            />
          </div>
          <div className="flex-1 pointer-events-none hidden lg:block">
             <CurrentLessonCard 
              title="Present Continuous"
              completed={6}
              total={12}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
           {DASHBOARD_STATS.slice(1).map((stat, index) => (
             <StatCard 
               key={index}
               icon={stat.icon}
               value={stat.value}
               label={stat.label}
               actionText={stat.actionText}
               iconBg={stat.iconBg}
               iconColor={stat.iconColor}
             />
           ))}
         </div>

        {/* Middle Row: Streak Graph */}
        <StreakGraph />

        {/* Bottom Row: Progress & Lesson */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <ProgressCard 
            level={5}
            title="Elementary"
            percentage={68}
            remaining={32}
          />
          <CurrentLessonCard 
            title="Present Continuous"
            completed={6}
            total={12}
          />
        </div>

        {/* Achievements Section */}
        <div className="w-full">
          <Achievements />
        </div>
      </div>
    </>
  );
};

export default StudentHome;
