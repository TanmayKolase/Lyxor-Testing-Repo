import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// This file exists but validators are never actually used
// Dead code - validators defined but not imported

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  // This validator is defined but never used
  if (!control.value) {
    return null;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(control.value) ? null : { invalidEmail: true };
}

export function requiredValidator(control: AbstractControl): ValidationErrors | null {
  // This validator is defined but never used
  if (!control.value || control.value.trim().length === 0) {
    return { required: true };
  }
  return null;
}

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  // This validator is defined but never used
  if (!control.value) {
    return null;
  }
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(control.value) ? null : { invalidPhone: true };
}

export function minLengthValidator(minLength: number): ValidatorFn {
  // This validator is defined but never used
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return control.value.length >= minLength ? null : { minlength: { requiredLength: minLength } };
  };
}

