import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params

  // TODO: Fetch page from Supabase based on slug
  // For now, show a placeholder for communication-consent
  if (slug === 'communication-consent') {
    return (
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/" 
            className="text-visionary-teal hover:underline mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">
            <span className="text-visionary-gold">Communication</span> Consent
          </h1>
          
          <div className="card prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">
              At Visionary AI, we believe in transparent communication. This page outlines how we communicate with our users and the consent required.
            </p>

            <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
              Types of Communications
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>📧 <strong>Email Updates:</strong> Product updates, tips, and important announcements</li>
              <li>📱 <strong>SMS Notifications:</strong> Time-sensitive alerts and reminders (optional)</li>
              <li>🔔 <strong>Push Notifications:</strong> Real-time updates on your goals and progress</li>
              <li>🎙️ <strong>Voice Coaching:</strong> Personalized AI coaching sessions</li>
            </ul>

            <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-300">
              You can opt-out of any non-essential communications at any time through your account settings or by contacting our support team.
            </p>

            <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300">
              Questions about our communication practices? Reach out to{' '}
              <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">
                support@visionaryai.life
              </a>
            </p>
          </div>

          <footer className="mt-12 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Visionary AI Systems, Inc.
          </footer>
        </div>
      </main>
    )
  }

  // Page not found
  notFound()
}

export function generateStaticParams() {
  return [
    { slug: 'communication-consent' },
  ]
}
