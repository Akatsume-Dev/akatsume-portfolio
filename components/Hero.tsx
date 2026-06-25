'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

/* ─── Particle canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Particle = {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; gold: boolean; life: number; maxLife: number
    }

    const particles: Particle[] = []
    const count = 120

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 9999,
        y: Math.random() * 9999,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.1),
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        gold: Math.random() < 0.3,
        life: Math.random() * 9999,
        maxLife: Math.random() * 400 + 200,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        const fade = Math.min(p.life / 60, 1) * Math.min((p.maxLife - p.life) / 60, 1)
        const alpha = p.opacity * Math.max(fade, 0)

        ctx.beginPath()
        ctx.arc(p.x % w, p.y % (h + 100) - 50, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.gold
          ? `rgba(201,168,76,${alpha})`
          : `rgba(255,255,255,${alpha * 0.4})`
        ctx.fill()

        if (p.life >= p.maxLife) {
          p.x = Math.random() * w
          p.y = h + 20
          p.life = 0
          p.maxLife = Math.random() * 400 + 200
        }
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

/* ─── Gold light streaks ─── */
function GoldStreaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {[15, 35, 55, 70, 85].map((left, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${left}%`,
            background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(228,199,107,0.3) 50%, rgba(201,168,76,0.15) 70%, transparent 100%)',
            animation: `beam ${4 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`,
            transformOrigin: 'top',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Hero ─── */
const titleWords = ['ELITE', 'ROBLOX', 'SCRIPTER']

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 })

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.012)
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.012)
  }

  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Deep background */}
      <div className="absolute inset-0 bg-dark-900" />

      {/* Radial gold glow — center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #030303, transparent)', zIndex: 5 }}
      />

      <ParticleCanvas />
      <GoldStreaks />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 orb bg-gold-400/5 animate-float" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 orb bg-gold-400/4 animate-float-delay" style={{ zIndex: 1 }} />

      {/* Content */}
      <motion.div
        className="relative text-center px-6 max-w-6xl mx-auto"
        style={{ x: springX, y: springY, zIndex: 10 }}
      >
        {/* Badge */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold-400/25 bg-gold-400/5"
          >
            <Sparkles size={12} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-medium tracking-widest uppercase">
              Available for Projects
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>
        )}

        {/* Name */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4"
          >
            <span
              className="block text-[clamp(1rem,3vw,1.25rem)] font-light tracking-[0.4em] uppercase text-white/40 mb-4"
            >
              Introducing
            </span>
            <h1 className="text-[clamp(4rem,14vw,11rem)] font-black leading-none tracking-tight text-gold-shimmer select-none">
              AKATSUME
            </h1>
          </motion.div>
        )}

        {/* Title words */}
        {mounted && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                className="text-[clamp(1.2rem,4vw,2.5rem)] font-bold tracking-widest uppercase text-white/80"
              >
                {i < titleWords.length - 1 ? (
                  <>{word} <span className="text-gold-400/40">·</span></>
                ) : word}
              </motion.span>
            ))}
          </div>
        )}

        {/* Tagline */}
        {mounted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[clamp(0.9rem,2vw,1.15rem)] text-white/50 max-w-xl mx-auto leading-relaxed mb-4 font-light"
          >
            3 years crafting premium game systems, immersive UI, and elite mechanics for Roblox experiences players never forget.
          </motion.p>
        )}

        {/* Gold divider */}
        {mounted && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="gold-line max-w-xs mx-auto mb-10"
          />
        )}

        {/* CTAs */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#contact" className="btn-gold relative z-10 animate-pulse-gold">
              <span className="relative z-10">Hire Me Now</span>
            </a>
            <a href="#showcase" className="btn-outline-gold">
              View My Work
            </a>
          </motion.div>
        )}

        {/* Stats */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex justify-center gap-12 mt-16"
          >
            {[
              { num: '3+', label: 'Years Exp.' },
              { num: '50+', label: 'Projects Done' },
              { num: '100%', label: 'Satisfaction' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-gold-gradient">{s.num}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-gold-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
