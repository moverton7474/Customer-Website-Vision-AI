import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Privacy Policy | Visionary AI',
  description: 'Learn how Visionary AI collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
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
            <span className="text-visionary-gold">Privacy</span> Policy
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-gray-300 text-lg">
              Visionary AI Systems, Inc. ("Visionary AI," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-300 mb-4">We collect the following types of information:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
                <li><strong>Phone Number:</strong> Mobile phone number when you opt-in to SMS or voice communications</li>
                <li><strong>Communication Preferences:</strong> Your selected notification and messaging preferences</li>
                <li><strong>Message Logs:</strong> Records of messages sent and received for service delivery and support</li>
                <li><strong>Usage Data:</strong> How you interact with our platform, including goals, progress, and feature usage</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-300 mb-4">We use your information to:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Provide and maintain our services</li>
                <li>Send goal reminders, coaching insights, and motivational messages</li>
                <li>Deliver account notifications and security alerts</li>
                <li>Personalize your experience with AI-powered recommendations</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Improve and optimize our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Third-Party Service Providers
              </h2>
              <p className="text-gray-300 mb-4">
                We work with trusted third-party service providers to deliver our services:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Twilio:</strong> Powers our SMS and voice messaging services</li>
                <li><strong>Supabase:</strong> Provides secure database and authentication services</li>
                <li><strong>Vercel:</strong> Hosts our web application</li>
                <li><strong>Stripe:</strong> Processes payments securely</li>
              </ul>
              <p className="text-gray-300 mt-4">
                These providers only access your information as necessary to perform their services and are obligated to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Data Sharing
              </h2>
              <p className="text-gray-300">
                We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes. We may share information only:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside mt-4">
                <li>With service providers who assist in delivering our services</li>
                <li>When required by law or to respond to legal process</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets (with notice)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Data Retention
              </h2>
              <p className="text-gray-300">
                We retain your personal information for as long as your account is active or as needed to provide you services. Message logs are retained for up to 12 months for service quality and support purposes. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Your Rights and Controls
              </h2>
              <p className="text-gray-300 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Update:</strong> Correct or update your account information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from SMS/voice communications by replying STOP or updating your settings</li>
                <li><strong>Delete:</strong> Request deletion of your account and personal data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="text-gray-300 mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:support@visionaryai.life" className="text-visionary-teal hover:underline">
                  support@visionaryai.life
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Data Security
              </h2>
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your information, including encryption in transit and at rest, secure authentication, and regular security assessments. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-300">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="bg-visionary-darker rounded-xl p-6 border border-gray-700 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy, please contact us:<br /><br />
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
