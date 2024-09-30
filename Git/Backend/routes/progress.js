const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProgress, updateProgress } = require('../controllers/progressController');

// GET /api/progress
router.get('/', auth, getProgress);

// POST /api/progress
router.post('/update', auth, updateProgress);

module.exports = router;
