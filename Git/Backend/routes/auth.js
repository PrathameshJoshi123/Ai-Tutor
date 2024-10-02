const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')

// Register
router.post('/register', register);

// Login
router.post('/login', login);

router.get('/user', authMiddleware, getUser);
module.exports = router;


