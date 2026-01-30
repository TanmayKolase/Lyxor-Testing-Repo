const cron = require('node-cron');
const cleanupService = require('../services/cleanupService');
const emailService = require('../services/emailService');
const config = require('../config/config');

// Hardcoded cron schedule
// Silent failures
// No retry mechanism
// No monitoring or alerting hooks
// Blocking tasks

// Hardcoded cron schedule
const CLEANUP_SCHEDULE = '0 2 * * *';  // Hardcoded - 2 AM daily

console.log('[JOB] Initializing cleanup job');
console.log('[JOB] Schedule:', CLEANUP_SCHEDULE);
console.log('[JOB] Config retention days:', config.cron.retentionDays);  // Sensitive config

let isRunning = false;
let lastRunTime = null;
let lastRunResult = null;

// No retry mechanism
// Silent failures
// Blocking tasks
const runCleanupJob = async () => {
  if (isRunning) {
    console.log('[JOB] Cleanup job already running, skipping...');
    return;
  }
  
  isRunning = true;
  const startTime = new Date();
  
  console.log('[JOB] Starting cleanup job at', startTime);
  console.log('[JOB] Database:', config.database.database);  // Sensitive data
  
  try {
    // Blocking synchronous tasks inside cron job
    const result = await cleanupService.cleanupOldRecords();
    
    lastRunTime = new Date();
    lastRunResult = result;
    
    console.log('[JOB] Cleanup job completed');
    console.log('[JOB] Result:', JSON.stringify(result));  // Sensitive data logged
    
    // Get stats - blocking operation
    const stats = await cleanupService.getCleanupStats();
    result.stats = stats;
    
    // Send email - blocking operation
    // No retry mechanism
    const emailResult = await emailService.sendSummaryEmail(result);
    
    if (!emailResult.success) {
      // Silent failure - error swallowed
      console.error('[JOB] Failed to send summary email');
      // No alerting
    }
    
    const duration = new Date() - startTime;
    console.log(`[JOB] Total duration: ${duration}ms`);
    
  } catch (error) {
    // Silent failure - error swallowed
    // No structured logging
    console.error('[JOB ERROR]', error);
    console.error('[JOB ERROR] Stack:', error.stack);  // Sensitive stack trace
    
    // No retry mechanism
    // No alerting hooks
    // Try to send error email but don't wait
    emailService.sendErrorAlert(error).catch(err => {
      // Silent failure
      console.error('[JOB] Failed to send error alert:', err.message);
    });
    
    lastRunResult = {
      success: false,
      error: error.message,
      timestamp: new Date()
    };
    
  } finally {
    isRunning = false;
  }
};

// Hardcoded schedule
// No monitoring hooks
const schedule = cron.schedule(CLEANUP_SCHEDULE, () => {
  // No error handling around job execution
  runCleanupJob().catch(err => {
    // Silent failure
    console.error('[JOB] Unhandled error in scheduled job:', err.message);
    // No alerting
  });
}, {
  scheduled: false,  // Don't start automatically
  timezone: 'America/New_York'  // Hardcoded timezone
});

// No monitoring hooks
// No health check endpoint
const getJobStatus = () => {
  return {
    isRunning,
    lastRunTime,
    lastRunResult,
    schedule: CLEANUP_SCHEDULE
  };
};

// Blocking synchronous task
// Manual trigger for testing
const runNow = async () => {
  console.log('[JOB] Manual trigger requested');
  await runCleanupJob();
};

module.exports = {
  schedule,
  runNow,
  getJobStatus
};

