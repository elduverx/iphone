import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/all';
import { LanguageProvider } from './i18n/LanguageContext';
import { getServicePage } from './content/services';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Al cambiar de ruta: sube al inicio o baja a la sección del hash, y recalcula las animaciones de scroll
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = window.__lenis;
    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      lenis ? lenis.scrollTo(target, { offset: -48 }) : target.scrollIntoView();
    };

    if (!hash) {
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
      const refresh = setTimeout(() => ScrollTrigger.refresh(), 0);
      return () => clearTimeout(refresh);
    }

    // el 3D y los vídeos se montan después de hidratar y empujan el contenido: se corrige una segunda vez
    const first = setTimeout(scrollToHash, 150);
    const second = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToHash();
    }, 1200);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, [pathname, hash]);

  return null;
};

// Layout común: todas las páginas terminan con el contacto, así "Hablemos" siempre lleva a #contacto
const App = () => {
  const { pathname } = useLocation();
  const service = pathname.startsWith('/servicios/') ? getServicePage(pathname.split('/')[2]) : null;

  return (
    <LanguageProvider>
      <ScrollManager />
      <main className="bg-black overflow-x-clip">
        <Navbar />
        <Outlet />
        <Contact key={pathname} defaultNeed={service?.need} />
        <Footer />
        <WhatsAppButton />
      </main>
    </LanguageProvider>
  )
}

export default App
