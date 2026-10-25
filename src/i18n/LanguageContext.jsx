import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import es from './es';
import en from './en';
import { isEnglishPath, localizePath, toSpanishPath } from './paths';

const dictionaries = { es, en };

const LanguageContext = createContext(null);

// El idioma lo marca la URL: /en/... en inglés y el resto en español. Así cada idioma
// se pre-renderiza en su propio HTML, Google indexa los dos y los anuncios aterrizan sin parpadeos.
export const LanguageProvider = ({ children }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const lang = isEnglishPath(pathname) ? 'en' : 'es';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // cambiar de idioma = ir a la misma página en el otro idioma
  const setLang = useCallback(
    (next) => {
      if (next !== lang) navigate(localizePath(toSpanishPath(pathname), next) + hash);
    },
    [lang, pathname, hash, navigate]
  );

  // t('hero.title') → texto de la interfaz en el idioma actual
  const t = useCallback(
    (key) => key.split('.').reduce((obj, part) => obj?.[part], dictionaries[lang]) ?? key,
    [lang]
  );

  // tr({ es, en }) → valor de contenido en el idioma actual
  const tr = useCallback(
    (value) => (value && typeof value === 'object' && lang in value ? value[lang] : value),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
