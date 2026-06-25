'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'xShadowBuilder',
    role: 'Game Owner',
    rating: 5,
    text: 'Akatsume built our entire combat system from scratch. The code is clean, the performance is incredible, and he finished ahead of schedule. 10/10 — hiring again.',
    avatar: 'S',
    color: 'from-purple-600 to-purple-800',
  },
  {
    name: 'DevKingz',
    role: 'Roblox Developer',
    rating: 5,
    text: 'Best scripter I\'ve worked with on Roblox. The UI system he built is polished, smooth, and players absolutely love it. Couldn\'t be happier.',
    avatar: 'D',
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: 'GameStudioPro',
    role: 'Studio Lead',
    rating: 5,
    text: 'We had complex multiplayer issues that no one could fix. Akatsume diagnosed and solved everything within a day. Outstanding skills and communication.',
    avatar: 'G',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    name: 'NightOwlGames',
    role: 'Indie Developer',
    rating: 5,
    text: 'The economy system Akatsume built is absolutely rock-solid. No exploits, no lag, perfectly balanced. My players are spending more because the systems just work.',
    avatar: 'N',
    color: 'from-gold-600 to-gold-800',
  },
  {
    name: 'ProDevs_RBX',
    role: 'Project Manager',
    rating: 5,
    text: 'Clear communication throughout the entire project. Updates every day, zero ghosting, delivered exactly what was promised. A real professional.',
    avatar: 'P',
    color: 'from-rose-600 to-rose-800',
  },
  {
    name: 'ZenithStudios',
    role: 'Game Director',
    rating: 5,
    text: 'Akatsume rewrote our DataStore system and fixed 2 years of technical debt in a week. The game hasn\'t had a data loss incident since. Absolute legend.',
    avatar: 'Z',
    color: 'from-indigo-600 to-indigo-800',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="card-premium rounded-sm p-7 w-80 flex-shrink-0 flex flex-col gap-5 mx-3">
      <Quote size={20} className="text-gold-400/40" />
      <p className="text-white/65 text-sm leading-relaxed flex-1">"{t.text}"</p>
      <div>
        <StarRating count={t.rating} />
        <div className="flex items-center gap-3 mt-4">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <div className="text-white text-sm font-semibold">{t.name}</div>
            <div className="text-white/40 text-xs">{t.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Reviews</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Clients Who{' '}
            <span className="text-gold-gradient">Trust the Work</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
              ))}
            </div>
            <span className="text-white/50 text-sm">5.0 average across all projects</span>
          </motion.div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5 -mx-6">
        {/* Row 1 — left to right */}
        <div className="ticker-wrap">
          <div className="ticker-content flex" style={{ animationDuration: '35s' }}>
            {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="ticker-wrap">
          <div className="ticker-content flex" style={{ animationDuration: '40s', animationDirection: 'reverse' }}>
            {[...doubled].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, #030303, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(-90deg, #030303, transparent)' }} />
    </section>
  )
}
