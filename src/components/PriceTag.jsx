import { formatPrice } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { showPrices } from '../constants';

// "Desde 7.900 € + IVA" / "From $18,000" (o la etiqueta propia del precio, p. ej. "Auditoría desde"). Nada en los idiomas sin precios.
const PriceTag = ({ price, className = '' }) => {
  const { t, tr, lang } = useLanguage();
  if (!showPrices[lang]) return null;

  return (
    <p className={className}>
      {price.label ? tr(price.label) : t('price.from')}{' '}
      <span className="text-white font-semibold">{formatPrice(price, lang)}</span>
      {t('price.vat') && <span className="text-gray"> {t('price.vat')}</span>}
    </p>
  );
};

export default PriceTag;
