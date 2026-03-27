import React, { useState } from 'react';
import TestHeaderCard from '@/components/private/student/Tests/TestHeaderCard';
import TestTypeCard from '@/components/private/student/Tests/TestTypeCard';
import TestHistoryItem from '@/components/private/student/Tests/TestHistoryItem';
import TestPlayer from '@/components/private/student/Tests/TestPlayer';
import { TEST_TYPES, TEST_HISTORY } from '@/data/student';
import { motion, AnimatePresence } from 'framer-motion';

const StudentTests = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight'>Testlar</h2>
      </div>

      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8 md:space-y-12'
          >
            {/* Header Featured Card */}
            <div onClick={() => setIsPlaying(true)} className="cursor-pointer transition-transform hover:scale-[1.02]">
              <TestHeaderCard />
            </div>

            {/* Test Types Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38]">Test turlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TEST_TYPES.map((test, index) => (
                  <div key={index} onClick={() => setIsPlaying(true)} className="cursor-pointer transition-transform hover:scale-[1.02]">
                    <TestTypeCard 
                      icon={test.icon}
                      title={test.title}
                      subtitle={test.subtitle}
                      count={test.count}
                      iconBg={test.iconBg}
                      iconColor={test.iconColor}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Test History Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#141F38]">Test tarixi</h3>
              <div className="space-y-4">
                {TEST_HISTORY.map((history, index) => (
                  <TestHistoryItem 
                    key={index}
                    percentage={history.percentage}
                    name={history.name}
                    date={history.date}
                    ball={history.ball}
                    score={history.score}
                    time={history.time}
                    color={history.color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <TestPlayer onClose={() => setIsPlaying(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentTests;
