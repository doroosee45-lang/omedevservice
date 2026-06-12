// backend/routes/assistantRoutes.js
const express = require('express');
const router = express.Router();
const { chat, clearSession } = require('../controllers/assistantController');

router.post('/chat', chat);
router.delete('/session/:sessionId', clearSession);

module.exports = router;
