import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CheckIcon } from './Icons';
import { PhoneFrame } from './devices/DeviceFrames';
import { VideoScreen } from './devices/DeviceScreens';

// El iPhone empieza inclinado y hundido, y se endereza al hacer scroll. Esta postura también es la del HTML
// pre-renderizado (mismo orden de transformaciones que usa GSAP), así que no salta al hidratar.
const PHONE_START = { yPercent: 10, rotate: -8, rotationX: 16, scale: 0.94 };
const PHONE_START_CSS = 'translate(0%, 10%) rotate(-8deg) rotateX(16deg) scale(0.94)';

// Tarjeta de cristal al estilo iOS
const Glass = ({ className = '', children }) => (
  <div className={`ios-chip absolute opacity-0 rounded-[1.4rem] bg-white/[0.08] border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] ${className}`}>
    {children}
  </div>
);

const FaceIdIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 9.5v1M15 9.5v1M12 9.5v3.5h-1M9.5 15.5c1.4 1 3.6 1 5 0" />
  </svg>
);

// Escenario del hero: grabación real de una app dentro de un iPhone y, alrededor, piezas de iOS que
// sabemos construir (aprobación en App Store, Live Activity, widget, suscripción con Face ID)
const HeroStage = () => {
  const { t } = useLanguage();
  const stageRef = useRef();
  const phoneRef = useRef();

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(phoneRef.current, { yPercent: 0, rotate: 0, rotationX: 0, scale: 1 });
      gsap.set('.ios-chip', { opacity: 1 });
      return;
    }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: stageRef.current, start: 'top 90%', end: 'center 40%', scrub: 0.6 },
    });
    tl.fromTo(phoneRef.current, PHONE_START, { yPercent: 0, rotate: 0, rotationX: 0, scale: 1, ease: 'none', duration: 1 }, 0);
    gsap.utils.toArray('.ios-chip').forEach((chip, i) => {
      tl.fromTo(chip, { opacity: 0, y: 50, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.45 }, 0.15 + i * 0.12);
    });
  }, { scope: stageRef });

  return (
    <div ref={stageRef} className="relative mx-auto mt-14 w-full max-w-5xl h-[470px] sm:h-[560px] md:h-[640px] [perspective:1600px]" aria-hidden="true">
      <div className="absolute left-1/2 top-[15%] w-[70%] h-[60%] -translate-x-1/2 rounded-full bg-forge/25 blur-[100px]" />

      <div className="hero-rise absolute left-1/2 top-0 -translate-x-1/2 [animation-delay:350ms]">
        <div ref={phoneRef} className="text-[12.5px] sm:text-[15px] md:text-[17px]" style={{ transform: PHONE_START_CSS }}>
          <PhoneFrame className="shadow-[0_3em_6em_-1.5em_rgba(0,0,0,0.9),0_0_5em_-1em_rgba(255,106,26,0.35)]">
            <VideoScreen src="/assets/showcase/iphone.mp4" poster="/assets/showcase/iphone.jpg" label={t('hero.recording')} />
          </PhoneFrame>
        </div>
      </div>

      {/* App Review: la app aprobada y lista para publicar */}
      <Glass className="left-2 sm:left-[4%] lg:left-[6%] top-[5%] w-[252px] sm:w-[300px] p-3 sm:p-3.5 flex gap-3 text-left">
        <span className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[0.7rem] bg-gradient-to-b from-[#1AA8FF] to-[#0A63F5] flex-center">
          <CheckIcon width={20} height={20} className="text-white" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between gap-2 text-[11px] sm:text-xs text-gray-200">
            <span className="font-semibold uppercase tracking-wide truncate">{t('hero.ios.reviewApp')}</span>
            <span>{t('hero.ios.reviewTime')}</span>
          </span>
          <span className="block text-[13px] sm:text-sm font-semibold mt-0.5 leading-snug">{t('hero.ios.reviewText')}</span>
        </span>
      </Glass>

      {/* Live Activity en la Dynamic Island */}
      <Glass className="max-md:hidden right-[6%] top-[9%] !rounded-full !bg-black/85 pl-2.5 pr-5 py-2.5 flex items-center gap-3">
        <span className="w-9 h-9 rounded-full border-[3.5px] border-forge border-r-forge/20 border-b-forge/20 rotate-45" />
        <span className="text-left">
          <span className="block text-[11px] text-gray-200">{t('hero.ios.liveTitle')}</span>
          <span className="block font-semibold tabular-nums leading-tight">32:15</span>
        </span>
        <span className="text-sm font-semibold text-forge-light">{t('hero.ios.liveMeta')}</span>
      </Glass>

      {/* grabación real: lo que se ve en el iPhone */}
      <Glass className="max-md:hidden left-[9%] top-[27%] !rounded-full px-4 py-2 flex items-center gap-2 text-xs font-semibold text-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#FF453A] animate-pulse" />
        {t('hero.recording')}
      </Glass>

      {/* widget de pantalla de inicio */}
      <Glass className="max-md:hidden left-[11%] top-[36%] w-[170px] h-[170px] p-4 flex flex-col text-left">
        <span className="text-xs font-semibold text-gray-200">{t('hero.ios.widgetTitle')}</span>
        <span className="text-2xl font-semibold mt-1 tabular-nums">{t('hero.ios.widgetValue')}</span>
        <span className="mt-auto flex items-end gap-1.5 h-12">
          {[40, 65, 30, 80, 55, 95, 70].map((height, i) => (
            <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-forge to-ember" style={{ height: `${height}%` }} />
          ))}
        </span>
      </Glass>

      {/* suscripción con StoreKit y Face ID */}
      <Glass className="right-2 sm:right-[4%] lg:right-[8%] top-[44%] w-[224px] sm:w-[240px] p-3.5 sm:p-4 text-left">
        <span className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-200">{t('hero.ios.payTitle')}</span>
          <span className="text-xs font-semibold">{t('hero.ios.payPrice')}</span>
        </span>
        <span className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-white text-black px-3 py-2 text-[13px] sm:text-sm font-semibold">
          <FaceIdIcon />
          {t('hero.ios.payAction')}
        </span>
      </Glass>
    </div>
  );
};

export default HeroStage;
