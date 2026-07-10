'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Gamepad2, LayoutDashboard, Database, Coins, Wrench, Users, Bug, Gauge } from 'lucide-react'

const services = [
  { icon: Code2, title: 'Roblox Scripting', desc: 'Custom Lua/Luau scripts built for your game. Clean, organized, easy to build on top of.', tag: 'Core' },
  { icon: Gamepad2, title: 'Gameplay Systems', desc: 'Combat, round systems, objectives, ability frameworks. Systems that feel good to play.', tag: 'Popular' },
  { icon: LayoutDashboard, title: 'UI Systems', desc: 'Clean, animated interfaces. Inventory, HUDs, menus, shops. Works on all screen sizes.', tag: 'Popular' },
  { icon: Database, title: 'Data Saving Systems', desc: 'Solid DataStore setup with session locking, backups, and retry logic. Player data that does not get lost.', tag: 'Core' },
  { icon: Coins, title: 'Economy Systems', desc: 'Currency, shops, trading, progression. Balanced so players keep coming back without feeling cheated.', tag: 'Advanced' },
  { icon: Wrench, title: 'Custom Mechanics', desc: 'Weapons, vehicles, pets, tools, building systems. If you can describe it, I can script it.', tag: 'Custom' },
  { icon: Users, title: 'Multiplayer Systems', desc: 'Teams, matchmaking, lobbies, spectating. Handles multiple players without falling apart.', tag: 'Advanced' },
  { icon: Bug, title: 'Bug Fixing', desc: 'Something broken and you cannot find where? I track it down and fix it, no matter how buried it is.', tag: 'Support' },
  { icon: Gauge, title: 'Optimization', desc: 'High lag, low FPS? I go through the scripts, find what is heavy, and clean it up.', tag: 'Premium' },
]

const tagColors: Record<string, string> = {
  Core: 'border-blue-400/30 text-blue-300 bg-blue-400/5',
  Popular: 'border-gold-400/40 text-gold-300 bg-gold-400/8',
  Advanced: 'border-purple-400/30 text-purple-300 bg-purple-400/5',
  Custom: 'border-emerald-400/30 text-emerald-300 bg-emerald-400/5',
  Support: 'border-rose-400/30 text-rose-300 bg-rose-400/5',
  Premium: 'border-gold-400/60 text-gold-200 bg-gold-400/10',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="services" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #030303 0%, #060606 50%, #030303 100%)' }}
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
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Services</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            What I{' '}
            <span className="text-gold-gradient">Build For You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            From a single script to a complete game , I handle every layer of Roblox development.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              className="card-premium p-7 rounded-sm group relative overflow-hidden cursor-default"
            >
              {/* Hover BG glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

              {/* Tag */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-sm border border-gold-400/15 bg-gold-400/5 flex items-center justify-center group-hover:border-gold-400/40 group-hover:scale-110 transition-all duration-300">
                  <s.icon size={18} className="text-gold-400" />
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium tracking-wider uppercase ${tagColors[s.tag]}`}>
                  {s.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-3 group-hover:text-gold-200 transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-white/40 text-sm mb-5">Don't see exactly what you need?</p>
          <a href="#contact" className="btn-outline-gold">
            Let's Talk About Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
