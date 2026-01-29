// Dead code - this file exists but is never imported or used

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const validateName = (name) => {
  return name && name.trim().length > 0;
};

// Unused validation functions
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

