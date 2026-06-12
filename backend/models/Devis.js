// src/models/Devis.js - Modèle pour les demandes de devis
const mongoose = require('mongoose');

const devisSchema = mongoose.Schema(
  {
    requestNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    services: [{
      type: String,
      enum: ['reseau', 'securite', 'web', 'cloud', 'energie', 'formation', 'audit', 'conseil'],
      required: true,
    }],
    description: {
      type: String,
      required: [true, 'Veuillez décrire votre besoin'],
    },
    budget: {
      type: String,
      required: [true, 'Veuillez indiquer un budget'],
    },
    location: {
      type: String,
      required: [true, 'Veuillez indiquer votre localisation'],
    },
    notes: {
      type: String,
    },
    files: [{
      filename: String,
      originalName: String,
      path: String,
      size: Number,
    }],
    status: {
      type: String,
      enum: ['pending', 'processing', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
    },
    estimatedAmount: {
      type: Number,
    },
    estimatedAmountFormatted: {
      type: String,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    reminderSentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Générer un numéro de demande unique avant sauvegarde
devisSchema.pre('save', async function(next) {
  if (!this.requestNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('Devis').countDocuments();
    this.requestNumber = `DEV-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const Devis = mongoose.model('Devis', devisSchema);
module.exports = Devis;