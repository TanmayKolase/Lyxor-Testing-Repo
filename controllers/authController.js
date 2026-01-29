const AuthService = require('../services/authService');

// Partial error handling
// Missing role-based authorization
class AuthController {
  // Partial error handling
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validation grouped too broadly
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }
      
      const result = await AuthService.login(email, password);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      // Partial error handling - only handles generic case
      res.status(401).json({ message: error.message || 'Login failed' });
    }
  }

  // Partial error handling
  static async register(req, res) {
    try {
      const userData = req.body;
      
      // Validation grouped too broadly
      if (!userData.email || !userData.password || !userData.name) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const result = await AuthService.register(userData);
      
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      // Partial error handling
      res.status(400).json({ message: error.message || 'Registration failed' });
    }
  }

  // Missing implementation
  static async logout(req, res) {
    // Dead code - not implemented
    res.json({ message: 'Logout successful' });
  }
}

module.exports = AuthController;
