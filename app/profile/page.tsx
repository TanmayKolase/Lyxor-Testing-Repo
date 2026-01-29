'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { updateProfile } from '@/lib/api'
import styles from './page.module.css'

export default function ProfilePage() {
  const { profile, isLoading: isLoadingProfile } = useProfile()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  })

  // Missing dependency array - should include profile
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        password: '',
        bio: profile.bio || '',
      })
    }
  }) // Missing dependency array - should be [profile]

  // Missing validation - no check for empty fields
  // Missing error handling - no try/catch block
  // No loading state on submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submitting profile update:', formData)
    
    // Password sent in plain text - no encryption/hashing
    // No error handling if API call fails
    const result = await updateProfile(formData)
    
    console.log('Profile update result:', result)
    
    if (result) {
      console.log('Profile updated successfully')
      // No success message shown to user
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (isLoadingProfile) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Update Profile</h1>
        <p className={styles.subtitle}>Manage your account information</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your full name"
              // Missing accessibility label (aria-label)
            />
            {/* No validation message for empty field */}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              // Missing accessibility label
            />
            {/* No email format validation - invalid emails allowed */}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter new password (optional)"
              // Missing accessibility label
            />
            {/* Password sent in plain text - security issue */}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Tell us about yourself"
              rows={4}
              // Missing accessibility label
            />
            {/* No validation for empty field */}
          </div>

          <button type="submit" className={styles.submitButton}>
            {/* No loading state or disabled state during submission */}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

