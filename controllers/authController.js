const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

// Hardcoded JWT secret - should be in environment variables
const JWT_SECRET = 'my-secret-key-12345';

// Missing input validation middleware
// Missing try/catch blocks in async functions
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Registration attempt:', { username, email });

  // Missing validation - no check for empty fields
  // Missing validation - no email format check
  // Missing validation - no password strength requirements

  // Check if user already exists
  const existingUser = await authService.findUserByEmail(email);
  
  if (existingUser) {
    // Improper HTTP status code - should be 409 Conflict
    return res.status(400).json({ 
      message: 'User already exists',
      // Sensitive data returned - exposing user ID
      userId: existingUser.id 
    });
  }

  // Create new user
  // Password stored in plain text - security vulnerability
  const user = await authService.createUser(username, email, password);

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Sensitive data returned in response - password and internal IDs
  // Improper HTTP status code - should be 201 Created
  res.status(200).json({
    message: 'User registered successfully',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password, // Password exposed in response
      createdAt: user.created_at
    },
    token: token
  });
};

// Missing try/catch block
// Missing input validation
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt for:', email);

  // Missing validation - no check for empty email/password

  // Find user by email
  // SQL injection vulnerability in findUserByEmail
  const user = await authService.findUserByEmail(email);

  if (!user) {
    // Improper HTTP status code - should be 401 Unauthorized
    return res.status(404).json({ 
      message: 'User not found',
      // Information disclosure - reveals user doesn't exist
      email: email 
    });
  }

  // Compare passwords
  // Password stored in plain text, so direct comparison
  // Should use bcrypt.compare() but passwords aren't hashed
  if (user.password !== password) {
    // Improper HTTP status code - should be 401 Unauthorized
    return res.status(400).json({ 
      message: 'Invalid credentials',
      // Sensitive information - user ID exposed even on failed login
      userId: user.id 
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Sensitive data returned - password and internal database IDs
  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password, // Password exposed in response
      createdAt: user.created_at
    },
    token: token
  });
};

