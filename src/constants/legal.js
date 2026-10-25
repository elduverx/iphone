// Textos legales base (LSSI-CE y RGPD). Revísalos con un asesor antes de publicar.
import { brand, contact, tracking } from "./index";

// Titular del sitio: la LSSI obliga a publicar nombre, NIF/NIE, domicilio y email
const owner = {
  name: "iOS Craft Spain",
  taxId: "Z0550250A",
  address: "C/ Madrid, 8, Benetússer (Valencia)",
};
const email = contact.email;

// La política de cookies cambia según las herramientas de medición configuradas
const usesGoogle = Boolean(tracking.gaId || tracking.adsId);
const usesMeta = Boolean(tracking.metaPixelId);
const tools = [tracking.gaId && "Google Analytics", tracking.adsId && "Google Ads", usesMeta && "Meta Pixel"].filter(Boolean);
const providers = {
  es: [usesGoogle && "Google Ireland Ltd.", usesMeta && "Meta Platforms Ireland Ltd."].filter(Boolean).join(" y "),
  en: [usesGoogle && "Google Ireland Ltd.", usesMeta && "Meta Platforms Ireland Ltd."].filter(Boolean).join(" and "),
};

const cookiesBody = tools.length
  ? {
      es: [
        "Almacenamiento técnico: el sitio guarda en tu navegador (localStorage) tu decisión sobre las cookies, para no volver a preguntarte. Es necesario y no requiere consentimiento.",
        `Cookies de análisis y publicidad: solo si las aceptas en el aviso de cookies, se cargan ${tools.join(", ")}. Sirven para contar visitas y saber qué anuncios nos traen contactos. Las gestiona ${providers.es}, que puede tratar datos fuera de la UE con las garantías del Marco de Privacidad de Datos UE-EE. UU.`,
        "Puedes aceptarlas, rechazarlas o cambiar de opinión cuando quieras desde «Preferencias de cookies», al pie de cada página, o borrando los datos de este sitio en tu navegador.",
      ],
      en: [
        "Technical storage: the site saves your cookie choice in your browser (localStorage) so it doesn't ask again. It is necessary and does not require consent.",
        `Analytics and advertising cookies: only if you accept them in the cookie notice, ${tools.join(", ")} are loaded. They count visits and tell us which ads bring us enquiries. They are managed by ${providers.en}, which may process data outside the EU under the EU-US Data Privacy Framework.`,
        "You can accept, reject or change your mind at any time from \"Cookie preferences\" at the bottom of every page, or by clearing this site's data in your browser.",
      ],
    }
  : {
      es: [
        "Este sitio no usa cookies de análisis ni de publicidad, ni guarda datos en tu navegador.",
        "Si en el futuro se añaden herramientas de analítica, se pedirá tu consentimiento previo.",
      ],
      en: [
        "This site does not use analytics or advertising cookies, nor does it store data in your browser.",
        "If analytics tools are added in the future, your prior consent will be requested.",
      ],
    };

export const legal = {
  legal: {
    title: { es: "Aviso legal", en: "Legal notice" },
    description: {
      es: `Aviso legal de ${brand.name}: titular del sitio, condiciones de uso y propiedad intelectual.`,
      en: `${brand.name} legal notice: site owner, terms of use and intellectual property.`,
    },
    body: {
      es: [
        `Titular: ${owner.name} · NIF: ${owner.taxId} · Domicilio: ${owner.address} · Email: ${email}.`,
        "Este sitio web informa sobre los servicios de desarrollo de software de Swiftcraft. El acceso es gratuito y no requiere registro.",
        "Los contenidos, el diseño y el código del sitio son propiedad del titular o se usan con licencia. iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro y CarPlay son marcas de Apple Inc.; Swiftcraft no está afiliado a Apple.",
        "El titular no se responsabiliza del uso indebido de los contenidos ni de los sitios de terceros enlazados.",
      ],
      en: [
        `Owner: ${owner.name} · Tax ID (NIF): ${owner.taxId} · Address: ${owner.address}, Spain · Email: ${email}.`,
        "This website provides information about Swiftcraft's software development services. Access is free and requires no registration.",
        "The site's content, design and code belong to the owner or are used under license. iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro and CarPlay are trademarks of Apple Inc.; Swiftcraft is not affiliated with Apple.",
        "The owner is not liable for misuse of the content or for linked third-party sites.",
      ],
    },
  },
  privacy: {
    title: { es: "Política de privacidad", en: "Privacy policy" },
    description: {
      es: `Política de privacidad de ${brand.name}: qué datos tratamos cuando nos escribes, para qué y cómo ejercer tus derechos.`,
      en: `${brand.name} privacy policy: what data we process when you contact us, why, and how to exercise your rights.`,
    },
    body: {
      es: [
        `Responsable: ${owner.name}, NIF ${owner.taxId}, ${email}.`,
        "Datos: los que envías en el formulario de contacto (nombre, email y mensaje) o por WhatsApp. Junto al formulario se envía la página desde la que escribes y, si llegas desde un anuncio o un enlace con etiquetas de campaña, de qué campaña vienes.",
        "Finalidad y base legal: responder a tu solicitud y preparar un presupuesto, como medida precontractual a petición tuya (art. 6.1.b RGPD), y saber qué campañas funcionan, por interés legítimo (art. 6.1.f RGPD). Los datos se conservan mientras dure la relación comercial o hasta que pidas su supresión.",
        `Encargados: la web y el envío del formulario funcionan sobre Vercel Inc. (EE. UU.), con cláusulas contractuales tipo para las transferencias internacionales, y el mensaje llega a nuestro buzón a través de nuestro proveedor de correo.${tools.length ? ` Si aceptas las cookies de medición, ${providers.es} tratan datos de navegación según la política de cookies.` : ""} No se ceden datos a terceros salvo obligación legal.`,
        `Derechos: puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${email}, y reclamar ante la AEPD (aepd.es).`,
      ],
      en: [
        `Controller: ${owner.name}, Tax ID (NIF) ${owner.taxId}, ${email}.`,
        "Data: what you submit through the contact form (name, email and message) or via WhatsApp. The form also sends the page you write from and, if you arrive from an ad or a link with campaign tags, which campaign you came from.",
        "Purpose and legal basis: replying to your request and preparing a quote, as a pre-contractual step at your request (Art. 6.1.b GDPR), and learning which campaigns work, on the basis of legitimate interest (Art. 6.1.f GDPR). Data is kept for the duration of the business relationship or until you ask for its deletion.",
        `Processors: the website and form delivery run on Vercel Inc. (USA), under standard contractual clauses for international transfers, and the message reaches our inbox through our email provider.${tools.length ? ` If you accept measurement cookies, ${providers.en} process browsing data as described in the cookie policy.` : ""} Data is not shared with third parties unless legally required.`,
        `Rights: you can request access, rectification, erasure, objection, restriction and portability at ${email}, and file a complaint with the Spanish DPA (aepd.es).`,
      ],
    },
  },
  cookies: {
    title: { es: "Política de cookies", en: "Cookie policy" },
    description: {
      es: `Política de cookies de ${brand.name}: qué guarda el sitio en tu navegador y cómo aceptar o rechazar la medición.`,
      en: `${brand.name} cookie policy: what the site stores in your browser and how to accept or reject measurement.`,
    },
    body: cookiesBody,
  },
};
