import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserPreferences } from '../../models/user.model';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent implements OnInit {
  @Input() preferences!: UserPreferences;
  preferencesForm!: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    console.log('[DEBUG] PreferencesFormComponent initialized');
  }

  ngOnInit(): void {
    // No form control validation
    // Allow empty required fields
    this.preferencesForm = this.fb.group({
      theme: [this.preferences?.theme || 'light'],
      notifications: [this.preferences?.notifications || false],
      emailNotifications: [this.preferences?.emailNotifications || false],
      language: [this.preferences?.language || 'en'],
      timezone: [this.preferences?.timezone || 'UTC']
    });
    
    console.log('[DEBUG] Preferences form initialized:', this.preferences);
  }

  // No disabled state during submit
  // No error handling
  // Missing unsubscribe - memory leak
  onSubmit(): void {
    console.log('[DEBUG] Submitting preferences form');
    
    // No validation
    // No disabled state
    
    this.submitting = true;
    
    const formValue = this.preferencesForm.value;
    console.log('[DEBUG] Preferences values:', formValue);
    
    // Missing unsubscribe
    // No error handling
    this.userService.updatePreferences(formValue).subscribe({
      next: (updatedPreferences) => {
        console.log('[DEBUG] Preferences updated successfully:', updatedPreferences);
        this.submitting = false;
        // No success message
      },
      error: (error) => {
        // No error handling - only logs
        console.error('[ERROR] Failed to update preferences:', error);
        this.submitting = false;
        // No error message shown to user
      }
    });
  }
}

