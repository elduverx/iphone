import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { processSteps } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRightIcon, CheckIcon } from './Icons';

const HowItWorks = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#process_title', { y: 0, opacity: 1 })
    const cleanups = [animateBatch('.g_step'), animateBatch('.g_guarantee')]
    return () => cleanups.forEach((cleanup) => cleanup?.())
  }, []);

  return (
    <section id="proceso" className="common-padding">
      <div className="screen-max-width">
        <h2 id="process_title" className="section-heading">{t('process.title')}</h2>
        <p className="text-gray-200 text-xl md:text-2xl font-semibold mt-4">{t('process.subtitle')}</p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 mt-12 md:mt-16">
          {processSteps.map((step, i) => (
            <li key={i} className="g_step opacity-0 translate-y-[60px] flex gap-5">
              <span className="flex-center shrink-0 w-11 h-11 rounded-full border border-neutral-700 text-forge font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="text-white text-2xl font-semibold mb-1">{tr(step.title)}</p>
                <p className="hiw-text">{tr(step.description)}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-16">
          {t('process.guarantees').map((guarantee) => (
            <li key={guarantee} className="g_guarantee glass-card opacity-0 translate-y-[60px] !rounded-2xl flex items-center gap-3 p-5 font-semibold text-gray-200">
              <CheckIcon />
              {guarantee}
            </li>
          ))}
        </ul>

        <div className="flex-center mt-12">
          <a href="#contacto" className="btn">
            {t('hero.cta')}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
