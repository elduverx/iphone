import { useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { getServicePage, servicePages } from '../content/services';
import { getCasePage } from '../content/cases';
import { brand, publishedApps } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { animateBatch } from '../utils/animations';
import Seo, { breadcrumbLd, faqLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import Faq from '../components/Faq';
import SmartLink from '../components/SmartLink';
import { ArrowRightIcon, PlatformIcon } from '../components/Icons';
import { DeviceStage } from '../components/devices/DeviceDemo';
import NotFound from './NotFound';

const SectionTitle = ({ children }) => (
  <h2 className="text-gray text-3xl md:text-5xl font-medium mb-10">{children}</h2>
);

const ServicePage = () => {
  const { slug } = useParams();
  const { t, tr } = useLanguage();
  const page = getServicePage(slug);

  useGSAP(() => {
    return animateBatch('.g_reveal');
  }, { dependencies: [slug] });

  if (!page) return <NotFound />;

  const copy = tr(page);
  const path = `/servicios/${page.slug}`;
  const crumbs = [
    { name: t('pages.home'), path: '/' },
    { name: t('pages.services'), path: '/servicios' },
    { name: copy.eyebrow, path },
  ];
  const proofApps = publishedApps.filter((app) => page.proof.apps.includes(app.id));
  const proofCases = page.proof.cases.map(getCasePage).filter(Boolean);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.metaTitle,
    description: copy.metaDescription,
    serviceType: copy.eyebrow,
    areaServed: 'Worldwide',
    provider: { '@type': 'ProfessionalService', name: brand.name, url: `${brand.url}/` },
    url: `${brand.url}${path}`,
  };

  return (
    <>
      <Seo title={copy.metaTitle} description={copy.metaDescription} path={path} jsonLd={[serviceLd, breadcrumbLd(crumbs), faqLd(copy.faqs)]} />

      <PageHeader
        crumbs={crumbs}
        eyebrow={copy.eyebrow}
        title={copy.h1}
        subtitle={copy.subtitle}
        icon={<div className="icon-tile"><PlatformIcon id={page.icon} width={30} height={30} strokeWidth={1.3} /></div>}
      >
        <div className="flex flex-wrap gap-x-4">
          <a href="#contacto" className="btn !my-0">{t('service.cta')}<ArrowRightIcon /></a>
          {proofCases[0] && <SmartLink to={`/casos/${proofCases[0].slug}`} className="btn-ghost !my-0">{t('pages.viewCase')}: {proofCases[0].name}</SmartLink>}
        </div>
      </PageHeader>

      {/* problemas */}
      <section className="common-padding !pt-10">
        <div className="screen-max-width">
          <SectionTitle>{t('service.problems')}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {copy.problems.map((problem, i) => (
              <div key={i} className="g_reveal glass-card spotlight opacity-0 translate-y-[60px] p-6 md:p-8 flex gap-4">
                <span className="text-forge text-2xl leading-none mt-0.5" aria-hidden="true">●</span>
                <p className="text-lg md:text-xl text-gray-200 font-semibold">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* entregables */}
      <section className="common-padding bg-zinc">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <SectionTitle>{t('service.deliverables')}</SectionTitle>
            <p className="text-gray text-lg">{copy.subtitle}</p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {copy.deliverables.map((item, i) => (
              <li key={i} className="g_reveal opacity-0 translate-y-[60px] border-t border-neutral-700 pt-5">
                <p className="text-forge text-sm font-semibold mb-2">{String(i + 1).padStart(2, '0')}</p>
                <p className="text-white text-lg font-semibold">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* demo en vídeo */}
      {page.demo && (
        <section className="common-padding">
          <div className="screen-max-width">
            <SectionTitle>{t('service.demo')}</SectionTitle>
            <DeviceStage device={page.demo} label={copy.demoCaption} className="h-[320px] sm:h-[420px] md:h-[520px]" />
            {copy.demoCaption && <p className="text-gray text-sm mt-4">{copy.demoCaption}</p>}
          </div>
        </section>
      )}

      {/* proceso */}
      <section className="common-padding">
        <div className="screen-max-width">
          <SectionTitle>{t('service.process')}</SectionTitle>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {copy.process.map((step, i) => (
              <li key={i} className="g_reveal opacity-0 translate-y-[60px] flex gap-4">
                <span className="flex-center shrink-0 w-10 h-10 rounded-full border border-neutral-700 text-forge font-semibold">{i + 1}</span>
                <div>
                  <p className="text-xl font-semibold mb-1">{step.title}</p>
                  <p className="text-gray">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* prueba: apps publicadas y casos */}
      {(proofApps.length > 0 || proofCases.length > 0) && (
        <section className="common-padding bg-zinc">
          <div className="screen-max-width">
            <SectionTitle>{t('service.proof')}</SectionTitle>
            {proofCases.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
                {proofCases.map((item) => (
                  <SmartLink key={item.slug} to={`/casos/${item.slug}`} className="g_reveal glass-card spotlight group opacity-0 translate-y-[60px] p-6 flex items-center gap-4 hover:border-white/20 transition-colors">
                    <img src={item.icon} alt="" width={56} height={56} loading="lazy" className="w-14 h-14 rounded-[22%] border border-white/10" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-lg">{item.name}</span>
                      <span className="block text-sm text-gray">{tr(item).summary}</span>
                    </span>
                    <ArrowRightIcon className="text-gray group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </SmartLink>
                ))}
              </div>
            )}
            {proofApps.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {proofApps.map((app) => (
                  <a
                    key={app.id}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="g_reveal glass-card spotlight group opacity-0 translate-y-[60px] flex flex-col p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img src={app.icon} alt="" width={56} height={56} loading="lazy" className="w-14 h-14 rounded-[22%] border border-white/10" />
                      <div className="min-w-0">
                        <p className="font-semibold text-lg truncate">{app.name}</p>
                        <p className="text-sm text-gray">{tr(app.category)}</p>
                      </div>
                    </div>
                    <p className="text-gray-200 mt-4 mb-5 leading-relaxed">{tr(app.tagline)}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {app.platforms.map((platform) => (
                        <span key={platform} className="chip !bg-forge/15 !text-forge-light">{platform}</span>
                      ))}
                    </div>
                    <span className="mt-auto text-link flex items-center text-sm font-semibold">
                      {t('highlights.appStore')}
                      <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Faq items={copy.faqs} title={t('service.faq')} />

      {/* otros servicios */}
      <section className="common-padding !pt-0">
        <div className="screen-max-width">
          <SectionTitle>{t('service.related')}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {page.related.map((relatedSlug) => {
              const related = servicePages.find((item) => item.slug === relatedSlug);
              if (!related) return null;
              return (
                <SmartLink key={relatedSlug} to={`/servicios/${relatedSlug}`} className="glass-card spotlight group p-6 hover:border-white/20 transition-colors">
                  <PlatformIcon id={related.icon} width={26} height={26} strokeWidth={1.4} className="text-white mb-4" />
                  <p className="text-sm text-forge-light font-semibold">{tr(related).eyebrow}</p>
                  <p className="text-lg font-semibold mt-1">{tr(related).h1}</p>
                  <span className="text-gray text-sm flex items-center mt-4 group-hover:text-white">
                    {t('pages.viewService')}
                    <ArrowRightIcon className="ml-1" />
                  </span>
                </SmartLink>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
