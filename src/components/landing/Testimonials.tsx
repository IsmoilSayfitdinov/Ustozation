import type { Review } from '@/types/api';
import { useTranslation } from 'react-i18next';

const DEFAULT_REVIEWS = [
  { full_name: 'Jahongir Rustamov', course_name: 'Elementary kursi', rating: 5, text: "Platforma juda qulay ekan. Video darslarni qayta-qayta ko'rish imkoniyati bilimimni mustahkamlashga yordam berdi." },
  { full_name: 'Shaxrizoda Alieva', course_name: 'Intermediate kursi', rating: 5, text: "Ustozation orqali 3 oyda speaking darajam juda o'sdi. Metodika haqiqatdan ham boshqalardan farq qiladi." },
  { full_name: 'Malika Bekmurodova', course_name: 'IELTS tayyorgarlik', rating: 4, text: "IELTSga tayyorlanish uchun Ustozationni tanlaganimdan mamnunman. Ustozlarning yondashuvi juda professional." },
];

interface TestimonialsProps {
  reviews?: Review[];
}

const Testimonials = ({ reviews }: TestimonialsProps) => {
  const { t } = useTranslation();
  const activeReviews = reviews?.filter(r => r.is_active);
  const items = activeReviews && activeReviews.length > 0 ? activeReviews : DEFAULT_REVIEWS;

  return (
    <section className="py-16 md:py-32 dark:bg-[#0a0a0a]" id="reviews">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-center mb-12 md:mb-20">{t('testimonials.title')}</h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {items.map((r, idx) => {
            const initials = r.full_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            return (
              <div key={idx} className="bg-white dark:bg-[#1a1a1a] p-5 md:p-8 rounded-2xl border border-outline-variant/20 dark:border-white/8 hover:border-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex gap-1 mb-5 text-primary">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="material-symbols-outlined text-lg" style={i <= r.rating ? { fontVariationSettings: '"FILL" 1' } : undefined}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant mb-8 text-sm md:text-base italic leading-relaxed font-medium">"{r.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{initials}</div>
                  <div>
                    <h4 className="font-extrabold text-on-surface text-sm">{r.full_name}</h4>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">{r.course_name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
