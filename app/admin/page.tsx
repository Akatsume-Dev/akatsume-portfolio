'use client'

import { useState } from 'react'

type DayStatus = 'available' | 'limited' | 'busy' | 'off'
type Availability = { note: string; days: Record<string, DayStatus> }

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

const CYCLE: DayStatus[] = ['off', 'available', 'limited', 'busy']

const STATUS_STYLE: Record<DayStatus, { label: string; bg: string; text: string; border: string }> = {
  available: { label: 'Available', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
  limited:   { label: 'Limited',   bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  busy:      { label: 'Busy',      bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  off:       { label: 'Off',       bg: 'bg-white/4', text: 'text-white/20', border: 'border-white/8' },
}

const DEFAULT: Availability = {
  note: 'Open to new projects',
  days: { mon: 'available', tue: 'available', wed: 'available', thu: 'available', fri: 'available', sat: 'off', sun: 'off' },
}

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
      // migrate old format (boolean days) to new format (DayStatus)
      if (d.days && typeof Object.values(d.days)[0] === 'boolean') {
        const migrated: Record<string, DayStatus> = {}
        for (const [k, v] of Object.entries(d.days)) {
          migrated[k] = v ? 'available' : 'off'
        }
        setData({ note: d.note ?? DEFAULT.note, days: migrated })
      } else {
        setData({ ...DEFAULT, ...d, days: { ...DEFAULT.days, ...d.days } })
      }
      setAuthed(true)
    } else {
      setAuthError('Wrong password.')
    }
  }

  const cycleDay = (day: string) => {
    setData(d => {
      if (!d) return d
      const current = d.days[day] ?? 'off'
      const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]
      return { ...d, days: { ...d.days, [day]: next } }
    })
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
      setSaveError('Failed to save. Wrong password?')
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

        {/* Per-day status */}
        <div>
          <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Days — click to cycle status</div>
          <p className="text-white/25 text-xs mb-4">Off → Available → Limited → Busy → Off</p>
          <div className="space-y-2">
            {DAYS.map(day => {
              const status = data.days[day] ?? 'off'
              const s = STATUS_STYLE[status]
              return (
                <button
                  key={day}
                  onClick={() => cycleDay(day)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-sm border ${s.bg} ${s.border} transition-all`}
                >
                  <span className="text-white font-semibold text-sm w-10 text-left">{DAY_LABELS[day]}</span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${s.text}`}>{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 flex-wrap">
          {CYCLE.map(s => (
            <div key={s} className="flex items-center gap-1.5 text-xs text-white/40">
              <span className={`w-2 h-2 rounded-full ${
                s === 'available' ? 'bg-green-400' :
                s === 'limited' ? 'bg-yellow-400' :
                s === 'busy' ? 'bg-red-400' : 'bg-white/20'
              }`} />
              {STATUS_STYLE[s].label}
            </div>
          ))}
        </div>

        <button onClick={save} disabled={saving} className="btn-gold w-full">
          {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saveError && <p className="text-red-400 text-xs text-center">{saveError}</p>}
      </div>
    </div>
  )
}
