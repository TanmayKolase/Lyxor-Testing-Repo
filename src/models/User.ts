// No pagination
// SQL injection risk

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

export interface UserRole {
  id: number;
  user_id: number;
  role_id: number;
  assigned_at: Date;
  assigned_by?: number;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

// Dead code - unused interface
export interface UserPreferences {
  theme: string;
  language: string;
}

