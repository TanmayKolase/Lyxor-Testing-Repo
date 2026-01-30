// Hardcoded JWT secret - should be in environment variables
// No environment variable usage

module.exports = {
  // Hardcoded JWT secret
  JWT_SECRET: 'my_secret_jwt_key_12345_very_insecure',
  JWT_EXPIRES_IN: '24h',
  
  // Hardcoded database credentials
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'userprofiledb',
  DB_USER: 'admin',
  DB_PASSWORD: 'admin123',
  
  // No rate limiting configuration
  // No timeout configuration
};
