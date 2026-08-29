// src/routes/authRoutes.js - Routes complètes pour l'authentification
const express = require('express');
const router = express.Router();
const {
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
  activateAccount,
  refreshToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Routes publiques
// NB : pas d'inscription publique — les comptes sont créés exclusivement
// par le SuperAdministrateur depuis l'espace d'administration.
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/activate-account', activateAccount);
router.post('/refresh-token', refreshToken);

// Routes protégées (nécessitent un token JWT)
router.post('/logout', protect, logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;