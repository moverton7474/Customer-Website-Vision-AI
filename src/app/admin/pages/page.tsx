import Link from 'next/link'

export default function PagesListPage() {
  // TODO: Fetch pages from Supabase
  const pages: Array<{
    id: string
    title: string
    slug: string
    status: string
    updated_at: string
  }> = []

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Link href="/admin/pages/new" className="btn-primary">
          + Create Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-400 mb-4">No pages yet</p>
          <Link href="/admin/pages/new" className="btn-primary">
            Create your first page
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead className="bg-visionary-dark">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">
                  Slug
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">
                  Updated
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-visionary-dark/50">
                  <td className="px-6 py-4 font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-gray-400">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        page.status === 'published'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="text-visionary-teal hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
