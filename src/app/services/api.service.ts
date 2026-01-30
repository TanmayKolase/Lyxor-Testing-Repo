import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // Hardcoded API endpoint - should be in environment
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    console.log('[DEBUG] ApiService initialized with base URL:', this.baseUrl);
  }

  // No error handling
  // Hardcoded endpoint
  get<T>(endpoint: string): Observable<T> {
    console.log('[DEBUG] GET request to:', `${this.baseUrl}${endpoint}`);
    
    // No error handling
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  // No error handling
  // Hardcoded endpoint
  post<T>(endpoint: string, data: any): Observable<T> {
    console.log('[DEBUG] POST request to:', `${this.baseUrl}${endpoint}`, data);
    
    // No error handling
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // No error handling
  // Hardcoded endpoint
  put<T>(endpoint: string, data: any): Observable<T> {
    console.log('[DEBUG] PUT request to:', `${this.baseUrl}${endpoint}`, data);
    
    // No error handling
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // No error handling
  // Hardcoded endpoint
  delete<T>(endpoint: string): Observable<T> {
    console.log('[DEBUG] DELETE request to:', `${this.baseUrl}${endpoint}`);
    
    // No error handling
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}

