'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Trash2, 
  MoreVertical,
  Filter,
  ChevronDown
} from 'lucide-react'
import { formatDate, getStatusColor, cn } from '@/lib/utils'
import type { Page, PageStatus } from '@/types'

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchPages()
  }, [statusFilter])

  async function fetchPages() {
    try {
      let query = supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setPages(data || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setPages(pages.filter(p => p.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-visionary-text-primary">Pages</h1>
          <p className="text-visionary-text-secondary mt-1">
            Manage your website content
          </p>
        </div>
        <Link href="/admin/pages/new" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Create Page
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-visionary-text-muted" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PageStatus | 'all')}
              className="input appearance-none pr-10 min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-visionary-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Pages Table/List */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-visionary-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-visionary-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-visionary-text-primary mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No pages found' : 'No pages yet'}
            </h3>
            <p className="text-visionary-text-secondary mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first page.'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link href="/admin/pages/new" className="btn-secondary">
                <Plus className="w-5 h-5 mr-2" />
                Create your first page
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-visionary-surface">
                <tr className="border-b border-visionary-border">
                  <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary">Page</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary hidden sm:table-cell">Slug</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary hidden md:table-cell">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary hidden lg:table-cell">Updated</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-visionary-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-visionary-border">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-visionary-surface/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <Link 
                          href={`/admin/pages/${page.id}`}
                          className="font-medium text-visionary-text-primary hover:text-visionary-gold transition-colors"
                        >
                          {page.title}
                        </Link>
                        <p className="text-sm text-visionary-text-muted sm:hidden">/{page.slug}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border mt-1 md:hidden ${getStatusColor(page.status)}`}>
                          {page.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <code className="text-sm text-visionary-text-secondary bg-visionary-surface px-2 py-1 rounded">
                        /{page.slug}
                      </code>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-visionary-text-secondary hidden lg:table-cell">
                      {formatDate(page.updated_at)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pages/${page.id}`}
                          className="p-2 text-visionary-text-secondary hover:text-visionary-gold hover:bg-visionary-surface rounded-lg transition-colors"
                          title="Edit page"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                        {page.status === 'published' && (
                          <Link
                            href={`/${page.slug}`}
                            target="_blank"
                            className="p-2 text-visionary-text-secondary hover:text-visionary-teal hover:bg-visionary-surface rounded-lg transition-colors"
                            title="View live page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => setDeleteConfirm(page.id)}
                          className="p-2 text-visionary-text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete page"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-semibold text-visionary-text-primary mb-2">Delete Page</h3>
            <p className="text-visionary-text-secondary mb-6">
              Are you sure you want to delete this page? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
