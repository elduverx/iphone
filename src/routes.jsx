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

// Cada ruta se pre-renderiza a HTML estático en el build (vite-react-ssg)
export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.jsx' },
      { path: 'servicios', element: <ServicesIndex />, entry: 'src/pages/ServicesIndex.jsx' },
      {
        path: 'servicios/:slug',
        element: <ServicePage />,
        entry: 'src/pages/ServicePage.jsx',
        getStaticPaths: () => servicePages.map((page) => `servicios/${page.slug}`),
      },
      { path: 'casos', element: <CasesIndex />, entry: 'src/pages/CasesIndex.jsx' },
      {
        path: 'casos/:slug',
        element: <CasePage />,
        entry: 'src/pages/CasePage.jsx',
        getStaticPaths: () => casePages.map((page) => `casos/${page.slug}`),
      },
      { path: 'aviso-legal', element: <LegalPage page="legal" /> },
      { path: 'privacidad', element: <LegalPage page="privacy" /> },
      { path: 'cookies', element: <LegalPage page="cookies" /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
