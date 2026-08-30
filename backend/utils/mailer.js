// utils/mailer.js - Envoi d'emails via Resend (API HTTPS), plus SMTP.
//
// Render bloque/timeout les connexions SMTP sortantes vers
// smtp.gmail.com:587 (confirmé par audit : ETIMEDOUT reproductible,
// survenant avant toute tentative d'authentification - donc indépendant
// des identifiants). Resend fonctionne via une API HTTPS classique
// (port 443), qui n'est pas concerné par ce blocage.
//
// Interface compatible avec l'usage existant de nodemailer dans le
// projet : sendMail({ from, to, subject, html, attachments }).
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Sans domaine personnalisé vérifié sur resend.com/domains, Resend
// n'autorise l'envoi qu'à l'adresse du titulaire du compte (mode bac à
// sable) - onboarding@resend.dev est l'expéditeur de test fourni par
// Resend pour ce mode. Une fois un domaine vérifié, définir
// RESEND_FROM_EMAIL (ex: contact@omedevservices.com) pour l'utiliser à
// la place et pouvoir écrire à n'importe quel destinataire.
const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// `from` peut être soit déjà un couple "Nom <email>" complet (repris tel
// quel), soit juste un nom d'affichage (ex: "Formulaire Contact OMEDEV"),
// auquel cas l'adresse d'envoi réelle est toujours DEFAULT_FROM_EMAIL -
// Resend rejette de toute façon toute adresse d'un domaine non vérifié.
const buildFrom = (from) => {
  if (!from) return `OMEDEV Services <${DEFAULT_FROM_EMAIL}>`;
  if (from.includes('<') && from.includes('>')) return from.replace(/<[^>]+>/, `<${DEFAULT_FROM_EMAIL}>`);
  return `${from} <${DEFAULT_FROM_EMAIL}>`;
};

const sendMail = async ({ from, to, subject, html, attachments }) => {
  const payload = { from: buildFrom(from), to, subject, html };
  if (attachments?.length) payload.attachments = attachments;

  const { data, error } = await resend.emails.send(payload);
  if (error) {
    const err = new Error(error.message || 'Erreur envoi email (Resend)');
    err.code = error.name;
    err.statusCode = error.statusCode;
    throw err;
  }
  return data;
};

module.exports = { sendMail };
