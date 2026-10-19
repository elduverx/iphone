import { useGSAP } from '@gsap/react';
import { servicePages } from '../content/services';
import { useLanguage } from '../i18n/LanguageContext';
import { animateBatch } from '../utils/animations';
import Seo, { breadcrumbLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import SmartLink from '../components/SmartLink';
import { ArrowRightIcon, PlatformIcon } from '../components/Icons';

const ServicesIndex = () => {
  const { t, tr } = useLanguage();
  const crumbs = [{ name: t('pages.home'), path: '/' }, { name: t('pages.services'), path: '/servicios' }];

  useGSAP(() => {
    return animateBatch('.g_reveal');
  }, []);

  return (
    <>
      <Seo title={t('pages.servicesTitle')} description={t('pages.servicesDescription')} path="/servicios" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHeader crumbs={crumbs} eyebrow={t('pages.services')} title={t('pages.servicesH1')} subtitle={t('pages.servicesSubtitle')} />

      <section className="sm:px-10 px-5 pb-24">
        <div className="screen-max-width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {servicePages.map((page) => {
            const copy = tr(page);
            return (
              <SmartLink
                key={page.slug}
                to={`/servicios/${page.slug}`}
                className="g_reveal glass-card spotlight group opacity-0 translate-y-[60px] flex flex-col p-7 md:p-8 hover:border-white/20 transition-colors"
              >
                <div className="icon-tile mb-6"><PlatformIcon id={page.icon} width={28} height={28} strokeWidth={1.3} /></div>
                <p className="text-sm text-forge-light font-semibold">{copy.eyebrow}</p>
                <h2 className="text-2xl font-semibold mt-2 mb-3">{copy.h1}</h2>
                <p className="text-gray leading-relaxed mb-6">{copy.metaDescription}</p>
                <span className="mt-auto text-link flex items-center text-sm font-semibold">
                  {t('pages.viewService')}
                  <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </SmartLink>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ServicesIndex;
