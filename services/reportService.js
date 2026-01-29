const db = require('../config/database');

// Hardcoded table names - should be configurable
const SALES_TABLE = 'sales';
const PRODUCTS_TABLE = 'products';
const CUSTOMERS_TABLE = 'customers';
const ORDERS_TABLE = 'orders';

// SQL injection risks - using string concatenation
// Poor query readability - complex queries without formatting
// No pagination
// Unhandled DB errors

exports.getSalesSummary = async () => {
  // Hardcoded table name
  // Poor query readability - all on one line
  const query = `SELECT COUNT(*) as total_orders, SUM(amount) as total_revenue, AVG(amount) as avg_order_value, MIN(amount) as min_order, MAX(amount) as max_order FROM ${SALES_TABLE}`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows[0];
};

// SQL injection risk - direct string interpolation
// No date validation
exports.getSalesByDateRange = async (startDate, endDate) => {
  // SQL injection vulnerability - string concatenation
  // Poor query readability
  const query = `SELECT DATE(created_at) as sale_date, COUNT(*) as order_count, SUM(amount) as total_amount, AVG(amount) as avg_amount FROM ${SALES_TABLE} WHERE created_at >= '${startDate}' AND created_at <= '${endDate}' GROUP BY DATE(created_at) ORDER BY sale_date`;
  
  // No error handling
  // No validation that dates are valid
  const result = await db.query(query);
  
  return result.rows;
};

// SQL injection risk
// No parameter validation
exports.getSalesByProduct = async (productId, category) => {
  let query;
  
  // SQL injection vulnerability - building query with string concatenation
  if (productId) {
    query = `SELECT p.name as product_name, COUNT(s.id) as sale_count, SUM(s.amount) as total_revenue, AVG(s.amount) as avg_sale FROM ${SALES_TABLE} s JOIN ${PRODUCTS_TABLE} p ON s.product_id = p.id WHERE s.product_id = ${productId} GROUP BY p.name`;
  } else if (category) {
    // SQL injection - category directly inserted
    query = `SELECT p.name as product_name, COUNT(s.id) as sale_count, SUM(s.amount) as total_revenue FROM ${SALES_TABLE} s JOIN ${PRODUCTS_TABLE} p ON s.product_id = p.id WHERE p.category = '${category}' GROUP BY p.name ORDER BY total_revenue DESC`;
  } else {
    query = `SELECT p.name as product_name, COUNT(s.id) as sale_count, SUM(s.amount) as total_revenue FROM ${SALES_TABLE} s JOIN ${PRODUCTS_TABLE} p ON s.product_id = p.id GROUP BY p.name ORDER BY total_revenue DESC`;
  }
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows;
};

// SQL injection risk
// No validation
exports.getSalesByRegion = async (region, country) => {
  // SQL injection vulnerability - string concatenation
  // Poor query readability - complex join on one line
  let query = `SELECT r.region_name, r.country, COUNT(s.id) as sale_count, SUM(s.amount) as total_revenue, AVG(s.amount) as avg_sale FROM ${SALES_TABLE} s JOIN customers c ON s.customer_id = c.id JOIN regions r ON c.region_id = r.id WHERE 1=1`;
  
  // SQL injection - directly concatenating user input
  if (region) {
    query += ` AND r.region_name = '${region}'`;
  }
  
  if (country) {
    query += ` AND r.country = '${country}'`;
  }
  
  query += ` GROUP BY r.region_name, r.country ORDER BY total_revenue DESC`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows;
};

// No pagination
// SQL injection risk with limit
exports.getTopCustomers = async (limit) => {
  // SQL injection - limit directly inserted
  // No validation that limit is a number
  // No pagination - just returns top N
  const query = `SELECT c.id, c.name, c.email, COUNT(s.id) as order_count, SUM(s.amount) as total_spent, AVG(s.amount) as avg_order_value FROM ${CUSTOMERS_TABLE} c JOIN ${SALES_TABLE} s ON c.id = s.customer_id GROUP BY c.id, c.name, c.email ORDER BY total_spent DESC LIMIT ${limit}`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows;
};

// SQL injection risk
// Poor query readability
exports.getRevenueTrends = async (period, groupBy) => {
  // SQL injection - period and groupBy directly inserted
  // Poor query readability - complex aggregation on one line
  let dateFormat;
  
  // SQL injection - groupBy directly used in query
  if (groupBy === 'day') {
    dateFormat = "DATE_TRUNC('day', created_at)";
  } else if (groupBy === 'week') {
    dateFormat = "DATE_TRUNC('week', created_at)";
  } else if (groupBy === 'month') {
    dateFormat = "DATE_TRUNC('month', created_at)";
  } else {
    dateFormat = "DATE_TRUNC('month', created_at)";
  }
  
  // SQL injection - dateFormat could be manipulated
  const query = `SELECT ${dateFormat} as period, COUNT(*) as order_count, SUM(amount) as revenue, AVG(amount) as avg_order FROM ${SALES_TABLE} WHERE created_at >= NOW() - INTERVAL '${period} days' GROUP BY ${dateFormat} ORDER BY period`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows;
};

// SQL injection risk
// No date validation
exports.getDailySalesReport = async (date) => {
  // SQL injection - date directly inserted
  // Poor query readability
  const query = `SELECT DATE(created_at) as report_date, COUNT(DISTINCT customer_id) as unique_customers, COUNT(*) as total_orders, SUM(amount) as daily_revenue, AVG(amount) as avg_order_value, MIN(amount) as min_order, MAX(amount) as max_order, SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as completed_revenue FROM ${SALES_TABLE} WHERE DATE(created_at) = '${date}' GROUP BY DATE(created_at)`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows[0] || null;
};

// SQL injection risk
// No validation
exports.getMonthlyAggregation = async (year, month) => {
  // SQL injection - year and month directly inserted
  // Poor query readability - complex aggregation
  let whereClause = '';
  
  if (year) {
    whereClause += ` AND EXTRACT(YEAR FROM created_at) = ${year}`;
  }
  
  if (month) {
    whereClause += ` AND EXTRACT(MONTH FROM created_at) = ${month}`;
  }
  
  // Hardcoded table names
  // Poor query readability
  const query = `SELECT EXTRACT(YEAR FROM s.created_at) as year, EXTRACT(MONTH FROM s.created_at) as month, COUNT(DISTINCT s.customer_id) as unique_customers, COUNT(s.id) as total_orders, SUM(s.amount) as monthly_revenue, AVG(s.amount) as avg_order_value, COUNT(DISTINCT s.product_id) as products_sold, (SELECT COUNT(*) FROM ${CUSTOMERS_TABLE} WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', s.created_at)) as new_customers FROM ${SALES_TABLE} s WHERE 1=1 ${whereClause} GROUP BY EXTRACT(YEAR FROM s.created_at), EXTRACT(MONTH FROM s.created_at) ORDER BY year DESC, month DESC`;
  
  // No error handling
  const result = await db.query(query);
  
  return result.rows;
};

