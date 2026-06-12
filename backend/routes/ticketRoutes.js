// src/routes/ticketRoutes.js - Routes tickets support (version avec contrôleur)
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  // Client functions
  createTicket,
  getMyTickets,
  getMyTicketById,
  addMessageToTicket,
  getUnreadCount,
  markMessageAsRead,
  // Admin functions
  getAllTickets,
  getTicketStats,
  getTicketById,
  updateTicketStatus,
  assignTicket,
  addInternalNote,
  deleteTicket,
  exportTicketsCSV,
} = require('../controllers/ticketController');
const { upload } = require('../middleware/uploadMiddleware');
router.post('/:id/messages', protect, upload.single('attachment'), addMessageToTicket);
// ==================== ROUTES CLIENTS (authentifiés) ====================
router.use(protect);

// Routes de base pour les tickets
router.route('/')
  .post(createTicket);

router.get('/my-tickets', getMyTickets);
router.get('/my-tickets/:id', getMyTicketById);
router.get('/unread-count', getUnreadCount);
router.post('/:id/messages', addMessageToTicket);
router.put('/:ticketId/messages/:messageId/read', markMessageAsRead);

// ==================== ROUTES ADMIN ====================
// Toutes les routes suivantes nécessitent un rôle admin
router.use(authorize('admin', 'super_admin'));

// Routes principales admin
router.get('/', getAllTickets);
router.get('/stats', getTicketStats);
router.get('/export/csv', exportTicketsCSV);

// Routes pour un ticket spécifique
router.route('/:id')
  .get(getTicketById)
  .delete(deleteTicket);

// Actions sur les tickets
router.put('/:id/status', updateTicketStatus);
router.put('/:id/assign', assignTicket);
router.post('/:id/notes', addInternalNote);

module.exports = router;