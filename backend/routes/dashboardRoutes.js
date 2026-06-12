// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAdminStats,
  getAdminRevenue,
  getAdminActivities,
  getAdminAlerts,
  getClientStats,
  getClientRecentDemands,
  getClientActiveProjects,
} = require('../controllers/dashboardController');

// ==================== ROUTES ADMIN ====================
// Toutes ces routes nécessitent un rôle admin ou super_admin
router.use('/admin', protect, authorize('admin', 'super_admin'));

router.get('/admin/stats', getAdminStats);
router.get('/admin/revenue', getAdminRevenue);
router.get('/admin/activities', getAdminActivities);
router.get('/admin/alerts', getAdminAlerts);

// ==================== ROUTES CLIENT ====================
router.use('/client', protect);

router.get('/client/stats', getClientStats);
router.get('/client/recent-demands', getClientRecentDemands);
router.get('/client/active-projects', getClientActiveProjects);

module.exports = router;