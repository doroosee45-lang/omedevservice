// backend/controllers/newsletterController.js
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ─── EMAIL TEMPLATES ─────────────────────────────────────────────────────────

const confirmationEmail = (name, email, unsubToken) => ({
  from: `"Omedev Services" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: '✅ Vous êtes inscrit à la newsletter Omedev',
  html: `
    <div style="font-family:'DM Sans',Arial,sans-serif;max-width:580px;margin:0 auto;background:#0f172a;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1d4ed8,#4338ca);padding:36px 32px;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:28px;">📬</span>
        </div>
        <h1 style="color:white;font-size:22px;font-weight:800;margin:0 0 8px;">Bienvenue dans la newsletter !</h1>
        <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0;">Omedev Services • Actualités IT, Énergie & Ferronnerie</p>
      </div>
      <div style="padding:32px;color:#cbd5e1;">
        <p style="font-size:15px;margin:0 0 16px;">Bonjour ${name || 'cher abonné'} 👋,</p>
        <p style="font-size:14px;line-height:1.7;margin:0 0 20px;">
          Merci de vous être inscrit à notre newsletter ! Vous recevrez désormais nos dernières actualités,
          innovations et offres spéciales directement dans votre boîte mail.
        </p>
        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Ce que vous recevrez</p>
          <ul style="margin:0;padding-left:20px;font-size:14px;line-height:2;">
            <li>📰 Actualités IT & infrastructure</li>
            <li>⚡ Nouveautés énergie & équipements</li>
            <li>🔨 Projets ferronnerie & mobilier</li>
            <li>🎁 Offres et promotions exclusives</li>
          </ul>
        </div>
        <p style="font-size:12px;color:#64748b;text-align:center;margin:0;">
          Vous souhaitez vous désabonner ?
          <a href="${FRONTEND_URL}/newsletter/unsubscribe?token=${unsubToken}" style="color:#94a3b8;">Cliquer ici</a>
        </p>
      </div>
    </div>
  `,
});

const articleNotificationEmail = (subscriber, article) => {
  const articleUrl = `${FRONTEND_URL}/blog/${article.slug}`;
  const unsubUrl   = `${FRONTEND_URL}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
  return {
    from: `"Omedev Services" <${process.env.EMAIL_USER}>`,
    to: subscriber.email,
    subject: `📰 ${article.title} — Omedev Services`,
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:580px;margin:0 auto;background:#0f172a;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1d4ed8,#4338ca);padding:28px 32px;">
          <p style="color:rgba(255,255,255,0.6);font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 8px;">📬 Nouvelle publication</p>
          <h1 style="color:white;font-size:22px;font-weight:800;margin:0;line-height:1.3;">${article.title}</h1>
          ${article.category ? `<span style="display:inline-block;margin-top:12px;padding:4px 12px;background:rgba(255,255,255,0.15);border-radius:20px;color:white;font-size:12px;font-weight:600;">${article.category}</span>` : ''}
        </div>

        ${article.image ? `<img src="${article.image}" alt="${article.title}" style="width:100%;height:200px;object-fit:cover;display:block;" />` : ''}

        <div style="padding:28px 32px;color:#cbd5e1;">
          ${article.excerpt ? `<p style="font-size:15px;line-height:1.7;color:#94a3b8;margin:0 0 24px;">${article.excerpt}</p>` : ''}

          <a href="${articleUrl}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#2563eb,#4338ca);color:white;text-decoration:none;border-radius:10px;font-weight:700;font-size:14px;">
            Lire l'article →
          </a>

          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:28px 0;" />
          <p style="font-size:12px;color:#475569;text-align:center;margin:0;">
            Vous recevez cet email car vous êtes inscrit à la newsletter Omedev Services.<br/>
            <a href="${unsubUrl}" style="color:#64748b;">Se désabonner</a>
          </p>
        </div>
      </div>
    `,
  };
};

// ─── PUBLIC ──────────────────────────────────────────────────────────────────

// @route POST /api/newsletter/subscribe
// @access Public
const subscribe = async (req, res) => {
  const { email, name, source } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Adresse email invalide.' });
  }

  const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });

  if (existing) {
    if (!existing.isActive) {
      existing.isActive = true;
      existing.name = name || existing.name;
      await existing.save();
      return res.json({ message: 'Votre inscription a été réactivée ! 🎉' });
    }
    return res.json({ message: 'Vous êtes déjà inscrit à notre newsletter.' });
  }

  const subscriber = await NewsletterSubscriber.create({
    email: email.toLowerCase(),
    name: name || '',
    source: source || 'footer',
  });

  // Send confirmation email (non-blocking)
  transporter.sendMail(confirmationEmail(name, email, subscriber.unsubscribeToken))
    .catch(err => console.error('Newsletter confirmation email error:', err));

  // Notify admin (non-blocking)
  transporter.sendMail({
    from: `"Omedev Services" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    subject: `📬 Nouveau abonné newsletter : ${email}`,
    html: `<p>Nouvel abonné newsletter :<br><strong>${email}</strong>${name ? ` (${name})` : ''}<br>Source : ${source || 'footer'}</p>`,
  }).catch(() => {});

  res.status(201).json({ message: 'Inscription réussie ! Bienvenue 🎉' });
};

// @route GET /api/newsletter/unsubscribe/:token
// @access Public
const unsubscribe = async (req, res) => {
  const { token } = req.params;
  const subscriber = await NewsletterSubscriber.findOne({ unsubscribeToken: token });

  if (!subscriber) {
    return res.status(404).json({ message: 'Lien invalide ou expiré.' });
  }

  subscriber.isActive = false;
  await subscriber.save();

  res.json({ message: 'Vous avez été désabonné avec succès.' });
};

// ─── ADMIN ───────────────────────────────────────────────────────────────────

// @route GET /api/newsletter/subscribers
// @access Admin
const getSubscribers = async (req, res) => {
  const { active } = req.query;
  const filter = {};
  if (active === 'true')  filter.isActive = true;
  if (active === 'false') filter.isActive = false;

  const subscribers = await NewsletterSubscriber.find(filter).sort('-subscribedAt');
  res.json(subscribers);
};

// @route GET /api/newsletter/stats
// @access Admin
const getStats = async (req, res) => {
  const [total, active, bySource] = await Promise.all([
    NewsletterSubscriber.countDocuments(),
    NewsletterSubscriber.countDocuments({ isActive: true }),
    NewsletterSubscriber.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]),
  ]);
  res.json({
    total,
    active,
    inactive: total - active,
    bySource: bySource.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
  });
};

// @route DELETE /api/newsletter/subscribers/:id
// @access Admin
const deleteSubscriber = async (req, res) => {
  await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  res.json({ message: 'Abonné supprimé' });
};

// ─── INTERNAL (appelée par articleController) ─────────────────────────────────

const sendArticleNotification = async (article) => {
  try {
    const subscribers = await NewsletterSubscriber.find({ isActive: true });
    if (!subscribers.length) return;

    const results = await Promise.allSettled(
      subscribers.map(sub => transporter.sendMail(articleNotificationEmail(sub, article)))
    );

    const sent     = results.filter(r => r.status === 'fulfilled').length;
    const failed   = results.filter(r => r.status === 'rejected').length;
    console.log(`📬 Newsletter envoyée : ${sent} succès, ${failed} échecs`);
  } catch (err) {
    console.error('Erreur envoi newsletter:', err);
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getSubscribers,
  getStats,
  deleteSubscriber,
  sendArticleNotification,
};
