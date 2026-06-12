const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getSettings, updateSettings } = require('../controllers/settingController');

router.use(protect, authorize('admin', 'super_admin'));
router.get('/', getSettings);
router.put('/', updateSettings);

module.exports = router;