'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #050505 50%, #030303 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Expertise</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Skills I Use{' '}
            <span className="text-gold-gradient">Every Day</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto p-8 rounded-sm border border-gold-400/20 bg-gold-400/4"
        >
          <div className="text-gold-400 text-xs tracking-widest uppercase mb-2 font-medium">Total Experience</div>
          <div className="text-6xl font-black text-gold-gradient mb-1">3+ Years</div>
          <div className="text-white/40 text-sm">of Roblox scripting</div>
          <div className="gold-line mt-6" />
          <div className="flex gap-12 mt-6">
            <div>
              <div className="text-white font-bold text-lg">ET</div>
              <div className="text-white/30 text-xs mt-0.5">Timezone</div>
            </div>
            <div>
              <div className="text-white font-bold text-lg">FR / EN</div>
              <div className="text-white/30 text-xs mt-0.5">Languages</div>
            </div>
            <div>
              <div className="text-white font-bold text-lg">24-48h</div>
              <div className="text-white/30 text-xs mt-0.5">Response Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
