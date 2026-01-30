import { Request, Response } from 'express';
import { RoleService } from '../services/RoleService';
import { CreateRoleDto, UpdateRoleDto } from '../models/Role';

// Partial exception handling
// No pagination
// Inconsistent authorization

export class RoleController {
  private roleService = new RoleService();

  async getAllRoles(req: Request, res: Response): Promise<void> {
    // No pagination
    // Inconsistent authorization - no check
    
    try {
      const roles = await this.roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }

  async getRoleById(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const role = await this.roleService.getRoleById(id);
      
      if (!role) {
        res.status(404).json({ error: 'Role not found' });
        return;
      }
      
      res.json(role);
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to fetch role' });
    }
  }

  async createRole(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const roleData: CreateRoleDto = req.body;
      const createdBy = (req as any).user?.userId;
      const role = await this.roleService.createRole(roleData, createdBy);
      res.status(201).json(role);
    } catch (error: any) {
      // Partial exception handling
      res.status(500).json({ error: error.message || 'Failed to create role' });
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const roleData: UpdateRoleDto = req.body;
      const updatedBy = (req as any).user?.userId;
      const role = await this.roleService.updateRole(id, roleData, updatedBy);
      
      if (!role) {
        res.status(404).json({ error: 'Role not found' });
        return;
      }
      
      res.json(role);
    } catch (error: any) {
      // Partial exception handling
      res.status(500).json({ error: error.message || 'Failed to update role' });
    }
  }

  async deleteRole(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const deletedBy = (req as any).user?.userId;
      const success = await this.roleService.deleteRole(id, deletedBy);
      
      if (!success) {
        res.status(404).json({ error: 'Role not found' });
        return;
      }
      
      res.json({ message: 'Role deleted successfully' });
    } catch (error: any) {
      // Partial exception handling
      res.status(500).json({ error: error.message || 'Failed to delete role' });
    }
  }

  async getRolePermissions(req: Request, res: Response): Promise<void> {
    // No pagination
    // Inconsistent authorization
    
    try {
      const roleId = parseInt(req.params.id);
      const permissions = await this.roleService.getRolePermissions(roleId);
      res.json(permissions);
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to fetch role permissions' });
    }
  }
}

