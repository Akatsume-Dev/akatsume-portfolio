'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export type LightboxItem = { title: string; desc?: string; images: string[]; start?: number }

export default function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const pics = item?.images ?? []

  useEffect(() => {
    setIdx(item?.start ?? 0)
  }, [item])

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % pics.length)
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + pics.length) % pics.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, pics.length, onClose])

  const step = (d: number) => setIdx(i => (i + d + pics.length) % pics.length)

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white"
          >
            <X size={28} />
          </button>
          <motion.figure
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            className="max-w-6xl w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pics[idx]}
              alt={item.title}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
              onClick={e => e.stopPropagation()}
              className="w-full h-auto max-h-[78vh] object-contain rounded-sm cursor-default"
            />
            {pics.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-4" onClick={e => e.stopPropagation()}>
                <button type="button" aria-label="Previous" onClick={() => step(-1)} className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:border-gold-400 hover:text-gold-300 flex items-center justify-center">
                  <ChevronLeft size={18} />
                </button>
                <span className="text-white/60 text-sm tabular-nums">{idx + 1} / {pics.length}</span>
                <button type="button" aria-label="Next" onClick={() => step(1)} className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:border-gold-400 hover:text-gold-300 flex items-center justify-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            <figcaption className="text-center mt-4">
              <div className="text-white font-bold">{item.title}</div>
              {item.desc && <div className="text-white/50 text-sm max-w-2xl mx-auto">{item.desc}</div>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
