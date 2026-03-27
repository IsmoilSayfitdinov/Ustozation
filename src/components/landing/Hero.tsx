const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fffcf9 0%, #fff7ed 30%, #fefce8 60%, #fff1f2 80%, #f0f9ff 100%)' }}>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 hero-hologram opacity-60 pointer-events-none"></div>

      {/* Very large colorful blobs to fill the background space */}
      <div className="absolute top-0 right-[5%] w-[600px] h-[600px] rounded-full float-orb pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.05) 50%, transparent 70%)' }}></div>
      <div className="absolute top-[20%] -left-20 w-[500px] h-[500px] rounded-full float-orb-delayed pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0.04) 50%, transparent 70%)' }}></div>
      <div className="absolute -bottom-20 right-[30%] w-[400px] h-[400px] rounded-full glow-pulse pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}></div>
      <div className="absolute -top-10 left-[40%] w-[350px] h-[350px] rounded-full float-orb pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)' }}></div>

      {/* Floating Elements (Icons & Geometry) to make space busy */}
      <div className="absolute top-32 left-[48%] w-16 h-16 bg-white/60 backdrop-blur-md border border-white rounded-2xl shadow-xl rotate-12 flex items-center justify-center float-orb-delayed pointer-events-none z-0 text-primary">
        <span className="material-symbols-outlined text-3xl">menu_book</span>
      </div>
      <div className="absolute top-[60%] left-[5%] w-14 h-14 bg-white/60 backdrop-blur-md border border-white rounded-full shadow-xl -rotate-12 flex items-center justify-center float-orb pointer-events-none z-0 text-tertiary">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>forum</span>
      </div>
      <div className="absolute bottom-[20%] left-[45%] w-12 h-12 bg-white/60 backdrop-blur-md border border-white rounded-xl shadow-xl rotate-45 flex items-center justify-center glow-pulse pointer-events-none z-0 text-[#a855f7]">
        <span className="material-symbols-outlined text-xl">psychology</span>
      </div>
      
      {/* Decorative Grid Network & Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#F97316 1.5px, transparent 1.5px), linear-gradient(90deg, #F97316 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left - Text content */}
          <div className="space-y-8 lg:space-y-10 py-6 relative z-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white backdrop-blur-sm text-primary text-sm font-bold tracking-tight shadow-md border border-primary/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Yangi kurslar mavsumiga qabul ochiq
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[5rem] font-extrabold font-headline leading-[1.05] tracking-tight text-[#1c1917]">
              Ingliz tilini{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-[#f43f5e] italic pr-2">
                  ishonch
                </span>
                <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 C50 2, 150 2, 198 8" stroke="#F97316" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>{' '}
              bilan o'rganing
            </h1>

            <p className="text-lg lg:text-xl text-on-surface-variant max-w-lg leading-relaxed font-medium">
              O'zbekistondagi yetakchi o'quv markazi bilan IELTS va Speaking darajangizni bor-yo'g'i 3 oyda kafolatli oshiring.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              <button className="btn-shimmer text-white px-6 md:px-10 py-4 md:py-5 rounded-[1.25rem] font-headline font-extrabold text-base md:text-lg hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-2 w-full sm:w-auto">
                Bepul darsga yozilish <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
              </button>
              <button className="bg-white/80 backdrop-blur-md text-on-surface px-6 md:px-10 py-4 md:py-5 rounded-[1.25rem] font-headline font-bold text-base md:text-lg hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-outline-variant/30 flex items-center justify-center gap-2 w-full sm:w-auto">
                <span className="material-symbols-outlined text-primary text-xl">play_circle</span> Batafsil video
              </button>
            </div>

            {/* Separated unified stats box to take up space beautifully */}
            <div className="bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 shadow-xl border border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 lg:gap-10 mt-6 lg:mt-8 relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-tertiary/20 to-purple-500/20 rounded-[2rem] blur opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div>
                  <div className="text-2xl font-black text-on-surface leading-none">1000+</div>
                  <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">Muvaffaqiyatli talaba</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-on-surface/10"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                </div>
                <div>
                  <div className="text-2xl font-black text-on-surface leading-none">4.9/5</div>
                  <div className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">Ustozlar reytingi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image & Floating Cards - Completely redesigned to be full and dynamic */}
          <div className="relative flex justify-center lg:justify-end h-[500px] lg:h-[650px] w-full mt-10 lg:mt-0">
            
            {/* Soft backdrop glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gradient-to-tr from-primary/30 to-tertiary/20 rounded-full blur-[80px] -z-10"></div>

            {/* Main Image Container - transparent background assuming cutout image */}
            <div className="relative w-full h-full flex items-end justify-center z-10">
              <img
                alt="Teacher"
                className="h-[110%] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom hover:scale-105 transition-transform duration-700"
                src="/img/image_2026-03-16_11-20-00.png"
              />
            </div>

            {/* Floating skill pills */}
            <div className="absolute top-[5%] md:top-[10%] left-0 sm:left-2 md:left-[0%] bg-white/90 backdrop-blur-md px-3 md:px-5 py-2 md:py-3 rounded-full shadow-lg border border-white font-bold text-[#1c1917] flex items-center gap-2 hover:scale-110 transition-transform cursor-default z-20 float-orb text-xs md:text-base scale-90 sm:scale-100 origin-left">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Speaking Club
            </div>
            
            <div className="absolute top-[35%] md:top-[40%] right-0 sm:right-2 md:right-[0%] bg-white/90 backdrop-blur-md px-3 md:px-5 py-2 md:py-3 rounded-full shadow-lg border border-white font-bold text-[#1c1917] flex items-center gap-2 hover:scale-110 transition-transform cursor-default z-20 float-orb-delayed text-xs md:text-base scale-90 sm:scale-100 origin-right">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> IELTS 8.5+ 
            </div>

            <div className="absolute bottom-[20%] md:bottom-[30%] left-0 sm:left-0 md:left-[-10%] bg-white/90 backdrop-blur-md px-3 md:px-5 py-2 md:py-3 rounded-full shadow-lg border border-white font-bold text-[#1c1917] flex items-center gap-2 hover:scale-110 transition-transform cursor-default z-20 glow-pulse text-xs md:text-base scale-90 sm:scale-100 origin-left">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Mock Exam
            </div>

            {/* Floating Card - Big success badge */}
            <div className="absolute top-2 md:top-4 right-2 md:right-10 bg-white/95 backdrop-blur-xl rounded-3xl md:rounded-[2rem] p-3 md:p-5 shadow-2xl border border-white flex flex-col items-center gap-1 md:gap-2 z-20 float-orb-delayed transform rotate-3 scale-90 md:scale-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-inner mb-1">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <div className="text-3xl font-black text-on-surface leading-none">98%</div>
              <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Muvaffaqiyat<br/>ko'rsatkichi</div>
            </div>

            {/* Floating Card - Teachers team at bottom */}
            <div className="absolute bottom-4 md:bottom-10 right-4 sm:-right-8 bg-white/95 backdrop-blur-xl rounded-full pl-2 md:pl-3 pr-4 md:pr-6 py-2 md:py-3 shadow-2xl border border-white flex items-center gap-3 md:gap-4 z-20 float-orb hover:shadow-primary/20 transition-all scale-90 md:scale-100 origin-bottom-right">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgFLJAlrv4R9TylkrtWjqG_9WTvODWEP_5HMW3LNH9CQauTgVYARAGoUz6vrqD6cVkJ30UkYo2xmk1pQ-R_1dj_l5BT70L2CpQdpHC9WPkjZVEWLlsZ3CkJvhnrCUq_O2fgT51QWn9ihFD5gWJBEC8fig10786zr8nHoiESzuoX96i8BcpKJRQRNzeuSv7AmOY-i-6ZkDr4AYl7y6JNRulof6YhaAR3Fg4t6frwFaRSIFVPT9y30fjvC3VHFrQFnuDVbfH068d_3g" alt="Teacher" />
                </div>
                <div className="w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN5k0ok4RMeJc3FtOi3WtxaC7DyywOKpSRZh90G4zdiBjz7rhblN4uAGoObA479OlXwiMDyyHxHdAC2X3BJIjzAx7BO1DWipSb0hvKLhCHev9vjXyOeNu8bLDauC2AymzA-rm1Sd8enx1zg0P0_WMzh2Xebt7t3RqNjSf1VE4jH2mX8VnoWTmOk1KcfNUsxSqifTvxkgvjAoPimxCWeN1Gnr0cunCal_F0nkdr0cu5A8tRC0JK-ZYm1fbDtBw3qBFhVxMU8JwRUj8" alt="Team" />
                </div>
                <div className="w-12 h-12 rounded-full border-[3px] border-white bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-xs shadow-inner">+15</div>
              </div>
              <div>
                <p className="text-sm font-black text-on-surface">Top Ustozlar jamoasi</p>
                <div className="flex items-center gap-1 text-[#fbbf24]">
                  {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
