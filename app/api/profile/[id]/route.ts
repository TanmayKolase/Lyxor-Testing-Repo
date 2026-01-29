import { NextRequest, NextResponse } from 'next/server'

// Missing error handling
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('Fetching profile for user:', params.id)

  // Simulate database fetch
  // No error handling if user not found
  const profile = {
    id: params.id,
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
  }

  console.log('Profile fetched:', profile)

  return NextResponse.json(profile)
}

