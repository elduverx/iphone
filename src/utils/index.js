export const logoMark = "/assets/brand/logo-mark.svg";

export const whatsappUrl = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

// Precio de partida: { amount: 7900, usd: 18000 } → "7.900 €" (es) / "$18,000" (en); per: 'month' | 'hour'
export const formatPrice = ({ amount, usd, per }, lang) => {
  const en = lang === 'en';
  const digits = String(en ? usd : amount).replace(/\B(?=(\d{3})+(?!\d))/g, en ? ',' : '.');
  const value = en ? `$${digits}` : `${digits} €`;
  const suffix = { month: { es: '/mes', en: '/month' }, hour: { es: '/h', en: '/h' } }[per]?.[lang] ?? '';
  return value + suffix;
};

// "Desde 7.900 € + IVA" / "From $18,000": etiqueta, precio e impuestos del idioma (sin los vacíos)
export const priceText = (price, lang, from, vat) => [from, formatPrice(price, lang), vat].filter(Boolean).join(' ');
