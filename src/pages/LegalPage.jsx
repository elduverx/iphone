import { legal } from '../constants/legal';
import { useLanguage } from '../i18n/LanguageContext';
import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';

const paths = { legal: '/aviso-legal', privacy: '/privacidad', cookies: '/cookies' };

const LegalPage = ({ page }) => {
  const { t, tr } = useLanguage();
  const content = legal[page];
  const title = tr(content.title);

  return (
    <>
      <Seo title={title} description={tr(content.description)} path={paths[page]} />
      <PageHeader crumbs={[{ name: t('pages.home'), path: '/' }, { name: title, path: paths[page] }]} title={title} />
      <section className="sm:px-10 px-5 pb-24">
        <div className="screen-max-width max-w-3xl">
          {tr(content.body).map((paragraph, i) => (
            <p key={i} className="text-gray-200 text-lg leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
};

export default LegalPage;
