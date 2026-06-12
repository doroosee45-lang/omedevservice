// backend/routes/ferronnerieProjectRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getPublicProjects,
  getPublicProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
} = require('../controllers/ferronnerieProjectController');

const isAdmin = [protect, authorize('admin', 'super_admin')];

// ── Routes publiques ──────────────────────────────────────────────────────────
router.get('/', getPublicProjects);

// ── Routes admin spécifiques (avant /:id pour éviter le conflit) ─────────────
router.get('/admin/all', ...isAdmin, getAllProjects);
router.post('/', ...isAdmin, createProject);
router.put('/:id/publish', ...isAdmin, togglePublish);
router.put('/:id', ...isAdmin, updateProject);
router.delete('/:id', ...isAdmin, deleteProject);

// ── Doit rester après les routes spécifiques ──────────────────────────────────
router.get('/:id', getPublicProjectById);

module.exports = router;
