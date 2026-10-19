import { Link, useLocation } from 'react-router-dom';

// "/#seccion" en la home → ancla con scroll suave (Lenis); desde otra página → navega a la home y baja.
// Externos (http, mailto, tel) → <a> normal. El resto → Link del router.
const SmartLink = ({ to, children, ...props }) => {
  const { pathname } = useLocation();

  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return <a href={to} {...props}>{children}</a>;
  }
  if (to.startsWith('/#') && pathname === '/') {
    return <a href={to.slice(1)} {...props}>{children}</a>;
  }
  return <Link to={to} {...props}>{children}</Link>;
};

export default SmartLink;
