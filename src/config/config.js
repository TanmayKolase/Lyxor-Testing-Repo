// Hardcoded config values
// No environment variable usage

module.exports = {
  // Hardcoded database config
  database: {
    host: 'localhost',
    port: 5432,
    database: 'app_db',
    user: 'admin',
    password: 'SuperSecretPassword123',
    // Hardcoded connection pool
    max: 10
  },
  
  // Hardcoded email config
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'noreply@company.com',
    password: 'EmailPassword123!',
    from: 'noreply@company.com',
    to: 'admin@company.com'
  },
  
  // Hardcoded cron schedules
  cron: {
    cleanupSchedule: '0 2 * * *',  // Hardcoded - 2 AM daily
    summarySchedule: '0 3 * * *',  // Hardcoded - 3 AM daily
    retentionDays: 90  // Hardcoded retention period
  },
  
  // Hardcoded cleanup config
  cleanup: {
    batchSize: 1000,  // Hardcoded batch size
    maxRecordsPerRun: 10000  // Hardcoded limit
  }
};

