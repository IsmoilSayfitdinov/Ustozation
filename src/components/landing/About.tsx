const FEATURES = [
  {
    icon: 'verified_user',
    title: 'Sertifikatlangan',
    desc: "Xalqaro sertifikatlarga ega va ko'p yillik tajribali mutaxassislar dars berishadi.",
  },
  {
    icon: 'auto_graph',
    title: 'Tizimli yondashuv',
    desc: "Noldan yuqori darajagacha bo'lgan mukammal va sinovdan o'tgan o'quv dasturi.",
  },
  {
    icon: 'rocket_launch',
    title: 'Tezkor natija',
    desc: "Intensiv metodlarimiz yordamida har bir darsdan so'ng bilimingizni his qilasiz.",
  },
  {
    icon: 'devices',
    title: 'High-Tech',
    desc: "Istalgan vaqtda va istalgan qurilmada bilim olish imkonini beruvchi platforma.",
  },
];

const About = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-[120px] glow-pulse pointer-events-none"></div>
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight mb-6">
            Nega aynan <span className="text-primary underline decoration-primary/20 underline-offset-8">Ustozation</span>?
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
            Biz ta'lim berishda natija va qulaylikni birinchi o'ringa qo'yamiz. Har bir detal sizning muvaffaqiyatingiz uchun xizmat qiladi.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((f) => (
            <div key={f.icon} className="bg-white p-7 md:p-8 rounded-3xl border border-outline-variant/30 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
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
