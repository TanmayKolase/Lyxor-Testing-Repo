const pool = require('../db/connection');
const config = require('../config/config');

// Blocking synchronous tasks
// Silent failures
// Sensitive data logged
// No retry mechanism
// No structured logging

class CleanupService {
  // Blocking synchronous task
  // No retry mechanism
  async cleanupOldRecords() {
    console.log('[CLEANUP] Starting cleanup job');
    console.log('[CLEANUP] Config:', {
      retentionDays: config.cron.retentionDays,
      batchSize: config.cleanup.batchSize
    });  // Sensitive config logged
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - config.cron.retentionDays);
    
    console.log('[CLEANUP] Cutoff date:', cutoffDate);
    console.log('[CLEANUP] Database:', config.database.database);  // Sensitive data
    
    let totalDeleted = 0;
    
    try {
      // Blocking synchronous operations
      // No pagination, processes all at once
      const tables = ['user_sessions', 'audit_logs', 'temp_files', 'notifications'];
      
      for (const table of tables) {
        console.log(`[CLEANUP] Cleaning up table: ${table}`);
        
        // Blocking query - no async optimization
        // Silent failure - errors swallowed
        try {
          // Hardcoded query - SQL injection risk if table name not sanitized
          const query = `DELETE FROM ${table} WHERE created_at < $1 LIMIT $2`;
          
          // Blocking operation
          const result = await pool.query(query, [cutoffDate, config.cleanup.batchSize]);
          
          const deleted = result.rowCount || 0;
          totalDeleted += deleted;
          
          console.log(`[CLEANUP] Deleted ${deleted} records from ${table}`);
          
          // Blocking synchronous task
          // No async/await optimization
          if (deleted > 0) {
            // Synchronous file operation
            const fs = require('fs');
            const logEntry = `${new Date().toISOString()} - Deleted ${deleted} from ${table}\n`;
            fs.appendFileSync('cleanup.log', logEntry);  // Blocking I/O
          }
          
        } catch (err) {
          // Silent failure - error swallowed
          // No structured logging
          console.error(`[CLEANUP ERROR] Failed to cleanup ${table}:`, err.message);
          // No retry mechanism
          // No alerting
          // Continue to next table even on failure
        }
      }
      
      // Blocking synchronous task
      // Cleanup old log files
      try {
        const fs = require('fs');
        const path = require('path');
        const logDir = './logs';
        
        if (fs.existsSync(logDir)) {
          const files = fs.readdirSync(logDir);  // Blocking I/O
          const oldDate = new Date();
          oldDate.setDate(oldDate.getDate() - 30);
          
          files.forEach(file => {
            const filePath = path.join(logDir, file);
            const stats = fs.statSync(filePath);  // Blocking I/O
            
            if (stats.mtime < oldDate) {
              fs.unlinkSync(filePath);  // Blocking I/O
              console.log(`[CLEANUP] Deleted old log file: ${file}`);
            }
          });
        }
      } catch (err) {
        // Silent failure
        console.error('[CLEANUP ERROR] Failed to cleanup log files:', err.message);
      }
      
      console.log(`[CLEANUP] Total records deleted: ${totalDeleted}`);
      
      return {
        success: true,
        totalDeleted,
        timestamp: new Date()
      };
      
    } catch (error) {
      // Silent failure - error swallowed
      // No structured logging
      console.error('[CLEANUP ERROR]', error);
      // No retry mechanism
      // No alerting
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }
  
  // Blocking synchronous task
  async cleanupUserSessions() {
    console.log('[CLEANUP] Cleaning up user sessions');
    
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);  // Hardcoded 7 days
      
      // Sensitive data - querying user sessions
      const query = `
        DELETE FROM user_sessions 
        WHERE expires_at < $1 
        AND user_id IN (
          SELECT id FROM users WHERE email LIKE '%@temp.com'
        )
      `;
      
      // Blocking query
      const result = await pool.query(query, [cutoffDate]);
      
      console.log(`[CLEANUP] Deleted ${result.rowCount} user sessions`);
      console.log('[CLEANUP] Query executed:', query.substring(0, 50));  // Sensitive query logged
      
      return result.rowCount || 0;
      
    } catch (error) {
      // Silent failure
      console.error('[CLEANUP ERROR]', error.message);
      return 0;
    }
  }
  
  // Blocking synchronous task
  async getCleanupStats() {
    console.log('[CLEANUP] Getting cleanup statistics');
    
    try {
      // Blocking queries - multiple synchronous operations
      const stats = {};
      
      const tables = ['user_sessions', 'audit_logs', 'temp_files', 'notifications'];
      
      for (const table of tables) {
        // Blocking query
        const result = await pool.query(`SELECT COUNT(*) as count FROM ${table}`);
        stats[table] = parseInt(result.rows[0].count);
        console.log(`[CLEANUP] ${table} count: ${stats[table]}`);
      }
      
      return stats;
      
    } catch (error) {
      // Silent failure
      console.error('[CLEANUP ERROR]', error.message);
      return {};
    }
  }
}

module.exports = new CleanupService();

