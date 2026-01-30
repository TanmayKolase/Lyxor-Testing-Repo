const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// No rate limiting middleware
// Missing auth middleware on one route

// Missing auth middleware - should require authentication
router.get('/', userController.getAllUsers);

// Missing auth middleware - should require authentication
router.get('/:id', userController.getUserById);

// Missing auth middleware - should require authentication
router.post('/', userController.createUser);

// Missing auth middleware - should require authentication
router.put('/:id', userController.updateUser);

// Missing auth middleware - should require authentication
router.delete('/:id', userController.deleteUser);

// Has auth middleware
router.get('/profile/me', authenticate, userController.getUserProfile);

// Has auth middleware
router.put('/profile/me', authenticate, userController.updateProfile);

module.exports = router;
