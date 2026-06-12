// src/models/Project.js - Modèle pour les projets
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
});

const projectSchema = mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom de projet'],
    },
    description: {
      type: String,
      required: [true, 'Veuillez ajouter une description'],
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
    service: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ['todo', 'progress', 'review', 'done', 'paused'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['basse', 'normale', 'haute', 'urgente'],
      default: 'normale',
    },
    assignee: {
      type: String,
      required: true,
    },
    team: [{
      type: String,
    }],
    tasks: [taskSchema],
    budget: {
      type: Number,
    },
    amount: {
      type: String,
    },
    documents: [{
      name: String,
      url: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Générer un ID de projet unique avant sauvegarde
projectSchema.pre('save', async function(next) {
  if (!this.projectId) {
    const count = await mongoose.model('Project').countDocuments();
    this.projectId = `PRJ-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;