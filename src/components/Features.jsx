import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../utils/animations';
import { techStack } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import EcosystemShowcase from './EcosystemShowcase';
import Marquee from './Marquee';

const half = Math.ceil(techStack.length / 2);

const Features = () => {
  const { t } = useLanguage();

  useGSAP(() => {
    animateWithGsap('#features_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
    animateWithGsap(
      '.g_text',
      {y:0, opacity: 1,ease: 'power2.inOut',duration: 1}
    )
  }, []);

  return (
    <section id="ecosistema" className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h2 id="features_title" className="section-heading">{t('features.title')}</h2>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-20 mb-20 md:pl-24">
            <p className="text-5xl lg:text-7xl font-semibold">{t('features.headline1')}</p>
            <p className="text-5xl lg:text-7xl font-semibold text-gradient-forge g_grow scale-90 opacity-0">{t('features.headline2')}</p>
          </div>

          <EcosystemShowcase />

          <div className="feature-text-container">
            <div className="flex-1 flex-center">
              <p className="feature-text g_text">
                {t('features.text1a')}{' '}
                <span className="text-white">{t('features.text1b')}</span>
                {t('features.text1c')}
              </p>
            </div>

            <div className="flex-1 flex-center">
              <p className="feature-text g_text">
                {t('features.text2a')}{' '}
                <span className="text-white">{t('features.text2b')}</span>
                {t('features.text2c')}
              </p>
            </div>
          </div>

          <div className="w-full mt-24">
            <p className="text-gray text-sm font-semibold text-center mb-8">{t('features.stack')}</p>
            <div className="flex flex-col gap-3">
              <Marquee
                items={techStack.slice(0, half)}
                duration={50}
                renderItem={(tech) => <span className="chip !text-sm !px-4 !py-2 mx-1.5">{tech}</span>}
              />
              <Marquee
                items={techStack.slice(half)}
                duration={50}
                reverse
                renderItem={(tech) => <span className="chip !text-sm !px-4 !py-2 mx-1.5">{tech}</span>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
