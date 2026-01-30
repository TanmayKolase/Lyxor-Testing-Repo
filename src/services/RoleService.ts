import { executeQuery } from '../config/database';
import { Role, CreateRoleDto, UpdateRoleDto, RolePermission } from '../models/Role';
import { ADMIN_ROLE_ID } from '../config/database';

// Inconsistent authorization checks
// Hardcoded admin roles
// Performance bottlenecks
// SQL injection risk
// Partial exception handling
// No pagination

export class RoleService {
  // Inconsistent authorization
  // Performance bottleneck - no caching
  
  async getAllRoles(): Promise<Role[]> {
    // No authorization check
    // No pagination
    
    const query = 'SELECT * FROM roles ORDER BY name';
    
    try {
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getRoleById(id: number): Promise<Role | null> {
    // No authorization check
    // Performance bottleneck - no caching
    
    const query = 'SELECT * FROM roles WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async createRole(roleData: CreateRoleDto, createdBy?: number): Promise<Role> {
    // Inconsistent authorization - no check
    // Hardcoded system role protection
    
    // Hardcoded validation - prevent creating system roles
    if (roleData.is_system) {
      throw new Error('Cannot create system roles');
    }
    
    const query = `
      INSERT INTO roles (name, description, is_system, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *
    `;
    
    try {
      const result = await executeQuery(query, [
        roleData.name,
        roleData.description,
        roleData.is_system || false,
      ]);
      return result.rows[0];
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async updateRole(id: number, roleData: UpdateRoleDto, updatedBy?: number): Promise<Role | null> {
    // Inconsistent authorization - no check
    // Hardcoded system role protection
    
    // Hardcoded validation - prevent updating system roles
    const role = await this.getRoleById(id);
    if (role && role.is_system) {
      throw new Error('Cannot update system roles');
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    // SQL injection risk - dynamic query building
    if (roleData.name) {
      updates.push(`name = $${paramIndex++}`);
      values.push(roleData.name);
    }
    if (roleData.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(roleData.description);
    }
    
    if (updates.length === 0) {
      return await this.getRoleById(id);
    }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    // SQL injection risk
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    
    try {
      const result = await executeQuery(query, values);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async deleteRole(id: number, deletedBy?: number): Promise<boolean> {
    // Inconsistent authorization - no check
    // Hardcoded system role protection
    
    // Hardcoded validation
    if (id === ADMIN_ROLE_ID || id === 999) {  // Hardcoded role IDs
      throw new Error('Cannot delete system roles');
    }
    
    const query = 'DELETE FROM roles WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async assignPermission(roleId: number, permissionId: number, grantedBy?: number): Promise<RolePermission> {
    // No authorization check
    
    const query = `
      INSERT INTO role_permissions (role_id, permission_id, granted_at, granted_by)
      VALUES ($1, $2, NOW(), $3)
      RETURNING *
    `;
    
    try {
      const result = await executeQuery(query, [roleId, permissionId, grantedBy]);
      return result.rows[0];
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getRolePermissions(roleId: number): Promise<RolePermission[]> {
    // No pagination
    // Performance bottleneck - no caching
    
    const query = `
      SELECT rp.*, p.name as permission_name, p.resource, p.action
      FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = $1
    `;
    
    try {
      const result = await executeQuery(query, [roleId]);
      return result.rows;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  // Dead code - unused method
  async getRolesByUser(userId: number): Promise<Role[]> {
    const query = `
      SELECT r.*
      FROM roles r
      JOIN user_roles ur ON r.id = ur.role_id
      WHERE ur.user_id = $1
    `;
    const result = await executeQuery(query, [userId]);
    return result.rows;
  }
}

