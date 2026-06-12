// src/routes/articleRoutes.js - Routes pour le blog
const express = require('express');
const router = express.Router();
const {
  getPublishedArticles,
  getArticleBySlug,
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes publiques
router.get('/', getPublishedArticles);
router.get('/:slug', getArticleBySlug);

// Routes admin
router.use(protect, authorize('admin', 'super_admin'));
router.get('/admin/all', getAllArticles);
router.post('/', createArticle);
router.route('/admin/:id')
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;