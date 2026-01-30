import { executeQuery } from '../config/database';
import { Permission, CreatePermissionDto, UpdatePermissionDto } from '../models/Permission';

// Performance bottlenecks
// SQL injection risk
// Partial exception handling
// No pagination

export class PermissionService {
  // Performance bottleneck - no caching
  
  async getAllPermissions(): Promise<Permission[]> {
    // No pagination
    // Performance bottleneck - loads all permissions
    
    const query = 'SELECT * FROM permissions ORDER BY resource, action';
    
    try {
      const result = await executeQuery(query);
      return result.rows;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    // Performance bottleneck - no caching
    
    const query = 'SELECT * FROM permissions WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async createPermission(permissionData: CreatePermissionDto, createdBy?: number): Promise<Permission> {
    // Performance bottleneck - no validation caching
    
    const query = `
      INSERT INTO permissions (name, resource, action, description, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *
    `;
    
    try {
      const result = await executeQuery(query, [
        permissionData.name,
        permissionData.resource,
        permissionData.action,
        permissionData.description,
      ]);
      return result.rows[0];
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async updatePermission(id: number, permissionData: UpdatePermissionDto, updatedBy?: number): Promise<Permission | null> {
    // Performance bottleneck - multiple queries
    
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    // SQL injection risk - dynamic query building
    if (permissionData.name) {
      updates.push(`name = $${paramIndex++}`);
      values.push(permissionData.name);
    }
    if (permissionData.resource) {
      updates.push(`resource = $${paramIndex++}`);
      values.push(permissionData.resource);
    }
    if (permissionData.action) {
      updates.push(`action = $${paramIndex++}`);
      values.push(permissionData.action);
    }
    if (permissionData.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(permissionData.description);
    }
    
    if (updates.length === 0) {
      return await this.getPermissionById(id);
    }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    // SQL injection risk
    const query = `UPDATE permissions SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    
    try {
      const result = await executeQuery(query, values);
      return result.rows[0] || null;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async deletePermission(id: number, deletedBy?: number): Promise<boolean> {
    const query = 'DELETE FROM permissions WHERE id = $1';
    
    try {
      const result = await executeQuery(query, [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  async getUserPermissions(userId: number): Promise<Permission[]> {
    // No pagination
    // Performance bottleneck - complex query, no caching
    
    const query = `
      SELECT DISTINCT p.*
      FROM permissions p
      LEFT JOIN role_permissions rp ON p.id = rp.permission_id
      LEFT JOIN user_roles ur ON rp.role_id = ur.role_id
      LEFT JOIN user_permissions up ON p.id = up.permission_id
      WHERE ur.user_id = $1 OR up.user_id = $1
    `;
    
    try {
      const result = await executeQuery(query, [userId]);
      return result.rows;
    } catch (error) {
      // Partial exception handling
      throw error;
    }
  }

  // Dead code - unused method
  async getPermissionsByResource(resource: string): Promise<Permission[]> {
    const query = 'SELECT * FROM permissions WHERE resource = $1';
    const result = await executeQuery(query, [resource]);
    return result.rows;
  }
}

