// =============================================================================
// BuyDirectSection - "Buy USDC direct from Azaman at corporate rates."
// The point: P2P is not the only way in. Azaman funds its own pools in bulk
// (see Infrastructure section) and sells USDC directly at a rate that beats
// other apps. Shown as an animated rate-comparison so the gap is visceral.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import Glass from '@/components/Glass'
import AmbientOrbs from '@/components/AmbientOrbs'
import { useTheme } from '@/contexts/ThemeContext'

// Lower GH₵-per-USDC = cheaper USDC = better for the buyer. Azaman is lowest.
const COMPARISON = [
  { label: 'Azaman Direct', rate: 11.38, best: true },
  { label: 'Typical Exchange', rate: 11.74, best: false },
  { label: 'Bank / Card App', rate: 12.05, best: false },
]

const PERKS = [
  { icon: Zap, title: 'Instant fill', desc: 'No counterparty, no waiting. Buy from Azaman’s own pool and the USDC lands immediately.' },
  { icon: ShieldCheck, title: 'One locked rate', desc: 'The price you see is the price you pay. No spread games, no surprise fees at checkout.' },
  { icon: Clock, title: 'Always on', desc: 'Pools are funded in bulk around the clock, so the corporate rate is live 24/7.' },
]

function RateBar({ label, rate, best, max, min, delay }: {
  label: string; rate: number; best: boolean; max: number; min: number; delay: number
}) {
  const { theme } = useTheme()
  // Cheaper rate -> longer bar (more "value"). Invert around the range.
  const pct = 40 + ((max - rate) / Math.max(0.001, max - min)) * 60

  return (
    <div className="flex items-center gap-3">
      <div className="w-28 sm:w-32 flex-shrink-0 text-xs sm:text-sm" style={{ color: best ? theme.textPrimary : theme.textMuted, fontWeight: best ? 700 : 500 }}>
        {label}
      </div>
      <div className="flex-1 h-9 rounded-lg overflow-hidden relative" style={{ backgroundColor: `${theme.textMuted}12` }} aria-hidden="true">
        <motion.div
          className="h-full rounded-lg flex items-center justify-end pr-3"
          style={{
            background: best
              ? `linear-gradient(90deg, ${theme.accent}, ${theme.accentSecondary})`
              : `${theme.textMuted}30`,
            boxShadow: best ? `0 0 24px ${theme.accent}55` : 'none',
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-xs font-bold whitespace-nowrap"
            style={{ fontFamily: 'JetBrains Mono', color: best ? (theme.isDark ? '#000' : '#fff') : theme.textSecondary }}
          >
            {rate.toFixed(2)} GH₵
          </span>
        </motion.div>
      </div>
      {best && (
        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.15em] flex-shrink-0" style={{ color: theme.accent }}>
          ◄ best
        </span>
      )}
    </div>
  )
}

export default function BuyDirectSection() {
  const { theme } = useTheme()
  const rates = COMPARISON.map((c) => c.rate)
  const max = Math.max(...rates)
  const min = Math.min(...rates)

  // Headline rate ticks gently to feel "live" without implying a real feed.
  const [live, setLive] = useState(11.38)
  const seed = useRef(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      seed.current = (seed.current + 1) % 6
      const nudge = [0, 0.01, 0.02, 0.01, 0, -0.01][seed.current]
      setLive(+(11.38 + nudge).toFixed(2))
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="buy-direct"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 900px 500px at 80% 0%, ${theme.glow}16, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
            >
              <Zap size={12} />
              Buy Direct
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05]" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
              Skip the haggle.{' '}
              <span className="text-gradient-flow">Buy USDC at our corporate rate.</span>
            </h2>
            <p className="text-lg mt-5 leading-relaxed" style={{ color: theme.textSecondary }}>
              P2P isn’t the only way in. Buy USDC straight from Azaman’s own pools at a rate that’s
              <strong style={{ color: theme.textPrimary }}> second to none</strong>, funded in bulk so you always get the floor price, not the retail markup.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {PERKS.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                      <Icon size={16} style={{ color: theme.accent }} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>{p.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{p.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* RIGHT: live rate + comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Glass radius="2xl" padding="lg" elevated mouseGlow>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>Azaman Direct · USDC</span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: theme.success }}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.success }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  Live
                </span>
              </div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>
                  {live.toFixed(2)}
                </span>
                <span className="text-lg font-semibold mb-1.5" style={{ color: theme.accent }}>GH₵ / USDC</span>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                {COMPARISON.map((c, i) => (
                  <RateBar key={c.label} {...c} max={max} min={min} delay={0.15 + i * 0.12} />
                ))}
              </div>

              <div className="rounded-xl p-3 mb-5 text-xs leading-relaxed" style={{ backgroundColor: `${theme.success}10`, border: `1px solid ${theme.success}25`, color: theme.textSecondary }}>
                <strong style={{ color: theme.success }}>~6% cheaper</strong> than a typical card-app buy, on every single USDC.
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary})`, color: theme.isDark ? '#000' : '#fff' }}
                data-cursor="hover"
              >
                Buy USDC direct
                <ArrowRight size={16} />
              </button>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
