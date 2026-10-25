# Swiftcraft

Web del estudio **Swiftcraft**: desarrollo de apps nativas en Swift para iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro y CarPlay.

Bilingüe (ES/EN). Pensada para captar clientes desde anuncios: mensaje claro arriba, prueba real (apps publicadas en la App Store y grabaciones de los proyectos), servicios con su propia landing, y un formulario corto o WhatsApp en todas las páginas.

## Stack

- React 18 + Vite, con React Router y pre-render estático (`vite-react-ssg`)
- Tailwind CSS
- GSAP + ScrollTrigger · Lenis (scroll suave)

## Arrancar

```bash
npm install
cp .env.example .env   # SMTP del formulario y, si hay campañas, los IDs de Google/Meta
npm run dev            # http://localhost:5173 (sin pre-render, para desarrollar)
npm run build          # HTML estático por página en dist/ + sitemap.xml y robots.txt
```

> Para probar el build usa un servidor estático (p. ej. `cd dist && python3 -m http.server`).
> `vite preview` no resuelve bien las rutas sin barra final y da falsos errores de hidratación.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Home |
| `/servicios` y `/servicios/<slug>` | 13 páginas de servicio, cada una landing de su campaña (`src/content/services.js`) |
| `/casos` y `/casos/<slug>` | Casos de estudio de Tipson Audit, DuviFit y Horda Neón (`src/content/cases.js`) |
| `/aviso-legal`, `/privacidad`, `/cookies` | Textos legales (`src/constants/legal.js`) |
| `/en/...` | Versión en inglés de todas las páginas, pre-renderizada (secciones y slugs traducidos en `src/i18n/paths.js` y `enSlug`) |

Cada página tiene su título, descripción, canonical, `hreflang` (es/en), Open Graph y datos estructurados (`src/components/Seo.jsx`).

## Idiomas y mercados

El idioma lo marca la URL: español en la raíz (mercado España) e inglés en `/en` (USA/UK). Cada idioma se pre-renderiza en su propio HTML, así que Google indexa los dos y los anuncios aterrizan sin parpadeo de idioma. En el código las rutas se escriben siempre en español; `SmartLink` y `Seo` las traducen solas.

- Precios "desde" en `PRICES` (`src/content/services.js`): `amount` en euros + IVA para España y `usd` en dólares, sin IVA, para USA/UK. `showPrices` (`src/constants/index.js`) los oculta por idioma si hace falta.
- Imagen para redes: `public/og.png` (español, con precio) y `public/og-en.png` (inglés).
- Anuncios en USA/UK: apunta a `/en/services/<enSlug>`.

## Dominio y despliegue

- El dominio se cambia en un solo sitio: `src/constants/site.js`. De ahí salen el canonical, el Open Graph y el sitemap.
- Vercel: importa el repo; `vercel.json` ya sirve `/servicios/x` desde `servicios/x/index.html`. Build command `npm run build`, output `dist`.
- Tras publicar, da de alta el dominio en Google Search Console (por DNS o con `VITE_GOOGLE_SITE_VERIFICATION`) y envía `/sitemap.xml`.

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Textos de la interfaz (ES/EN) | `src/i18n/es.js`, `src/i18n/en.js` |
| Apps (carrusel y App Store), servicios, proceso, FAQ, contacto, medición | `src/constants/index.js` |
| Maquetas de dispositivos (iPhone, Watch, Vision Pro, Mac, iPad, TV) | `src/components/devices/` |
| Capturas del escaparate por dispositivo | `public/assets/showcase/` |
| Textos legales | `src/constants/legal.js` |
| Testimonios (se muestran solo si hay) | `testimonials` en `src/constants/index.js` |
| Logo | `public/assets/brand/` |
| SEO por página (title, descripción, Open Graph, JSON-LD) | `src/components/Seo.jsx` y cada página; sitemap y robots en `scripts/sitemap.mjs` |
| Precios de partida | `PRICES` en `src/content/services.js`, en euros y en dólares (si cambias el del MVP en euros, regenera `public/og.png`, que lo lleva escrito) |
| Iconos | `public/favicon.svg`, `public/apple-touch-icon.png` (180 px) y `public/logo.png` (512 px, el logo para Google) |

Los valores provisionales están marcados con `TODO` en el código.

## Añadir una app

1. Crea `public/assets/apps/<id>/` con:
   - `preview.mp4` — vídeo H.264 de 4–6 s, < 3 MB (para el carrusel)
   - `poster.jpg` — primer fotograma del vídeo
   - `icon.png` — icono cuadrado de 256 px
2. Añade un objeto al array `apps` de `src/constants/index.js` (carrusel de la home).
3. Si está publicada, añádela también a `publishedApps` (sección App Store).

Para comprimir un screen recording:

```bash
ffmpeg -i grabacion.mov -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart preview.mp4
```

## Formulario de contacto

Lo envía la función `api/contact.js` (Vercel la publica sola como `POST /api/contact`) con [Nodemailer](https://nodemailer.com) por SMTP a tu buzón. Configura en Vercel › Settings › Environment Variables `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` y, si quieres, `MAIL_FROM` (ver `.env.example`). Son variables solo de servidor: nunca con prefijo `VITE_`.

- El email llega con *Responder a* el cliente, así que contestas directamente desde tu correo.
- Incluye la necesidad marcada, el idioma, la página desde la que se escribió y el origen de la visita (`utm_*`, `gclid`, `fbclid`, referrer). El origen se guarda solo en memoria, sin cookies, así que funciona aunque el visitante rechace las cookies.
- Anti-spam: un campo trampa invisible y un tiempo mínimo de relleno. A los bots se les responde "ok" sin enviar nada.
- En local, `npm run dev` no ejecuta funciones: para probar el envío usa `vercel dev`.

## Medición de campañas

Variables en `.env.example`: Google Analytics 4, Google Ads (ID + etiqueta de conversión) y Meta Pixel. Sin ninguna, no se carga nada y no aparece el aviso de cookies. Con alguna:

- Aparece un aviso de cookies con «Aceptar» y «Rechazar» al mismo nivel. Nada se carga hasta que se acepta; se puede cambiar desde «Preferencias de cookies» en el pie.
- La política de cookies y la de privacidad se adaptan solas a las herramientas configuradas.
- Eventos: `generate_lead` / conversión de Google Ads / `Lead` de Meta al enviar el formulario, y `contact` / `Contact` al pulsar WhatsApp, email o teléfono.

Para anuncios, usa como destino la página del servicio (`/servicios/<slug>`) que corresponda a cada grupo de anuncios y etiqueta las URL con `utm_source`, `utm_medium` y `utm_campaign`.

## Créditos

- iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro y CarPlay son marcas de Apple Inc. Swiftcraft es un estudio independiente sin relación con Apple.
# iphoneweb
# ioscraft
# ioscraft
