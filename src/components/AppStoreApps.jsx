import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { APP_STORE_DEVELOPER_URL, publishedApps } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon } from './Icons';
import SmartLink from './SmartLink';
import { VisionWindow } from './devices/DeviceFrames';
import { VisionRoom, VisionTicTacToe } from './devices/DeviceScreens';

const Stars = ({ value }) => (
  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ember" aria-label={`${value} / 5`}>
    {'★★★★★'.slice(0, Math.round(value))}
    <span className="text-gray">{value.toFixed(1).replace('.', ',')}</span>
  </span>
);

const AppStoreApps = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#store_title', { y: 0, opacity: 1 })
    return animateBatch('.g_store')
  }, []);

  return (
    <section id="app-store" className="common-padding relative overflow-hidden">
      <div className="glow-orb w-[40vw] h-[30vw] bg-forge/10 top-1/4 -left-[10%]" aria-hidden="true" />
      <div className="screen-max-width relative">
        <div className="md:flex items-end justify-between gap-10 mb-12">
          <div>
            <h2 id="store_title" className="section-heading">{t('store.title')}</h2>
            <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4 max-w-2xl">{t('store.subtitle')}</p>
          </div>
          <a href={APP_STORE_DEVELOPER_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
            {t('store.all')}
            <ArrowRightIcon />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-4 md:gap-5">
          {publishedApps.map((app) => (
            <article
              key={app.id}
              className={`g_store glass-card spotlight group opacity-0 translate-y-[60px] flex flex-col overflow-hidden hover:border-white/20 transition-colors ${app.featured ? 'sm:col-span-2 lg:flex-row' : 'p-6 md:p-7'} ${app.platforms.includes('Vision Pro') ? '!border-forge/40' : ''}`}
            >
              {app.featured && (
                <div className="relative lg:order-2 lg:w-[55%] h-56 sm:h-64 lg:h-auto overflow-hidden">
                  {app.featured.image ? (
                    <img src={app.featured.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[70%_50%] transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex-center text-[6.5px] sm:text-[7.5px]">
                      <VisionRoom />
                      <VisionWindow className="relative transition-transform duration-700 group-hover:scale-105"><VisionTicTacToe /></VisionWindow>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0c0c0d] via-transparent to-transparent" />
                </div>
              )}
              <div className={`flex flex-col flex-1 ${app.featured ? 'p-6 md:p-8' : ''}`}>
              <div className="flex items-start gap-4">
                <img src={app.icon} alt="" width={72} height={72} loading="lazy" className="w-[72px] h-[72px] rounded-[22%] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] border border-white/10" />
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold truncate">{app.name}</h3>
                  <p className="text-sm text-gray">{tr(app.category)} · {tr(app.price)}</p>
                  {app.rating && <Stars value={app.rating} />}
                </div>
              </div>

              <p className="text-gray-200 mt-5 mb-5 leading-relaxed">{tr(app.tagline)}</p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {app.platforms.map((platform) => (
                  <span key={platform} className="chip !bg-forge/15 !text-forge-light">{platform}</span>
                ))}
                {app.tech.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-link flex items-center text-sm font-semibold">
                  {t('highlights.appStore')}
                  <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                </a>
                {(app.caseSlug || app.servicePage) && (
                  <SmartLink
                    to={app.caseSlug ? `/casos/${app.caseSlug}` : `/servicios/${app.servicePage}`}
                    className="text-sm font-semibold text-gray-200 hover:text-white flex items-center"
                  >
                    {app.caseSlug ? t('pages.viewCase') : t('pages.viewService')}
                    <ArrowRightIcon className="ml-1" />
                  </SmartLink>
                )}
              </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AppStoreApps
