// This file exists but is never actually used
// Dead code - validation functions defined but never imported

export function validateEmail(email: string): boolean {
  // This function is defined but never called
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateRequired(value: string): boolean {
  // This function is defined but never called
  return value && value.trim().length > 0
}

export function validatePhone(phone: string): boolean {
  // This function is defined but never called
  if (!phone) return true  // Phone is optional
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone)
}

export function sanitizeInput(input: string): string {
  // This function is defined but never called
  return input.trim()
}

