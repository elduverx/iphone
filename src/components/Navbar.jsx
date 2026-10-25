import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { logoMark } from '../utils';
import { brand, navLists } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { localizePath } from '../i18n/paths';
import LanguageToggle from './LanguageToggle';
import SmartLink from './SmartLink';
import { CloseIcon, MenuIcon } from './Icons';

const Navbar = () => {
  const { t, tr, lang } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // en la home, resalta el enlace de la sección visible
  useEffect(() => {
    setActiveSection(null);
    if (pathname.replace(/\/$/, '') !== localizePath('/', lang).replace(/\/$/, '')) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const { id } = entry.target;
        setActiveSection((prev) => (entry.isIntersecting ? id : prev === id ? null : prev));
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLists.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname, lang]);

  const isActive = (nav) => (nav.to.startsWith('/#') ? activeSection === nav.id : pathname.startsWith(localizePath(nav.to, lang)));

  return (
    <header className="sticky top-0 z-50 w-full sm:px-10 px-5 bg-black/70 backdrop-blur-xl border-b border-white/5">
      <nav className="flex w-full h-12 items-center screen-max-width">
        <SmartLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logoMark} alt="" width={22} height={22} />
          <span className="text-sm font-semibold tracking-tight max-[360px]:hidden">{brand.name}</span>
        </SmartLink>

        <div className="flex flex-1 justify-center max-md:hidden">
          {navLists.map((nav) => (
            <SmartLink
              key={nav.id}
              to={nav.to}
              aria-current={isActive(nav) ? 'page' : undefined}
              className={`relative px-4 text-xs transition-all hover:text-white ${isActive(nav) ? 'text-white' : 'text-gray'}`}
            >
              {tr(nav.label)}
              <span className={`absolute left-1/2 -bottom-2 w-1 h-1 -translate-x-1/2 rounded-full bg-forge transition-opacity ${isActive(nav) ? 'opacity-100' : 'opacity-0'}`} />
            </SmartLink>
          ))}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 max-md:flex-1 max-md:justify-end">
          <LanguageToggle />
          <a href="#contacto" onClick={() => setOpen(false)} className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-gradient-to-b from-[#FF8A3D] to-[#EE4F0C] text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 transition-all">
            <span className="sm:hidden">{t('nav.ctaShort')}</span>
            <span className="max-sm:hidden">{t('nav.cta')}</span>
          </a>
          <button
            type="button"
            className="md:hidden p-1 text-gray hover:text-white"
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col pb-6 pt-2">
          {navLists.map((nav) => (
            <SmartLink key={nav.id} to={nav.to} onClick={() => setOpen(false)} className="py-3 text-2xl font-semibold text-gray-200 hover:text-white border-b border-white/5">
              {tr(nav.label)}
            </SmartLink>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="py-3 text-2xl font-semibold text-forge-light">
            {t('nav.cta')}
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
