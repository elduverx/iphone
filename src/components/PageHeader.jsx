import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SmartLink from './SmartLink';

// Cabecera de subpágina: migas, antetítulo, H1, subtítulo y acciones
const PageHeader = ({ crumbs = [], eyebrow, title, subtitle, icon, children }) => {
  const ref = useRef();

  useGSAP(() => {
    gsap.fromTo('.ph-in', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 md:pt-24 pb-16 sm:px-10 px-5">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="glow-orb w-[45vw] h-[30vw] bg-forge/20 -top-[10%] left-1/4" aria-hidden="true" />
      <div className="screen-max-width relative">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="ph-in flex flex-wrap items-center gap-2 text-xs text-gray mb-8">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < crumbs.length - 1 ? (
                  <SmartLink to={crumb.path} className="hover:text-white">{crumb.name}</SmartLink>
                ) : (
                  <span className="text-gray-200">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {icon && <div className="ph-in mb-6">{icon}</div>}
        {eyebrow && (
          <p className="ph-in flex items-center gap-2 text-forge-light font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-forge" />
            {eyebrow}
          </p>
        )}
        <h1 className="ph-in text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl">{title}</h1>
        {subtitle && <p className="ph-in text-gray-200 text-lg md:text-2xl font-semibold mt-6 max-w-3xl">{subtitle}</p>}
        {children && <div className="ph-in mt-8">{children}</div>}
      </div>
    </section>
  );
};

export default PageHeader;
