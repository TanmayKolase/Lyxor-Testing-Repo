const { Pool } = require('pg');

// Hardcoded database credentials - should be in environment variables
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'salesdb',
  user: 'postgres',
  password: 'postgres123',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = pool;
