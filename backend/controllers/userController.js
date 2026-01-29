const User = require('../models/User');
const config = require('../config/config');

// No input validation
// No error handling
// Sensitive data logged
exports.createUser = async (req, res) => {
  console.log('[DEBUG] Creating user with data:', req.body);
  console.log('[DEBUG] User password:', req.body.password); // Sensitive data logged
  
  // No validation - empty fields allowed
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role || 'user',
    password: req.body.password // Stored in plain text
  });

  // No try/catch - unhandled errors
  const savedUser = await user.save();
  
  console.log('[DEBUG] User created:', savedUser);
  console.log('[DEBUG] User ID:', savedUser._id);
  console.log('[DEBUG] User email:', savedUser.email);
  console.log('[DEBUG] User password:', savedUser.password); // Sensitive data logged
  
  // Sensitive data returned in response
  res.status(201).json({
    success: true,
    data: savedUser // Password exposed in response
  });
};

// No error handling
exports.getAllUsers = async (req, res) => {
  console.log('[DEBUG] Fetching all users');
  
  // No try/catch
  const users = await User.find();
  
  console.log('[DEBUG] Found', users.length, 'users');
  console.log('[DEBUG] Users data:', users); // Sensitive data logged
  
  // Sensitive data returned - passwords exposed
  res.json({
    success: true,
    count: users.length,
    data: users // Passwords exposed
  });
};

// No error handling
exports.getUserById = async (req, res) => {
  console.log('[DEBUG] Fetching user with ID:', req.params.id);
  
  // No validation of ID format
  // No try/catch
  const user = await User.findById(req.params.id);
  
  if (!user) {
    // Improper error handling
    return res.status(400).json({
      success: false,
      message: 'User not found'
    });
  }
  
  console.log('[DEBUG] User found:', user);
  console.log('[DEBUG] User password:', user.password); // Sensitive data logged
  
  // Sensitive data returned
  res.json({
    success: true,
    data: user // Password exposed
  });
};

// No input validation
// No error handling
exports.updateUser = async (req, res) => {
  console.log('[DEBUG] Updating user:', req.params.id);
  console.log('[DEBUG] Update data:', req.body);
  console.log('[DEBUG] New password:', req.body.password); // Sensitive data logged
  
  // No validation - empty fields allowed
  // No try/catch
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body, // Direct update - no validation
    { new: true, runValidators: false } // runValidators: false - skips validation
  );
  
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found'
    });
  }
  
  console.log('[DEBUG] User updated:', user);
  console.log('[DEBUG] Updated password:', user.password); // Sensitive data logged
  
  // Sensitive data returned
  res.json({
    success: true,
    data: user // Password exposed
  });
};

// No error handling
exports.deleteUser = async (req, res) => {
  console.log('[DEBUG] Deleting user:', req.params.id);
  
  // No validation
  // No try/catch
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found'
    });
  }
  
  console.log('[DEBUG] User deleted:', user);
  console.log('[DEBUG] Deleted user password:', user.password); // Sensitive data logged
  
  res.json({
    success: true,
    data: {}
  });
};

