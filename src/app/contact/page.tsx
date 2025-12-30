import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Contact Us | Visionary AI',
  description: 'Get in touch with the Visionary AI team for support, questions, or feedback.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/" 
            className="text-visionary-teal hover:underline mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">
            <span className="text-visionary-gold">Contact</span> Us
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-8">
              We're here to help you on your journey to achieving your goals. Reach out to us with any questions, feedback, or support needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-visionary-darker rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">📧</div>
                <h2 className="text-xl font-semibold text-white mb-2">Email Support</h2>
                <p className="text-gray-400 mb-4">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:support@visionaryai.life" 
                  className="text-visionary-gold hover:text-visionary-gold-light font-medium"
                >
                  support@visionaryai.life
                </a>
              </div>

              <div className="bg-visionary-darker rounded-xl p-6 border border-gray-700">
                <div className="text-3xl mb-4">💬</div>
                <h2 className="text-xl font-semibold text-white mb-2">SMS Support</h2>
                <p className="text-gray-400 mb-4">
                  Reply to any message from Visionary AI
                </p>
                <p className="text-visionary-gold font-medium">
                  Reply HELP for assistance<br />
                  Reply STOP to opt out
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="bg-visionary-darker rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">How do I update my communication preferences?</h3>
                  <p className="text-gray-400">
                    Log in to your account and navigate to Settings → Communication Preferences. You can enable or disable SMS and voice notifications at any time.
                  </p>
                </div>

                <div className="bg-visionary-darker rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">How do I stop receiving text messages?</h3>
                  <p className="text-gray-400">
                    Simply reply STOP to any message from Visionary AI. You can also update your preferences in your account settings or email us.
                  </p>
                </div>

                <div className="bg-visionary-darker rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">How do I delete my account?</h3>
                  <p className="text-gray-400">
                    Email us at support@visionaryai.life with your request, and we'll process it within 30 days.
                  </p>
                </div>

                <div className="bg-visionary-darker rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">What is AMIE?</h3>
                  <p className="text-gray-400">
                    AMIE is our Adaptive Motivational Identity Engine – your personalized AI coach that provides tailored guidance, reminders, and insights based on your goals and preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Response Times
              </h2>
              <p className="text-gray-300">
                We strive to respond to all inquiries within 24-48 business hours. For urgent matters, please include "URGENT" in your email subject line.
              </p>
            </section>

            <section className="bg-visionary-darker rounded-xl p-6 border border-gray-700 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Company Information
              </h2>
              <p className="text-gray-300">
                <strong>Visionary AI Systems, Inc.</strong><br />
                A Delaware C-Corporation<br /><br />
                Email: <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">support@visionaryai.life</a><br />
                Website: <a href="https://visionaryai.life" className="text-visionary-teal hover:underline">visionaryai.life</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
