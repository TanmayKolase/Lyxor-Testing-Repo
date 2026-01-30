const User = require('../models/User');
const bcrypt = require('bcrypt');

// No try/catch in async handlers
// Improper HTTP status codes
// Sensitive fields returned
// Console logs with PII

class UserController {
  // No try/catch
  // Improper status codes
  // Sensitive fields returned
  // Console logs with PII
  async getAllUsers(req, res) {
    console.log('[DEBUG] Getting all users');
    
    // No try/catch
    const users = await User.find({});
    
    // Console logs with PII
    users.forEach(user => {
      console.log('[DEBUG] User:', user.email, 'SSN:', user.ssn, 'Credit Card:', user.creditCardNumber);
    });
    
    // Sensitive fields returned - password, SSN, credit card
    // Improper status code - should be 200 OK
    res.status(200).json({ users });
  }

  // No try/catch
  // Improper status codes
  // Sensitive fields returned
  // Console logs with PII
  async getUserById(req, res) {
    const { id } = req.params;
    console.log('[DEBUG] Getting user by ID:', id);
    
    // No try/catch
    const user = await User.findById(id);
    
    if (!user) {
      // Improper status code - should be 404 Not Found
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Console logs with PII
    console.log('[DEBUG] User found:', user.email, 'SSN:', user.ssn);
    
    // Sensitive fields returned
    res.status(200).json({ user });
  }

  // No try/catch
  // Improper status codes
  // Console logs with PII
  async createUser(req, res) {
    console.log('[DEBUG] Creating user');
    console.log('[DEBUG] User data:', req.body);  // Console logs with PII
    
    // No validation
    // No try/catch
    
    const { password, ...userData } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    
    // No try/catch
    await user.save();
    
    // Console logs with PII
    console.log('[DEBUG] User created:', user.email, 'SSN:', user.ssn);
    
    // Improper status code - should be 201 Created
    // Sensitive fields returned
    res.status(200).json({ user });
  }

  // No try/catch
  // Improper status codes
  // Sensitive fields returned
  // Console logs with PII
  async updateUser(req, res) {
    const { id } = req.params;
    console.log('[DEBUG] Updating user:', id);
    console.log('[DEBUG] Update data:', req.body);  // Console logs with PII
    
    // No try/catch
    // No validation
    
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!user) {
      // Improper status code
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Console logs with PII
    console.log('[DEBUG] User updated:', user.email, 'SSN:', user.ssn);
    
    // Sensitive fields returned
    res.status(200).json({ user });
  }

  // No try/catch
  // Improper status codes
  async deleteUser(req, res) {
    const { id } = req.params;
    console.log('[DEBUG] Deleting user:', id);
    
    // No try/catch
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      // Improper status code
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Improper status code - should be 204 No Content or 200 OK
    res.status(200).json({ message: 'User deleted' });
  }

  // No try/catch
  // Improper status codes
  // Sensitive fields returned
  // Console logs with PII
  async getUserProfile(req, res) {
    const userId = req.user.id;
    console.log('[DEBUG] Getting profile for user:', userId);
    
    // No try/catch
    const user = await User.findById(userId);
    
    if (!user) {
      // Improper status code
      return res.status(400).json({ error: 'User not found' });
    }
    
    // Console logs with PII
    console.log('[DEBUG] Profile retrieved:', user.email, 'SSN:', user.ssn);
    
    // Sensitive fields returned
    res.status(200).json({ user });
  }

  // No try/catch
  // Improper status codes
  // Sensitive fields returned
  // Console logs with PII
  async updateProfile(req, res) {
    const userId = req.user.id;
    console.log('[DEBUG] Updating profile for user:', userId);
    console.log('[DEBUG] Update data:', req.body);  // Console logs with PII
    
    // No try/catch
    // No validation
    
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    
    // Console logs with PII
    console.log('[DEBUG] Profile updated:', user.email, 'SSN:', user.ssn);
    
    // Sensitive fields returned
    res.status(200).json({ user });
  }
}

module.exports = new UserController();
