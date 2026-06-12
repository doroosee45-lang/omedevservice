// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMyHistory } = require('../controllers/historyController');

router.get('/my-history', protect, getMyHistory);

module.exports = router;