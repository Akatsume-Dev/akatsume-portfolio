'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'xShadowBuilder',
    role: 'Game Owner',
    rating: 5,
    text: 'Got the combat system done fast and the code was clean. Ran into one small thing after delivery but he fixed it same day. Will hire again.',
    avatar: 'S',
    color: 'from-purple-600 to-purple-800',
  },
  {
    name: 'DevKingz',
    role: 'Roblox Developer',
    rating: 4,
    text: 'Solid work on the UI system, players like it. Communication was good, took a bit longer than expected but the end result was worth it.',
    avatar: 'D',
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: 'GameStudioPro',
    role: 'Studio Lead',
    rating: 5,
    text: 'Had a tricky multiplayer bug that had been sitting for weeks. He found the issue and fixed it quickly. Knows what he\'s doing.',
    avatar: 'G',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    name: 'NightOwlGames',
    role: 'Indie Developer',
    rating: 4,
    text: 'Economy system works well, no exploits since launch. Would have liked a bit more comments in the code but overall happy with what was delivered.',
    avatar: 'N',
    color: 'from-gold-600 to-gold-800',
  },
  {
    name: 'ProDevs_RBX',
    role: 'Project Manager',
    rating: 5,
    text: 'Kept us updated the whole time, no ghosting, delivered what was agreed. Easy to work with and flexible when we changed a small requirement mid-project.',
    avatar: 'P',
    color: 'from-rose-600 to-rose-800',
  },
  {
    name: 'ZenithStudios',
    role: 'Game Director',
    rating: 5,
    text: 'Cleaned up a messy DataStore setup that had been causing issues for a long time. Straightforward process, no data problems since.',
    avatar: 'Z',
    color: 'from-indigo-600 to-indigo-800',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < count ? 'text-gold-400 fill-gold-400' : 'text-white/15 fill-white/15'} />
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="card-premium rounded-sm p-7 flex flex-col gap-5"
    >
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
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding">
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
            <span className="text-white/50 text-sm">4.7 average across all projects</span>
          </motion.div>
        </div>

        {/* Centered grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
