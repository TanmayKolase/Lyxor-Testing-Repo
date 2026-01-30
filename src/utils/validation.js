// This file exists but is never actually used
// Dead code - validation functions defined but never imported

export const validateRequired = (value) => {
  // This function is defined but never called
  return value && value.trim().length > 0
}

export const validatePrice = (price) => {
  // This function is defined but never called
  return price && price > 0 && typeof price === 'number'
}

export const validateEmail = (email) => {
  // This function is defined but never called
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeHtml = (html) => {
  // This function is defined but never called
  // Should sanitize HTML to prevent XSS
  return html
}

