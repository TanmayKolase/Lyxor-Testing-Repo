// Hardcoded secrets across services
// No environment variable usage

module.exports = {
  // Hardcoded secrets
  JWT_SECRET: 'my_secret_jwt_key_12345',
  JWT_EXPIRES_IN: '24h',
  
  // Hardcoded service URLs
  USER_SERVICE_URL: 'http://localhost:3001/api/users',
  AUTH_SERVICE_URL: 'http://localhost:3003/api/auth',
  
  // Hardcoded database credentials
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'orderdb',
  DB_USER: 'admin',
  DB_PASSWORD: 'admin123',
  
  // No retries or timeouts configuration
  // No rate limiting configuration
};

