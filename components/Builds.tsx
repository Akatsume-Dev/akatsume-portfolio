'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type Build = { title: string; desc: string; tags: string[]; image: string }

const builds: Build[] = [
  {
    title: 'Neon Arena',
    desc: 'Cyberpunk combat arena with neon lighting, tiered stands, cover props, and a glowing central platform.',
    tags: ['Environment', 'Lighting', 'Sci-Fi'],
    image: '/builds/neon-arena.jpg',
  },
  {
    title: 'Volcano Fortress',
    desc: 'Dark fortress surrounded by lava, with towers, chained walkways, and a rune-circle courtyard.',
    tags: ['Map', 'Fantasy', 'Architecture'],
    image: '/builds/volcano-fortress.jpg',
  },
  {
    title: 'Blood Moon Isles',
    desc: 'Floating gothic islands under a blood moon, with a castle, graveyards, bridges, and lava falls.',
    tags: ['Map', 'Gothic', 'Atmosphere'],
    image: '/builds/blood-moon-isles.jpg',
  },
  {
    title: 'Asteroid Station',
    desc: 'Space base built into an asteroid, with docking arms, ships, a landing pad, and lit towers.',
    tags: ['Sci-Fi', 'Modeling', 'Environment'],
    image: '/builds/asteroid-station.jpg',
  },
]

export default function Builds() {
  const [open, setOpen] = useState<Build | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="builds" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #070605 50%, #030303 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Builds</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Worlds I've{' '}
            <span className="text-gold-gradient">Built</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            Maps and models I made in Blender. 2 years of building, all my own work.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {builds.map((b, i) => (
            <motion.button
              key={b.title}
              type="button"
              onClick={() => setOpen(b)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="group relative text-left overflow-hidden rounded-sm border border-white/6 hover:border-gold-400/30 transition-colors duration-500 aspect-[16/9]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {b.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-dark-900/70 text-white/70 font-mono">{t}</span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-gold-200 transition-colors">{b.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{b.desc}</p>
              </div>
              <span className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full border border-gold-400/30 text-gold-300 bg-dark-900/70 tracking-wide">
                Blender
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/30 text-sm mb-5">Click any build to view it full size.</p>
          <a href="#contact" className="btn-gold">Order a Build</a>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>
            <motion.figure
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-6xl w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.image} alt={open.title} className="w-full h-auto max-h-[80vh] object-contain rounded-sm" />
              <figcaption className="text-center mt-4">
                <div className="text-white font-bold">{open.title}</div>
                <div className="text-white/50 text-sm">{open.desc}</div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
