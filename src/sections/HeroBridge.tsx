// =============================================================================
// HeroBridge — "The Global Bridge"
// A pinned, scroll-scrubbed cinematic. Three acts:
//   1) Phone floats in. USDC balance counts up. Headline reveals word-by-word.
//   2) USDC chip detaches and routes to Zelle / CashApp / MoMo / Bank rails.
//   3) Phone "breaks" into 6 panels revealing a P2P marketplace grid behind it.
// Multi-layer parallax: bg orbs (slowest), mid geometry, foreground (slight neg).
// =============================================================================

import type React from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Globe, Sparkles, TrendingUp } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import PhoneFrame from '@/components/PhoneFrame'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnim } from '@/hooks/use-scroll-anim'
import { useLenis } from '@/lib/lenis'
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const RAILS = [
  { id: 'zelle', label: 'Zelle', short: 'ZL', color: '#6D1ED4', position: { top: '14%', left: '6%' } },
  { id: 'cashapp', label: 'Cash App', short: '$', color: '#00D54B', position: { top: '64%', left: '8%' } },
  { id: 'momo', label: 'MoMo', short: 'MO', color: '#FFCC08', position: { top: '20%', right: '8%' } },
  { id: 'bank', label: 'Bank', short: 'BK', color: '#3B82F6', position: { top: '70%', right: '6%' } },
]

const VENDOR_GRID = [
  { name: 'KwameGold', rate: '11.44', method: 'Bank', risk: 'Low' },
  { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', risk: 'Low' },
  { name: 'KofiBarter', rate: '11.60', method: 'CashApp', risk: 'Med' },
  { name: 'AmaCrypto', rate: '11.46', method: 'Bank', risk: 'Low' },
  { name: 'NanaTrades', rate: '11.50', method: 'MoMo', risk: 'Low' },
  { name: 'YawCash', rate: '11.55', method: 'MoMo', risk: 'Med' },
]

export default function HeroBridge() {
  const { theme } = useTheme()
  const { scrollTo } = useLenis()

  // Outer parallax for orbs (Framer-driven, separate from the GSAP timeline)
  const outerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // GSAP scroll timeline scoped to the inner section
  const sceneRef = useScrollAnim<HTMLDivElement>(({ ref, gsap }) => {
    if (prefersReducedMotion()) return

    const root = ref.current
    if (!root) return

    // On mobile/tablet, skip the pinned scrub entirely — it causes scroll jank
    // and the exploding phone panels don't read well on small screens.
    const isMobile = window.innerWidth < 1024

    const phone = root.querySelector('[data-phone]') as HTMLElement | null
    const phoneShell = root.querySelector('[data-phone-shell]') as HTMLElement | null
    const headlineWords = root.querySelectorAll<HTMLElement>('[data-word]')
    const subline = root.querySelector('[data-subline]') as HTMLElement | null
    const ctas = root.querySelector('[data-ctas]') as HTMLElement | null
    const trust = root.querySelector('[data-trust]') as HTMLElement | null
    const railNodes = root.querySelectorAll<HTMLElement>('[data-rail]')
    const usdcChip = root.querySelector('[data-usdc-chip]') as HTMLElement | null
    const phonePanels = root.querySelectorAll<HTMLElement>('[data-panel]')
    const grid = root.querySelector('[data-grid]') as HTMLElement | null

    // Initial states — smaller offset on mobile for snappier feel
    gsap.set(phone, { y: isMobile ? 40 : 80, rotateX: isMobile ? 10 : 18, opacity: 0 })
    gsap.set(headlineWords, { y: isMobile ? 30 : 50, opacity: 0, filter: 'blur(8px)' })
    gsap.set([subline, ctas, trust], { y: 16, opacity: 0 })
    gsap.set(railNodes, { opacity: 0, scale: 0.6 })
    gsap.set(phonePanels, { x: 0, y: 0, rotation: 0, opacity: 1 })
    gsap.set(grid, { opacity: 0, y: 30 })

    // Intro (not scrubbed — plays on mount once)
    // Faster on mobile so the user sees the full phone quickly
    const speed = isMobile ? 0.65 : 1
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .to(phone, { y: 0, rotateX: 0, opacity: 1, duration: 0.7 * speed }, 0)
      .to(headlineWords, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5 * speed, stagger: 0.05 }, 0.1 * speed)
      .to(subline, { y: 0, opacity: 1, duration: 0.4 * speed }, 0.4 * speed)
      .to(ctas, { y: 0, opacity: 1, duration: 0.4 * speed }, 0.5 * speed)
      .to(trust, { y: 0, opacity: 1, duration: 0.4 * speed }, 0.6 * speed)

    // On mobile, just fade in the rails and skip the pin/scrub/explode
    if (isMobile) {
      intro.to(railNodes, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06 }, 0.6)
      return () => { intro.kill() }
    }

    // Scroll timeline — pin and scrub the journey (Acts 2 + 3)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
      defaults: { ease: 'power2.inOut' },
    })

    // Phase 1 (0 -> 0.4): rails fade in, USDC chip detaches and shoots to all rails
    tl.to(railNodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 }, 0)
    if (usdcChip) {
      tl.to(usdcChip, { y: -40, scale: 1.05, duration: 0.4 }, 0.05)
      tl.to(usdcChip, { x: -180, opacity: 0.3, duration: 0.5 }, 0.4)
      tl.to(usdcChip, { x: 0, opacity: 1, duration: 0.001 }, 0.9) // reset for cleanliness
    }
    if (phoneShell) {
      tl.to(phoneShell, { rotateY: -8, scale: 1.02, duration: 0.6 }, 0.2)
    }

    // Phase 2 (0.5 -> 1): phone explodes into 6 panels, grid reveals behind
    const explodes = [
      { x: -260, y: -120, rotation: -22 },
      { x: 270, y: -110, rotation: 18 },
      { x: -220, y: 0, rotation: -10 },
      { x: 240, y: 10, rotation: 12 },
      { x: -200, y: 140, rotation: 14 },
      { x: 220, y: 160, rotation: -16 },
    ]
    phonePanels.forEach((panel, i) => {
      tl.to(
        panel,
        { x: explodes[i].x, y: explodes[i].y, rotation: explodes[i].rotation, opacity: 0.18, duration: 0.7 },
        0.6 + i * 0.04
      )
    })
    tl.to(grid, { opacity: 1, y: 0, duration: 0.7 }, 0.7)

    return () => {
      intro.kill()
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.refresh()
    }
  })

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollTo(target, { offset: -64 })
  }

  return (
    <section
      ref={outerRef}
      id="hero"
      className="relative w-full"
      style={{ backgroundColor: theme.background }}
    >
      <div ref={sceneRef} className="relative w-full h-[100dvh] overflow-hidden">
        <ParticleCanvas />

        {/* Layer A — slowest parallax, ambient orbs */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-[1] pointer-events-none">
          <div
            className="absolute"
            style={{
              top: '12%',
              left: '6%',
              width: 460,
              height: 460,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.accent}18 0%, transparent 70%)`,
              filter: 'blur(70px)',
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '10%',
              right: '4%',
              width: 540,
              height: 540,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.accentSecondary}14 0%, transparent 70%)`,
              filter: 'blur(90px)',
            }}
          />
        </motion.div>

        {/* Layer B — mid parallax, grid + geometry */}
        <motion.div style={{ y: yMid }} className="absolute inset-0 z-[1] pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(${theme.textPrimary}30 1px, transparent 1px), linear-gradient(90deg, ${theme.textPrimary}30 1px, transparent 1px)`,
              backgroundSize: '64px 64px',
            }}
          />
          <motion.div
            className="absolute"
            style={{
              top: '14%',
              right: '14%',
              width: 130,
              height: 130,
              border: `1px solid ${theme.accent}25`,
              borderRadius: 8,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute"
            style={{
              bottom: '18%',
              left: '6%',
              width: 110,
              height: 110,
              border: `1px solid ${theme.accentSecondary}25`,
              borderRadius: '50%',
              borderTopColor: theme.accent,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Rails layer — currency network chips that react during scrub */}
        <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
          {RAILS.map((rail) => (
            <div
              key={rail.id}
              data-rail
              className="absolute"
              style={rail.position as React.CSSProperties}
            >
              <Glass radius="lg" padding="sm" surfaceOpacity={50} mouseGlow={false}>
                <div className="flex items-center gap-2 px-1">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{
                      background: `linear-gradient(135deg, ${rail.color}, color-mix(in srgb, ${rail.color} 70%, black))`,
                      color: '#fff',
                      boxShadow: `0 0 20px ${rail.color}80`,
                    }}
                  >
                    {rail.short}
                  </div>
                  <div className="pr-1">
                    <div
                      className="text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: theme.textMuted }}
                    >
                      Payout
                    </div>
                    <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                      {rail.label}
                    </div>
                  </div>
                </div>
              </Glass>
            </div>
          ))}
        </div>

        {/* Hidden marketplace grid — revealed in Act 3 */}
        <div
          data-grid
          className="absolute inset-0 z-[1] pointer-events-none hidden lg:flex items-center justify-center"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl px-6 mx-auto">
            {VENDOR_GRID.map((v) => (
              <Glass key={v.name} radius="lg" padding="md" surfaceOpacity={45} mouseGlow={false}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                    }}
                  >
                    {v.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: theme.textPrimary }}>
                      {v.name}
                    </div>
                    <div className="text-[10px]" style={{ color: theme.textMuted }}>
                      {v.method}
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
                      backgroundColor:
                        v.risk === 'Low' ? `${theme.success}15` : `${theme.warning}15`,
                    }}
                  >
                    {v.risk}
                  </span>
                </div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Foreground content */}
        <div className="relative z-[3] h-full w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 w-full max-w-[1280px] mx-auto px-5 lg:px-12 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  backgroundColor: `${theme.accent}10`,
                  border: `1px solid ${theme.accent}30`,
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: theme.accent }}
                  />
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: theme.textMuted }}
                >
                  Now Live in Ghana
                </span>
                <Sparkles size={10} style={{ color: theme.accent }} />
              </motion.div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[88px] font-bold leading-[0.95] tracking-[-0.03em] mb-7"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {['The', 'Global', 'Bridge', 'for'].map((word, i) => (
                  <span
                    key={i}
                    data-word
                    className="inline-block mr-[0.25em]"
                    style={{ color: theme.textPrimary }}
                  >
                    {word}
                  </span>
                ))}
                <span
                  data-word
                  className="inline-block"
                  style={{
                    color: theme.accent,
                    textShadow: `0 0 36px ${theme.accent}55`,
                  }}
                >
                  African Money.
                </span>
              </h1>

              <p
                data-subline
                className="text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                Trade USDC instantly. Send money for free. Cash out to Zelle, CashApp,
                or Mobile Money on demand. The most advanced P2P exchange built for
                emerging markets.
              </p>

              <div
                data-ctas
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10"
              >
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => handleCta(e, '#download')}
                  className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.isDark ? '#050508' : '#FFFFFF',
                    boxShadow: `0 0 32px ${theme.accent}40, 0 8px 24px rgba(0,0,0,0.3)`,
                  }}
                >
                  Download the App
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#auction"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => handleCta(e, '#auction')}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
                  style={{
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                    backgroundColor: `color-mix(in srgb, ${theme.surface} 60%, transparent)`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <TrendingUp size={18} />
                  See Leaderboard
                </motion.a>
              </div>

              <div
                data-trust
                className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3"
              >
                {[
                  { icon: ShieldCheck, label: 'Act 1154 Compliant' },
                  { icon: Zap, label: 'Instant Settlements' },
                  { icon: Globe, label: 'Zero Gas Fees' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme.textMuted }}
                  >
                    <Icon size={16} style={{ color: theme.accent }} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — phone */}
            <div
              data-phone
              className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center"
              style={{ perspective: '1400px' }}
            >
              <div data-phone-shell style={{ transformStyle: 'preserve-3d' }}>
                <PhoneFrame width={300} height={620} tilt className="hidden sm:block">
                  <HeroPhoneScreen />
                </PhoneFrame>
                {/* Smaller phone for mobile so it fits fully in viewport */}
                <PhoneFrame width={220} height={440} tilt className="block sm:hidden">
                  <HeroPhoneScreen />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3]"
        >
          <div
            className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
            style={{ border: `2px solid ${theme.border}` }}
          >
            <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// HeroPhoneScreen — minimal but premium balance + USDC route content.
// 6 invisible panels overlay the screen; GSAP rotates/translates them in Act 3.
// =============================================================================

function HeroPhoneScreen() {
  const { theme } = useTheme()
  return (
    <div
      className="w-full h-full flex flex-col p-4"
      style={{
        background: `radial-gradient(120% 60% at 50% 0%, ${theme.glow}18, transparent 60%), linear-gradient(180deg, ${theme.surface}, ${theme.background})`,
      }}
    >
      {/* status bar */}
      <div className="flex justify-between text-[9px] mt-2 mb-3" style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span style={{ color: theme.accent }}>● LIVE</span>
        <span>4G  100%</span>
      </div>

      {/* brand */}
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

      {/* hologram balance card */}
      <div
        className="relative rounded-2xl p-4 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #161618 0%, #0A0A0C 50%, #0B0E12 100%)',
          border: '1px solid rgba(255,255,255,0.05)',
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
        <div className="relative z-10">
          <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Total Balance
          </div>
          <div className="text-2xl font-black mt-1" style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>
            GH₵ 12,450.00
          </div>
          <div className="flex items-center gap-2 text-[10px] mt-1">
            <span data-usdc-chip style={{ color: theme.accent }}>
              ◎ 1,088.65 USDC
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span style={{ color: theme.success }}>+2.41%</span>
          </div>
        </div>
      </div>

      {/* quick actions */}
      <div className="flex justify-between mt-4 px-1">
        {['Deposit', 'Withdraw', 'Transfer', 'Trade'].map((action) => (
          <div key={action} className="flex flex-col items-center gap-1.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${theme.accent}12`,
                border: `1px solid ${theme.accent}25`,
              }}
            >
              <span className="text-[11px] font-bold" style={{ color: theme.accent }}>
                {action[0]}
              </span>
            </div>
            <span className="text-[8px]" style={{ color: theme.textMuted }}>
              {action}
            </span>
          </div>
        ))}
      </div>

      {/* market preview */}
      <div className="mt-4 flex-1 flex flex-col gap-1.5">
        <div
          className="text-[9px] uppercase tracking-[0.18em] px-1"
          style={{ color: theme.textMuted }}
        >
          Best Vendors
        </div>
        {[
          { name: 'KwameGold', rate: '11.44', method: 'Bank' },
          { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo' },
          { name: 'KofiBarter', rate: '11.60', method: 'CashApp' },
        ].map((v) => (
          <div
            key={v.name}
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{
              backgroundColor: `${theme.surface}80`,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold"
              style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
            >
              {v.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold truncate" style={{ color: theme.textPrimary }}>
                {v.name}
              </div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>
                {v.method}
              </div>
            </div>
            <div className="text-[10px] font-bold" style={{ color: theme.accent }}>
              GH₵ {v.rate}
            </div>
          </div>
        ))}
      </div>

      {/* explosion panels — invisible 6-cell overlay scaled to phone screen */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            data-panel
            className="border border-white/[0.04]"
            style={{
              background: 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}
