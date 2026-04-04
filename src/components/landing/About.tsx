import type { Feature } from '@/types/api';
import { useTranslation } from 'react-i18next';

const DEFAULT_FEATURES = [
  { icon: 'verified_user', title: 'Sertifikatlangan', desc: "Xalqaro sertifikatlarga ega va ko'p yillik tajribali mutaxassislar dars berishadi." },
  { icon: 'auto_graph', title: 'Tizimli yondashuv', desc: "Noldan yuqori darajagacha bo'lgan mukammal va sinovdan o'tgan o'quv dasturi." },
  { icon: 'rocket_launch', title: 'Tezkor natija', desc: "Intensiv metodlarimiz yordamida har bir darsdan so'ng bilimingizni his qilasiz." },
  { icon: 'devices', title: 'High-Tech', desc: "Istalgan vaqtda va istalgan qurilmada bilim olish imkonini beruvchi platforma." },
];

interface AboutProps {
  features?: Feature[];
}

const About = ({ features }: AboutProps) => {
  const { t } = useTranslation();
  const activeFeatures = features?.filter(f => f.is_active);
  const items = activeFeatures && activeFeatures.length > 0
    ? activeFeatures.map(f => ({ icon: f.icon || 'star', title: f.title, desc: f.description }))
    : DEFAULT_FEATURES;
  return (
    <section className="py-24 md:py-32 relative overflow-hidden dark:bg-[#0a0a0a]">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-[120px] glow-pulse pointer-events-none"></div>
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className=" mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight mb-6">
            {t('about.title_1')} <span className="text-primary underline decoration-primary/20 underline-offset-8">{t('about.title_2')}</span>?
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((f) => (
            <div key={f.icon} className="bg-white dark:bg-[#1a1a1a] p-7 md:p-8 rounded-3xl border border-outline-variant/30 dark:border-white/8 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">{f.icon}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold font-headline mb-3">{f.title}</h3>
              <p className="text-on-surface-variant leading-relaxed font-medium text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
