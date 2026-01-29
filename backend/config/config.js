// Hardcoded email credentials - should be in environment variables
module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/userdb',
  EMAIL_SERVICE_USER: 'admin@company.com',
  EMAIL_SERVICE_PASSWORD: 'password123',
  EMAIL_SERVICE_HOST: 'smtp.company.com',
  EMAIL_SERVICE_PORT: 587,
  // Hardcoded API keys
  API_SECRET_KEY: 'my-secret-api-key-12345',
  JWT_SECRET: 'jwt-secret-key-98765'
};

