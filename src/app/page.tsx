import Link from 'next/link'
import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Visionary AI | Transform Your Vision Into Reality',
  description: 'Visionary AI is an AI-powered goal achievement platform that helps you visualize, plan, and execute your dreams with personalized coaching and smart automation.',
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 min-h-[80vh]">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-visionary-gold">Visionary</span> AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Transform your vision into reality with AI-powered goal achievement
          </p>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Create stunning vision boards, get personalized AI coaching, and turn your dreams into actionable daily tasks – all powered by intelligent automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admin"
              className="btn-primary text-lg px-8 py-3"
            >
              Get Started
            </Link>
            <Link 
              href="#how-it-works"
              className="btn-secondary text-lg px-8 py-3"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-visionary-darker">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How It <span className="text-visionary-gold">Works</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Three simple steps to transform your aspirations into achievements
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-visionary-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">1. Define Your Vision</h3>
              <p className="text-gray-400">
                Create a personalized vision board with AI-generated imagery that keeps you motivated and focused on your goals.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-visionary-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">2. Get AI Coaching</h3>
              <p className="text-gray-400">
                AMIE, your Adaptive Motivational Identity Engine, provides personalized guidance, reminders, and insights tailored to you.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-visionary-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">3. Execute & Achieve</h3>
              <p className="text-gray-400">
                Turn dreams into daily actions with smart task automation, calendar integration, and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Key <span className="text-visionary-gold">Features</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to turn your vision into reality
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🖼️',
                title: 'AI Vision Boards',
                description: 'Generate stunning, personalized imagery that keeps your goals front and center'
              },
              {
                icon: '💬',
                title: 'Smart Notifications',
                description: 'Receive timely reminders via SMS, voice, or push notifications'
              },
              {
                icon: '📊',
                title: 'Financial Integration',
                description: 'Connect your finances to align spending with your goals'
              },
              {
                icon: '⌚',
                title: 'Wearable Support',
                description: 'Get motivated on the go with Apple Watch companion app'
              },
              {
                icon: '🎙️',
                title: 'Voice Coaching',
                description: 'Talk to AMIE for real-time guidance and motivation'
              },
              {
                icon: '📈',
                title: 'Progress Tracking',
                description: 'Visualize your journey with detailed analytics and milestones'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-visionary-darker rounded-xl p-6 border border-gray-800 hover:border-visionary-gold/50 transition-colors">
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-visionary-darker to-visionary-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-visionary-gold">Transform</span> Your Life?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of ambitious professionals who are turning their visions into reality with AI-powered goal achievement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admin"
              className="btn-primary text-lg px-8 py-3"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/contact"
              className="btn-secondary text-lg px-8 py-3"
            >
              Contact Us
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-visionary-teal hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-visionary-teal hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
