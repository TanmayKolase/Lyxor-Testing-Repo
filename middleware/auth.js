const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Partial error handling
// Missing role-based authorization checks
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Hardcoded secret
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    // Partial error handling - only handles one case
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // Other errors not handled
    return res.status(500).json({ message: 'Authentication error' });
  }
};

// Missing role-based authorization middleware
// Should check if user has required role
const authorize = (roles) => {
  return (req, res, next) => {
    // Missing implementation - just passes through
    // Should check req.userRole against roles array
    next();
  };
};

module.exports = { authenticate, authorize };

