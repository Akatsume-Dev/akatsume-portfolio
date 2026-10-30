'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import Lightbox, { LightboxItem } from './Lightbox'

type Model = { name: string; type: string; desc: string; tags: string[]; images: string[] }

const views = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/models/${slug}-${i + 1}.jpg`)

const models: Model[] = [
  {
    name: 'Runeblade',
    type: 'Weapon',
    desc: 'Fantasy longsword with a glowing rune channel, gem-set crossguard, wrapped grip and a torn cloth tassel.',
    tags: ['Fantasy', 'Emissive Runes', 'Textured'],
    images: views('runeblade', 4),
  },
  {
    name: 'Crystal Paladin Armor',
    type: 'Armor',
    desc: 'Engraved silver chestplate and pauldrons with blue crystal insets, rivets and filigree, fitted to the Roblox avatar.',
    tags: ['Engraved', 'Avatar Fit', 'Metal'],
    images: views('paladin-armor', 5),
  },
  {
    name: 'Linen Cape',
    type: 'Clothing',
    desc: 'Draped cloth cape with a cowl, stitched trim and soft fabric folds, sized for the Roblox avatar.',
    tags: ['Cloth', 'Avatar Fit', 'Stitch Detail'],
    images: views('linen-cape', 4),
  },
  {
    name: 'Black Lacquer Katana',
    type: 'Weapon',
    desc: 'Katana with a wavy hamon blade, gold habaki, patterned tsuba, wrapped handle and a matching black scabbard.',
    tags: ['Japanese', 'Gold Detail', 'Textured'],
    images: views('katana', 4),
  },
  {
    name: 'Horned Stalker',
    type: 'Creature',
    desc: 'Sculpted horror creature with a spiked horn crown, six glowing eyes, a jaw full of teeth, scaled skin, long clawed arms and a spined tail.',
    tags: ['Sculpted', 'Horror', 'Emissive Eyes'],
    images: views('horned-stalker', 7),
  },
]

export default function Models() {
  const [sel, setSel] = useState(0)
  const [view, setView] = useState(0)
  const [box, setBox] = useState<LightboxItem | null>(null)
  const m = models[sel]

  const pick = (i: number) => {
    setSel(i)
    setView(0)
  }

  return (
    <section id="models" className="relative section-padding">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header: right-aligned */}
        <div className="mb-12 lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center lg:justify-end gap-3 mb-6"
          >
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Modeling</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Models I've <span className="text-gold-gradient">Crafted</span>
          </motion.h2>
          <p className="text-white/50 text-lg mt-3 max-w-xl lg:ml-auto">
            Weapons, armor and accessories modeled and textured in Blender. 2 years of modeling, ready for Roblox.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-10">
          {/* Model index */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {models.map((x, i) => (
              <button
                key={x.name}
                type="button"
                onClick={() => pick(i)}
                className={`group shrink-0 text-left flex items-center gap-4 px-4 py-4 lg:py-5 rounded-sm border transition-all duration-300 ${
                  i === sel
                    ? 'border-gold-400/50 bg-gold-400/[0.06]'
                    : 'border-white/6 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <span className={`font-mono text-sm ${i === sel ? 'text-gold-400' : 'text-white/25'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className={`block font-bold whitespace-nowrap lg:whitespace-normal ${i === sel ? 'text-white' : 'text-white/60 group-hover:text-white/85'}`}>
                    {x.name}
                  </span>
                  <span className="block text-[11px] tracking-widest uppercase text-white/35 mt-0.5">
                    {x.type} · {x.images.length} views
                  </span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.images[0]} alt="" draggable={false} className="hidden lg:block w-14 h-10 object-cover rounded-sm opacity-80" />
              </button>
            ))}
          </div>

          {/* Studio viewer */}
          <div className="rounded-sm border border-white/8 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 30%, #3a3b40 0%, #1b1c1f 60%, #0d0d0f 100%)' }}>
            <div className="relative aspect-[4/3] overflow-hidden cursor-zoom-in" onClick={() => setBox({ title: m.name, desc: m.desc, images: m.images, start: view })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.images[view]} alt="" aria-hidden draggable={false} className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={m.images[view]}
                  src={m.images[view]}
                  alt={`${m.name} view ${view + 1}`}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </AnimatePresence>
              <span className="absolute top-4 left-4 text-[10px] px-3 py-1 rounded-full border border-gold-400/30 text-gold-300 bg-black/60 tracking-wide">
                {m.type}
              </span>
              <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white/70 flex items-center justify-center">
                <Maximize2 size={15} />
              </span>
            </div>

            {/* Angle thumbnails */}
            <div className="flex gap-2 px-4 pt-4 overflow-x-auto">
              {m.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setView(i)}
                  aria-label={`View ${i + 1}`}
                  className={`shrink-0 w-20 sm:w-24 aspect-[4/3] overflow-hidden rounded-sm border transition-all ${
                    i === view ? 'border-gold-400' : 'border-white/10 opacity-55 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" draggable={false} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Spec panel */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-2xl font-black text-white mb-1">{m.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{m.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {['Blender', ...m.tags, 'Roblox-ready'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/8 text-white/60 font-mono whitespace-nowrap">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/30 text-sm mb-5">Click the render to view every angle full size.</p>
          <a href="#contact" className="btn-gold">Order a Model</a>
        </div>
      </div>

      <Lightbox item={box} onClose={() => setBox(null)} />
    </section>
  )
}
