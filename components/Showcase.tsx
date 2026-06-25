'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Code2, Layers, Cpu } from 'lucide-react'

const filters = ['All', 'Gameplay', 'UI Systems', 'Economy', 'Multiplayer']

const projects = [
  {
    id: 1,
    title: 'Combat Engine',
    category: 'Gameplay',
    desc: 'A complete combo-based combat system with hitbox detection, animations, VFX integration, and server-authoritative damage.',
    tags: ['Lua', 'RemoteEvents', 'Hitbox', 'Animation'],
    size: 'large',
    gradient: 'from-purple-900/40 to-dark-700',
  },
  {
    id: 2,
    title: 'Premium Shop UI',
    category: 'UI Systems',
    desc: 'Fully animated shop interface with cart system, currency display, confirmation dialogs, and mobile-responsive layout.',
    tags: ['TweenService', 'GUI', 'DataStore'],
    size: 'small',
    gradient: 'from-blue-900/40 to-dark-700',
  },
  {
    id: 3,
    title: 'Economy Framework',
    category: 'Economy',
    desc: 'Balanced in-game currency system with transactions, anti-exploit safeguards, and live economy analytics.',
    tags: ['DataStore', 'Security', 'Balancing'],
    size: 'small',
    gradient: 'from-gold-900/30 to-dark-700',
  },
  {
    id: 4,
    title: 'Team Deathmatch',
    category: 'Multiplayer',
    desc: 'Full TDM implementation: team balancing, spawn management, kill feed, scoreboard, round system — production-ready.',
    tags: ['Multiplayer', 'Teams', 'Round System'],
    size: 'large',
    gradient: 'from-emerald-900/30 to-dark-700',
  },
  {
    id: 5,
    title: 'Inventory System',
    category: 'UI Systems',
    desc: 'Drag-and-drop inventory with item stacking, tooltips, equipping logic, and persistent player data.',
    tags: ['GUI', 'DataStore', 'Modules'],
    size: 'small',
    gradient: 'from-rose-900/30 to-dark-700',
  },
  {
    id: 6,
    title: 'Progression Engine',
    category: 'Economy',
    desc: 'XP, leveling, skill trees, and unlock systems. Scalable architecture for long-term player engagement.',
    tags: ['DataStore', 'Progression', 'Modules'],
    size: 'small',
    gradient: 'from-indigo-900/30 to-dark-700',
  },
]

export default function Showcase() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = projects.filter(p => activeFilter === 'All' || p.category === activeFilter)

  return (
    <section id="showcase" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #060606 50%, #030303 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Work</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Systems I've{' '}
            <span className="text-gold-gradient">Engineered</span>
          </motion.h2>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-xs font-medium tracking-widest uppercase rounded-full border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-gold-400 text-dark-900 border-gold-400 font-bold'
                  : 'border-white/10 text-white/50 hover:border-gold-400/40 hover:text-white/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`group relative overflow-hidden rounded-sm border border-white/6 hover:border-gold-400/30 transition-all duration-500 cursor-default min-h-[220px] ${
                  project.size === 'large' && i % 3 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
                style={{ background: `linear-gradient(135deg, ${project.gradient.replace('from-', '').replace(' to-dark-700', '')}, #0A0A0A)` }}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-400" />

                {/* Hover gold glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

                {/* Content */}
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/8 text-white/50 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors duration-300">
                    {project.desc}
                  </p>
                </div>

                {/* Category badge */}
                <div className="absolute top-5 right-5">
                  <span className="text-[10px] px-3 py-1 rounded-full border border-gold-400/20 text-gold-400/70 font-medium tracking-wide bg-dark-900/60">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/30 text-sm mb-5">These are samples — every project I build is custom to your game.</p>
          <a href="#contact" className="btn-gold">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
