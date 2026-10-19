# Swiftforge

Web del estudio **Swiftforge**: desarrollo de apps nativas en Swift para iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro y CarPlay.

Bilingüe (ES/EN). Enseña el trabajo real del estudio: apps publicadas en la App Store, grabaciones y capturas de los proyectos en cada dispositivo Apple, un iPhone 3D interactivo y un formulario de contacto corto.

## Stack

- React 18 + Vite, con React Router y pre-render estático (`vite-react-ssg`)
- Tailwind CSS
- GSAP + ScrollTrigger · Lenis (scroll suave)
- Three.js · React Three Fiber · Drei

## Arrancar

```bash
npm install
cp .env.example .env   # añade tu ID de Formspree
npm run dev            # http://localhost:5173 (sin pre-render, para desarrollar)
npm run build          # HTML estático por página en dist/ + sitemap.xml y robots.txt
```

> Para probar el build usa un servidor estático (p. ej. `cd dist && python3 -m http.server`).
> `vite preview` no resuelve bien las rutas sin barra final y da falsos errores de hidratación.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Home |
| `/servicios` y `/servicios/<slug>` | 7 páginas de servicio pensadas para Google (`src/content/services.js`) |
| `/casos` y `/casos/<slug>` | Casos de estudio de Tipson Audit, DuviFit y Horda Neón (`src/content/cases.js`) |
| `/aviso-legal`, `/privacidad`, `/cookies` | Textos legales (`src/constants/legal.js`) |

Cada página tiene su título, descripción, canonical, Open Graph y datos estructurados (`src/components/Seo.jsx`).

## Dominio y despliegue

- El dominio se cambia en un solo sitio: `src/constants/site.js`. De ahí salen el canonical, el Open Graph y el sitemap.
- Vercel: importa el repo; `vercel.json` ya sirve `/servicios/x` desde `servicios/x/index.html`. Build command `npm run build`, output `dist`.
- Tras publicar, da de alta el dominio en Google Search Console y envía `/sitemap.xml`.

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Textos de la interfaz (ES/EN) | `src/i18n/es.js`, `src/i18n/en.js` |
| Apps (carrusel, 3D y App Store), plataformas, servicios, FAQ, contacto | `src/constants/index.js` |
| Maquetas de dispositivos (iPhone, Watch, Vision Pro, Mac, iPad, TV, CarPlay) | `src/components/devices/` |
| Capturas del escaparate por dispositivo | `public/assets/showcase/` |
| Textos legales | `src/constants/legal.js` |
| Testimonios (se muestran solo si hay) | `testimonials` en `src/constants/index.js` |
| Logo | `public/assets/brand/` |
| SEO (title, Open Graph, JSON-LD) | `index.html`, `public/sitemap.xml`, `public/robots.txt` |

Los valores provisionales están marcados con `TODO` en el código.

## Añadir una app

1. Crea `public/assets/apps/<id>/` con:
   - `screen.jpg` — captura **1290×2796** (tamaño App Store 6.7"); se pinta en la pantalla del iPhone 3D
   - `preview.mp4` — vídeo H.264 de 4–6 s, < 3 MB (para el carrusel)
   - `poster.jpg` — primer fotograma del vídeo
   - `icon.png` — icono cuadrado
2. Añade un objeto al array `apps` de `src/constants/index.js`. Con `video` sale en el carrusel; con `screen`, en el iPhone 3D.
3. Si está publicada, añádela también a `publishedApps` (sección App Store).

Para comprimir un screen recording:

```bash
ffmpeg -i grabacion.mov -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart preview.mp4
```

## Formulario de contacto

Usa [Formspree](https://formspree.io). Crea un formulario y pon su ID en `VITE_FORMSPREE_ID`. Sin ID, el formulario abre el cliente de correo con el mensaje ya redactado.

## Créditos

- Modelo 3D: "Apple iPhone 15 Pro Max Black" de [polyman](https://sketchfab.com/Polyman_3D), licencia CC BY 4.0.
- iPhone, iPad, Mac, Apple Watch, Apple TV, Vision Pro y CarPlay son marcas de Apple Inc. Swiftforge es un estudio independiente sin relación con Apple.
# iphoneweb
