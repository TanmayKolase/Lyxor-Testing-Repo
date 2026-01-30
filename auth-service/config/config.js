// Hardcoded secrets across services
// No environment variable usage

module.exports = {
  // Hardcoded secrets
  JWT_SECRET: 'my_secret_jwt_key_12345',
  JWT_EXPIRES_IN: '24h',
  REFRESH_TOKEN_SECRET: 'my_refresh_token_secret_67890',
  
  // Hardcoded service URLs
  USER_SERVICE_URL: 'http://localhost:3001/api/users',
  ORDER_SERVICE_URL: 'http://localhost:3002/api/orders',
  
  // No retries or timeouts configuration
  // No rate limiting configuration
};

