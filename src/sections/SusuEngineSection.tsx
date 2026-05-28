// =============================================================================
// SusuEngineSection — "The Group Trust Economy"
// Five avatars in a circle around a central USDC pool. Scrubbed GSAP timeline
// drives a build → contribute → payout → reset cycle. Multi-layer parallax for
// background gradient, SVG rings, and the foreground copy.
// =============================================================================

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Crown, Users, Sparkles } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import { useScrollAnim } from '@/hooks/use-scroll-anim'
import { prefersReducedMotion } from '@/lib/gsap'

interface SusuMember {
  id: string
  name: string
  trust: number
  isPayee?: boolean
  position: { x: number; y: number } // % of viewBox
}

const RADIUS = 38
const CENTER = { x: 50, y: 50 }
const COUNT = 5

function buildMembers(): SusuMember[] {
  const names = ['Akua', 'Kwame', 'Yaa', 'Kojo', 'Ama']
  const trust = [92, 88, 95, 79, 84]
  // Trusted user (highest) gets the payout marker
  const payeeIdx = trust.indexOf(Math.max(...trust))
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * 2 * Math.PI - Math.PI / 2
    return {
      id: `m-${i}`,
      name: names[i],
      trust: trust[i],
      isPayee: i === payeeIdx,
      position: {
        x: CENTER.x + Math.cos(angle) * RADIUS,
        y: CENTER.y + Math.sin(angle) * RADIUS,
      },
    }
  })
}

export default function SusuEngineSection() {
  const { theme } = useTheme()
  const members = useMemo(() => buildMembers(), [])

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['-10%', '15%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const yFg = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  const stageRef = useScrollAnim<HTMLDivElement>(({ ref, gsap: g }) => {
    if (prefersReducedMotion()) return
    const root = ref.current
    if (!root) return

    const avatars = root.querySelectorAll<SVGGElement>('[data-member]')
    const ring = root.querySelector<SVGCircleElement>('[data-ring]')
    const pool = root.querySelector<SVGGElement>('[data-pool]')
    const contribOrbs = root.querySelectorAll<SVGCircleElement>('[data-contrib]')
    const payoutOrb = root.querySelector<SVGCircleElement>('[data-payout]')
    const payeeId = members.findIndex((m) => m.isPayee)
    const payeeAvatar = avatars[payeeId]
    const cycleBadge = root.querySelector<HTMLElement>('[data-cycle-badge]')

    // Initial states
    g.set(avatars, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
    g.set(ring, { strokeDashoffset: 1000, opacity: 0 })
    g.set(pool, { scale: 0.6, opacity: 0, transformOrigin: '50% 50%' })
    g.set(contribOrbs, { opacity: 0 })
    g.set(payoutOrb, { opacity: 0 })
    g.set(cycleBadge, { opacity: 0, y: 8 })

    const tl = g.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
    })

    // 1) Build phase: avatars appear, ring forms
    avatars.forEach((a, i) => {
      tl.to(a, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }, i * 0.06)
    })
    tl.to(ring, { opacity: 1, strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, 0)
    tl.to(pool, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 0.3)

    // 2) Contribution phase: orbs travel from each avatar to the central pool
    contribOrbs.forEach((orb, i) => {
      const member = members[i]
      const startX = member.position.x
      const startY = member.position.y
      g.set(orb, { attr: { cx: startX, cy: startY }, opacity: 0 })
      tl.to(orb, { opacity: 1, duration: 0.15 }, 0.6 + i * 0.05)
      tl.to(
        orb,
        {
          attr: { cx: CENTER.x, cy: CENTER.y },
          duration: 0.5,
          ease: 'power2.in',
        },
        0.6 + i * 0.05
      )
      tl.to(orb, { opacity: 0, duration: 0.15 }, 1.05 + i * 0.05)
    })
    // Pool grows with contributions
    tl.to(pool, { scale: 1.18, duration: 0.6, ease: 'power2.out' }, 0.7)

    // 3) Payout phase: bright orb travels to the payee avatar
    if (payeeAvatar && payoutOrb) {
      const payeePos = members[payeeId].position
      g.set(payoutOrb, { attr: { cx: CENTER.x, cy: CENTER.y } })
      tl.to(payoutOrb, { opacity: 1, duration: 0.25 }, 1.5)
      tl.to(
        payoutOrb,
        {
          attr: { cx: payeePos.x, cy: payeePos.y },
          duration: 0.8,
          ease: 'power2.inOut',
        },
        1.55
      )
      tl.to(payoutOrb, { opacity: 0, duration: 0.25 }, 2.4)
      // Payee scale + crown highlight
      tl.to(payeeAvatar, { scale: 1.18, duration: 0.4, ease: 'back.out(1.6)' }, 2.2)
      tl.to(payeeAvatar, { scale: 1, duration: 0.4 }, 2.7)
      tl.to(cycleBadge, { opacity: 1, y: 0, duration: 0.4 }, 2.4)
    }

    // 4) Pool shrinks back as cycle completes
    tl.to(pool, { scale: 1, duration: 0.5 }, 2.6)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  })

  return (
    <section
      ref={sectionRef}
      id="susu"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Layer A — slowest parallax: ambient gradient ellipse */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-x-0 mx-auto w-[80%] h-[60%] top-[10%] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${theme.glow}14 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Layer B — mid: faint concentric rings (decorative, parallax) */}
      <motion.svg
        style={{ y: yMid }}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {[20, 35, 50].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={theme.accent}
            strokeOpacity="0.08"
            strokeWidth="0.15"
            strokeDasharray="0.5 0.7"
          />
        ))}
      </motion.svg>

      <motion.div style={{ y: yFg }} className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Users size={12} />
            Susu Engine
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            The group trust economy.{' '}
            <span style={{ color: theme.accent }}>Reborn on-chain.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Five members contribute. One payout per cycle. Trust scores compound. The Susu —
            Africa's oldest savings tradition — supercharged with USDC, escrow, and
            transparent rotation logic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual stage */}
          <div ref={stageRef} className="lg:col-span-7 relative">
            <Glass radius="2xl" padding="lg" elevated tilt={false} mouseGlow>
              <div className="aspect-square w-full max-w-[560px] mx-auto relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="pool-grad">
                      <stop offset="0%" stopColor={theme.accent} stopOpacity="1" />
                      <stop offset="60%" stopColor={theme.accent} stopOpacity="0.5" />
                      <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
                    </radialGradient>
                    <filter id="susu-blur">
                      <feGaussianBlur stdDeviation="0.5" />
                    </filter>
                  </defs>

                  {/* Ring */}
                  <circle
                    data-ring
                    cx={CENTER.x}
                    cy={CENTER.y}
                    r={RADIUS}
                    fill="none"
                    stroke={theme.accent}
                    strokeOpacity="0.4"
                    strokeWidth="0.4"
                    strokeDasharray="0.7 0.4"
                  />

                  {/* Central pool */}
                  <g data-pool>
                    <circle cx={CENTER.x} cy={CENTER.y} r="14" fill="url(#pool-grad)" />
                    <circle
                      cx={CENTER.x}
                      cy={CENTER.y}
                      r="6"
                      fill={theme.surface}
                      stroke={theme.accent}
                      strokeWidth="0.5"
                    />
                    <text
                      x={CENTER.x}
                      y={CENTER.y + 1}
                      textAnchor="middle"
                      fontSize="3.5"
                      fontFamily="Space Grotesk, sans-serif"
                      fontWeight="800"
                      fill={theme.accent}
                    >
                      USDC
                    </text>
                    <text
                      x={CENTER.x}
                      y={CENTER.y + 4.6}
                      textAnchor="middle"
                      fontSize="2"
                      fontFamily="Inter, sans-serif"
                      fill={theme.textMuted}
                    >
                      POOL
                    </text>
                  </g>

                  {/* Contribution orbs (one per member, hidden initially) */}
                  {members.map((m, i) => (
                    <circle
                      key={`contrib-${m.id}`}
                      data-contrib={i}
                      r="1.4"
                      fill={theme.accent}
                      filter="url(#susu-blur)"
                    />
                  ))}

                  {/* Payout orb */}
                  <circle
                    data-payout
                    r="2.2"
                    fill="url(#pool-grad)"
                    style={{ filter: `drop-shadow(0 0 4px ${theme.accent})` }}
                  />

                  {/* Members */}
                  {members.map((m) => (
                    <g key={m.id} data-member transform={`translate(${m.position.x} ${m.position.y})`}>
                      <circle
                        r="6.5"
                        fill={theme.surface}
                        stroke={m.isPayee ? theme.accent : theme.border}
                        strokeWidth={m.isPayee ? '0.6' : '0.3'}
                        style={m.isPayee ? { filter: `drop-shadow(0 0 4px ${theme.accent})` } : undefined}
                      />
                      <text
                        x="0"
                        y="0.6"
                        textAnchor="middle"
                        fontSize="3.2"
                        fontFamily="Space Grotesk, sans-serif"
                        fontWeight="700"
                        fill={m.isPayee ? theme.accent : theme.textPrimary}
                      >
                        {m.name[0]}
                      </text>
                      <text
                        x="0"
                        y="11"
                        textAnchor="middle"
                        fontSize="2.4"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        fill={theme.textPrimary}
                      >
                        {m.name}
                      </text>
                      <text
                        x="0"
                        y="14.2"
                        textAnchor="middle"
                        fontSize="1.9"
                        fontFamily="JetBrains Mono, monospace"
                        fill={theme.textMuted}
                      >
                        Trust {m.trust}
                      </text>
                      {m.isPayee && (
                        <g transform="translate(0 -10)">
                          <circle r="2.6" fill={theme.accent} />
                          <text
                            x="0"
                            y="1"
                            textAnchor="middle"
                            fontSize="2.6"
                            fill={theme.background}
                            fontWeight="900"
                          >
                            ★
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                </svg>

                {/* Cycle badge */}
                <div
                  data-cycle-badge
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full flex items-center gap-2"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    border: `1px solid ${theme.accent}50`,
                    color: theme.accent,
                  }}
                >
                  <Crown size={12} />
                  <span className="text-[11px] font-bold tracking-wider">CYCLE 1 · PAID OUT</span>
                </div>
              </div>
            </Glass>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-5 space-y-3">
            {[
              { label: 'How it works', desc: 'Each member contributes the same amount in USDC each cycle. Funds are escrowed and rotated to one trusted member per round.' },
              { label: 'Trust Score', desc: 'On-time contributions raise your score. Defaults drop it. Higher scores unlock larger pools and earlier payouts.' },
              { label: 'Default Protection', desc: 'A community insurance buffer covers a member who briefly misses a cycle, no group collapse.' },
            ].map((item) => (
              <Glass key={item.label} radius="lg" padding="md" tilt tiltMax={4}>
                <div className="text-xs uppercase tracking-[0.18em] mb-1" style={{ color: theme.accent }}>
                  {item.label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  {item.desc}
                </div>
              </Glass>
            ))}

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { label: 'Cycles', value: '12,840' },
                { label: 'Trust Earned', value: '↑ 84%' },
                { label: 'Default Rate', value: '0.7%' },
              ].map((s) => (
                <Glass key={s.label} radius="md" padding="sm">
                  <div className="text-center">
                    <div
                      className="text-base font-black"
                      style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                      {s.label}
                    </div>
                  </div>
                </Glass>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: theme.textMuted }}>
              <Sparkles size={12} style={{ color: theme.accent }} />
              <span>Scroll the section to see the full cycle.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
