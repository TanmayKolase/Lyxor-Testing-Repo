const User = require('../models/User');

// No pagination
// Partial error handling
// Performance issues not quantified
class UserService {
  // No pagination - returns all users
  static async getAllUsers() {
    try {
      // Performance issue - no pagination, no indexing mentioned
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      // Partial error handling
      throw new Error('Failed to fetch users');
    }
  }

  // No pagination
  static async getUsersByRole(role) {
    try {
      // Performance issue - no limit, no pagination
      const users = await User.find({ role }).select('-password');
      return users;
    } catch (error) {
      // Partial error handling
      throw new Error('Failed to fetch users by role');
    }
  }

  // Partial error handling
  static async getUserById(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      // Partial error handling - doesn't distinguish between not found and other errors
      throw error;
    }
  }

  // Validation grouped too broadly
  static async updateUser(userId, updateData) {
    try {
      // Validation grouped - all checks in one place
      if (updateData.email) {
        const existingUser = await User.findOne({ email: updateData.email, _id: { $ne: userId } });
        if (existingUser) {
          throw new Error('Email already exists');
        }
      }
      
      if (updateData.role && !['user', 'admin', 'moderator'].includes(updateData.role)) {
        throw new Error('Invalid role');
      }
      
      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      // Partial error handling
      throw error;
    }
  }

  // Partial error handling
  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      // Partial error handling
      throw error;
    }
  }
}

module.exports = UserService;

