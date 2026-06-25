'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShieldCheck, MessageCircle, Cpu, Star, Clock, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Reliability You Can Count On',
    desc: 'Deadlines are sacred. I deliver clean, working code on time, every time , no excuses, no surprises.',
  },
  {
    icon: MessageCircle,
    title: 'Crystal-Clear Communication',
    desc: 'You\'ll always know the status of your project. Regular updates, fast responses, zero ghosting.',
  },
  {
    icon: Cpu,
    title: 'Optimized Code Performance',
    desc: 'Scripts engineered for minimal lag, maximum efficiency. Your players will feel the difference.',
  },
  {
    icon: Star,
    title: 'Uncompromising Quality',
    desc: 'Every system is built to production standards , clean, commented, maintainable, and scalable.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Speed without sacrificing quality. I work efficiently so you can ship sooner.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Mindset',
    desc: 'Your success is my success. I\'m not done until you\'re fully satisfied with the result.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}

export default function WhyChooseMe() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Why Akatsume</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            The Standard{' '}
            <span className="text-gold-gradient">Others Chase.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            Hundreds of Roblox scripters exist. Here's why smart clients choose me.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              variants={cardVariants}
              className="card-premium p-8 rounded-sm group cursor-default"
            >
              {/* Icon */}
              <div className="mb-6 relative w-12 h-12">
                <div className="absolute inset-0 rounded-sm bg-gold-400/10 group-hover:bg-gold-400/20 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <r.icon size={20} className="text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-200 transition-colors duration-300">
                {r.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {r.desc}
              </p>

              {/* Bottom gold accent on hover */}
              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold-400/60 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
