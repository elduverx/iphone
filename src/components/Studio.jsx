import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { logoMark } from '../utils';
import { pillars } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

const Studio = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#studio_title', { y: 0, opacity: 1 })
    return animateBatch('.g_pillar')
  }, []);

  return (
    <section id="estudio" className="common-padding bg-zinc relative overflow-hidden">
      <div className="glow-orb w-[35vw] h-[35vw] bg-forge/15 top-1/4 -left-[10%]" aria-hidden="true" />
      <div className="screen-max-width relative grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <img src={logoMark} alt="" width={72} height={72} className="mb-8 drop-shadow-[0_0_40px_rgba(255,106,26,0.5)]" />
          <h2 id="studio_title" className="section-heading">{t('studio.title')}</h2>
          <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4">{t('studio.subtitle')}</p>
          <ul className="flex flex-wrap gap-2 mt-8">
            {t('studio.facts').map((fact, i) => (
              <li key={i} className="chip !text-sm !px-4 !py-2">{fact}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {pillars.map((pillar, i) => (
            <article key={i} className="g_pillar glass-card spotlight opacity-0 translate-y-[60px] p-7 md:p-8">
              <p className="text-forge text-sm font-semibold mb-6">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">{tr(pillar.title)}</h3>
              <p className="text-gray leading-relaxed">{tr(pillar.description)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Studio
