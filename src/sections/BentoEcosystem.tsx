// =============================================================================
// BentoEcosystem — themed glassmorphic bento grid telling the platform story.
// Cells:
//   - Vaults (streak flame + scroll-driven progress ring)
//   - Smart Routes (animated NodeGraph)
//   - 11 Themes (live picker)
//   - AZM Token (rotating ring + supply counter)
//   - Hologram Balance (mini phone shimmer)
//   - Military-Grade Security (pulse rings)
//   - Live Oracle (sparkline)
// =============================================================================

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Lock, Wallet, Coins, Activity, Palette, Sparkles, Shield } from 'lucide-react'
import Glass from '@/components/Glass'
import NodeGraph from '@/components/NodeGraph'
import ProgressRing from '@/components/ProgressRing'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export default function BentoEcosystem() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (prefersReducedMotion()) return
    const cells = root.querySelectorAll<HTMLElement>('[data-bento-cell]')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    tl.from(cells, {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power3.out',
    })
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 1000px 600px at 50% 0%, ${theme.glow}10, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Sparkles size={12} />
            The Ecosystem
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            One platform.{' '}
            <span style={{ color: theme.accent }}>Every flow you need.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Vaults that reward consistency. Smart Routes that automate payouts. Tokens that
            fuel the marketplace. Built as one cohesive system.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 grid-rows-[auto] gap-4 sm:gap-5 auto-rows-[1fr]">
          <div data-bento-cell className="col-span-12 lg:col-span-7 lg:row-span-2 min-h-[420px]">
            <VaultsCell />
          </div>
          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-5 lg:row-span-2 min-h-[420px]">
            <SmartRoutesCell />
          </div>

          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-4">
            <HologramCell />
          </div>
          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ThemesCell />
          </div>
          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-4">
            <AzmTokenCell />
          </div>

          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-6">
            <SecurityCell />
          </div>
          <div data-bento-cell className="col-span-12 sm:col-span-6 lg:col-span-6">
            <OracleCell />
          </div>
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------------
// Vaults — flame + circular progress ring
// -----------------------------------------------------------------------------
function VaultsCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={4} radius="2xl" padding="lg" className="h-full" elevated>
      <div className="flex flex-col h-full gap-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>
              Vaults · Streaks
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
            >
              Save by{' '}
              <span style={{ color: theme.accent }}>showing up.</span>
            </h3>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, #FF7A1A, #FFB347)`,
              boxShadow: '0 0 24px rgba(255,122,26,0.5)',
            }}
          >
            <Flame size={14} className="text-white" />
            <span className="text-sm font-bold text-white">12 day streak</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
          <ProgressRing value={0.75} size={200} stroke={12} label="75%" sublabel="To goal" />
          <div className="flex-1 w-full space-y-3">
            {[
              { label: 'Emergency Fund', cur: 'GH₵ 1,500', tgt: 'GH₵ 2,000', pct: 75, freq: 'Weekly' },
              { label: 'New MacBook', cur: 'GH₵ 2,000', tgt: 'GH₵ 5,000', pct: 40, freq: 'Monthly' },
              { label: 'Travel Fund', cur: 'GH₵ 600', tgt: 'GH₵ 3,000', pct: 20, freq: 'Biweekly' },
            ].map((g) => (
              <div
                key={g.label}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: `color-mix(in srgb, ${theme.card} 70%, transparent)`,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                    {g.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                    {g.freq}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSecondary})` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: theme.textSecondary }}>
                    {g.cur} / {g.tgt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// Smart Routes — node graph
// -----------------------------------------------------------------------------
function SmartRoutesCell() {
  const { theme } = useTheme()
  const nodes = useMemo(
    () => [
      { id: 'wallet', label: 'Wallet', sublabel: 'USDC', x: 12, y: 30, emoji: '💳' },
      { id: 'cal', label: 'Schedule', sublabel: 'Tue 9AM', x: 38, y: 70, emoji: '📅' },
      { id: 'risk', label: 'Risk Engine', sublabel: 'AI', x: 64, y: 30, emoji: '🛡' },
      { id: 'momo', label: 'MoMo', sublabel: 'Payout', x: 88, y: 65, emoji: '📲' },
    ],
    []
  )
  const edges = useMemo(
    () => [
      { from: 'wallet', to: 'cal', curve: -28 },
      { from: 'cal', to: 'risk', curve: -28 },
      { from: 'risk', to: 'momo', curve: -28 },
    ],
    []
  )
  return (
    <Glass tilt tiltMax={4} radius="2xl" padding="lg" className="h-full" elevated>
      <div className="flex flex-col h-full gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>
            Smart Routes
          </div>
          <h3
            className="text-2xl sm:text-3xl font-bold mb-1"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Set it.{' '}
            <span style={{ color: theme.accent }}>Forget it.</span>
          </h3>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            Automate payouts from wallet to MoMo through risk-aware schedules.
          </p>
        </div>
        <div className="flex-1 flex items-center">
          <NodeGraph nodes={nodes} edges={edges} width={460} height={260} />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Daily', 'Weekly', 'Monthly', 'Custom'].map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{
                backgroundColor: `${theme.accent}12`,
                color: theme.accent,
                border: `1px solid ${theme.accent}30`,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// Hologram Balance — mini phone with shimmer
// -----------------------------------------------------------------------------
function HologramCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={6} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Wallet size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>
            Hologram Balance
          </span>
        </div>
        <div
          className="relative rounded-2xl p-4 overflow-hidden flex-1"
          style={{
            background: 'linear-gradient(135deg, #161618, #0A0A0C, #0B0E12)',
            border: '1px solid rgba(255,255,255,0.06)',
            minHeight: 140,
          }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
            }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative">
            <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Total Balance
            </div>
            <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>
              GH₵ 12,450
            </div>
            <div className="text-[10px] mt-1" style={{ color: theme.accent }}>
              ◎ 1,088.65 USDC · +2.41%
            </div>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
          USDC stored. Local currency displayed. Always reflects true purchasing power.
        </p>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// 11 Themes — live picker linked to ThemeContext
// -----------------------------------------------------------------------------
function ThemesCell() {
  const { theme, themes, themeId, setThemeId } = useTheme()
  return (
    <Glass tilt tiltMax={6} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Palette size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>
            11 Immersive Themes
          </span>
        </div>
        <h3 className="text-xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
          Tap to{' '}
          <span style={{ color: theme.accent }}>repaint everything.</span>
        </h3>
        <div className="grid grid-cols-6 gap-2 flex-1 content-start">
          {themes.map((t) => {
            const active = themeId === t.id
            return (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                title={t.name}
                className="relative w-full aspect-square rounded-xl transition-transform hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${t.background}, ${t.surface})`,
                  border: `2px solid ${active ? t.accent : 'transparent'}`,
                  boxShadow: active ? `0 0 12px ${t.glow}80` : 'none',
                }}
              >
                <div
                  className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.accent }}
                />
              </button>
            )
          })}
        </div>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// AZM Token — rotating ring + counter
// -----------------------------------------------------------------------------
function AzmTokenCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={6} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Coins size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>
            AZM Token
          </span>
        </div>
        <div className="flex items-center justify-center flex-1 relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px dashed ${theme.accent}50`,
              margin: '0 auto',
              width: 160,
              height: 160,
              left: 0,
              right: 0,
              top: 'calc(50% - 80px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{
              background: `radial-gradient(circle, ${theme.accent}40, ${theme.accent}10)`,
              border: `1.5px solid ${theme.accent}`,
              boxShadow: `0 0 32px ${theme.accent}50`,
            }}
          >
            <span
              className="text-3xl font-black tracking-tighter"
              style={{ fontFamily: 'Space Grotesk', color: theme.accent }}
            >
              AZM
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div
            className="rounded-lg p-2"
            style={{ backgroundColor: `${theme.surface}80`, border: `1px solid ${theme.border}` }}
          >
            <div className="text-[9px] uppercase" style={{ color: theme.textMuted }}>
              Supply
            </div>
            <div className="text-sm font-bold" style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
              50M
            </div>
          </div>
          <div
            className="rounded-lg p-2"
            style={{ backgroundColor: `${theme.surface}80`, border: `1px solid ${theme.border}` }}
          >
            <div className="text-[9px] uppercase" style={{ color: theme.textMuted }}>
              Burned
            </div>
            <div className="text-sm font-bold" style={{ color: theme.danger, fontFamily: 'JetBrains Mono' }}>
              847K
            </div>
          </div>
        </div>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// Security — concentric pulse rings
// -----------------------------------------------------------------------------
function SecurityCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={5} radius="2xl" padding="lg" className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 items-center h-full">
        <div className="sm:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>
            Security
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold mb-2"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Military-grade,{' '}
            <span style={{ color: theme.accent }}>by default.</span>
          </h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>
            Biometric gates. Multi-sig cold storage. ACID transactions. Real-time fraud detection.
          </p>
          <div className="flex gap-2 flex-wrap">
            {['Act 1154', 'KYC', 'AML/CFT', 'Audit'].map((b) => (
              <span
                key={b}
                className="text-[10px] px-2 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: `${theme.accent}12`,
                  color: theme.accent,
                  border: `1px solid ${theme.accent}30`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2 relative h-44 flex items-center justify-center">
          {[0, 0.6, 1.2].map((d) => (
            <motion.div
              key={d}
              className="absolute rounded-full"
              style={{
                width: 160,
                height: 160,
                border: `1px solid ${theme.accent}40`,
              }}
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: d, ease: 'easeInOut' }}
            />
          ))}
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}40, ${theme.accent}10)`,
              border: `1px solid ${theme.accent}80`,
              boxShadow: `0 0 24px ${theme.accent}50`,
            }}
          >
            <Shield size={28} style={{ color: theme.accent }} />
          </div>
          {/* scanning line */}
          <motion.div
            className="absolute inset-x-0 h-[1px] mx-auto"
            style={{
              width: '60%',
              background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
              boxShadow: `0 0 12px ${theme.accent}`,
            }}
            animate={{ y: [-50, 50, -50] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </Glass>
  )
}

// -----------------------------------------------------------------------------
// Live Oracle — sparkline that drifts in real time
// -----------------------------------------------------------------------------
function OracleCell() {
  const { theme } = useTheme()
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 40 }, () => 11.4 + Math.random() * 0.4)
  )
  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1)
        const last = prev[prev.length - 1]
        const drift = (Math.random() - 0.5) * 0.06
        next.push(Math.max(11.2, Math.min(11.8, last + drift)))
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const min = Math.min(...points)
  const max = Math.max(...points)
  const w = 100
  const h = 40
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / Math.max(0.001, max - min)) * h
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  const last = points[points.length - 1].toFixed(2)
  const change = (((points[points.length - 1] - points[0]) / points[0]) * 100).toFixed(2)

  return (
    <Glass tilt tiltMax={5} radius="2xl" padding="lg" className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 items-center h-full">
        <div className="sm:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>
            Live Oracle
          </div>
          <h3
            className="text-xl sm:text-2xl font-bold mb-2"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Real rates.{' '}
            <span style={{ color: theme.accent }}>Real time.</span>
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            Dual-rate engine pulling from CoinGecko and Bank of Ghana every 10 seconds.
            What you see is what you trade.
          </p>
        </div>
        <div className="sm:col-span-2">
          <div
            className="rounded-xl p-3"
            style={{
              backgroundColor: `${theme.surface}80`,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                USDC → GHS
              </span>
              <Activity size={11} style={{ color: theme.success }} />
            </div>
            <div className="text-2xl font-black" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
              {last}
            </div>
            <div className="text-[11px]" style={{ color: theme.success }}>
              ▲ {change}% · 24h
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 mt-2">
              <path d={path} fill="none" stroke={theme.accent} strokeWidth="1.5" />
              <path
                d={`${path} L ${w} ${h} L 0 ${h} Z`}
                fill={`url(#oracle-grad-${theme.accent.slice(1)})`}
                opacity="0.25"
              />
              <defs>
                <linearGradient id={`oracle-grad-${theme.accent.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.accent} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </Glass>
  )
}

// Lock icon import retention - referenced visually elsewhere on site
void Lock
