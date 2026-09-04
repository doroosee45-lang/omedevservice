// src/routes/userRoutes.js - Routes pour la gestion des utilisateurs
const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  resendActivationEmail,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Toutes les routes nécessitent d'être admin
router.use(protect, authorize('admin', 'super_admin'));

// La création de compte est réservée au SuperAdministrateur
router.route('/')
  .get(getUsers)
  .post(authorize('super_admin'), createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.put('/:id/toggle-status', toggleUserStatus);
router.post('/:id/resend-activation', authorize('super_admin'), resendActivationEmail);

module.exports = router;