import { useGSAP } from '@gsap/react';
import { casePages } from '../content/cases';
import { useLanguage } from '../i18n/LanguageContext';
import { animateBatch } from '../utils/animations';
import Seo, { breadcrumbLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import SmartLink from '../components/SmartLink';
import { ArrowRightIcon } from '../components/Icons';

const CasesIndex = () => {
  const { t, tr } = useLanguage();
  const crumbs = [{ name: t('pages.home'), path: '/' }, { name: t('pages.cases'), path: '/casos' }];

  useGSAP(() => {
    return animateBatch('.g_reveal');
  }, []);

  return (
    <>
      <Seo title={t('pages.casesTitle')} description={t('pages.casesDescription')} path="/casos" jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHeader crumbs={crumbs} eyebrow={t('pages.cases')} title={t('pages.casesH1')} subtitle={t('pages.casesSubtitle')} />

      <section className="sm:px-10 px-5 pb-24">
        <div className="screen-max-width grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {casePages.map((page) => {
            const copy = tr(page);
            return (
              <SmartLink
                key={page.slug}
                to={`/casos/${page.slug}`}
                className="g_reveal glass-card spotlight group opacity-0 translate-y-[60px] flex flex-col overflow-hidden hover:border-white/20 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img src={page.cover} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={page.icon} alt="" width={48} height={48} loading="lazy" className="w-12 h-12 rounded-[22%] border border-white/10" />
                    <div>
                      <h2 className="text-xl font-semibold">{page.name}</h2>
                      <p className="text-sm text-gray">{copy.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-5">{copy.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {page.platforms.map((platform) => (
                      <span key={platform} className="chip !bg-forge/15 !text-forge-light">{platform}</span>
                    ))}
                  </div>
                  <span className="mt-auto text-link flex items-center text-sm font-semibold">
                    {t('pages.viewCase')}
                    <ArrowRightIcon className="ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </SmartLink>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CasesIndex;
