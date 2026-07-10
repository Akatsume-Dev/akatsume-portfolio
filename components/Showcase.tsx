'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Code2, Layers, Cpu } from 'lucide-react'

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (inView) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [inView])

  return (
    <video
      ref={(el) => {
        (ref as any).current = el
        inViewRef(el)
      }}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover"
      src={src}
    />
  )
}

const filters = ['All', 'Gameplay', 'UI Systems', 'Multiplayer', 'Economy']

type Project = {
  id: number
  title: string
  category: string
  desc: string
  tags: string[]
  size: string
  gradient: string
  video?: string  // path to video in /public/videos/ e.g. '/videos/combat.mp4'
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Combat System',
    category: 'Gameplay',
    desc: 'Smooth combo-based combat with hitbox detection, VFX, and server-authoritative damage.',
    tags: ['Lua', 'RemoteEvents', 'Hitbox', 'Animation'],
    size: 'large',
    gradient: 'from-purple-900/40 to-dark-700',
    video: '/videos/Simple combat system.mp4',
  },
  {
    id: 2,
    title: 'Fireball Ability',
    category: 'Gameplay',
    desc: 'Projectile ability system with physics, collision detection, and VFX on impact.',
    tags: ['Lua', 'Physics', 'VFX', 'RemoteEvents'],
    size: 'small',
    gradient: 'from-orange-900/40 to-dark-700',
    video: '/videos/Fireball.mp4',
  },
  {
    id: 3,
    title: '2D Movement System',
    category: 'Gameplay',
    desc: 'Custom 2D stickman movement with animations, state machine, and responsive controls.',
    tags: ['Lua', 'Animation', 'Character'],
    size: 'small',
    gradient: 'from-purple-900/30 to-dark-700',
    video: '/videos/2D-Stickman Movement System.mp4',
  },
  {
    id: 4,
    title: 'Menu System',
    category: 'UI Systems',
    desc: 'Polished main menu with animated transitions, settings panel, and responsive layout.',
    tags: ['TweenService', 'GUI', 'UX'],
    size: 'small',
    gradient: 'from-blue-900/40 to-dark-700',
    video: '/videos/Simple menu system.mp4',
  },
  {
    id: 5,
    title: 'Leaderboard UI',
    category: 'UI Systems',
    desc: 'Live-updating leaderboard with ranked entries, animations, and DataStore persistence.',
    tags: ['GUI', 'DataStore', 'Ranking'],
    size: 'small',
    gradient: 'from-gold-900/30 to-dark-700',
    video: '/videos/Leaderbord UI.mp4',
  },
  {
    id: 6,
    title: 'NPC System',
    category: 'Gameplay',
    desc: 'Smart NPC with pathfinding, patrol states, aggro detection, and combat behavior.',
    tags: ['Pathfinding', 'AI', 'State Machine'],
    size: 'large',
    gradient: 'from-emerald-900/30 to-dark-700',
    video: '/videos/NPC System.mp4',
  },
  {
    id: 7,
    title: 'NPC Walking System',
    category: 'Gameplay',
    desc: 'Lightweight NPC walker with waypoint routing and smooth animation blending.',
    tags: ['Pathfinding', 'Animation', 'Lua'],
    size: 'small',
    gradient: 'from-teal-900/30 to-dark-700',
    video: '/videos/Simple NPC Walking System.mp4',
  },
  {
    id: 8,
    title: 'Guess A Word',
    category: 'Multiplayer',
    desc: 'Full multiplayer word-guessing game with rounds, scoring, skin system, and practice mode.',
    tags: ['Multiplayer', 'Round System', 'DataStore'],
    size: 'large',
    gradient: 'from-indigo-900/30 to-dark-700',
    video: '/videos/Guess A Word Gameplay.mp4',
  },
  {
    id: 9,
    title: 'Guess A Word Skins',
    category: 'Economy',
    desc: 'Cosmetic skin system with unlockable items, previews, and DataStore persistence.',
    tags: ['DataStore', 'GUI', 'Economy'],
    size: 'small',
    gradient: 'from-pink-900/30 to-dark-700',
    video: '/videos/Guess A Word Skin System.mp4',
  },
  {
    id: 10,
    title: 'Steal A Card',
    category: 'Multiplayer',
    desc: 'Card-stealing party game with turn logic, player interaction, and win conditions.',
    tags: ['Multiplayer', 'Game Logic', 'Lua'],
    size: 'small',
    gradient: 'from-rose-900/30 to-dark-700',
    video: '/videos/Steal A Card System.mp4',
  },
  {
    id: 11,
    title: 'NPC Interaction',
    category: 'Gameplay',
    desc: 'Full NPC interaction system with dialogue, proximity detection, and branching responses.',
    tags: ['NPC', 'Dialogue', 'Proximity', 'Lua'],
    size: 'large',
    gradient: 'from-cyan-900/30 to-dark-700',
    video: '/videos/NPC Interaction.mp4',
  },
  {
    id: 12,
    title: 'Admin Panel System',
    category: 'UI Systems',
    desc: 'In-game admin panel with player management, moderation tools, and live server controls.',
    tags: ['Admin', 'GUI', 'Moderation', 'Lua'],
    size: 'large',
    gradient: 'from-slate-900/40 to-dark-700',
    video: '/videos/Admin System.mp4',
  },
  {
    id: 13,
    title: 'Pull Skill',
    category: 'Gameplay',
    desc: 'Ability that pulls nearby players or objects toward a target point with physics and visual feedback.',
    tags: ['Ability', 'Physics', 'VFX', 'Lua'],
    size: 'small',
    gradient: 'from-violet-900/40 to-dark-700',
    video: '/videos/Pull Skill.mp4',
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
                {/* Video background (shown when video path is set) */}
                {project.video && <LazyVideo src={project.video} />}

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent transition-opacity duration-400 ${project.video ? 'opacity-80 group-hover:opacity-90' : 'opacity-70 group-hover:opacity-90'}`} />

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
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  {project.video && (
                    <span className="text-[10px] px-2 py-1 rounded-full border border-white/20 text-white/60 font-medium bg-dark-900/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                      DEMO
                    </span>
                  )}
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
          <p className="text-white/30 text-sm mb-2">These are samples — every project I build is custom to your game.</p>
          <p className="text-white/20 text-xs mb-5">Note: I only wrote the scripts shown. The maps, buildings, VFX, animations, and models are not my work.</p>
          <a href="#contact" className="btn-gold">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
