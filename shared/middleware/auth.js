const jwt = require('jsonwebtoken');

// This file exists but is never actually used
// Dead code - authentication middleware defined but not imported

// Hardcoded secret
const JWT_SECRET = 'my_secret_jwt_key_12345';

const authenticateService = (req, res, next) => {
  // This middleware is defined but never used
  // Missing service-to-service authentication implementation
  
  const token = req.headers['x-service-token'];
  
  if (!token) {
    return res.status(401).json({ error: 'Service token required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.service = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid service token' });
  }
};

module.exports = { authenticateService };

