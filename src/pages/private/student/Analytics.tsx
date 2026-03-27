import React from 'react';
import StatCard from '@/components/private/student/Dashboard/StatCard';
import WeeklyBarChart from '@/components/private/student/Analytics/WeeklyBarChart';
import GrammarLevelList from '@/components/private/student/Analytics/GrammarLevelList';
import StreakGrid from '@/components/private/student/Analytics/StreakGrid';
import TrendLineChart from '@/components/private/student/Analytics/TrendLineChart';
import AIAnalysisCard from '@/components/private/student/Analytics/AIAnalysisCard';
import { Sparkles } from 'lucide-react';
import { DASHBOARD_STATS, AI_INSIGHTS } from '@/data/student';

const StudentAnalytics = () => {
  return (
    <>
      <h2 className='text-3xl font-black text-[#141F38] tracking-tight'>Analitika</h2>

      <div className='bg-[#F8F9FA] p-8 md:p-12 rounded-[40px] space-y-16'>
        {/* Top Stats Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38]">Yutuqlaringiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DASHBOARD_STATS.slice(0, 3).map((stat, index) => (
              <StatCard 
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                iconBg={stat.iconBg}
                iconColor={stat.iconColor}
              />
            ))}
          </div>
        </div>

        {/* Analytics Charts Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38]">Analitika</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeeklyBarChart />
            <GrammarLevelList />
            <StreakGrid />
            <TrendLineChart />
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-[#141F38] flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-surface-tint" />
            AI Tahlili
          </h3>
          <div className="space-y-4">
            {AI_INSIGHTS.map((insight, index) => (
              <AIAnalysisCard 
                key={index}
                type={insight.type}
                title={insight.title}
                description={insight.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAnalytics;
