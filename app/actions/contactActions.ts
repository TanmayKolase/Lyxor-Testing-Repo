'use server'

import { connectDB } from '../lib/db'
import Contact from '../models/Contact'

// No CSRF protection
// Blocking DB call
// No input validation
// Console logs
// No error boundaries

export async function submitContactForm(formData: {
  name: string
  email: string
  phone: string
  message: string
}) {
  console.log('[DEBUG] Server action called with data:', formData)
  console.log('[DEBUG] Name:', formData.name, 'Email:', formData.email, 'Phone:', formData.phone)
  
  // No input validation
  // Allow empty submissions
  // No email format validation
  // No required field validation
  
  // No CSRF protection
  // Server actions have built-in CSRF but no explicit validation
  
  // Blocking DB call - should be async/non-blocking
  // No error boundaries
  
  try {
    // Blocking database connection
    await connectDB()
    
    console.log('[DEBUG] Database connected, creating contact')
    
    // Blocking database operation
    const contact = new Contact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      submittedAt: new Date()
    })
    
    // Blocking save operation
    await contact.save()
    
    console.log('[DEBUG] Contact saved successfully:', contact._id)
    
    // No error handling
    // No validation
    return { success: true, id: contact._id }
  } catch (error) {
    // No error boundaries
    // Error just logged, not properly handled
    console.error('[ERROR] Failed to save contact:', error)
    throw error  // Error thrown but no proper error response
  }
}

