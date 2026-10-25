import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Services from '../components/Services';
import AppStoreApps from '../components/AppStoreApps';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Studio from '../components/Studio';
import Faq from '../components/Faq';
import Seo, { faqLd } from '../components/Seo';
import { APP_STORE_DEVELOPER_URL, brand, contact, faqs, showPrices } from '../constants';
import { getServicePage } from '../content/services';
import { priceText } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { localizePath } from '../i18n/paths';

const appPrice = getServicePage('desarrollo-apps-ios').price;

// Orden pensado para quien llega desde un anuncio: qué hacemos, prueba de que lo hacemos bien,
// cómo trabajamos y resolver dudas antes del formulario (que va en el layout, al final de cada página)
const Home = () => {
  const { t, tr, lang } = useLanguage();
  // el precio de partida en la descripción mejora el clic desde Google (solo donde se publican precios)
  const description = showPrices[lang]
    ? `${t('meta.description')} ${priceText(appPrice, lang, t('hero.mvp'), t('price.vat'))}.`
    : t('meta.description');
  const url = `${brand.url}${localizePath('/', lang)}`;

  // nombre del sitio en los resultados de Google
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url,
    inLanguage: lang,
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: brand.name,
    url,
    logo: `${brand.url}/logo.png`,
    image: `${brand.url}${lang === 'en' ? '/og-en.png' : '/og.png'}`,
    email: contact.email,
    telephone: contact.phoneLabel.replace(/\s/g, ''),
    description,
    ...(showPrices[lang] && { priceRange: lang === 'en' ? '$$' : '€€' }),
    sameAs: [APP_STORE_DEVELOPER_URL],
    areaServed: 'Worldwide',
    address: { '@type': 'PostalAddress', addressCountry: 'ES' },
    knowsLanguage: ['es', 'en'],
    serviceType: ['iOS app development', 'Apple Watch app development', 'Apple Vision Pro app development', 'App maintenance', 'App Store submission'],
  };

  return (
    <>
      <Seo
        title={t('meta.title')}
        description={description}
        path="/"
        jsonLd={[website, organization, faqLd(faqs.map((faq) => ({ q: tr(faq.q), a: tr(faq.a) })))]}
      />
      <Hero />
      <Highlights />
      <Services />
      <AppStoreApps />
      <HowItWorks />
      <Testimonials />
      <Studio />
      <Faq />
    </>
  );
};

export default Home;
