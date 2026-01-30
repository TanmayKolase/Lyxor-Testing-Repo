const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// No try/catch in async handlers
// Improper HTTP status codes
// Console logs with PII
// Hardcoded JWT secret

class AuthController {
  // No try/catch
  // Improper status codes
  // Console logs with PII
  // Hardcoded JWT secret
  async register(req, res) {
    console.log('[DEBUG] User registration');
    console.log('[DEBUG] Registration data:', req.body);  // Console logs with PII
    
    // No try/catch
    // No validation
    
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Improper status code - should be 409 Conflict
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    // No try/catch
    await user.save();
    
    // Hardcoded JWT secret
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );
    
    // Console logs with PII
    console.log('[DEBUG] User registered:', user.email);
    
    // Improper status code - should be 201 Created
    res.status(200).json({ token, user });
  }

  // No try/catch
  // Improper status codes
  // Console logs with PII
  // Hardcoded JWT secret
  async login(req, res) {
    console.log('[DEBUG] User login');
    console.log('[DEBUG] Login attempt for:', req.body.email);  // Console logs with PII
    
    // No try/catch
    // No validation
    
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      // Improper status code - should be 401 Unauthorized
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // Improper status code
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Hardcoded JWT secret
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );
    
    // Console logs with PII
    console.log('[DEBUG] User logged in:', user.email, 'SSN:', user.ssn);
    
    // Sensitive fields returned
    res.status(200).json({ token, user });
  }

  // No try/catch
  // Improper status codes
  // Hardcoded JWT secret
  async verifyToken(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      // Improper status code
      return res.status(400).json({ error: 'Token required' });
    }
    
    // No try/catch
    // Hardcoded JWT secret
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    res.status(200).json({ valid: true, user: decoded });
  }
}

module.exports = new AuthController();
