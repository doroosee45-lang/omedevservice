// src/controllers/inscriptionController.js - Inscriptions aux formations
// La base de données est la source de vérité : une inscription est validée
// dès qu'elle est enregistrée, indépendamment du sort de l'email de
// confirmation (voir sendConfirmationEmail, jamais bloquant).
const Inscription = require('../models/Inscription');
const { sendMail } = require('../utils/mailer');

// Email de confirmation au candidat. Séparé de la notification admin
// ci-dessous : les deux ne doivent jamais dépendre l'une de l'autre (voir
// createInscription) - sinon l'échec de l'une (ex. restriction du mode bac
// à sable Resend sur l'adresse du candidat) empêcherait l'envoi de l'autre.
const sendConfirmationEmail = async (inscription) => {
  await sendMail({
    from: `"OMEDEV Services" <${process.env.EMAIL_USER}>`,
    to: inscription.email,
    subject: `Confirmation de votre inscription — ${inscription.inscriptionNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0B74C1;">Inscription bien reçue</h2>
        <p>Bonjour ${inscription.fullName},</p>
        <p>Nous avons bien reçu votre inscription à la formation <strong>${inscription.formation}</strong> (centre de ${inscription.centre}).</p>
        <p>Votre numéro d'inscription est : <strong style="font-size: 18px; color: #0B74C1;">${inscription.inscriptionNumber}</strong></p>
        <p>Un conseiller vous contactera sous 24h ouvrées pour finaliser votre inscription.</p>
        <p>Cordialement,<br/>L'équipe OMEDEV Services</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">OMEDEV Services — Solutions IT, Énergie &amp; Digital</p>
      </div>
    `,
  });
};

// Email de notification à l'équipe formation.
const sendAdminNotificationEmail = async (inscription) => {
  await sendMail({
    from: `"Inscriptions Formation OMEDEV" <${process.env.EMAIL_USER}>`,
    to: process.env.FORMATION_EMAIL || process.env.CONTACT_EMAIL,
    subject: `Nouvelle inscription formation — ${inscription.inscriptionNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Nouvelle inscription à une formation</h2>
        <p><strong>Numéro :</strong> ${inscription.inscriptionNumber}</p>
        <p><strong>Candidat :</strong> ${inscription.fullName}</p>
        <p><strong>Email :</strong> ${inscription.email}</p>
        <p><strong>Téléphone :</strong> ${inscription.phone}</p>
        <p><strong>Formation :</strong> ${inscription.formation}</p>
        <p><strong>Centre :</strong> ${inscription.centre}</p>
        <p><strong>Disponibilité :</strong> ${inscription.disponibilite || 'Non précisée'}</p>
        <p><strong>Financement :</strong> ${inscription.financement || 'Non précisé'}</p>
        ${inscription.message ? `<p><strong>Message :</strong> ${inscription.message}</p>` : ''}
      </div>
    `,
  });
};

// @desc    Créer une inscription à une formation (public)
// @route   POST /api/inscriptions
// @access  Public
const createInscription = async (req, res) => {
  const { fullName, email, phone, formation, centre, disponibilite, financement, message } = req.body;

  let inscription;
  try {
    inscription = await Inscription.create({
      fullName,
      email,
      phone,
      formation,
      centre,
      disponibilite,
      financement,
      message,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const msg = Object.values(error.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, message: msg });
    }
    console.error('Erreur création inscription:', error);
    return res.status(500).json({ success: false, message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }

  // L'inscription est déjà enregistrée et valide à ce stade. Les emails sont
  // une étape secondaire dont l'échec ne doit jamais annuler l'inscription.
  // Les deux envois sont indépendants : l'échec de l'un (ex. restriction du
  // mode bac à sable Resend sur l'adresse du candidat) ne doit jamais
  // empêcher l'envoi de l'autre.
  try {
    await sendConfirmationEmail(inscription);
    inscription.emailStatus = 'sent';
    inscription.emailSentAt = new Date();
  } catch (emailError) {
    console.error('Erreur envoi email confirmation inscription:', emailError);
    inscription.emailStatus = 'failed';
    inscription.emailError = emailError.message;
  }

  try {
    await sendAdminNotificationEmail(inscription);
  } catch (adminEmailError) {
    console.error('Erreur envoi email notification inscription (équipe formation):', adminEmailError);
  }

  await inscription.save();

  res.status(201).json({
    success: true,
    inscriptionNumber: inscription.inscriptionNumber,
    emailStatus: inscription.emailStatus,
    message: 'Votre inscription a été enregistrée avec succès.',
  });
};

// @desc    Obtenir toutes les inscriptions (Admin)
// @route   GET /api/inscriptions
// @access  Private/Admin
const getAllInscriptions = async (req, res) => {
  const { status, formation, search, page = 1, limit = 50 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (formation) query.formation = formation;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Inscription.countDocuments(query);
  const inscriptions = await Inscription.find(query)
    .sort('-createdAt')
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  res.json({ total, page: Number(page), inscriptions });
};

// @desc    Statistiques des inscriptions (Admin)
// @route   GET /api/inscriptions/stats
// @access  Private/Admin
const getInscriptionStats = async (req, res) => {
  const total = await Inscription.countDocuments();
  const pending = await Inscription.countDocuments({ status: 'pending' });
  const confirmed = await Inscription.countDocuments({ status: 'confirmed' });
  const emailFailed = await Inscription.countDocuments({ emailStatus: 'failed' });
  const formations = await Inscription.distinct('formation');

  res.json({ total, pending, confirmed, emailFailed, distinctFormations: formations.length });
};

// @desc    Obtenir une inscription par ID (Admin)
// @route   GET /api/inscriptions/:id
// @access  Private/Admin
const getInscriptionById = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) {
    return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
  }
  res.json(inscription);
};

// @desc    Mettre à jour le statut de suivi d'une inscription (Admin)
// @route   PUT /api/inscriptions/:id/status
// @access  Private/Admin
const updateInscriptionStatus = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) {
    return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
  }

  if (req.body.status) inscription.status = req.body.status;
  if (req.body.notes !== undefined) inscription.notes = req.body.notes;

  try {
    await inscription.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const msg = Object.values(error.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, message: msg });
    }
    console.error('Erreur mise à jour inscription:', error);
    return res.status(500).json({ success: false, message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }

  res.json(inscription);
};

// @desc    Renvoyer l'email de confirmation d'une inscription (Admin)
// @route   POST /api/inscriptions/:id/resend-email
// @access  Private/Admin
const resendInscriptionEmail = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) {
    return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
  }

  try {
    await sendConfirmationEmail(inscription);
    inscription.emailStatus = 'sent';
    inscription.emailSentAt = new Date();
    inscription.emailError = undefined;
  } catch (emailError) {
    console.error('Erreur renvoi email inscription:', emailError);
    inscription.emailStatus = 'failed';
    inscription.emailError = emailError.message;
    await inscription.save();
    return res.status(502).json({ success: false, message: "L'envoi de l'email a échoué.", emailStatus: 'failed' });
  }
  await inscription.save();

  res.json({ success: true, message: 'Email envoyé avec succès.', emailStatus: 'sent' });
};

// @desc    Supprimer une inscription (Admin)
// @route   DELETE /api/inscriptions/:id
// @access  Private/Admin
const deleteInscription = async (req, res) => {
  const inscription = await Inscription.findById(req.params.id);
  if (!inscription) {
    return res.status(404).json({ success: false, message: 'Inscription non trouvée' });
  }
  await inscription.deleteOne();
  res.json({ message: 'Inscription supprimée' });
};

module.exports = {
  createInscription,
  getAllInscriptions,
  getInscriptionStats,
  getInscriptionById,
  updateInscriptionStatus,
  resendInscriptionEmail,
  deleteInscription,
};
