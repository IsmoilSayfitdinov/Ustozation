import { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Platforma haqida', href: '#about' },
  { label: 'Kurslar', href: '#courses' },
  { label: 'Interaktiv', href: '#bento' },
  { label: 'Narxlar', href: '#pricing' },
  { label: 'Sharhlar', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

interface NavbarProps {
  onAuth?: () => void;
}

const Navbar = ({ onAuth }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'mt-4 mx-4 md:mx-8 lg:mx-12 py-3 bg-white/70 glass-nav premium-shadow rounded-2xl' 
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out z-60 rounded-full"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group overflow-hidden flex items-center">
            <img 
              src="/img/Mask group.png" 
              alt="Ustoznation Logo" 
              className="h-8 md:h-10 transition-all duration-500 group-hover:scale-105 active:scale-95" 
            />
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-full scale-150" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-on-surface-variant font-headline font-bold text-[13px] uppercase tracking-[0.15em] hover:text-primary transition-all duration-300 relative group py-2 flex items-center gap-1"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary/10 rounded-full transition-all duration-300 group-hover:w-full -z-1" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => onAuth ? onAuth() : navigate('/login')}
              className="flex items-center gap-3 btn-shimmer text-white px-8 py-3 rounded-xl font-headline font-black text-[12px] uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-500 cursor-pointer border-none relative overflow-hidden group"
            >
              <LogIn color='white' size={18} className="transition-transform duration-500 group-hover:translate-x-1"/>
              <span className="relative z-10 text-white">Kirish</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-3 text-on-surface hover:text-primary transition-all duration-300 cursor-pointer relative z-60 group"
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

      <div 
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-700 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div className={`lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white/95 backdrop-blur-2xl z-50 shadow-[0_0_80px_rgba(0,0,0,0.15)] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col will-change-transform ${
        menuOpen ? 'translate-x-0 rounded-l-[40px]' : 'translate-x-full rounded-l-none'
      }`}>
        <div className="flex flex-col p-10 pt-28 gap-6 overflow-y-auto h-full relative">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-on-surface-variant font-headline font-black text-xl uppercase tracking-widest hover:text-primary transition-all duration-500 py-4 border-b border-outline-variant/5 flex items-center justify-between group ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="flex items-center gap-4">
                <span className="text-[10px] text-primary/40 font-mono tracking-tighter">0{index + 1}</span>
                {link.label}
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </a>
          ))}
          
          <div className={`mt-auto pt-10 transition-all duration-700 delay-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button 
              onClick={() => {
                if (onAuth) onAuth();
                else navigate('/login');
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-4 btn-shimmer text-white py-5 rounded-2xl font-headline font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <LogIn size={22} className="text-white" />
              Kirish
            </button>
            <p className="text-center mt-8 text-on-surface-variant/40 text-[10px] uppercase tracking-widest font-bold font-headline">
              Ustoznation Platformasi © 2026
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
