// =============================================================================
// HowItWorksSection - one P2P trade, told as a 5-step story.
// Desktop: GSAP pinned horizontal scroll (same idiom as AppShowcase).
// Mobile: vertically stacked cards with Framer entrance.
// =============================================================================

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserCheck, Lock, Send, Wallet, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Glass from '@/components/Glass'
import AmbientOrbs from '@/components/AmbientOrbs'
import { useTheme } from '@/contexts/ThemeContext'
import type { ThemeColors } from '@/contexts/ThemeContext'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const CARD_W = 340
const CARD_GAP = 24

interface Step {
  num: string
  icon: LucideIcon
  title: string
  desc: string
  gradient: (t: ThemeColors) => string
}

const STEPS: Step[] = [
  {
    num: '01',
    icon: Search,
    title: 'Browse the Market',
    desc: 'Scan live P2P ads from verified vendors. Filter by payment method, rate, and trust score. Every vendor is KYC-verified.',
    gradient: (t) => `linear-gradient(135deg, ${t.accent}25, ${t.accentSecondary}15)`,
  },
  {
    num: '02',
    icon: UserCheck,
    title: 'Pick Your Vendor',
    desc: 'See KwameGold’s rate of 11.44 GH₵/USDC. 1,248 trades. Zero disputes. One tap to start the trade.',
    gradient: (t) => `linear-gradient(135deg, ${t.glow}20, ${t.accent}10)`,
  },
  {
    num: '03',
    icon: Lock,
    title: 'Funds Into Escrow',
    desc: 'USDC locks immediately in Azaman’s smart escrow. Neither party can access it until both sides confirm. Your money is safe.',
    gradient: (t) => `linear-gradient(135deg, ${t.success}20, ${t.glow}10)`,
  },
  {
    num: '04',
    icon: Send,
    title: 'Send & Confirm',
    desc: 'Pay via Cash App, Zelle, MoMo, or any supported rail. Upload your proof. The vendor releases escrow in seconds.',
    gradient: (t) => `linear-gradient(135deg, ${t.accent}30, ${t.success}20)`,
  },
  {
    num: '05',
    icon: Wallet,
    title: 'USDC in Your Wallet ✓',
    desc: 'Done. Your USDC is credited, receipt generated, trade logged. Total time: under 5 seconds.',
    gradient: (t) => `linear-gradient(135deg, ${t.accentSecondary}25, ${t.accent}15)`,
  },
]

function StepTop({ step, theme, height }: { step: Step; theme: ThemeColors; height: number }) {
  const Icon = step.icon
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ height, background: step.gradient(theme) }}
      aria-hidden="true"
    >
      <span
        className="absolute top-2 right-4 font-black leading-none"
        style={{ fontFamily: 'Space Grotesk', fontSize: 96, color: `${theme.accent}26` }}
      >
        {step.num}
      </span>
      <Icon size={48} style={{ color: theme.accent }} />
    </div>
  )
}

function StepBody({ step, theme }: { step: Step; theme: ThemeColors }) {
  return (
    <div className="flex flex-col gap-3 p-6">
      <span
        className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em]"
        style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
      >
        {step.num}
      </span>
      <h3 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
        {step.desc}
      </p>
    </div>
  )
}

function Header({ theme }: { theme: ThemeColors }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
      >
        <Sparkles size={12} />
        How It Works
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
        One trade.{' '}
        <br className="hidden sm:block" />
        <span className="text-gradient-flow">Five seconds.</span>
      </h2>
      <p className="text-lg max-w-2xl mx-auto mt-5" style={{ color: theme.textMuted }}>
        Every P2P trade on Azaman follows the same path. Transparent. Secure. Fast.
      </p>
    </motion.div>
  )
}

// Mobile: horizontal focus carousel; the centred card is large/full, its
// neighbours peek at the sides and dim. Mirrors the AppShowcase idiom.
function MobileStepCarousel({ steps, theme }: { steps: Step[]; theme: ThemeColors }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const CARD_MW = 300

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const items = scroller.querySelectorAll<HTMLElement>('[data-step-item]')
        const center = scroller.scrollLeft + scroller.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        items.forEach((el, i) => {
          const c = el.offsetLeft + el.offsetWidth / 2
          const d = Math.abs(c - center)
          if (d < bestDist) { bestDist = d; best = i }
        })
        setActive(best)
      })
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { scroller.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const goTo = (i: number) => {
    const el = scrollerRef.current?.querySelectorAll<HTMLElement>('[data-step-item]')[i]
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const spacer = `calc(50% - ${CARD_MW / 2}px)`

  return (
    <div className="mt-10">
      <div
        ref={scrollerRef}
        className="flex items-center overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', gap: 16 }}
      >
        <div className="shrink-0" style={{ width: spacer }} aria-hidden="true" />
        {steps.map((step, i) => {
          const isActive = i === active
          return (
            <div key={step.num} data-step-item className="shrink-0 snap-center" style={{ width: CARD_MW }}>
              <button
                onClick={() => goTo(i)}
                className="block w-full text-left transition-all duration-500 ease-out"
                style={{ transform: `scale(${isActive ? 1 : 0.9})`, opacity: isActive ? 1 : 0.45, filter: isActive ? 'none' : 'saturate(0.7)' }}
                data-cursor="hover"
                aria-label={step.title}
              >
                <Glass radius="2xl" padding="none" elevated mouseGlow className="flex flex-col">
                  <StepTop step={step} theme={theme} height={150} />
                  <StepBody step={step} theme={theme} />
                </Glass>
              </button>
            </div>
          )
        })}
        <div className="shrink-0" style={{ width: spacer }} aria-hidden="true" />
      </div>

      <div className="flex justify-center items-center gap-2 mt-7">
        {steps.map((s, i) => (
          <button
            key={s.num}
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.title}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 26 : 8,
              height: 8,
              backgroundColor: i === active ? theme.accent : `${theme.textMuted}55`,
              boxShadow: i === active ? `0 0 12px ${theme.accent}80` : 'none',
            }}
            data-cursor="hover"
          />
        ))}
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const steps = useMemo(() => STEPS, [])

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion()) return
    const section = sectionRef.current
    if (!section) return

    const pin = section.querySelector<HTMLElement>('[data-pin]')
    const strip = section.querySelector<HTMLElement>('[data-strip]')
    const cards = section.querySelectorAll<HTMLElement>('[data-card]')
    if (!pin || !strip) return

    const moveX = (CARD_W + CARD_GAP) * (steps.length - 1)
    // Centre the active card in the viewport: card 0 starts centred and card 5
    // (USDC in your wallet) ends centred, so the scroll resolves on it.
    const centerStart = window.innerWidth / 2 - CARD_W / 2

    cards.forEach((card, i) => {
      card.style.transform = `scale(${i === 0 ? 1 : 0.94})`
      card.style.opacity = i === 0 ? '1' : '0.7'
    })

    gsap.set(strip, { x: centerStart })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      },
    })
    tl.fromTo(strip, { x: centerStart }, { x: centerStart - moveX, ease: 'none' })

    tl.scrollTrigger!.vars.onUpdate = (self: ScrollTrigger) => {
      const active = Math.round(self.progress * (steps.length - 1))
      cards.forEach((card, i) => {
        const on = i === active
        card.style.transform = `scale(${on ? 1 : 0.94})`
        card.style.opacity = on ? '1' : '0.7'
      })
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [isDesktop, steps, theme])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 900px 500px at 50% 0%, ${theme.glow}14, transparent 70%)` }}
      />

      {isDesktop ? (
        <div data-pin className="relative z-10 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-12 w-full">
            <Header theme={theme} />
          </div>
          <div className="mt-12 overflow-hidden">
            <div data-strip className="flex items-stretch" style={{ gap: `${CARD_GAP}px` }}>
              {steps.map((step) => (
                <div key={step.num} data-card style={{ width: CARD_W, flexShrink: 0, transition: 'opacity 0.2s ease' }}>
                  <Glass radius="2xl" padding="none" elevated mouseGlow className="h-[500px] flex flex-col">
                    <StepTop step={step} theme={theme} height={180} />
                    <StepBody step={step} theme={theme} />
                  </Glass>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-[1280px] mx-auto py-24">
          <div className="px-5">
            <Header theme={theme} />
          </div>
          <MobileStepCarousel steps={steps} theme={theme} />
        </div>
      )}
    </section>
  )
}
