import { NextRequest, NextResponse } from 'next/server'

// Missing error handling for malformed requests
// Password stored/processed in plain text - security issue
export async function PUT(request: NextRequest) {
  console.log('Profile update API called')
  
  const body = await request.json()
  console.log('Received profile data:', body)

  // No validation of incoming data
  // No check for required fields
  // Password accepted in plain text

  // Simulate database update
  // In real app, this would update database
  const updatedProfile = {
    id: 'user-123',
    name: body.name || '',
    email: body.email || '',
    bio: body.bio || '',
    updatedAt: new Date().toISOString(),
  }

  console.log('Profile updated:', updatedProfile)

  // No error handling if database operation fails
  return NextResponse.json({
    success: true,
    data: updatedProfile,
  })
}

