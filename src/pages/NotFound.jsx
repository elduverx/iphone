import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { ArrowRightIcon } from '../components/Icons';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t('notFound.title')} description={t('notFound.text')} path="/404" noindex />
      <PageHeader eyebrow="404" title={t('notFound.h1')} subtitle={t('notFound.text')}>
        <Link to="/" className="btn !my-0">{t('notFound.back')}<ArrowRightIcon /></Link>
      </PageHeader>
    </>
  );
};

export default NotFound;
