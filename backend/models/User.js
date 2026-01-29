const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Missing validation - no required fields, no min/max length
  name: {
    type: String,
    // Should have: required: true, minlength: 1
  },
  email: {
    type: String,
    // Should have: required: true, unique: true, validate email format
  },
  phone: {
    type: String,
    // Should have: validation for phone format
  },
  role: {
    type: String,
    default: 'user',
    // Should have: enum validation
  },
  // Sensitive field - should be hashed
  password: {
    type: String,
    // Should have: required: true, minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

