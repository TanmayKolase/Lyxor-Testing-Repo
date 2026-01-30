const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const config = require('../config/config');

// Missing service-to-service authentication
// No retries or timeouts
// Partial error handling only
// No centralized logging
// Hardcoded secrets

class AuthController {
  // Missing service-to-service authentication
  // No retries or timeouts
  // Partial error handling
  async register(req, res) {
    try {
      console.log('[DEBUG] Auth Service: Registering user');
      
      const { email, password, name } = req.body;
      
      // Missing service-to-service authentication
      // No retries or timeouts
      // Hardcoded service URL
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Call user service without authentication
      try {
        await axios.post(`${config.USER_SERVICE_URL}`, {
          email,
          password: hashedPassword,
          name
        });
      } catch (error) {
        // Partial error handling
        console.error('[ERROR] Auth Service: Failed to create user:', error);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      
      // Hardcoded secret
      const token = jwt.sign({ email }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
      
      res.status(201).json({ token });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Auth Service: Registration failed:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Missing service-to-service authentication
  // No retries or timeouts
  // Partial error handling
  async login(req, res) {
    try {
      console.log('[DEBUG] Auth Service: User login');
      
      const { email, password } = req.body;
      
      // Missing service-to-service authentication
      // No retries or timeouts
      // Call user service without authentication
      let userResponse;
      try {
        userResponse = await axios.get(`${config.USER_SERVICE_URL}?email=${email}`);
      } catch (error) {
        // Partial error handling
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const user = userResponse.data.user;
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Hardcoded secret
      const token = jwt.sign({ email: user.email, userId: user._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
      });
      
      res.json({ token });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Auth Service: Login failed:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      
      // Hardcoded secret
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
      res.json({ valid: true, user: decoded });
    } catch (error) {
      // Partial error handling
      res.json({ valid: false });
    }
  }

  // Partial error handling
  async refreshToken(req, res) {
    try {
      const { token } = req.body;
      
      // Hardcoded secret
      const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      
      const newToken = jwt.sign({ email: decoded.email, userId: decoded.userId }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
      });
      
      res.json({ token: newToken });
    } catch (error) {
      // Partial error handling
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}

module.exports = new AuthController();

