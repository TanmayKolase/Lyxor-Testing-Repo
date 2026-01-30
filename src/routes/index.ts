import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { RoleController } from '../controllers/RoleController';
import { PermissionService } from '../services/PermissionService';
import { AuthController } from '../controllers/AuthController';
import { authenticate, authorize, requireRole } from '../middleware/auth';

// Inconsistent authorization checks
// No pagination

const router = Router();
const userController = new UserController();
const roleController = new RoleController();
const permissionService = new PermissionService();
const authController = new AuthController();

// Auth routes - no auth required (inconsistent)
router.post('/auth/login', authController.login.bind(authController));
router.post('/auth/check-permission/:userId', authController.checkPermission.bind(authController));
router.post('/auth/has-role/:userId', authController.hasRole.bind(authController));

// User routes - inconsistent authorization
router.get('/users', authenticate, userController.getAllUsers.bind(userController));  // No authorization check
router.get('/users/:id', authenticate, userController.getUserById.bind(userController));  // No authorization check
router.post('/users', userController.createUser.bind(userController));  // No auth at all
router.put('/users/:id', authenticate, userController.updateUser.bind(userController));  // Inconsistent - some have auth, some don't
router.delete('/users/:id', authenticate, requireRole('admin'), userController.deleteUser.bind(userController));  // Inconsistent - only delete has role check
router.get('/users/:id/roles', authenticate, userController.getUserRoles.bind(userController));  // No authorization check

// Role routes - inconsistent authorization
router.get('/roles', authenticate, roleController.getAllRoles.bind(roleController));  // No authorization check
router.get('/roles/:id', authenticate, roleController.getRoleById.bind(roleController));  // No authorization check
router.post('/roles', authenticate, roleController.createRole.bind(roleController));  // No authorization check
router.put('/roles/:id', authenticate, roleController.updateRole.bind(roleController));  // No authorization check
router.delete('/roles/:id', authenticate, requireRole('admin'), roleController.deleteRole.bind(roleController));  // Inconsistent
router.get('/roles/:id/permissions', authenticate, roleController.getRolePermissions.bind(roleController));  // No authorization check

// Permission routes - inconsistent authorization
router.get('/permissions', authenticate, async (req, res) => {
  // No pagination
  // Inconsistent authorization - no check
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
});

router.get('/permissions/:id', authenticate, async (req, res) => {
  // Inconsistent authorization - no check
  try {
    const id = parseInt(req.params.id);
    const permission = await permissionService.getPermissionById(id);
    if (!permission) {
      res.status(404).json({ error: 'Permission not found' });
      return;
    }
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permission' });
  }
});

export default router;

