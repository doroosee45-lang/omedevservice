// src/routes/projectRoutes.js - Routes pour les projets
const express = require('express');
const router = express.Router();
const {
  createProject,
  getMyProjects,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addTask,
  toggleTask,
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

// Routes client
router.get('/my-projects', getMyProjects);

// Routes admin
router.use(authorize('admin', 'super_admin'));
router.route('/')
  .get(getAllProjects)
  .post(createProject);
router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);
router.post('/:id/tasks', addTask);
router.put('/:id/tasks/:taskId', toggleTask);

module.exports = router;