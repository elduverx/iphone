// Tras el build: genera sitemap.xml y robots.txt con el dominio de src/constants/site.js
// y copia la página 404 a dist/404.html para el hosting.
import { existsSync, copyFileSync, writeFileSync } from 'node:fs';
import { SITE_URL } from '../src/constants/site.js';
import { servicePages } from '../src/content/services.js';
import { casePages } from '../src/content/cases.js';
import { localizePath } from '../src/i18n/paths.js';

const today = new Date().toISOString().slice(0, 10);
const routes = [
  { path: '/', priority: '1.0' },
  { path: '/servicios', priority: '0.9' },
  ...servicePages.map((page) => ({ path: `/servicios/${page.slug}`, priority: '0.9' })),
  { path: '/casos', priority: '0.8' },
  ...casePages.map((page) => ({ path: `/casos/${page.slug}`, priority: '0.8' })),
  { path: '/aviso-legal', priority: '0.2' },
  { path: '/privacidad', priority: '0.2' },
  { path: '/cookies', priority: '0.2' },
];

// cada página en español y en inglés, con sus alternativas hreflang
const languages = ['es', 'en'];
const alternates = (path) => languages
  .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${localizePath(path, lang)}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}"/>`)
  .join('\n');
const urls = routes
  .flatMap(({ path, priority }) => languages.map((lang) => `  <url>\n    <loc>${SITE_URL}${localizePath(path, lang)}</loc>\n${alternates(path)}\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`))
  .join('\n');

writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

for (const candidate of ['dist/404/index.html', 'dist/404.html']) {
  if (existsSync(candidate)) {
    if (candidate !== 'dist/404.html') copyFileSync(candidate, 'dist/404.html');
    break;
  }
}

console.log(`sitemap.xml: ${routes.length * languages.length} rutas (${languages.join(' + ')}) en ${SITE_URL}`);
