const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration endpoint
// Missing rate limiting middleware
router.post('/register', authController.register);

// User login endpoint
// Missing rate limiting middleware - vulnerable to brute force attacks
router.post('/login', authController.login);

module.exports = router;

