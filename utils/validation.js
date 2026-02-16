// Validation utility functions - but they're never actually used in the codebase

exports.validateEmail = (email) => {
  // This function exists but is never called
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validatePassword = (password) => {
  // This function exists but is never called
  return password && password.length >= 8;
};

exports.validateRequired = (value) => {
  // This function exists but is never called
  return value && value.trim().length > 0;
};

exports.sanitizeInput = (input) => {
  // This function exists but is never called
  return input.trim().replace(/[<>]/g, '');
};

