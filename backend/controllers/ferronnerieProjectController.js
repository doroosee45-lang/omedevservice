// backend/controllers/ferronnerieProjectController.js
const FerronnerieProjet = require('../models/FerronnerieProjet');

// ======================== PUBLIC ========================

// @desc  Lister les projets publiés (avec filtre catégorie optionnel)
// @route GET /api/ferronnerie-projects
// @access Public
const getPublicProjects = async (req, res) => {
  const { category } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'Tous') filter.category = category;
  const projets = await FerronnerieProjet.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projets);
};

// @desc  Détail d'un projet publié
// @route GET /api/ferronnerie-projects/:id
// @access Public
const getPublicProjectById = async (req, res) => {
  const projet = await FerronnerieProjet.findOne({ _id: req.params.id, isPublished: true });
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  res.json(projet);
};

// ======================== ADMIN ========================

// @desc  Lister tous les projets (admin)
// @route GET /api/ferronnerie-projects/admin
// @access Admin
const getAllProjects = async (req, res) => {
  const projets = await FerronnerieProjet.find().sort({ order: 1, createdAt: -1 });
  const stats = {
    total: projets.length,
    published: projets.filter(p => p.isPublished).length,
    ferronnerie: projets.filter(p => p.category === 'Ferronnerie').length,
    mobilier: projets.filter(p => p.category === 'Mobilier').length,
    vitrines: projets.filter(p => p.category === 'Vitrines').length,
  };
  res.json({ projets, stats });
};

// @desc  Créer un projet
// @route POST /api/ferronnerie-projects
// @access Admin
const createProject = async (req, res) => {
  const { title, category, location, date, duration, sector, badge, badgeColor, cover, gallery, description, details, client, isPublished, order } = req.body;
  const projet = await FerronnerieProjet.create({
    title, category, location, date, duration, sector, badge, badgeColor,
    cover, gallery, description, details, client, isPublished, order,
  });
  res.status(201).json(projet);
};

// @desc  Modifier un projet
// @route PUT /api/ferronnerie-projects/:id
// @access Admin
const updateProject = async (req, res) => {
  const projet = await FerronnerieProjet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  res.json(projet);
};

// @desc  Supprimer un projet
// @route DELETE /api/ferronnerie-projects/:id
// @access Admin
const deleteProject = async (req, res) => {
  const projet = await FerronnerieProjet.findByIdAndDelete(req.params.id);
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  res.json({ message: 'Projet supprimé' });
};

// @desc  Basculer la visibilité (publié/non publié)
// @route PUT /api/ferronnerie-projects/:id/publish
// @access Admin
const togglePublish = async (req, res) => {
  const projet = await FerronnerieProjet.findById(req.params.id);
  if (!projet) return res.status(404).json({ message: 'Projet introuvable' });
  projet.isPublished = !projet.isPublished;
  await projet.save();
  res.json({ isPublished: projet.isPublished });
};

module.exports = {
  getPublicProjects,
  getPublicProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
};
