// src/models/Inscription.js - Inscriptions des étudiants aux formations
// Processus indépendant des devis commerciaux (QuoteRequest) : un étudiant
// qui s'inscrit à une formation n'est jamais un devis.
const mongoose = require('mongoose');

const inscriptionSchema = mongoose.Schema(
  {
    inscriptionNumber: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Veuillez indiquer le nom complet'],
    },
    email: {
      type: String,
      required: [true, 'Veuillez indiquer un email'],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Veuillez indiquer un téléphone'],
    },
    formation: {
      type: String,
      required: [true, 'Veuillez indiquer la formation souhaitée'],
    },
    centre: {
      type: String,
      required: [true, 'Veuillez indiquer le centre de formation'],
    },
    disponibilite: {
      type: String,
    },
    financement: {
      type: String,
    },
    message: {
      type: String,
    },
    // Suivi de l'inscription elle-même - totalement indépendant de l'email.
    status: {
      type: String,
      enum: ['pending', 'contacted', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
    // Statut de l'envoi de l'email de confirmation - une inscription est
    // valide dès qu'elle est enregistrée en base, quel que soit cet état.
    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    emailError: {
      type: String,
    },
    emailSentAt: {
      type: Date,
    },
    // Traçabilité pour les inscriptions migrées depuis l'ancienne collection
    // QuoteRequest (avant la séparation inscriptions/devis).
    migratedFrom: {
      quoteRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuoteRequest' },
      requestNumber: { type: String },
      migratedAt: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

inscriptionSchema.pre('validate', async function (next) {
  if (!this.inscriptionNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('Inscription').countDocuments();
    this.inscriptionNumber = `INS-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const Inscription = mongoose.model('Inscription', inscriptionSchema);
module.exports = Inscription;
