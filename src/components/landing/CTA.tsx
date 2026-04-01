import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="w-full cta-gradient rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 lg:p-24 relative overflow-hidden text-center">
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-primary/25 rounded-full blur-[80px] glow-pulse pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-primary/25 rounded-full blur-[80px] float-orb pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 space-y-8 md:space-y-10">
          <h2 className="text-[2rem] sm:text-3xl md:text-5xl lg:text-7xl font-black font-headline text-white leading-[1.1] tracking-tighter max-w-4xl mx-auto">
            {t('cta.title')}
          </h2>
          <p className="text-white/50 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-5 pt-4">
            <button className="btn-shimmer text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black font-headline text-base md:text-lg hover:shadow-2xl hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-none w-full sm:w-auto">
              {t('cta.join')}
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black font-headline text-base md:text-lg hover:bg-white/20 transition-all cursor-pointer w-full sm:w-auto">
              {t('cta.consult')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
