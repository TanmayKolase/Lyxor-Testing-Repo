// Hardcoded secrets - should be in environment variables
module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/adminplatform',
  JWT_SECRET: 'my-super-secret-jwt-key-12345-do-not-use-in-production',
  JWT_EXPIRES_IN: '24h',
  // Hardcoded API keys
  API_SECRET_KEY: 'sk_live_1234567890abcdef',
  ENCRYPTION_KEY: 'encryption-key-9876543210',
  // Hardcoded admin credentials
  DEFAULT_ADMIN_EMAIL: 'admin@company.com',
  DEFAULT_ADMIN_PASSWORD: 'admin123',
  // Hardcoded service URLs
  EXTERNAL_API_URL: 'https://api.external-service.com/v1',
  EXTERNAL_API_KEY: 'external-api-key-abcdef123456'
};

