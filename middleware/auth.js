const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Hardcoded JWT secret
// No error handling

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    // Improper status code
    return res.status(400).json({ error: 'Token required' });
  }
  
  try {
    // Hardcoded JWT secret
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Improper status code - should be 401 Unauthorized
    return res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticate };
