// =============================================================================
// ClosingSection — "Africa's money moves here."
// 3 coded blobs, gradient headline, email capture, app store badges, trust pills
// =============================================================================

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Apple, Play } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'

export default function ClosingSection() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    console.log('Email captured:', email)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section
      id="download"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* 3 Coded blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full animate-float-blob"
          style={{
            width: '60vw', height: '60vw', top: '-20%', left: '-10%',
            background: `radial-gradient(circle, ${theme.accent}20, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute rounded-full animate-float-blob-reverse"
          style={{
            width: '50vw', height: '50vw', top: '10%', right: '-15%',
            background: `radial-gradient(circle, ${theme.glow}15, transparent 70%)`,
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute rounded-full animate-float-blob-delayed"
          style={{
            width: '40vw', height: '40vw', bottom: '-10%', left: '30%',
            background: `radial-gradient(circle, ${theme.success}12, transparent 70%)`,
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative max-w-[800px] mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {/* Gradient headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Space Grotesk',
              background: `linear-gradient(135deg, ${theme.textPrimary} 40%, ${theme.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Africa's money moves here.
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: theme.textSecondary }}>
            Whether you're trading, saving, or building — Azaman is the platform that moves with you.
          </p>

          {/* Email capture */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <Glass radius="xl" padding="none">
              <div className="flex items-center gap-2 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                  style={{ color: theme.textPrimary }}
                  data-cursor="hidden"
                  required
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000' : '#fff' }}
                  data-cursor="hover"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </Glass>
          </form>
          {submitted && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm mb-4" style={{ color: theme.success }}>
              You're on the list. We'll reach out.
            </motion.p>
          )}
          <p className="text-xs mb-10" style={{ color: theme.textMuted }}>
            Join 1,200+ people already on the waitlist
          </p>

          {/* App store badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            <motion.a
              href="#"
              whileHover={{ filter: 'brightness(1.1)' }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{ backgroundColor: '#000', border: `1px solid ${theme.border}` }}
              data-cursor="hover"
            >
              <Apple size={22} className="text-white" />
              <div className="text-left">
                <div className="text-[9px] text-white/60 uppercase tracking-wider">Download on the</div>
                <div className="text-sm font-bold text-white">App Store</div>
              </div>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ filter: 'brightness(1.1)' }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{ backgroundColor: '#000', border: `1px solid ${theme.border}` }}
              data-cursor="hover"
            >
              <Play size={22} className="text-white" fill="white" />
              <div className="text-left">
                <div className="text-[9px] text-white/60 uppercase tracking-wider">Get it on</div>
                <div className="text-sm font-bold text-white">Google Play</div>
              </div>
            </motion.a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              '🏛️ Licensed VASP',
              '🔒 Biometric Auth',
              '⛓️ USDC-Backed',
              '🤝 Escrow Protected',
              '🇬🇭 Made in Ghana',
            ].map((badge) => (
              <Glass key={badge} radius="lg" padding="none">
                <div className="px-3 py-2 text-[11px] font-medium" style={{ color: theme.textMuted }}>
                  {badge}
                </div>
              </Glass>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float-blob { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(2%,3%) scale(1.04)} }
        @keyframes float-blob-r { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-2%,-3%) scale(1.04)} }
        .animate-float-blob { animation: float-blob 8s ease-in-out infinite; }
        .animate-float-blob-reverse { animation: float-blob-r 12s ease-in-out infinite; }
        .animate-float-blob-delayed { animation: float-blob 10s ease-in-out infinite 2s; }
      `}</style>
    </section>
  )
}
