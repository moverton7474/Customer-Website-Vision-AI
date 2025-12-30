'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import BlockEditor from '@/components/BlockEditor'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Loader2, 
  AlertCircle,
  Globe,
  FileText,
  Settings
} from 'lucide-react'
import { cn, slugify, isValidSlug, getStatusColor } from '@/lib/utils'
import type { Page, PageBlock, PageStatus } from '@/types'

export default function PageEditorPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'
  const pageId = isNew ? null : params.id as string

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content')
  
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [status, setStatus] = useState<PageStatus>('draft')
  const [blocks, setBlocks] = useState<PageBlock[]>([])

  const supabase = createClient()

  useEffect(() => {
    if (pageId) {
      fetchPage()
    }
  }, [pageId])

  async function fetchPage() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (error) throw error
      if (!data) throw new Error('Page not found')

      setTitle(data.title)
      setSlug(data.slug)
      setMetaDescription(data.meta_description || '')
      setOgImage(data.og_image || '')
      setStatus(data.status)
      setBlocks(data.content || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(newStatus?: PageStatus) {
    setError('')
    
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    
    if (!slug.trim()) {
      setError('URL slug is required')
      return
    }

    if (!isValidSlug(slug)) {
      setError('Slug must contain only lowercase letters, numbers, and hyphens')
      return
    }

    setSaving(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')

      const finalStatus = newStatus || status
      const now = new Date().toISOString()

      const pageData = {
        title: title.trim(),
        slug: slug.trim(),
        meta_description: metaDescription.trim() || null,
        og_image: ogImage.trim() || null,
        status: finalStatus,
        content: blocks,
        updated_by: session.user.id,
        updated_at: now,
      }

      if (pageId) {
        const { error } = await supabase
          .from('pages')
          .update({
            ...pageData,
            ...(finalStatus === 'published' && status !== 'published' 
              ? { published_at: now } 
              : {}
            ),
          })
          .eq('id', pageId)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('pages')
          .insert({
            ...pageData,
            created_by: session.user.id,
            ...(finalStatus === 'published' ? { published_at: now } : {}),
          })
          .select()
          .single()

        if (error) throw error
        router.push(`/admin/pages/${data.id}`)
        return
      }

      setStatus(finalStatus)
      router.refresh()
    } catch (err: any) {
      if (err.code === '23505') {
        setError('A page with this slug already exists')
      } else {
        setError(err.message || 'Failed to save page')
      }
    } finally {
      setSaving(false)
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    if (isNew && !slug) {
      setSlug(slugify(value))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-visionary-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/pages"
            className="p-2 text-visionary-text-secondary hover:text-visionary-text-primary hover:bg-visionary-surface rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-visionary-text-primary">
              {isNew ? 'Create Page' : 'Edit Page'}
            </h1>
            {!isNew && (
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                  getStatusColor(status)
                )}>
                  {status}
                </span>
                <span className="text-sm text-visionary-text-muted">/{slug}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === 'published' && (
            <Link
              href={`/${slug}`}
              target="_blank"
              className="btn-ghost"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Live
            </Link>
          )}
          
          {status !== 'published' && (
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="btn-secondary"
            >
              <Globe className="w-4 h-4 mr-2" />
              Publish
            </button>
          )}
          
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="btn-primary"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-visionary-surface rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('content')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === 'content'
              ? "bg-visionary-gold text-visionary-darkest"
              : "text-visionary-text-secondary hover:text-visionary-text-primary"
          )}
        >
          <FileText className="w-4 h-4" />
          Content
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === 'seo'
              ? "bg-visionary-gold text-visionary-darkest"
              : "text-visionary-text-secondary hover:text-visionary-text-primary"
          )}
        >
          <Settings className="w-4 h-4" />
          SEO & Settings
        </button>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Page Title */}
          <div className="card">
            <label className="label">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="input text-xl font-serif"
              placeholder="Enter page title..."
            />
          </div>

          {/* Content Blocks */}
          <div className="card">
            <h2 className="text-lg font-semibold text-visionary-text-primary mb-4">Page Content</h2>
            <BlockEditor blocks={blocks} onChange={setBlocks} />
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-visionary-text-primary mb-4">URL & Status</h2>
            
            <div className="space-y-4">
              <div>
                <label className="label">URL Slug</label>
                <div className="flex items-center">
                  <span className="px-4 py-3 bg-visionary-darkest border border-r-0 border-visionary-border rounded-l-lg text-visionary-text-muted text-sm">
                    pages.visionaryai.life/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="input rounded-l-none flex-1"
                    placeholder="page-url"
                  />
                </div>
                <p className="text-xs text-visionary-text-muted mt-1">
                  Only lowercase letters, numbers, and hyphens allowed
                </p>
              </div>

              <div>
                <label className="label">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PageStatus)}
                  className="input"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-visionary-text-primary mb-4">SEO Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="label">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Brief description for search engines (recommended: 150-160 characters)"
                  maxLength={160}
                />
                <p className="text-xs text-visionary-text-muted mt-1">
                  {metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <label className="label">OG Image URL</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  className="input"
                  placeholder="https://example.com/og-image.jpg"
                />
                <p className="text-xs text-visionary-text-muted mt-1">
                  Image shown when shared on social media (recommended: 1200x630px)
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="card">
            <h2 className="text-lg font-semibold text-visionary-text-primary mb-4">Search Preview</h2>
            <div className="p-4 bg-white rounded-lg">
              <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                {title || 'Page Title'}
              </p>
              <p className="text-green-700 text-sm">
                pages.visionaryai.life/{slug || 'page-url'}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {metaDescription || 'Add a meta description to improve search visibility...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
