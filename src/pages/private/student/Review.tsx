import { useState } from 'react';
import { BookOpen, BarChart2 } from 'lucide-react';
import DynamicsLessonsTab from '@/components/private/student/Review/DynamicsLessonsTab';
import DynamicsStatsTab from '@/components/private/student/Review/DynamicsStatsTab';
import { motion, AnimatePresence } from 'framer-motion';

const StudentReview = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'stats'>('lessons');

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight'>Mavzular dinamikasi</h2>
      </div>

      <div className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8 md:space-y-10 min-h-[70vh]'>
        
        {/* Tab Navigation */}
        <div className="inline-flex items-center p-1.5 bg-white border border-[#F2F4F7] rounded-[20px] shadow-sm">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[16px] text-[13px] font-black transition-all ${
              activeTab === 'lessons'
                ? 'bg-surface-tint text-white shadow-lg shadow-surface-tint/20'
                : 'text-[#98A2B3] hover:text-[#141F38] hover:bg-[#F8F9FA]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Darslar
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[16px] text-[13px] font-black transition-all ${
              activeTab === 'stats'
                ? 'bg-surface-tint text-white shadow-lg shadow-surface-tint/20'
                : 'text-[#98A2B3] hover:text-[#141F38] hover:bg-[#F8F9FA]'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Statistika
          </button>
        </div>

        {/* Tab Area Content Swapping */}
        <AnimatePresence mode="wait">
          {activeTab === 'lessons' ? (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DynamicsLessonsTab />
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DynamicsStatsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default StudentReview;
