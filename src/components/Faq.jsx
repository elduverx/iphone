import { useGSAP } from '@gsap/react'
import { animateBatch, animateWithGsap } from '../utils/animations';
import { faqs as defaultFaqs } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { PlusIcon } from './Icons';

// items: [{ q, a }] ya traducidos; por defecto, las FAQ generales de la home en { es, en }
const Faq = ({ items, title }) => {
  const { t, tr } = useLanguage();
  const list = items ?? defaultFaqs.map((faq) => ({ q: tr(faq.q), a: tr(faq.a) }));

  useGSAP(() => {
    animateWithGsap('#faq_title', { y: 0, opacity: 1 })
    return animateBatch('.g_faq')
  }, []);

  return (
    <section id="faq" className="common-padding">
      <div className="screen-max-width max-w-4xl">
        <h2 id="faq_title" className="section-heading mb-12">{title ?? t('faq.title')}</h2>

        <div>
          {list.map((faq, i) => (
            <details key={i} className="g_faq opacity-0 translate-y-[60px] group border-b border-neutral-700">
              <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none text-xl md:text-2xl font-semibold [&::-webkit-details-marker]:hidden">
                {faq.q}
                <PlusIcon className="shrink-0 text-gray transition-transform group-open:rotate-45" />
              </summary>
              <p className="text-gray text-lg pb-6 max-w-3xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
