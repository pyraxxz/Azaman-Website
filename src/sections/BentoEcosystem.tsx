// =============================================================================
// BentoEcosystem - Asymmetric CSS Grid with named areas
// Desktop: "vaults vaults smartroute themes" / "security azm azm themes" / "hologram hologram oracle oracle"
// Tablet: 2-col. Mobile: single column.
// =============================================================================

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Lock, Wallet, Coins, Activity, Palette, Sparkles, Shield } from 'lucide-react'
import Glass from '@/components/Glass'
import NodeGraph from '@/components/NodeGraph'
import ProgressRing from '@/components/ProgressRing'
import { useTheme } from '@/contexts/ThemeContext'
import AmbientOrbs from '@/components/AmbientOrbs'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useInViewport } from '@/hooks/use-in-viewport'

export default function BentoEcosystem() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root || prefersReducedMotion()) return
    const cells = root.querySelectorAll<HTMLElement>('[data-bento-cell]')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 80%', toggleActions: 'play none none none' },
    })
    tl.from(cells, { y: 50, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative py-16 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 1000px 600px at 50% 0%, ${theme.glow}10, transparent 70%)` }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
          >
            <Sparkles size={12} />
            The Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            One platform.{' '}<span className="text-gradient-flow">Every flow you need.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Vaults that reward consistency. Smart Routes that automate payouts. Tokens that fuel the marketplace.
          </p>
        </motion.div>

        {/* Bento grid with named areas */}
        <div className="bento-grid gap-4">
          <div data-bento-cell style={{ gridArea: 'vaults' }}><VaultsCell /></div>
          <div data-bento-cell style={{ gridArea: 'smartroute' }}><SmartRoutesCell /></div>
          <div data-bento-cell style={{ gridArea: 'themes' }}><ThemesCell /></div>
          <div data-bento-cell style={{ gridArea: 'security' }}><SecurityCell /></div>
          <div data-bento-cell style={{ gridArea: 'azm' }}><AzmTokenCell /></div>
          <div data-bento-cell style={{ gridArea: 'hologram' }}><HologramCell /></div>
          <div data-bento-cell style={{ gridArea: 'oracle' }}><OracleCell /></div>
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "vaults"
            "smartroute"
            "themes"
            "security"
            "azm"
            "hologram"
            "oracle";
        }
        @media (min-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "vaults vaults"
              "smartroute themes"
              "security azm"
              "hologram oracle";
          }
        }
        @media (min-width: 1280px) {
          .bento-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 280px 200px 200px;
            grid-template-areas:
              "vaults vaults smartroute themes"
              "security azm azm themes"
              "hologram hologram oracle oracle";
          }
        }
      `}</style>
    </section>
  )
}

// --- Vaults Cell ----------------------------------------------------------------
function VaultsCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={4} radius="2xl" padding="lg" className="h-full relative overflow-hidden" elevated>
      {/* Vault door SVG background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ opacity: 0.06, color: theme.accent }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="30" x2="100" y2="10" stroke="currentColor" strokeWidth="4" />
          <line x1="100" y1="170" x2="100" y2="190" stroke="currentColor" strokeWidth="4" />
          <line x1="30" y1="100" x2="10" y2="100" stroke="currentColor" strokeWidth="4" />
          <line x1="170" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="4" />
          <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
      <div className="flex flex-col h-full gap-4 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>Vaults · Streaks</div>
            <h3 className="text-2xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
              Save by <span style={{ color: theme.accent }}>showing up.</span>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #FF7A1A, #FFB347)', boxShadow: '0 0 24px rgba(255,122,26,0.5)' }}>
            <Flame size={14} className="text-white" />
            <span className="text-sm font-bold text-white">12 day streak</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
          <ProgressRing value={0.75} size={140} stroke={10} label="75%" sublabel="To goal" />
          <div className="flex-1 w-full space-y-2">
            {[
              { label: 'Emergency Fund', pct: 75, freq: 'Weekly' },
              { label: 'New MacBook', pct: 40, freq: 'Monthly' },
              { label: 'Travel Fund', pct: 20, freq: 'Biweekly' },
            ].map((g) => (
              <div key={g.label} className="rounded-xl p-2.5" style={{ backgroundColor: `${theme.card}80`, border: `1px solid ${theme.border}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>{g.label}</span>
                  <span className="text-[9px] uppercase" style={{ color: theme.textMuted }}>{g.freq}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${g.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSecondary})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  )
}

// --- Smart Routes Cell ----------------------------------------------------------
function SmartRoutesCell() {
  const { theme } = useTheme()
  const nodes = useMemo(() => [
    { id: 'wallet', label: 'Wallet', sublabel: 'USDC', x: 12, y: 30, emoji: '💳' },
    { id: 'cal', label: 'Schedule', sublabel: 'Tue 9AM', x: 38, y: 70, emoji: '📅' },
    { id: 'risk', label: 'Risk Engine', sublabel: 'AI', x: 64, y: 30, emoji: '🛡' },
    { id: 'momo', label: 'MoMo', sublabel: 'Payout', x: 88, y: 65, emoji: '📲' },
  ], [])
  const edges = useMemo(() => [
    { from: 'wallet', to: 'cal', curve: -28 },
    { from: 'cal', to: 'risk', curve: -28 },
    { from: 'risk', to: 'momo', curve: -28 },
  ], [])

  return (
    <Glass tilt tiltMax={4} radius="2xl" padding="lg" className="h-full" elevated>
      <div className="flex flex-col h-full gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>Smart Routes</div>
          <h3 className="text-xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Set it. <span style={{ color: theme.accent }}>Forget it.</span>
          </h3>
        </div>
        <div className="flex-1 flex items-center">
          <NodeGraph nodes={nodes} edges={edges} width={360} height={200} />
        </div>
      </div>
    </Glass>
  )
}

// --- Themes Cell ----------------------------------------------------------------
function ThemesCell() {
  const { theme, themes, themeId, setThemeId } = useTheme()
  return (
    <Glass tilt tiltMax={6} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Palette size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>3 Themes</span>
        </div>
        <h3 className="text-lg font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
          Tap to <span style={{ color: theme.accent }}>repaint.</span>
        </h3>
        <div className="flex flex-wrap gap-2 flex-1 content-start">
          {themes.map((t) => {
            const active = themeId === t.id
            return (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                title={t.name}
                className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-[1.2] active:scale-[0.92]"
                style={{
                  background: `linear-gradient(135deg, ${t.background}, ${t.accent})`,
                  border: `2px solid ${active ? t.accent : 'transparent'}`,
                  boxShadow: active ? `0 0 16px ${t.accent}80` : 'none',
                }}
                data-cursor="hover"
              />
            )
          })}
        </div>
      </div>
    </Glass>
  )
}

// --- AZM Token Cell -------------------------------------------------------------
function AzmTokenCell() {
  const { theme } = useTheme()
  const [burned, setBurned] = useState(47128)

  useEffect(() => {
    const id = setInterval(() => {
      setBurned((prev) => prev + Math.floor(Math.random() * 5) + 1)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <Glass tilt tiltMax={5} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Coins size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>AZM Token</span>
        </div>
        <div className="flex items-center justify-center flex-1 relative">
          {/* Animated stroke-dasharray ring */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute">
            <circle cx="60" cy="60" r="54" fill="none" stroke={`${theme.accent}20`} strokeWidth="2" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none"
              stroke={theme.accent}
              strokeWidth="2"
              strokeDasharray="340"
              animate={{ strokeDashoffset: [340, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle, ${theme.accent}40, ${theme.accent}10)`, border: `1.5px solid ${theme.accent}` }}>
            <span className="text-xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.accent }}>AZM</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold" style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
            {burned.toLocaleString()} AZM burned today
          </div>
          <div className="text-[10px]" style={{ color: theme.textMuted }}>Supply: 50M · Deflationary</div>
        </div>
      </div>
    </Glass>
  )
}

// --- Hologram Balance Cell ------------------------------------------------------
function HologramCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={5} radius="2xl" padding="md" className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div className="flex items-center gap-2">
          <Wallet size={14} style={{ color: theme.accent }} />
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>Hologram Balance</span>
        </div>
        <div
          className="relative rounded-2xl p-4 overflow-hidden flex-1"
          style={{ background: 'linear-gradient(135deg, #161618, #0A0A0C)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.glow}40, transparent)` }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10">
            <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total Balance</div>
            <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>GH₵ 12,450</div>
            <div className="text-[10px] mt-1" style={{ color: theme.accent }}>◎ 1,088.65 USDC</div>
          </div>
        </div>
        <motion.p
          className="text-[10px]"
          style={{ color: theme.textMuted }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Updating...
        </motion.p>
      </div>
    </Glass>
  )
}

// --- Security Cell --------------------------------------------------------------
function SecurityCell() {
  const { theme } = useTheme()
  return (
    <Glass tilt tiltMax={5} radius="2xl" padding="md" className="h-full relative">
      {/* SECURED badge top-right */}
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, border: `1px solid ${theme.success}30` }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
        <span className="text-[9px] font-bold uppercase" style={{ color: theme.success }}>SECURED</span>
      </div>
      <div className="flex items-center gap-4 h-full">
        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>Security</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Military-grade, <span style={{ color: theme.accent }}>by default.</span>
          </h3>
          <div className="flex gap-1.5 flex-wrap">
            {['Act 1154', 'KYC', 'AML/CFT', 'Audit'].map((b) => (
              <span key={b} className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${theme.accent}12`, color: theme.accent, border: `1px solid ${theme.accent}30` }}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
          {[0, 0.6, 1.2].map((d) => (
            <motion.div
              key={d}
              className="absolute rounded-full"
              style={{ width: 80, height: 80, border: `1px solid ${theme.success}40` }}
              animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: d, ease: 'easeInOut' }}
            />
          ))}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${theme.success}40, ${theme.success}10)`, border: `1px solid ${theme.success}80` }}>
            <Shield size={22} style={{ color: theme.success }} />
          </div>
        </div>
      </div>
    </Glass>
  )
}

// --- Oracle Cell ----------------------------------------------------------------
function OracleCell() {
  const { theme } = useTheme()
  const [cellRef, isVisible] = useInViewport<HTMLDivElement>(0.2)
  const [points, setPoints] = useState<number[]>(() =>
    Array.from({ length: 20 }, () => 11.4 + Math.random() * 0.4)
  )

  useEffect(() => {
    if (!isVisible) return
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1)
        const last = prev[prev.length - 1]
        const drift = (Math.random() - 0.5) * 0.06
        next.push(Math.max(11.2, Math.min(11.8, last + drift)))
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [isVisible])

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

  return (
    <div ref={cellRef} className="h-full">
      <Glass tilt tiltMax={5} radius="2xl" padding="md" className="h-full">
        <div className="flex items-center gap-4 h-full">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={12} style={{ color: theme.success }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>Live Oracle</span>
            </div>
            <div className="text-2xl font-black" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
              {last}
            </div>
            <div className="text-[10px]" style={{ color: theme.textMuted }}>USDC {'->'} GHS · 10s refresh</div>
          </div>
          <div className="flex-1">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
              <defs>
                <linearGradient id="oracle-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.accent} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#oracle-area-fill)" />
              <path d={path} fill="none" stroke={theme.accent} strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </Glass>
    </div>
  )
}

// Retain Lock import reference
void Lock
