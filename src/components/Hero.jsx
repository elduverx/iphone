import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { platforms } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import Marquee from './Marquee';
import { PlatformIcon } from './Icons';
import { MacFrame, PhoneFrame, WatchFrame } from './devices/DeviceFrames';
import { VideoScreen } from './devices/DeviceScreens';

// Composición del ecosistema: cada capa tiene su posición y su profundidad para el parallax
const heroDevices = [
  {
    id: 'mac',
    depth: 0.35,
    position: 'left-1/2 top-0 -translate-x-1/2 text-[6.4px] sm:text-[8px] md:text-[10px] lg:text-[11.5px]',
    node: <MacFrame><VideoScreen src="/assets/showcase/mac.mp4" poster="/assets/showcase/mac.jpg" label="Horda Neón en Mac" /></MacFrame>,
  },
  {
    id: 'watch',
    depth: 1.3,
    position: 'left-1/2 bottom-[4%] -translate-x-[175%] text-[6.5px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px]',
    node: <WatchFrame><VideoScreen src="/assets/showcase/watch.mp4" poster="/assets/showcase/watch.jpg" label="Horda Neón en Apple Watch" /></WatchFrame>,
  },
  {
    id: 'iphone',
    depth: 1,
    position: 'left-1/2 bottom-0 translate-x-[35%] text-[5.6px] sm:text-[7px] md:text-[8.5px] lg:text-[9.5px]',
    node: <PhoneFrame><VideoScreen src="/assets/showcase/iphone.mp4" poster="/assets/showcase/iphone.jpg" label="Tipson Audit en iPhone" /></PhoneFrame>,
  },
];

const Hero = () => {
  const { t } = useLanguage();
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 0.3 })
    gsap.to('#hero-headline', { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
    gsap.from('.hero-device', { y: 160, opacity: 0, duration: 1.6, delay: 0.7, stagger: 0.15, ease: 'expo.out' })
    gsap.to('#cta', { opacity: 1, y: 0, delay: 1.4 })
    gsap.to('#hero-marquee', { opacity: 1, delay: 1.8, duration: 1 })

    // flotación suave continua, cada dispositivo a su ritmo
    gsap.to('.hero-float', { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.7 })

    // al hacer scroll la composición se aleja
    gsap.to('#hero-devices', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      y: 120,
      scale: 0.94,
      opacity: 0.25,
    })
  }, { scope: sectionRef })

  // parallax por capas con el ratón
  const handlePointerMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.utils.toArray('.hero-device').forEach((el) => {
      const depth = Number(el.dataset.depth);
      gsap.to(el, { x: x * 40 * depth, y: y * 24 * depth, rotateY: x * 6, duration: 1.2, ease: 'power3.out' });
    });
    gsap.to('.glow-orb', { x: x * 60, y: y * 40, duration: 2, ease: 'power3.out' });
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="w-full nav-height bg-black relative overflow-hidden flex flex-col justify-center pt-10"
    >
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="glow-orb w-[40vw] h-[40vw] bg-forge/30 top-[30%] left-[30%]" aria-hidden="true" />
      <div className="glow-orb w-[30vw] h-[30vw] bg-ember/15 top-[45%] left-[50%] [animation-delay:-7s]" aria-hidden="true" />

      <div className="relative w-full flex-center flex-col">
        <p id="hero" className="hero-title flex items-center gap-2 !text-base md:!text-lg">
          <span className="w-2 h-2 rounded-full bg-forge animate-pulse" />
          {t('hero.eyebrow')}
        </p>
        <h1 id="hero-headline" className="hero-headline">
          <span className="text-gradient-forge">{t('hero.title')}</span>
        </h1>
        <p className="text-gray text-center text-base md:text-xl font-semibold px-5 max-w-2xl">{t('hero.subtitle')}</p>

        <div className="w-full [perspective:1400px]">
          <div id="hero-devices" className="relative mx-auto mt-8 mb-4 w-full max-w-5xl h-[250px] sm:h-[320px] md:h-[400px] lg:h-[440px]">
            {heroDevices.map((device) => (
              <div key={device.id} className={`absolute ${device.position}`}>
                <div className="hero-device" data-depth={device.depth}>
                  <div className="hero-float">{device.node}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="cta"
        className="relative flex flex-col items-center opacity-0 translate-y-10 px-5"
      >
        <div className="flex flex-wrap justify-center gap-x-4">
          <a href="#contacto" className="btn">{t('hero.cta')}</a>
          <a href="#apps" className="btn-ghost">{t('hero.secondary')}</a>
        </div>
        <p className="font-normal text-base md:text-lg text-center text-gray">{t('hero.note')}</p>
      </div>

      <div id="hero-marquee" className="relative mt-12 opacity-0 border-y border-white/5 py-5">
        <Marquee
          items={platforms}
          duration={35}
          renderItem={(platform) => (
            <span className="flex items-center gap-3 px-8 text-gray-200 font-semibold">
              <PlatformIcon id={platform.id} width={22} height={22} strokeWidth={1.5} />
              {platform.name}
              {platform.os !== platform.name && <span className="text-gray text-sm font-normal">{platform.os}</span>}
            </span>
          )}
        />
      </div>
    </section>
  )
}

export default Hero
