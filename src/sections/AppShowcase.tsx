// =============================================================================
// AppShowcase - horizontal phone carousel (unbounded; no scroll-pin).
// One phone is always in focus (large), neighbours peek at the sides. The
// nearest-to-centre phone is "active": it scales up and a synced text panel
// describes what its screen depicts. Drag / scroll / dots to move between them.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ArrowLeftRight, MessageSquare, Users, Lock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import type { ThemeColors } from '@/contexts/ThemeContext'

interface Screen {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
}

const SCREENS: Screen[] = [
  { id: 'home', icon: Wallet, title: 'Your balance, beautifully', subtitle: 'One home for every pocket: available, vendor, escrow, all with a live USDC value and instant cash-out rails.' },
  { id: 'p2p', icon: ArrowLeftRight, title: 'P2P marketplace', subtitle: 'Verified vendor ads with live rates, methods and completion scores. Tap to trade in seconds.' },
  { id: 'trade', icon: MessageSquare, title: 'Active trade', subtitle: 'Escrow-protected chat with proof upload and one-tap confirm. Most trades settle in under five seconds.' },
  { id: 'susu', icon: Users, title: 'Susu dashboard', subtitle: 'Run rotating savings circles with friends: members, contributions, and the next payout at a glance.' },
  { id: 'vault', icon: Lock, title: 'Vault', subtitle: 'Lock USDC toward a goal, keep your streak alive, and watch your discipline compound.' },
]

export default function AppShowcase() {
  const { theme } = useTheme()
  const [active, setActive] = useState(0)

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Smaller phones on mobile so the coverflow fits the viewport perfectly.
  const PHONE_W = isDesktop ? 300 : 208
  const PHONE_H = Math.round(PHONE_W * 2.05)
  const OFFSET = isDesktop ? 200 : 116
  const DEPTH = isDesktop ? 180 : 120

  const goTo = (i: number) => setActive(Math.max(0, Math.min(SCREENS.length - 1, i)))
  const goRel = (d: number) => goTo(active + d)
  const ActiveIcon = SCREENS[active].icon

  // Pointer/touch swipe to move between phones (works on mobile and desktop).
  const dragX = useRef<number | null>(null)
  const onPointerDown = (e: React.PointerEvent) => { dragX.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current == null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) > 40) goRel(dx < 0 ? 1 : -1)
  }

  const stage = (
    <div
      className="relative select-none touch-pan-y"
      style={{ height: PHONE_H + 40, perspective: 1600 }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {SCREENS.map((screen, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          if (abs > 2) return null
          const isActive = offset === 0
          return (
            <button
              key={screen.id}
              onClick={() => goTo(i)}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                width: PHONE_W,
                height: PHONE_H,
                transform: `translate(-50%, -50%) translateX(${offset * OFFSET}px) translateZ(${isActive ? 0 : -DEPTH}px) rotateY(${offset * -22}deg) scale(${isActive ? 1 : 0.86})`,
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? 'none' : 'saturate(0.7) brightness(0.85)',
                zIndex: 10 - abs,
              }}
              data-cursor="hover"
              aria-label={screen.title}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              <PhoneCard idx={i} theme={theme} w={PHONE_W} h={PHONE_H} active={isActive} />
            </button>
          )
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={() => goRel(-1)}
        disabled={active === 0}
        aria-label="Previous screen"
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25"
        style={{ backgroundColor: `${theme.surface}E6`, border: `1px solid ${theme.border}`, color: theme.textPrimary, backdropFilter: 'blur(8px)' }}
        data-cursor="hover"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => goRel(1)}
        disabled={active === SCREENS.length - 1}
        aria-label="Next screen"
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-25"
        style={{ backgroundColor: `${theme.surface}E6`, border: `1px solid ${theme.border}`, color: theme.textPrimary, backdropFilter: 'blur(8px)' }}
        data-cursor="hover"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )

  return (
    <section
      id="showcase"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: `radial-gradient(ellipse 800px 600px at 50% 50%, ${theme.glow}0A 0%, transparent 70%)` }} />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}>
            <Sparkles size={12} />
            App Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Five screens. <span className="text-gradient-flow">Swipe through.</span>
          </h2>
        </motion.div>

        {/* DESKTOP: side text + coverflow */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr] lg:gap-12 lg:items-center">
          <div className="relative" style={{ minHeight: 240 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={SCREENS[active].id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                  <ActiveIcon size={22} style={{ color: theme.accent }} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: theme.textMuted }}>
                  {String(active + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{SCREENS[active].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{SCREENS[active].subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          {stage}
        </div>

        {/* MOBILE: same coverflow, full width, text below */}
        <div className="lg:hidden">
          {stage}
          <div className="mt-6 text-center px-4 relative" style={{ minHeight: 92 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={SCREENS[active].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-1" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{SCREENS[active].title}</h3>
                <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: theme.textMuted }}>{SCREENS[active].subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
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
    </section>
  )
}

// =============================================================================
// Phone screens
// =============================================================================
type ScreenProps = {
  accent: string
  theme: ThemeColors
}

function PhoneCard({ idx, theme, w, h, active }: { idx: number; theme: ThemeColors; w: number; h: number; active: boolean }) {
  return (
    <div
      className="relative rounded-[38px] border-[3px] bg-black overflow-hidden"
      style={{ width: w, height: h, borderColor: '#1F2128', boxShadow: active ? `0 0 60px rgba(0,0,0,0.7), 0 0 70px ${theme.glow}25` : '0 0 30px rgba(0,0,0,0.6)' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" aria-hidden="true" />
      <div className="absolute inset-[3px] rounded-[35px] overflow-hidden">
        <PhoneScreen idx={idx} accent={theme.accent} theme={theme} />
        <div className="az-scanlines pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 z-20" aria-hidden="true" />
    </div>
  )
}

function PhoneScreen({ idx, accent, theme }: { idx: number; accent: string; theme: ThemeColors }) {
  switch (idx) {
    case 0: return <ScreenHome accent={accent} theme={theme} />
    case 1: return <ScreenMarketplace accent={accent} theme={theme} />
    case 2: return <ScreenTrade accent={accent} theme={theme} />
    case 3: return <ScreenSusu accent={accent} theme={theme} />
    default: return <ScreenVault accent={accent} theme={theme} />
  }
}

function ScreenHome({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-3 flex flex-col" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="flex justify-between text-[8px] mb-2" style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span style={{ color: accent }}>● LIVE</span>
        <span>4G 100%</span>
      </div>
      <div className="text-[11px] font-black mb-2" style={{ fontFamily: 'Space Grotesk', color: accent }}>AZAMAN</div>
      <div className="rounded-xl p-2.5 mb-2" style={{ background: 'linear-gradient(135deg, #161618, #0A0A0C)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="text-[8px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total Balance</div>
        <div className="text-lg font-black mt-0.5" style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>GHS 14,280.00</div>
        <div className="text-[8px] mt-0.5" style={{ color: accent }}>≈ $1,240 USDC · +2.41%</div>
      </div>
      <div className="flex gap-1.5 mb-2">
        {[{ l: 'Available', v: '$890', c: theme.success }, { l: 'Vendor', v: '$200', c: accent }, { l: 'Escrow', v: '$148', c: theme.warning }, { l: 'Dispute', v: '$2', c: theme.danger }].map((p) => (
          <div key={p.l} className="flex-1 p-1.5 rounded-md text-center" style={{ backgroundColor: `${p.c}10`, border: `1px solid ${p.c}20` }}>
            <div className="text-[6px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.l}</div>
            <div className="text-[8px] font-bold" style={{ color: p.c }}>{p.v}</div>
          </div>
        ))}
      </div>
      <div className="text-[8px] uppercase tracking-[0.15em] mb-1.5" style={{ color: theme.textMuted }}>Instant Cashout</div>
      <div className="flex flex-col gap-1.5 flex-1">
        {[
          { name: 'CashApp', short: '$', color: '#00D54B', rate: '11.44' },
          { name: 'Zelle', short: 'ZL', color: '#6D1ED4', rate: '11.48' },
          { name: 'MoMo', short: 'MM', color: '#FFCB05', rate: '11.52' },
          { name: 'Bank Transfer', short: 'BK', color: '#0088FF', rate: '11.46' },
        ].map((v) => (
          <div key={v.name} className="flex items-center gap-1.5 p-1.5 rounded-lg" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[7px] font-black" style={{ background: `${v.color}30`, color: v.color }}>{v.short}</div>
            <div className="flex-1 min-w-0"><div className="text-[9px] font-semibold truncate" style={{ color: theme.textPrimary }}>{v.name}</div></div>
            <div className="text-[8px] font-bold" style={{ color: accent }}>GH₵ {v.rate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenMarketplace({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-3 gap-2 flex flex-col" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="flex justify-between text-[8px] mb-1" style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span className="font-medium" style={{ color: theme.textPrimary }}>P2P Market</span>
        <span>●●●</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <span className="text-[7px] flex items-center gap-1" style={{ color: theme.textMuted }}>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.success }} />
          AI Smart Filter
        </span>
        <div className="w-7 h-3.5 rounded-full flex items-center justify-end px-0.5" style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}>
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
      </div>
      {[
        { name: 'KwameGold', rate: '11.44', method: 'Bank Transfer', pct: '99%', risk: 'Low', riskColor: theme.success },
        { name: 'AkosuaSwap', rate: '11.52', method: 'Wise', pct: '95%', risk: 'Low', riskColor: theme.success },
        { name: 'KojoBarter', rate: '11.60', method: 'CashApp', pct: '82%', risk: 'Med', riskColor: theme.warning },
      ].map((v) => (
        <div key={v.name} className="p-2 rounded-lg" style={{ backgroundColor: `${theme.surface}60`, border: `1px solid ${theme.border}` }}>
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: `${accent}15`, color: accent }}>{v.name[0]}</div>
              <div>
                <div className="text-[8px] font-semibold" style={{ color: theme.textPrimary }}>{v.name}</div>
                <div className="text-[6px]" style={{ color: theme.textMuted }}>{v.method}</div>
              </div>
            </div>
            <span className="text-[6px] px-1 py-0.5 rounded-full" style={{ color: v.riskColor, backgroundColor: `${v.riskColor}15`, border: `1px solid ${v.riskColor}30` }}>{v.risk}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold" style={{ color: theme.textPrimary }}>GH₵ {v.rate}/USDC</span>
            <div className="flex items-center gap-1">
              <span className="text-[6px]" style={{ color: theme.textMuted }}>{v.pct}</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded-md font-bold" style={{ backgroundColor: accent, color: theme.isDark ? '#000' : '#fff' }}>Trade</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ScreenTrade({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full flex flex-col p-4 gap-3" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-xs font-bold" style={{ color: theme.textPrimary }}>Active Trade</div>
      <div className="self-center px-4 py-2 rounded-full" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}40` }}>
        <span className="text-sm font-mono font-bold" style={{ color: accent }}>⏱ 14:32</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="self-start px-3 py-2 rounded-xl text-[10px]" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>Send to CashApp: $kwamegold</div>
        <div className="self-end px-3 py-2 rounded-xl text-[10px]" style={{ backgroundColor: `${accent}25`, color: theme.textPrimary }}>Payment sent!</div>
      </div>
      <div className="px-4 py-3 rounded-xl text-center text-sm font-bold" style={{ backgroundColor: theme.success, color: theme.isDark ? '#000' : '#fff' }}>Confirm Payment</div>
    </div>
  )
}

function ScreenSusu({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 gap-3 flex flex-col" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-xs font-bold" style={{ color: theme.textPrimary }}>Susu Dashboard</div>
      <div className="flex-1 flex items-center justify-center">
        <svg width={90} height={90} viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="35" fill="none" stroke={`${accent}30`} strokeWidth="1" />
          {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return <circle key={i} cx={50 + Math.cos(a) * 35} cy={50 + Math.sin(a) * 35} r="5" fill={`${accent}30`} stroke={accent} strokeWidth="0.5" /> })}
          <circle cx="50" cy="50" r="8" fill={`${accent}40`} />
        </svg>
      </div>
      <div className="rounded-xl p-3" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <div className="flex justify-between text-[10px] mb-1"><span style={{ color: theme.textMuted }}>Next payout: Jun 15</span><span style={{ color: accent }}>65%</span></div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}><div className="h-full w-[65%] rounded-full" style={{ backgroundColor: accent }} /></div>
      </div>
    </div>
  )
}

function ScreenVault({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 gap-4 flex flex-col items-center justify-center" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}><span className="text-2xl">🔐</span></div>
      <div className="text-center"><div className="text-xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>GHS 5,000</div><div className="text-[10px] mt-1" style={{ color: theme.textMuted }}>Unlocks in 18 days</div></div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, border: `1px solid ${theme.success}30` }}><span className="text-[10px] font-bold" style={{ color: theme.success }}>🔥 14 day streak</span></div>
    </div>
  )
}
