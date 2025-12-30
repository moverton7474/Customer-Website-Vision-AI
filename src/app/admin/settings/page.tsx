'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { 
  User, 
  Mail, 
  Save, 
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User as UserType } from '@/types'

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) throw error
      setUser(data)
      setFullName(data.full_name || '')
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!user) return
    
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('users')
        .update({ full_name: fullName.trim() || null })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, full_name: fullName.trim() || null })
      setMessage({ type: 'success', text: 'Profile updated successfully' })
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setSaving(false)
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
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-visionary-text-primary">Settings</h1>
        <p className="text-visionary-text-secondary mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-lg border",
          message.type === 'success' 
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        )}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm">{message.text}</p>
        </div>
      )}

      {/* Profile Card */}
      <div className="card">
        <h2 className="text-lg font-semibold text-visionary-text-primary mb-6">Profile</h2>
        
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-visionary-surface-elevated rounded-full flex items-center justify-center">
              <span className="text-visionary-gold font-bold text-2xl">
                {fullName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="font-medium text-visionary-text-primary">
                {fullName || 'No name set'}
              </p>
              <p className="text-sm text-visionary-text-muted capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-visionary-text-muted" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input pl-12"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-visionary-text-muted" />
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input pl-12 opacity-60 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-visionary-text-muted mt-1">
              Email cannot be changed here
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
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
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card">
        <h2 className="text-lg font-semibold text-visionary-text-primary mb-4">Quick Links</h2>
        
        <div className="space-y-3">
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-visionary-surface rounded-lg hover:bg-visionary-surface-elevated transition-colors group"
          >
            <div>
              <p className="font-medium text-visionary-text-primary">Supabase Dashboard</p>
              <p className="text-sm text-visionary-text-muted">Manage database and users</p>
            </div>
            <ExternalLink className="w-5 h-5 text-visionary-text-muted group-hover:text-visionary-gold transition-colors" />
          </a>

          <a 
            href="https://vercel.com/dashboard" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-visionary-surface rounded-lg hover:bg-visionary-surface-elevated transition-colors group"
          >
            <div>
              <p className="font-medium text-visionary-text-primary">Vercel Dashboard</p>
              <p className="text-sm text-visionary-text-muted">Deployments and analytics</p>
            </div>
            <ExternalLink className="w-5 h-5 text-visionary-text-muted group-hover:text-visionary-gold transition-colors" />
          </a>

          <a 
            href="https://visionaryai.life" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-visionary-surface rounded-lg hover:bg-visionary-surface-elevated transition-colors group"
          >
            <div>
              <p className="font-medium text-visionary-text-primary">Visionary AI Main Site</p>
              <p className="text-sm text-visionary-text-muted">View the main website</p>
            </div>
            <ExternalLink className="w-5 h-5 text-visionary-text-muted group-hover:text-visionary-gold transition-colors" />
          </a>
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center text-sm text-visionary-text-muted">
        <p>Visionary CMS v1.0.0</p>
        <p>Built with Next.js, Supabase, and Tailwind CSS</p>
      </div>
    </div>
  )
}
