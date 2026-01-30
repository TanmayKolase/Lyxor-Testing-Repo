// Dead code
// No validation used

// Dead code - validation functions defined but never used
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 50;
};

// Dead code - unused function
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

