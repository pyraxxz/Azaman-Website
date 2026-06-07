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
              {SCREENS.map((s, i) => {
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
          /* Mobile: 5 stacked Glass cards with mini phone mockups */
          <div className="flex flex-col gap-6">
            {SCREENS.map((screen, i) => {
              const Icon = screen.icon
              return (
                <motion.div 
                  key={screen.id} 
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: false, amount: 0.3 }} 
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
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
type ScreenProps = { 
  accent: string; 
  theme: { surface: string; background: string; textPrimary: string; textMuted: string; success: string; warning: string; accent: string; border: string }
  isMini?: boolean;
}

function ScreenHome({ accent, theme, isMini }: ScreenProps) {
  const s = isMini ? {
    container: 'p-1.5',
    statusText: 'text-[6px] mb-1',
    brandText: 'text-[8px] mb-1',
    balanceCard: 'rounded-lg p-1.5 mb-1',
    balanceLabel: 'text-[6px]',
    balanceAmount: 'text-sm',
    balanceSub: 'text-[6px] mt-0',
    portfolioGap: 'gap-1 mb-1',
    portfolioPadding: 'p-1',
    portfolioLabel: 'text-[5px]',
    portfolioValue: 'text-[6px]',
    sectionLabel: 'text-[6px] mb-1',
    cashoutGap: 'gap-1',
    cashoutPadding: 'p-1',
    iconSize: 'w-4 h-4 text-[5px]',
    cashoutName: 'text-[7px]',
    cashoutRate: 'text-[6px]',
  } : {
    container: 'p-3',
    statusText: 'text-[8px] mb-2',
    brandText: 'text-[11px] mb-2',
    balanceCard: 'rounded-xl p-2.5 mb-2',
    balanceLabel: 'text-[8px]',
    balanceAmount: 'text-lg',
    balanceSub: 'text-[8px] mt-0.5',
    portfolioGap: 'gap-1.5 mb-2',
    portfolioPadding: 'p-1.5',
    portfolioLabel: 'text-[6px]',
    portfolioValue: 'text-[8px]',
    sectionLabel: 'text-[8px] mb-1.5',
    cashoutGap: 'gap-1.5',
    cashoutPadding: 'p-1.5',
    iconSize: 'w-6 h-6 text-[7px]',
    cashoutName: 'text-[9px]',
    cashoutRate: 'text-[8px]',
  };

  return (
    <div className={`w-full h-full ${s.container} flex flex-col`} style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className={`flex justify-between ${s.statusText}`} style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span style={{ color: accent }}>● LIVE</span>
        <span>4G 100%</span>
      </div>
      <div className={`${s.brandText} font-black`} style={{ fontFamily: 'Space Grotesk', color: accent }}>AZAMAN</div>
      <div className={s.balanceCard} style={{ background: 'linear-gradient(135deg, #161618, #0A0A0C)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className={s.balanceLabel} style={{ color: 'rgba(255,255,255,0.5)' }}>Total Balance</div>
        <div className={`${s.balanceAmount} font-black mt-0.5`} style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>GHS 14,280.00</div>
        <div className={s.balanceSub} style={{ color: accent }}>≈ $1,240 USDC · +2.41%</div>
      </div>
      <div className={`flex ${s.portfolioGap}`}>
        {[{ l: 'Available', v: '$890', c: theme.success }, { l: 'Vendor', v: '$200', c: accent }, { l: 'Escrow', v: '$148', c: theme.warning }, { l: 'Dispute', v: '$2', c: '#F6465D' }].map((p) => (
          <div key={p.l} className={`flex-1 ${s.portfolioPadding} rounded-md text-center`} style={{ backgroundColor: `${p.c}10`, border: `1px solid ${p.c}20` }}>
            <div className={s.portfolioLabel} style={{ color: 'rgba(255,255,255,0.5)' }}>{p.l}</div>
            <div className={`${s.portfolioValue} font-bold`} style={{ color: p.c }}>{p.v}</div>
          </div>
        ))}
      </div>
      <div className={`${s.sectionLabel} uppercase tracking-[0.15em]`} style={{ color: theme.textMuted }}>Instant Cashout</div>
      <div className={`flex flex-col ${s.cashoutGap} flex-1`}>
        {[
          { name: 'CashApp', short: '$', color: '#00D54B', rate: '11.44' },
          { name: 'Zelle', short: 'ZL', color: '#6D1ED4', rate: '11.48' },
          { name: 'MoMo', short: 'MM', color: '#FFCB05', rate: '11.52' },
          { name: 'Bank Transfer', short: 'BK', color: '#0088FF', rate: '11.46' },
        ].map((v) => (
          <div key={v.name} className={`flex items-center gap-1.5 ${s.cashoutPadding} rounded-lg`} style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
            <div className={`${s.iconSize} rounded-md flex items-center justify-center font-black`} style={{ background: `${v.color}30`, color: v.color }}>
              {v.short}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`${s.cashoutName} font-semibold truncate`} style={{ color: theme.textPrimary }}>{v.name}</div>
            </div>
            <div className={`${s.cashoutRate} font-bold`} style={{ color: accent }}>GH₵ {v.rate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenMarketplace({ accent, theme, isMini }: ScreenProps) {
  const s = isMini ? {
    container: 'p-1.5 gap-1',
    statusText: 'text-[6px] mb-0.5',
    filterPadding: 'p-1',
    filterText: 'text-[5px]',
    toggleSize: 'w-5 h-2.5',
    toggleDot: 'w-1.5 h-1.5',
    cardPadding: 'p-1',
    avatarSize: 'w-3.5 h-3.5 text-[5px]',
    vendorName: 'text-[6px]',
    vendorMethod: 'text-[5px]',
    riskBadge: 'text-[5px] px-0.5 py-0',
    rateText: 'text-[7px]',
    pctText: 'text-[5px]',
    tradeBtn: 'text-[5px] px-1 py-0',
  } : {
    container: 'p-3 gap-2',
    statusText: 'text-[8px] mb-1',
    filterPadding: 'p-2',
    filterText: 'text-[7px]',
    toggleSize: 'w-7 h-3.5',
    toggleDot: 'w-2.5 h-2.5',
    cardPadding: 'p-2',
    avatarSize: 'w-5 h-5 text-[7px]',
    vendorName: 'text-[8px]',
    vendorMethod: 'text-[6px]',
    riskBadge: 'text-[6px] px-1 py-0.5',
    rateText: 'text-[9px]',
    pctText: 'text-[6px]',
    tradeBtn: 'text-[7px] px-1.5 py-0.5',
  };

  return (
    <div className={`w-full h-full ${s.container} flex flex-col`} style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className={`flex justify-between ${s.statusText}`} style={{ color: theme.textMuted }}>
        <span>9:41</span>
        <span className="font-medium" style={{ color: theme.textPrimary }}>P2P Market</span>
        <span>●●●</span>
      </div>
      <div className={`flex items-center justify-between ${s.filterPadding} rounded-lg`} style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <span className={`${s.filterText} flex items-center gap-1`} style={{ color: theme.textMuted }}>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: theme.success }} />
          AI Smart Filter
        </span>
        <div className={`${s.toggleSize} rounded-full flex items-center justify-end px-0.5`} style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}>
          <div className={`${s.toggleDot} rounded-full bg-white`} />
        </div>
      </div>
      {[
        { name: 'KwameGold', rate: '11.44', method: 'Bank Transfer', pct: '99%', risk: 'Low', riskColor: theme.success },
        { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', pct: '95%', risk: 'Low', riskColor: theme.success },
        { name: 'KofiBarter', rate: '11.60', method: 'CashApp', pct: '82%', risk: 'Med', riskColor: theme.warning },
      ].map((v) => (
        <div key={v.name} className={`${s.cardPadding} rounded-lg`} style={{ backgroundColor: `${theme.surface}60`, border: `1px solid ${theme.border}` }}>
          <div className={`flex justify-between items-start ${isMini ? 'mb-1' : 'mb-1.5'}`}>
            <div className="flex items-center gap-1">
              <div className={`${s.avatarSize} rounded-md flex items-center justify-center font-bold`} style={{ backgroundColor: `${accent}15`, color: accent }}>{v.name[0]}</div>
              <div>
                <div className={`${s.vendorName} font-semibold`} style={{ color: theme.textPrimary }}>{v.name}</div>
                <div className={s.vendorMethod} style={{ color: theme.textMuted }}>{v.method}</div>
              </div>
            </div>
            <span className={`${s.riskBadge} rounded-full`} style={{ color: v.riskColor, backgroundColor: `${v.riskColor}15`, border: `1px solid ${v.riskColor}30` }}>{v.risk}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${s.rateText} font-bold`} style={{ color: theme.textPrimary }}>GH₵ {v.rate}/USDC</span>
            <div className="flex items-center gap-1">
              <span className={s.pctText} style={{ color: theme.textMuted }}>{v.pct}</span>
              <span className={`${s.tradeBtn} rounded-md font-bold`} style={{ backgroundColor: accent, color: '#000' }}>Trade</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ScreenTrade({ accent, theme, isMini }: ScreenProps) {
  // Use much smaller sizes for mini (mobile) view
  const sizes = isMini ? {
    container: 'p-1.5 gap-1',
    title: 'text-[7px]',
    timerContainer: 'px-1.5 py-0.5',
    timerText: 'text-[7px]',
    messagePadding: 'px-1.5 py-1',
    messageText: 'text-[6px]',
    messageRadius: 'rounded-md',
    buttonPadding: 'px-2 py-1.5',
    buttonText: 'text-[7px]',
    buttonRadius: 'rounded-md',
  } : {
    container: 'p-4 gap-3',
    title: 'text-xs',
    timerContainer: 'px-4 py-2',
    timerText: 'text-sm',
    messagePadding: 'px-3 py-2',
    messageText: 'text-[10px]',
    messageRadius: 'rounded-xl',
    buttonPadding: 'px-4 py-3',
    buttonText: 'text-sm',
    buttonRadius: 'rounded-xl',
  };

  return (
    <div className={`w-full h-full flex flex-col ${sizes.container}`} style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className={`${sizes.title} font-bold ${isMini ? 'mb-0' : ''}`} style={{ color: theme.textPrimary }}>Active Trade</div>
      <div className={`self-center ${sizes.timerContainer} rounded-full`} style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}40` }}>
        <span className={`${sizes.timerText} font-mono font-bold`} style={{ color: accent }}>⏱ 14:32</span>
      </div>
      <div className={`flex-1 flex flex-col ${isMini ? 'gap-1' : 'gap-2'}`}>
        <div className={`self-start ${sizes.messagePadding} ${sizes.messageRadius} ${sizes.messageText}`} style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, color: theme.textPrimary }}>Send to MoMo: 024-xxx-1234</div>
        <div className={`self-end ${sizes.messagePadding} ${sizes.messageRadius} ${sizes.messageText}`} style={{ backgroundColor: `${accent}25`, color: theme.textPrimary }}>Payment sent!</div>
      </div>
      <div className={`${sizes.buttonPadding} ${sizes.buttonRadius} text-center ${sizes.buttonText} font-bold`} style={{ backgroundColor: theme.success, color: '#000' }}>Confirm Payment</div>
    </div>
  )
}

function ScreenSusu({ accent, theme, isMini }: ScreenProps) {
  const s = isMini ? {
    container: 'p-2 gap-1.5',
    title: 'text-[9px]',
    svgSize: 60,
    cardPadding: 'p-2',
    progressText: 'text-[8px]',
    barHeight: 'h-1.5',
  } : {
    container: 'p-4 gap-3',
    title: 'text-xs',
    svgSize: 90,
    cardPadding: 'p-3',
    progressText: 'text-[10px]',
    barHeight: 'h-2',
  };

  return (
    <div className={`w-full h-full ${s.container} flex flex-col`} style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className={`${s.title} font-bold`} style={{ color: theme.textPrimary }}>Susu Dashboard</div>
      <div className="flex-1 flex items-center justify-center">
        <svg width={s.svgSize} height={s.svgSize} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke={`${accent}30`} strokeWidth="1" />
          {[0,1,2,3,4].map((i) => { const a=(i/5)*Math.PI*2-Math.PI/2; return <circle key={i} cx={50+Math.cos(a)*35} cy={50+Math.sin(a)*35} r="5" fill={`${accent}30`} stroke={accent} strokeWidth="0.5" /> })}
          <circle cx="50" cy="50" r="8" fill={`${accent}40`} />
        </svg>
      </div>
      <div className={`rounded-xl ${s.cardPadding}`} style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <div className={`flex justify-between ${s.progressText} mb-1`}><span style={{ color: theme.textMuted }}>Next payout: Jun 15</span><span style={{ color: accent }}>65%</span></div>
        <div className={`${s.barHeight} rounded-full overflow-hidden`} style={{ backgroundColor: theme.border }}><div className="h-full w-[65%] rounded-full" style={{ backgroundColor: accent }} /></div>
      </div>
    </div>
  )
}

function ScreenVault({ accent, theme, isMini }: ScreenProps) {
  const s = isMini ? {
    container: 'p-2 gap-2',
    iconSize: 'w-12 h-12 rounded-xl',
    iconEmoji: 'text-lg',
    amountText: 'text-base',
    unlockText: 'text-[8px] mt-0.5',
    streakPadding: 'px-2 py-1',
    streakText: 'text-[8px]',
  } : {
    container: 'p-4 gap-4',
    iconSize: 'w-16 h-16 rounded-2xl',
    iconEmoji: 'text-2xl',
    amountText: 'text-xl',
    unlockText: 'text-[10px] mt-1',
    streakPadding: 'px-3 py-1.5',
    streakText: 'text-[10px]',
  };

  return (
    <div className={`w-full h-full ${s.container} flex flex-col items-center justify-center`} style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className={`${s.iconSize} flex items-center justify-center`} style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}><span className={s.iconEmoji}>🔐</span></div>
      <div className="text-center"><div className={`${s.amountText} font-black`} style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>GHS 5,000</div><div className={s.unlockText} style={{ color: theme.textMuted }}>Unlocks in 18 days</div></div>
      <div className={`flex items-center gap-2 ${s.streakPadding} rounded-full`} style={{ backgroundColor: `${theme.success}15`, border: `1px solid ${theme.success}30` }}><span className={`${s.streakText} font-bold`} style={{ color: theme.success }}>🔥 14 day streak</span></div>
    </div>
  )
}

// =============================================================================
// Mini Screen Components (mobile cards)
// =============================================================================
function MiniScreen({ idx, accent, theme }: { idx: number; accent: string; theme: ScreenProps['theme'] }) {
  const screens = [
    <ScreenHome key="h" accent={accent} theme={theme} isMini={true} />,
    <ScreenMarketplace key="m" accent={accent} theme={theme} isMini={true} />,
    <ScreenTrade key="t" accent={accent} theme={theme} isMini={true} />,
    <ScreenSusu key="s" accent={accent} theme={theme} isMini={true} />,
    <ScreenVault key="v" accent={accent} theme={theme} isMini={true} />,
  ]

  return (
    <div className="w-full h-full overflow-hidden">
      {screens[idx]}
    </div>
  )
}
