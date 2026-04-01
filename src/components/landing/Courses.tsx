import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS, type CourseLevel } from '@/data/courses';
import { useLandingPage } from '@/hooks/useLanding';
import { useTranslation } from 'react-i18next';

interface CoursesProps {
  onSelect?: (level: CourseLevel) => void;
}

const Courses = ({ onSelect }: CoursesProps) => {
  const navigate = useNavigate();
  const { data: landing } = useLandingPage();
  const { t } = useTranslation();

  // Merge API levels with frontend presentation config
  const levels = useMemo(() => {
    if (!landing?.levels || landing.levels.length === 0) return LEVELS;

    return landing.levels
      .sort((a, b) => a.order - b.order)
      .map((apiLevel, idx) => {
        // Try to match by slug or order with fallback config
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

  const handleSelect = (l: CourseLevel) => {
    if (onSelect) {
      onSelect(l);
    } else {
      navigate(`/course/${l.id}`);
    }
  };

  return (
    <section className="py-16 md:py-36 bg-[#fafaf9] relative overflow-hidden" id="courses">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(#F97316 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16 md:mb-24 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary text-sm font-bold tracking-tight shadow-sm border border-outline-variant/20 mb-2 hover:bg-primary/5 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>route</span>
            {t('courses.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline tracking-tighter">
            {t('courses.title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">{t('courses.title_2')}</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-xl font-medium">{t('courses.subtitle')}</p>
        </div>

        {/* Roadmap Desktop View */}
        <div className="hidden lg:block relative mx-auto">
          <div className="absolute top-[85px] left-[10%] right-[10%] h-2 bg-outline-variant/30 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[200%] bg-gradient-to-r from-emerald-500 via-primary to-rose-500 rounded-full opacity-80 animate-[shimmer_4s_linear_infinite]"></div>
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-sm mix-blend-overlay"
                 style={{ animation: 'progress 5s linear infinite' }}>
              <style>{`
                @keyframes progress {
                  0% { transform: translateX(0%); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(800px); opacity: 0; }
                }
              `}</style>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {levels.map((l, idx) => (
              <div key={l.code} className="relative group flex flex-col items-center">
                <div className="relative z-10 w-6 h-6 rounded-full bg-white border-4 border-surface flex items-center justify-center mb-8 shadow-md transition-all duration-500 group-hover:scale-[1.8] group-hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${l.color} animate-pulse`}></div>
                  <div className="absolute -inset-2 rounded-full border-2 border-primary/30 opacity-0 group-hover:animate-ping"></div>
                </div>

                <div
                  onClick={() => handleSelect(l)}
                  className={`mt-2 w-full bg-white p-6 rounded-3xl transition-all duration-500 border border-outline-variant/20 hover:-translate-y-4 hover:border-transparent relative z-20 shadow-lg ${l.shadow} hover:shadow-2xl cursor-pointer group-hover:border-primary/50`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>{l.icon}</span>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <h3 className="text-xl font-extrabold font-headline text-on-surface">{l.title}</h3>
                    <span className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-br ${l.color}`}>{l.code}</span>
                  </div>

                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-6 min-h-[60px]">{l.desc}</p>

                  <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-lg w-fit text-xs font-bold text-on-surface-variant group-hover:bg-primary/5 transition-colors">
                    <span className="material-symbols-outlined text-sm">directions_run</span>
                    {l.duration}
                  </div>
                </div>

                <div className="absolute -bottom-8 right-2 text-8xl font-black text-outline-variant/10 pointer-events-none select-none transition-all duration-500 group-hover:text-primary/10 group-hover:-translate-y-4">
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex flex-col gap-5 max-w-4xl mx-auto relative pl-6 border-l-2 border-outline-variant/20 group">
          <div className="absolute top-0 -left-[1.5px] w-1 h-32 bg-linear-to-b from-primary/0 via-primary to-primary/0 animate-[progressVertical_3s_linear_infinite]">
            <style>{`
              @keyframes progressVertical {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(800px); opacity: 0; }
              }
            `}</style>
          </div>

          {levels.map((l) => (
            <div
              key={l.code}
              onClick={() => handleSelect(l)}
              className="relative bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md flex flex-col hover:-translate-y-2 transition-transform hover:shadow-xl group/card z-10 cursor-pointer"
            >
              <div className="absolute top-10 -left-[35px] w-5 h-5 rounded-full bg-white border-4 border-surface flex items-center justify-center shadow-md transition-transform duration-300 group-hover/card:scale-150 group-hover/card:shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${l.color} animate-pulse`}></div>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white shadow-md transform transition-transform group-hover/card:rotate-12`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>{l.icon}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${l.color} opacity-90 text-white text-sm font-black uppercase tracking-wider shadow-sm`}>
                  {l.code}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold font-headline mb-2">{l.title}</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium mb-5">{l.desc}</p>

              <div className="mt-auto flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-lg w-fit text-xs font-bold text-on-surface-variant group-hover/card:bg-primary/5">
                <span className="material-symbols-outlined text-sm">directions_run</span>
                Davomiyligi: {l.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
