// backend/routes/newsletterRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  subscribe,
  unsubscribe,
  getSubscribers,
  getStats,
  deleteSubscriber,
} = require('../controllers/newsletterController');

// Public
router.post('/subscribe', subscribe);
router.get('/unsubscribe/:token', unsubscribe);

// Admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/subscribers', getSubscribers);
router.get('/stats', getStats);
router.delete('/subscribers/:id', deleteSubscriber);

module.exports = router;
