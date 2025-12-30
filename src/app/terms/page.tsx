import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Terms of Service | Visionary AI',
  description: 'Read the Terms of Service for using Visionary AI platform and services.',
}

export default function TermsPage() {
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
            <span className="text-visionary-gold">Terms</span> of Service
          </h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-gray-300 text-lg">
              Welcome to Visionary AI. By accessing or using our services, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                1. Service Description
              </h2>
              <p className="text-gray-300">
                Visionary AI Systems, Inc. ("Visionary AI," "we," "us," or "our") provides an AI-powered goal achievement platform that includes vision board creation, personalized coaching, progress tracking, and communication services including SMS and voice messaging ("Services"). Our platform is designed to help users visualize, plan, and execute their personal and professional goals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                2. Account Registration
              </h2>
              <p className="text-gray-300">
                To use certain features of our Services, you must create an account. You agree to:
              </p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside mt-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                3. Acceptable Use
              </h2>
              <p className="text-gray-300 mb-4">You agree NOT to:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Use the Services for any unlawful purpose</li>
                <li>Harass, abuse, or harm others through our platform</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Upload malicious code or content</li>
                <li>Use automated systems to access our Services without permission</li>
                <li>Misrepresent your identity or affiliation</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                4. SMS and Voice Communications
              </h2>
              <p className="text-gray-300">
                By opting in to receive SMS or voice communications, you agree to our{' '}
                <Link href="/communication-consent" className="text-visionary-teal hover:underline">
                  Communication Consent Policy
                </Link>. 
                Message and data rates may apply. You can opt out at any time by replying STOP to any message or updating your preferences in your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-300">
                The Services, including all content, features, and functionality, are owned by Visionary AI and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                6. User Content
              </h2>
              <p className="text-gray-300">
                You retain ownership of content you create using our Services (goals, vision boards, notes). By using our Services, you grant us a limited license to process and display your content as necessary to provide the Services. We do not claim ownership of your personal content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-gray-300">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. VISIONARY AI IS A PRODUCTIVITY AND MOTIVATION TOOL AND DOES NOT PROVIDE PROFESSIONAL FINANCIAL, MEDICAL, LEGAL, OR PSYCHOLOGICAL ADVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-300">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VISIONARY AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                9. Indemnification
              </h2>
              <p className="text-gray-300">
                You agree to indemnify and hold harmless Visionary AI, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                10. Termination
              </h2>
              <p className="text-gray-300">
                We may suspend or terminate your account at any time for violation of these Terms or for any other reason at our discretion. You may cancel your account at any time by contacting us. Upon termination, your right to use the Services will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-visionary-gold mt-8 mb-4">
                12. Governing Law
              </h2>
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="bg-visionary-darker rounded-xl p-6 border border-gray-700 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-300">
                If you have questions about these Terms, please contact us:<br /><br />
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
