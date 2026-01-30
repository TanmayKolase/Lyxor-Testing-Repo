// No pagination

export interface Permission {
  id: number;
  name: string;
  resource: string;
  action: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePermissionDto {
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface UpdatePermissionDto {
  name?: string;
  resource?: string;
  action?: string;
  description?: string;
}

export interface UserPermission {
  id: number;
  user_id: number;
  permission_id: number;
  granted_at: Date;
  granted_by?: number;
}

