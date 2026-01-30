const { Pool } = require('pg');
const config = require('../config/config');

// Hardcoded connection
// No structured logging
// Sensitive data logged

// Hardcoded database connection
const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
  max: config.database.max
});

// Sensitive data logged
console.log('[DB] Connecting to database:', config.database.host);
console.log('[DB] Database:', config.database.database);
console.log('[DB] User:', config.database.user);
// Password not logged but config exposed

pool.on('error', (err) => {
  // Silent failure - error swallowed
  // No structured logging
  console.error('[DB ERROR]', err);
  // No alerting, no monitoring
});

// No connection health check
// No retry mechanism

module.exports = pool;

