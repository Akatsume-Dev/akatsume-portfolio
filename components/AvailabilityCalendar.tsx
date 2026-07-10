'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type DayStatus = 'available' | 'limited' | 'busy' | 'off'
type Availability = { note: string; days: Record<string, DayStatus> }

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

const STATUS_COLOR: Record<DayStatus, string> = {
  available: '#4ade80',
  limited:   '#facc15',
  busy:      '#f87171',
  off:       'transparent',
}

const TODAY = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3)

export default function AvailabilityCalendar() {
  const [data, setData] = useState<Availability | null>(null)

  useEffect(() => {
    fetch('/api/availability').then(r => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return null

  // derive overall status from days for the status dot
  const dayStatuses = Object.values(data.days)
  const overallStatus: DayStatus =
    dayStatuses.some(s => s === 'available') ? 'available' :
    dayStatuses.some(s => s === 'limited') ? 'limited' :
    dayStatuses.some(s => s === 'busy') ? 'busy' : 'off'

  const dotColor = STATUS_COLOR[overallStatus]
  const statusLabel = overallStatus === 'available' ? 'Available' : overallStatus === 'limited' ? 'Limited' : overallStatus === 'busy' ? 'Busy' : 'Unavailable'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-sm border border-white/6 bg-white/2"
    >
      {/* Status row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {overallStatus !== 'off' && (
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: dotColor }} />
          )}
          <span className="text-white font-semibold text-sm">{statusLabel}</span>
        </div>
        <span className="text-white/35 text-xs">{data.note}</span>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map(day => {
          const status: DayStatus = data.days[day] ?? 'off'
          const isToday = day === TODAY
          const color = STATUS_COLOR[status]
          const isOff = status === 'off'

          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span className={`text-[10px] font-medium tracking-widest uppercase ${isToday ? 'text-gold-400' : 'text-white/25'}`}>
                {DAY_LABELS[day]}
              </span>
              <div
                className={`w-full h-7 rounded-sm transition-all border ${
                  isToday ? 'border-gold-400/60' : isOff ? 'border-white/4' : 'border-white/10'
                }`}
                style={!isOff ? { backgroundColor: color + '28' } : {}}
              >
                {!isOff && (
                  <div className="h-full w-full rounded-sm" style={{ backgroundColor: color + '18' }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3 mt-4 flex-wrap">
        {(['available', 'limited', 'busy'] as DayStatus[]).map(s => (
          <div key={s} className="flex items-center gap-1 text-[10px] text-white/30">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[s] }} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
