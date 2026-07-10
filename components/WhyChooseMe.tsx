'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, MessageCircle, Cpu, Star, Clock, HeartHandshake } from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'I Deliver on Time', desc: 'I set a deadline and I stick to it. If something comes up, I tell you early. No last-minute surprises.' },
  { icon: MessageCircle, title: 'I Keep You Updated', desc: 'You will know where things are at without having to ask. Fast replies, no ghosting.' },
  { icon: Cpu, title: 'Code That Actually Runs', desc: 'Low lag, no memory leaks. I test before I send. Your players should not feel the backend.' },
  { icon: Star, title: 'Clean Code', desc: 'Readable, organized, easy to build on. Not just something that works once and breaks later.' },
  { icon: Clock, title: 'Fast Without Cutting Corners', desc: 'I work at a solid pace. Faster than most, but I do not rush things that should not be rushed.' },
  { icon: HeartHandshake, title: 'I Fix What Is Wrong', desc: 'If something is off after delivery, I sort it out. I do not disappear once payment is done.' },
]

export default function WhyChooseMe() {
  return (
    <section className="relative section-padding">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Why Akatsume</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
            >
              Why Clients{' '}
              <span className="text-gold-gradient">Keep Coming Back</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-sm lg:text-right lg:pb-2 max-w-xs"
            >
              A lot of scripters are out there. Here is what makes working with me different.
            </motion.p>
          </div>
        </div>

        {/* Typographic list — no boxes */}
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="group grid grid-cols-[2.5rem_1fr] lg:grid-cols-[3.5rem_1.2fr_1.8fr] items-start lg:items-center gap-x-6 gap-y-1 py-6 border-b border-white/6 hover:border-gold-400/25 transition-colors duration-300"
          >
            <span className="text-sm font-mono text-white/20 group-hover:text-gold-400/50 transition-colors duration-300 pt-1 lg:pt-0">
              {String(i + 1).padStart(2, '0')}
            </span>

            <h3 className="text-[clamp(1rem,2.2vw,1.35rem)] font-bold text-white group-hover:text-gold-100 transition-colors duration-300 leading-snug">
              {r.title}
            </h3>

            <p className="col-start-2 lg:col-start-3 text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
              {r.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  )
}
