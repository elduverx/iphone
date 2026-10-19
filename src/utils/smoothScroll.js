import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import 'lenis/dist/lenis.css'
gsap.registerPlugin(ScrollTrigger)

// Scroll suave sincronizado con GSAP ScrollTrigger
const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.1,
    anchors: { offset: -48 }, // altura del navbar fijo
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // el gestor de rutas lo usa para subir al inicio o ir a un ancla
  window.__lenis = lenis
  return lenis
}

// Brillo que sigue al cursor en las tarjetas con la clase .spotlight
const initSpotlight = () => {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest?.('.spotlight')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--y', `${e.clientY - rect.top}px`)
  })
}

// Solo en el navegador: respeta "reducir movimiento" (sin scroll suave, animaciones casi instantáneas)
export const initClient = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(20)
  } else {
    initSmoothScroll()
  }
  initSpotlight()
}
