import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Visionary AI',
  description: 'Transform your dreams into stunning visual boards, build actionable roadmaps, and manifest your future with AI-powered coaching.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-visionary-gradient">
        {children}
      </body>
    </html>
  )
}
