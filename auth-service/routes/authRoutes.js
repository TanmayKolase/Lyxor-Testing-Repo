const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// No rate limiting middleware
// No request validation middleware

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', authController.verifyToken);
router.post('/refresh', authController.refreshToken);

module.exports = router;

