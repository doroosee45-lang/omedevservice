// src/controllers/devisController.js - Gestion des demandes de devis
const path = require('path');
const Devis = require('../models/Devis');

// @desc    Créer une demande de devis
// @route   POST /api/devis
// @access  Private
const createDevis = async (req, res) => {
  const { services, description, budget, location, notes } = req.body;

  const devis = await Devis.create({
    user: req.user._id,
    services,
    description,
    budget,
    location,
    notes,
  });

  if (devis) {
    res.status(201).json(devis);
  } else {
    res.status(400);
    throw new Error('Données de devis invalides');
  }
};
// Dans devisController.js, ajouter :
const { generateDevisPDF } = require('../utils/generatePdf');

// @desc    Télécharger le PDF d'un devis
// @route   GET /api/devis/:id/pdf
// @access  Private (client propriétaire ou admin)
const downloadDevisPDF = async (req, res) => {
  const devis = await Devis.findById(req.params.id);
  if (!devis) {
    res.status(404);
    throw new Error('Devis non trouvé');
  }
  // Vérifier que l'utilisateur est le propriétaire ou admin
  if (devis.user.toString() !== req.user._id.toString() && req.user.role === 'client') {
    res.status(403);
    throw new Error('Non autorisé');
  }
  const pdfPath = await generateDevisPDF(devis);
  res.download(path.join(__dirname, '..', pdfPath));
};

// @desc    Obtenir tous les devis de l'utilisateur connecté
// @route   GET /api/devis/my-devis
// @access  Private
const getMyDevis = async (req, res) => {
  const devis = await Devis.find({ user: req.user._id }).sort('-createdAt');
  res.json(devis);
};

// @desc    Obtenir tous les devis (Admin)
// @route   GET /api/devis
// @access  Private/Admin
const getAllDevis = async (req, res) => {
  const devis = await Devis.find({}).populate('user', 'name email').sort('-createdAt');
  res.json(devis);
};

// @desc    Obtenir un devis par ID
// @route   GET /api/devis/:id
// @access  Private
const getDevisById = async (req, res) => {
  const devis = await Devis.findById(req.params.id).populate('user', 'name email phone');

  if (devis) {
    // Vérifier si l'utilisateur est autorisé à voir ce devis
    if (devis.user._id.toString() !== req.user._id.toString() && req.user.role === 'client') {
      res.status(403);
      throw new Error('Non autorisé à voir ce devis');
    }
    res.json(devis);
  } else {
    res.status(404);
    throw new Error('Devis non trouvé');
  }
};

// @desc    Mettre à jour le statut d'un devis (Admin)
// @route   PUT /api/devis/:id/status
// @access  Private/Admin
const updateDevisStatus = async (req, res) => {
  const { status, adminNotes, estimatedAmount } = req.body;
  const devis = await Devis.findById(req.params.id);

  if (devis) {
    devis.status = status || devis.status;
    devis.adminNotes = adminNotes || devis.adminNotes;
    devis.estimatedAmount = estimatedAmount || devis.estimatedAmount;
    
    if (estimatedAmount) {
      devis.estimatedAmountFormatted = `${estimatedAmount.toLocaleString('fr-FR')} €`;
    }

    const updatedDevis = await devis.save();
    res.json(updatedDevis);
  } else {
    res.status(404);
    throw new Error('Devis non trouvé');
  }
};

// @desc    Marquer la relance comme envoyée
// @route   PUT /api/devis/:id/reminder
// @access  Private/Admin
const markReminderSent = async (req, res) => {
  const devis = await Devis.findById(req.params.id);
  if (devis) {
    devis.reminderSent = true;
    devis.reminderSentAt = new Date();
    await devis.save();
    res.json({ message: 'Relance marquée comme envoyée' });
  } else {
    res.status(404);
    throw new Error('Devis non trouvé');
  }
};

module.exports = {
  createDevis,
  getMyDevis,
  getAllDevis,
  getDevisById,
  updateDevisStatus,
  markReminderSent,
  downloadDevisPDF,   // ← ajoutez cette ligne
};