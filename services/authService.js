const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('../config/config');

// Hardcoded secrets
// Partial error handling
class AuthService {
  // Hardcoded JWT secret
  static generateToken(user) {
    return jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );
  }

  // Partial error handling
  static async login(email, password) {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      
      // Missing check for isActive
      // Missing update of lastLogin
      
      const token = this.generateToken(user);
      
      return { user, token };
    } catch (error) {
      // Partial error handling - only throws, doesn't log
      throw error;
    }
  }

  // Partial error handling
  static async register(userData) {
    try {
      // Validation grouped too broadly - all in one place
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Missing required fields');
      }
      
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const user = new User(userData);
      await user.save();
      
      const token = this.generateToken(user);
      
      return { user, token };
    } catch (error) {
      // Partial error handling
      if (error.code === 11000) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }
}

module.exports = AuthService;
