const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
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
router.get('/:id/pdf', downloadAuditPDF);
// Route publique
router.post('/', createAuditRequest);
router.get('/track/:requestNumber', getAuditByRequestNumber);

// Routes client connecté
router.get('/my-audits', protect, getMyAudits);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/', getAllAudits);
router.get('/stats', getAuditStats);
router.get('/:id', getAuditById);
router.put('/:id/status', updateAuditStatus);
router.get('/:id/pdf', downloadAuditPDF);
router.put('/:id/pdf', updateAuditPdfUrl);
router.delete('/:id', deleteAudit);

module.exports = router;