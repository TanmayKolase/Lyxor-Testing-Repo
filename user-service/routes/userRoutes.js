const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// No rate limiting middleware
// No authentication middleware for service-to-service calls
// No request validation middleware

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id/orders', userController.getUserOrders);

module.exports = router;

