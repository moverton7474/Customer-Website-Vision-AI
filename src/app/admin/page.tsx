import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
            Total Pages
          </h3>
          <p className="text-4xl font-bold text-visionary-gold">0</p>
        </div>

        <div className="card">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
            Published
          </h3>
          <p className="text-4xl font-bold text-green-500">0</p>
        </div>

        <div className="card">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-2">
            Drafts
          </h3>
          <p className="text-4xl font-bold text-yellow-500">0</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/pages/new" className="btn-primary">
            + Create New Page
          </Link>
          <Link href="/admin/pages" className="btn-secondary">
            View All Pages
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="card">
          <p className="text-gray-400 text-center py-8">
            No recent activity. Create your first page to get started!
          </p>
        </div>
      </div>
    </div>
  )
}
