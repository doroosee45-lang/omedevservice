// src/models/ContactMessage.js - Modèle pour les messages de contact
const mongoose = require('mongoose');

const contactMessageSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Veuillez indiquer votre nom'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Veuillez indiquer votre email'],
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
    },
    objet: {
      type: String,
      required: [true, 'Veuillez indiquer un objet'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Veuillez écrire un message'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    repliedAt: {
      type: Date,
    },
    replyMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
module.exports = ContactMessage;