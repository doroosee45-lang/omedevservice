// src/routes/quoteRoutes.js - Routes pour les demandes de devis rapides (version avec contrôleur)
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  // Public functions
  createQuoteRequest,
  trackQuoteRequest,
  // Client functions
  getMyQuoteRequests,
  getMyQuoteRequestById,
  // Admin functions
  getAllQuoteRequests,
  getQuoteRequestStats,
  getQuoteRequestById,
  updateQuoteRequestStatus,
  addNoteToQuoteRequest,
  deleteQuoteRequest,
  exportQuoteRequestsCSV,
} = require('../controllers/quoteController');

// ==================== ROUTES PUBLIQUES ====================
router.post('/', createQuoteRequest);
router.get('/track/:requestNumber', trackQuoteRequest);

// ==================== ROUTES CLIENTS CONNECTÉS ====================
router.get('/my-requests', protect, getMyQuoteRequests);
router.get('/my-requests/:id', protect, getMyQuoteRequestById);

// ==================== ROUTES ADMIN ====================
router.use(protect, authorize('admin', 'super_admin'));

// Routes principales admin
router.get('/', getAllQuoteRequests);
router.get('/stats', getQuoteRequestStats);
router.get('/export/csv', exportQuoteRequestsCSV);

// Routes pour une demande spécifique
router.route('/:id')
  .get(getQuoteRequestById)
  .delete(deleteQuoteRequest);

// Actions sur les demandes
router.put('/:id/status', updateQuoteRequestStatus);
router.post('/:id/notes', addNoteToQuoteRequest);

module.exports = router;