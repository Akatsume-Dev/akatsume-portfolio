'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, Images } from 'lucide-react'
import Lightbox, { LightboxItem } from './Lightbox'

type Build = { title: string; desc: string; tags: string[]; image: string; images?: string[] }

const builds: Build[] = [
  {
    title: "Dragon's Rest",
    desc: 'Frozen canyon built around a giant dragon skeleton, with ice cliffs, rope bridges, torch-lit paths, and northern lights.',
    tags: ['Map', 'Fantasy', 'Environment', 'Lighting'],
    image: '/builds/dragons-rest.jpg',
  },
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
  {
    title: 'Market Village',
    desc: 'Colorful medieval village with timber-frame houses, a blacksmith and armory, market stalls, a well, and festival bunting.',
    tags: ['Map', 'Medieval', 'Stylized', 'Town'],
    image: '/builds/market-village.jpg',
  },
  {
    title: 'Grand Hall',
    desc: 'Victorian manor hall with a crystal chandelier, grand staircase, upper balcony, checkered marble floor, and warm candlelight.',
    tags: ['Interior', 'Victorian', 'Lighting', 'Architecture'],
    image: '/builds/grand-hall.jpg',
  },
  {
    title: 'Ancient Battleground',
    desc: 'Open arena on a ruined stone plaza, with torch-lit pillars, banner gates, waterfalls, and cliffs, made for PvP fights.',
    tags: ['Battleground', 'Map', 'PvP', 'Ruins'],
    image: '/builds/ancient-battleground.jpg',
  },
  {
    title: 'Midnight Camp',
    desc: 'Horror forest camp at night, with floodlights cutting through fog, a water tower, tents, rusty barrels, and a gated path.',
    tags: ['Horror', 'Map', 'Atmosphere', 'Lighting'],
    image: '/builds/midnight-camp-1.jpg',
    images: ['/builds/midnight-camp-1.jpg', '/builds/midnight-camp-2.jpg', '/builds/midnight-camp-3.jpg'],
  },
]

const AUTO_MS = 6000

export default function Builds() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const [box, setBox] = useState<LightboxItem | null>(null)
  const b = builds[cur]
  const n = builds.length

  const go = useCallback((d: number) => setCur(c => (c + d + n) % n), [n])

  useEffect(() => {
    if (paused || box) return
    const t = setTimeout(() => go(1), AUTO_MS)
    return () => clearTimeout(t)
  }, [cur, paused, box, go])

  const openBox = () => setBox({ title: b.title, desc: b.desc, images: b.images ?? [b.image] })

  return (
    <section id="builds" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #070605 50%, #030303 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header: left-aligned, with counter on the right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gold-400/60" />
              <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Building</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
            >
              Worlds I've <span className="text-gold-gradient">Built</span>
            </motion.h2>
            <p className="text-white/50 text-lg mt-3 max-w-xl">
              Maps, scenes and interiors made in Blender. 2 years of building, all my own work.
            </p>
          </div>
          <div className="font-mono text-white/40 text-sm tabular-nums">
            <span className="text-gold-300 text-3xl font-black">{String(cur + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            {String(n).padStart(2, '0')}
          </div>
        </div>

        {/* Cinematic stage */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-sm border border-white/8 bg-black group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={b.image}
              src={b.image}
              alt={b.title}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              onClick={openBox}
              className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            />
          </AnimatePresence>

          {/* Progress segments */}
          <div className="absolute top-0 inset-x-0 flex gap-1 p-3 z-10">
            {builds.map((x, i) => (
              <div key={x.title} className="h-0.5 flex-1 bg-white/15 overflow-hidden rounded-full">
                {i < cur && <div className="h-full w-full bg-gold-400/70" />}
                {i === cur && (
                  <motion.div
                    key={cur + (paused || box ? '-p' : '')}
                    className="h-full bg-gold-400"
                    initial={{ width: '0%' }}
                    animate={{ width: paused || box ? '0%' : '100%' }}
                    transition={{ duration: paused || box ? 0 : AUTO_MS / 1000, ease: 'linear' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 bottom-0 p-5 sm:p-8 lg:p-10 max-w-2xl"
            >
              <div className="mb-3 hidden sm:flex flex-wrap gap-1.5">
                {b.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-white/70 font-mono">{t}</span>
                ))}
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">{b.title}</h3>
              <p className="hidden sm:block text-white/65 text-sm lg:text-base leading-relaxed">{b.desc}</p>
              <button
                type="button"
                onClick={openBox}
                className="pointer-events-auto mt-4 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold-300 hover:text-gold-200"
              >
                {b.images && b.images.length > 1 ? <Images size={14} /> : <Maximize2 size={14} />}
                {b.images && b.images.length > 1 ? `View ${b.images.length} photos` : 'View full size'}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous build"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/15 text-white/80 hover:border-gold-400 hover:text-gold-300 hidden sm:flex items-center justify-center z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next build"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/15 text-white/80 hover:border-gold-400 hover:text-gold-300 hidden sm:flex items-center justify-center z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Filmstrip */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
          {builds.map((x, i) => (
            <button
              key={x.title}
              type="button"
              onClick={() => setCur(i)}
              className={`relative shrink-0 snap-start w-32 sm:w-40 aspect-video overflow-hidden rounded-sm border transition-all duration-300 ${
                i === cur ? 'border-gold-400 opacity-100' : 'border-white/10 opacity-50 hover:opacity-90'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.image} alt={x.title} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 px-2 py-1 text-[10px] text-left text-white/85 bg-gradient-to-t from-black/90 to-transparent truncate">
                {x.title}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-gold">Order a Build</a>
        </div>
      </div>

      <Lightbox item={box} onClose={() => setBox(null)} />
    </section>
  )
}
