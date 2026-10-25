import { tracking } from '../constants';

// Medición de campañas: Google Analytics 4, Google Ads y Meta Pixel.
// Nada se carga hasta que el visitante acepta en el aviso de cookies (modo básico, RGPD/LSSI).

const CONSENT_KEY = 'swiftcraft-consent';
export const CONSENT_OPEN_EVENT = 'swiftcraft:consent-open';

export const hasTracking = Boolean(tracking.gaId || tracking.adsId || tracking.metaPixelId);

let tagsLoaded = false;

// Origen de la visita (UTM, gclid…). Vive en memoria, sin cookies: viaja con el formulario
// para saber qué campaña trajo cada contacto, aunque el visitante rechace las cookies.
const attribution = {};
const ATTRIBUTION_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];

const captureAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 200);
  });
  attribution.landing = window.location.pathname;
  if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
    attribution.referrer = document.referrer.slice(0, 200);
  }
};

export const getAttribution = () => attribution;

export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

const loadScript = (src) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const loadTags = () => {
  if (tagsLoaded || !hasTracking) return;
  tagsLoaded = true;

  const googleIds = [tracking.gaId, tracking.adsId].filter(Boolean);
  if (googleIds.length) {
    window.dataLayer = window.dataLayer || [];
    // gtag.js necesita el objeto arguments tal cual
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    window.gtag('js', new Date());
    googleIds.forEach((id) => window.gtag('config', id));
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleIds[0]}`);
  }

  if (tracking.metaPixelId) {
    // equivalente al snippet oficial de Meta: encola llamadas hasta que carga fbevents.js
    const fbq = function fbq(...args) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', tracking.metaPixelId);
    fbq('track', 'PageView');
  }
};

export const setConsent = (value) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // sin persistencia: se volverá a preguntar en la próxima visita
  }
  if (value === 'granted') {
    loadTags();
  } else if (tagsLoaded) {
    window.gtag?.('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.fbq?.('consent', 'revoke');
  }
};

export const openConsent = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));

const canTrack = () => tagsLoaded && getConsent() === 'granted';

const adsConversion = (label) => {
  if (tracking.adsId && label) window.gtag?.('event', 'conversion', { send_to: `${tracking.adsId}/${label}` });
};

// Formulario enviado: la conversión principal de las campañas
export const trackLead = (params = {}) => {
  if (!canTrack()) return;
  window.gtag?.('event', 'generate_lead', params);
  adsConversion(tracking.adsLeadLabel);
  window.fbq?.('track', 'Lead', params);
};

// Contacto directo: whatsapp | email | phone
export const trackContact = (method) => {
  if (!canTrack()) return;
  window.gtag?.('event', 'contact', { method });
  adsConversion(tracking.adsContactLabel);
  window.fbq?.('track', 'Contact', { method });
};

// GA4 ya mide los cambios de ruta (medición mejorada); Meta necesita el aviso explícito
export const trackPageView = () => {
  if (canTrack()) window.fbq?.('track', 'PageView');
};

// Clics en enlaces de WhatsApp, email o teléfono, estén donde estén
const contactMethod = (href) => {
  if (href.startsWith('https://wa.me/')) return 'whatsapp';
  if (href.startsWith('mailto:')) return 'email';
  if (href.startsWith('tel:')) return 'phone';
  return null;
};

export const initTracking = () => {
  captureAttribution();
  document.addEventListener('click', (e) => {
    const method = contactMethod(e.target.closest?.('a[href]')?.getAttribute('href') ?? '');
    if (method) trackContact(method);
  });
  if (getConsent() === 'granted') loadTags();
};
