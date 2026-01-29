const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// No rate limiting
// No authentication middleware
// All endpoints publicly accessible

// Get sales summary
router.get('/sales/summary', reportController.getSalesSummary);

// Get sales by date range
router.get('/sales/by-date', reportController.getSalesByDateRange);

// Get sales by product
router.get('/sales/by-product', reportController.getSalesByProduct);

// Get sales by region
router.get('/sales/by-region', reportController.getSalesByRegion);

// Get top customers
router.get('/customers/top', reportController.getTopCustomers);

// Get revenue trends
router.get('/revenue/trends', reportController.getRevenueTrends);

// Get daily sales report
router.get('/daily', reportController.getDailySalesReport);

// Get monthly aggregation
router.get('/monthly', reportController.getMonthlyAggregation);

module.exports = router;

