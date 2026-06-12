// src/models/Prospect.js - Modèle pour les prospects CRM
const mongoose = require('mongoose');

const interactionSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['call', 'email', 'meeting', 'proposal', 'follow_up'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
  nextFollowUp: {
    type: Date,
  },
});

const prospectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom de société'],
    },
    contact: {
      type: String,
      required: [true, 'Veuillez ajouter un contact'],
    },
    email: {
      type: String,
      required: [true, 'Veuillez ajouter un email'],
      lowercase: true,
    },
    phone: {
      type: String,
    },
    value: {
      type: String,
    },
    valueAmount: {
      type: Number,
    },
    stage: {
      type: String,
      enum: ['lead', 'contact', 'proposition', 'negociation', 'signe'],
      default: 'lead',
    },
    source: {
      type: String,
      enum: ['website', 'referral', 'cold_call', 'email', 'social_media', 'other'],
    },
    notes: {
      type: String,
    },
    interactions: [interactionSchema],
    lastContact: {
      type: Date,
    },
    assignedTo: {
      type: String,
    },
    assignedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Prospect = mongoose.model('Prospect', prospectSchema);
module.exports = Prospect;