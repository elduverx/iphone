import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { audiences, services } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon } from './Icons';
import SmartLink from './SmartLink';

// Tarjetas destacadas del bento (ocupan dos columnas)
const featured = ['new-app', 'rescue', 'spatial'];

const Services = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#services_title', { y: 0, opacity: 1 })
    const cleanups = [animateBatch('.g_service'), animateBatch('.g_audience')]
    return () => cleanups.forEach((cleanup) => cleanup?.())
  }, []);

  return (
    <section id="servicios" className="common-padding">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h2 id="services_title" className="section-heading">{t('services.title')}</h2>
          <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-4 md:gap-5">
          {services.map((service, i) => {
            const isFeatured = featured.includes(service.id);
            return (
            <article
              key={service.id}
              className={`platform-card spotlight g_service overflow-hidden ${isFeatured ? 'md:col-span-2 bg-gradient-to-br from-[#1f0f06] via-neutral-950 to-neutral-950' : ''}`}
            >
              {isFeatured && (
                <span className="absolute -right-4 -bottom-10 text-[11rem] leading-none font-bold text-white/[0.03] select-none" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <p className="text-forge text-sm font-semibold mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className={`font-semibold mb-3 ${isFeatured ? 'text-3xl md:text-4xl max-w-lg' : 'text-2xl'}`}>{tr(service.title)}</h3>
              <p className={`text-gray leading-relaxed mb-6 ${isFeatured ? 'text-lg max-w-xl' : ''}`}>{tr(service.description)}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
              {service.page && (
                <SmartLink to={`/servicios/${service.page}`} className="text-link flex items-center text-sm font-semibold mt-6 relative z-10">
                  {t('pages.viewService')}
                  <ArrowRightIcon className="ml-1" />
                </SmartLink>
              )}
            </article>
            );
          })}
        </div>

        <h3 className="text-gray text-3xl md:text-5xl font-medium mt-28 mb-10">{t('services.audiences')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {audiences.map((audience) => (
            <div key={audience.id} className="g_audience opacity-0 translate-y-[60px] border-t border-neutral-700 pt-6">
              <p className="hiw-bigtext">{tr(audience.title)}</p>
              <p className="hiw-text mt-3">{tr(audience.description)}</p>
              {audience.page && (
                <SmartLink to={`/servicios/${audience.page}`} className="text-link flex items-center text-base font-semibold mt-4">
                  {t('pages.viewService')}
                  <ArrowRightIcon className="ml-1" />
                </SmartLink>
              )}
            </div>
          ))}
        </div>

        <div className="flex-center mt-16">
          <a href="#contacto" className="btn">{t('hero.cta')}</a>
        </div>
      </div>
    </section>
  )
}

export default Services
