// routes/devisRoutes.js - Routes pour les devis
const express = require('express');
const router = express.Router();
const {
  createDevis,
  getMyDevis,
  getAllDevis,
  getDevisById,
  updateDevisStatus,
  markReminderSent,
  downloadDevisPDF,
} = require('../controllers/devisController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes protégées (authentification requise pour toutes)
router.use(protect);

// Routes client (accessibles après authentification)
router.route('/')
  .post(createDevis);
router.get('/my-devis', getMyDevis);
router.get('/:id/pdf', downloadDevisPDF);

// Routes admin (authentification + rôle admin requis)
router.use(authorize('admin', 'super_admin'));

router.get('/', getAllDevis);
router.get('/:id', getDevisById);
router.put('/:id/status', updateDevisStatus);
router.put('/:id/reminder', markReminderSent);

module.exports = router;