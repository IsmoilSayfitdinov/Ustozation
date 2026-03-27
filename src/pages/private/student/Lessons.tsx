import React from 'react';
import LearningPath from '@/components/private/student/LessonsMap/LearningPath';
import ModuleCard from '@/components/private/student/LessonsMap/ModuleCard';
import ExerciseGrid from '@/components/private/student/LessonsMap/ExerciseGrid';
import { MODULES, LEARNING_PATH_NODES } from '@/data/student';

const StudentLessons = () => {
  return (
    <>
      <h2 className='text-2xl md:text-3xl font-black text-[#141F38] tracking-tight mb-4 md:mb-0'>Darslar xaritasi</h2>

      <div className='bg-[#F8F9FA] p-5 md:p-8 rounded-3xl md:rounded-[40px] space-y-8 md:space-y-12'>
        {/* Roadmap Section */}
        <LearningPath nodes={LEARNING_PATH_NODES} />

        {/* Modules List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#141F38]">Modullar</h3>
          <div className="space-y-4">
            {MODULES.map((module, index) => (
              <ModuleCard 
                key={index}
                title={module.title}
                lessons={module.lessons}
                completedLessons={module.completedLessons}
                status={module.status}
                onAction={() => console.log('Taking test for', module.title)}
              />
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#141F38]">Mashqlar</h3>
          <ExerciseGrid />
        </div>
      </div>
    </>
  );
};

export default StudentLessons;
