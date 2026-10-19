import { lazy, Suspense } from 'react';
import { ClientOnly } from 'vite-react-ssg';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import AppStoreApps from '../components/AppStoreApps';
import Features from '../components/Features';
import CodeShowcase from '../components/CodeShowcase';
import Services from '../components/Services';
import Engagement from '../components/Engagement';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Studio from '../components/Studio';
import Faq from '../components/Faq';
import Seo, { faqLd } from '../components/Seo';
import { brand, contact, faqs } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

// three.js va en un chunk aparte y solo se carga en el navegador
const Model = lazy(() => import('../components/Model'));
const modelFallback = <section className="common-padding min-h-[100vh]" />;

const Home = () => {
  const { t, tr } = useLanguage();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brand.name,
    url: `${brand.url}/`,
    logo: `${brand.url}/favicon.svg`,
    image: `${brand.url}/og.png`,
    email: contact.email,
    telephone: contact.phoneLabel.replace(/\s/g, ''),
    description: t('meta.description'),
    areaServed: 'Worldwide',
    address: { '@type': 'PostalAddress', addressCountry: 'ES' },
    knowsLanguage: ['es', 'en'],
    serviceType: ['iOS app development', 'Apple Watch app development', 'Apple Vision Pro app development', 'App maintenance', 'App Store submission'],
  };

  return (
    <>
      <Seo
        title={t('meta.title')}
        description={t('meta.description')}
        path="/"
        jsonLd={[organization, faqLd(faqs.map((faq) => ({ q: tr(faq.q), a: tr(faq.a) })))]}
      />
      <Hero />
      <Highlights />
      <AppStoreApps />
      <ClientOnly>
        {() => (
          <Suspense fallback={modelFallback}>
            <Model />
          </Suspense>
        )}
      </ClientOnly>
      <Features />
      <CodeShowcase />
      <Services />
      <Engagement />
      <HowItWorks />
      <Testimonials />
      <Studio />
      <Faq />
    </>
  );
};

export default Home;
