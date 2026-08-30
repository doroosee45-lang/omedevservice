// backend/routes/assistantRoutes.js
const express = require('express');
const router = express.Router();
const { chat, clearSession } = require('../controllers/assistantController');
const { assistantLimiter } = require('../middleware/rateLimitMiddleware');

router.post('/chat', assistantLimiter, chat);
router.delete('/session/:sessionId', clearSession);

module.exports = router;
