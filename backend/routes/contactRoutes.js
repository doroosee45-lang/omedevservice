// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { publicFormLimiter } = require('../middleware/rateLimitMiddleware');
const {
  sendContactMessage,
  getContactMessages,
  getContactMessageById,
  markMessageAsRead,
  deleteContactMessage,
  getContactStats,
} = require('../controllers/contactController');

// Route publique
router.post('/', publicFormLimiter, sendContactMessage);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/stats', getContactStats);
router.get('/', getContactMessages);
router.route('/:id')
  .get(getContactMessageById)
  .delete(deleteContactMessage);
router.put('/:id/read', markMessageAsRead);

module.exports = router;
