'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How much do your services cost?',
    a: 'Pricing depends on the complexity and scope of your project. Simple scripts start from $25, advanced systems from $75, and full game development from $150+. Contact me for a free, no-obligation quote tailored to your exact needs.',
  },
  {
    q: 'How long does a project take?',
    a: 'Timelines vary based on complexity. A single script can be ready in 24–48 hours. A full game system typically takes 3–7 days. I always give you a realistic estimate upfront — and I stick to it.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Absolutely. Starter packages include up to 2 revisions, Advanced includes up to 5, and Premium includes unlimited revisions until you\'re fully satisfied. My goal is your complete satisfaction.',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'I\'m available on Discord for real-time updates and questions. I provide daily progress updates on active projects and typically respond within a few hours. Zero ghosting — ever.',
  },
  {
    q: 'How do payments work?',
    a: 'I accept payments via PayPal or other agreed-upon methods. For larger projects, I typically work with a 50% upfront payment and 50% on delivery. For smaller projects, full payment upfront is standard.',
  },
  {
    q: 'Can you work with an existing game\'s codebase?',
    a: 'Yes. I can work with existing games, clean up legacy code, add new systems on top of what\'s already there, or fix persistent bugs. I take time to understand your existing architecture before making changes.',
  },
  {
    q: 'Do I get the source code?',
    a: 'Yes — on all packages, you receive full ownership of the source code upon final payment. I don\'t retain backdoors or obfuscate scripts.',
  },
  {
    q: 'Do you speak French?',
    a: 'Oui ! Je parle couramment le français et l\'anglais. Vous pouvez me contacter dans la langue que vous préférez.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      className={`border rounded-sm transition-all duration-300 ${
        open ? 'border-gold-400/30 bg-gold-400/4' : 'border-white/6 hover:border-white/12'
      }`}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <span className={`font-semibold text-sm leading-snug transition-colors duration-300 ${
          open ? 'text-gold-200' : 'text-white/85 group-hover:text-white'
        }`}>
          {faq.q}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-sm border flex items-center justify-center transition-all duration-300 ${
          open ? 'border-gold-400/40 bg-gold-400/10 rotate-0' : 'border-white/10 bg-white/4'
        }`}>
          {open
            ? <Minus size={12} className="text-gold-400" />
            : <Plus size={12} className="text-white/50" />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-gradient-to-r from-gold-400/20 to-transparent mb-4" />
              <p className="text-white/55 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative section-padding">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">FAQ</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Got{' '}
            <span className="text-gold-gradient">Questions?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4"
          >
            Everything you need to know before we work together.
          </motion.p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-4">Still have a question?</p>
          <a href="#contact" className="btn-outline-gold">
            Ask Me Directly
          </a>
        </motion.div>
      </div>
    </section>
  )
}
