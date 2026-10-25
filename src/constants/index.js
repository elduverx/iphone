// Contenido de la web. Todo texto visible va como { es, en }.
// Los valores marcados con TODO son placeholders: reemplázalos por los reales.

import { BRAND_NAME, SITE_URL } from "./site";
import { getServicePage } from "../content/services";
import { formatPrice } from "../utils";

const appPrice = getServicePage("desarrollo-apps-ios").price;

export const brand = {
  name: BRAND_NAME,
  url: SITE_URL,
};

export const contact = {
  whatsapp: "34673685542", // TODO: confirmar número (formato internacional sin + ni espacios)
  phoneLabel: "+34 673 685 542",
  email: "info@ioscraft.app", // TODO: crear este buzón (p. ej. con Google Workspace o el reenvío de correo del registrador)
};

// Medición de campañas. Sin IDs no se carga nada ni se muestra el aviso de cookies.
export const tracking = {
  gaId: import.meta.env.VITE_GA_ID, // G-XXXXXXX (Google Analytics 4)
  adsId: import.meta.env.VITE_GOOGLE_ADS_ID, // AW-XXXXXXX
  adsLeadLabel: import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL, // etiqueta de la conversión "formulario enviado"
  adsContactLabel: import.meta.env.VITE_GOOGLE_ADS_CONTACT_LABEL, // opcional: clic en WhatsApp, email o teléfono
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
};

// Navegación: `to` con "/#" va a una sección de la home; el resto son páginas
export const navLists = [
  { id: "servicios", to: "/servicios", label: { es: "Servicios", en: "Services" } },
  { id: "apps", to: "/#apps", label: { es: "Apps", en: "Apps" } },
  { id: "casos", to: "/casos", label: { es: "Casos", en: "Case studies" } },
  { id: "proceso", to: "/#proceso", label: { es: "Proceso", en: "Process" } },
  { id: "estudio", to: "/#estudio", label: { es: "Estudio", en: "Studio" } },
];

// Proyectos con vídeo para el carrusel de la home
export const apps = [
  {
    id: "tipson-audit",
    caseSlug: "tipson-audit",
    name: "Tipson Audit",
    tagline: { es: ["Tipson Audit.", "IA que revisa tus contratos", "antes de firmar."], en: ["Tipson Audit.", "AI that reviews your contracts", "before you sign."] },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "",
    video: "/assets/apps/tipson-audit/preview.mp4",
    poster: "/assets/apps/tipson-audit/poster.jpg",
    videoDuration: 9,
  },
  {
    id: "duvifit",
    caseSlug: "duvifit",
    name: "DuviFit",
    tagline: { es: ["DuviFit.", "Tu gimnasio en el bolsillo", "y en tu Apple Watch."], en: ["DuviFit.", "Your gym in your pocket", "and on your Apple Watch."] },
    platforms: ["iPhone", "iPad", "Apple Watch"],
    appStoreUrl: "https://apps.apple.com/es/app/duvifit/id6761272248",
    video: "/assets/apps/duvifit/preview.mp4",
    poster: "/assets/apps/duvifit/poster.jpg",
    videoDuration: 6,
  },
  {
    id: "horda",
    caseSlug: "horda-neon",
    name: "Horda Neón",
    tagline: { es: ["Horda Neón.", "Un juego en SpriteKit para", "iPhone, iPad, Mac, TV y Watch."], en: ["Horda Neón.", "A SpriteKit game for", "iPhone, iPad, Mac, TV and Watch."] },
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "Apple Watch"],
    appStoreUrl: "",
    video: "/assets/apps/horda/preview.mp4",
    poster: "/assets/apps/horda/poster.jpg",
    videoDuration: 10,
  },
  {
    id: "tipson-scan",
    name: "Tipson Scan",
    client: true,
    tagline: { es: ["Tipson Scan.", "Tickets y facturas", "escaneados con IA."], en: ["Tipson Scan.", "Receipts and invoices", "scanned with AI."] },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/tipson-scan-gastos-y-facturas/id6804655297",
    video: "/assets/apps/tipson-scan/preview.mp4",
    poster: "/assets/apps/tipson-scan/poster.jpg",
    videoDuration: 6,
  },
  {
    id: "hazte-viral",
    name: "Hazte Viral",
    tagline: { es: ["Hazte Viral.", "La IA analiza tus vídeos", "y te escribe los guiones."], en: ["Hazte Viral.", "AI analyzes your videos", "and writes your scripts."] },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/hazte-viral/id6757550253",
    video: "/assets/apps/hazte-viral/preview.mp4",
    poster: "/assets/apps/hazte-viral/poster.jpg",
    videoDuration: 6,
  },
];

export const APP_STORE_DEVELOPER_URL = "https://apps.apple.com/es/developer/duverney-muriel/id1861505676";

// Apps publicadas en la App Store (datos de la ficha oficial). `client`: hecha para un cliente
export const publishedApps = [
  {
    id: "tipson",
    name: "Tipson Scan",
    client: true, // desarrollada para un cliente: es el ejemplo real del hero
    url: "https://apps.apple.com/es/app/tipson-scan-gastos-y-facturas/id6804655297",
    icon: "/assets/apps/store/tipson.jpg",
    category: { es: "Finanzas", en: "Finance" },
    tagline: { es: "Escáner de tickets y facturas con IA para autónomos.", en: "AI receipt and invoice scanner for freelancers." },
    platforms: ["iPhone", "iPad"],
    video: "/assets/apps/tipson-scan/preview.mp4",
    featured: { image: "/assets/apps/tipson-scan/poster.jpg", position: "85% 50%" },
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "duvifit",
    name: "DuviFit",
    url: "https://apps.apple.com/es/app/duvifit/id6761272248",
    icon: "/assets/apps/store/duvifit.jpg",
    category: { es: "Salud y forma física", en: "Health & Fitness" },
    tagline: { es: "Rutinas y progreso en el gimnasio, también en Apple Watch.", en: "Gym routines and progress, also on Apple Watch." },
    platforms: ["iPhone", "iPad", "Apple Watch"],
    caseSlug: "duvifit",
    rating: 5,
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "duvy",
    name: "Duvy",
    url: "https://apps.apple.com/es/app/duvy/id6759988380",
    icon: "/assets/apps/store/duvy.jpg",
    category: { es: "Negocios", en: "Business" },
    tagline: { es: "Controla cobros pendientes, gastos y ahorro.", en: "Track pending payments, expenses and savings." },
    platforms: ["iPhone", "iPad"],
    rating: 5,
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "duvitricky",
    name: "DuviTricky",
    url: "https://apps.apple.com/es/app/duvitricky/id6762443596",
    icon: "/assets/apps/store/duvitricky.jpg",
    category: { es: "Juegos", en: "Games" },
    tagline: { es: "Tres en raya en el espacio, para Apple Vision Pro.", en: "Spatial tic-tac-toe for Apple Vision Pro." },
    platforms: ["Vision Pro"],
    servicePage: "desarrollo-vision-pro",
    featured: { vision: true },
    price: { es: "1,99 €", en: "€1.99" },
  },
  {
    id: "hazte-viral",
    name: "Hazte Viral",
    url: "https://apps.apple.com/es/app/hazte-viral/id6757550253",
    icon: "/assets/apps/store/hazte-viral.jpg",
    category: { es: "Foto y vídeo", en: "Photo & Video" },
    tagline: { es: "La IA analiza tus vídeos y te da métricas, consejos y guiones UGC.", en: "AI analyzes your videos and gives metrics, tips and UGC scripts." },
    platforms: ["iPhone", "iPad"],
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "ordenate",
    name: "Ordénate",
    url: "https://apps.apple.com/es/app/ordenate/id6759111790",
    icon: "/assets/apps/store/ordenate.jpg",
    category: { es: "Estilo de vida", en: "Lifestyle" },
    tagline: { es: "Organiza tu día por categorías y listas.", en: "Organize your day with categories and lists." },
    platforms: ["iPhone", "iPad"],
    rating: 5,
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "teleprompter",
    name: "TelePrompter Duvi",
    url: "https://apps.apple.com/es/app/teleprompter-duvi/id6759974451",
    icon: "/assets/apps/store/teleprompter.jpg",
    category: { es: "Foto y vídeo", en: "Photo & Video" },
    tagline: { es: "Graba mientras lees el guion en pantalla.", en: "Record while reading your script on screen." },
    platforms: ["iPhone", "iPad"],
    price: { es: "2,99 €", en: "€2.99" },
  },
];

// Precios "desde" públicos por idioma: euros en español (España) y dólares en inglés (USA/UK).
// Pon false en un idioma para ocultarlos en ese mercado (queda "presupuesto tras la llamada").
export const showPrices = { es: true, en: true };

// Servicios de la home. Cada uno lleva a su página (/servicios/<page>), que sirve de landing para su campaña;
// el precio sale de esa página. `featured` ocupa dos columnas; el orden está pensado para que las filas
// queden completas a 3 columnas y a 2 (ver Services.jsx).
export const services = [
  {
    id: "new-app",
    page: "desarrollo-apps-ios",
    featured: true,
    title: { es: "Apps nuevas y MVP", en: "New apps & MVPs" },
    description: {
      es: "De la idea a la App Store. Cerramos el alcance contigo, diseñamos siguiendo las Human Interface Guidelines y entregamos una app nativa lista para crecer.",
      en: "From idea to App Store. We scope it with you, design to the Human Interface Guidelines and ship a native app ready to grow.",
    },
  },
  {
    id: "saas",
    page: "apps-saas-suscripcion",
    title: { es: "Apps SaaS y de suscripción", en: "SaaS & subscription apps" },
    description: {
      es: "Herramientas para autónomos y empresas que se pagan cada mes: gastos, cobros, contratos. App, backend, IA y suscripciones.",
      en: "Tools for freelancers and businesses that pay monthly: expenses, collections, contracts. App, backend, AI and subscriptions.",
    },
  },
  {
    id: "rescue",
    page: "rescate-apps-ios",
    title: { es: "Rescate de apps", en: "App rescue" },
    description: {
      es: "¿El anterior desarrollador desapareció o la app se cae? Auditamos el código, arreglamos crashes y bugs y la dejamos estable.",
      en: "Previous developer gone or the app keeps crashing? We audit the code, fix crashes and bugs, and make it stable.",
    },
  },
  {
    id: "rejection",
    page: "rechazo-app-store",
    title: { es: "Rechazos de App Store", en: "App Store rejections" },
    description: {
      es: "Resolvemos rechazos de App Review: privacidad, permisos, compras in-app y metadatos. Reenviamos hasta resolverlo.",
      en: "We fix App Review rejections: privacy, permissions, in-app purchases and metadata, and resubmit until it's resolved.",
    },
  },
  {
    id: "qa",
    page: "testing-qa-apps-ios",
    title: { es: "QA y testing", en: "QA & testing" },
    description: {
      es: "Probamos tu app en iPhone y iPad reales antes de cada versión y automatizamos las pruebas críticas. Bugs priorizados, con pasos para reproducirlos.",
      en: "We test your app on real iPhones and iPads before every release and automate the critical tests. Prioritized bugs, with steps to reproduce.",
    },
  },
  {
    id: "vision",
    page: "desarrollo-vision-pro",
    featured: true,
    title: { es: "Apple Vision Pro", en: "Apple Vision Pro" },
    description: {
      es: "Computación espacial con todo: ventanas, volúmenes y espacios inmersivos, modelos 3D con RealityKit y control con la mirada y las manos. Ya tenemos una app publicada para Vision Pro.",
      en: "Spatial computing, all in: windows, volumes and immersive spaces, RealityKit 3D models and eye and hand control. We already have an app live for Vision Pro.",
    },
  },
  {
    id: "accessibility",
    page: "accesibilidad-apps-ios",
    title: { es: "Accesibilidad (Ley Europea)", en: "Accessibility (EAA)" },
    description: {
      es: "Obligatoria desde junio de 2025 para comercio electrónico, banca, transporte y más. Auditamos tu app según EN 301 549 y la corregimos.",
      en: "Mandatory since June 2025 for e-commerce, banking, transport and more. We audit your app against EN 301 549 and fix it.",
    },
  },
  {
    id: "update",
    page: "actualizar-app-ios",
    title: { es: "Actualización a iOS 26", en: "iOS 26 update" },
    description: {
      es: "Apple solo acepta actualizaciones compiladas con Xcode 26. Ponemos tu app al día con el último SDK sin romper lo que funciona.",
      en: "Apple only accepts updates built with Xcode 26. We bring your app up to the latest SDK without breaking what works.",
    },
  },
  {
    id: "maintenance",
    page: "mantenimiento-apps-ios",
    title: { es: "Mantenimiento mensual", en: "Monthly maintenance" },
    description: {
      es: "Tu app al día con cada versión de iOS: crashes vigilados, dependencias actualizadas, mejoras y publicaciones.",
      en: "Your app up to date with every iOS release: crash monitoring, dependency updates, improvements and releases.",
    },
  },
  {
    id: "watch",
    page: "desarrollo-apple-watch",
    title: { es: "Apple Watch y Apple TV", en: "Apple Watch & Apple TV" },
    description: {
      es: "Tu app en la muñeca y en el salón: entrenos con HealthKit, complicaciones, y apps y juegos para la tele.",
      en: "Your app on the wrist and in the living room: HealthKit workouts, complications, and TV apps and games.",
    },
  },
  {
    id: "digital",
    page: "digitalizacion-empresas",
    featured: true,
    title: { es: "Digitalización de empresas", en: "Business digitalization" },
    description: {
      es: "Transporte, construcción, distribución: cambiamos el papel y el Excel por una app para tu equipo en la calle y un panel web para la oficina.",
      en: "Transport, construction, distribution: we replace paper and spreadsheets with an app for your field team and a web dashboard for the office.",
    },
  },
  {
    id: "hourly",
    page: "desarrollador-ios-por-horas",
    title: { es: "Desarrollador iOS por horas", en: "Hourly iOS developer" },
    description: {
      es: "Un desarrollador iOS que se suma a tu equipo por horas o por sprint, con tus herramientas y tu forma de trabajar.",
      en: "An iOS developer who joins your team hourly or per sprint, with your tools and your way of working.",
    },
  },
  {
    id: "agencies",
    page: "marca-blanca-agencias",
    title: { es: "Marca blanca para agencias", en: "White-label for agencies" },
    description: {
      es: "Tu equipo iOS cuando lo necesitas: nos integramos con vosotros, bajo NDA, para los proyectos Apple de vuestros clientes.",
      en: "Your iOS team when you need it: we join you under NDA for your clients' Apple projects.",
    },
  },
];

// Otras cosas que también hacemos (se listan sin página propia)
export const capabilities = [
  { es: "Migración de Objective-C a Swift", en: "Objective-C to Swift migration" },
  { es: "De React Native o Flutter a nativo", en: "React Native or Flutter to native" },
  { es: "Suscripciones y compras in-app", en: "Subscriptions & in-app purchases" },
  { es: "Backend y panel web con Next.js y PostgreSQL", en: "Next.js & PostgreSQL backends and dashboards" },
  { es: "Integración con tu backend, CRM o pagos", en: "Backend, CRM & payment integrations" },
  { es: "Rendimiento y consumo de batería", en: "Performance & battery usage" },
  { es: "Revisión de seguridad", en: "Security review" },
  { es: "Widgets, Siri y Apple Intelligence", en: "Widgets, Siri & Apple Intelligence" },
  { es: "Auditoría de código", en: "Code audits" },
  { es: "TestFlight, publicación y ASO", en: "TestFlight, release & ASO" },
];

export const processSteps = [
  {
    title: { es: "Descubrimiento", en: "Discovery" },
    description: { es: "Objetivos, usuarios, alcance y presupuesto cerrado.", en: "Goals, users, scope and a fixed budget." },
  },
  {
    title: { es: "Diseño", en: "Design" },
    description: { es: "Prototipo navegable siguiendo las Human Interface Guidelines.", en: "Clickable prototype following the Human Interface Guidelines." },
  },
  {
    title: { es: "Desarrollo", en: "Development" },
    description: { es: "Sprints cortos con demo cada semana. Código nativo y con tests.", en: "Short sprints with a weekly demo. Native, tested code." },
  },
  {
    title: { es: "TestFlight", en: "TestFlight" },
    description: { es: "Pruebas con usuarios reales antes del lanzamiento.", en: "Real-user testing before launch." },
  },
  {
    title: { es: "App Store", en: "App Store" },
    description: { es: "Publicación, revisión de Apple y ficha optimizada.", en: "Release, Apple review and an optimized listing." },
  },
  {
    title: { es: "Evolución", en: "Growth" },
    description: { es: "Soporte, métricas y nuevas versiones.", en: "Support, metrics and new versions." },
  },
];

export const faqs = [
  {
    q: { es: "¿Cuánto cuesta una app?", en: "How much does an app cost?" },
    a: {
      es: `Un MVP para iPhone y iPad parte de ${formatPrice(appPrice, "es")} + IVA. El precio final depende del alcance, las integraciones y las plataformas: tras una primera llamada gratuita recibes un presupuesto cerrado por fases, sin sorpresas.`,
      en: `An iPhone and iPad MVP starts at ${formatPrice(appPrice, "en")}. The final price depends on scope, integrations and platforms: after a free first call you get a fixed, phased quote with no surprises.`,
    },
  },
  {
    q: { es: "¿Cuánto se tarda?", en: "How long does it take?" },
    a: {
      es: "Un MVP bien acotado suele llevar entre 6 y 12 semanas. En el descubrimiento fijamos un calendario por fases con una entrega cada semana.",
      en: "A well-scoped MVP usually takes 6 to 12 weeks. During discovery we set a phased schedule with a delivery every week.",
    },
  },
  {
    q: { es: "¿Hacéis también el backend y la web?", en: "Do you build the backend and web too?" },
    a: {
      es: "Sí. Montamos el backend, la base de datos y el panel web con Next.js y PostgreSQL, así tienes app, servidor y web con un solo equipo.",
      en: "Yes. We build the backend, database and web dashboard with Next.js and PostgreSQL, so you get app, server and web from a single team.",
    },
  },
  {
    q: { es: "¿Podéis continuar un proyecto que empezó otro desarrollador?", en: "Can you take over a project another developer started?" },
    a: {
      es: "Sí, es uno de los encargos más habituales. Empezamos con una auditoría del código y te decimos con honestidad qué conviene arreglar y qué rehacer.",
      en: "Yes, it's one of the most common requests. We start with a code audit and tell you honestly what to fix and what to rebuild.",
    },
  },
  {
    q: { es: "¿De quién es el código?", en: "Who owns the code?" },
    a: {
      es: "Tuyo. El repositorio, las cuentas de App Store Connect y todos los derechos quedan a tu nombre.",
      en: "You do. The repository, App Store Connect accounts and all rights stay in your name.",
    },
  },
  {
    q: { es: "¿Y Android?", en: "What about Android?" },
    a: {
      es: "Nos especializamos en el ecosistema Apple con Swift nativo. Si necesitas Android, nos coordinamos con tu equipo o con otro proveedor usando el mismo backend y el mismo diseño.",
      en: "We specialize in the Apple ecosystem with native Swift. If you need Android, we coordinate with your team or another provider using the same backend and design.",
    },
  },
  {
    q: { es: "¿Ofrecéis mantenimiento después del lanzamiento?", en: "Do you offer maintenance after launch?" },
    a: {
      es: "Sí, con planes mensuales que cubren cada nueva versión de iOS, crashes, mejoras y publicaciones.",
      en: "Yes, with monthly plans covering every new iOS release, crashes, improvements and releases.",
    },
  },
  {
    q: { es: "¿Trabajáis con agencias en marca blanca?", en: "Do you work white-label with agencies?" },
    a: {
      es: "Sí. Firmamos NDA, nos adaptamos a vuestras herramientas y hablamos con vuestro cliente solo si lo pedís.",
      en: "Yes. We sign NDAs, adapt to your tools and talk to your client only if you want us to.",
    },
  },
];

export const needs = [
  { value: "new-app", label: { es: "Una app nueva", en: "A new app" } },
  { value: "fix-app", label: { es: "Mejorar o arreglar mi app", en: "Improve or fix my app" } },
  { value: "other", label: { es: "Otra cosa", en: "Something else" } },
];

export const footerLinks = [
  { id: "legal", to: "/aviso-legal", label: { es: "Aviso legal", en: "Legal notice" } },
  { id: "privacy", to: "/privacidad", label: { es: "Privacidad", en: "Privacy" } },
  { id: "cookies", to: "/cookies", label: { es: "Cookies", en: "Cookies" } },
];

// Testimonios de clientes (con su permiso). Vacío = la sección no se muestra.
// Formato: { quote: { es, en }, name: "Nombre", role: { es, en }, company: "Empresa" }
export const testimonials = [];

// Por qué Swiftcraft: pilares de la marca
export const pillars = [
  {
    title: { es: "Solo Apple", en: "Apple only" },
    description: { es: "Swift y SwiftUI nativos. Sin plantillas ni frameworks híbridos.", en: "Native Swift and SwiftUI. No templates, no hybrid frameworks." },
  },
  {
    title: { es: "Trato directo", en: "Direct contact" },
    description: { es: "Hablas con quien escribe el código. Sin cuentas que pasan de mano en mano.", en: "You talk to the people writing the code. No hand-offs between account managers." },
  },
  {
    title: { es: "Código tuyo", en: "Your code" },
    description: { es: "Repositorio, cuentas de App Store Connect y derechos, siempre a tu nombre.", en: "Repository, App Store Connect accounts and rights, always in your name." },
  },
  {
    title: { es: "Apps en producción", en: "Apps in production" },
    description: { es: "Publicamos y mantenemos apps propias y de clientes en la App Store. Sabemos lo que cuesta llegar y quedarse.", en: "We ship and maintain our own and our clients' apps on the App Store. We know what it takes to get there and stay." },
  },
];
