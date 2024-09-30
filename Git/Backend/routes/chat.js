const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { chatWithAI } = require('../controllers/chatController');

// POST /api/chat
router.post('/', auth, chatWithAI);

module.exports = router;
