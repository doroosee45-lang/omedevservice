// src/models/Service.js - Modèle pour les services du catalogue
const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom de service'],
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['reseau', 'securite', 'developpement', 'cloud', 'energie', 'materiel', 'formation'],
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    price: {
      type: String,
      default: 'Sur devis',
    },
    priceValue: {
      type: Number,
    },
    icon: {
      type: String,
    },
    features: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;