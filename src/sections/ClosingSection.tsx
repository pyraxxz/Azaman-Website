import type React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Apple, PlayCircle, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'

export default function ClosingSection() {
  const { theme } = useTheme()
  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section
      id="download"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Animated aurora background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none bg-aurora-shift"
      />
      {/* Floating particles */}
      {[
        { top: '20%', left: '10%', size: 4, delay: 0, color: theme.accent },
        { top: '40%', right: '15%', size: 3, delay: 1, color: theme.accentSecondary },
        { bottom: '25%', left: '20%', size: 5, delay: 0.5, color: theme.accent },
        { bottom: '15%', right: '10%', size: 3, delay: 2, color: theme.success },
        { top: '60%', left: '8%', size: 2, delay: 1.5, color: theme.accent },
        { top: '15%', right: '30%', size: 4, delay: 2.5, color: theme.accentSecondary },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            ...p,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + i, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative max-w-[800px] mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Sparkles size={12} />
            Get Started
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Ready to join the future of{' '}
            <span style={{ color: theme.accent }}>finance?</span>
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: theme.textSecondary }}
          >
            Whether you're a trader looking for the best rates, a vendor building your business,
            or an investor seeking the next frontier, Azaman is built for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScrollTo('investors')}
              className="group flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold w-full sm:w-auto justify-center"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff',
                boxShadow: `0 0 32px ${theme.accent}50, 0 0 64px ${theme.accent}20`,
              }}
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="#investors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleScrollTo('investors')
              }}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold cursor-pointer w-full sm:w-auto justify-center"
              style={{
                color: theme.textPrimary,
                backgroundColor: `${theme.surface}80`,
                border: `1px solid ${theme.border}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              Read the Whitepaper
            </motion.a>
          </div>

          {/* Become a vendor — surfaced as a third path */}
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors"
            style={{ color: theme.accent }}
          >
            <Crown size={14} />
            <span className="border-b border-current pb-0.5">Become a vendor instead →</span>
          </Link>

          {/* App store badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            {[
              { icon: Apple, name: 'App Store', sub: 'Download on the' },
              { icon: PlayCircle, name: 'Google Play', sub: 'Get it on' },
            ].map(({ icon: Icon, name, sub }) => (
              <motion.button
                key={name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <Icon size={22} style={{ color: theme.textPrimary }} />
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                    {sub}
                  </div>
                  <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                    {name}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <p className="text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>
            Licensed under Act 1154 (2025) · Bank of Ghana Compliant · USDC-backed
          </p>
        </motion.div>
      </div>
    </section>
  )
}
