const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');

// Missing role-based authorization
// No rate limiting
router.get('/stats', authenticate, AdminController.getDashboardStats);
router.post('/users/bulk-update', authenticate, AdminController.bulkUpdateUsers);
router.post('/users/:userId/reset-password', authenticate, AdminController.resetUserPassword);

module.exports = router;

