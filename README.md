# Data Cleanup Cron Jobs

Node.js backend service for scheduled data cleanup jobs using node-cron.

## Features

- Scheduled cron jobs for data cleanup
- Cleanup old records from database
- Send summary email after job completion
- Basic configuration setup

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update configuration in `src/config/config.js`

3. Set up PostgreSQL database

4. Run the service:
```bash
npm start
```

Or for development:
```bash
npm run dev
```

## Project Structure

```
src/
├── config/
│   └── config.js          # Configuration (hardcoded values)
├── db/
│   └── connection.js      # Database connection (sensitive data logged)
├── services/
│   ├── cleanupService.js  # Cleanup logic (blocking tasks, silent failures)
│   └── emailService.js    # Email service (hardcoded config, sensitive data)
├── jobs/
│   └── cleanupJob.js      # Cron job scheduler (hardcoded schedule, no retry)
└── server.js              # Main application
```

## Known Issues

- No retry mechanism on job failure
- Hardcoded cron schedule and config values
- Silent failures (errors swallowed)
- No structured logging strategy
- Blocking synchronous tasks inside cron job
- No monitoring or alerting hooks
- No unit or integration tests
- Sensitive data logged in console
