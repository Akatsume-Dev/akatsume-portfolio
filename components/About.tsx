'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Zap, Globe } from 'lucide-react'

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * end))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(end)
    }
    requestAnimationFrame(tick)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 3, suffix: '+', label: 'Years of Experience', icon: Code2 },
  { value: 50, suffix: '+', label: 'Projects Completed', icon: Zap },
  { value: 2, suffix: '', label: 'Languages Spoken', icon: Globe },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="relative section-padding">
      {/* Subtle BG accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left — text */}
          <div>
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold-400/60" />
              <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">About Me</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight mb-8">
              Not Just a{' '}
              <span className="text-gold-gradient">Scripter.</span>
              <br />A Craftsman.
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-5 text-white/60 leading-relaxed text-lg">
              <p>
                I'm <strong className="text-white font-semibold">Akatsume</strong> — a dedicated Roblox scripter with over 3 years of hands-on experience engineering the systems that make games exceptional. I don't write code for the sake of writing code; I build systems that <em className="text-gold-300 not-italic">players love</em> and <em className="text-gold-300 not-italic">clients trust</em>.
              </p>
              <p>
                From fluid gameplay loops and robust data persistence to polished UI frameworks and competitive multiplayer systems — I've shipped it all. My approach blends clean architecture with a deep understanding of what makes Roblox games feel premium.
              </p>
              <p>
                Based in the <strong className="text-white/80">Eastern timezone (ET)</strong>, I communicate fluently in both <strong className="text-white/80">French and English</strong>, ensuring crystal-clear collaboration with clients worldwide.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
              {['Lua / Luau', 'Roblox Studio', 'Game Design', 'Systems Architecture', 'ET Timezone'].map(tag => (
                <span key={tag} className="px-4 py-1.5 text-xs text-gold-300 border border-gold-400/20 rounded-full tracking-wide font-medium bg-gold-400/5">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — stats */}
          <div className="space-y-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="card-premium p-8 rounded-sm flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-sm border border-gold-400/20 bg-gold-400/5 flex items-center justify-center flex-shrink-0 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 transition-all duration-300">
                  <s.icon size={22} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-4xl font-black text-gold-gradient">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/50 text-sm mt-1 tracking-wide">{s.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.blockquote
              variants={itemVariants}
              className="relative pl-6 mt-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 to-transparent" />
              <p className="text-white/50 italic text-base leading-relaxed">
                "Every line of code I write is a commitment to quality. Your game deserves nothing less than the best."
              </p>
              <footer className="text-gold-400/60 text-xs mt-3 tracking-widest uppercase">— Akatsume</footer>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
