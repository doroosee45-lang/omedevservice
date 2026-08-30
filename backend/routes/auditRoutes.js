const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { publicFormLimiter } = require('../middleware/rateLimitMiddleware');
const {
  createAuditRequest,
  getMyAudits,
  getAuditByRequestNumber,
  getAllAudits,
  getAuditStats,
  getAuditById,
  updateAuditStatus,
  downloadAuditPDF,
  updateAuditPdfUrl,
  deleteAudit,
} = require('../controllers/auditController');

// Vérifiez que createAuditRequest est bien défini
console.log('createAuditRequest:', createAuditRequest); // pour debug

// Route publique - accessible sans compte (le client télécharge son propre
// rapport juste après l'avoir soumis). Protégée par un second facteur
// (email) directement dans le contrôleur, pas par ce middleware - voir
// downloadAuditPDF. Une seconde déclaration de cette même route existait
// plus bas dans le bloc admin ; Express ne retient que la première
// correspondance, donc cette seconde déclaration n'était jamais exécutée
// et a été retirée pour éviter la confusion (elle laissait croire, à tort,
// que la route était protégée par rôle admin).
router.get('/:id/pdf', downloadAuditPDF);
router.post('/', publicFormLimiter, createAuditRequest);
router.get('/track/:requestNumber', getAuditByRequestNumber);

// Routes client connecté
router.get('/my-audits', protect, getMyAudits);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/', getAllAudits);
router.get('/stats', getAuditStats);
router.get('/:id', getAuditById);
router.put('/:id/status', updateAuditStatus);
router.put('/:id/pdf', updateAuditPdfUrl);
router.delete('/:id', deleteAudit);

module.exports = router;