const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// No rate limiting
// Partial authorization - only authenticate, no role check
router.get('/', authenticate, UserController.getAllUsers);
router.get('/role/:role', authenticate, UserController.getUsersByRole);
router.get('/:id', authenticate, UserController.getUserById);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

module.exports = router;

