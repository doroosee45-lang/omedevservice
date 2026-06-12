// src/models/Article.js - Modèle pour les articles de blog
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre'],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Veuillez ajouter un extrait'],
    },
    content: {
      type: String,
      required: [true, 'Veuillez ajouter du contenu'],
    },
    category: {
  type: String,
  required: true,
  enum: ['Sécurité', 'Cloud', 'Développement', 'Énergie', 'Formation', 'Actualités', 'Cybersécurité', 'Digital', 'Réseau']
},
    image: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    tags: [{
      type: String,
    }],
    readTime: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Générer un slug à partir du titre avant sauvegarde
articleSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;