import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact form application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
