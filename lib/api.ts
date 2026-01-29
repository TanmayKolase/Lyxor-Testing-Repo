// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:3000/api'

export interface ProfileData {
  name: string
  email: string
  password: string
  bio: string
}

export interface Profile {
  id: string
  name: string
  email: string
  bio: string
}

// Missing error handling - no try/catch blocks
// Password sent in plain text over network
export async function updateProfile(data: ProfileData): Promise<Profile | null> {
  console.log('Updating profile via API:', data)
  
  // Hardcoded API URL
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Password in plain text
  })

  console.log('API response status:', response.status)

  // No check for response.ok
  // No error handling if request fails
  const result = await response.json()
  
  console.log('API response data:', result)
  
  return result.data || null
}

export async function getProfile(userId: string): Promise<Profile | null> {
  console.log('Fetching profile for user:', userId)
  
  // Hardcoded API URL
  const response = await fetch(`${API_BASE_URL}/profile/${userId}`)
  
  // No error handling
  const profile = await response.json()
  
  console.log('Profile fetched:', profile)
  
  return profile
}

