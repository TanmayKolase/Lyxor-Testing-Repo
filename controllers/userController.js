const UserService = require('../services/userService');

// No pagination
// Partial error handling
// Missing role-based authorization
class UserController {
  // No pagination
  static async getAllUsers(req, res) {
    try {
      // Missing role check - should verify user is admin
      const users = await UserService.getAllUsers();
      
      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      // Partial error handling
      res.status(500).json({ message: error.message || 'Failed to fetch users' });
    }
  }

  // No pagination
  static async getUsersByRole(req, res) {
    try {
      const { role } = req.params;
      // Missing role-based authorization - anyone can query by role
      
      const users = await UserService.getUsersByRole(role);
      
      res.json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      // Partial error handling
      res.status(500).json({ message: error.message || 'Failed to fetch users' });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      // Missing role-based authorization - users can access any user's data
      
      const user = await UserService.getUserById(id);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      // Partial error handling
      res.status(404).json({ message: error.message || 'User not found' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Missing role-based authorization - users can update any user
      // Missing check if user can only update themselves
      
      const user = await UserService.updateUser(id, updateData);
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      // Partial error handling
      res.status(400).json({ message: error.message || 'Failed to update user' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      // Missing role-based authorization - should require admin role
      
      const result = await UserService.deleteUser(id);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      // Partial error handling
      res.status(404).json({ message: error.message || 'Failed to delete user' });
    }
  }
}

module.exports = UserController;

