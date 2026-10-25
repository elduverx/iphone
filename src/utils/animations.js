import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  })

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  )

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  )
}
// Revela en cascada los elementos de una cuadrícula a medida que entran en pantalla.
// Usa IntersectionObserver (mide la posición real en cada momento) en vez de calcularla
// al montar, que tras la hidratación del HTML pre-renderizado puede no ser la definitiva.
export const animateBatch = (target, animationProps) => {
  const elements = gsap.utils.toArray(target)
  if (!elements.length || typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target)
    if (!visible.length) return
    visible.forEach((el) => observer.unobserve(el))
    gsap.to(visible, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
      ...animationProps,
    })
  }, { rootMargin: '0px 0px -10% 0px' })

  elements.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
