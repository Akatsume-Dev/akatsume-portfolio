'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Zap, Crown, Star } from 'lucide-react'

const plans = [
  {
    icon: Zap,
    name: 'Starter',
    tagline: 'Perfect for small tasks',
    price: '$25',
    priceNote: 'Starting from',
    features: [
      'Single script or system',
      'Basic UI implementation',
      'Bug fixing (minor issues)',
      'Script optimization',
      'Up to 2 revisions',
      'Delivery within 2–3 days',
      'Basic documentation',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    icon: Crown,
    name: 'Advanced',
    tagline: 'Most popular choice',
    price: '$75',
    priceNote: 'Starting from',
    features: [
      'Everything in Starter',
      'Complex game systems',
      'Data saving & persistence',
      'Economy & shop systems',
      'Polished UI frameworks',
      'Up to 5 revisions',
      'Delivery within 5–7 days',
      'Full code documentation',
      'Post-delivery support (7 days)',
    ],
    cta: 'Hire Me Now',
    highlight: true,
  },
  {
    icon: Star,
    name: 'Premium',
    tagline: 'Full game development',
    price: '$150+',
    priceNote: 'Starting from',
    features: [
      'Everything in Advanced',
      'Complete game systems',
      'Multiplayer architecture',
      'Custom mechanics & tools',
      'Performance optimization',
      'Unlimited revisions',
      'Priority delivery',
      'Extended support (30 days)',
      'Source code ownership',
      'Private Discord channel',
    ],
    cta: 'Let\'s Talk',
    highlight: false,
  },
]

export default function Pricing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" className="relative section-padding">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)' }}
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
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Pricing</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Transparent{' '}
            <span className="text-gold-gradient">Pricing.</span>
            <br />Zero Surprises.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            Invest in quality once. These packages are guidelines , custom quotes available for any project scope.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-3 gap-6 items-stretch pt-6"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
              }}
              className={`relative rounded-sm flex flex-col overflow-hidden ${
                plan.highlight
                  ? 'border border-gold-400/40 shadow-gold-lg'
                  : 'border border-white/6'
              }`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(160deg, rgba(201,168,76,0.08) 0%, rgba(10,10,10,1) 50%)'
                  : 'rgba(10,10,10,0.9)',
              }}
            >
              {/* Most popular badge */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              )}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-[10px] font-bold tracking-widest uppercase bg-gold-gradient text-dark-900 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                    plan.highlight ? 'bg-gold-400/20 border border-gold-400/40' : 'bg-white/5 border border-white/10'
                  }`}>
                    <plan.icon size={18} className={plan.highlight ? 'text-gold-300' : 'text-white/60'} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">{plan.name}</div>
                    <div className="text-white/40 text-xs">{plan.tagline}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-1">{plan.priceNote}</div>
                  <div className={`text-5xl font-black ${plan.highlight ? 'text-gold-gradient' : 'text-white'}`}>
                    {plan.price}
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${plan.highlight ? 'bg-gradient-to-r from-transparent via-gold-400/40 to-transparent' : 'bg-white/6'}`} />

                {/* Features */}
                <ul className="space-y-3.5 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlight ? 'bg-gold-400/20' : 'bg-white/8'
                      }`}>
                        <Check size={9} className={plan.highlight ? 'text-gold-400' : 'text-white/50'} />
                      </div>
                      <span className="text-sm text-white/65 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block text-center py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm ${
                    plan.highlight
                      ? 'btn-gold'
                      : 'btn-outline-gold'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-10"
        >
          All prices are starting points. Complex projects are quoted individually.{' '}
          <a href="#contact" className="text-gold-400/70 hover:text-gold-400 underline underline-offset-4 transition-colors">
            Get a free quote →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
