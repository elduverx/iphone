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

let transporter;
const getTransporter = () => {
  const port = Number(process.env.SMTP_PORT || 465);
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
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

  if (!process.env.SMTP_HOST || !process.env.MAIL_TO) {
    console.error('[contact] Faltan SMTP_HOST o MAIL_TO en las variables de entorno');
    return res.status(500).json({ ok: false });
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
      from: { name: `Web ${BRAND_NAME}`, address: process.env.MAIL_FROM || process.env.SMTP_USER },
      to: process.env.MAIL_TO,
      // al darle a "Responder" le escribes directamente al cliente
      replyTo: { name, address: email },
      subject: `${BRAND_NAME} · ${name} · ${need}`,
      text: plain,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[contact] No se pudo enviar el email:', error.message);
    return res.status(502).json({ ok: false });
  }
}
