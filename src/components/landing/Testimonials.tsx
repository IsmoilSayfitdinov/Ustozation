const REVIEWS = [
  {
    name: 'Jahongir Rustamov',
    initials: 'JR',
    course: 'Elementary kursi',
    stars: 5,
    text: "Platforma juda qulay ekan. Video darslarni qayta-qayta ko'rish imkoniyati bilimimni mustahkamlashga yordam berdi.",
  },
  {
    name: 'Shaxrizoda Alieva',
    initials: 'SA',
    course: 'Intermediate kursi',
    stars: 5,
    text: "Ustozation orqali 3 oyda speaking darajam juda o'sdi. Metodika haqiqatdan ham boshqalardan farq qiladi.",
  },
  {
    name: 'Malika Bekmurodova',
    initials: 'MB',
    course: 'IELTS tayyorgarlik',
    stars: 4,
    text: "IELTSga tayyorlanish uchun Ustozationni tanlaganimdan mamnunman. Ustozlarning yondashuvi juda professional.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-32" id="reviews">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-center mb-12 md:mb-20">O'quvchilarimiz ovozi</h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {REVIEWS.map((r) => (
            <div key={r.initials} className="bg-white p-5 md:p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex gap-1 mb-5 text-primary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="material-symbols-outlined text-lg" style={i <= r.stars ? { fontVariationSettings: '"FILL" 1' } : undefined}>star</span>
                ))}
              </div>
              <p className="text-on-surface-variant mb-8 text-sm md:text-base italic leading-relaxed font-medium">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{r.initials}</div>
                <div>
                  <h4 className="font-extrabold text-on-surface text-sm">{r.name}</h4>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">{r.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
