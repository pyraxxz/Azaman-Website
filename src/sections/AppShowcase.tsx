// =============================================================================
// AppShowcase — Scroll-scrubbed phone carousel
// Desktop: GSAP pin for 4× viewport. 5 screens absolutely positioned inside
// phone, GSAP controls opacity/y. Dot indicator + left headline cross-fade.
// Mobile: 5 stacked Glass cards with mini phone mockups.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowLeftRight, MessageSquare, Users, Lock, Sparkles } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const SCREENS = [
  { id: 'home', icon: Wallet, title: 'Your Balance, Beautifully', subtitle: 'GHS 14,280.00 ≈ $1,240 USDC with 4-way portfolio split.' },
  { id: 'p2p', icon: ArrowLeftRight, title: 'P2P Marketplace', subtitle: '3 vendor ad cards with rate, method, completion %, and Trade button.' },
  { id: 'trade', icon: MessageSquare, title: 'Active Trade', subtitle: 'Countdown timer 14:32, chat thread, Confirm Payment CTA.' },
  { id: 'susu', icon: Users, title: 'Susu Dashboard', subtitle: 'Group circle, member list, next payout: Jun 15 progress bar.' },
  { id: 'vault', icon: Lock, title: 'Vault', subtitle: 'GHS 5,000 locked. Unlocks in 18 days. 🔥 14 day streak.' },
]

export default function AppShowcase() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLDivElement>(null)

  // BUG 3 FIX: Reactive isDesktop via useState + resize listener
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop: GSAP ScrollTrigger pin with scrub-driven screen switching
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion()) return
    const section = sectionRef.current
    if (!section) return

    const screenEls = section.querySelectorAll<HTMLElement>('[data-screen]')
    const labelEls = section.querySelectorAll<HTMLElement>('[data-label]')
    const dotEls = section.querySelectorAll<HTMLElement>('[data-dot]')
    const lineFill = section.querySelector<HTMLElement>('[data-line-fill]')

    // BUG 2 FIX: Only set elements from index 1 onward
    const screenArray = Array.from(screenEls)
    const labelArray = Array.from(labelEls)
    gsap.set(screenArray.slice(1), { opacity: 0, y: 20 })
    gsap.set(labelArray.slice(1), { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      },
    })

    // Each screen gets a 20% band
    for (let i = 0; i < 5; i++) {
      const start = i * 0.2
      const fadeInStart = start
      const fadeOutStart = start + 0.16

      if (i > 0) {
        tl.to(screenEls[i], { opacity: 1, y: 0, duration: 0.04 }, fadeInStart)
        tl.to(labelEls[i], { opacity: 1, y: 0, duration: 0.04 }, fadeInStart)
      }
      if (i < 4) {
        tl.to(screenEls[i], { opacity: 0, y: -20, duration: 0.04 }, fadeOutStart)
        tl.to(labelEls[i], { opacity: 0, y: -40, duration: 0.04 }, fadeOutStart)
      }
    }

    // Dot indicator + line fill via onUpdate
    const st = tl.scrollTrigger!
    st.vars.onUpdate = (self: ScrollTrigger) => {
      const progress = self.progress
      if (lineFill) lineFill.style.transform = `scaleY(${progress})`
      const activeIdx = Math.min(4, Math.floor(progress * 5))
      dotEls.forEach((dot, i) => {
        const isActive = i === activeIdx
        const isPast = i < activeIdx
        dot.style.width = isActive ? '14px' : isPast ? '8px' : '6px'
        dot.style.height = isActive ? '14px' : isPast ? '8px' : '6px'
        dot.style.backgroundColor = isActive ? theme.accent : isPast ? theme.textMuted : `${theme.textMuted}40`
        dot.style.boxShadow = isActive ? `0 0 12px ${theme.accent}80` : 'none'
      })
    }

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, [isDesktop, theme])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-24 lg:py-0 overflow-hidden"
      style={{ backgroundColor: theme.background, minHeight: isDesktop ? '100vh' : 'auto' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: `radial-gradient(ellipse 800px 600px at 50% 50%, ${theme.glow}08 0%, transparent 70%)` }} />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 lg:mb-16 lg:pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}>
            <Sparkles size={12} />
            App Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Five screens. <span style={{ color: theme.accent }}>One scroll.</span>
          </h2>
        </motion.div>

        {/* Desktop layout */}
        {isDesktop ? (
          <div className="flex items-center justify-center gap-12 min-h-[60vh]">
            {/* Left: Feature labels */}
            <div className="flex-1 max-w-xs relative" style={{ minHeight: 200 }}>
              {SCREENS.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.id} data-label className="absolute inset-0 flex flex-col justify-center" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                      <Icon size={20} style={{ color: theme.accent }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{s.subtitle}</p>
                  </div>
                )
              })}
            </div>

            {/* Center: Phone */}
            <div className="relative flex-shrink-0">
              <div className="relative w-[280px] h-[580px] rounded-[40px] border-[3px] bg-black overflow-hidden" style={{ borderColor: '#1F2128', boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 80px ${theme.glow}20` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                <div className="absolute inset-[3px] rounded-[37px] overflow-hidden">
                  {/* BUG 1 FIX: inline opacity on screens */}
                  <div data-screen className="absolute inset-0" style={{ opacity: 1 }}><ScreenHome accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0" style={{ opacity: 0 }}><ScreenMarketplace accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0" style={{ opacity: 0 }}><ScreenTrade accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0" style={{ opacity: 0 }}><ScreenSusu accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0" style={{ opacity: 0 }}><ScreenVault accent={theme.accent} theme={theme} /></div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 z-20" />
              </div>
            </div>

            {/* Right: Vertical dot indicator — BUG 4 FIX: justify-between + flexShrink */}
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-between" style={{ height: 200 }}>
                <div className="absolute top-0 bottom-0 w-[2px] rounded-full" style={{ backgroundColor: theme.border }} />
                <div data-line-fill className="absolute top-0 left-0 right-0 w-[2px] rounded-full origin-top" style={{ backgroundColor: theme.accent, height: '100%', transform: 'scaleY(0)' }} />
                {SCREENS.map((s, i) => (
                  <div key={s.id} data-dot className="relative z-10 rounded-full transition-all duration-300" style={{ width: i === 0 ? 14 : 6, height: i === 0 ? 14 : 6, backgroundColor: i === 0 ? theme.accent : `${theme.textMuted}40`, boxShadow: i === 0 ? `0 0 12px ${theme.accent}80` : 'none', flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Mobile: 5 stacked Glass cards with mini phone mockups — BUG 5 FIX */
          <div className="flex flex-col gap-4">
            {SCREENS.map((screen, i) => {
              const Icon = screen.icon
              return (
                <motion.div key={screen.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Glass radius="xl" padding="md" tilt tiltMax={4}>
                    <div className="flex items-center gap-4">
                      {/* Mini phone mockup */}
                      <div className="flex-shrink-0 w-[100px] h-[180px] rounded-[20px] border-2 bg-black overflow-hidden" style={{ borderColor: '#1F2128' }}>
                        <MiniScreen idx={i} accent={theme.accent} theme={theme} />
                      </div>
                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                          <Icon size={14} style={{ color: theme.accent }} />
                        </div>
                        <h3 className="text-sm font-bold mb-1" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{screen.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>{screen.subtitle}</p>
                      </div>
                    </div>
                  </Glass>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// =============================================================================
// Full-size Phone Screen Components (desktop)
// =============================================================================
type ScreenProps = { accent: string; theme: { surface: string; background: string; textPrimary: string; textMuted: string; success: string; warning: string; accent: string; border: string } }

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
        {[{ l: 'Available', v: '$890', c: theme.success }, { l: 'Vendor', v: '$200', c: accent }, { l: 'Escrow', v: '$148', c: theme.warning }, { l: 'Dispute', v: '$2', c: '#F6465D' }].map((p) => (
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
          <div key={v.name} className="flex items-center gap-2 p-1.5 rounded-lg" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[7px] font-black" style={{ background: `${v.color}30`, color: v.color }}>
              {v.short}
            </div>
            <div className="flex-1">
              <div className="text-[9px] font-semibold" style={{ color: theme.textPrimary }}>{v.name}</div>
            </div>
            <div className="text-[8px] font-bold" style={{ color: accent }}>GH₵ {v.rate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenMarketplace({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="flex justify-between text-[8px] mb-1" style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span className="font-medium" style={{ color: theme.textPrimary }}>P2P Market</span>
        <span>●●●</span>
      </div>
      <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <span className="text-[7px] flex items-center gap-1" style={{ color: theme.textMuted }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
          AI Smart Filter
        </span>
        <div className="w-7 h-3.5 rounded-full flex items-center justify-end px-0.5" style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}>
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
      </div>
      {[
        { name: 'KwameGold', rate: '11.44', method: 'Bank Transfer', pct: '99%', risk: 'Low', riskColor: theme.success },
        { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', pct: '95%', risk: 'Low', riskColor: theme.success },
        { name: 'KofiBarter', rate: '11.60', method: 'CashApp', pct: '82%', risk: 'Med', riskColor: theme.warning },
      ].map((v) => (
        <div key={v.name} className="p-2 rounded-lg" style={{ backgroundColor: `${theme.surface}60`, border: `1px solid ${theme.border}` }}>
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center gap-1.5">
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
            <div className="flex items-center gap-1.5">
              <span className="text-[6px]" style={{ color: theme.textMuted }}>{v.pct}</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded-md font-bold" style={{ backgroundColor: accent, color: '#000' }}>Trade</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ScreenTrade({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-xs font-bold" style={{ color: theme.textPrimary }}>Active Trade</div>
      <div className="self-center px-4 py-2 rounded-full" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}40` }}>
        <span className="text-sm font-mono font-bold" style={{ color: accent }}>⏱ 14:32</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="self-start px-3 py-2 rounded-xl text-[10px]" style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>Send to MoMo: 024-xxx-1234</div>
        <div className="self-end px-3 py-2 rounded-xl text-[10px]" style={{ backgroundColor: `${accent}25`, color: theme.textPrimary }}>Payment sent!</div>
      </div>
      <div className="px-4 py-3 rounded-xl text-center text-sm font-bold" style={{ backgroundColor: theme.success, color: '#000' }}>Confirm Payment</div>
    </div>
  )
}

function ScreenSusu({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-xs font-bold" style={{ color: theme.textPrimary }}>Susu Dashboard</div>
      <div className="flex-1 flex items-center justify-center">
        <svg width="90" height="90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke={`${accent}30`} strokeWidth="1" />
          {[0,1,2,3,4].map((i) => { const a=(i/5)*Math.PI*2-Math.PI/2; return <circle key={i} cx={50+Math.cos(a)*35} cy={50+Math.sin(a)*35} r="5" fill={`${accent}30`} stroke={accent} strokeWidth="0.5" /> })}
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
    <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-4" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}><span className="text-2xl">🔐</span></div>
      <div className="text-center"><div className="text-xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>GHS 5,000</div><div className="text-[10px] mt-1" style={{ color: theme.textMuted }}>Unlocks in 18 days</div></div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, border: `1px solid ${theme.success}30` }}><span className="text-[10px] font-bold" style={{ color: theme.success }}>🔥 14 day streak</span></div>
    </div>
  )
}

// =============================================================================
// Mini Screen Components (mobile cards — use full screens scaled to fit 100×180)
// =============================================================================
function MiniScreen({ idx, accent, theme }: { idx: number; accent: string; theme: ScreenProps['theme'] }) {
  const screens = [
    <ScreenHome key="h" accent={accent} theme={theme} />,
    <ScreenMarketplace key="m" accent={accent} theme={theme} />,
    <ScreenTrade key="t" accent={accent} theme={theme} />,
    <ScreenSusu key="s" accent={accent} theme={theme} />,
    <ScreenVault key="v" accent={accent} theme={theme} />,
  ]

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div
        style={{
          transform: 'scale(0.72)',
          transformOrigin: 'top left',
          width: '139%',
          height: '139%',
        }}
      >
        {screens[idx]}
      </div>
    </div>
  )
}
