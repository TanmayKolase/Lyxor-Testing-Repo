const mysql = require('mysql2');

// Hardcoded database credentials - should be in environment variables
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'auth_db',
  port: 3306
};

// Create connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

module.exports = promisePool;

