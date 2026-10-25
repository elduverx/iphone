import App from './App';
import Home from './pages/Home';
import ServicesIndex from './pages/ServicesIndex';
import ServicePage from './pages/ServicePage';
import CasesIndex from './pages/CasesIndex';
import CasePage from './pages/CasePage';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';
import { servicePages } from './content/services';
import { casePages } from './content/cases';
import { enSections } from './i18n/paths';

// Páginas de un idioma. El español va en la raíz; el inglés, en /en con secciones y slugs traducidos
// (ver i18n/paths.js). Cada ruta se pre-renderiza a HTML estático en el build (vite-react-ssg).
const pages = (lang) => {
  const en = lang === 'en';
  const at = (section) => (en ? `en/${enSections[section]}` : section);
  return [
    en ? { path: 'en', element: <Home />, entry: 'src/pages/Home.jsx' } : { index: true, element: <Home />, entry: 'src/pages/Home.jsx' },
    { path: at('servicios'), element: <ServicesIndex />, entry: 'src/pages/ServicesIndex.jsx' },
    {
      path: `${at('servicios')}/:slug`,
      element: <ServicePage />,
      entry: 'src/pages/ServicePage.jsx',
      getStaticPaths: () => servicePages.map((page) => `${at('servicios')}/${en ? page.enSlug : page.slug}`),
    },
    { path: at('casos'), element: <CasesIndex />, entry: 'src/pages/CasesIndex.jsx' },
    {
      path: `${at('casos')}/:slug`,
      element: <CasePage />,
      entry: 'src/pages/CasePage.jsx',
      getStaticPaths: () => casePages.map((page) => `${at('casos')}/${page.slug}`),
    },
    { path: at('aviso-legal'), element: <LegalPage page="legal" /> },
    { path: at('privacidad'), element: <LegalPage page="privacy" /> },
    { path: at('cookies'), element: <LegalPage page="cookies" /> },
  ];
};

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      ...pages('es'),
      ...pages('en'),
      { path: '404', element: <NotFound /> },
      { path: 'en/*', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
