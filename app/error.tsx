'use client'

// This error boundary exists but doesn't catch server action errors
// Missing error boundaries for server actions

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('[ERROR] Error boundary caught:', error)
  
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

