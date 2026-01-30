const nodemailer = require('nodemailer');
const config = require('../config/config');

// Hardcoded email config
// Sensitive data logged
// Silent failures
// No retry mechanism

// Hardcoded email transporter
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.password  // Hardcoded password
  }
});

// Sensitive data logged
console.log('[EMAIL] Email service initialized');
console.log('[EMAIL] SMTP Host:', config.email.host);
console.log('[EMAIL] From:', config.email.from);
console.log('[EMAIL] To:', config.email.to);

class EmailService {
  // No retry mechanism
  // Silent failures
  async sendSummaryEmail(summary) {
    console.log('[EMAIL] Sending summary email');
    console.log('[EMAIL] Summary data:', JSON.stringify(summary));  // Sensitive data logged
    
    const mailOptions = {
      from: config.email.from,
      to: config.email.to,  // Hardcoded recipient
      subject: 'Data Cleanup Job Summary',
      html: `
        <h2>Data Cleanup Job Summary</h2>
        <p><strong>Date:</strong> ${summary.timestamp}</p>
        <p><strong>Total Records Deleted:</strong> ${summary.totalDeleted}</p>
        <p><strong>Status:</strong> ${summary.success ? 'Success' : 'Failed'}</p>
        ${summary.error ? `<p><strong>Error:</strong> ${summary.error}</p>` : ''}
        <h3>Table Statistics:</h3>
        <pre>${JSON.stringify(summary.stats, null, 2)}</pre>
      `
    };
    
    try {
      // No retry mechanism
      // Blocking operation
      const info = await transporter.sendMail(mailOptions);
      
      console.log('[EMAIL] Email sent successfully');
      console.log('[EMAIL] Message ID:', info.messageId);
      console.log('[EMAIL] Response:', info.response);  // Sensitive response logged
      
      return { success: true, messageId: info.messageId };
      
    } catch (error) {
      // Silent failure - error swallowed
      // No structured logging
      console.error('[EMAIL ERROR]', error.message);
      console.error('[EMAIL ERROR] Stack:', error.stack);  // Sensitive stack trace
      // No retry mechanism
      // No alerting
      return { success: false, error: error.message };
    }
  }
  
  // No retry mechanism
  async sendErrorAlert(error) {
    console.log('[EMAIL] Sending error alert');
    console.log('[EMAIL] Error details:', error);  // Sensitive error data logged
    
    const mailOptions = {
      from: config.email.from,
      to: config.email.to,  // Hardcoded recipient
      subject: 'Data Cleanup Job Failed',
      html: `
        <h2>Data Cleanup Job Failed</h2>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre>${error.stack}</pre>
      `
    };
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('[EMAIL] Error alert sent');
      return { success: true };
    } catch (err) {
      // Silent failure
      console.error('[EMAIL ERROR] Failed to send error alert:', err.message);
      return { success: false };
    }
  }
}

module.exports = new EmailService();

