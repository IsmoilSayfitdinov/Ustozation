import { useState, useEffect } from 'react';
import { Menu, X, LogIn, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onAuth?: () => void;
}

const Navbar = ({ onAuth }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const NAV_LINKS = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.courses'), href: '#courses' },
    { label: t('nav.interactive'), href: '#bento' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.reviews'), href: '#testimonials' },
    { label: t('nav.faq'), href: '#faq' },
  ];

  const toggleLang = () => {
    const newLang = i18n.language === 'uz' ? 'en' : 'uz';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScrollY / windowHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'mt-4 mx-4 md:mx-8 lg:mx-12 py-3 bg-white/70 dark:bg-[#1a1a1a]/80 glass-nav premium-shadow rounded-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out z-60 rounded-full"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="relative group overflow-hidden flex items-center">
            <img src="/img/Mask group.png" alt="Ustoznation Logo" className="h-8 md:h-10 transition-all duration-500 group-hover:scale-105 active:scale-95" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-[#667085] dark:text-[#d1d5db] font-headline font-bold text-[13px] uppercase tracking-[0.15em] hover:text-primary transition-all duration-300 relative group py-2">
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E7EC] dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-[#141F38] dark:text-white font-bold text-xs uppercase tracking-wider hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <Globe className="w-4 h-4 text-primary" />
              {i18n.language === 'uz' ? 'EN' : 'UZ'}
            </button>

            <button
              onClick={() => onAuth ? onAuth() : navigate('/login')}
              className="flex items-center gap-3 btn-shimmer text-white px-8 py-3 rounded-xl font-headline font-black text-[12px] uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-500 cursor-pointer border-none"
            >
              <LogIn color='white' size={18} />
              <span className="relative z-10 text-white">{t('nav.login')}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="p-2.5 rounded-xl border border-outline-variant/20 dark:border-white/15 bg-white/60 dark:bg-white/10 text-on-surface dark:text-white font-black text-[11px] uppercase"
            >
              {i18n.language === 'uz' ? 'EN' : 'UZ'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-3 text-on-surface hover:text-primary transition-all duration-300 cursor-pointer relative z-60"
              aria-label="Toggle Menu"
            >
              <div className={`relative w-7 h-5 flex flex-col justify-between transition-all duration-500 ${menuOpen ? 'scale-110' : ''}`}>
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-500 origin-left ${menuOpen ? 'rotate-42 translate-y-[2px]' : ''}`} />
                <span className={`w-3/4 h-0.5 bg-current rounded-full transition-all duration-500 ${menuOpen ? 'opacity-0 -translate-x-full' : 'ml-auto'}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-500 origin-left ${menuOpen ? '-rotate-42 -translate-y-[2px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-700 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-2xl z-50 shadow-[0_0_80px_rgba(0,0,0,0.15)] transition-all duration-700 flex flex-col will-change-transform ${
        menuOpen ? 'translate-x-0 rounded-l-[40px]' : 'translate-x-full rounded-l-none'
      }`}>
        <div className="flex flex-col p-10 pt-28 gap-6 overflow-y-auto h-full relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />

          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[#667085] dark:text-[#d1d5db] font-headline font-black text-xl uppercase tracking-widest hover:text-primary transition-all duration-500 py-4 border-b border-[#F2F4F7] dark:border-white/5 flex items-center justify-between group ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="flex items-center gap-4">
                <span className="text-[10px] text-primary/40 font-mono tracking-tighter">0{index + 1}</span>
                {link.label}
              </span>
            </a>
          ))}

          <div className={`mt-auto pt-10 transition-all duration-700 delay-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={() => { if (onAuth) onAuth(); else navigate('/login'); setMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-4 btn-shimmer text-white py-5 rounded-2xl font-headline font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/40"
            >
              <LogIn size={22} className="text-white" />
              {t('nav.login')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
