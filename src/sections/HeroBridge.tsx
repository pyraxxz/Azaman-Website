// =============================================================================
// HeroBridge — TOTAL REBUILD
// Full-screen cinematic hero. 3-act GSAP scroll timeline on desktop.
// Mobile: Framer Motion sequence, no pin.
// =============================================================================

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ShieldCheck, Zap, Globe } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import PhoneFrame from '@/components/PhoneFrame'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const RAILS = [
  { id: 'zelle', label: 'Zelle', short: 'ZL', color: '#6D1ED4' },
  { id: 'cashapp', label: 'CashApp', short: '$', color: '#00D54B' },
  { id: 'momo', label: 'MoMo', short: 'MM', color: '#FFCB05' },
  { id: 'bank', label: 'Bank Transfer', short: 'BK', color: '#0088FF' },
]

const VENDOR_GRID = [
  { name: 'KwameGold', rate: '11.44', method: 'Bank', risk: 'Low', trades: 1248 },
  { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', risk: 'Low', trades: 892 },
  { name: 'KofiBarter', rate: '11.60', method: 'CashApp', risk: 'Med', trades: 634 },
  { name: 'AmaCrypto', rate: '11.46', method: 'Bank', risk: 'Low', trades: 1105 },
  { name: 'NanaTrades', rate: '11.50', method: 'MoMo', risk: 'Low', trades: 756 },
  { name: 'YawCash', rate: '11.55', method: 'MoMo', risk: 'Med', trades: 421 },
]

const HEADLINE_WORDS = ['The', 'Future', 'of', 'African', 'Finance.', 'Built', 'Different.']

export default function HeroBridge() {
  const { theme } = useTheme()
  const { scrollTo } = useLenis()
  const sectionRef = useRef<HTMLDivElement>(null)

  // BUG 1 FIX: Reactive isDesktop
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ─── DESKTOP: GSAP 3-act scroll timeline ─────────────────────────────────────
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion()) return
    const root = sectionRef.current
    if (!root) return

    // BUG 2 FIX: setTimeout + null guards
    const timer = setTimeout(() => {
      const phone = root.querySelector('[data-phone]') as HTMLElement
      if (!phone) return
      const headlineWords = root.querySelectorAll<HTMLElement>('[data-word]')
      const subline = root.querySelector('[data-subline]') as HTMLElement
      const ctas = root.querySelector('[data-ctas]') as HTMLElement
      const trust = root.querySelector('[data-trust]') as HTMLElement
      if (!subline || !ctas || !trust) return
      const railNodes = root.querySelectorAll<HTMLElement>('[data-rail]')
      const usdcChip = root.querySelector('[data-usdc-chip]') as HTMLElement
      const phonePanels = root.querySelectorAll<HTMLElement>('[data-panel]')
      const grid = root.querySelector('[data-grid]') as HTMLElement
      const balanceEl = root.querySelector('[data-balance]') as HTMLElement

      // Initial states
      gsap.set(phone, { y: 120, rotateX: 25, opacity: 0 })
      gsap.set(headlineWords, { y: 80, opacity: 0, filter: 'blur(12px)' })
      gsap.set(subline, { y: 24, opacity: 0 })
      gsap.set(ctas, { y: 24, opacity: 0 })
      gsap.set(trust, { y: 24, opacity: 0 })
      gsap.set(railNodes, { scale: 0, opacity: 0 })
      gsap.set(phonePanels, { x: 0, y: 0, rotation: 0, opacity: 1 })
      if (grid) gsap.set(grid, { opacity: 0, y: 30 })

      // ACT 1: Intro
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to(headlineWords, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.07 }, 0)
        .to(subline, { y: 0, opacity: 1, duration: 0.6 }, 0.6)
        .to(ctas, { y: 0, opacity: 1, duration: 0.6 }, 0.75)
        .to(trust, { y: 0, opacity: 1, duration: 0.6 }, 0.9)
        .to(phone, { y: 0, rotateX: 0, opacity: 1, duration: 1.2 }, 0.1)

      // CountUp balance
      if (balanceEl) {
        gsap.fromTo(balanceEl, { innerText: '0' }, {
          innerText: '1240',
          duration: 2,
          delay: 0.8,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate() {
            const val = parseFloat(balanceEl.innerText || '0')
            balanceEl.innerText = val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          },
        })
      }

      // Trust badges
      const badges = root.querySelectorAll<HTMLElement>('[data-badge]')
      gsap.set(badges, { y: 30, opacity: 0 })
      intro.to(badges, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 1.0)

      // ACT 2 + ACT 3: Scroll-scrubbed pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.inOut' },
      })

      if (usdcChip) tl.to(usdcChip, { scale: 1.3, y: -20, duration: 0.1 }, 0)
      railNodes.forEach((node, i) => {
        tl.to(node, { scale: 1, opacity: 1, duration: 0.15, ease: 'back.out(1.7)' }, 0.05 + i * 0.08)
      })
      const chipPaths = [{ x: -200, y: -150 }, { x: 200, y: -120 }, { x: -180, y: 80 }, { x: 200, y: 100 }]
      if (usdcChip) {
        chipPaths.forEach((target, i) => {
          const startTime = 0.08 + i * 0.1
          tl.to(usdcChip, { motionPath: { path: [{ x: 0, y: 0 }, { x: target.x * 0.3, y: target.y - 60 }, { x: target.x, y: target.y }], curviness: 1.5 }, duration: 0.1, ease: 'power1.inOut' }, startTime)
          tl.to(usdcChip, { x: 0, y: -20, duration: 0.02 }, startTime + 0.1)
        })
      }
      const explodes = [{ x: -80, y: -60, rotation: -12 }, { x: 80, y: -60, rotation: 12 }, { x: -80, y: 0, rotation: -8 }, { x: 80, y: 0, rotation: 8 }, { x: -80, y: 60, rotation: 14 }, { x: 80, y: 60, rotation: -14 }]
      phonePanels.forEach((panel, i) => {
        tl.to(panel, { x: explodes[i].x, y: explodes[i].y, rotation: explodes[i].rotation, opacity: 0, duration: 0.3 }, 0.5 + i * 0.04)
      })
      tl.to(phone, { opacity: 0, scale: 0.9, duration: 0.3 }, 0.55)
      if (grid) tl.to(grid, { opacity: 1, y: 0, duration: 0.4 }, 0.6)
      const vendorCards = root.querySelectorAll<HTMLElement>('[data-vendor-card]')
      gsap.set(vendorCards, { y: 20, opacity: 0 })
      vendorCards.forEach((card, i) => { tl.to(card, { y: 0, opacity: 1, duration: 0.2 }, 0.65 + i * 0.06) })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === sectionRef.current) st.kill() })
    }
  }, [isDesktop, theme])

  // ─── MOBILE: GSAP intro (no pin) ────────────────────────────────────────────
  useEffect(() => {
    if (isDesktop || prefersReducedMotion()) return
    const root = sectionRef.current
    if (!root) return

    // BUG 2 FIX: setTimeout + null guards
    const timer = setTimeout(() => {
      const phone = root.querySelector('[data-phone]') as HTMLElement
      if (!phone) return
      const headlineWords = root.querySelectorAll<HTMLElement>('[data-word]')
      const subline = root.querySelector('[data-subline]') as HTMLElement
      const ctas = root.querySelector('[data-ctas]') as HTMLElement
      const trust = root.querySelector('[data-trust]') as HTMLElement
      if (!subline || !ctas || !trust) return

      gsap.set(phone, { y: 60, opacity: 0 })
      gsap.set(headlineWords, { y: 20, opacity: 0 })
      gsap.set([subline, ctas, trust], { y: 16, opacity: 0 })

      const intro = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } })
      intro
        .to(phone, { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(headlineWords, { y: 0, opacity: 1, duration: 0.4, stagger: 0.04 }, 0.05)
        .to(subline, { y: 0, opacity: 1, duration: 0.35 }, 0.3)
        .to(ctas, { y: 0, opacity: 1, duration: 0.35 }, 0.4)
        .to(trust, { y: 0, opacity: 1, duration: 0.35 }, 0.5)
    }, 100)

    return () => { clearTimeout(timer) }
  }, [isDesktop])

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollTo(target, { offset: -80 })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh]"
      style={{
        backgroundColor: theme.background,
        background: `radial-gradient(ellipse 120% 80% at 50% -20%, ${theme.glow}18, transparent 60%)`,
      }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ParticleCanvas />
      </div>

      {/* Main content */}
      <div className="relative z-[2] min-h-[100dvh] flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-5 lg:px-12 py-24 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[72px] xl:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] mb-7"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {HEADLINE_WORDS.map((word, i) => (
                  <span
                    key={i}
                    data-word
                    className="inline-block mr-[0.25em]"
                    style={{
                      color: (word === 'Finance.' || word === 'Different.')
                        ? theme.accent
                        : theme.textPrimary,
                      textShadow: (word === 'Finance.' || word === 'Different.')
                        ? `0 0 36px ${theme.accent}55`
                        : 'none',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Subline */}
              <p
                data-subline
                className="text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                Buy and sell USDC at the best rates. Hold stablecoins. Cash out via MoMo.
                Zero hidden fees.
              </p>

              {/* CTAs */}
              <div
                data-ctas
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10"
              >
                <a
                  href="#download"
                  onClick={(e) => handleCta(e, '#download')}
                  className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl font-extrabold cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.glow})`,
                    color: theme.isDark ? '#000' : '#fff',
                    boxShadow: `0 0 32px ${theme.accent}40, 0 8px 24px rgba(0,0,0,0.3)`,
                  }}
                  data-cursor="hover"
                >
                  {/* Shine sweep */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                    }}
                  />
                  <span className="relative z-10">Get the App</span>
                </a>

                <a
                  href="#features"
                  onClick={(e) => handleCta(e, '#features')}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: 'transparent',
                  }}
                  data-cursor="hover"
                >
                  See How it Works
                  <ArrowDown size={16} />
                </a>
              </div>

              {/* Trust strip */}
              <div
                data-trust
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                {[
                  { icon: '🔒', label: 'Licensed VASP · Act 1154' },
                  { icon: '⚡', label: 'Sub-second transfers' },
                  { icon: '🌍', label: 'Ghana · Nigeria · Kenya' },
                ].map((pill) => (
                  <div
                    key={pill.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium"
                    style={{
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      color: theme.textMuted,
                    }}
                  >
                    <span>{pill.icon}</span>
                    <span>{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone */}
            <div
              data-phone
              className="lg:col-span-5 flex items-center justify-center relative"
              style={{ perspective: '1400px' }}
            >
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                whileInView={{ rotateY: [0, 2, -2, 0], rotateX: [0, -1, 1, 0] }}
                viewport={{ once: false }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneFrame width={isDesktop ? 280 : 220} height={isDesktop ? 580 : 450} tilt>
                  <HeroPhoneScreen />
                </PhoneFrame>
              </motion.div>

              {/* Trust badges below phone — desktop */}
              <div className="hidden lg:flex absolute -bottom-16 left-1/2 -translate-x-1/2 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Escrow' },
                  { icon: Zap, label: 'Instant' },
                  { icon: Globe, label: 'Global' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    data-badge
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium"
                    style={{
                      backgroundColor: `${theme.surface}CC`,
                      border: `1px solid ${theme.border}`,
                      color: theme.textMuted,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Icon size={12} style={{ color: theme.accent }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: payment rail pill carousel */}
          <div className="lg:hidden mt-8 -mx-5 px-5 overflow-x-auto scrollbar-none">
            <div className="flex gap-3 w-max">
              {RAILS.map((rail) => (
                <div
                  key={rail.id}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: `${theme.surface}`,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black"
                    style={{
                      backgroundColor: `${rail.color}20`,
                      color: rail.color,
                    }}
                  >
                    {rail.short}
                  </div>
                  <span className="text-xs font-medium" style={{ color: theme.textPrimary }}>
                    {rail.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Rail nodes (absolute positioned) */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block" aria-hidden="true">
        {RAILS.map((rail, i) => {
          const positions = [
            { top: '18%', left: '5%' },
            { top: '22%', right: '5%' },
            { bottom: '28%', left: '7%' },
            { bottom: '22%', right: '7%' },
          ]
          return (
            <div
              key={rail.id}
              data-rail
              className="absolute"
              style={positions[i] as React.CSSProperties}
            >
              <Glass radius="lg" padding="sm" mouseGlow={false}>
                <div className="flex items-center gap-2 px-1">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{
                      background: `linear-gradient(135deg, ${rail.color}60, ${rail.color}20)`,
                      border: `1px solid ${rail.color}40`,
                      color: rail.color === '#FFCB05' ? '#000' : '#fff',
                    }}
                  >
                    {rail.short}
                  </div>
                  <div className="pr-1">
                    <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: theme.textMuted }}>
                      Payout
                    </div>
                    <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                      {rail.label}
                    </div>
                  </div>
                </div>
              </Glass>
            </div>
          )
        })}
      </div>

      {/* Desktop: Vendor grid (hidden, revealed in Act 3) */}
      <div
        data-grid
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl px-6 mx-auto">
          {VENDOR_GRID.map((v) => (
            <div key={v.name} data-vendor-card>
              <Glass radius="lg" padding="md" mouseGlow={false}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
                  >
                    {v.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: theme.textPrimary }}>
                      {v.name}
                    </div>
                    <div className="text-[10px]" style={{ color: theme.textMuted }}>
                      {v.method} · {v.trades} trades
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: theme.accent }}>
                    GH₵ {v.rate}
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full"
                    style={{
                      color: v.risk === 'Low' ? theme.success : theme.warning,
                      backgroundColor: v.risk === 'Low' ? `${theme.success}15` : `${theme.warning}15`,
                    }}
                  >
                    {v.risk}
                  </span>
                </div>
              </Glass>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
        aria-hidden="true"
      >
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
          style={{ border: `2px solid ${theme.border}` }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
        </div>
      </motion.div>
    </section>
  )
}

// =============================================================================
// HeroPhoneScreen — USDC balance with countUp target + explosion panels
// =============================================================================

function HeroPhoneScreen() {
  const { theme } = useTheme()

  return (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{
        background: `radial-gradient(120% 60% at 50% 0%, ${theme.glow}18, transparent 60%), linear-gradient(180deg, ${theme.surface}, ${theme.background})`,
      }}
    >
      <div className="flex flex-col p-3 h-full relative z-10" style={{ opacity: 1 }}>
        {/* Status bar */}
        <div className="flex justify-between text-[9px] mt-2 mb-2" style={{ color: theme.textMuted }}>
          <span>9:41</span>
          <span style={{ color: theme.accent }}>● LIVE</span>
          <span>4G 100%</span>
        </div>

        {/* Brand */}
        <div className="flex justify-between items-center mb-3">
          <span
            className="font-black text-sm tracking-tight"
            style={{ fontFamily: 'Space Grotesk', color: theme.accent }}
          >
            AZAMAN
          </span>
          <div
            className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
            style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
          >
            UID-1
          </div>
        </div>

        {/* Balance card */}
        <div
          className="relative rounded-2xl p-3 overflow-hidden mb-3"
          style={{
            background: 'linear-gradient(135deg, #161618 0%, #0A0A0C 50%, #0B0E12 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10">
            <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              USDC Balance
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>$</span>
              <span
                data-balance
                className="text-xl font-black"
                style={{ fontFamily: 'Space Grotesk', color: '#fff' }}
              >
                0.00
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px] mt-1">
              <span data-usdc-chip style={{ color: theme.accent }}>
                ◎ USDC
              </span>
              <span style={{ color: theme.success }}>+2.41%</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="text-[9px] uppercase tracking-[0.18em] px-1 mb-2" style={{ color: theme.textMuted }}>
          Instant Cashout
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {[
            { name: 'CashApp', short: '$', color: '#00D54B', rate: '11.44' },
            { name: 'Zelle', short: 'ZL', color: '#6D1ED4', rate: '11.48' },
            { name: 'MoMo', short: 'MM', color: '#FFCB05', rate: '11.52' },
            { name: 'Bank Transfer', short: 'BK', color: '#0088FF', rate: '11.46' },
          ].map((v) => (
            <div
              key={v.name}
              className="flex items-center gap-2 p-2 rounded-xl"
              style={{
                backgroundColor: `${theme.surface}90`,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black flex-shrink-0"
                style={{
                  background: `${v.color}30`,
                  border: `1px solid ${v.color}40`,
                  color: v.color,
                }}
              >
                {v.short}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold" style={{ color: theme.textPrimary }}>{v.name}</div>
              </div>
              <div className="text-[9px] font-bold" style={{ color: theme.accent }}>GH₵ {v.rate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explosion panels — 6-cell overlay for Act 3 shatter (DESKTOP ONLY) */}
      {/* Start transparent — GSAP will set opacity:1 when ready */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-3 z-20 hidden lg:grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            data-panel
            className="border border-white/[0.02]"
            style={{
              background: theme.background,
              clipPath: 'inset(0)',
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
