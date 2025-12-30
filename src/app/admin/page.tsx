'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { 
  FileText, 
  Eye, 
  Clock, 
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'
import type { Page } from '@/types'

interface Stats {
  totalPages: number
  publishedPages: number
  draftPages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalPages: 0, publishedPages: 0, draftPages: 0 })
  const [recentPages, setRecentPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      // Fetch page counts
      const { count: totalCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true })

      const { count: publishedCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published')

      const { count: draftCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'draft')

      setStats({
        totalPages: totalCount || 0,
        publishedPages: publishedCount || 0,
        draftPages: draftCount || 0,
      })

      // Fetch recent pages
      const { data: pages } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5)

      setRecentPages(pages || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Pages',
      value: stats.totalPages,
      icon: FileText,
      color: 'from-visionary-gold to-visionary-gold-dark',
    },
    {
      title: 'Published',
      value: stats.publishedPages,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Drafts',
      value: stats.draftPages,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-visionary-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-visionary-text-primary">Dashboard</h1>
          <p className="text-visionary-text-secondary mt-1">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <Link href="/admin/pages/new" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Create Page
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="card group hover:border-visionary-gold/30 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-visionary-text-secondary text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-visionary-text-primary mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pages */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-visionary-text-primary">Recent Pages</h2>
          <Link 
            href="/admin/pages" 
            className="text-visionary-gold hover:text-visionary-gold-light flex items-center gap-1 text-sm font-medium"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentPages.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-visionary-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-visionary-text-primary mb-2">No pages yet</h3>
            <p className="text-visionary-text-secondary mb-4">
              Get started by creating your first page.
            </p>
            <Link href="/admin/pages/new" className="btn-secondary">
              <Plus className="w-5 h-5 mr-2" />
              Create your first page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-visionary-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-visionary-text-secondary">Page</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-visionary-text-secondary hidden sm:table-cell">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-visionary-text-secondary hidden md:table-cell">Updated</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-visionary-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-visionary-border">
                {recentPages.map((page) => (
                  <tr key={page.id} className="hover:bg-visionary-surface/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-visionary-text-primary">{page.title}</p>
                        <p className="text-sm text-visionary-text-muted">/{page.slug}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-visionary-text-secondary hidden md:table-cell">
                      {formatDate(page.updated_at)}
                    </td>
                    <td className="py-4 px-4 text-right">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="/admin/pages/new"
          className="card group hover:border-visionary-gold/30 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-visionary-gold/10 flex items-center justify-center group-hover:bg-visionary-gold/20 transition-colors">
            <Plus className="w-6 h-6 text-visionary-gold" />
          </div>
          <div>
            <h3 className="font-medium text-visionary-text-primary">Create New Page</h3>
            <p className="text-sm text-visionary-text-secondary">Add a new page to your site</p>
          </div>
          <ArrowRight className="w-5 h-5 text-visionary-text-muted ml-auto group-hover:text-visionary-gold group-hover:translate-x-1 transition-all" />
        </Link>

        <Link 
          href="/admin/pages"
          className="card group hover:border-visionary-gold/30 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-visionary-teal/10 flex items-center justify-center group-hover:bg-visionary-teal/20 transition-colors">
            <FileText className="w-6 h-6 text-visionary-teal" />
          </div>
          <div>
            <h3 className="font-medium text-visionary-text-primary">Manage Pages</h3>
            <p className="text-sm text-visionary-text-secondary">View and edit all pages</p>
          </div>
          <ArrowRight className="w-5 h-5 text-visionary-text-muted ml-auto group-hover:text-visionary-teal group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  )
}
