const User = require('../models/User');
const config = require('../config/config');

// Missing role-based authorization
// Hardcoded values
// Partial error handling
class AdminController {
  // Missing role check - should verify admin role
  static async getDashboardStats(req, res) {
    try {
      // Performance issues not quantified - multiple queries
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });
      const adminUsers = await User.countDocuments({ role: 'admin' });
      
      res.json({
        success: true,
        data: {
          totalUsers,
          activeUsers,
          adminUsers
        }
      });
    } catch (error) {
      // Partial error handling
      res.status(500).json({ message: 'Failed to fetch stats' });
    }
  }

  // Missing role-based authorization
  static async bulkUpdateUsers(req, res) {
    try {
      const { userIds, updateData } = req.body;
      
      // Missing validation
      // Missing role check
      
      // Performance issue - no batch operation
      const results = [];
      for (const userId of userIds) {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        results.push(user);
      }
      
      res.json({
        success: true,
        data: results
      });
    } catch (error) {
      // Partial error handling
      res.status(500).json({ message: 'Bulk update failed' });
    }
  }

  // Hardcoded values
  static async resetUserPassword(req, res) {
    try {
      const { userId } = req.params;
      
      // Missing role check
      // Hardcoded default password
      const defaultPassword = 'TempPassword123!';
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      user.password = defaultPassword;
      await user.save();
      
      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error) {
      // Partial error handling
      res.status(500).json({ message: 'Password reset failed' });
    }
  }
}

module.exports = AdminController;

