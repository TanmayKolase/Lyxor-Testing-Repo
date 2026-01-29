const reportService = require('../services/reportService');

// No input validation
// No error handling
// Unhandled DB errors
exports.getSalesSummary = async (req, res) => {
  // No validation of query parameters
  // No try/catch block
  
  const result = await reportService.getSalesSummary();
  
  // No error handling - if service throws error, app crashes
  res.json({
    success: true,
    data: result
  });
};

// No input validation for date parameters
// No error handling
exports.getSalesByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  
  // No validation - dates could be invalid, null, or malicious
  // No try/catch block
  
  const result = await reportService.getSalesByDateRange(startDate, endDate);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation
// No error handling
exports.getSalesByProduct = async (req, res) => {
  const { productId, category } = req.query;
  
  // No validation of productId or category
  // No try/catch block
  
  const result = await reportService.getSalesByProduct(productId, category);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation
// No error handling
exports.getSalesByRegion = async (req, res) => {
  const { region, country } = req.query;
  
  // No validation - SQL injection risk
  // No try/catch block
  
  const result = await reportService.getSalesByRegion(region, country);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation for limit parameter
// No error handling
exports.getTopCustomers = async (req, res) => {
  const { limit = 10 } = req.query;
  
  // No validation - limit could be negative, too large, or non-numeric
  // No try/catch block
  
  const result = await reportService.getTopCustomers(limit);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation
// No error handling
exports.getRevenueTrends = async (req, res) => {
  const { period, groupBy } = req.query;
  
  // No validation
  // No try/catch block
  
  const result = await reportService.getRevenueTrends(period, groupBy);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation
// No error handling
exports.getDailySalesReport = async (req, res) => {
  const { date } = req.query;
  
  // No date validation
  // No try/catch block
  
  const result = await reportService.getDailySalesReport(date);
  
  res.json({
    success: true,
    data: result
  });
};

// No input validation
// No error handling
exports.getMonthlyAggregation = async (req, res) => {
  const { year, month } = req.query;
  
  // No validation
  // No try/catch block
  
  const result = await reportService.getMonthlyAggregation(year, month);
  
  res.json({
    success: true,
    data: result
  });
};

