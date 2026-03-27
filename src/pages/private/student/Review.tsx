import React from 'react';
import ReviewCard from '@/components/private/student/Review/ReviewCard';
import ReviewStats from '@/components/private/student/Review/ReviewStats';
import { REVIEW_CATEGORIES, REVIEW_STATS, MASTERED_TOPICS } from '@/data/student';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const StudentReview = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-0">
        <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight'>Takrorlash</h2>
        <div className="flex items-center gap-2 bg-[#F973161A] px-4 py-2 rounded-2xl w-max">
          <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse"></span>
          <span className="text-surface-tint text-sm font-black">Bugungi reja: 12 ta mavzu</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8 md:space-y-12'
      >
        {/* Stats Section */}
        <ReviewStats stats={REVIEW_STATS} />

        {/* Review Categories Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#141F38]">Takrorlash turlari</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEW_CATEGORIES.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard 
                  icon={category.icon}
                  title={category.title}
                  subtitle={category.subtitle}
                  count={category.count}
                  iconBg={category.iconBg}
                  iconColor={category.iconColor}
                  onClick={() => console.log('Starting review for', category.title)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mastered Topics Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#141F38]">O'zlashtirilgan mavzular</h3>
            <button className="text-surface-tint text-sm font-black hover:underline flex items-center gap-1">
              Barchasini ko'rish <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {MASTERED_TOPICS.map((topic, index) => (
              <div 
                key={index}
                className="bg-white p-5 md:p-6 rounded-3xl border border-[#F2F4F7] flex flex-col md:flex-row items-start md:items-center justify-between hover:border-surface-tint transition-colors group cursor-pointer"
              >
                <div className="flex items-start md:items-center gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#F2F4F7] flex shrink-0 items-center justify-center text-[#141F38] font-black group-hover:bg-[#F973161A] group-hover:text-surface-tint transition-colors">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base md:text-lg font-bold text-[#141F38] truncate">{topic.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1">
                      <span className="text-[#667085] text-[10px] md:text-xs font-medium whitespace-nowrap">Daraja: {topic.level}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D0D5DD] shrink-0"></span>
                      <span className="text-[#667085] text-[10px] md:text-xs font-medium whitespace-nowrap">{topic.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-6 shrink-0 mt-3 md:mt-0 self-end md:self-auto">
                  <div className="flex flex-col items-end">
                    <span className="text-lg md:text-xl font-black text-[#141F38]">{topic.score}%</span>
                    <span className="text-[#667085] text-[8px] md:text-[10px] font-bold uppercase tracking-wider">O'zlashtirish</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default StudentReview;
