'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = [
  { name: 'Lua / Luau', level: 95, category: 'Language' },
  { name: 'Roblox Studio', level: 98, category: 'Platform' },
  { name: 'Game Systems', level: 92, category: 'Speciality' },
  { name: 'Data Persistence', level: 90, category: 'Backend' },
  { name: 'UI Systems', level: 88, category: 'Frontend' },
  { name: 'Multiplayer', level: 85, category: 'Network' },
  { name: 'Optimization', level: 87, category: 'Performance' },
  { name: 'Custom Mechanics', level: 93, category: 'Creative' },
]


function SkillBar({ skill, index, inView }: { skill: typeof skills[0]; index: number; inView: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-sm">{skill.name}</span>
          <span className="text-[10px] text-white/30 font-mono tracking-wide">{skill.category}</span>
        </div>
        <span className="text-gold-400 text-sm font-bold font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #8B6914, #C9A84C, #E4C76B)' }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #050505 50%, #030303 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
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
            Mastery, Not{' '}
            <span className="text-gold-gradient">Mediocrity</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-20">
          {/* Skill bars */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/50 text-xs tracking-widest uppercase mb-8 font-medium"
            >
              Proficiency Levels
            </motion.h3>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                >
                  <SkillBar skill={skill} index={i} inView={inView} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience badge */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full p-8 rounded-sm border border-gold-400/20 bg-gold-400/4"
            >
              <div className="text-gold-400 text-xs tracking-widest uppercase mb-2 font-medium">Total Experience</div>
              <div className="text-6xl font-black text-gold-gradient mb-1">3+ Years</div>
              <div className="text-white/40 text-sm">of professional Roblox scripting</div>
              <div className="gold-line mt-6" />
              <div className="flex gap-8 mt-6">
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
        </div>
      </div>
    </section>
  )
}
