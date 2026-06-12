// src/models/QuoteRequest.js - Modèle pour les demandes de devis rapides
const mongoose = require('mongoose');

const quoteRequestSchema = mongoose.Schema(
  {
    requestNumber: {
      type: String,
      unique: true,
      // ⚠️ Supprimez "required: true" – sera généré automatiquement
    },
    fullName: {
      type: String,
      required: [true, 'Veuillez indiquer votre nom'],
    },
    email: {
      type: String,
      required: [true, 'Veuillez indiquer votre email'],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Veuillez indiquer votre téléphone'],
    },
    company: {
      type: String,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['site-web', 'ecommerce', 'application', 'reseau', 'securite', 'cloud', 'energie', 'formation', 'audit', 'conseil', 'ferronnerie', 'autre'],
    },
    ferronnerieType: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Veuillez décrire votre besoin'],
    },
    budget: {
      type: String,
    },
    timeline: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'quoted', 'converted', 'lost'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedTo: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware exécuté avant la validation (pour que le champ soit présent lors de la validation)
quoteRequestSchema.pre('validate', async function (next) {
  if (!this.requestNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('QuoteRequest').countDocuments();
    this.requestNumber = `QR-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
module.exports = QuoteRequest;