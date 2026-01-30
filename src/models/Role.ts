// Hardcoded admin roles
// No pagination

export interface Role {
  id: number;
  name: string;
  description?: string;
  is_system: boolean;  // Hardcoded system roles
  created_at: Date;
  updated_at: Date;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
  is_system?: boolean;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export interface RolePermission {
  id: number;
  role_id: number;
  permission_id: number;
  granted_at: Date;
  granted_by?: number;
}

// Hardcoded admin role names
export const SYSTEM_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  MODERATOR: 'moderator',
  USER: 'user',
};

// Dead code - unused constant
export const ROLE_PRIORITIES = {
  SUPER_ADMIN: 100,
  ADMIN: 50,
  MODERATOR: 25,
  USER: 1,
};

