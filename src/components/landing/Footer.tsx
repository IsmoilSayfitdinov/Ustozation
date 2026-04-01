import type { SiteSetting } from '@/types/api';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  contact?: SiteSetting;
}

const Footer = ({ contact }: FooterProps) => {
  const { t } = useTranslation();

  const MENU_LINKS = [
    { label: t('footer.about_us'), href: '#' },
    { label: t('footer.our_courses'), href: '#' },
    { label: t('footer.achievements'), href: '#' },
    { label: t('footer.blog'), href: '#' },
  ];

  const LEGAL_LINKS = [
    { label: t('footer.privacy'), href: '#' },
    { label: t('footer.offer'), href: '#' },
    { label: t('footer.security'), href: '#' },
  ];
  const phone = contact?.phone || '+998 71 123 45 67';
  const email = contact?.email || 'info@ustozation.uz';
  const address = contact?.address || "Toshkent sh., Mirzo Ulug'bek t., 14-uy";
  const telegram = contact?.telegram || '#';
  const instagram = contact?.instagram || '#';

  return (
    <footer className="bg-[#fafaf9] border-t border-outline-variant/10 pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20">
        <div className="space-y-6">
          <div className="text-2xl font-black text-primary font-headline tracking-tighter italic">Ustozation</div>
          <p className="text-on-surface-variant font-medium leading-relaxed text-sm">
            {t('footer.description')}
          </p>
          <div className="flex gap-3">
            <a className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-outline-variant/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={telegram} target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-lg">send</span>
            </a>
            <a className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-outline-variant/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={instagram} target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-lg">alternate_email</span>
            </a>
            <a className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-outline-variant/15 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" href={`mailto:${email}`}>
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-black text-on-surface uppercase tracking-widest text-xs mb-6">{t('footer.menu')}</h4>
          <ul className="space-y-3">
            {MENU_LINKS.map((link) => (
              <li key={link.label}><a className="text-on-surface-variant font-semibold hover:text-primary transition-colors text-sm" href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-on-surface uppercase tracking-widest text-xs mb-6">{t('footer.legal')}</h4>
          <ul className="space-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}><a className="text-on-surface-variant font-semibold hover:text-primary transition-colors text-sm" href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-on-surface uppercase tracking-widest text-xs mb-6">{t('footer.contact')}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg">call</span>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors">{phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              <a href={`mailto:${email}`} className="text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors">{email}</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <span className="text-on-surface-variant font-semibold text-sm">{address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mx-auto px-6 md:px-12 lg:px-20 pt-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-xs font-semibold text-on-surface-variant">&copy; {new Date().getFullYear()} Ustozation. {t('footer.rights')}</p>
        <div className="flex gap-6 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
          <span>{t('footer.made_in')}</span>
          <span>{t('footer.designed')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
