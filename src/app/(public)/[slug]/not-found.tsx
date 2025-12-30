import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold gold-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-visionary-text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-visionary-text-secondary mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}
