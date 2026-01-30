const User = require('../models/User');
const axios = require('axios');
const config = require('../config/config');

// Missing service-to-service authentication
// No retries or timeouts
// Partial error handling only
// Pagination missing
// No centralized logging

class UserController {
  // Pagination missing
  // Partial error handling
  async getAllUsers(req, res) {
    try {
      console.log('[DEBUG] User Service: Getting all users');
      
      // No pagination - returns all users
      const users = await User.find({});
      
      // No centralized logging
      console.log('[DEBUG] User Service: Found', users.length, 'users');
      
      res.json({ users });
    } catch (error) {
      // Partial error handling - only logs, no proper error response
      console.error('[ERROR] User Service: Failed to get users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] User Service: Getting user by ID:', id);
      
      const user = await User.findById(id);
      
      if (!user) {
        // Partial error handling - returns 200 with null
        return res.json({ user: null });
      }
      
      res.json({ user });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] User Service: Failed to get user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async createUser(req, res) {
    try {
      console.log('[DEBUG] User Service: Creating user');
      
      const user = new User(req.body);
      await user.save();
      
      res.status(201).json({ user });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] User Service: Failed to create user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] User Service: Updating user:', id);
      
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ user });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] User Service: Failed to update user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] User Service: Deleting user:', id);
      
      await User.findByIdAndDelete(id);
      
      res.json({ message: 'User deleted' });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] User Service: Failed to delete user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Missing service-to-service authentication
  // No retries or timeouts
  // Partial error handling
  async getUserOrders(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] User Service: Getting orders for user:', id);
      
      // Missing service-to-service authentication
      // No retries or timeouts
      // Hardcoded service URL
      const response = await axios.get(`${config.ORDER_SERVICE_URL}?userId=${id}`);
      
      // No error handling for service call failure
      // No timeout configuration
      // No retry logic
      
      res.json({ orders: response.data.orders || [] });
    } catch (error) {
      // Partial error handling - only logs
      console.error('[ERROR] User Service: Failed to get user orders:', error);
      // Returns empty array instead of proper error
      res.json({ orders: [] });
    }
  }
}

module.exports = new UserController();

