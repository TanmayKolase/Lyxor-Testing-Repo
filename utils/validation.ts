// Validation utility functions - but they're never actually used in the codebase

export const validateEmail = (email: string): boolean => {
  // This function exists but is never called
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: string): boolean => {
  // This function exists but is never called
  return value.trim().length > 0
}

export const validatePassword = (password: string): boolean => {
  // This function exists but is never called
  return password.length >= 8
}

export const sanitizeInput = (input: string): string => {
  // This function exists but is never called
  return input.trim()
}

