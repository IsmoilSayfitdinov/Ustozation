const Pricing = () => {
  return (
    <section className="py-16 md:py-36 relative overflow-hidden bg-white">
      {/* ===== Animated Background Elements ===== */}
      {/* Very large gradient blobs for depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full float-orb pointer-events-none opacity-40 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.02) 40%, transparent 70%)' }}></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full float-orb-delayed pointer-events-none opacity-40 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, rgba(14,165,233,0.02) 40%, transparent 70%)' }}></div>
      <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] rounded-full glow-pulse pointer-events-none opacity-30 mix-blend-multiply"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }}></div>

      {/* Decorative Grid Network */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Floating 3D-like shapes */}
      <div className="absolute top-24 left-[15%] w-24 h-24 border-4 border-primary/20 rounded-3xl rotate-12 float-orb pointer-events-none"></div>
      <div className="absolute bottom-32 right-[10%] w-16 h-16 bg-gradient-to-br from-tertiary/20 to-transparent rounded-full float-orb-delayed pointer-events-none backdrop-blur-sm"></div>
      <div className="absolute top-[30%] right-[15%] w-12 h-12 border-4 border-[#a855f7]/20 rounded-full glow-pulse pointer-events-none"></div>
      <div className="absolute top-[60%] left-[5%] w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl -rotate-12 float-orb pointer-events-none backdrop-blur-md"></div>

      {/* Animated curved paths */}
      <svg className="absolute top-20 right-0 w-full h-full pointer-events-none opacity-[0.05]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M0 500 C 200 300, 400 700, 1000 500" stroke="#F97316" strokeWidth="4" fill="none" className="animate-[pulse_4s_ease-in-out_infinite]" />
        <path d="M0 600 C 300 400, 600 800, 1000 400" stroke="#0ea5e9" strokeWidth="2" fill="none" className="animate-[pulse_6s_ease-in-out_infinite]" />
      </svg>

      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-20 md:mb-28 space-y-6  mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white backdrop-blur-sm text-primary text-sm font-bold tracking-tight shadow-md border border-primary/10 float-orb">
            <span className="material-symbols-outlined text-lg">local_fire_department</span>
            Hamyonbop narxlar
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold font-headline tracking-tighter text-on-surface">
            Qulay <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">narxlar</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-xl font-medium leading-relaxed">
            Maqsadingiz sari birinchi qadamni tanlang. Barcha darajalar uchun moslashtirilgan o'quv rejalari.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-center mx-auto relative">
          
          {/* Card 1: Standard */}
          <div className="bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/30 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col hover:-translate-y-2 relative z-10 mx-auto w-full max-w-sm md:max-w-none">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 md:mb-6">
              <span className="material-symbols-outlined text-3xl">directions_walk</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-3 text-on-surface">Standard</h3>
            <p className="text-on-surface-variant mb-10 text-sm font-medium leading-relaxed">Mustaqil o'rganishni sevuvchilar uchun qulay imkoniyat.</p>
            
            <div className="mb-10 pb-10 border-b border-outline-variant/20">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-on-surface tracking-tighter">299</span>
                <span className="text-xl font-bold text-on-surface-variant">,000</span>
              </div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">so'm / oyniga</div>
            </div>

            <ul className="space-y-5 mb-10 flex-1">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary/80 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">120+ Video darslar</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary/80 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">Interaktiv testlar</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary/80 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">PDF materiallar qo'llanma</span>
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold font-headline border-2 border-outline-variant/30 text-on-surface hover:bg-surface-container hover:border-outline-variant transition-all cursor-pointer bg-white shadow-sm text-sm tracking-wide">Kursni Tanlash</button>
          </div>

          {/* Card 2: Premium (Highlighted) */}
          <div className="relative z-20 md:-mx-4 lg:-mx-6 transform md:scale-105">
            {/* Pulsing glow effect behind premium card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-primary-dark to-[#f43f5e] rounded-[3.5rem] blur-2xl opacity-30 animate-pulse"></div>
            
            <div className="bg-gradient-to-b from-[#1c1917] to-[#292524] p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative shadow-2xl flex flex-col text-white h-full overflow-hidden mx-auto w-full max-w-sm md:max-w-none">
              {/* Premium Card Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/20 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 btn-shimmer text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] px-4 md:px-6 py-2 md:py-2.5 rounded-b-xl shadow-lg whitespace-nowrap border border-t-0 border-white/20">
                ⭐ ENG KO'P TANLANGAN
              </div>
              
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white mb-5 md:mb-6 mt-4 shadow-lg shadow-primary/30 border border-white/20">
                <span className="material-symbols-outlined text-4xl">workspace_premium</span>
              </div>
              
              <h3 className="text-3xl font-extrabold font-headline mb-3 text-white">Premium</h3>
              <p className="text-white/60 mb-10 text-sm font-medium leading-relaxed">To'liq nazorat va kafolatlangan eng yuqori natija uchun.</p>
              
              <div className="mb-10 pb-10 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-white tracking-tighter">499</span>
                  <span className="text-2xl font-bold text-white/60">,000</span>
                </div>
                <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mt-2">so'm / oyniga</div>
              </div>

              <ul className="space-y-6 mb-12 flex-1">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                  <span className="text-sm font-extrabold text-white/90">Barcha Video kurslar + qo'shimcha</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                  <span className="text-sm font-extrabold text-white/90">Shaxsiy ustoz 24/7 nazorati</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                  <span className="text-sm font-extrabold text-white/90">Speaking club (haftasiga 6 kun)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>stars</span>
                  <span className="text-sm font-extrabold text-white/90">Rasmiy sertifikat beriladi</span>
                </li>
              </ul>
              <button className="w-full py-5 rounded-xl font-extrabold font-headline btn-shimmer text-white hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all cursor-pointer border-none text-base tracking-wide flex items-center justify-center gap-2">
                Hoziroq boshlash <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 3: Intensiv */}
          <div className="bg-white/80 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-outline-variant/30 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col hover:-translate-y-2 relative z-10 mx-auto w-full max-w-sm md:max-w-none">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1c1917]/5 rounded-2xl flex items-center justify-center text-[#1c1917] mb-5 md:mb-6 border border-[#1c1917]/10">
              <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-3 text-on-surface">Intensiv</h3>
            <p className="text-on-surface-variant mb-10 text-sm font-medium leading-relaxed">Tez va maxsus maqsadli natija istovchilar uchun (IELTS).</p>
            
            <div className="mb-10 pb-10 border-b border-outline-variant/20">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-on-surface tracking-tighter">799</span>
                <span className="text-xl font-bold text-on-surface-variant">,000</span>
              </div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2">so'm / oyniga</div>
            </div>

            <ul className="space-y-5 mb-10 flex-1">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#1c1917]/60 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">Premiumning barcha qulayliklari</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#1c1917]/60 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">Haftada 2 ta yakkama-yakka dars</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#1c1917]/60 mt-0.5">check_circle</span>
                <span className="text-sm font-bold text-on-surface-variant">Maxsus IELTS tayyorlov kursi</span>
              </li>
            </ul>
            <button className="w-full py-4 rounded-xl font-bold font-headline border-2 border-outline-variant/30 text-on-surface hover:bg-surface-container hover:border-outline-variant transition-all cursor-pointer bg-white shadow-sm text-sm tracking-wide">Kursni Tanlash</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
