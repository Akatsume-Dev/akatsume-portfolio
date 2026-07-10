'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Availability = {
  status: 'available' | 'busy' | 'limited'
  note: string
  days: Record<string, boolean>
}

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<string, string> = {
  mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
}

const STATUS_COLOR: Record<string, string> = {
  available: '#4ade80',
  limited: '#facc15',
  busy: '#f87171',
}
const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  limited: 'Limited',
  busy: 'Busy',
}

const TODAY = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3)

export default function AvailabilityCalendar() {
  const [data, setData] = useState<Availability | null>(null)

  useEffect(() => {
    fetch('/api/availability').then(r => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return null

  const color = STATUS_COLOR[data.status]

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
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          <span className="text-white font-semibold text-sm">{STATUS_LABEL[data.status]}</span>
        </div>
        <span className="text-white/35 text-xs">{data.note}</span>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map(day => {
          const isToday = day === TODAY
          const isOn = data.days[day]
          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span className={`text-[10px] font-medium tracking-widest uppercase ${isToday ? 'text-gold-400' : 'text-white/25'}`}>
                {DAY_LABELS[day]}
              </span>
              <div
                className={`w-full h-7 rounded-sm transition-all ${
                  isOn
                    ? isToday
                      ? 'border border-gold-400/60'
                      : 'border border-white/8'
                    : 'border border-white/4'
                }`}
                style={isOn ? { backgroundColor: color + '22' } : {}}
              >
                {isOn && (
                  <div
                    className="h-full w-full rounded-sm opacity-60"
                    style={{ backgroundColor: color + '18' }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-white/20 text-[10px] mt-4 tracking-wide">
        Green days = available. Today is highlighted in gold.
      </p>
    </motion.div>
  )
}
