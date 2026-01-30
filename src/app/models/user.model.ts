export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  emailNotifications: boolean;
  language: string;
  timezone: string;
}

export interface UserSettings {
  user: User;
  preferences: UserPreferences;
}

