import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { modelApps as apps, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";
import { useLanguage } from "../i18n/LanguageContext";

// IPhone.jsx espera { color, img }: la captura de la app se pinta en la pantalla
const toModelItem = (app) => ({ title: app.name, color: app.phoneColor, img: app.screen });

const Model = () => {
  const { t, tr } = useLanguage();
  const sectionRef = useRef();
  const [inView, setInView] = useState(false);
  const [size, setSize] = useState('small');
  const [selectedApp, setSelectedApp] = useState(apps[0]);
  const model = toModelItem(selectedApp);

  // camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = useRef(gsap.timeline());

  // monta el canvas 3D (y descarga el modelo) solo cuando la sección se acerca
  useEffect(() => {
    // esta sección carga en diferido: recalcula las posiciones de scroll del resto
    ScrollTrigger.refresh();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px 0px' });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // las vistas 3D aún no están montadas (carga diferida)
    if (!document.getElementById('view1')) return;

    if(size === 'large') {
      animateWithGsapTimeline(tl.current, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGsapTimeline(tl.current, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
    // solo se anima al cambiar de tamaño; la rotación se lee en ese momento
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, []);

  return (
    <section ref={sectionRef} className="common-padding">
      <div className="screen-max-width">
        <h2 id="heading" className="section-heading">
          {t('model.title')}
        </h2>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {inView && (
              <>
                <ModelView
                  index={1}
                  groupRef={small}
                  gsapType="view1"
                  controlRef={cameraControlSmall}
                  setRotationState={setSmallRotation}
                  item={model}
                  size={size}
                />

                <ModelView
                  index={2}
                  groupRef={large}
                  gsapType="view2"
                  controlRef={cameraControlLarge}
                  setRotationState={setLargeRotation}
                  item={model}
                  size={size}
                />

                <Canvas
                  className="w-full h-full"
                  style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden'
                  }}
                  eventSource={document.getElementById('root')}
                >
                  <View.Port />
                </Canvas>
              </>
            )}
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-semibold text-center">{selectedApp.name}</p>
            <p className="text-sm font-light text-center text-gray mb-1">{tr(selectedApp.description)}</p>
            <p className="text-xs text-center text-gray mb-5">{t('model.hint')}</p>

            <div className="flex-center">
              <div role="radiogroup" aria-label={t('model.choose')} className="color-container">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    role="radio"
                    aria-checked={selectedApp.id === app.id}
                    aria-label={app.name}
                    onClick={() => setSelectedApp(app)}
                    className={`w-8 h-8 mx-1.5 rounded-[9px] overflow-hidden transition-all ${selectedApp.id === app.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img src={app.icon} alt="" className="w-full h-full" />
                  </button>
                ))}
              </div>

              <div role="radiogroup" aria-label={t('model.size')} className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={size === value}
                    className="size-btn"
                    style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
