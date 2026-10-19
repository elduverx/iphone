// Contenido de la web. Todo texto visible va como { es, en }.
// Los valores marcados con TODO son placeholders: reemplázalos por los reales.

import { SITE_URL } from "./site";

export const brand = {
  name: "Swiftforge",
  url: SITE_URL,
};

export const contact = {
  whatsapp: "34673685542", // TODO: confirmar número (formato internacional sin + ni espacios)
  phoneLabel: "+34 673 685 542",
  email: "hola@swiftforge.es", // TODO: email real en el dominio definitivo
  formspreeId: import.meta.env.VITE_FORMSPREE_ID,
};

// Navegación: `to` con "/#" va a una sección de la home; el resto son páginas
export const navLists = [
  { id: "apps", to: "/#apps", label: { es: "Apps", en: "Apps" } },
  { id: "ecosistema", to: "/#ecosistema", label: { es: "Ecosistema", en: "Ecosystem" } },
  { id: "servicios", to: "/servicios", label: { es: "Servicios", en: "Services" } },
  { id: "casos", to: "/casos", label: { es: "Casos", en: "Case studies" } },
  { id: "estudio", to: "/#estudio", label: { es: "Estudio", en: "Studio" } },
];

// Proyectos reales. Con `video` aparecen en el carrusel; con `screen` (1290×2796) en el iPhone 3D.
export const apps = [
  {
    id: "tipson-audit",
    caseSlug: "tipson-audit",
    name: "Tipson Audit",
    tagline: { es: ["Tipson Audit.", "IA que revisa tus contratos", "antes de firmar."], en: ["Tipson Audit.", "AI that reviews your contracts", "before you sign."] },
    description: { es: "Auditoría de contratos con IA, VisionKit y PDFKit", en: "AI contract review with VisionKit and PDFKit" },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "",
    icon: "/assets/apps/tipson-audit/icon.png",
    screen: "/assets/apps/tipson-audit/screen.jpg",
    video: "/assets/apps/tipson-audit/preview.mp4",
    poster: "/assets/apps/tipson-audit/poster.jpg",
    videoDuration: 9,
    phoneColor: ["#C9C8C2", "#ffffff", "#C9C8C2"],
  },
  {
    id: "duvifit",
    caseSlug: "duvifit",
    name: "DuviFit",
    tagline: { es: ["DuviFit.", "Tu gimnasio en el bolsillo", "y en tu Apple Watch."], en: ["DuviFit.", "Your gym in your pocket", "and on your Apple Watch."] },
    description: { es: "Entrenos con HealthKit, Live Activities y watchOS", en: "Workouts with HealthKit, Live Activities and watchOS" },
    platforms: ["iPhone", "iPad", "Apple Watch"],
    appStoreUrl: "https://apps.apple.com/es/app/duvifit/id6761272248",
    icon: "/assets/apps/store/duvifit.jpg",
    video: "/assets/apps/duvifit/preview.mp4",
    poster: "/assets/apps/duvifit/poster.jpg",
    videoDuration: 6,
  },
  {
    id: "horda",
    caseSlug: "horda-neon",
    name: "Horda Neón",
    tagline: { es: ["Horda Neón.", "Un juego en SpriteKit para", "iPhone, iPad, Mac, TV y Watch."], en: ["Horda Neón.", "A SpriteKit game for", "iPhone, iPad, Mac, TV and Watch."] },
    description: { es: "Roguelite en SpriteKit para cinco plataformas", en: "SpriteKit roguelite for five platforms" },
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "Apple Watch"],
    appStoreUrl: "",
    icon: "/assets/apps/horda/icon.png",
    screen: "/assets/apps/horda/screen.jpg",
    video: "/assets/apps/horda/preview.mp4",
    poster: "/assets/apps/horda/poster.jpg",
    videoDuration: 10,
    phoneColor: ["#454749", "#3b3b3b", "#181819"],
  },
  {
    id: "tipson-scan",
    name: "Tipson Scan",
    tagline: { es: ["Tipson Scan.", "Tickets y facturas", "escaneados con IA."], en: ["Tipson Scan.", "Receipts and invoices", "scanned with AI."] },
    description: { es: "Gastos y facturas con VisionKit e IA", en: "Expenses and invoices with VisionKit and AI" },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/tipson-scan-gastos-y-facturas/id6804655297",
    icon: "/assets/apps/store/tipson.jpg",
    video: "/assets/apps/tipson-scan/preview.mp4",
    poster: "/assets/apps/tipson-scan/poster.jpg",
    videoDuration: 6,
  },
  {
    id: "hazte-viral",
    name: "Hazte Viral",
    tagline: { es: ["Hazte Viral.", "La IA analiza tus vídeos", "y te escribe los guiones."], en: ["Hazte Viral.", "AI analyzes your videos", "and writes your scripts."] },
    description: { es: "Análisis de vídeo con IA y AVFoundation", en: "AI video analysis with AVFoundation" },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/hazte-viral/id6757550253",
    icon: "/assets/apps/store/hazte-viral.jpg",
    screen: "/assets/apps/hazte-viral/screen.jpg",
    video: "/assets/apps/hazte-viral/preview.mp4",
    poster: "/assets/apps/hazte-viral/poster.jpg",
    videoDuration: 6,
    phoneColor: ["#53596E", "#6395ff", "#21242e"],
  },
  {
    id: "ordenate",
    name: "Ordénate",
    description: { es: "Tu día por categorías y listas", en: "Your day by categories and lists" },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/ordenate/id6759111790",
    icon: "/assets/apps/store/ordenate.jpg",
    screen: "/assets/apps/ordenate/screen.jpg",
    phoneColor: ["#C9C8C2", "#ffffff", "#C9C8C2"],
  },
  {
    id: "teleprompter",
    name: "TelePrompter Duvi",
    description: { es: "Graba mientras lees tu guion", en: "Record while reading your script" },
    platforms: ["iPhone", "iPad"],
    appStoreUrl: "https://apps.apple.com/es/app/teleprompter-duvi/id6759974451",
    icon: "/assets/apps/store/teleprompter.jpg",
    screen: "/assets/apps/teleprompter/screen.jpg",
    phoneColor: ["#8F8A81", "#ffe7b9", "#6f6c64"],
  },
];

export const carouselApps = apps.filter((app) => app.video);
export const modelApps = apps.filter((app) => app.screen);

export const APP_STORE_DEVELOPER_URL = "https://apps.apple.com/es/developer/duverney-muriel/id1861505676";

// Apps publicadas en la App Store (datos de la ficha oficial)
export const publishedApps = [
  {
    id: "duvifit",
    name: "DuviFit",
    url: "https://apps.apple.com/es/app/duvifit/id6761272248",
    icon: "/assets/apps/store/duvifit.jpg",
    category: { es: "Salud y forma física", en: "Health & Fitness" },
    tagline: { es: "Rutinas y progreso en el gimnasio, también en Apple Watch.", en: "Gym routines and progress, also on Apple Watch." },
    platforms: ["iPhone", "iPad", "Apple Watch"],
    tech: ["HealthKit", "watchOS", "Live Activities", "Swift Charts"],
    caseSlug: "duvifit",
    featured: { image: "/assets/apps/duvifit/poster.jpg" },
    rating: 5,
    price: { es: "Gratis", en: "Free" },
  },
  {
    id: "tipson",
    name: "Tipson Scan",
    url: "https://apps.apple.com/es/app/tipson-scan-gastos-y-facturas/id6804655297",
    icon: "/assets/apps/store/tipson.jpg",
    category: { es: "Finanzas", en: "Finance" },
    tagline: { es: "Escáner de tickets y facturas con IA para autónomos.", en: "AI receipt and invoice scanner for freelancers." },
    platforms: ["iPhone", "iPad"],
    tech: ["VisionKit", "IA", "SwiftData", "App Intents"],
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
    tech: ["SwiftData", "CloudKit", "WidgetKit", "Face ID"],
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
    tech: ["visionOS", "SwiftUI"],
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
    tech: ["AVFoundation", "IA", "StoreKit 2"],
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
    tech: ["SwiftUI", "SwiftData"],
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
    tech: ["AVFoundation", "Photos"],
    price: { es: "2,99 €", en: "€2.99" },
  },
];

export const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

// Ecosistema: cada plataforma se enseña en su dispositivo con un proyecto real
// (componentes en components/devices). `project` dice de dónde sale lo que se ve.
export const platforms = [
  {
    id: "iphone",
    name: "iPhone",
    os: "iOS",
    duration: 15,
    project: {
      name: "Tipson Audit",
      story: {
        es: "Grabación real: escaneas un contrato, la IA lo analiza, marca las cláusulas de riesgo y te responde dudas en un chat.",
        en: "Real recording: you scan a contract, the AI analyzes it, flags risky clauses and answers your questions in a chat.",
      },
    },
    description: {
      es: "Apps nativas en SwiftUI y UIKit, widgets, Live Activities, Dynamic Island, App Clips y Apple Pay.",
      en: "Native SwiftUI and UIKit apps, widgets, Live Activities, Dynamic Island, App Clips and Apple Pay.",
    },
    features: ["SwiftUI", "WidgetKit", "Live Activities", "App Intents", "VisionKit", "StoreKit 2"],
  },
  {
    id: "watch",
    name: "Apple Watch",
    os: "watchOS",
    duration: 10,
    project: {
      name: "Horda Neón",
      story: {
        es: "Capturas reales: el juego completo en la muñeca, adaptado a partidas cortas y a una pantalla pequeña.",
        en: "Real captures: the full game on your wrist, adapted to short sessions and a small screen.",
      },
    },
    description: {
      es: "Complicaciones, entrenos con HealthKit, notificaciones accionables y apps independientes del iPhone, como DuviFit.",
      en: "Complications, HealthKit workouts, actionable notifications and standalone apps, like DuviFit.",
    },
    features: ["HealthKit", "WorkoutKit", "Complications", "Smart Stack", "WatchConnectivity"],
  },
  {
    id: "vision",
    name: "Vision Pro",
    os: "visionOS",
    duration: 7,
    project: {
      name: "DuviTricky",
      story: {
        es: "Publicada en la App Store para Vision Pro: tres en raya en ventanas de cristal que flotan en tu salón. Se juega mirando y pellizcando.",
        en: "Live on the App Store for Vision Pro: tic-tac-toe in glass windows floating in your living room. You play by looking and pinching.",
      },
    },
    description: {
      es: "Computación espacial: ventanas, volúmenes y espacios inmersivos con RealityKit. Y streaming con CloudXR.",
      en: "Spatial computing: windows, volumes and immersive spaces with RealityKit. Plus CloudXR streaming.",
    },
    features: ["RealityKit", "ARKit", "Immersive Spaces", "Volumes", "CloudXR"],
  },
  {
    id: "mac",
    name: "Mac",
    os: "macOS",
    duration: 11,
    project: {
      name: "Horda Neón",
      story: {
        es: "Capturas reales: el mismo juego a pantalla completa en Mac, con teclado, ratón o mando.",
        en: "Real captures: the same game full screen on Mac, with keyboard, mouse or controller.",
      },
    },
    description: {
      es: "Apps de escritorio en SwiftUI o Mac Catalyst, con teclado, ratón y mando, y distribución dentro o fuera de la App Store.",
      en: "Desktop apps with SwiftUI or Mac Catalyst, with keyboard, mouse and controller, in or outside the App Store.",
    },
    features: ["SwiftUI", "AppKit", "Mac Catalyst", "GameController", "Notarization"],
  },
  {
    id: "ipad",
    name: "iPad",
    os: "iPadOS",
    duration: 15,
    project: {
      name: "Tipson Audit",
      story: {
        es: "Grabación real: el mismo análisis de contratos que en iPhone, aprovechando la pantalla grande del iPad.",
        en: "Real recording: the same contract analysis as on iPhone, making the most of the iPad's large screen.",
      },
    },
    description: {
      es: "Layouts adaptativos, multiventana, Apple Pencil y Stage Manager para productividad, educación y juegos.",
      en: "Adaptive layouts, multiwindow, Apple Pencil and Stage Manager for productivity, education and games.",
    },
    features: ["Split View", "Stage Manager", "Apple Pencil", "Drag & Drop"],
  },
  {
    id: "tv",
    name: "Apple TV",
    os: "tvOS",
    duration: 8,
    project: {
      name: "Horda Neón",
      story: {
        es: "La imagen Top Shelf real en la pantalla de inicio de tvOS y, al abrirlo, el juego en la tele con el Siri Remote o un mando.",
        en: "The real Top Shelf image on the tvOS home screen and, once opened, the game on your TV with the Siri Remote or a controller.",
      },
    },
    description: {
      es: "Apps de contenido y juegos para el salón: Top Shelf, motor de foco, Siri Remote y mandos.",
      en: "Content apps and games for the living room: Top Shelf, focus engine, Siri Remote and controllers.",
    },
    features: ["Top Shelf", "Focus engine", "AVKit", "GameController"],
  },
  {
    id: "carplay",
    name: "CarPlay",
    os: "CarPlay",
    duration: 7,
    project: {
      name: { es: "Concepto", en: "Concept" },
      story: {
        es: "Ejemplo de app de movilidad: la ruta y el tiempo de llegada del conductor, en directo en la pantalla del coche.",
        en: "Sample mobility app: the route and the driver's arrival time, live on the car's display.",
      },
    },
    description: {
      es: "Apps de audio, navegación, aparcamiento, carga de vehículos eléctricos y movilidad en la pantalla del coche.",
      en: "Audio, navigation, parking, EV charging and mobility apps on the car's display.",
    },
    features: ["CarPlay", "MapKit", "CoreLocation"],
  },
];

export const techStack = [
  "Swift 6", "SwiftUI", "UIKit", "Objective-C", "SwiftData", "Core Data", "CloudKit",
  "Combine", "async/await", "StoreKit 2", "Apple Pay", "WidgetKit", "ActivityKit",
  "App Intents", "Foundation Models", "Core ML", "Vision", "HealthKit", "MapKit",
  "RealityKit", "ARKit", "AVFoundation", "Core Bluetooth", "HomeKit / Matter",
  "Push Notifications", "Sign in with Apple", "Firebase", "Supabase", "REST / GraphQL",
  "Swift Testing", "XCTest", "Xcode Cloud", "Fastlane", "TestFlight",
];

// Servicios: lo que un cliente o una agencia puede contratar
export const services = [
  {
    id: "new-app",
    page: "desarrollo-apps-ios",
    title: { es: "Apps nuevas y MVP", en: "New apps & MVPs" },
    description: {
      es: "De la idea a la App Store. Validamos el alcance contigo, diseñamos siguiendo las Human Interface Guidelines y entregamos una app nativa lista para crecer.",
      en: "From idea to App Store. We scope it with you, design to the Human Interface Guidelines and ship a native app ready to grow.",
    },
    tags: ["SwiftUI", "MVP", "App Store"],
  },
  {
    id: "rescue",
    page: "rescate-apps-ios",
    title: { es: "Rescate de apps y arreglo de código", en: "App rescue & code fixes" },
    description: {
      es: "¿El anterior desarrollador desapareció o la app se cae? Auditamos el código, arreglamos crashes y bugs y la dejamos estable y mantenible.",
      en: "Previous developer gone or the app keeps crashing? We audit the code, fix crashes and bugs, and leave it stable and maintainable.",
    },
    tags: ["Crashes", "Bugs", "Refactor"],
  },
  {
    id: "rejection",
    page: "rechazo-app-store",
    title: { es: "Rechazos de App Store", en: "App Store rejections" },
    description: {
      es: "Resolvemos rechazos de App Review: privacy manifests, permisos, compras in-app, Sign in with Apple y metadatos. Reenviamos hasta que se aprueba.",
      en: "We fix App Review rejections: privacy manifests, permissions, in-app purchases, Sign in with Apple and metadata, and resubmit until approved.",
    },
    tags: ["App Review", "Privacy", "Guidelines"],
  },
  {
    id: "modernize",
    title: { es: "Modernización", en: "Modernization" },
    description: {
      es: "Migración de Objective-C a Swift y de UIKit a SwiftUI, Swift 6 y concurrencia, adaptación a Liquid Glass y a cada nueva versión de iOS.",
      en: "Objective-C to Swift and UIKit to SwiftUI migrations, Swift 6 concurrency, Liquid Glass adoption and every new iOS release.",
    },
    tags: ["Obj-C → Swift", "UIKit → SwiftUI", "Swift 6"],
  },
  {
    id: "integrations",
    title: { es: "Integraciones", en: "Integrations" },
    description: {
      es: "Conectamos tu app con tu backend y tus herramientas: APIs REST/GraphQL, Firebase, Supabase, pagos, CRM/ERP, push, analítica, Bluetooth e IoT.",
      en: "We connect your app to your backend and tools: REST/GraphQL APIs, Firebase, Supabase, payments, CRM/ERP, push, analytics, Bluetooth and IoT.",
    },
    tags: ["APIs", "Pagos", "BLE / IoT"],
  },
  {
    id: "payments",
    title: { es: "Suscripciones y pagos", en: "Subscriptions & payments" },
    description: {
      es: "Compras in-app y suscripciones con StoreKit 2, paywalls, Apple Pay, Stripe y RevenueCat. Monetiza sin pelearte con las reglas de Apple.",
      en: "In-app purchases and subscriptions with StoreKit 2, paywalls, Apple Pay, Stripe and RevenueCat. Monetize without fighting Apple's rules.",
    },
    tags: ["StoreKit 2", "Apple Pay", "Paywalls"],
  },
  {
    id: "system",
    title: { es: "Widgets, Siri y Apple Intelligence", en: "Widgets, Siri & Apple Intelligence" },
    description: {
      es: "Lleva tu app más allá de su icono: widgets, Live Activities, Dynamic Island, Controles, App Intents, Atajos, App Clips e IA on-device.",
      en: "Take your app beyond its icon: widgets, Live Activities, Dynamic Island, Controls, App Intents, Shortcuts, App Clips and on-device AI.",
    },
    tags: ["WidgetKit", "App Intents", "Foundation Models"],
  },
  {
    id: "spatial",
    page: "desarrollo-vision-pro",
    title: { es: "Vision Pro, Watch y TV", en: "Vision Pro, Watch & TV" },
    description: {
      es: "Llevamos tu app de iPhone a visionOS, watchOS y tvOS, o creamos experiencias diseñadas específicamente para cada dispositivo.",
      en: "We extend your iPhone app to visionOS, watchOS and tvOS, or build experiences designed specifically for each device.",
    },
    tags: ["visionOS", "watchOS", "tvOS"],
  },
  {
    id: "native",
    title: { es: "De híbrido a nativo", en: "Hybrid to native" },
    description: {
      es: "¿Tu app en React Native o Flutter se queda corta en rendimiento o en funciones de Apple? La pasamos a Swift nativo, por partes o completa.",
      en: "Is your React Native or Flutter app falling short on performance or Apple features? We move it to native Swift, piece by piece or all at once.",
    },
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    id: "maintenance",
    page: "mantenimiento-apps-ios",
    title: { es: "Mantenimiento y soporte", en: "Maintenance & support" },
    description: {
      es: "Planes mensuales: compatibilidad con cada iOS, monitorización de crashes, actualizaciones de dependencias, mejoras y publicación.",
      en: "Monthly plans: compatibility with every iOS release, crash monitoring, dependency updates, improvements and releases.",
    },
    tags: ["Retainer", "Crashlytics", "Updates"],
  },
  {
    id: "audit",
    title: { es: "Auditoría y consultoría", en: "Audits & consulting" },
    description: {
      es: "Revisión de arquitectura, rendimiento, seguridad y accesibilidad, con un informe claro y priorizado de qué arreglar primero.",
      en: "Architecture, performance, security and accessibility review, with a clear, prioritized report of what to fix first.",
    },
    tags: ["Code review", "Performance", "A11y"],
  },
  {
    id: "release",
    title: { es: "Publicación y CI/CD", en: "Release & CI/CD" },
    description: {
      es: "App Store Connect, TestFlight, certificados, Xcode Cloud o Fastlane y fichas optimizadas (ASO) para publicar sin sustos.",
      en: "App Store Connect, TestFlight, certificates, Xcode Cloud or Fastlane, and optimized listings (ASO) for stress-free releases.",
    },
    tags: ["TestFlight", "Xcode Cloud", "ASO"],
  },
];

// Para quién trabajamos
export const audiences = [
  {
    id: "startups",
    title: { es: "Startups y emprendedores", en: "Startups & founders" },
    description: {
      es: "Lanza tu MVP en semanas, con código propio que podrás escalar o pasar a un equipo interno.",
      en: "Launch your MVP in weeks, with code you own and can scale or hand over to an in-house team.",
    },
  },
  {
    id: "companies",
    title: { es: "Empresas y pymes", en: "Companies & SMBs" },
    description: {
      es: "Apps para clientes o herramientas internas, integradas con tus sistemas, con mantenimiento a largo plazo.",
      en: "Customer apps or internal tools, integrated with your systems, with long-term maintenance.",
    },
  },
  {
    id: "agencies",
    page: "marca-blanca-agencias",
    title: { es: "Agencias", en: "Agencies" },
    description: {
      es: "Tu equipo iOS en marca blanca: nos integramos con vosotros, bajo NDA, para los proyectos Apple de vuestros clientes.",
      en: "Your white-label iOS team: we join you under NDA for your clients' Apple projects.",
    },
  },
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

export const stats = [
  { value: "1", label: { es: "interlocutor de principio a fin", en: "point of contact, start to finish" } },
  { value: "100%", label: { es: "nativo en Swift", en: "native Swift" } },
  { value: "24 h", label: { es: "para responderte", en: "to get back to you" } },
];

export const faqs = [
  {
    q: { es: "¿Solo trabajáis con Apple?", en: "Do you only work with Apple platforms?" },
    a: {
      es: "Sí. Nos especializamos en el ecosistema Apple con Swift nativo. Por eso aprovechamos cada novedad de iOS el mismo día que sale.",
      en: "Yes. We specialize in the Apple ecosystem with native Swift, which lets us adopt every new iOS feature on day one.",
    },
  },
  {
    q: { es: "¿Cuánto cuesta una app?", en: "How much does an app cost?" },
    a: {
      es: "Depende del alcance, las integraciones y las plataformas. Tras una primera llamada gratuita recibes un presupuesto cerrado por fases.",
      en: "It depends on scope, integrations and platforms. After a free first call you get a fixed, phased quote.",
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
    q: { es: "¿Trabajáis con agencias en marca blanca?", en: "Do you work white-label with agencies?" },
    a: {
      es: "Sí. Firmamos NDA, nos adaptamos a vuestras herramientas y hablamos con vuestro cliente solo si lo pedís.",
      en: "Yes. We sign NDAs, adapt to your tools and talk to your client only if you want us to.",
    },
  },
  {
    q: { es: "¿Ofrecéis mantenimiento después del lanzamiento?", en: "Do you offer maintenance after launch?" },
    a: {
      es: "Sí, con planes mensuales que cubren cada nueva versión de iOS, crashes, mejoras y publicaciones.",
      en: "Yes, with monthly plans covering every new iOS release, crashes, improvements and releases.",
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

// Formas de colaborar (sin precios públicos: presupuesto a medida)
export const engagements = [
  {
    id: "project",
    title: { es: "Proyecto cerrado", en: "Fixed-scope project" },
    tagline: { es: "Alcance, plazo y precio fijos.", en: "Fixed scope, timeline and price." },
    points: {
      es: ["Descubrimiento y prototipo incluidos", "Demo cada semana en TestFlight", "Publicación en la App Store", "Código y cuentas a tu nombre"],
      en: ["Discovery and prototype included", "Weekly TestFlight demo", "App Store release", "Code and accounts in your name"],
    },
  },
  {
    id: "retainer",
    highlight: true,
    title: { es: "Mantenimiento mensual", en: "Monthly retainer" },
    tagline: { es: "Tu app siempre al día, sin sustos.", en: "Your app always up to date, no surprises." },
    points: {
      es: ["Compatibilidad con cada versión de iOS", "Monitorización y corrección de crashes", "Horas de mejoras cada mes", "Respuesta prioritaria"],
      en: ["Compatibility with every iOS release", "Crash monitoring and fixes", "Monthly improvement hours", "Priority response"],
    },
  },
  {
    id: "agency",
    title: { es: "Marca blanca para agencias", en: "White-label for agencies" },
    tagline: { es: "Tu equipo iOS, cuando lo necesitas.", en: "Your iOS team, whenever you need it." },
    points: {
      es: ["NDA y discreción total", "Nos adaptamos a vuestras herramientas", "Por horas o por sprint", "Contacto con tu cliente solo si lo pides"],
      en: ["NDA and full discretion", "We adapt to your tools", "Hourly or per sprint", "Client contact only if you ask"],
    },
  },
];

// Por qué Swiftforge: pilares de la marca
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
    description: { es: "Publicamos y mantenemos productos propios en la App Store. Sabemos lo que cuesta llegar y quedarse.", en: "We ship and maintain our own products on the App Store. We know what it takes to get there and stay." },
  },
];
