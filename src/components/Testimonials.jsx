import { useGSAP } from '@gsap/react'
import { animateBatch } from '../utils/animations';
import { testimonials } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

// Solo se muestra cuando hay testimonios reales en constants
const Testimonials = () => {
  const { t, tr } = useLanguage();

  useGSAP(() => {
    if (testimonials.length) return animateBatch('.g_quote')
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h2 className="text-gray text-3xl md:text-5xl lg:text-6xl font-medium mb-12">{t('testimonials.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <figure key={item.name} className="g_quote glass-card spotlight opacity-0 translate-y-[60px] p-8 flex flex-col">
              <blockquote className="text-xl text-gray-200 leading-relaxed flex-1">“{tr(item.quote)}”</blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray">{tr(item.role)} · {item.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
