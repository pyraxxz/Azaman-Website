// =============================================================================
// SusuEngineSection — "The Savings Circle. Reimagined."
// Desktop: 50/50 with GSAP scroll-pinned 4-act circle animation
// Mobile: horizontal snap-scroll cards with animated SVGs + progress dots
// =============================================================================

import { useRef, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import AmbientOrbs from '@/components/AmbientOrbs'
import { useScrollAnim } from '@/hooks/use-scroll-anim'
import { prefersReducedMotion } from '@/lib/gsap'

interface SusuMember {
  id: string
  name: string
  initials: string
  trust: number
  isPayee?: boolean
  isNextPayee?: boolean
  position: { x: number; y: number }
}

const RADIUS = 38
const CENTER = { x: 50, y: 50 }
const COUNT = 5

function buildMembers(): SusuMember[] {
  const names = ['Akua', 'Kwame', 'Yaa', 'Kojo', 'Ama']
  const initials = ['AK', 'KW', 'YA', 'KJ', 'AM']
  const trust = [92, 88, 95, 79, 84]
  const sorted = [...trust].sort((a, b) => b - a)
  const payeeIdx = trust.indexOf(sorted[0])
  const nextPayeeIdx = trust.indexOf(sorted[1])
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * 2 * Math.PI - Math.PI / 2
    return {
      id: `m-${i}`,
      name: names[i],
      initials: initials[i],
      trust: trust[i],
      isPayee: i === payeeIdx,
      isNextPayee: i === nextPayeeIdx,
      position: {
        x: CENTER.x + Math.cos(angle) * RADIUS,
        y: CENTER.y + Math.sin(angle) * RADIUS,
      },
    }
  })
}

const STEPS = [
  { n: 1, title: 'Create Your Circle', desc: 'Invite 5 people you trust. Set weekly or monthly contribution in USDC.' },
  { n: 2, title: 'Everyone Contributes', desc: 'Each cycle, members lock contribution. Smart escrow handles the rest.' },
  { n: 3, title: 'Take Your Payout', desc: 'Highest-trust member goes first. Default? Your stake gets seized.' },
]

export default function SusuEngineSection() {
  const { theme } = useTheme()
  const members = useMemo(() => buildMembers(), [])

  // Desktop GSAP scroll-scrubbed pin — 4 acts over 3× viewport
  const stageRef = useScrollAnim<HTMLDivElement>(({ ref, gsap: g }) => {
    if (prefersReducedMotion()) return
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    const root = ref.current
    if (!root) return

    const avatars = root.querySelectorAll<SVGGElement>('[data-member]')
    const pool = root.querySelector<SVGGElement>('[data-pool]')
    const poolClip = root.querySelector<SVGRectElement>('[data-pool-clip-rect]')
    const contribOrbs = root.querySelectorAll<SVGCircleElement>('[data-contrib]')
    const payoutOrb = root.querySelector<SVGCircleElement>('[data-payout]')
    const cycleBadge = root.querySelector<HTMLElement>('[data-cycle-badge]')
    const cycleText = root.querySelector<HTMLElement>('[data-cycle-text]')
    const payeeIdx = members.findIndex((m) => m.isPayee)
    const nextPayeeIdx = members.findIndex((m) => m.isNextPayee)

    g.set(avatars, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' })
    g.set(pool, { scale: 0.5, opacity: 0, transformOrigin: '50% 50%' })
    g.set(contribOrbs, { opacity: 0 })
    g.set(payoutOrb, { opacity: 0 })
    if (cycleBadge) g.set(cycleBadge, { opacity: 0, y: 8 })
    if (poolClip) g.set(poolClip, { attr: { height: 0 } })

    const tl = g.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 20%',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // Act 1 (0–0.25): Avatars enter one by one
    avatars.forEach((a, i) => {
      tl.to(a, { opacity: 1, scale: 1, duration: 0.12, ease: 'back.out(1.6)' }, 0.02 + i * 0.04)
    })
    tl.to(pool, { opacity: 1, scale: 1, duration: 0.15, ease: 'power3.out' }, 0.1)

    // Act 2 (0.25–0.5): Contribution orbs travel to pool, pool fills via clipPath
    contribOrbs.forEach((orb, i) => {
      const member = members[i]
      g.set(orb, { attr: { cx: member.position.x, cy: member.position.y }, opacity: 0 })
      tl.to(orb, { opacity: 1, duration: 0.04 }, 0.25 + i * 0.03)
      tl.to(orb, { attr: { cx: CENTER.x, cy: CENTER.y }, duration: 0.12, ease: 'power2.in' }, 0.25 + i * 0.03)
      tl.to(orb, { opacity: 0, duration: 0.04 }, 0.37 + i * 0.03)
    })
    if (poolClip) {
      tl.to(poolClip, { attr: { height: 20, y: CENTER.y - 10 }, duration: 0.2, ease: 'power2.out' }, 0.3)
    }
    tl.to(pool, { scale: 1.15, duration: 0.15 }, 0.35)

    // Act 3 (0.5–0.75): Crown on payee, payout orb travels, payee scales up
    if (payoutOrb) {
      const payeePos = members[payeeIdx].position
      g.set(payoutOrb, { attr: { cx: CENTER.x, cy: CENTER.y } })
      tl.to(payoutOrb, { opacity: 1, duration: 0.06 }, 0.5)
      tl.to(payoutOrb, { attr: { cx: payeePos.x, cy: payeePos.y }, duration: 0.18, ease: 'power2.inOut' }, 0.52)
      tl.to(payoutOrb, { opacity: 0, duration: 0.06 }, 0.7)
      tl.to(avatars[payeeIdx], { scale: 1.25, duration: 0.1, ease: 'back.out(1.6)' }, 0.65)
      tl.to(avatars[payeeIdx], { scale: 1, duration: 0.08 }, 0.76)
    }

    // Act 4 (0.75–1.0): Pool empties, cycle counter flips, next payee glows
    if (poolClip) {
      tl.to(poolClip, { attr: { height: 0 }, duration: 0.15, ease: 'power2.in' }, 0.78)
    }
    tl.to(pool, { scale: 1, duration: 0.12 }, 0.8)
    if (cycleBadge) tl.to(cycleBadge, { opacity: 1, y: 0, duration: 0.1 }, 0.85)
    if (cycleText) tl.fromTo(cycleText, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 0.87)
    if (avatars[nextPayeeIdx]) tl.to(avatars[nextPayeeIdx], { attr: { 'stroke-width': '0.8' }, duration: 0.1 }, 0.9)

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  })

  return (
    <section
      id="susu"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: theme.background }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${theme.glow}12, transparent 70%)` }} />
      <AmbientOrbs count={2} />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}>
            <Users size={12} />
            Susu Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            The Savings Circle. <span className="text-gradient-flow">Reimagined.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Susu is the oldest savings system in Africa. We just made it trustless, digital, and powered by USDC. Your group. Your rules. Your payout.
          </p>
        </motion.div>

        {/* Desktop: 50/50 layout */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-start">
          <div ref={stageRef}>
            <Glass radius="2xl" padding="lg" elevated mouseGlow className="overflow-hidden">
              <div className="aspect-square w-full max-w-[480px] mx-auto relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="susu-pool-grad">
                      <stop offset="0%" stopColor={theme.accent} stopOpacity="1" />
                      <stop offset="60%" stopColor={theme.accent} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                    </radialGradient>
                    <clipPath id="pool-fill-clip">
                      <rect data-pool-clip-rect x={CENTER.x - 10} y={CENTER.y} width="20" height="0" />
                    </clipPath>
                  </defs>
                  {members.map((m) => (
                    <line key={`line-${m.id}`} x1={m.position.x} y1={m.position.y} x2={CENTER.x} y2={CENTER.y} stroke={theme.accent} strokeOpacity="0.2" strokeWidth="0.3" strokeDasharray="1 1">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="2s" repeatCount="indefinite" />
                    </line>
                  ))}
                  <g data-pool>
                    <circle cx={CENTER.x} cy={CENTER.y} r="10" fill="url(#susu-pool-grad)" opacity="0.3" />
                    <circle cx={CENTER.x} cy={CENTER.y} r="10" fill={theme.accent} opacity="0.6" clipPath="url(#pool-fill-clip)" />
                    <circle cx={CENTER.x} cy={CENTER.y} r="5" fill={theme.surface} stroke={theme.accent} strokeWidth="0.4" style={{ filter: `drop-shadow(0 0 4px ${theme.accent}80)` }} />
                    <text x={CENTER.x} y={CENTER.y + 1.2} textAnchor="middle" fontSize="3" fontFamily="Space Grotesk" fontWeight="800" fill={theme.accent}>USDC</text>
                  </g>
                  {members.map((_, i) => (
                    <circle key={`co-${i}`} data-contrib={i} r="1.2" fill={theme.accent} style={{ filter: `drop-shadow(0 0 2px ${theme.accent})` }} />
                  ))}
                  <circle data-payout r="2" fill={theme.accent} style={{ filter: `drop-shadow(0 0 6px ${theme.accent})` }} />
                  {members.map((m) => (
                    <g key={m.id} data-member transform={`translate(${m.position.x} ${m.position.y})`}>
                      <circle r="6" fill={theme.surface} stroke={m.isPayee ? theme.accent : m.isNextPayee ? `${theme.accent}80` : theme.border} strokeWidth={m.isPayee ? '0.5' : '0.3'} />
                      <circle r="7" fill="none" stroke={m.trust >= 85 ? theme.success : theme.warning} strokeWidth="0.6" strokeDasharray={`${(m.trust / 100) * 44} 44`} strokeLinecap="round" transform="rotate(-90)" />
                      <text x="0" y="1" textAnchor="middle" fontSize="3" fontFamily="Space Grotesk" fontWeight="700" fill={m.isPayee ? theme.accent : theme.textPrimary}>{m.initials}</text>
                      {m.isPayee && (<g transform="translate(0 -9)"><text x="0" y="1" textAnchor="middle" fontSize="4" fill={theme.accent}>♛</text></g>)}
                    </g>
                  ))}
                </svg>
                <div data-cycle-badge className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-2" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}50`, color: theme.accent }}>
                  <Crown size={12} />
                  <span data-cycle-text className="text-[11px] font-bold tracking-wider">CYCLE 2 · PAID OUT</span>
                </div>
              </div>
            </Glass>
          </div>
          <div className="flex flex-col gap-6 py-8">
            {STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative">
                <span className="absolute -left-2 -top-4 text-[72px] font-black pointer-events-none select-none" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary, opacity: 0.08 }}>{step.n}</span>
                <Glass radius="xl" padding="md" tilt tiltMax={4}>
                  <h3 className="text-xl font-bold mb-2 relative z-10" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: theme.textMuted }}>{step.desc}</p>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal snap-scroll */}
        <MobileSnapScroll theme={theme} />
      </div>
    </section>
  )
}

// =============================================================================
// Mobile snap-scroll — BUG FIXES:
// 1. No whileInView on individual cards (breaks in overflow-x scroll)
// 2. Section has no overflow-hidden (moved to specific elements)
// 3. Each card has animated SVG illustration
// 4. Progress dot strip below scroll container
// =============================================================================
function MobileSnapScroll({ theme }: { theme: ReturnType<typeof useTheme>['theme'] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  const handleScroll = () => {
    if (!hasScrolled) setHasScrolled(true)
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / 4))
    setActiveCard(Math.min(3, Math.max(0, idx)))
  }

  // Member positions for SVGs (80x80 viewBox, radius 28, center 40,40)
  const R = 28
  const CX = 40
  const CY = 40
  const memberPos = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * 2 * Math.PI - Math.PI / 2
    return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R }
  })

  return (
    <div className="lg:hidden relative">
      {/* Swipe hint arrows */}
      {!hasScrolled && (
        <>
          <div className="absolute left-2 top-[140px] z-10 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.surface}CC`, border: `1px solid ${theme.border}` }}>
            <ChevronLeft size={14} style={{ color: theme.textMuted }} />
          </div>
          <div className="absolute right-2 top-[140px] z-10 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.surface}CC`, border: `1px solid ${theme.border}` }}>
            <ChevronRight size={14} style={{ color: theme.textMuted }} />
          </div>
        </>
      )}

      {/* Scroll container — animated as a whole, not individual cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="-mx-5 px-5 overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-4 w-max">
            {/* Card 1: Build Your Circle */}
            <div className="flex-shrink-0" style={{ width: '85vw', maxWidth: 340, scrollSnapAlign: 'start' }}>
              <Glass radius="2xl" padding="lg" tilt tiltMax={5} className="h-[280px]">
                <div className="flex flex-col h-full">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2">
                    {memberPos.map((p, i) => (
                      <line key={i} x1={p.x} y1={p.y} x2={CX} y2={CY} stroke={theme.accent} strokeOpacity="0.2" strokeWidth="0.5" />
                    ))}
                    <circle cx={CX} cy={CY} r="5" fill={`${theme.accent}40`} stroke={theme.accent} strokeWidth="0.5" />
                    {memberPos.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill={theme.surface} stroke={theme.accent} strokeWidth="0.5" />
                    ))}
                  </svg>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>Build Your Circle</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: theme.textMuted }}>Invite 5 trusted members. Set USDC contribution amount and frequency.</p>
                  <div className="text-[10px] uppercase tracking-wider mt-2" style={{ color: theme.accent }}>Step 1 of 4</div>
                </div>
              </Glass>
            </div>

            {/* Card 2: Everyone Contributes — dots animate toward center */}
            <div className="flex-shrink-0" style={{ width: '85vw', maxWidth: 340, scrollSnapAlign: 'start' }}>
              <Glass radius="2xl" padding="lg" tilt tiltMax={5} className="h-[280px]">
                <div className="flex flex-col h-full">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2">
                    <defs>
                      {memberPos.map((p, i) => (
                        <path key={i} id={`line-path-${i}`} d={`M ${p.x} ${p.y} L ${CX} ${CY}`} />
                      ))}
                    </defs>
                    {memberPos.map((p, i) => (
                      <line key={i} x1={p.x} y1={p.y} x2={CX} y2={CY} stroke={theme.accent} strokeOpacity="0.15" strokeWidth="0.5" />
                    ))}
                    <circle cx={CX} cy={CY} r="6" fill={`${theme.accent}50`} stroke={theme.accent} strokeWidth="0.5" />
                    {memberPos.map((p, i) => (
                      <circle key={`m-${i}`} cx={p.x} cy={p.y} r="4" fill={theme.surface} stroke={theme.accent} strokeWidth="0.5" />
                    ))}
                    {/* Animated dots traveling to center */}
                    {memberPos.map((_, i) => (
                      <circle key={`anim-${i}`} r="2" fill={theme.accent}>
                        <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${i * 0.28}s`}>
                          <mpath href={`#line-path-${i}`} />
                        </animateMotion>
                        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.7;1" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.28}s`} />
                      </circle>
                    ))}
                  </svg>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>Everyone Contributes</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: theme.textMuted }}>Each cycle, everyone locks their share. Smart escrow holds it safely.</p>
                  <div className="text-[10px] uppercase tracking-wider mt-2" style={{ color: theme.accent }}>Step 2 of 4</div>
                </div>
              </Glass>
            </div>

            {/* Card 3: Payout Time — pulse ring + crown */}
            <div className="flex-shrink-0" style={{ width: '85vw', maxWidth: 340, scrollSnapAlign: 'start' }}>
              <Glass radius="2xl" padding="lg" tilt tiltMax={5} className="h-[280px]">
                <div className="flex flex-col h-full">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2">
                    <circle cx={CX} cy={CY} r="6" fill={`${theme.accent}40`} stroke={theme.accent} strokeWidth="0.5" />
                    {/* Expanding pulse ring */}
                    <circle cx={CX} cy={CY} r="6" fill="none" stroke={theme.accent} strokeWidth="0.8">
                      <animate attributeName="r" values="6;20;6" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {memberPos.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill={theme.surface} stroke={i === 2 ? theme.accent : theme.border} strokeWidth={i === 2 ? '1' : '0.5'} />
                    ))}
                    {/* Crown above top member (index 2 = Yaa, highest trust) */}
                    <path d={`M ${memberPos[2].x - 4} ${memberPos[2].y - 7} l 2 -3 l 2 2 l 2 -2 l 2 3 Z`} fill={theme.accent} />
                  </svg>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>Payout Time</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: theme.textMuted }}>Highest-trust member receives the full pool. Crown + pulse confirmation.</p>
                  <div className="text-[10px] uppercase tracking-wider mt-2" style={{ color: theme.accent }}>Step 3 of 4</div>
                </div>
              </Glass>
            </div>

            {/* Card 4: Cycle Resets — highlighted member + "Cycle 2" text */}
            <div className="flex-shrink-0" style={{ width: '85vw', maxWidth: 340, scrollSnapAlign: 'start' }}>
              <Glass radius="2xl" padding="lg" tilt tiltMax={5} className="h-[280px]">
                <div className="flex flex-col h-full">
                  <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2">
                    {memberPos.map((p, i) => (
                      <line key={i} x1={p.x} y1={p.y} x2={CX} y2={CY} stroke={theme.accent} strokeOpacity="0.15" strokeWidth="0.5" />
                    ))}
                    <circle cx={CX} cy={CY} r="8" fill={`${theme.accent}20`} stroke={theme.accent} strokeWidth="0.5" />
                    <text x={CX} y={CY + 2} textAnchor="middle" fontSize="5" fontFamily="Space Grotesk" fontWeight="700" fill={theme.accent}>Cycle 2</text>
                    {memberPos.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="4" fill={theme.surface} stroke={i === 0 ? theme.accent : theme.border} strokeWidth={i === 0 ? '1.2' : '0.5'} />
                    ))}
                  </svg>
                  <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>Cycle Resets</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: theme.textMuted }}>Counter increments. Next payee highlighted. The circle grows stronger.</p>
                  <div className="text-[10px] uppercase tracking-wider mt-2" style={{ color: theme.accent }}>Step 4 of 4</div>
                </div>
              </Glass>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress dot strip */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 6,
              width: i === activeCard ? 20 : 6,
              borderRadius: 99,
              backgroundColor: i === activeCard ? theme.accent : theme.border,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
