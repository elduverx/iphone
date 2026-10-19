import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { engagements } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5 text-forge">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Engagement = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#engagement_title', { y: 0, opacity: 1 })
    return animateBatch('.g_plan')
  }, []);

  return (
    <section className="common-padding bg-zinc relative overflow-hidden">
      <div className="glow-orb w-[40vw] h-[25vw] bg-forge/10 top-1/2 left-1/4" aria-hidden="true" />
      <div className="screen-max-width relative">
        <h2 id="engagement_title" className="section-heading">{t('engagement.title')}</h2>
        <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4 mb-14">{t('engagement.subtitle')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {engagements.map((plan) => (
            <article
              key={plan.id}
              className={`g_plan glass-card spotlight opacity-0 translate-y-[60px] flex flex-col p-8 md:p-10 ${plan.highlight ? '!border-forge/50 shadow-[0_0_80px_-20px_rgba(255,106,26,0.45)]' : ''}`}
            >
              {plan.highlight && (
                <span className="self-start mb-5 px-3 py-1 rounded-full bg-forge/15 text-forge text-xs font-semibold">
                  {t('engagement.recommended')}
                </span>
              )}
              <h3 className="text-3xl font-semibold">{tr(plan.title)}</h3>
              <p className="text-gray text-lg mt-2 mb-8">{tr(plan.tagline)}</p>
              <ul className="flex flex-col gap-3 mb-10">
                {tr(plan.points).map((point, i) => (
                  <li key={i} className="flex gap-3 text-gray-200">
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="text-sm text-gray mb-1">{t('engagement.price')}</p>
                <a href="#contacto" className={plan.highlight ? 'btn !mb-0 inline-block' : 'btn-ghost !mb-0 inline-block'}>
                  {t('engagement.cta')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Engagement
