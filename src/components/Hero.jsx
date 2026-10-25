import { contact, publishedApps, showPrices } from '../constants';
import { getServicePage } from '../content/services';
import { priceText, whatsappUrl } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon, ChatIcon, CheckIcon } from './Icons';
import HeroStage from './HeroStage';

const appPrice = getServicePage('desarrollo-apps-ios').price;
// Ejemplo real del hero: la app publicada que hicimos para un cliente
const clientApp = publishedApps.find((app) => app.client && app.video);

// Mensaje, botones y confianza a la vista desde el primer momento (entrada en CSS, .hero-in, sin esperar a
// JavaScript). Debajo asoma el iPhone, que se endereza con el scroll, y encima se superpone el proyecto de cliente.
const Hero = () => {
  const { t, tr, lang } = useLanguage();
  const trust = [
    `${publishedApps.length} ${t('hero.published')}`,
    ...(showPrices[lang] ? [priceText(appPrice, lang, t('hero.mvp'), t('price.vat'))] : []),
    ...t('hero.trust'),
  ];

  // Rótulo del proyecto: encima del vídeo en escritorio, debajo en móvil
  const caption = (className) => (
    <a href={clientApp.url} target="_blank" rel="noopener noreferrer" className={`group text-left ${className}`}>
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forge-light">
        <span className="w-1.5 h-1.5 rounded-full bg-forge" />
        {t('hero.clientLabel')}
      </span>
      <span className="flex items-center gap-3 mt-3">
        <img src={clientApp.icon} alt="" width={48} height={48} className="w-12 h-12 rounded-[22%] border border-white/10" />
        <span>
          <span className="block text-xl font-semibold">{clientApp.name}</span>
          <span className="block text-sm text-gray-200">{tr(clientApp.tagline)}</span>
        </span>
      </span>
      <span className="text-link flex items-center gap-1 text-sm font-semibold mt-3">
        {t('highlights.appStore')}
        <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );

  return (
    <section id="top" className="w-full bg-black relative overflow-hidden pt-12 md:pt-16 pb-16 md:pb-24">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="glow-orb w-[40vw] h-[40vw] bg-forge/30 top-[30%] left-[30%]" aria-hidden="true" />
      <div className="glow-orb w-[30vw] h-[30vw] bg-ember/15 top-[45%] left-[50%] [animation-delay:-7s]" aria-hidden="true" />

      <div className="relative w-full flex-center flex-col px-5 text-center">
        <p className="hero-in flex items-center gap-2 text-gray-100 font-semibold text-sm md:text-lg">
          <span className="w-2 h-2 rounded-full bg-forge animate-pulse" />
          {t('hero.eyebrow')}
        </p>
        <h1 className="hero-in hero-headline [animation-delay:80ms]">
          {t('hero.title')}{' '}
          <span className="text-gradient-forge">{t('hero.titleAccent')}</span>
        </h1>
        <p className="hero-in text-gray-200 text-base md:text-xl font-semibold max-w-2xl [animation-delay:160ms]">{t('hero.subtitle')}</p>

        <div className="hero-in flex flex-col sm:flex-row justify-center gap-3 mt-7 w-full sm:w-auto [animation-delay:240ms]">
          <a href="#contacto" className="btn !my-0 !py-3.5 text-lg">
            {t('hero.cta')}
            <ArrowRightIcon />
          </a>
          <a href={whatsappUrl(contact.whatsapp, t('contact.whatsappMessage'))} target="_blank" rel="noopener noreferrer" className="btn-ghost !my-0 !py-3.5">
            <ChatIcon width={20} height={20} className="text-[#25D366]" />
            {t('hero.whatsapp')}
          </a>
        </div>

        <a href="#servicios" className="hero-in group text-link flex items-center gap-1 mt-5 text-sm md:text-base font-semibold max-w-xl [animation-delay:280ms]">
          {t('hero.fixLink')}
          <ArrowRightIcon className="shrink-0 transition-transform group-hover:translate-x-1" />
        </a>

        <ul className="hero-in flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-sm text-gray-200 [animation-delay:320ms]">
          {trust.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckIcon width={16} height={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <HeroStage />

      {/* proyecto de cliente: tarjeta de cristal superpuesta a la parte baja del iPhone */}
      <div className="relative z-10 -mt-36 sm:-mt-44 md:-mt-52 px-5">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-[2.2rem] p-2 bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)]">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-black shadow-[0_40px_120px_-30px_rgba(124,77,255,0.45)]">
              <video
                src={clientApp.video}
                poster={clientApp.featured.image}
                aria-label={clientApp.name}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-[4/3] md:aspect-video object-cover object-[88%_50%] md:object-center"
              />
              {/* el vídeo deja la mitad izquierda oscura: ahí va el rótulo en escritorio */}
              {caption('max-md:hidden absolute left-10 top-1/2 -translate-y-1/2 max-w-[34%]')}
            </div>
            {caption('md:hidden block px-3 pt-5 pb-3')}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
