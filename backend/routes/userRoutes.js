const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// No rate limiting middleware
// No authentication middleware
// All endpoints publicly accessible

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

