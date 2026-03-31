import { useState, useMemo } from 'react';
import { BookOpen, Lightbulb, CheckCircle2, Lock } from 'lucide-react';
import { useDashboard } from '@/hooks/useAnalytics';
import { useCourses, useCourseLessons } from '@/hooks/useCourses';

const DynamicsLessonsTab = () => {
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const { data: dashboard } = useDashboard();
  const { data: courses } = useCourses();

  const enrolledCourse = useMemo(() => {
    if (!courses || !dashboard?.course_name) return null;
    return courses.find(c => c.title === dashboard.course_name) ?? null;
  }, [courses, dashboard]);

  const { data: courseLessons, isLoading } = useCourseLessons(enrolledCourse?.id ?? 0);

  // Split lessons into two groups by module for grammar vs topics display
  const { grammarLessons, topicLessons } = useMemo(() => {
    if (!courseLessons) return { grammarLessons: [], topicLessons: [] };

    const moduleMap = new Map<string, typeof courseLessons>();
    for (const cl of courseLessons) {
      const key = cl.module_title || 'Umumiy';
      if (!moduleMap.has(key)) moduleMap.set(key, []);
      moduleMap.get(key)!.push(cl);
    }

    const modules = Array.from(moduleMap.entries());
    const half = Math.ceil(modules.length / 2);
    const firstHalf = modules.slice(0, half).flatMap(([, lessons]) => lessons);
    const secondHalf = modules.slice(half).flatMap(([, lessons]) => lessons);

    type LessonStatus = 'completed' | 'current' | 'locked';

    const mapLesson = (cl: typeof courseLessons[0]): { id: number; title: string; lessons: number; status: LessonStatus } => ({
      id: cl.id,
      title: cl.lesson.title,
      lessons: 1,
      status: cl.is_unlocked ? 'completed' : 'locked',
    });

    // Mark the last unlocked as 'current'
    const markCurrent = (items: { id: number; title: string; lessons: number; status: LessonStatus }[]) => {
      const lastUnlockedIdx = items.map(i => i.status).lastIndexOf('completed');
      if (lastUnlockedIdx >= 0) {
        items[lastUnlockedIdx] = { ...items[lastUnlockedIdx], status: 'current' };
      }
      return items;
    };

    return {
      grammarLessons: markCurrent(firstHalf.map(mapLesson)),
      topicLessons: markCurrent(secondHalf.map(mapLesson)),
    };
  }, [courseLessons]);

  const completedGrammar = grammarLessons.filter(g => g.status === 'completed').length;
  const completedTopics = topicLessons.filter(t => t.status === 'completed').length;
  const totalCompleted = completedGrammar + completedTopics;
  const totalCurrent = grammarLessons.filter(g => g.status === 'current').length + topicLessons.filter(t => t.status === 'current').length;
  const totalLessons = (courseLessons?.length) ?? 0;

  const renderColumn = (
    title: string,
    items: typeof grammarLessons,
    completed: number,
    total: number,
    icon: React.ReactNode,
    themeColor: 'blue' | 'green'
  ) => {
    const listToRender = showOnlyCompleted ? items.filter(i => i.status === 'completed') : items;

    return (
      <div className="flex-1 min-w-[300px]">
        <div className="bg-white p-5 rounded-3xl border border-[#F2F4F7] shadow-sm mb-4 flex items-center gap-4">
          {icon}
          <div>
            <h3 className="font-black text-[#141F38] text-base">{title}</h3>
            <p className="text-[11px] font-bold text-[#98A2B3]">{completed}/{total} yakunlangan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {listToRender.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border border-[#F2F4F7] bg-white flex items-center justify-between transition-all ${
                item.status === 'locked' ? 'opacity-[0.45]' : 'hover:shadow-md'
              } ${
                item.status !== 'locked'
                  ? (themeColor === 'blue' ? 'border-b-2 border-b-blue-600 shadow-sm' : 'border-b-2 border-b-[#059669] shadow-sm')
                  : ''
              }`}
            >
              <div>
                <h4 className="font-bold text-[#141F38] text-[13px] line-clamp-1 pr-2">{item.title}</h4>
                <p className="text-[11px] text-[#98A2B3] font-bold mt-1">{item.lessons} dars</p>
              </div>
              <div className="shrink-0 flex items-center justify-center pl-2 border-l border-[#F2F4F7]/50 h-full min-h-[30px]">
                {item.status === 'completed' && <CheckCircle2 className={`w-[20px] h-[20px] ${themeColor === 'blue' ? 'text-blue-600 bg-blue-50 rounded-full fill-white' : 'text-[#059669] bg-[#E8FFF0] rounded-full fill-white'}`} />}
                {item.status === 'current' && <div className={`w-2.5 h-2.5 rounded-full ${themeColor === 'blue' ? 'bg-blue-600' : 'bg-[#059669]'}`} />}
                {item.status === 'locked' && <Lock className="w-[16px] h-[16px] text-[#98A2B3]" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-surface-tint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!courseLessons || courseLessons.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#F2F4F7]">
        <p className="text-[#98A2B3] font-bold">Darslar hali mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-[32px] border border-[#F2F4F7] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto">
          <div className="flex-col">
            <span className="text-3xl font-black text-[#141F38]">{totalCompleted}</span>
            <p className="text-[11px] font-bold text-[#98A2B3] -mt-1 uppercase tracking-widest">Yakunlangan</p>
          </div>
          <div className="flex-col">
            <span className="text-3xl font-black text-surface-tint">{totalCurrent}</span>
            <p className="text-[11px] font-bold text-[#98A2B3] -mt-1 uppercase tracking-widest">Hozirgi</p>
          </div>
          <div className="flex-col">
            <span className="text-3xl font-black text-[#141F38]">{totalLessons}</span>
            <p className="text-[11px] font-bold text-[#98A2B3] -mt-1 uppercase tracking-widest">Jami darslar</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[12px] font-bold text-[#667085]">Faqat yakunlangan ({totalCompleted})</span>
          <button
            className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${showOnlyCompleted ? 'bg-surface-tint' : 'bg-[#E4E7EC]'}`}
            onClick={() => setShowOnlyCompleted(!showOnlyCompleted)}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${showOnlyCompleted ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Main Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {renderColumn(
          'Grammatika',
          grammarLessons,
          completedGrammar,
          grammarLessons.length,
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"><BookOpen className="w-5 h-5" /></div>,
          'blue'
        )}

        {renderColumn(
          'Mavzular',
          topicLessons,
          completedTopics,
          topicLessons.length,
          <div className="w-12 h-12 rounded-2xl bg-[#E8FFF0] text-[#059669] flex items-center justify-center"><Lightbulb className="w-5 h-5" /></div>,
          'green'
        )}
      </div>
    </div>
  );
};

export default DynamicsLessonsTab;
