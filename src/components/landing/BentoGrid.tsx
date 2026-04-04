const BentoGrid = () => {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden dark:bg-[#0a0a0a]">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] float-orb-delayed pointer-events-none"></div>
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <h2 className="text-[2rem] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight text-center mb-12 md:mb-20">Platforma imkoniyatlari</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Interaktiv darslar */}
          <div className="lg:col-span-2 bg-[#fafaf9] dark:bg-[#1a1a1a] p-5 md:p-9 rounded-3xl flex flex-col group hover:shadow-xl transition-all duration-500 border border-outline-variant/20 dark:border-white/8">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/8 rounded-xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>video_stable</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 md:mb-3">Interaktiv darslar</h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-4 md:mb-6">Har bir bo'lim uchun professional tarzda montaj qilingan, tushunish oson bo'lgan video darslar.</p>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                <span className="material-symbols-outlined text-lg">play_circle</span> 120+ darslar
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">schedule</span> 200+ soat
              </div>
            </div>
          </div>

          {/* Materiallar */}
          <div className="bg-linear-to-br from-primary to-primary-dark p-5 md:p-9 rounded-3xl flex flex-col text-white shadow-xl shadow-primary/20 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/15 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <span className="material-symbols-outlined text-white text-2xl md:text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>menu_book</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 md:mb-3">Materiallar</h3>
            <p className="opacity-80 text-sm md:text-base leading-relaxed">Eksklyuziv darsliklar va PDF qo'llanmalar faqat bizning o'quvchilar uchun.</p>
          </div>

          {/* Speaking Club */}
          <div className="bg-linear-to-br from-tertiary to-[#0284c7] text-white p-5 md:p-9 rounded-3xl flex flex-col shadow-xl shadow-tertiary/20 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/15 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <span className="material-symbols-outlined text-white text-2xl md:text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>forum</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 md:mb-3">Speaking Club</h3>
            <p className="opacity-80 text-sm md:text-base leading-relaxed">Haftasiga 3 marta jonli suhbatlar va amaliyot.</p>
          </div>

          {/* AI yordamchi */}
          <div className="lg:col-span-2 bg-[#fafaf9] dark:bg-[#1a1a1a] p-5 md:p-9 rounded-3xl border border-outline-variant/20 dark:border-white/8 flex flex-col group hover:shadow-xl transition-all duration-500">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/8 rounded-xl flex items-center justify-center text-primary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-2xl md:text-3xl">psychology</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold font-headline mb-2 md:mb-3">Sun'iy intellekt yordamchi</h3>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed mb-4 md:mb-6">Sizning xatolaringizni real vaqtda tuzatuvchi va yangi so'zlarni eslab qolishga yordam beruvchi aqlli tizim.</p>
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                <span className="material-symbols-outlined text-lg">bolt</span> Real vaqt
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-on-surface-variant">
                <span className="material-symbols-outlined text-lg">translate</span> 24/7 yordam
              </div>
            </div>
          </div>

          {/* Sertifikat */}
          <div className="bg-linear-to-br from-[#7c3aed] to-[#6d28d9] text-white p-5 md:p-9 rounded-3xl flex flex-col shadow-xl shadow-[#7c3aed]/20 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/15 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <span className="material-symbols-outlined text-white text-2xl md:text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 md:mb-3">Sertifikat</h3>
            <p className="opacity-80 text-sm md:text-base leading-relaxed">Kursni yakunlaganingizda rasmiy sertifikat olasiz.</p>
          </div>

          {/* Progress tracking */}
          <div className="bg-linear-to-br from-[#059669] to-[#047857] text-white p-5 md:p-9 rounded-3xl flex flex-col shadow-xl shadow-[#059669]/20 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/15 rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <span className="material-symbols-outlined text-white text-2xl md:text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>monitoring</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-headline mb-2 md:mb-3">Progress</h3>
            <p className="opacity-80 text-sm md:text-base leading-relaxed">O'z natijalaringizni real vaqtda kuzatib boring.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
