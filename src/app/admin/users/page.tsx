'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { 
  Users, 
  Shield, 
  Edit2, 
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { formatDate, cn } from '@/lib/utils'
import type { User, UserRole } from '@/types'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage({ type: 'error', text: 'Failed to load users' })
    } finally {
      setLoading(false)
    }
  }

  async function updateUserRole(userId: string, newRole: UserRole) {
    setSaving(userId)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ))
      setMessage({ type: 'success', text: 'User role updated successfully' })
    } catch (error) {
      console.error('Error updating user:', error)
      setMessage({ type: 'error', text: 'Failed to update user role' })
    } finally {
      setSaving(null)
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
      <div>
        <h1 className="text-3xl font-serif font-bold text-visionary-text-primary">Users</h1>
        <p className="text-visionary-text-secondary mt-1">
          Manage user access and permissions
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

      {/* Info Card */}
      <div className="card bg-visionary-gold/5 border-visionary-gold/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-visionary-gold/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-visionary-gold" />
          </div>
          <div>
            <h3 className="font-medium text-visionary-text-primary mb-1">User Roles</h3>
            <p className="text-sm text-visionary-text-secondary">
              <strong className="text-visionary-gold">Admin:</strong> Full access to all features including user management and page deletion.
              <br />
              <strong className="text-visionary-teal">Editor:</strong> Can create, edit, and publish pages but cannot delete or manage users.
            </p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-visionary-surface">
              <tr className="border-b border-visionary-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary">User</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary">Role</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-visionary-text-secondary hidden md:table-cell">Joined</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-visionary-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-visionary-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-visionary-surface/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-visionary-surface-elevated rounded-full flex items-center justify-center">
                        <span className="text-visionary-gold font-medium">
                          {user.full_name?.[0] || user.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-visionary-text-primary">
                          {user.full_name || 'No name'}
                        </p>
                        <p className="text-sm text-visionary-text-muted">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                      user.role === 'admin'
                        ? "bg-visionary-gold/20 text-visionary-gold border-visionary-gold/30"
                        : "bg-visionary-teal/20 text-visionary-teal border-visionary-teal/30"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-visionary-text-secondary hidden md:table-cell">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        disabled={saving === user.id}
                        className="input py-2 px-3 text-sm min-w-[120px]"
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      {saving === user.id && (
                        <Loader2 className="w-4 h-4 ml-2 animate-spin text-visionary-gold" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Instructions */}
      <div className="card">
        <h3 className="font-semibold text-visionary-text-primary mb-3">Adding New Users</h3>
        <p className="text-sm text-visionary-text-secondary mb-4">
          To add a new user, you'll need to create them in your Supabase dashboard:
        </p>
        <ol className="text-sm text-visionary-text-secondary space-y-2 list-decimal list-inside">
          <li>Go to your Supabase project → Authentication → Users</li>
          <li>Click "Add user" → "Create new user"</li>
          <li>Enter their email and a temporary password</li>
          <li>Check "Auto Confirm User"</li>
          <li>The user will appear here automatically with Editor role</li>
        </ol>
      </div>
    </div>
  )
}
