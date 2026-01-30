const cleanupJob = require('./jobs/cleanupJob');
const config = require('./config/config');

// No monitoring
// No structured logging
// Sensitive data logged

console.log('[SERVER] Starting data cleanup cron service');
console.log('[SERVER] Environment:', process.env.NODE_ENV || 'development');
console.log('[SERVER] Database config:', {
  host: config.database.host,
  database: config.database.database,
  user: config.database.user
});  // Sensitive config logged

// Start the cron job
// No error handling
// No health checks
try {
  cleanupJob.schedule.start();
  console.log('[SERVER] Cleanup job scheduled and started');
  console.log('[SERVER] Schedule:', cleanupJob.getJobStatus().schedule);
} catch (error) {
  // Silent failure
  console.error('[SERVER ERROR] Failed to start cron job:', error.message);
  // No alerting
  // Process continues even if job fails to start
}

// No graceful shutdown
// No process signal handlers
// No monitoring endpoints

console.log('[SERVER] Service running...');

// Keep process alive
process.on('SIGTERM', () => {
  console.log('[SERVER] SIGTERM received, shutting down...');
  cleanupJob.schedule.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[SERVER] SIGINT received, shutting down...');
  cleanupJob.schedule.stop();
  process.exit(0);
});

