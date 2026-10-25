import { servicePages } from '../content/services.js';

// Rutas por idioma. El español va sin prefijo y es la ruta canónica que usa todo el código;
// el inglés cuelga de /en, con secciones traducidas y un slug propio para cada servicio (enSlug).
const sections = {
  servicios: 'services',
  casos: 'case-studies',
  'aviso-legal': 'legal-notice',
  privacidad: 'privacy',
  cookies: 'cookies',
};
const spanishSections = Object.fromEntries(Object.entries(sections).map(([es, en]) => [en, es]));

export const enSections = sections;

export const isEnglishPath = (pathname) => pathname === '/en' || pathname.startsWith('/en/');

// "/servicios/rescate-apps-ios" o "/#apps" → la misma ruta en el idioma pedido
export const localizePath = (path, lang) => {
  if (lang !== 'en') return path;
  const [base, hash] = path.split('#');
  const [, section, slug] = base.split('/');
  let localized = '/en';
  if (section) {
    localized += `/${sections[section] ?? section}`;
    if (slug) {
      const enSlug = section === 'servicios' ? servicePages.find((page) => page.slug === slug)?.enSlug : null;
      localized += `/${enSlug ?? slug}`;
    }
  }
  return hash ? `${localized}#${hash}` : localized;
};

// Ruta actual (en cualquier idioma) → su ruta canónica en español
export const toSpanishPath = (pathname) => {
  if (!isEnglishPath(pathname)) return pathname;
  const [, , section, slug] = pathname.split('/');
  if (!section) return '/';
  const esSection = spanishSections[section] ?? section;
  if (!slug) return `/${esSection}`;
  const esSlug = esSection === 'servicios' ? servicePages.find((page) => page.enSlug === slug)?.slug : null;
  return `/${esSection}/${esSlug ?? slug}`;
};
