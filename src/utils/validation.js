// This file exists but is never actually used
// Dead code - validation functions defined but never imported

export function validateEmail(email) {
  // This function is defined but never called
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value) {
  // This function is defined but never called
  return value && value.trim().length > 0;
}

export function sanitizeHtml(html) {
  // This function is defined but never called
  // Should sanitize HTML to prevent XSS
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
