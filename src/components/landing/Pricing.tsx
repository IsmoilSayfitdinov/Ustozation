import { useMemo } from 'react';
import type { PricingPlan } from '@/types/api';
import { useTranslation } from 'react-i18next';

interface PricingProps {
  plans?: PricingPlan[];
}

const FALLBACK_PLANS = [
  {
    id: -1, name: 'Standard', description: "Mustaqil o'rganishni sevuvchilar uchun qulay imkoniyat.",
    price: 299000, is_popular: false, is_active: true, order: 1,
    features: ['120+ Video darslar', 'Interaktiv testlar', 'PDF materiallar qo\'llanma'],
    icon: 'directions_walk',
  },
  {
    id: -2, name: 'Premium', description: "To'liq nazorat va kafolatlangan eng yuqori natija uchun.",
    price: 499000, is_popular: true, is_active: true, order: 2,
    features: ['Barcha Video kurslar + qo\'shimcha', 'Shaxsiy ustoz 24/7 nazorati', 'Speaking club (haftasiga 6 kun)', 'Rasmiy sertifikat beriladi'],
    icon: 'workspace_premium',
  },
  {
    id: -3, name: 'Intensiv', description: 'Tez va maxsus maqsadli natija istovchilar uchun (IELTS).',
    price: 799000, is_popular: false, is_active: true, order: 3,
    features: ['Premiumning barcha qulayliklari', 'Haftada 2 ta yakkama-yakka dars', 'Maxsus IELTS tayyorlov kursi'],
    icon: 'rocket_launch',
  },
];

const ICONS = ['directions_walk', 'workspace_premium', 'rocket_launch', 'school', 'star'];

function formatPrice(price: number) {
  const str = price.toLocaleString('en').replace(/,/g, ' ');
  return str;
}

const Pricing = ({ plans }: PricingProps) => {
  const { t } = useTranslation();

  const displayPlans = useMemo(() => {
    const active = plans?.filter(p => p.is_active).sort((a, b) => a.order - b.order);
    if (active && active.length > 0) {
      return active.map((p, idx) => ({ ...p, icon: ICONS[idx] || ICONS[0] }));
    }
    return FALLBACK_PLANS;
  }, [plans]);

  return (
    <section className="py-16 md:py-36 relative overflow-hidden bg-white" id="pricing">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary text-sm font-bold tracking-tight shadow-md border border-primary/10">
            <span className="material-symbols-outlined text-lg">local_fire_department</span>
            {t('pricing.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline tracking-tighter text-on-surface">
            {t('pricing.title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">{t('pricing.title_2')}</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg font-medium leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {displayPlans.map((plan) => {
            const isPopular = plan.is_popular;
            const price = formatPrice(plan.price);

            if (isPopular) {
              return (
                <div key={plan.id} className="relative md:-my-4">
                  {/* Glow */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-primary via-primary-dark to-[#f43f5e] rounded-[2.5rem] blur-2xl opacity-25 animate-pulse" />

                  <div className="relative bg-gradient-to-b from-[#1c1917] to-[#292524] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col text-white h-full overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-tertiary/15 rounded-full blur-[60px] pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 btn-shimmer text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-b-xl shadow-lg border border-t-0 border-white/20">
                      ⭐ {t('pricing.most_popular')}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white mb-6 mt-4 shadow-lg shadow-primary/30 border border-white/20">
                      <span className="material-symbols-outlined text-3xl">{plan.icon}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold font-headline mb-2">{plan.name}</h3>
                    <p className="text-white/50 mb-8 text-sm font-medium leading-relaxed">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-black tracking-tighter">{price}</span>
                      </div>
                      <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mt-2">{t('pricing.per_month')}</div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-10 flex-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-primary text-lg mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                          <span className="text-sm font-bold text-white/85">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button className="w-full py-4 rounded-xl font-extrabold font-headline btn-shimmer text-white hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer border-none text-sm tracking-wide flex items-center justify-center gap-2">
                      {t('pricing.start_now')} <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={plan.id} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/20 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 flex flex-col hover:-translate-y-1 h-full">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/8 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-2xl">{plan.icon}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 text-on-surface">{plan.name}</h3>
                <p className="text-on-surface-variant mb-8 text-sm font-medium leading-relaxed">{plan.description}</p>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-outline-variant/15">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter">{price}</span>
                  </div>
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">{t('pricing.per_month')}</div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary/70 text-lg mt-0.5">check_circle</span>
                      <span className="text-sm font-semibold text-on-surface-variant">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="w-full py-4 rounded-xl font-bold font-headline border-2 border-outline-variant/20 text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer bg-white text-sm tracking-wide">
                  {t('pricing.choose')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
