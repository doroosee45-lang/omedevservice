// src/routes/crmRoutes.js - Routes CRM complètes (version avec contrôleur)
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllProspects,
  getProspectsByStage,
  getCRMStats,
  createProspect,
  getProspectById,
  updateProspect,
  addInteraction,
  getInteractions,
  moveProspect,
  scheduleReminder,
  getUpcomingReminders,
  deleteProspect,
  getPipeline,
} = require('../controllers/crmController');

// Toutes les routes CRM nécessitent authentification et rôle admin
router.use(protect, authorize('admin', 'super_admin'));

// Routes principales
router.route('/')
  .get(getAllProspects)
  .post(createProspect);

// Routes de visualisation et statistiques
router.get('/by-stage', getProspectsByStage);
router.get('/stats', getCRMStats);
router.get('/pipeline', getPipeline);
router.get('/reminders/upcoming', getUpcomingReminders);

// Routes pour un prospect spécifique
router.route('/:id')
  .get(getProspectById)
  .put(updateProspect)
  .delete(deleteProspect);

// Routes pour les interactions
router.post('/:id/interactions', addInteraction);
router.get('/:id/interactions', getInteractions);

// Routes pour les actions spécifiques
router.put('/:id/move', moveProspect);
router.post('/:id/reminder', scheduleReminder);

module.exports = router;