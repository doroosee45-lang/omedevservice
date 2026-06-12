
// // src/utils/emailService.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /**
//  * Envoie un email générique
//  * @param {Object} options - { to, subject, html, text }
//  */
// const sendEmail = async (options) => {
//   try {
//     const mailOptions = {
//       from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
//       to: options.to,
//       subject: options.subject,
//       html: options.html,
//       text: options.text,
//     };
//     await transporter.sendMail(mailOptions);
//     console.log(`Email envoyé à ${options.to}`);
//   } catch (error) {
//     console.error(`Erreur d'envoi d'email à ${options.to}:`, error);
//     throw error;
//   }
// };

// /**
//  * Email de confirmation de contact
//  */
// const sendContactConfirmation = async (to, name, message) => {
//   const subject = 'Confirmation de votre message - OMDEVE Services';
//   const html = `
//     <div style="font-family: Arial, sans-serif;">
//       <h2>Bonjour ${name},</h2>
//       <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
//       <p>Votre message : <em>${message.substring(0, 200)}...</em></p>
//       <p>Cordialement,<br>L'équipe Omedev</p>
//     </div>
//   `;
//   await sendEmail({ to, subject, html });
// };

// /**
//  * Email de notification interne pour un nouveau message de contact
//  */
// const sendContactNotificationToAdmin = async (contactData) => {
//   const { nom, email, phone, objet, message } = contactData;
//   const subject = `Nouveau message de contact - ${objet}`;
//   const html = `
//     <div>
//       <h2>Nouveau message depuis le site</h2>
//       <p><strong>Nom :</strong> ${nom}</p>
//       <p><strong>Email :</strong> ${email}</p>
//       <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
//       <p><strong>Objet :</strong> ${objet}</p>
//       <p><strong>Message :</strong><br/>${message}</p>
//     </div>
//   `;
//   await sendEmail({ to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, subject, html });
// };

// /**
//  * Email de confirmation de demande de devis
//  */
// const sendQuoteRequestConfirmation = async (to, name, requestNumber) => {
//   const subject = `Confirmation de votre demande de devis - ${requestNumber}`;
//   const html = `
//     <div>
//       <h2>Merci ${name} !</h2>
//       <p>Votre demande de devis a bien été enregistrée sous le numéro <strong>${requestNumber}</strong>.</p>
//       <p>Notre équipe vous contactera sous 48h.</p>
//     </div>
//   `;
//   await sendEmail({ to, subject, html });
// };

// /**
//  * Email de notification d'audit avec le rapport PDF
//  */
// const sendAuditReport = async (to, name, requestNumber, pdfUrl) => {
//   const subject = `Rapport d'audit OMDEVE - ${requestNumber}`;
//   const html = `
//     <div>
//       <h2>Bonjour ${name},</h2>
//       <p>Votre audit est disponible. Vous pouvez télécharger votre rapport ci-dessous :</p>
//       <a href="${process.env.BACKEND_URL}${pdfUrl}" style="background:#2563eb; color:white; padding:10px 20px; text-decoration:none;">Télécharger le PDF</a>
//       <p>L'équipe OMDEVE reste à votre disposition.</p>
//     </div>
//   `;
//   await sendEmail({ to, subject, html });
// };

// module.exports = {
//   sendEmail,
//   sendContactConfirmation,
//   sendContactNotificationToAdmin,
//   sendQuoteRequestConfirmation,
//   sendAuditReport,
// };

// ============================================================
// src/utils/emailService.js
// Service d'envoi d'emails — OMDEVE Services
// Harmonisé avec la charte graphique OMDEVE (bleu, cyan, dégradés)
// ============================================================

const nodemailer = require('nodemailer');

// ------------------------------------------------------------
// Configuration du transporteur SMTP
// ------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ============================================================
// COMPOSANTS RÉUTILISABLES – DESIGN OMDEVE
// ============================================================

// Enveloppe principale : header + body + footer
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OMDEVE Services</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:'Segoe UI', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- HEADER (dégradé OMDEVE) -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #0c1a40 0%, #1e1b4b 100%);
              border-radius: 16px 16px 0 0;
              padding: 32px 40px 24px;
              border-bottom: 1px solid rgba(59,130,246,0.2);
            ">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background: linear-gradient(135deg, #2563eb, #06b6d4);
                    border-radius: 10px;
                    width: 42px; height: 42px;
                    text-align: center; vertical-align: middle;
                    font-weight: 800; font-size: 20px; color: #fff;
                  ">O</td>
                  <td style="padding-left: 14px;">
                    <span style="font-size: 20px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px;">OMDEVE</span>
                    <span style="font-size: 11px; color: #64748b; display: block; margin-top: 2px;">Services IT &amp; Infrastructure</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="
              background: #0f172a;
              border-left: 1px solid rgba(59,130,246,0.12);
              border-right: 1px solid rgba(59,130,246,0.12);
              padding: 40px 40px 32px;
            ">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="
              background: #0c1225;
              border-radius: 0 0 16px 16px;
              border: 1px solid rgba(59,130,246,0.12);
              border-top: 1px solid rgba(59,130,246,0.18);
              padding: 24px 40px;
            ">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 12px; color: #475569; line-height: 1.8;">
                    <strong style="color: #64748b;">OMDEVE Services</strong><br/>
                    Avenue Kabmabre n°75, Lingwala, Kinshasa<br/>
                    <a href="tel:+24355550359" style="color: #3b82f6; text-decoration: none;">+243 555 503 59</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:omedevservices@gmail.com" style="color: #3b82f6; text-decoration: none;">omedevservices@gmail.com</a>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="
                      display: inline-block;
                      background: rgba(16,185,129,0.12);
                      border: 1px solid rgba(16,185,129,0.28);
                      color: #34d399;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.08em;
                      text-transform: uppercase;
                      padding: 4px 12px;
                      border-radius: 20px;
                    ">● Support 24/7</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 14px;">
                    <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 14px;">
                      <p style="font-size: 11px; color: #334155; margin: 0;">
                        Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Badge coloré (style pill – comme dans le front-end)
const badge = (emoji, text, color = '#93c5fd', bg = 'rgba(59,130,246,0.12)', border = 'rgba(59,130,246,0.3)') => `
  <div style="
    display: inline-block;
    background: ${bg};
    border: 1px solid ${border};
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 20px;
  ">
    <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${color};">
      ${emoji}&nbsp; ${text}
    </span>
  </div>
`;

// Titre H1
const heading = (text) => `
  <h1 style="margin: 0 0 10px; font-size: 26px; font-weight: 800; color: #f1f5f9; line-height: 1.25;">
    ${text}
  </h1>
`;

// Sous‑titre avec ligne décorative
const subtitle = (text) => `
  <div style="width: 36px; height: 3px; background: linear-gradient(90deg, #3b82f6, #06b6d4); border-radius: 2px; margin-bottom: 16px;"></div>
  <p style="margin: 0 0 24px; font-size: 15px; color: #94a3b8; line-height: 1.75;">${text}</p>
`;

// Carte avec bordure latérale de couleur
const card = (content, accentColor = '#3b82f6') => `
  <div style="
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-left: 3px solid ${accentColor};
    border-radius: 12px;
    padding: 20px 24px;
    margin: 20px 0;
  ">
    ${content}
  </div>
`;

// Ligne de données (label / valeur)
const dataRow = (label, value) => `
  <tr>
    <td style="padding: 9px 0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; width: 130px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.04);">${label}</td>
    <td style="padding: 9px 0; font-size: 14px; color: #e2e8f0; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.04);">${value}</td>
  </tr>
`;

// Bouton CTA
const ctaButton = (text, url, emoji = '') => `
  <div style="text-align: center; margin: 28px 0 8px;">
    <a href="${url}" style="
      display: inline-block;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      padding: 14px 36px;
      border-radius: 10px;
    ">${emoji ? emoji + '&nbsp;&nbsp;' : ''}${text}</a>
  </div>
`;

// Bloc d'information (vert ou bleu)
const infoBlock = (text, color = '#7dd3fc', bg = 'rgba(59,130,246,0.07)', border = 'rgba(59,130,246,0.15)') => `
  <div style="
    background: ${bg};
    border: 1px solid ${border};
    border-radius: 10px;
    padding: 14px 20px;
    margin: 20px 0;
  ">
    <p style="margin: 0; font-size: 13px; color: ${color}; line-height: 1.75;">${text}</p>
  </div>
`;

// Signature OMDEVE
const signature = () => `
  <div style="border-top: 1px solid rgba(255,255,255,0.06); margin-top: 28px; padding-top: 24px;">
    <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.9;">
      Cordialement,<br/>
      <strong style="color: #94a3b8;">L'équipe OMDEVE Services</strong>
    </p>
  </div>
`;

// ============================================================
// FONCTIONS D'ENVOI D'EMAILS
// ============================================================

// Générique
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email envoyé à : ${options.to}`);
  } catch (error) {
    console.error(`❌ Erreur d'envoi d'email à ${options.to} :`, error);
    throw error;
  }
};

// Confirmation de contact au visiteur
const sendContactConfirmation = async (to, name, message) => {
  const subject = 'Confirmation de votre message — OMDEVE Services';

  const html = emailWrapper(`
    ${badge('✉️', 'Message reçu')}
    ${heading(`Bonjour ${name},`)}
    ${subtitle('Nous avons bien reçu votre message et vous répondrons sous 24h.')}

    ${card(`
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569;">Votre message</p>
      <p style="margin: 0; font-size: 14px; color: #94a3b8; font-style: italic;">&ldquo;${message.substring(0, 200)}${message.length > 200 ? '...' : ''}&rdquo;</p>
    `)}

    ${infoBlock(
      '⚡&nbsp;&nbsp;Notre équipe s\'engage à vous répondre sous <strong>24h ouvrées</strong>.',
      '#34d399',
      'rgba(16,185,129,0.08)',
      'rgba(16,185,129,0.2)'
    )}

    ${signature()}
  `);

  await sendEmail({ to, subject, html });
};

// Notification interne à l'équipe OMDEVE
const sendContactNotificationToAdmin = async (contactData) => {
  const { nom, email, phone, objet, message } = contactData;
  const subject = `📩 Nouveau contact — ${objet}`;

  const html = emailWrapper(`
    ${badge('📩', 'Nouveau message', '#fcd34d', 'rgba(245,158,11,0.1)', 'rgba(245,158,11,0.3)')}
    ${heading('Nouveau message depuis le site')}
    ${subtitle('Un visiteur vient de soumettre le formulaire de contact.')}

    ${card(`
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${dataRow('Nom', nom)}
        ${dataRow('Email', `<a href="mailto:${email}" style="color:#3b82f6;">${email}</a>`)}
        ${dataRow('Téléphone', phone || '<span style="color:#475569;">Non renseigné</span>')}
        ${dataRow('Objet', `<strong style="color:#f1f5f9;">${objet}</strong>`)}
      </table>
    `, '#f59e0b')}

    ${card(`
      <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #475569;">Contenu du message</p>
      <p style="margin: 0; font-size: 14px; color: #cbd5e1;">${message}</p>
    `)}

    ${ctaButton('Répondre par email', `mailto:${email}`, '↩️')}
  `);

  await sendEmail({
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    subject,
    html,
  });
};

// Confirmation de demande de devis
const sendQuoteRequestConfirmation = async (to, name, requestNumber) => {
  const subject = `Confirmation de votre demande de devis — ${requestNumber}`;

  const html = emailWrapper(`
    ${badge('📋', 'Demande de devis', '#c4b5fd', 'rgba(139,92,246,0.1)', 'rgba(139,92,246,0.3)')}
    ${heading(`Merci ${name} !`)}
    ${subtitle('Votre demande de devis a bien été enregistrée.')}

    ${card(`
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${dataRow('Référence', `<strong style="color:#a78bfa;">${requestNumber}</strong>`)}
        ${dataRow('Statut', '<span style="color:#34d399;">✔ Enregistrée</span>')}
        ${dataRow('Délai de réponse', 'Sous <strong>48h ouvrées</strong>')}
      </table>
    `, '#8b5cf6')}

    ${infoBlock(
      '💬&nbsp;&nbsp;Pour toute question urgente, appelez-nous au <a href="tel:+24355550359" style="color:#3b82f6;">+243 555 503 59</a> ou via <a href="https://wa.me/24355550359" style="color:#22c55e;">WhatsApp</a>.'
    )}

    ${signature()}
  `);

  await sendEmail({ to, subject, html });
};

// Envoi du rapport d'audit avec lien PDF
const sendAuditReport = async (to, name, requestNumber, pdfUrl) => {
  const subject = `Rapport d'audit OMDEVE — ${requestNumber}`;

  const html = emailWrapper(`
    ${badge('📊', 'Rapport d\'audit disponible', '#67e8f9', 'rgba(6,182,212,0.1)', 'rgba(6,182,212,0.3)')}
    ${heading(`Bonjour ${name},`)}
    ${subtitle('Votre rapport d\'audit est prêt. Téléchargez-le ci-dessous.')}

    ${card(`
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${dataRow('Référence', `<strong style="color:#67e8f9;">${requestNumber}</strong>`)}
        ${dataRow('Statut', '<span style="color:#34d399;">✔ Rapport généré</span>')}
        ${dataRow('Format', 'PDF — Téléchargeable immédiatement')}
      </table>
    `, '#06b6d4')}

    ${ctaButton('Télécharger le rapport PDF', `${process.env.BACKEND_URL}${pdfUrl}`, '📄')}

    ${infoBlock(
      '🔒&nbsp;&nbsp;Ce lien est sécurisé et personnel. Merci de ne pas le partager.'
    )}

    ${signature()}
  `);

  await sendEmail({ to, subject, html });
};

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  sendEmail,
  sendContactConfirmation,
  sendContactNotificationToAdmin,
  sendQuoteRequestConfirmation,
  sendAuditReport,
};