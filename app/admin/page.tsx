'use client'

import { useState, useEffect } from 'react'

type Availability = {
  status: 'available' | 'busy' | 'limited'
  note: string
  days: Record<string, boolean>
}

const DAY_LABELS: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available', color: 'bg-green-500' },
  { value: 'limited', label: 'Limited', color: 'bg-yellow-500' },
  { value: 'busy', label: 'Busy', color: 'bg-red-500' },
] as const

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [data, setData] = useState<Availability | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/availability', { headers: { 'x-admin-password': password } })
    if (res.ok) {
      const d = await res.json()
      setData(d)
      setAuthed(true)
    } else {
      setAuthError('Wrong password.')
    }
  }

  const save = async () => {
    if (!data) return
    setSaving(true)
    setSaveError('')
    const res = await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(data),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setSaveError('Failed to save. Check your password.')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-sm space-y-4">
          <div className="text-gold-400 text-xs tracking-widest uppercase mb-6 font-medium">Admin Panel</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-gold-400/50"
          />
          {authError && <p className="text-red-400 text-xs">{authError}</p>}
          <button type="submit" className="btn-gold w-full">Enter</button>
        </form>
      </div>
    )
  }

  if (!data) return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white/40 text-sm">Loading...</div>

  return (
    <div className="min-h-screen bg-[#030303] text-white px-6 py-12">
      <div className="max-w-lg mx-auto space-y-10">
        <div>
          <div className="text-gold-400 text-xs tracking-widest uppercase mb-1 font-medium">Admin</div>
          <h1 className="text-2xl font-black">Availability Settings</h1>
        </div>

        {/* Status */}
        <div>
          <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Status</div>
          <div className="flex gap-3">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s.value}
                onClick={() => setData(d => d ? { ...d, status: s.value } : d)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-sm border text-sm font-medium transition-all ${
                  data.status === s.value
                    ? 'border-gold-400/60 bg-gold-400/10 text-white'
                    : 'border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${s.color}`} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div>
          <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Status Note</div>
          <input
            value={data.note}
            onChange={e => setData(d => d ? { ...d, note: e.target.value } : d)}
            placeholder="e.g. Open to new projects"
            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-gold-400/50"
          />
        </div>

        {/* Days */}
        <div>
          <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Available Days</div>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(DAY_LABELS).map(day => (
              <button
                key={day}
                onClick={() => setData(d => d ? { ...d, days: { ...d.days, [day]: !d.days[day] } } : d)}
                className={`px-4 py-2 rounded-sm border text-xs font-bold uppercase tracking-widest transition-all ${
                  data.days[day]
                    ? 'border-gold-400/60 bg-gold-400/15 text-gold-300'
                    : 'border-white/8 text-white/25 hover:border-white/15'
                }`}
              >
                {DAY_LABELS[day]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="btn-gold w-full"
        >
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saveError && <p className="text-red-400 text-xs text-center">{saveError}</p>}
      </div>
    </div>
  )
}
