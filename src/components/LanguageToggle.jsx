import { useLanguage } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t('nav.language')} className="flex items-center rounded-full bg-gray-300 p-0.5 text-xs font-semibold">
      {['es', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-full uppercase transition-all ${lang === code ? 'bg-white text-black' : 'text-gray hover:text-white'}`}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
