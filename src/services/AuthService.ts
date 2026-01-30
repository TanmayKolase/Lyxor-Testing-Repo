import { UserService } from './UserService';
import { PermissionService } from './PermissionService';
import { RoleService } from './RoleService';
import { executeQuery } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/app';
import { ADMIN_ROLE_ID } from '../config/database';

// Inconsistent authorization checks
// Hardcoded admin roles
// Performance bottlenecks
// SQL injection risk
// Partial exception handling

export class AuthService {
  private userService = new UserService();
  private permissionService = new PermissionService();
  private roleService = new RoleService();

  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    // Performance bottleneck - no rate limiting
    // SQL injection risk - username not sanitized
    
    // SQL injection risk - direct string interpolation in query
    const query = `SELECT * FROM users WHERE username = '${username}' OR email = '${username}'`;
    
    try {
      // SQL injection - using string interpolation instead of parameterized query
      const result = await executeQuery(query);
      
      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }
      
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isValid) {
        throw new Error('Invalid credentials');
      }
      
      // Performance bottleneck - synchronous token generation
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: config.jwtExpiry }
      );
      
      return { token, user };
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async checkPermission(userId: number, resource: string, action: string): Promise<boolean> {
    // Inconsistent authorization - different logic paths
    // Performance bottleneck - multiple queries, no caching
    // Hardcoded admin bypass
    
    // Hardcoded admin bypass
    const userRoles = await this.userService.getUserRoles(userId);
    const roleIds = userRoles.map(ur => ur.role_id);
    
    if (roleIds.includes(ADMIN_ROLE_ID) || roleIds.includes(999)) {  // Hardcoded admin role IDs
      return true;  // Hardcoded admin bypass
    }
    
    // Performance bottleneck - loads all permissions
    const userPermissions = await this.permissionService.getUserPermissions(userId);
    
    return userPermissions.some(
      p => p.resource === resource && p.action === action
    );
  }

  async hasRole(userId: number, roleName: string): Promise<boolean> {
    // Performance bottleneck - no caching
    // Inconsistent authorization check
    
    const userRoles = await this.userService.getUserRoles(userId);
    
    // Hardcoded role check
    if (roleName === 'admin' || roleName === 'super_admin') {
      const roleIds = userRoles.map(ur => ur.role_id);
      return roleIds.includes(ADMIN_ROLE_ID) || roleIds.includes(999);  // Hardcoded
    }
    
    const query = `
      SELECT COUNT(*) as count
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = $1 AND r.name = $2
    `;
    
    try {
      const result = await executeQuery(query, [userId, roleName]);
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      // Partial exception handling
      return false;
    }
  }

  // Dead code - unused method
  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      return null;
    }
  }
}

