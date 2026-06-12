// src/routes/serviceRoutes.js - Routes pour le catalogue services
const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  reorderServices,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes publiques
router.get('/', getServices);
router.get('/:id', getServiceById);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/admin/all', getAllServices);
router.post('/', createService);
router.put('/reorder', reorderServices);
router.route('/:id')
  .put(updateService)
  .delete(deleteService);

module.exports = router;