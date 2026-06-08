// =============================================================================
// HeroBridge - TOTAL REBUILD
// Full-screen cinematic hero. 3-act GSAP scroll timeline on desktop.
// Mobile: Framer Motion sequence, no pin.
// =============================================================================

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ShieldCheck, Zap, Globe } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import PhoneFrame from '@/components/PhoneFrame'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'
import { useMagnetic } from '@/hooks/use-magnetic'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const RAILS = [
  { id: 'momo', label: 'MTN MoMo', short: 'MM', color: '#FFCB05' },
  { id: 'telecel', label: 'Telecel Cash', short: 'TC', color: '#E2231A' },
  { id: 'airteltigo', label: 'AirtelTigo', short: 'AT', color: '#0033A0' },
  { id: 'bank', label: 'Bank Transfer', short: 'BK', color: '#0088FF' },
]

// -- Bridge clusters -----------------------------------------------------------
// Azaman's whole pitch is bridging LOCAL Ghanaian rails and GLOBAL/cross-border
// rails through a single neutral asset (USDC). Both clusters are shown together
// and a looping conversion animation moves value across the bridge in both
// directions. The animation is Framer-driven (autoplay/loop), so it renders
// IDENTICALLY on mobile and desktop - no scroll dependency, full consistency.
const LOCAL_RAILS = RAILS
const GLOBAL_RAILS = [
  { id: 'cashapp', label: 'Cash App', short: '$', color: '#00D54B' },
  { id: 'venmo', label: 'Venmo', short: 'V', color: '#3D95CE' },
  { id: 'zelle', label: 'Zelle', short: 'ZL', color: '#6D1ED4' },
  { id: 'applepay', label: 'Apple Pay', short: '⌘', color: '#A0A0A0' },
]

// Currency labels the central USDC core cycles through to signify conversion:
// local fiat -> the stablecoin bridge -> foreign fiat.
const BRIDGE_CYCLE = ['GH₵ 15.20', '◎ 1.00 USDC', '$ 1.00']

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
  const getAppRef = useMagnetic<HTMLSpanElement>()

  // BUG 1 FIX: Reactive isDesktop
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // --- DESKTOP: GSAP 3-act scroll timeline -------------------------------------
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
      // BLACK-SCREEN FIX: the shatter panels must START invisible so the live
      // phone screen is visible on load. They are momentarily flashed in and
      // then flung out during the Act-3 scroll explosion (see below). Forcing
      // opacity:1 here (the old behaviour) blanketed the screen in opaque dark
      // tiles before any scroll happened -> the hero phone read as a black slab.
      gsap.set(phonePanels, { x: 0, y: 0, rotation: 0, opacity: 0 })
      if (grid) gsap.set(grid, { opacity: 0, y: 30 })
      // Reset the balance to 0 up front so the count-up animates from zero. The
      // JSX default is the final figure (12,450.00) so reduced-motion and mobile
      // users, who never run this timeline, still read a meaningful static value.
      if (balanceEl) gsap.set(balanceEl, { innerText: '0' })

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
          innerText: '12450',
          duration: 2,
          delay: 0.8,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate() {
            const val = parseFloat(balanceEl.innerText.replace(/,/g, '') || '0')
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
      // Phone stays fully visible through the whole scroll. The vendor grid
      // reveals on a lower z-index (z-[1]) than the phone layer (z-[2]), so the
      // cards settle UNDER the phone as background detail (fine if hidden).
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

  // --- MOBILE: GSAP intro (no pin) --------------------------------------------
  useEffect(() => {
    if (isDesktop || prefersReducedMotion()) return
    const root = sectionRef.current
    if (!root) return

    // BUG 2 FIX: setTimeout + null guards + fallback
    const timer = setTimeout(() => {
      try {
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

        intro.eventCallback('onInterrupt', () => {
          gsap.set(phone, { opacity: 1, y: 0 })
        })
      } catch {
        // Fallback: ensure phone is always visible if GSAP fails
        const phone = root.querySelector('[data-phone]') as HTMLElement
        if (phone) gsap.set(phone, { opacity: 1, y: 0 })
      }
    }, 100)

    return () => { clearTimeout(timer) }
  }, [isDesktop])

  // --- SHARED: Payment-bridge scroll reveal (mobile + desktop) -----------------
  // The desktop hero owns a pinned/scrubbed timeline and the old mobile path had
  // NO scroll-driven motion at all. This non-pinned reveal fires on BOTH form
  // factors (start: 'top 88%', once) so the bridge animates in on scroll the same
  // way everywhere - the consistency fix. The bridge's internal conversion loop
  // autoplays regardless, so reduced-motion users still see a static, legible
  // bridge (we just skip the entrance tween here).
  useEffect(() => {
    if (prefersReducedMotion()) return
    const root = sectionRef.current
    if (!root) return
    let tween: ReturnType<typeof gsap.fromTo> | null = null
    const timer = setTimeout(() => {
      const bridge = root.querySelector('[data-bridge]') as HTMLElement | null
      if (!bridge) return
      tween = gsap.fromTo(
        bridge,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: bridge, start: 'top 88%', once: true },
        }
      )
    }, 120)
    return () => {
      clearTimeout(timer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(tween as any)?.scrollTrigger?.kill?.()
      tween?.kill()
    }
  }, [])

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
        {/* pt clears the fixed floating nav (~80px) so centered hero content
            never tucks under it on first paint - esp. now the bridge makes
            the column taller. */}
        <div className="w-full max-w-[1280px] mx-auto px-5 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[72px] xl:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] mb-7"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {HEADLINE_WORDS.map((word, i) => {
                  const isAccent = word === 'Finance.' || word === 'Different.'
                  return (
                    <span
                      key={i}
                      data-word
                      className={`inline-block mr-[0.25em] ${isAccent ? 'text-gradient-flow' : ''}`}
                      style={{
                        color: isAccent ? undefined : theme.textPrimary,
                      }}
                    >
                      {word}
                    </span>
                  )
                })}
              </h1>

              {/* Subline */}
              <p
                data-subline
                className="text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                Trade, save, and move money at the speed of trust. P2P stablecoin swaps,
                group Susu savings, secure Vaults, and instant MoMo cash-out: all in one app.
              </p>

              {/* CTAs */}
              <div
                data-ctas
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-10"
              >
                <span ref={getAppRef} className="inline-block">
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
                </span>

                <a
                  href="#features"
                  onClick={(e) => handleCta(e, '#features')}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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

              {/* Trust badges below phone - desktop */}
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

          {/* Payment bridge - LOCAL <-> USDC <-> GLOBAL conversion (all breakpoints) */}
          <PaymentBridge />
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
// HeroPhoneScreen - USDC balance with countUp target + explosion panels
// =============================================================================

function HeroPhoneScreen() {
  const { theme } = useTheme()

  return (
    <div
      className="az-crt w-full h-full overflow-hidden relative"
      style={{
        background: theme.surface || '#0d0e12',
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(120% 60% at 50% 0%, ${theme.glow || '#7c3aed'}18, transparent 60%)`,
        }}
      />
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
              Total Balance
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>GH₵</span>
              <span
                data-balance
                className="text-xl font-black"
                style={{ fontFamily: 'Space Grotesk', color: '#fff' }}
              >
                12,450.00
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px] mt-1">
              <span data-usdc-chip style={{ color: theme.accent }}>
                ◎ 1,088.65 USDC
              </span>
              <span style={{ color: theme.success }}>+2.41%</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="text-[9px] uppercase tracking-[0.18em] px-1 mb-2" style={{ color: theme.textMuted }}>
          INSTANT CASHOUT
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {[
            { name: 'Cash App', short: '$', color: '#00D54B', sub: '$cashtag', rate: '11.44' },
            { name: 'Venmo', short: 'V', color: '#3D95CE', sub: '@handle', rate: '11.48' },
            { name: 'Zelle', short: 'ZL', color: '#6D1ED4', sub: 'email/phone', rate: '11.52' },
            { name: 'Apple Pay', short: '⌘', color: '#A0A0A0', sub: 'instant', rate: '11.46' },
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
                <div className="text-[8px]" style={{ color: theme.textMuted }}>{v.sub}</div>
              </div>
              <div className="text-[9px] font-bold" style={{ color: theme.accent }}>GH₵ {v.rate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Explosion panels - 6-cell overlay for Act 3 shatter (DESKTOP ONLY) */}
      {/* Start transparent - GSAP will set opacity:1 when ready */}
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

      {/* CRT power-on flash + persistent scanlines for an analog, old-TV feel. */}
      <div
        className="az-crt-flash pointer-events-none absolute inset-0 z-30"
        aria-hidden="true"
        style={{
          background: `radial-gradient(120% 80% at 50% 50%, ${theme.glow || '#ffffff'}, transparent 70%)`,
          opacity: 0,
        }}
      />
      <div className="az-scanlines pointer-events-none absolute inset-0 z-30" aria-hidden="true" />

      <style>{`
        .az-crt { transform-origin: center center; backface-visibility: hidden; }
        .az-scanlines {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.10) 0px,
            rgba(0,0,0,0.10) 1px,
            transparent 1px,
            transparent 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.3;
        }
        @media (prefers-reduced-motion: no-preference) {
          .az-crt { animation: azCrtOn 1150ms cubic-bezier(0.2, 0.8, 0.2, 1) 420ms both; }
          .az-crt-flash { animation: azCrtFlash 1150ms ease-out 420ms both; }
        }
        @keyframes azCrtOn {
          0%   { transform: scale(1, 0.003); filter: brightness(5) contrast(1.4); opacity: 0; }
          12%  { transform: scale(1, 0.004); filter: brightness(5) contrast(1.4); opacity: 1; }
          40%  { transform: scale(1, 0.008); filter: brightness(4) contrast(1.3); opacity: 1; }
          58%  { transform: scale(1.015, 1.05); filter: brightness(2.2) contrast(1.15); }
          74%  { transform: scale(0.998, 0.985); filter: brightness(1.35); }
          100% { transform: scale(1, 1); filter: brightness(1) contrast(1); opacity: 1; }
        }
        @keyframes azCrtFlash {
          0%, 46% { opacity: 0; }
          58% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// =============================================================================
// PaymentBridge - the "bridging the gap" centerpiece.
// LOCAL rails (left)  <->  USDC core (center)  <->  GLOBAL rails (right)
// A looping, Framer-driven conversion animation runs in BOTH directions and the
// core cycles its currency label (GH₵ -> USDC -> $). Autoplay + loop means it is
// pixel-consistent across mobile and desktop with no scroll dependency. Layout
// is horizontal on desktop and stacks vertically on mobile.
// =============================================================================

type Rail = { id: string; label: string; short: string; color: string }

function PaymentBridge() {
  const { theme } = useTheme()
  return (
    <div data-bridge className="relative mx-auto mt-10 lg:mt-12 max-w-4xl">
      <div className="text-center mb-6">
        <div className="text-[11px] uppercase tracking-[0.24em] mb-1.5" style={{ color: theme.textMuted }}>
          One asset · every border
        </div>
        <div className="text-sm lg:text-base font-medium" style={{ color: theme.textSecondary }}>
          Local money and global money - bridged through USDC, settled in seconds.
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-5">
        <ChipCluster title="Local" rails={LOCAL_RAILS} />
        <BridgeConnector />
        <UsdcCore />
        <BridgeConnector reverse />
        <ChipCluster title="Global" rails={GLOBAL_RAILS} />
      </div>
    </div>
  )
}

function ChipCluster({ title, rails }: { title: string; rails: Rail[] }) {
  const { theme } = useTheme()
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>
        {title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {rails.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.9 }}
            animate={{
              opacity: [0.9, 1, 0.9],
              boxShadow: [`0 0 0px ${r.color}00`, `0 0 14px ${r.color}66`, `0 0 0px ${r.color}00`],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
          >
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black shrink-0"
              style={{ background: `${r.color}22`, color: r.color }}
            >
              {r.short}
            </span>
            <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: theme.textPrimary }}>
              {r.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BridgeConnector({ reverse = false }: { reverse?: boolean }) {
  const { theme } = useTheme()
  const dot = { background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }
  const delay = reverse ? 0.9 : 0
  return (
    <>
      {/* Desktop: horizontal connector */}
      <div
        className="hidden lg:block relative h-[2px] flex-1 min-w-[56px] max-w-[120px] rounded-full"
        style={{ background: theme.border }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: `linear-gradient(${reverse ? 270 : 90}deg, ${theme.accent}, ${theme.glow})`,
          }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={dot}
          animate={{ left: reverse ? ['100%', '0%'] : ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </div>
      {/* Mobile: vertical connector */}
      <div
        className="lg:hidden relative w-[2px] h-7 rounded-full self-center"
        style={{ background: theme.border }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: `linear-gradient(${reverse ? 0 : 180}deg, ${theme.accent}, ${theme.glow})`,
          }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={dot}
          animate={{ top: reverse ? ['100%', '0%'] : ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </div>
    </>
  )
}

function UsdcCore() {
  const { theme } = useTheme()
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BRIDGE_CYCLE.length), 1600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative flex flex-col items-center justify-center shrink-0 py-1">
      {/* expanding pulse ring */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{ width: 72, height: 72, border: `1px solid ${theme.accent}` }}
        animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.div
        className="relative w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${theme.accent}, ${theme.glow})`,
          boxShadow: `0 0 36px ${theme.accent}66`,
          color: theme.isDark ? '#000' : '#fff',
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-black tracking-wide leading-none">USDC</span>
        <div className="h-[14px] overflow-hidden mt-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ y: 9, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block text-[9px] font-bold whitespace-nowrap leading-none"
            >
              {BRIDGE_CYCLE[i]}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="mt-2 text-[9px] uppercase tracking-[0.18em]" style={{ color: theme.textMuted }}>
        Bridge
      </div>
    </div>
  )
}
