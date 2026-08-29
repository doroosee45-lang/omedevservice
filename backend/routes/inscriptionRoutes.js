// routes/inscriptionRoutes.js - Inscriptions aux formations (indépendant des devis)
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createInscription,
  getAllInscriptions,
  getInscriptionStats,
  getInscriptionById,
  updateInscriptionStatus,
  resendInscriptionEmail,
  deleteInscription,
} = require('../controllers/inscriptionController');

// Route publique
router.post('/', createInscription);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/stats', getInscriptionStats);
router.get('/', getAllInscriptions);
router.get('/:id', getInscriptionById);
router.put('/:id/status', updateInscriptionStatus);
router.post('/:id/resend-email', resendInscriptionEmail);
router.delete('/:id', deleteInscription);

module.exports = router;
