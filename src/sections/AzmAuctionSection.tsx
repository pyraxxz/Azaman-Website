// =============================================================================
// AzmAuctionSection — vendor leaderboard. The top "Boosted" slot is the prize.
// Vendors burn AZM to claim it. Every ~6s a different vendor outbids and the
// list re-orders using a GSAP Flip animation.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Flame, TrendingUp, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import AmbientOrbs from '@/components/AmbientOrbs'
import { Flip, gsap, prefersReducedMotion } from '@/lib/gsap'
import { useInViewport } from '@/hooks/use-in-viewport'

interface Vendor {
  id: string
  name: string
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGEND'
  xp: number
  trades: number
  volume: string
  bid: number // AZM
  completion: number
  streak: number
}

const SEED_VENDORS: Vendor[] = [
  { id: '1', name: 'KwameGold', level: 'LEGEND', xp: 24500, trades: 1248, volume: '$284K', bid: 12400, completion: 99.2, streak: 47 },
  { id: '2', name: 'AkosuaSwap', level: 'DIAMOND', xp: 18200, trades: 892, volume: '$192K', bid: 11200, completion: 98.7, streak: 31 },
  { id: '3', name: 'NanaTrades', level: 'DIAMOND', xp: 15840, trades: 743, volume: '$165K', bid: 9800, completion: 98.1, streak: 28 },
  { id: '4', name: 'AmaCrypto', level: 'GOLD', xp: 12100, trades: 612, volume: '$128K', bid: 8400, completion: 97.4, streak: 22 },
  { id: '5', name: 'KojoExchange', level: 'GOLD', xp: 10300, trades: 547, volume: '$112K', bid: 7100, completion: 96.8, streak: 18 },
  { id: '6', name: 'YawCash', level: 'SILVER', xp: 7840, trades: 412, volume: '$87K', bid: 5400, completion: 95.2, streak: 14 },
]

const LEVEL_COLORS: Record<Vendor['level'], string> = {
  BRONZE: '#CD7F32',
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  DIAMOND: '#B9F2FF',
  LEGEND: '#FF00FF',
}

export default function AzmAuctionSection() {
  const { theme } = useTheme()
  const [vendors, setVendors] = useState<Vendor[]>(SEED_VENDORS)
  const [burnedToday, setBurnedToday] = useState(47128)
  const [pulseId, setPulseId] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [sectionRef, isVisible] = useInViewport<HTMLElement>(0.15)

  // Random burn loop: every 8s (slowed from 6s), an underdog ups their bid.
  // Pauses when section is offscreen.
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!isVisible) return

    const id = setInterval(() => {
      // Pick a non-leader to escalate
      setVendors((prev) => {
        if (!listRef.current) return prev
        const state = Flip.getState(listRef.current.querySelectorAll('[data-vendor-row]'))
        const next = prev.map((v) => ({ ...v }))
        // Choose someone in positions 2-5 to outbid the leader
        const challengerIdx = 1 + Math.floor(Math.random() * (next.length - 2))
        const leader = next[0]
        const challenger = next[challengerIdx]
        const increase = Math.round(800 + Math.random() * 1200)
        challenger.bid = leader.bid + increase
        // Resort by bid desc
        next.sort((a, b) => b.bid - a.bid)
        // Flash the new leader
        setPulseId(challenger.id)
        // Burned counter
        setBurnedToday((b) => b + increase)
        // Animate after state update
        requestAnimationFrame(() => {
          if (!listRef.current) return
          Flip.from(state, {
            targets: listRef.current.querySelectorAll('[data-vendor-row]'),
            duration: 0.85,
            ease: 'power3.inOut',
            stagger: 0.05,
            absolute: true,
            onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1 }),
          })
        })
        return next
      })
      // Clear pulse after animation
      window.setTimeout(() => setPulseId(null), 2200)
    }, 8000)
    return () => clearInterval(id)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="auction"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 1000px 500px at 50% 0%, ${theme.accent}10, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.warning}10`,
              border: `1px solid ${theme.warning}30`,
              color: theme.warning,
            }}
          >
            <Flame size={12} />
            AZM Boost Auction
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Burn AZM.{' '}
            <span className="text-gradient-flow">Claim the spotlight.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Vendors compete in a live auction for the boosted slot. Highest AZM bid wins
            the top placement and 4× more inbound trade requests.
          </p>
        </motion.div>

        {/* Burn ticker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Glass radius="md" padding="sm" mouseGlow={false}>
            <div className="flex items-center gap-3 px-2">
              <Flame size={16} style={{ color: '#FF7A1A' }} />
              <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                {burnedToday.toLocaleString()} AZM
              </span>
              <span className="text-xs" style={{ color: theme.textMuted }}>
                burned today
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
              >
                LIVE
              </span>
            </div>
          </Glass>
        </motion.div>

        {/* Main content: Leaderboard + Burn Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard — 2/3 width */}
        <div className="lg:col-span-2">
        <Glass radius="2xl" padding="md" elevated mouseGlow>
          <div ref={listRef} className="space-y-2.5">
            {vendors.map((v, i) => {
              const isLeader = i === 0
              const levelColor = LEVEL_COLORS[v.level]
              return (
                <div
                  key={v.id}
                  data-vendor-row
                  data-flip-id={v.id}
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    padding: 1.5,
                    background: isLeader
                      ? `linear-gradient(135deg, ${theme.accent}18, ${theme.glow}08)`
                      : 'transparent',
                    boxShadow: isLeader
                      ? `0 0 40px ${theme.accent}20, 0 0 80px ${theme.accent}08`
                      : 'none',
                    animation: isLeader ? 'border-spin 3s linear infinite' : undefined,
                  }}
                >
                  <div
                    className="rounded-[10px] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 relative"
                    style={{
                      backgroundColor: isLeader ? theme.background : `${theme.surface}b0`,
                      backdropFilter: isLeader ? undefined : 'blur(12px)',
                      border: isLeader ? 'none' : `1px solid ${theme.border}`,
                    }}
                  >
                    {/* Rank */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0"
                      style={{
                        backgroundColor: isLeader ? theme.accent : `${theme.accent}10`,
                        color: isLeader ? (theme.isDark ? '#000' : '#fff') : theme.accent,
                        fontFamily: 'JetBrains Mono',
                        boxShadow: isLeader ? `0 0 16px ${theme.accent}80` : 'none',
                      }}
                    >
                      {isLeader ? <Crown size={14} /> : `#${i + 1}`}
                    </div>

                    {/* Avatar + name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${levelColor}50, ${levelColor}15)`,
                          border: `1.5px solid ${levelColor}80`,
                          color: levelColor,
                        }}
                      >
                        {v.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>
                            {v.name}
                          </span>
                          {isLeader && (
                            <span
                              className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-[0.18em]"
                              style={{
                                backgroundColor: theme.accent,
                                color: theme.isDark ? '#000' : '#fff',
                              }}
                            >
                              ★ BOOSTED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: theme.textMuted }}>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full font-bold tracking-wider"
                            style={{
                              backgroundColor: `${levelColor}20`,
                              color: levelColor,
                            }}
                          >
                            {v.level}
                          </span>
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:flex items-center gap-1">
                            <Flame size={10} style={{ color: '#FF7A1A' }} /> {v.streak}d
                          </span>
                          <span className="hidden md:inline">·</span>
                          <span className="hidden md:flex items-center gap-1">
                            <TrendingUp size={10} /> {v.completion}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bid */}
                    <motion.div
                      key={`${v.id}-${v.bid}`}
                      initial={{ scale: pulseId === v.id ? 0.85 : 1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-right flex-shrink-0"
                    >
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                        AZM Bid
                      </div>
                      <div
                        className="text-base sm:text-lg font-black"
                        style={{
                          color: isLeader ? theme.accent : theme.textPrimary,
                          fontFamily: 'JetBrains Mono',
                          textShadow: isLeader ? `0 0 12px ${theme.accent}` : undefined,
                        }}
                      >
                        {v.bid.toLocaleString()}
                      </div>
                      <div className="text-[10px]" style={{ color: theme.success }}>
                        {v.volume} vol
                      </div>
                    </motion.div>

                    {/* Pulse flash on rank up */}
                    {pulseId === v.id && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none rounded-[10px]"
                        initial={{ opacity: 0.55 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.4 }}
                        style={{
                          background: `radial-gradient(ellipse at center, ${theme.accent}50, transparent 70%)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Glass>
        </div>

        {/* Right column: Burn Stats (desktop only) */}
        <div className="hidden lg:flex flex-col gap-4">
          <Glass radius="2xl" padding="md" tilt tiltMax={4}>
            <div className="flex items-center gap-2 mb-3">
              <Flame size={16} style={{ color: '#FF7A1A' }} />
              <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: theme.textMuted }}>Burn Stats</span>
            </div>
            <div className="text-2xl font-black mb-1" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
              {burnedToday.toLocaleString()} AZM
            </div>
            <div className="text-xs mb-4" style={{ color: theme.textMuted }}>burned today</div>

            {/* 7-day bar chart */}
            <div className="flex items-end gap-1.5 h-20 mb-3">
              {[65, 42, 78, 55, 90, 72, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: `${theme.accent}${i === 6 ? '' : '60'}` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px]" style={{ color: theme.textMuted }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            <p className="text-xs mt-4 leading-relaxed" style={{ color: theme.textMuted }}>
              Burning AZM is deflationary. Less supply. More value.
            </p>
          </Glass>

          {/* Become a Vendor card */}
          <Link to="/vendors" className="block">
            <Glass radius="xl" padding="md" tilt tiltMax={4}>
              <div className="flex items-center justify-between" style={{ borderImage: `linear-gradient(135deg, ${theme.accent}, ${theme.glow}) 1` }}>
                <div>
                  <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>Become a Vendor</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>Earn 40-50% of every spread</div>
                </div>
                <span className="text-lg" style={{ color: theme.accent }}>→</span>
              </div>
            </Glass>
          </Link>
        </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
            Become a vendor. Earn XP, climb ranks, and compete for the boosted slot.
          </p>
          <Link
            to="/vendors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.03]"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#000' : '#fff',
              boxShadow: `0 0 30px ${theme.accent}40`,
            }}
          >
            <Star size={16} />
            Apply to be a Vendor
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
