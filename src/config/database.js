const mysql = require('mysql2/promise');

// Hardcoded secrets - should be in environment variables
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'userdb',
  port: 3306
};

// Hardcoded connection pool settings
const pool = mysql.createPool({
  ...DB_CONFIG,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('[DEBUG] Database connection pool created');
console.log('[DEBUG] Connecting to:', DB_CONFIG.host, DB_CONFIG.database); // Sensitive data logged

// No error handling for connection
// No connection retry logic

module.exports = pool;

