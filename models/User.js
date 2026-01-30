const mongoose = require('mongoose');

// No schema validation
// No required fields validation
// No format validation
// No custom validators

const userSchema = new mongoose.Schema({
  name: {
    type: String
    // Missing required: true
    // Missing minlength, maxlength
  },
  email: {
    type: String
    // Missing required: true
    // Missing unique: true
    // Missing email format validation
  },
  password: {
    type: String
    // Missing required: true
    // Missing minlength validation
  },
  phone: {
    type: String
    // Missing format validation
  },
  address: {
    type: String
    // No validation
  },
  dateOfBirth: {
    type: Date
    // No validation
  },
  ssn: {
    type: String  // Sensitive field - should not be stored
    // No validation
  },
  creditCardNumber: {
    type: String  // Sensitive field - should not be stored
    // No validation
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

// No pre-save hooks for validation
// No indexes defined

module.exports = mongoose.model('User', userSchema);
