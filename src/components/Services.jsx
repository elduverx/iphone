import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { capabilities, services } from '../constants';
import { getServicePage } from '../content/services';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon } from './Icons';
import SmartLink from './SmartLink';
import PriceTag from './PriceTag';

// Cada tarjeta entera lleva a la página del servicio; las `featured` ocupan dos columnas. Con el orden de
// constants (destacada, 4 normales, destacada, 4 normales, destacada, 2 normales) y la de presupuesto a dos
// columnas al final, las filas quedan completas: 18 huecos, 6 filas de 3 y 9 de 2.
const Services = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#services_title', { y: 0, opacity: 1 })
    return animateBatch('.g_service')
  }, []);

  return (
    <section id="servicios" className="common-padding">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h2 id="services_title" className="section-heading">{t('services.title')}</h2>
          <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => {
            const isFeatured = service.featured;
            return (
              <SmartLink
                key={service.id}
                to={`/servicios/${service.page}`}
                className={`platform-card spotlight group g_service overflow-hidden ${isFeatured ? 'md:col-span-2 bg-gradient-to-br from-[#1f0f06] via-neutral-950 to-neutral-950' : ''}`}
              >
                <p className="text-forge text-sm font-semibold mb-3 md:mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className={`font-semibold mb-3 ${isFeatured ? 'text-3xl md:text-4xl max-w-lg' : 'text-2xl'}`}>{tr(service.title)}</h3>
                <p className={`text-gray leading-relaxed mb-5 md:mb-6 ${isFeatured ? 'md:text-lg max-w-xl' : ''}`}>{tr(service.description)}</p>
                <PriceTag price={getServicePage(service.page).price} className={`mt-auto mb-4 text-gray-200 ${isFeatured ? 'text-lg' : ''}`} />
                <span className="text-link flex items-center text-sm font-semibold">
                  {t('pages.viewService')}
                  <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </SmartLink>
            );
          })}

          <div className="g_service opacity-0 translate-y-[60px] md:col-span-2 flex flex-col sm:flex-row sm:items-end justify-between gap-6 rounded-3xl p-6 md:p-8 border border-forge/40 bg-gradient-to-br from-forge/15 via-neutral-950 to-neutral-950 shadow-[0_0_80px_-30px_rgba(255,106,26,0.5)]">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold">{t('services.ctaTitle')}</h3>
              <p className="text-gray-200 mt-3 max-w-xl leading-relaxed">{t('services.ctaText')}</p>
            </div>
            <a href="#contacto" className="btn !my-0 shrink-0">
              {t('hero.cta')}
              <ArrowRightIcon />
            </a>
          </div>
        </div>

        <p className="text-gray text-sm font-semibold mt-14 mb-4">{t('services.more')}</p>
        <ul className="flex flex-wrap gap-2">
          {capabilities.map((capability) => (
            <li key={capability.en} className="chip !text-sm !px-4 !py-2">{tr(capability)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
