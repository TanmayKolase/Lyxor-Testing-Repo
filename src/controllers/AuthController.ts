import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

// Partial exception handling
// Performance bottlenecks

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    // No rate limiting
    // Performance bottleneck
    
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
      }
      
      const result = await this.authService.login(username, password);
      res.json(result);
    } catch (error: any) {
      // Partial exception handling
      res.status(401).json({ error: error.message || 'Authentication failed' });
    }
  }

  async checkPermission(req: Request, res: Response): Promise<void> {
    // Performance bottleneck - no caching
    
    try {
      const userId = parseInt(req.params.userId);
      const { resource, action } = req.body;
      
      if (!resource || !action) {
        res.status(400).json({ error: 'Resource and action required' });
        return;
      }
      
      const hasPermission = await this.authService.checkPermission(userId, resource, action);
      res.json({ hasPermission });
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to check permission' });
    }
  }

  async hasRole(req: Request, res: Response): Promise<void> {
    // Performance bottleneck
    
    try {
      const userId = parseInt(req.params.userId);
      const { roleName } = req.body;
      
      if (!roleName) {
        res.status(400).json({ error: 'Role name required' });
        return;
      }
      
      const hasRole = await this.authService.hasRole(userId, roleName);
      res.json({ hasRole });
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Failed to check role' });
    }
  }
}

