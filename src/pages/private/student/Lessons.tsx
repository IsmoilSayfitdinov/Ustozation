import { useMemo } from 'react';
import LearningPath, { PathNode } from '@/components/private/student/LessonsMap/LearningPath';
import ModuleCard from '@/components/private/student/LessonsMap/ModuleCard';
import ExerciseGrid from '@/components/private/student/LessonsMap/ExerciseGrid';
import { useDashboard } from '@/hooks/useAnalytics';
import { useCourses, useCourseLessons } from '@/hooks/useCourses';

const StudentLessons = () => {
  const { data: dashboard, isLoading: dashLoading } = useDashboard();
  const { data: courses, isLoading: coursesLoading } = useCourses();

  // Find the student's enrolled course by matching dashboard.course_name
  const enrolledCourse = useMemo(() => {
    if (!courses || !dashboard?.course_name) return null;
    return courses.find(c => c.title === dashboard.course_name) ?? null;
  }, [courses, dashboard]);

  const { data: courseLessons, isLoading: lessonsLoading } = useCourseLessons(enrolledCourse?.id ?? 0);

  const isLoading = dashLoading || coursesLoading || (enrolledCourse && lessonsLoading);

  // Group lessons by module
  const modules = useMemo(() => {
    if (!courseLessons) return [];

    const moduleMap = new Map<string, { title: string; lessons: typeof courseLessons }>();
    for (const cl of courseLessons) {
      const moduleTitle = cl.module_title || 'Umumiy';
      if (!moduleMap.has(moduleTitle)) {
        moduleMap.set(moduleTitle, { title: moduleTitle, lessons: [] });
      }
      moduleMap.get(moduleTitle)!.lessons.push(cl);
    }

    return Array.from(moduleMap.values()).map((mod, index) => {
      const completedLessons = mod.lessons.filter(l => l.is_unlocked).length;
      const totalLessons = mod.lessons.length;
      const allCompleted = completedLessons === totalLessons && totalLessons > 0;
      const hasCurrent = completedLessons > 0 && !allCompleted;

      return {
        id: index + 1,
        title: `${mod.title}`,
        lessons: totalLessons,
        completedLessons,
        status: (allCompleted ? 'completed' : hasCurrent ? 'current' : 'locked') as 'completed' | 'current' | 'locked',
      };
    });
  }, [courseLessons]);

  // Learning path nodes from ALL individual lessons
  const pathNodes = useMemo(() => {
    if (!courseLessons) return [];
    
    // Simple logic: all unlocked before the last unlocked are 'completed'. 
    // The last unlocked is 'current'. 
    // All locked are 'locked'.
    // Since we don't have explicit completed flag on lesson, this is a proxy.
    const lastUnlockedIndex = courseLessons.map(l => l.is_unlocked).lastIndexOf(true);

    return courseLessons.map((lesson, index): PathNode => {
      let status: 'completed' | 'current' | 'locked' = 'locked';
      if (lesson.is_unlocked) {
        status = index === lastUnlockedIndex ? 'current' : 'completed';
      }
      
      // In the mockup they restart numbering per row 1..18, but sequentially displaying index + 1 is better logic 
      // or we can just restart numbering if it exceeds module breaks, let's just use index + 1 for now.
      return {
        id: lesson.id,
        status: status,
        displayNumber: index + 1,
      };
    });
  }, [courseLessons]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!enrolledCourse) {
    return (
      <>
        <h2 className='text-xl md:text-2xl font-bold text-[#141F38] tracking-tight mb-4 md:mb-6'>Darslar xaritasi</h2>
        <div className='bg-[#F8F9FA] p-5 md:p-8 rounded-[32px] md:rounded-[40px]'>
          <div className="text-center py-20">
            <p className="text-[#98A2B3] font-bold text-lg">Siz hali hech qaysi kursga yozilmagansiz</p>
            <p className="text-[#98A2B3] font-medium text-sm mt-2">Kursga yozilish uchun admin bilan bog'laning</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold text-[#141F38] tracking-tight mb-4 md:mb-6'>Darslar xaritasi</h2>

      <div className='bg-[#F8F9FA] p-4 md:p-6 lg:p-8 rounded-[32px] md:rounded-[40px] space-y-8 md:space-y-10'>
        {/* Roadmap */}
        {pathNodes.length > 0 && <LearningPath nodes={pathNodes} />}

        {/* Modules List */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-black text-[#141F38]">Modullar</h3>
          {modules.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {modules.map((module) => (
                <ModuleCard
                  key={module.id}
                  title={module.title}
                  lessons={module.lessons}
                  completedLessons={module.completedLessons}
                  status={module.status}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
              <p className="text-[#98A2B3] font-bold">Darslar hali mavjud emas</p>
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className="pt-4 md:pt-6">
           <ExerciseGrid />
        </div>
      </div>
    </>
  );
};

export default StudentLessons;
