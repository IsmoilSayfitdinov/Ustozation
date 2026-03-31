import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { type CourseLevel, LEVELS } from '@/data/courses';
import { ArrowLeft, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { useLandingPage } from '@/hooks/useLanding';

interface CourseDetailProps {
  course: CourseLevel;
  onBack: () => void;
  onSelectCourse: (course: CourseLevel) => void;
}

const CourseDetail = ({ course, onBack, onSelectCourse }: CourseDetailProps) => {
  const { data: landing } = useLandingPage();

  // Merge API levels with presentation config
  const allLevels = useMemo(() => {
    if (!landing?.levels || landing.levels.length === 0) return LEVELS;
    return landing.levels
      .sort((a, b) => a.order - b.order)
      .map((apiLevel, idx) => {
        const config = LEVELS.find(l => l.id === apiLevel.slug) || LEVELS[idx] || LEVELS[0];
        return {
          ...config,
          id: apiLevel.slug || config.id,
          code: apiLevel.name,
          title: apiLevel.name,
          desc: apiLevel.description || config.desc,
        };
      });
  }, [landing]);

  // Find the current course from merged data (may have updated desc from API)
  const currentCourse = allLevels.find(l => l.id === course.id) || course;
  const otherCourses = allLevels.filter(l => l.code !== currentCourse.code);
  const courseIndex = allLevels.findIndex(l => l.id === currentCourse.id);

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 pb-20">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-headline font-bold text-sm uppercase tracking-wider">Barcha kurslar</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCourse.color} flex items-center justify-center text-white shadow-lg text-3xl font-black`}>
                {courseIndex >= 0 ? courseIndex + 1 : 1}
              </div>

              <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
                {currentCourse.title}
              </h1>

              <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl">
                {currentCourse.fullDesc || currentCourse.desc}
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tighter">Davomiyligi</p>
                    <p className="text-lg font-black text-on-surface">{currentCourse.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-tighter">Darslar soni</p>
                    <p className="text-lg font-black text-on-surface">{currentCourse.numberOfLessons || '24 ta dars'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button className="btn-shimmer text-white px-8 py-4 rounded-2xl font-headline font-black text-sm uppercase tracking-wider shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer border-none">
                  Kursga yozilish
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white border border-outline-variant/30 text-on-surface font-headline font-black text-sm uppercase tracking-wider hover:bg-surface-container transition-all cursor-pointer">
                  Bepul sinov darsi
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Topics Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl shadow-black/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎓</span>
                <h3 className="text-2xl font-black font-headline text-on-surface">Kurs mavzulari</h3>
              </div>
              <ul className="space-y-4">
                {currentCourse.topics?.map((topic, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentCourse.color} flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-110 transition-transform`}>
                      {i + 1}
                    </div>
                    <span className="text-on-surface font-bold">{topic}</span>
                  </li>
                )) || <p className="text-on-surface-variant">Mavzular tez kunda qo'shiladi...</p>}
              </ul>
            </motion.div>

            {/* Outcomes Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl shadow-black/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎯</span>
                <h3 className="text-2xl font-black font-headline text-on-surface">Kurs yakunida siz</h3>
              </div>
              <ul className="space-y-4">
                {currentCourse.outcomes?.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-on-surface-variant font-medium leading-snug">{outcome}</span>
                  </li>
                )) || <p className="text-on-surface-variant">Natijalar tez kunda qo'shiladi...</p>}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Other Courses Section */}
        <div className="mt-32 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter text-on-surface mb-4">
              Boshqa kurslar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCourses.slice(0, 4).map((l) => {
              const idx = allLevels.findIndex(al => al.id === l.id);
              return (
                <motion.div
                  key={l.code}
                  whileHover={{ y: -8 }}
                  onClick={() => onSelectCourse(l)}
                  className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white text-xl font-black mb-4 group-hover:rotate-6 transition-transform`}>
                    {idx >= 0 ? idx + 1 : 1}
                  </div>
                  <h4 className="text-xl font-black font-headline mb-2">{l.title}</h4>
                  <p className="text-sm text-on-surface-variant font-medium line-clamp-2">{l.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
