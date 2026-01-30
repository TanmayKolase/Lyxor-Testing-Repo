'use client'

import { useState } from 'react'
import { submitContactForm } from '../actions/contactActions'
import './ContactForm.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // No input validation
  // Allow empty submissions
  // No success/failure UI
  // Console logs

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    console.log('[DEBUG] Form field changed:', name, value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    console.log('[DEBUG] Form submitted:', formData)
    
    // No validation - empty fields allowed
    // No email format validation
    // No required field validation
    
    setIsSubmitting(true)
    
    try {
      // No success/failure UI
      // No error handling UI
      await submitContactForm(formData)
      
      console.log('[DEBUG] Form submitted successfully')
      
      // No success message
      // Form not reset
      // No feedback to user
      
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      // No error handling UI
      // Error silently fails
      console.error('[ERROR] Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          // No required attribute
          // No validation
          // Missing accessibility attributes
        />
        {/* No validation message */}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          // No required attribute
          // No email format validation
          // Missing accessibility attributes
        />
        {/* No validation message */}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          // No required attribute
          // No phone format validation
          // Missing accessibility attributes
        />
        {/* No validation message */}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          rows={5}
          // No required attribute
          // No validation
          // Missing accessibility attributes
        />
        {/* No validation message */}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
        // Missing accessibility attributes
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {/* No success message */}
      {/* No error message */}
    </form>
  )
}

