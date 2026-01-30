import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/app';
import { AuthService } from '../services/AuthService';

// Inconsistent authorization checks
// Performance bottlenecks
// Partial exception handling

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Performance bottleneck - no caching
  // Partial exception handling
  
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    // Performance bottleneck - synchronous verification
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    // Partial exception handling
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Inconsistent authorization - different implementation
export const authorize = (resource: string, action: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Performance bottleneck - creates new service instance
    const authService = new AuthService();
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    try {
      // Performance bottleneck - no caching
      const hasPermission = await authService.checkPermission(userId, resource, action);
      
      if (!hasPermission) {
        res.status(403).json({ error: 'Insufficient permissions' });
        return;
      }
      
      next();
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Authorization check failed' });
    }
  };
};

// Inconsistent authorization - different check method
export const requireRole = (roleName: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Performance bottleneck
    const authService = new AuthService();
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    try {
      // Performance bottleneck - no caching
      const hasRole = await authService.hasRole(userId, roleName);
      
      if (!hasRole) {
        res.status(403).json({ error: 'Insufficient role' });
        return;
      }
      
      next();
    } catch (error) {
      // Partial exception handling
      res.status(500).json({ error: 'Role check failed' });
    }
  };
};

// Dead code - unused middleware
export const auditLog = (req: Request, res: Response, next: NextFunction): void => {
  // Missing audit logs - function exists but doesn't log
  next();
};

