'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How much do your services cost?',
    a: 'Depends on what you need. Simple scripts start from $25, larger systems from $75, full game dev from $150+. Send me a message and I will give you a straight price.',
  },
  {
    q: 'How long does a project take?',
    a: 'A single script can be done in 24-48 hours. A full system usually takes 3-7 days. I give you a realistic time frame before starting and I stick to it.',
  },
  {
    q: 'Do you offer revisions?',
    a: 'Yes. Starter gets 2 revisions, Advanced gets 5, Premium is unlimited. If something is not right, I fix it.',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'Discord. I give updates without you having to ask and reply fast. No ghosting.',
  },
  {
    q: 'How do payments work?',
    a: 'PayPal or other methods we agree on. Bigger projects are 50% upfront and 50% on delivery. Smaller ones are usually full payment upfront.',
  },
  {
    q: 'Can you work with an existing codebase?',
    a: 'Yes. I can add to what is already there, clean things up, or fix bugs. I look at the existing code first before touching anything.',
  },
  {
    q: 'Do I get the source code?',
    a: 'Yes, on every package. Full ownership once paid. No obfuscation, no backdoors.',
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
