import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-visionary-darker border-t border-gray-800 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold">
              <span className="text-visionary-gold">Visionary</span> AI
            </Link>
            <p className="text-gray-500 text-sm mt-1">
              Transform your vision into reality
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              href="/communication-consent" 
              className="text-gray-400 hover:text-visionary-gold transition-colors"
            >
              Communication Consent
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-visionary-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-visionary-gold transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-400 hover:text-visionary-gold transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Visionary AI Systems, Inc. All rights reserved.</p>
          <p className="mt-2">
            Questions? Contact us at{' '}
            <a 
              href="mailto:support@visionaryai.life" 
              className="text-visionary-teal hover:underline"
            >
              support@visionaryai.life
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
