import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { platforms } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { PlatformIcon } from './Icons';
import { DeviceStage } from './devices/DeviceDemo';

const EcosystemShowcase = () => {
  const { t, tr } = useLanguage();
  const rootRef = useRef();
  const [active, setActive] = useState(platforms[0].id);
  const [autoplay, setAutoplay] = useState(false);
  const platform = platforms.find((p) => p.id === active);

  // el autoplay arranca al entrar en pantalla y se detiene si el usuario elige
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => setAutoplay((prev) => (prev === 'stopped' ? prev : entry.isIntersecting)), { threshold: 0.4 });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (autoplay !== true) return;
    // cada plataforma se queda el tiempo de su vídeo o animación
    const index = platforms.findIndex((p) => p.id === active);
    const timer = setTimeout(() => {
      setActive(platforms[(index + 1) % platforms.length].id);
    }, platforms[index].duration * 1000);
    return () => clearTimeout(timer);
  }, [active, autoplay]);

  useGSAP(() => {
    gsap.fromTo('.device-stage-inner', { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' });
    gsap.fromTo('.device-caption > *', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' });
  }, { dependencies: [active], scope: rootRef });

  const choose = (id) => {
    setAutoplay('stopped');
    setActive(id);
  };

  return (
    <div ref={rootRef} className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-center">
      {/* selector de plataforma */}
      <div role="tablist" aria-label={t('features.title')} className="flex lg:flex-col gap-2 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 pb-2 lg:pb-0 [scrollbar-width:none]">
        {platforms.map((p) => {
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => choose(p.id)}
              className={`relative shrink-0 flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all overflow-hidden ${isActive ? 'bg-white/10 text-white' : 'text-gray hover:text-white hover:bg-white/5'}`}
            >
              <PlatformIcon id={p.id} width={24} height={24} strokeWidth={1.5} />
              <span className="flex flex-col">
                <span className="font-semibold text-sm lg:text-base whitespace-nowrap">{p.name}</span>
                {p.os !== p.name && <span className="text-xs text-gray max-lg:hidden">{p.os}</span>}
              </span>
              {isActive && autoplay === true && (
                <span key={active} className="absolute left-0 bottom-0 h-0.5 bg-forge animate-[progress_5s_linear_forwards]" style={{ animationDuration: `${p.duration}s` }} />
              )}
            </button>
          );
        })}
      </div>

      {/* escenario */}
      <div>
        <DeviceStage key={active} device={active} label={`${tr(platform.project.name)} · ${platform.name}`} className="h-[300px] sm:h-[420px] md:h-[520px]" />

        <div key={`caption-${active}`} className="device-caption mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start">
          <div>
            <p className="text-2xl md:text-3xl font-semibold">
              {platform.name} <span className="text-forge">{platform.os !== platform.name ? platform.os : ''}</span>
            </p>
            <p className="text-gray text-base md:text-lg mt-2 max-w-2xl">{tr(platform.description)}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {platform.features.map((feature) => (
                <span key={feature} className="chip">{feature}</span>
              ))}
            </div>
          </div>
          <div className="md:max-w-xs md:text-right rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <p className="flex md:justify-end items-center gap-2 text-xs text-gray uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-forge animate-pulse" />
              {t('features.projectLabel')}
            </p>
            <p className="font-semibold mt-1">{tr(platform.project.name)}</p>
            <p className="text-sm text-gray-200 mt-1 leading-relaxed">{tr(platform.project.story)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemShowcase;
