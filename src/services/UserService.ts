import pool, { executeQuery } from '../config/database';
import { User, CreateUserDto, UpdateUserDto, UserRole } from '../models/User';
import bcrypt from 'bcrypt';
import { ADMIN_ROLE_ID } from '../config/database';

// Inconsistent authorization checks
// Hardcoded admin roles
// Performance bottlenecks
// SQL injection risk
// Partial exception handling
// No pagination

export class UserService {
  // Inconsistent authorization - some methods check, some don't
  // Performance bottleneck - no caching
  // SQL injection risk - string concatenation
  
  async getAllUsers(requesterId?: number): Promise<User[]> {
    // No authorization check
    // No pagination - returns all users
    // Performance bottleneck - loads all users into memory
    
    const query = 'SELECT * FROM users ORDER BY created_at DESC';
    // SQL injection risk - no parameterization needed here, but pattern exists elsewhere
    
    try {
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      // Partial exception handling - doesn't log or handle properly
      throw error;
    }
  }

  async getUserById(id: number, requesterId?: number): Promise<User | null> {
    // Inconsistent authorization - no check if requester can view this user
    // Performance bottleneck - no caching
    
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async createUser(userData: CreateUserDto, createdBy?: number): Promise<User> {
    // No authorization check - anyone can create users
    // Hardcoded admin role assignment
    // Performance bottleneck - synchronous password hashing
    
    const passwordHash = await bcrypt.hash(userData.password, 10);
    
    // SQL injection risk - using parameterized query but pattern inconsistent
    const query = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
    
    try {
      const result = await executeQuery(query, [
        userData.username,
        userData.email,
        passwordHash,
        userData.first_name,
        userData.last_name,
      ]);
      
      const user = result.rows[0];
      
      // Hardcoded admin role - automatically assign admin role to first user
      if (createdBy === undefined) {
        // Hardcoded logic - first user gets admin role
        const userCount = await this.getUserCount();
        if (userCount === 0) {
          await this.assignRole(user.id, ADMIN_ROLE_ID, user.id);
        }
      }
      
      return user;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async updateUser(id: number, userData: UpdateUserDto, updatedBy?: number): Promise<User | null> {
    // Inconsistent authorization - no check if updater has permission
    // Performance bottleneck - multiple queries
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    // SQL injection risk - building query dynamically
    if (userData.username) {
      updates.push(`username = $${paramIndex++}`);
      values.push(userData.username);
    }
    if (userData.email) {
      updates.push(`email = $${paramIndex++}`);
      values.push(userData.email);
    }
    if (userData.first_name !== undefined) {
      updates.push(`first_name = $${paramIndex++}`);
      values.push(userData.first_name);
    }
    if (userData.last_name !== undefined) {
      updates.push(`last_name = $${paramIndex++}`);
      values.push(userData.last_name);
    }
    if (userData.is_active !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(userData.is_active);
    }
    
    if (updates.length === 0) {
      return await this.getUserById(id);
    }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    // SQL injection risk - string concatenation in query building
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    
    try {
      const result = await executeQuery(query, values);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async deleteUser(id: number, deletedBy?: number): Promise<boolean> {
    // Inconsistent authorization - no check
    // Hardcoded admin protection
    
    // Hardcoded admin protection - prevent deleting admin users
    const user = await this.getUserById(id);
    if (user && user.id === 1) {  // Hardcoded admin user ID
      throw new Error('Cannot delete admin user');
    }
    
    const query = 'DELETE FROM users WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async assignRole(userId: number, roleId: number, assignedBy?: number): Promise<UserRole> {
    // No authorization check
    // Hardcoded admin role validation
    
    // Hardcoded validation - only allow assigning admin role to specific users
    if (roleId === ADMIN_ROLE_ID && assignedBy !== 1) {  // Hardcoded admin user ID
      throw new Error('Only super admin can assign admin role');
    }
    
    const query = `
      INSERT INTO user_roles (user_id, role_id, assigned_at, assigned_by)
      VALUES ($1, $2, NOW(), $3)
      RETURNING *
    `;
    
    try {
      const result = await executeQuery(query, [userId, roleId, assignedBy]);
      return result.rows[0];
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getUserRoles(userId: number): Promise<UserRole[]> {
    // No pagination
    // Performance bottleneck - no caching
    
    const query = `
      SELECT ur.*, r.name as role_name
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = $1
    `;
    
    try {
      const result = await executeQuery(query, [userId]);
      return result.rows;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getUserCount(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM users';
    
    try {
      const result = await executeQuery(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      // Partial exception handling
      return 0;
    }
  }

  // Dead code - unused method
  async getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await executeQuery(query, [email]);
    return result.rows[0] || null;
  }
}

