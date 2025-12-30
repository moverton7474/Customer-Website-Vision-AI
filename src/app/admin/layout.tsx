'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/pages', label: 'Pages', icon: '📄' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-visionary-darker border-r border-gray-800 p-6">
        <div className="mb-8">
          <Link href="/admin" className="text-2xl font-bold">
            <span className="text-visionary-gold">Visionary</span> CMS
          </Link>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-visionary-gold text-visionary-dark'
                  : 'text-gray-400 hover:text-white hover:bg-visionary-dark'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm flex items-center gap-2"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
