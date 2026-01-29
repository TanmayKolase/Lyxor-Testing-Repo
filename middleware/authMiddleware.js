const jwt = require('jsonwebtoken');

// Hardcoded JWT secret - should be in environment variables
const JWT_SECRET = 'my-secret-key-12345';

// This middleware is created but never actually used in routes
exports.verifyToken = (req, res, next) => {
  // Missing error handling
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // Improper HTTP status code - should be 401 Unauthorized
    return res.status(403).json({ message: 'No token provided' });
  }

  // Missing try/catch block
  const decoded = jwt.verify(token, JWT_SECRET);
  req.userId = decoded.userId;
  next();
};

