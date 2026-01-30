import mongoose from 'mongoose'

// No schema validation
// No required fields
// No format validation

const contactSchema = new mongoose.Schema({
  name: {
    type: String
    // Missing required: true
    // Missing minlength, maxlength
  },
  email: {
    type: String
    // Missing required: true
    // Missing email format validation
  },
  phone: {
    type: String
    // Missing format validation
  },
  message: {
    type: String
    // Missing required: true
    // Missing minlength, maxlength
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
})

// No pre-save hooks
// No indexes

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default Contact

