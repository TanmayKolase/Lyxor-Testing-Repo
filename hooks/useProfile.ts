'use client'

import { useState, useEffect } from 'react'
import { getProfile } from '@/lib/api'

export interface Profile {
  id: string
  name: string
  email: string
  bio: string
}

// Missing dependency array in useEffect - will cause issues
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching user profile')
      setIsLoading(true)
      
      // Hardcoded userId - should come from auth context
      const userId = 'user-123'
      const data = await getProfile(userId)
      
      setProfile(data)
      setIsLoading(false)
      console.log('Profile loaded:', data)
    }

    fetchProfile()
  }) // Missing dependency array - should be []

  return { profile, isLoading, setProfile }
}

