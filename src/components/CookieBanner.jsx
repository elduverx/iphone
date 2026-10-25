import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CONSENT_OPEN_EVENT, getConsent, hasTracking, setConsent } from '../utils/tracking';
import SmartLink from './SmartLink';

// Aviso de cookies: solo aparece si hay medición configurada. Aceptar y rechazar pesan lo mismo (criterio AEPD).
const CookieBanner = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasTracking) return;
    setOpen(!getConsent());
    // "Preferencias de cookies" en el pie lo vuelve a abrir
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t('consent.title')}
      className="fixed z-[60] bottom-4 inset-x-4 sm:right-auto sm:max-w-sm rounded-3xl bg-neutral-900/95 border border-white/10 backdrop-blur-xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
    >
      <p className="font-semibold">{t('consent.title')}</p>
      <p className="text-sm text-gray-200 mt-1.5 leading-relaxed">
        {t('consent.text')}{' '}
        <SmartLink to="/cookies" className="text-link underline underline-offset-2">{t('consent.more')}</SmartLink>
      </p>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button type="button" onClick={() => choose('denied')} className="rounded-full py-2.5 text-sm font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition-colors">
          {t('consent.reject')}
        </button>
        <button type="button" onClick={() => choose('granted')} className="rounded-full py-2.5 text-sm font-semibold bg-white/10 border border-white/15 hover:bg-white/15 transition-colors">
          {t('consent.accept')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
