'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Send, CheckCircle } from 'lucide-react'

const testimonials = [
  {
    name: 'da.sher',
    role: 'Game Owner',
    rating: 5,
    text: 'pretty good guy, very professional and has strong knowledge of advanced LUAU, and hes like so tuff n shii',
    avatar: 'D',
    color: 'from-purple-600 to-purple-800',
  },
  {
    name: 'toyodevs',
    role: 'Vfx Developer',
    rating: 5,
    text: 'i asked for a couple of systems, pretty quick and optimized, will deff be coming back',
    avatar: 'T',
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: '@vo1edd',
    role: 'Developer / Game Owner',
    rating: 5,
    text: 'Swift and professional. Overall nice guy and knows how to get the job done. Finds a passion in your project and really takes his time to deliver. Highly recommend :)',
    avatar: 'V',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    name: 'nxvus.dev',
    role: 'Roblox Developer',
    rating: 4,
    text: 'solid work on the ui, players actually like it now lol. took a bit to get the style right but he was patient with revisions',
    avatar: 'N',
    color: 'from-rose-600 to-rose-800',
  },
  {
    name: 'studiocraft_',
    role: 'Studio Lead',
    rating: 5,
    text: 'had a datastore issue that was wiping player data. he found the bug fast and fixed it properly. no issues since',
    avatar: 'S',
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    name: 'zephyr.rbx',
    role: 'Indie Developer',
    rating: 4,
    text: 'built a multiplayer system for my game, kept me updated the whole time. good communication, delivered on time',
    avatar: 'Z',
    color: 'from-amber-600 to-amber-800',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} className={i < count ? 'text-gold-400 fill-gold-400' : 'text-white/15 fill-white/15'} />
      ))}
    </div>
  )
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
        >
          <Star
            size={20}
            className={(hovered || value) > i ? 'text-gold-400 fill-gold-400' : 'text-white/20 fill-white/20'}
          />
        </button>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="card-premium rounded-sm p-7 flex flex-col gap-5"
    >
      <Quote size={20} className="text-gold-400/40" />
      <p className="text-white/65 text-sm leading-relaxed flex-1">"{t.text}"</p>
      <div>
        <StarRating count={t.rating} />
        <div className="flex items-center gap-3 mt-4">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <div className="text-white text-sm font-semibold">{t.name}</div>
            <div className="text-white/40 text-xs">{t.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ReviewForm() {
  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 0 })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.rating === 0) { setError('Please select a star rating.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-10 rounded-sm border border-gold-400/30 bg-gold-400/5 text-center"
      >
        <CheckCircle size={40} className="text-gold-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Review sent!</h3>
        <p className="text-white/50 text-sm">It will be checked and added to the page if approved. Thanks.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-sm border border-white/8 bg-dark-700/50 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Your Name / Username</label>
          <input
            required
            value={form.name}
            onChange={set('name')}
            placeholder="_akatsume"
            className="input-premium w-full px-4 py-3.5 rounded-sm text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Your Role</label>
          <input
            required
            value={form.role}
            onChange={set('role')}
            placeholder="Developer"
            className="input-premium w-full px-4 py-3.5 rounded-sm text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/50 tracking-widest uppercase mb-2 font-medium">Your Review</label>
        <textarea
          required
          rows={4}
          value={form.text}
          onChange={set('text')}
          placeholder="What was it like working with me?"
          className="input-premium w-full px-4 py-3.5 rounded-sm text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-white/50 tracking-widest uppercase mb-3 font-medium">Rating</label>
        <StarPicker value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
      </div>

      {error && <p className="text-red-400/80 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full flex items-center justify-center gap-3 disabled:opacity-70"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-dark-900/40 border-t-dark-900 rounded-full animate-spin" />
        ) : (
          <><Send size={14} /> Submit Review</>
        )}
      </button>
    </form>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

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
            <span className="text-gold-400 text-xs tracking-widest uppercase font-medium">Reviews</span>
            <div className="h-px w-12 bg-gold-400/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight"
          >
            What Clients{' '}
            <span className="text-gold-gradient">Actually Said</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < 5 ? 'text-gold-400 fill-gold-400' : 'text-gold-400/30'} />
              ))}
            </div>
            <span className="text-white/50 text-sm">4.7 average across all projects</span>
          </motion.div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Leave a review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Worked with me?</h3>
            <p className="text-white/40 text-sm">Leave a review and it will show up here once verified.</p>
          </div>
          <ReviewForm />
        </motion.div>
      </div>
    </section>
  )
}
