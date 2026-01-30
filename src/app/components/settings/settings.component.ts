import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserSettings } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: UserSettings | null = null;
  loading = false;

  constructor(private userService: UserService) {
    console.log('[DEBUG] SettingsComponent initialized');
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  // Missing unsubscribe - memory leak
  // No error handling
  loadSettings(): void {
    console.log('[DEBUG] Loading user settings');
    this.loading = true;
    
    // Missing unsubscribe - subscription not stored
    // No error handling
    this.userService.getUserSettings().subscribe({
      next: (data) => {
        console.log('[DEBUG] Settings loaded:', data);
        this.settings = data;
        this.loading = false;
      },
      error: (error) => {
        // No error handling - only logs
        console.error('[ERROR] Failed to load settings:', error);
        this.loading = false;
      }
    });
  }
}

