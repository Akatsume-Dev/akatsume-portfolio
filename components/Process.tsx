'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, FileText, Code2, TestTube, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Consultation',
    desc: 'We hop on a call or chat to discuss your vision, requirements, timeline, and budget. I ask the right questions so nothing gets missed.',
    duration: '~1 day',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Planning',
    desc: 'I map out the full system architecture, scope, and milestones. You receive a clear plan before a single line is written.',
    duration: '1–2 days',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development',
    desc: 'I build every system with precision , clean code, consistent patterns, and regular progress updates so you\'re never left wondering.',
    duration: 'Per project',
  },
  {
    icon: TestTube,
    number: '04',
    title: 'Testing',
    desc: 'Rigorous QA across edge cases, exploit attempts, and performance stress. Nothing ships until it\'s bulletproof.',
    duration: '1–3 days',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Delivery',
    desc: 'Clean handoff with full documentation, source files, and post-delivery support. Your game is ready to ship.',
    duration: 'Day of delivery',
  },
]

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="process" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Process</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            From Idea to{' '}
            <span className="text-gold-gradient">Launch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            A structured process that eliminates surprises and delivers results every time.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-gold-400/40 via-gold-400/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative flex gap-6 sm:gap-10 items-start group"
              >
                {/* Step indicator */}
                <div className="relative flex-shrink-0">
                  <div className={`w-14 h-14 rounded-sm border flex items-center justify-center transition-all duration-500 ${
                    inView
                      ? 'border-gold-400/40 bg-gold-400/8 group-hover:border-gold-400/70 group-hover:bg-gold-400/15'
                      : 'border-white/10 bg-white/4'
                  }`}>
                    <step.icon size={20} className="text-gold-400" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gold-400/20 to-transparent sm:hidden" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gold-400/50 tracking-widest">{step.number}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-gold-200 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <span className="text-xs text-white/30 font-mono whitespace-nowrap mt-0.5">{step.duration}</span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                  <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold-400/30 to-transparent transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
