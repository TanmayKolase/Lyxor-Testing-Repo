import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDto, UpdateUserDto } from '../models/User';

// Partial exception handling
// No pagination
// Inconsistent authorization

export class UserController {
  private userService = new UserService();

  async getAllUsers(req: Request, res: Response): Promise<void> {
    // No pagination
    // Inconsistent authorization - no check
    
    try {
      const requesterId = (req as any).user?.userId;
      const users = await this.userService.getAllUsers(requesterId);
      res.json(users);
    } catch (error) {
      // Partial exception handling - doesn't log or handle properly
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const requesterId = (req as any).user?.userId;
      const user = await this.userService.getUserById(id, requesterId);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    // No authorization check
    // No validation
    
    try {
      const userData: CreateUserDto = req.body;
      const createdBy = (req as any).user?.userId;
      const user = await this.userService.createUser(userData, createdBy);
      res.status(201).json(user);
    } catch (error: any) {
      // Partial exception handling - doesn't handle specific errors
      res.status(500).json({ error: error.message || 'Failed to create user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const userData: UpdateUserDto = req.body;
      const updatedBy = (req as any).user?.userId;
      const user = await this.userService.updateUser(id, userData, updatedBy);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(user);
    } catch (error: any) {
      // Partial exception handling
      res.status(500).json({ error: error.message || 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    // Inconsistent authorization - no check
    
    try {
      const id = parseInt(req.params.id);
      const deletedBy = (req as any).user?.userId;
      const success = await this.userService.deleteUser(id, deletedBy);
      
      if (!success) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      // Partial exception handling
      res.status(500).json({ error: error.message || 'Failed to delete user' });
    }
  }

  async getUserRoles(req: Request, res: Response): Promise<void> {
    // No pagination
    // Inconsistent authorization
    
    try {
      const userId = parseInt(req.params.id);
      const roles = await this.userService.getUserRoles(userId);
      res.json(roles);
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to fetch user roles' });
    }
  }
}

