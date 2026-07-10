'use client'

import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Work', href: '#showcase' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gold top beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main row */}
        <div className="grid md:grid-cols-3 gap-10 items-start mb-14">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black text-gold-gradient mb-3">AKATSUME</div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Roblox scripter with 3 years of experience. Clean code, on time, no headaches.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/40">Available for new projects</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-xs text-white/30 tracking-widest uppercase mb-5 font-medium">Navigation</div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/50 hover:text-gold-300 transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs text-white/30 tracking-widest uppercase mb-5 font-medium">Get In Touch</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-white/30 mb-1">Discord</div>
                <div className="text-sm text-white/70 font-mono">akatsume</div>
              </div>
              <div>
                <div className="text-xs text-white/30 mb-1">Languages</div>
                <div className="text-sm text-white/70">French · English</div>
              </div>
              <div>
                <div className="text-xs text-white/30 mb-1">Timezone</div>
                <div className="text-sm text-white/70">Eastern Time (ET)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-line mb-8" />

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-sm border border-gold-400/15 bg-gold-400/4 mb-10"
        >
          <div>
            <div className="text-white font-bold text-lg">Ready to level up your game?</div>
            <div className="text-white/40 text-sm mt-1">Let's build something your players will never forget.</div>
          </div>
          <a href="#contact" className="btn-gold flex-shrink-0">
            Hire Me Now
          </a>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/25 text-xs">
          <div>© {new Date().getFullYear()} Akatsume. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Crafted with precision by{' '}
            <span className="text-gold-400/60 font-semibold ml-1">Akatsume</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
