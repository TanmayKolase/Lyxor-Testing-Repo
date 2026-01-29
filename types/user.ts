// Unused type definitions
export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
}

export interface UserSettings {
  language: string
  timezone: string
}

// This interface is defined but the password field type is not properly secured
export interface UserProfileUpdate {
  name?: string
  email?: string
  password?: string // Should be hashed, not plain text
  bio?: string
}

