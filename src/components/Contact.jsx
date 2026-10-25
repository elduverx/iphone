import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../utils/animations';
import { contact, needs } from '../constants';
import { whatsappUrl } from '../utils';
import { getAttribution, trackLead } from '../utils/tracking';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon, ChatIcon, CheckIcon } from './Icons';
import SmartLink from './SmartLink';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

const CheckCircle = () => (
  <svg viewBox="0 0 52 52" width="72" height="72" aria-hidden="true">
    <circle cx="26" cy="26" r="24" fill="none" stroke="#FF6A1A" strokeWidth="3" className="[stroke-dasharray:151] [stroke-dashoffset:151] animate-[draw_0.7s_ease-out_forwards]" />
    <path d="M15 27l7 7 15-15" fill="none" stroke="#FF9A5C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="[stroke-dasharray:40] [stroke-dashoffset:40] animate-[draw_0.4s_0.5s_ease-out_forwards]" />
  </svg>
);

const Contact = ({ defaultNeed = '' }) => {
  const { t, tr, lang } = useLanguage();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [need, setNeed] = useState(defaultNeed);
  // cuándo se mostró el formulario: el servidor descarta envíos instantáneos (bots)
  const shownAt = useRef(0);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  useGSAP(() => {
    animateWithGsap('#contact_title', { y: 0, opacity: 1 })
    animateWithGsap('.g_contact', { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.inOut' })
  }, []);

  // Lo envía la función /api/contact (Nodemailer) a nuestro buzón, con la página y la campaña de origen
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form)),
      need: need || 'other',
      language: lang,
      page: window.location.pathname,
      elapsed: Date.now() - shownAt.current,
      ...getAttribution(),
    };

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(response.statusText);
      trackLead({ need: payload.need });
      form.reset();
      setNeed('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const channels = [
    {
      href: whatsappUrl(contact.whatsapp, t('contact.whatsappMessage')),
      icon: <ChatIcon width={24} height={24} />,
      title: t('contact.whatsapp'),
      hint: `${contact.phoneLabel} · ${t('contact.whatsappHint')}`,
      tint: 'bg-[#25D366]/15 text-[#25D366]',
    },
    {
      href: `mailto:${contact.email}`,
      icon: <MailIcon />,
      title: contact.email,
      hint: t('contact.emailHint'),
      tint: 'bg-forge/15 text-forge-light',
    },
  ];

  return (
    <section id="contacto" className="common-padding bg-zinc relative overflow-hidden">
      <div className="glow-orb w-[50vw] h-[30vw] bg-forge/20 -top-[10%] left-1/4" aria-hidden="true" />
      <div className="screen-max-width relative">
        <p className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-16">
          {t('contact.kicker1')}<br />
          <span className="text-gradient-forge">{t('contact.kicker2')}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-start">
          {/* columna izquierda: título y canales directos */}
          <div>
            <h2 id="contact_title" className="section-heading">{t('contact.title')}</h2>
            <p className="text-gray-200 text-xl font-semibold mt-4 mb-10">{t('contact.subtitle')}</p>

            <p className="text-gray text-sm font-semibold mb-3">{t('contact.direct')}</p>
            <div className="g_contact opacity-0 translate-y-[60px] flex flex-col gap-3">
              {channels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card spotlight group flex items-center gap-4 p-4 !rounded-3xl hover:border-white/20 transition-colors"
                >
                  <span className={`flex-center w-12 h-12 rounded-2xl shrink-0 ${channel.tint}`}>{channel.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold truncate">{channel.title}</span>
                    <span className="block text-sm text-gray truncate">{channel.hint}</span>
                  </span>
                  <ArrowRightIcon className="text-gray transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </a>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-gray mt-6">
              <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
              {t('contact.reply')}
            </p>
          </div>

          {/* formulario corto */}
          <div className="g_contact glass-card opacity-0 translate-y-[60px] p-6 md:p-10">
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-center text-center py-10">
                <CheckCircle />
                <p className="text-3xl font-semibold mt-6">{t('contact.successTitle')}</p>
                <p className="text-gray mt-2 max-w-sm">{t('contact.success')}</p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">{t('contact.again')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-200 mb-3">{t('contact.need')}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {needs.map((option) => {
                      const active = need === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setNeed(active ? '' : option.value)}
                          className={`rounded-2xl px-4 py-3 text-sm font-semibold border transition-all ${active ? 'bg-forge/15 border-forge text-white shadow-[0_0_24px_-6px_rgba(255,106,26,0.6)]' : 'bg-white/[0.03] border-white/10 text-gray-200 hover:border-white/25'}`}
                        >
                          {tr(option.label)}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="field">
                    <span>{t('contact.name')}</span>
                    <input name="name" type="text" required autoComplete="name" className="input" />
                  </label>
                  <label className="field">
                    <span>{t('contact.email')}</span>
                    <input name="email" type="email" required autoComplete="email" inputMode="email" className="input" />
                  </label>
                </div>

                <label className="field">
                  <span>{t('contact.message')}</span>
                  <textarea name="message" required rows={4} placeholder={t('contact.messagePlaceholder')} className="input resize-none" />
                </label>

                {/* trampa anti-spam: invisible para personas, los bots la rellenan */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <button type="submit" disabled={status === 'sending'} className="btn !my-0 w-full !py-4 text-lg disabled:opacity-60">
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                  {status !== 'sending' && <ArrowRightIcon />}
                </button>

                {status === 'error' && <p role="alert" className="text-sm text-red-400 -mt-2">{t('contact.error')}</p>}

                <p className="flex items-center justify-center gap-2 text-sm text-gray-200 font-semibold -mt-2">
                  <CheckIcon width={16} height={16} />
                  {t('contact.free')}
                </p>

                <p className="text-xs text-gray text-center -mt-3">
                  {t('contact.legal')}{' '}
                  <SmartLink to="/privacidad" className="text-link underline-offset-2 hover:underline">
                    {t('contact.privacyLink')}
                  </SmartLink>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
