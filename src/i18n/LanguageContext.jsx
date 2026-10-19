import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import es from './es';
import en from './en';

const dictionaries = { es, en };
const STORAGE_KEY = 'swiftforge-lang';

const LanguageContext = createContext(null);

// El HTML pre-renderizado sale en español; en el navegador se aplica la preferencia guardada o la del sistema
const getPreferredLang = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dictionaries[saved]) return saved;
  } catch {
    // localStorage no disponible (modo privado, etc.)
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState('es');

  // tras hidratar, cambia al idioma preferido (así el primer render coincide con el HTML estático)
  useEffect(() => {
    setLangState(getPreferredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sin persistencia, no pasa nada
    }
  }, []);

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
