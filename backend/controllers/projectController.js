// src/controllers/projectController.js - Gestion des projets
const Project = require('../models/Project');
const User = require('../models/User');

// @desc    Créer un projet
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  const { name, description, client, clientName, service, startDate, endDate, assignee, team, budget } = req.body;

  const project = await Project.create({
    name,
    description,
    client,
    clientName,
    service,
    startDate,
    endDate,
    assignee,
    team,
    budget,
  });

  if (project) {
    res.status(201).json(project);
  } else {
    res.status(400);
    throw new Error('Données de projet invalides');
  }
};

// @desc    Obtenir les projets du client connecté
// @route   GET /api/projects/my-projects
// @access  Private
const getMyProjects = async (req, res) => {
  const projects = await Project.find({ client: req.user._id }).sort('-createdAt');
  res.json(projects);
};

// @desc    Obtenir tous les projets (Admin)
// @route   GET /api/projects
// @access  Private/Admin
const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).populate('client', 'name email').sort('-createdAt');
  res.json(projects);
};

// @desc    Obtenir un projet par ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('client', 'name email phone');

  if (project) {
    if (project.client._id.toString() !== req.user._id.toString() && req.user.role === 'client') {
      res.status(403);
      throw new Error('Non autorisé à voir ce projet');
    }
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Projet non trouvé');
  }
};

// @desc    Mettre à jour un projet
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.progress = req.body.progress !== undefined ? req.body.progress : project.progress;
    project.status = req.body.status || project.status;
    project.priority = req.body.priority || project.priority;
    project.assignee = req.body.assignee || project.assignee;
    project.team = req.body.team || project.team;
    project.endDate = req.body.endDate || project.endDate;

    // Mettre à jour les tâches si fournies
    if (req.body.tasks) {
      project.tasks = req.body.tasks;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Projet non trouvé');
  }
};

// @desc    Supprimer un projet
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    await project.deleteOne();
    res.json({ message: 'Projet supprimé' });
  } else {
    res.status(404);
    throw new Error('Projet non trouvé');
  }
};

// @desc    Ajouter une tâche à un projet
// @route   POST /api/projects/:id/tasks
// @access  Private/Admin
const addTask = async (req, res) => {
  const { name } = req.body;
  const project = await Project.findById(req.params.id);

  if (project) {
    project.tasks.push({ name, completed: false });
    await project.save();
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Projet non trouvé');
  }
};

// @desc    Basculer le statut d'une tâche
// @route   PUT /api/projects/:id/tasks/:taskId
// @access  Private/Admin
const toggleTask = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    const task = project.tasks.id(req.params.taskId);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date() : null;
      
      // Recalculer la progression globale
      const completedTasks = project.tasks.filter(t => t.completed).length;
      project.progress = Math.round((completedTasks / project.tasks.length) * 100);
      
      await project.save();
      res.json(project);
    } else {
      res.status(404);
      throw new Error('Tâche non trouvée');
    }
  } else {
    res.status(404);
    throw new Error('Projet non trouvé');
  }
};

module.exports = {
  createProject,
  getMyProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTask,
  toggleTask,
};