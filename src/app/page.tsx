import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-visionary-gold">Visionary</span> AI
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Transform your vision into reality with AI-powered goal achievement
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/admin"
            className="btn-primary"
          >
            Admin Dashboard
          </Link>
          <Link 
            href="/communication-consent"
            className="btn-secondary"
          >
            Communication Consent
          </Link>
        </div>
      </div>
      
      <footer className="absolute bottom-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Visionary AI Systems, Inc.
      </footer>
    </main>
  )
}
