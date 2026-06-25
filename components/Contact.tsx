'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Clock, Globe, CheckCircle } from 'lucide-react'

const projectTypes = [
  'Gameplay System',
  'UI / Interface',
  'Data & Economy',
  'Multiplayer System',
  'Bug Fix',
  'Optimization',
  'Full Game Dev',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. DM me on Discord instead: _akatsume')
    } finally {
      setLoading(false)
    }
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <section id="contact" className="relative section-padding">
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />
      {/* Top border beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Contact</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            Ready to{' '}
            <span className="text-gold-gradient">Build Something</span>
            <br />Exceptional?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg mt-4 max-w-xl mx-auto"
          >
            Tell me about your project. I'll get back to you within 24 hours with a plan.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: MessageCircle, title: 'Discord', desc: 'Fastest response, add me and lets chat', value: '_akatsume' },
              { icon: Clock, title: 'Response Time', desc: 'I reply within 24 hours, often much faster', value: '< 24 hours' },
              { icon: Globe, title: 'Timezone', desc: 'Eastern Time (ET) , available most hours', value: 'ET / UTC-5' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-sm border border-white/6 hover:border-gold-400/20 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-sm border border-gold-400/15 bg-gold-400/5 flex items-center justify-center flex-shrink-0 group-hover:border-gold-400/40 transition-all duration-300">
                  <item.icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.desc}</div>
                  <div className="text-gold-300 text-xs mt-1 font-mono">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Trust note */}
            <div className="p-5 rounded-sm border border-gold-400/15 bg-gold-400/4">
              <div className="text-gold-300 text-xs font-semibold tracking-widest uppercase mb-2">100% Safe</div>
              <p className="text-white/45 text-xs leading-relaxed">
                I discuss project scope before any payment. No surprises, no hidden fees. You know exactly what you're getting.
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-sm border border-gold-400/30 bg-gold-400/5 text-center"
              >
                <CheckCircle size={48} className="text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-white/50">I'll get back to you within 24 hours. Talk soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-sm border border-white/8 bg-dark-700/50 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="xShadowBuilder"
                      className="input-premium w-full px-4 py-3.5 rounded-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Email / Discord</label>
                    <input
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      className="input-premium w-full px-4 py-3.5 rounded-sm text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Project Type</label>
                  <select
                    required
                    value={form.type}
                    onChange={set('type')}
                    className="input-premium w-full px-4 py-3.5 rounded-sm text-sm"
                    style={{ background: 'rgba(10,10,10,0.8)' }}
                  >
                    <option value="" disabled>Select a service...</option>
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Project Details</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Describe your project , what needs to be built, your timeline, and any relevant details..."
                    className="input-premium w-full px-4 py-3.5 rounded-sm text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-center text-red-400/80 text-xs">{error}</p>
                )}
                <p className="text-center text-white/25 text-xs">
                  No spam. No commitment. Just a conversation.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
