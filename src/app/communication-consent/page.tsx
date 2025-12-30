import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Communication Consent | Visionary AI',
  description: 'Learn about how Visionary AI communicates with you via SMS and voice, including opt-in, opt-out, and data usage policies.',
}

export default function CommunicationConsentPage() {
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
            <span className="text-visionary-gold">Communication</span> Consent
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-gray-300 text-lg">
              At Visionary AI Systems, Inc., we are committed to transparent and respectful communication. This page explains how we use SMS text messaging and voice communications to support your goal achievement journey.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Types of Communications
              </h2>
              <p className="text-gray-300 mb-4">
                By providing your phone number and enabling communications in your account settings, you consent to receive <strong>automated SMS text messages and/or voice calls</strong> from Visionary AI, including:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Account Notifications:</strong> Important updates about your account, security alerts, and service announcements</li>
                <li><strong>Goal Reminders:</strong> Personalized reminders to help you stay on track with your vision board goals</li>
                <li><strong>Coaching Insights:</strong> AI-powered motivational messages and actionable tips from your AMIE coach</li>
                <li><strong>Progress Updates:</strong> Milestone celebrations and progress summaries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                How to Opt-In
              </h2>
              <p className="text-gray-300 mb-4">
                To receive SMS and voice communications from Visionary AI:
              </p>
              <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                <li>Log in to your Visionary AI account</li>
                <li>Navigate to <strong>Settings → Communication Preferences</strong></li>
                <li>Enter your mobile phone number</li>
                <li>Enable the communication types you wish to receive (SMS notifications, voice coaching, etc.)</li>
                <li>Click <strong>"Save Settings"</strong> to confirm your preferences</li>
              </ol>
              <p className="text-gray-300 mt-4">
                By completing these steps, you expressly consent to receive automated text messages and calls at the phone number provided. Your consent is not a condition of purchasing any goods or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Message Frequency
              </h2>
              <p className="text-gray-300">
                Message frequency varies based on your selected preferences, activity level, and goal settings. You may receive anywhere from a few messages per week to multiple messages per day, depending on your configuration. You can adjust your frequency preferences at any time in your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Message and Data Rates
              </h2>
              <p className="text-gray-300">
                <strong>Message and data rates may apply.</strong> Standard messaging rates from your wireless carrier may be charged for messages sent to or from your device. Please check with your mobile carrier for details about your messaging plan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                How to Opt-Out
              </h2>
              <p className="text-gray-300 mb-4">
                You can stop receiving SMS messages from Visionary AI at any time by:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Reply STOP</strong> to any message you receive from us</li>
                <li>Update your communication preferences in your account settings</li>
                <li>Contact us at <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">support@visionaryai.life</a></li>
              </ul>
              <p className="text-gray-300 mt-4">
                After opting out, you will receive a one-time confirmation message. You will no longer receive SMS messages from us unless you re-enable them in your settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-300 mb-4">
                If you need assistance with SMS communications:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Reply HELP</strong> to any message for immediate assistance</li>
                <li>Email us at <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">support@visionaryai.life</a></li>
                <li>Visit our <Link href="/contact" className="text-visionary-teal hover:underline">Contact page</Link></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Privacy and Data
              </h2>
              <p className="text-gray-300">
                Your phone number and messaging data are handled in accordance with our{' '}
                <Link href="/privacy" className="text-visionary-teal hover:underline">Privacy Policy</Link>. 
                We do not sell or share your phone number with third parties for marketing purposes. 
                Our messaging services are powered by Twilio, a trusted communications platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Terms
              </h2>
              <p className="text-gray-300">
                Use of our SMS and voice services is subject to our{' '}
                <Link href="/terms" className="text-visionary-teal hover:underline">Terms of Service</Link>.
              </p>
            </section>

            <section className="bg-visionary-darker rounded-xl p-6 border border-gray-700 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-300">
                <strong>Visionary AI Systems, Inc.</strong><br />
                Email: <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">support@visionaryai.life</a><br />
                Website: <a href="https://visionaryai.life" className="text-visionary-teal hover:underline">visionaryai.life</a>
              </p>
            </section>

            <p className="text-gray-500 text-sm mt-8">
              Last updated: December 30, 2025
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
