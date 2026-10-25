import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { localizePath } from '../i18n/paths';

// Recibe siempre la ruta en español ("/servicios/x", "/#apps") y la traduce al idioma actual.
// "/#seccion" estando ya en la home → ancla con scroll suave (Lenis); desde otra página → navega a la home y baja.
// Externos (http, mailto, tel) → <a> normal. El resto → Link del router.
const SmartLink = ({ to, children, ...props }) => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return <a href={to} {...props}>{children}</a>;
  }
  const target = localizePath(to, lang);
  const [targetPath, hash] = target.split('#');
  const samePage = targetPath.replace(/\/$/, '') === pathname.replace(/\/$/, '');
  if (hash && samePage) {
    return <a href={`#${hash}`} {...props}>{children}</a>;
  }
  return <Link to={target} {...props}>{children}</Link>;
};

export default SmartLink;
