import nodemailer from 'nodemailer';
import { BRAND_NAME, SITE_URL } from '../src/constants/site.js';

// Formulario de contacto. Vercel lo publica como función (POST /api/contact) y envía cada lead
// a tu buzón por SMTP con Nodemailer. Variables de entorno, solo en el servidor (sin prefijo VITE_):
// SMTP_HOST, SMTP_PORT (465 = SSL), SMTP_USER, SMTP_PASS, MAIL_TO (quién recibe) y MAIL_FROM (remitente,
// por defecto SMTP_USER).

const NEEDS = { 'new-app': 'App nueva', 'fix-app': 'Mejorar o arreglar una app', other: 'Otra cosa' };
// origen de la visita que manda el formulario (ver src/utils/tracking.js)
const ATTRIBUTION = ['landing', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
// un humano tarda más que esto en rellenar el formulario; los bots lo envían al instante
const MIN_FILL_MS = 1500;

// una línea (sin saltos, para cabeceras como el asunto) y texto libre, ambos con tope de longitud
const line = (value, max = 300) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const text = (value, max) => String(value ?? '').trim().slice(0, max);
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
// Email de una variable de entorno tal como suele pegarse en Vercel: con espacios, entre comillas
// o con nombre ("Swiftcraft <info@ioscraft.app>"). Devuelve solo la dirección, o '' si no es válida.
const envEmail = (value) => {
  const raw = String(value ?? '').trim().replace(/^["']+|["']+$/g, '');
  const address = (raw.match(/<([^>]+)>/)?.[1] ?? raw).trim();
  return isEmail(address) ? address : '';
};

let transporter;
const getTransporter = () => {
  const port = Number(process.env.SMTP_PORT || 465);
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER?.trim(), pass: process.env.SMTP_PASS },
    // por debajo del límite de la función en Vercel, para responder con un error claro y no con un 504
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
  return transporter;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  let body = req.body ?? {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'invalid' });
    }
  }

  // trampas anti-spam: se responde "ok" para que el bot no lo reintente
  if (body.website || !(Number(body.elapsed) >= MIN_FILL_MS)) {
    return res.status(200).json({ ok: true });
  }

  const name = line(body.name, 120);
  const email = line(body.email, 200);
  const message = text(body.message, 5000);
  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const sender = envEmail(process.env.MAIL_FROM) || envEmail(process.env.SMTP_USER);
  const recipient = envEmail(process.env.MAIL_TO);
  if (!process.env.SMTP_HOST || !sender || !recipient) {
    console.error('[contact] Revisa SMTP_HOST, SMTP_USER/MAIL_FROM y MAIL_TO: falta alguna o no es un email válido');
    return res.status(500).json({ ok: false, error: 'config' });
  }

  const need = NEEDS[body.need] ?? NEEDS.other;
  const details = [
    ['Necesidad', need],
    ['Idioma', line(body.language, 5)],
    ['Página', line(body.page)],
    ...ATTRIBUTION.map((key) => [key, line(body[key])]),
  ].filter(([, value]) => value);

  const plain = `${message}\n\n— ${name} <${email}>\n\n${details.map(([key, value]) => `${key}: ${value}`).join('\n')}`;
  const html = `
    <p style="font-size:16px;white-space:pre-wrap">${escapeHtml(message)}</p>
    <p><strong>${escapeHtml(name)}</strong> · <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <table style="font-size:13px;color:#555;border-collapse:collapse">
      ${details.map(([key, value]) => `<tr><td style="padding:2px 12px 2px 0">${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`).join('')}
    </table>
    <p style="font-size:12px;color:#999">Enviado desde el formulario de ${escapeHtml(SITE_URL)}</p>`;

  try {
    await getTransporter().sendMail({
      from: { name: `Web ${BRAND_NAME}`, address: sender },
      to: recipient,
      // al darle a "Responder" le escribes directamente al cliente
      replyTo: { name, address: email },
      subject: `${BRAND_NAME} · ${name} · ${need}`,
      text: plain,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] No se pudo enviar el email:', error.code, error.responseCode, error.message);
    // solo el código (EAUTH, ECONNECTION, EENVELOPE…): sirve para diagnosticar sin exponer nada sensible
    return res.status(502).json({ ok: false, error: 'smtp', code: error.code, responseCode: error.responseCode });
  }
}
