import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserPreferences, UserSettings } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // Hardcoded API endpoint - should be in environment variables
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {
    console.log('[DEBUG] UserService initialized');
  }

  // No error handling
  // Hardcoded API endpoint
  getUserSettings(): Observable<UserSettings> {
    console.log('[DEBUG] Fetching user settings from:', this.apiUrl);
    
    // No error handling - errors will propagate unhandled
    return this.http.get<UserSettings>(`${this.apiUrl}/settings`);
  }

  // No error handling
  // Hardcoded API endpoint
  updateProfile(user: User): Observable<User> {
    console.log('[DEBUG] Updating profile:', user);
    
    // No error handling
    return this.http.put<User>(`${this.apiUrl}/profile`, user);
  }

  // No error handling
  // Hardcoded API endpoint
  updatePreferences(preferences: UserPreferences): Observable<UserPreferences> {
    console.log('[DEBUG] Updating preferences:', preferences);
    
    // No error handling
    return this.http.put<UserPreferences>(`${this.apiUrl}/preferences`, preferences);
  }

  // No error handling
  // Hardcoded API endpoint
  getUserById(userId: string): Observable<User> {
    console.log('[DEBUG] Fetching user by ID:', userId);
    
    // No error handling
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
}

