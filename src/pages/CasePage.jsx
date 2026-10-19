import { useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { casePages, getCasePage } from '../content/cases';
import { getServicePage } from '../content/services';
import { brand } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { animateBatch } from '../utils/animations';
import Seo, { breadcrumbLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import SmartLink from '../components/SmartLink';
import { ArrowRightIcon } from '../components/Icons';
import { DeviceStage } from '../components/devices/DeviceDemo';
import NotFound from './NotFound';

const Block = ({ title, children }) => (
  <div className="g_reveal opacity-0 translate-y-[60px]">
    <h2 className="text-forge-light text-sm font-semibold uppercase tracking-wider mb-3">{title}</h2>
    <div className="text-gray-200 text-lg md:text-xl leading-relaxed">{children}</div>
  </div>
);

const CasePage = () => {
  const { slug } = useParams();
  const { t, tr } = useLanguage();
  const page = getCasePage(slug);

  useGSAP(() => {
    return animateBatch('.g_reveal');
  }, { dependencies: [slug] });

  if (!page) return <NotFound />;

  const copy = tr(page);
  const path = `/casos/${page.slug}`;
  const crumbs = [
    { name: t('pages.home'), path: '/' },
    { name: t('pages.cases'), path: '/casos' },
    { name: page.name, path },
  ];
  const others = casePages.filter((item) => item.slug !== page.slug);

  const workLd = {
    '@context': 'https://schema.org',
    '@type': page.appStoreUrl ? 'SoftwareApplication' : 'CreativeWork',
    name: page.name,
    description: copy.summary,
    applicationCategory: copy.category,
    operatingSystem: page.platforms.join(', '),
    creator: { '@type': 'Organization', name: brand.name, url: `${brand.url}/` },
    ...(page.appStoreUrl ? { downloadUrl: page.appStoreUrl } : {}),
    url: `${brand.url}${path}`,
  };

  return (
    <>
      <Seo title={copy.metaTitle} description={`${copy.summary} ${copy.solution}`.slice(0, 158)} path={path} jsonLd={[workLd, breadcrumbLd(crumbs)]} />

      <PageHeader
        crumbs={crumbs}
        eyebrow={copy.category}
        title={page.name}
        subtitle={copy.summary}
        icon={<img src={page.icon} alt="" width={88} height={88} className="w-[88px] h-[88px] rounded-[22%] border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]" />}
      >
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {page.platforms.map((platform) => (
            <span key={platform} className="chip !bg-forge/15 !text-forge-light !text-sm !px-3 !py-1.5">{platform}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4">
          <a href="#contacto" className="btn !my-0">{t('case.cta')}<ArrowRightIcon /></a>
          {page.appStoreUrl && (
            <a href={page.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !my-0">{t('highlights.appStore')}</a>
          )}
        </div>
      </PageHeader>

      {/* vídeos por dispositivo */}
      <section className="sm:px-10 px-5 pb-10">
        <div className={`screen-max-width grid gap-4 md:gap-5 ${page.media.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {page.media.map((media, i) => (
            media.device === 'wide' ? (
              <video key={media.src} src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="metadata" aria-label={page.name} className="w-full rounded-[2.5rem] border border-white/5" />
            ) : (
              <DeviceStage
                key={media.src}
                device={media.device}
                media={{ src: media.src, poster: media.poster }}
                label={`${page.name} · ${media.device}`}
                className={`h-[320px] sm:h-[420px] ${page.media.length === 3 && i === 0 ? 'lg:col-span-2 md:h-[520px]' : 'md:h-[460px]'}`}
              />
            )
          ))}
        </div>
      </section>

      {/* reto, solución y arquitectura */}
      <section className="common-padding">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <Block title={t('case.challenge')}>{copy.challenge}</Block>
          <Block title={t('case.solution')}>{copy.solution}</Block>
          <Block title={t('case.architecture')}>{copy.architecture}</Block>
        </div>
      </section>

      {/* funciones y tecnología */}
      <section className="common-padding bg-zinc">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <h2 className="text-gray text-3xl md:text-5xl font-medium mb-10">{t('case.features')}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {copy.features.map((feature, i) => (
                <li key={i} className="g_reveal opacity-0 translate-y-[60px] border-t border-neutral-700 pt-5">
                  <p className="text-forge text-sm font-semibold mb-2">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-white text-lg font-semibold">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-gray text-3xl md:text-5xl font-medium mb-6">{t('case.tech')}</h2>
              <div className="flex flex-wrap gap-2">
                {page.tech.map((tech) => (
                  <span key={tech} className="chip !text-sm !px-4 !py-2">{tech}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-7">
              <h2 className="text-forge-light text-sm font-semibold uppercase tracking-wider mb-4">{t('case.results')}</h2>
              <ul className="flex flex-col gap-3">
                {copy.results.map((result, i) => (
                  <li key={i} className="flex gap-3 text-lg font-semibold">
                    <span className="text-forge" aria-hidden="true">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* capturas */}
      <section className="common-padding">
        <div className="screen-max-width">
          <h2 className="text-gray text-3xl md:text-5xl font-medium mb-10">{t('case.gallery')}</h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-5 px-5 sm:mx-0 sm:px-0 snap-x snap-mandatory [scrollbar-width:thin]" data-lenis-prevent-horizontal>
            {page.shots.map((shot, i) => (
              <img
                key={shot}
                src={shot}
                alt={`${page.name} · ${i + 1}`}
                loading="lazy"
                width={540}
                className="snap-start shrink-0 w-[62vw] sm:w-[260px] md:w-[280px] rounded-[1.8rem] border border-white/10"
              />
            ))}
          </div>
        </div>
      </section>

      {/* servicios relacionados y otros casos */}
      <section className="common-padding !pt-0">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-gray text-2xl md:text-4xl font-medium mb-6">{t('case.services')}</h2>
            <div className="flex flex-col gap-3">
              {page.services.map(getServicePage).filter(Boolean).map((service) => (
                <SmartLink key={service.slug} to={`/servicios/${service.slug}`} className="glass-card spotlight group flex items-center justify-between gap-4 p-5 !rounded-3xl hover:border-white/20 transition-colors">
                  <span>
                    <span className="block text-sm text-forge-light font-semibold">{tr(service).eyebrow}</span>
                    <span className="block font-semibold">{tr(service).h1}</span>
                  </span>
                  <ArrowRightIcon className="text-gray group-hover:text-white" />
                </SmartLink>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-gray text-2xl md:text-4xl font-medium mb-6">{t('pages.cases')}</h2>
            <div className="flex flex-col gap-3">
              {others.map((item) => (
                <SmartLink key={item.slug} to={`/casos/${item.slug}`} className="glass-card spotlight group flex items-center gap-4 p-5 !rounded-3xl hover:border-white/20 transition-colors">
                  <img src={item.icon} alt="" width={48} height={48} loading="lazy" className="w-12 h-12 rounded-[22%]" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block text-sm text-gray truncate">{tr(item).summary}</span>
                  </span>
                  <ArrowRightIcon className="text-gray group-hover:text-white" />
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CasePage;
