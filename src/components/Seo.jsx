import { Head } from 'vite-react-ssg';
import { brand } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

// Meta por página: título, descripción, canonical, Open Graph y datos estructurados
const Seo = ({ title, description, path = '/', image = '/og.png', jsonLd = [], noindex = false }) => {
  const { lang } = useLanguage();
  const url = `${brand.url}${path}`;
  const fullTitle = title.includes(brand.name) ? title : `${title} · ${brand.name}`;

  return (
    <Head>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${brand.url}${image}`} />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Head>
  );
};

// Migas de pan para JSON-LD: [{ name, path }]
// eslint-disable-next-line react-refresh/only-export-components
export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${brand.url}${item.path}`,
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
