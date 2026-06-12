// src/models/Ticket.js - Modèle pour les tickets support
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  attachments: [{
    name: String,
    url: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ticketSchema = mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: [true, 'Veuillez ajouter un sujet'],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['basse', 'normale', 'haute', 'urgente'],
      default: 'normale',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    category: {
      type: String,
      enum: ['technique', 'commercial', 'facturation', 'autre'],
      default: 'technique',
    },
    assignedTo: {
      type: String,
    },
    assignedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [messageSchema],
    resolvedAt: {
      type: Date,
    },
    resolution: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Générer un ID de ticket unique avant sauvegarde
ticketSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketId = `TKT-${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;