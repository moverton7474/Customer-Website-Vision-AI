import Link from 'next/link'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-visionary-gradient">
      {/* Header */}
      <header className="border-b border-visionary-border bg-visionary-dark/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-visionary-gold to-visionary-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-visionary-darkest font-bold text-lg">V</span>
              </div>
              <span className="font-serif text-lg font-semibold gold-text">Visionary AI</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <a 
                href="https://visionaryai.life" 
                className="text-sm text-visionary-text-secondary hover:text-visionary-text-primary transition-colors"
              >
                Main Site
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-visionary-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-visionary-gold to-visionary-gold-dark rounded flex items-center justify-center">
                <span className="text-visionary-darkest font-bold text-xs">V</span>
              </div>
              <span className="text-sm text-visionary-text-muted">
                © {new Date().getFullYear()} Visionary AI. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a 
                href="https://visionaryai.life/privacy" 
                className="text-visionary-text-muted hover:text-visionary-text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="https://visionaryai.life/terms" 
                className="text-visionary-text-muted hover:text-visionary-text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="mailto:support@visionaryai.life" 
                className="text-visionary-text-muted hover:text-visionary-text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
