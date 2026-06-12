// src/controllers/quoteController.js - Contrôleur pour les demandes de devis rapides
const QuoteRequest = require('../models/QuoteRequest');
const nodemailer = require('nodemailer');

// Configuration email (à mettre dans .env)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==================== FONCTIONS PUBLIQUES ====================

// @desc    Créer une demande de devis (public)
// @route   POST /api/quote-requests
// @access  Public
const createQuoteRequest = async (req, res) => {
  const { fullName, email, phone, company, serviceType, ferronnerieType, dimensions, description, budget, timeline } = req.body;

  const quoteRequest = await QuoteRequest.create({
    fullName,
    email,
    phone,
    company,
    serviceType,
    ferronnerieType,
    dimensions,
    description,
    budget,
    timeline,
    user: req.user?._id,
  });
  
  // Envoyer un email de confirmation au client
  try {
    await transporter.sendMail({
      from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmation de votre demande de devis - ${quoteRequest.requestNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Merci pour votre demande !</h2>
          <p>Bonjour ${fullName},</p>
          <p>Nous avons bien reçu votre demande de devis pour <strong>${serviceType}</strong>.</p>
          <p>Votre numéro de dossier est : <strong style="font-size: 18px; color: #2563eb;">${quoteRequest.requestNumber}</strong></p>
          <p>Notre équipe commerciale vous contactera dans les plus brefs délais (sous 24h ouvrées).</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">OMDEVE Services - Solutions IT, Énergie & Digital</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    // On ne bloque pas la création si l'email échoue
  }
  
  // Envoyer une notification à l'équipe commerciale
  try {
    await transporter.sendMail({
      from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to: process.env.SALES_EMAIL || process.env.EMAIL_USER,
      subject: `Nouvelle demande de devis - ${quoteRequest.requestNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Numéro:</strong> ${quoteRequest.requestNumber}</p>
          <p><strong>Client:</strong> ${fullName} (${company || 'Indépendant'})</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          ${ferronnerieType ? `<p><strong>Type de projet:</strong> ${ferronnerieType}</p>` : ''}
          ${dimensions ? `<p><strong>Dimensions:</strong> ${dimensions}</p>` : ''}
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Budget:</strong> ${budget || 'Non spécifié'}</p>
          <p><strong>Délai souhaité:</strong> ${timeline || 'Non spécifié'}</p>
          <hr>
          <p><a href="${process.env.FRONTEND_URL}/admin/quote-requests/${quoteRequest._id}">Voir la demande dans l'admin</a></p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Erreur envoi email notification:', error);
  }
  
  res.status(201).json({ 
    success: true, 
    requestNumber: quoteRequest.requestNumber,
    message: 'Demande envoyée avec succès' 
  });
};

// @desc    Suivre une demande de devis par numéro (public)
// @route   GET /api/quote-requests/track/:requestNumber
// @access  Public
const trackQuoteRequest = async (req, res) => {
  const quoteRequest = await QuoteRequest.findOne({ 
    requestNumber: req.params.requestNumber 
  });
  
  if (quoteRequest) {
    res.json({
      requestNumber: quoteRequest.requestNumber,
      status: quoteRequest.status,
      createdAt: quoteRequest.createdAt,
      serviceType: quoteRequest.serviceType,
    });
  } else {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
};

// ==================== FONCTIONS CLIENT CONNECTÉ ====================

// @desc    Obtenir mes demandes (client connecté)
// @route   GET /api/quote-requests/my-requests
// @access  Private
const getMyQuoteRequests = async (req, res) => {
  const { status, serviceType } = req.query;
  let query = { user: req.user._id };
  
  if (status) query.status = status;
  if (serviceType) query.serviceType = serviceType;
  
  const requests = await QuoteRequest.find(query).sort('-createdAt');
  res.json(requests);
};

// @desc    Obtenir une demande par ID (client - vérification propriétaire)
// @route   GET /api/quote-requests/my-requests/:id
// @access  Private
const getMyQuoteRequestById = async (req, res) => {
  const quoteRequest = await QuoteRequest.findOne({ 
    _id: req.params.id, 
    user: req.user._id 
  });
  
  if (quoteRequest) {
    res.json(quoteRequest);
  } else {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
};

// ==================== FONCTIONS ADMIN ====================

// @desc    Obtenir toutes les demandes de devis (admin)
// @route   GET /api/quote-requests
// @access  Private/Admin
const getAllQuoteRequests = async (req, res) => {
  const { status, serviceType, assignedTo, startDate, endDate } = req.query;
  let query = {};
  
  if (status) query.status = status;
  if (serviceType) query.serviceType = serviceType;
  if (assignedTo) query.assignedTo = assignedTo;
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  const requests = await QuoteRequest.find(query)
    .populate('user', 'name email phone')
    .populate('assignedTo', 'name')
    .sort('-createdAt');
  
  res.json(requests);
};

// @desc    Obtenir les statistiques des demandes de devis
// @route   GET /api/quote-requests/stats
// @access  Private/Admin
const getQuoteRequestStats = async (req, res) => {
  const total = await QuoteRequest.countDocuments();
  const pending = await QuoteRequest.countDocuments({ status: 'pending' });
  const contacted = await QuoteRequest.countDocuments({ status: 'contacted' });
  const quoted = await QuoteRequest.countDocuments({ status: 'quoted' });
  const converted = await QuoteRequest.countDocuments({ status: 'converted' });
  const lost = await QuoteRequest.countDocuments({ status: 'lost' });
  
  // Par service
  const byServiceType = await QuoteRequest.aggregate([
    { $group: { _id: '$serviceType', count: { $sum: 1 } } }
  ]);
  
  // Taux de conversion
  const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;
  
  res.json({
    total,
    pending,
    contacted,
    quoted,
    converted,
    lost,
    conversionRate: parseFloat(conversionRate),
    byServiceType: byServiceType.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
  });
};

// @desc    Obtenir une demande de devis par ID (admin)
// @route   GET /api/quote-requests/:id
// @access  Private/Admin
const getQuoteRequestById = async (req, res) => {
  const quoteRequest = await QuoteRequest.findById(req.params.id)
    .populate('user', 'name email phone companyName')
    .populate('assignedTo', 'name email');
  
  if (quoteRequest) {
    res.json(quoteRequest);
  } else {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
};

// @desc    Mettre à jour le statut d'une demande de devis (admin)
// @route   PUT /api/quote-requests/:id/status
// @access  Private/Admin
const updateQuoteRequestStatus = async (req, res) => {
  const { status, assignedTo, notes } = req.body;
  const quoteRequest = await QuoteRequest.findById(req.params.id);
  
  if (!quoteRequest) {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
  
  const oldStatus = quoteRequest.status;
  quoteRequest.status = status || quoteRequest.status;
  quoteRequest.assignedTo = assignedTo || quoteRequest.assignedTo;
  quoteRequest.notes = notes || quoteRequest.notes;
  
  await quoteRequest.save();
  
  // Envoyer un email au client si le statut change
  if (oldStatus !== status && quoteRequest.email) {
    let statusMessage = '';
    let statusColor = '';
    
    switch (status) {
      case 'contacted':
        statusMessage = 'Nous avons pris contact avec vous pour étudier votre projet.';
        statusColor = '#2563eb';
        break;
      case 'quoted':
        statusMessage = 'Votre devis personnalisé est prêt et vous a été envoyé par email.';
        statusColor = '#16a34a';
        break;
      case 'converted':
        statusMessage = 'Félicitations ! Votre projet a été validé et va démarrer prochainement.';
        statusColor = '#16a34a';
        break;
      case 'lost':
        statusMessage = 'Nous sommes désolés de ne pas avoir pu répondre à vos attentes. N\'hésitez pas à nous recontacter pour tout futur projet.';
        statusColor = '#dc2626';
        break;
      default:
        statusMessage = 'Votre demande est en cours de traitement.';
        statusColor = '#eab308';
    }
    
    try {
      await transporter.sendMail({
        from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
        to: quoteRequest.email,
        subject: `Mise à jour de votre demande de devis - ${quoteRequest.requestNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${statusColor};">Mise à jour de votre demande</h2>
            <p>Bonjour ${quoteRequest.fullName},</p>
            <p>Le statut de votre demande de devis (<strong>${quoteRequest.requestNumber}</strong>) a été mis à jour :</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0; color: ${statusColor}; font-weight: bold;">${statusMessage}</p>
            </div>
            <p>Vous pouvez suivre l'évolution de votre demande ici :</p>
            <p><a href="${process.env.FRONTEND_URL}/suivi-devis/${quoteRequest.requestNumber}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Suivre ma demande</a></p>
            <hr style="margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">OMDEVE Services - Solutions IT, Énergie & Digital</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Erreur envoi email notification statut:', error);
    }
  }
  
  res.json(quoteRequest);
};

// @desc    Ajouter une note à une demande (admin)
// @route   POST /api/quote-requests/:id/notes
// @access  Private/Admin
const addNoteToQuoteRequest = async (req, res) => {
  const { note } = req.body;
  const quoteRequest = await QuoteRequest.findById(req.params.id);
  
  if (!quoteRequest) {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
  
  // Ajouter la note à l'historique
  if (!quoteRequest.notes) quoteRequest.notes = '';
  const timestamp = new Date().toLocaleString('fr-FR');
  quoteRequest.notes += `\n[${timestamp}] ${req.user.name}: ${note}`;
  
  await quoteRequest.save();
  res.json({ message: 'Note ajoutée avec succès' });
};

// @desc    Supprimer une demande de devis (admin)
// @route   DELETE /api/quote-requests/:id
// @access  Private/Admin
const deleteQuoteRequest = async (req, res) => {
  const quoteRequest = await QuoteRequest.findById(req.params.id);
  
  if (quoteRequest) {
    await quoteRequest.deleteOne();
    res.json({ message: 'Demande supprimée avec succès' });
  } else {
    res.status(404);
    throw new Error('Demande non trouvée');
  }
};

// @desc    Exporter les demandes en CSV (admin)
// @route   GET /api/quote-requests/export/csv
// @access  Private/Admin
const exportQuoteRequestsCSV = async (req, res) => {
  const { startDate, endDate, status } = req.query;
  let query = {};
  
  if (status) query.status = status;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  const requests = await QuoteRequest.find(query).sort('-createdAt');
  
  let csv = 'Numéro,Date,Nom,Email,Téléphone,Entreprise,Service,Statut,Budget,Délai\n';
  
  requests.forEach(req => {
    csv += `"${req.requestNumber}","${new Date(req.createdAt).toLocaleDateString('fr-FR')}","${req.fullName.replace(/"/g, '""')}","${req.email}","${req.phone}","${req.company || ''}","${req.serviceType}","${req.status}","${req.budget || ''}","${req.timeline || ''}"\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=demandes_devis.csv');
  res.send(csv);
};

module.exports = {
  // Public functions
  createQuoteRequest,
  trackQuoteRequest,
  // Client functions
  getMyQuoteRequests,
  getMyQuoteRequestById,
  // Admin functions
  getAllQuoteRequests,
  getQuoteRequestStats,
  getQuoteRequestById,
  updateQuoteRequestStatus,
  addNoteToQuoteRequest,
  deleteQuoteRequest,
  exportQuoteRequestsCSV,
};