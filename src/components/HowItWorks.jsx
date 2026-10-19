import { logoMark } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateBatch, animateWithGsap } from '../utils/animations';
import { processSteps, stats } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

const HowItWorks = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom'
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    const cleanupSteps = animateBatch('.g_step')

    // contadores: de 0 al valor real al entrar en pantalla
    gsap.utils.toArray('.stat-number').forEach((el) => {
      const [, prefix, number, suffix] = el.dataset.value.match(/^(\D*)(\d+)(.*)$/) ?? [];
      if (!number) return;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: Number(number),
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`; },
        // al deshacer la animación, vuelve al valor real
        onComplete: () => { el.textContent = el.dataset.value; },
      });
    });

    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })

    return cleanupSteps
  }, []);

  return (
    <section id="proceso" className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={logoMark} alt="" width={160} height={160} className="drop-shadow-[0_0_60px_rgba(255,106,26,0.45)]" />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">{t('process.title')}</h2>
          <p className="hiw-subtitle">{t('process.subtitle')}</p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-10 md:mt-16 mb-24">
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

        <div className="hiw-text-container">
          {stats.map((stat) => (
            <div key={stat.value + stat.label.en} className="flex-1 flex justify-center flex-col g_fadeIn">
              <p data-value={stat.value} className="stat-number hiw-bigtext text-gradient-forge !text-transparent !text-6xl md:!text-8xl tabular-nums">{stat.value}</p>
              <p className="hiw-text">{tr(stat.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
