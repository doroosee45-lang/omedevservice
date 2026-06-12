// controllers/contactController.js
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Envoyer un message de contact (public)
// @route   POST /api/contact
// @access  Public
const sendContactMessage = async (req, res) => {
  const { nom, email, phone, objet, message } = req.body;

  if (!nom || !email || !objet || !message) {
    return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires' });
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide' });
  }

  // Sauvegarder en base de données
  await ContactMessage.create({ nom, email, phone: phone || '', objet, message });

  try {
    // Email de confirmation au client
    await transporter.sendMail({
      from: `"Omedev Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmation de votre message - Omedev Services`,
      html: `
        <!DOCTYPE html><html><head><meta charset="UTF-8">
        <style>
          body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
          .container{max-width:600px;margin:0 auto;padding:20px}
          .header{background:linear-gradient(135deg,#2563eb,#06b6d4);padding:20px;text-align:center;border-radius:10px 10px 0 0}
          .header h1{color:white;margin:0;font-size:24px}
          .content{background:#f8fafc;padding:30px;border-radius:0 0 10px 10px}
          .footer{text-align:center;padding:20px;font-size:12px;color:#64748b}
          .message-box{background:white;padding:15px;border-radius:8px;border-left:4px solid #2563eb;margin:20px 0}
        </style></head>
        <body>
          <div class="container">
            <div class="header"><h1>Omedev Services</h1></div>
            <div class="content">
              <h2>Bonjour ${nom},</h2>
              <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
              <div class="message-box">
                <p><strong>Votre message :</strong></p>
                <p style="font-style:italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
              </div>
              <p>Notre équipe va étudier votre demande et vous répondra dans les plus brefs délais <strong>(sous 24h ouvrées)</strong>.</p>
              <p>Cordialement,<br><strong>L'équipe Omedev Services</strong></p>
            </div>
            <div class="footer"><p>Omedev Services - Solutions IT, Énergie & Digital</p></div>
          </div>
        </body></html>
      `,
    });

    // Email de notification à l'équipe
    await transporter.sendMail({
      from: `"Formulaire Contact OMDEVE" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau message de contact - ${objet}`,
      html: `
        <!DOCTYPE html><html><head><meta charset="UTF-8">
        <style>
          body{font-family:Arial,sans-serif}
          .container{max-width:600px;margin:0 auto;padding:20px}
          .header{background:#2563eb;color:white;padding:15px;border-radius:10px 10px 0 0}
          .content{background:#f8fafc;padding:20px}
          .info{margin:10px 0;padding:10px;background:white;border-radius:5px}
          .label{font-weight:bold;color:#2563eb}
        </style></head>
        <body>
          <div class="container">
            <div class="header"><h2>📬 Nouveau message depuis le site</h2></div>
            <div class="content">
              <div class="info">
                <p><span class="label">👤 Nom :</span> ${nom}</p>
                <p><span class="label">📧 Email :</span> ${email}</p>
                <p><span class="label">📞 Téléphone :</span> ${phone || 'Non renseigné'}</p>
                <p><span class="label">📝 Objet :</span> ${objet}</p>
                <p><span class="label">💬 Message :</span></p>
                <p style="background:white;padding:10px;border-left:3px solid #2563eb;margin-top:5px;">${message}</p>
              </div>
              <p style="margin-top:20px;font-size:12px;color:#64748b;">Message reçu le ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body></html>
      `,
    });
  } catch (emailError) {
    console.error('Erreur envoi email contact:', emailError);
    // On ne bloque pas : le message est déjà en base
  }

  res.status(200).json({
    success: true,
    message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
  });
};

// @desc    Obtenir tous les messages de contact (Admin)
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res) => {
  const { isRead, page = 1, limit = 20 } = req.query;
  const query = {};
  if (isRead !== undefined) query.isRead = isRead === 'true';

  const total = await ContactMessage.countDocuments(query);
  const messages = await ContactMessage.find(query)
    .sort('-createdAt')
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  res.json({ total, page: Number(page), messages });
};

// @desc    Obtenir un message par ID (Admin)
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactMessageById = async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error('Message introuvable');
  }
  // Marquer comme lu automatiquement à l'ouverture
  if (!msg.isRead) {
    msg.isRead = true;
    msg.readAt = new Date();
    await msg.save();
  }
  res.json(msg);
};

// @desc    Marquer un message comme lu (Admin)
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
const markMessageAsRead = async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error('Message introuvable');
  }
  msg.isRead = true;
  msg.readAt = new Date();
  await msg.save();
  res.json({ success: true, message: 'Message marqué comme lu' });
};

// @desc    Supprimer un message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContactMessage = async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error('Message introuvable');
  }
  await msg.deleteOne();
  res.json({ success: true, message: 'Message supprimé' });
};

// @desc    Statistiques des messages (Admin)
// @route   GET /api/contact/stats
// @access  Private/Admin
const getContactStats = async (req, res) => {
  const [total, unread] = await Promise.all([
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
  ]);
  res.json({ total, unread, read: total - unread });
};

module.exports = {
  sendContactMessage,
  getContactMessages,
  getContactMessageById,
  markMessageAsRead,
  deleteContactMessage,
  getContactStats,
};
