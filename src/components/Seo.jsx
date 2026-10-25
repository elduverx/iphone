import { Head } from 'vite-react-ssg';
import { brand } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { localizePath } from '../i18n/paths';

// Google corta la descripción hacia los 155 caracteres: se recorta en un espacio, nunca a mitad de palabra
const MAX_DESCRIPTION = 155;
const clip = (text) => {
  if (text.length <= MAX_DESCRIPTION) return text;
  const cut = text.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.:;]+$/, '')}…`;
};

// Código de verificación de Google Search Console (opcional; también se puede verificar por DNS)
const siteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;

// Imagen para redes de cada idioma (la española lleva el precio del MVP; la inglesa, no)
const shareImages = { es: '/og.png', en: '/og-en.png' };

// Meta por página: título, descripción, canonical, hreflang, Open Graph, Twitter y datos estructurados.
// `path` es siempre la ruta en español; la versión en inglés se calcula con localizePath.
const Seo = ({ title, description, path = '/', jsonLd = [], noindex = false }) => {
  const { lang } = useLanguage();
  const alternates = { es: `${brand.url}${path}`, en: `${brand.url}${localizePath(path, 'en')}` };
  const url = alternates[lang];
  const fullTitle = title.includes(brand.name) ? title : `${title} · ${brand.name}`;
  const text = clip(description);
  const imageUrl = `${brand.url}${shareImages[lang]}`;

  return (
    <Head>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={text} />
      {noindex && <meta name="robots" content="noindex" />}
      {siteVerification && <meta name="google-site-verification" content={siteVerification} />}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="es" href={alternates.es} />
      <link rel="alternate" hrefLang="en" href={alternates.en} />
      <link rel="alternate" hrefLang="x-default" href={alternates.es} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={text} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'es' ? 'en_US' : 'es_ES'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={text} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Head>
  );
};

// Migas de pan para JSON-LD: [{ name, path }] con rutas en español
// eslint-disable-next-line react-refresh/only-export-components
export const breadcrumbLd = (items, lang) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${brand.url}${localizePath(item.path, lang)}`,
  })),
});

// eslint-disable-next-line react-refresh/only-export-components
export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});

export default Seo;
