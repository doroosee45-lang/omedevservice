// backend/models/FerronnerieProjet.js
const mongoose = require('mongoose');

const ferronnerieProjetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Veuillez indiquer le titre du projet'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Ferronnerie', 'Mobilier', 'Vitrines'],
    },
    location: { type: String },
    date: { type: String },
    duration: { type: String },
    sector: { type: String },
    badge: { type: String },
    badgeColor: { type: String, default: 'orange' },
    cover: { type: String },
    gallery: [{ type: String }],
    description: { type: String },
    details: [{ type: String }],
    client: {
      name: { type: String },
      role: { type: String },
      avatar: { type: String },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      review: { type: String },
    },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ferronnerieProjetSchema.index({ category: 1, isPublished: 1, order: 1 });

const FerronnerieProjet = mongoose.model('FerronnerieProjet', ferronnerieProjetSchema);
module.exports = FerronnerieProjet;
