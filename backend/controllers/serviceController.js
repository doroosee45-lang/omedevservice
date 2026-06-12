// src/controllers/serviceController.js - Gestion du catalogue services
const Service = require('../models/Service');

// @desc    Obtenir tous les services actifs
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  const services = await Service.find({ isActive: true }).sort('order');
  res.json(services);
};

// @desc    Obtenir tous les services (Admin - incluant inactifs)
// @route   GET /api/services/all
// @access  Private/Admin
const getAllServices = async (req, res) => {
  const services = await Service.find({}).sort('order');
  res.json(services);
};

// @desc    Obtenir un service par ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service non trouvé');
  }
};

// @desc    Créer un service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  const { name, category, description, shortDescription, price, features, icon, image } = req.body;

  const serviceExists = await Service.findOne({ name });
  if (serviceExists) {
    res.status(400);
    throw new Error('Ce service existe déjà');
  }

  const service = await Service.create({
    name,
    category,
    description,
    shortDescription,
    price,
    features,
    icon,
    image,
    order: await Service.countDocuments(),
  });

  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400);
    throw new Error('Données de service invalides');
  }
};

// @desc    Mettre à jour un service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = req.body.name || service.name;
    service.category = req.body.category || service.category;
    service.description = req.body.description || service.description;
    service.shortDescription = req.body.shortDescription || service.shortDescription;
    service.price = req.body.price || service.price;
    service.features = req.body.features || service.features;
    service.icon = req.body.icon || service.icon;
    service.image = req.body.image || service.image;
    service.isActive = req.body.isActive !== undefined ? req.body.isActive : service.isActive;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service non trouvé');
  }
};

// @desc    Supprimer un service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    await service.deleteOne();
    res.json({ message: 'Service supprimé' });
  } else {
    res.status(404);
    throw new Error('Service non trouvé');
  }
};

// @desc    Réorganiser l'ordre des services
// @route   PUT /api/services/reorder
// @access  Private/Admin
const reorderServices = async (req, res) => {
  const { services } = req.body; // [{ id, order }]

  for (const item of services) {
    await Service.findByIdAndUpdate(item.id, { order: item.order });
  }

  res.json({ message: 'Ordre mis à jour' });
};

module.exports = {
  getServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  reorderServices,
};