import { brand, contact, footerLinks, navLists } from '../constants'
import { servicePages } from '../content/services'
import { casePages } from '../content/cases'
import { logoMark } from '../utils'
import { useLanguage } from '../i18n/LanguageContext'
import SmartLink from './SmartLink'

const Footer = () => {
  const { t, tr } = useLanguage();

  const columns = [
    { title: t('footerNav.services'), links: servicePages.map((page) => ({ to: `/servicios/${page.slug}`, label: tr(page).eyebrow })) },
    { title: t('footerNav.cases'), links: casePages.map((page) => ({ to: `/casos/${page.slug}`, label: page.name })) },
    { title: t('footerNav.studio'), links: navLists.filter((nav) => nav.to.startsWith('/#')).map((nav) => ({ to: nav.to, label: tr(nav.label) })) },
    { title: t('footerNav.legal'), links: footerLinks.map((link) => ({ to: link.to, label: tr(link.label) })) },
  ];

  return (
    <footer className="py-12 sm:px-10 px-5 pb-24 border-t border-white/5">
      <div className="screen-max-width">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="" width={22} height={22} />
              <span className="font-semibold">{brand.name}</span>
            </div>
            <p className="text-gray text-sm mt-3 max-w-xs">{t('hero.eyebrow')}. {t('hero.subtitle')}</p>
            <p className="text-sm mt-4 flex flex-col gap-1">
              <a href={`mailto:${contact.email}`} className="text-link">{contact.email}</a>
              <a href={`tel:+${contact.whatsapp}`} className="text-link">{contact.phoneLabel}</a>
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray mb-4">{column.title}</p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <SmartLink to={link.to} className="text-sm text-gray-200 hover:text-white transition-colors">{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="bg-neutral-800 my-8 h-[1px] w-full" />

        <p className="font-semibold text-gray text-xs">© {new Date().getFullYear()} {brand.name}. {t('footer.rights')}</p>
        <p className="text-gray text-[11px] mt-3">{t('footer.disclaimer')}</p>
        <p className="text-gray text-[11px] mt-1">
          <a href="https://sketchfab.com/3d-models/apple-iphone-15-pro-max-black-df17520841214c1792fb8a44c6783ee7" target="_blank" rel="noopener noreferrer" className="hover:underline">
            {t('footer.credits')}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
