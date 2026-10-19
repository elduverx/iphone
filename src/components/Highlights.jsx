import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useLanguage } from "../i18n/LanguageContext"
import { ArrowRightIcon } from "./Icons"

import VideoCarousel from './VideoCarousel';

const Highlights = () => {
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 })
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
  }, [])

  return (
    <section id="apps" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h2 id="title" className="section-heading">{t('highlights.title')}</h2>

          <div className="flex flex-wrap items-end gap-5">
            <a href="#contacto" className="link">
              {t('highlights.contact')}
              <ArrowRightIcon className="ml-1" />
            </a>
            <a href="#servicios" className="link">
              {t('highlights.services')}
              <ArrowRightIcon className="ml-1" />
            </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
