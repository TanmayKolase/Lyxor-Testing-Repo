import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  @Input() user!: User;
  profileForm!: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    console.log('[DEBUG] ProfileFormComponent initialized');
  }

  ngOnInit(): void {
    // No form control validation - no validators
    // Allow empty required fields
    this.profileForm = this.fb.group({
      name: [this.user?.name || ''],
      email: [this.user?.email || ''],
      phone: [this.user?.phone || ''],
      bio: [this.user?.bio || '']
    });
    
    console.log('[DEBUG] Profile form initialized with user:', this.user);
  }

  // No disabled state during submit
  // No error handling
  // Missing unsubscribe - memory leak
  onSubmit(): void {
    console.log('[DEBUG] Submitting profile form');
    
    // No validation check
    // No disabled state - button can be clicked multiple times
    
    this.submitting = true;
    
    const formValue = this.profileForm.value;
    console.log('[DEBUG] Form values:', formValue);
    
    // Missing unsubscribe
    // No error handling
    this.userService.updateProfile(formValue).subscribe({
      next: (updatedUser) => {
        console.log('[DEBUG] Profile updated successfully:', updatedUser);
        this.submitting = false;
        // No success message shown to user
      },
      error: (error) => {
        // No error handling - only logs
        console.error('[ERROR] Failed to update profile:', error);
        this.submitting = false;
        // No error message shown to user
      }
    });
  }
}

