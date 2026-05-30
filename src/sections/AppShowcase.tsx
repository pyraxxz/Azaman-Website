// =============================================================================
// AppShowcase — Scroll-scrubbed phone carousel
// Desktop: GSAP pin for 4× viewport. 5 screens absolutely positioned inside
// phone, GSAP controls opacity/y. Dot indicator + left headline cross-fade.
// Mobile: 5 stacked Glass cards with whileInView stagger.
// =============================================================================

import { useEffect, useRef } from 'react'
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
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024

  // Desktop: GSAP ScrollTrigger pin with scrub-driven screen switching
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion()) return
    const section = sectionRef.current
    if (!section) return

    const screenEls = section.querySelectorAll<HTMLElement>('[data-screen]')
    const labelEls = section.querySelectorAll<HTMLElement>('[data-label]')
    const dotEls = section.querySelectorAll<HTMLElement>('[data-dot]')
    const lineFill = section.querySelector<HTMLElement>('[data-line-fill]')

    // Initial: all screens hidden except first
    gsap.set(screenEls, { opacity: 0, y: 20 })
    gsap.set(screenEls[0], { opacity: 1, y: 0 })
    gsap.set(labelEls, { opacity: 0, y: 40 })
    gsap.set(labelEls[0], { opacity: 1, y: 0 })

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

      // Fade in current screen
      if (i > 0) {
        tl.to(screenEls[i], { opacity: 1, y: 0, duration: 0.04 }, fadeInStart)
        tl.to(labelEls[i], { opacity: 1, y: 0, duration: 0.04 }, fadeInStart)
      }
      // Fade out current screen (except last)
      if (i < 4) {
        tl.to(screenEls[i], { opacity: 0, y: -20, duration: 0.04 }, fadeOutStart)
        tl.to(labelEls[i], { opacity: 0, y: -40, duration: 0.04 }, fadeOutStart)
      }
    }

    // Dot indicator + line fill via onUpdate
    const st = tl.scrollTrigger!
    st.vars.onUpdate = (self: ScrollTrigger) => {
      const progress = self.progress
      // Line fill
      if (lineFill) {
        lineFill.style.transform = `scaleY(${progress})`
      }
      // Dots
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
            {/* Left: Feature labels (GSAP cross-fade) */}
            <div className="flex-1 max-w-xs relative" style={{ minHeight: 200 }}>
              {SCREENS.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.id} data-label className="absolute inset-0 flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                      <Icon size={20} style={{ color: theme.accent }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{s.subtitle}</p>
                  </div>
                )
              })}
            </div>

            {/* Center: Phone with absolutely positioned screens */}
            <div className="relative flex-shrink-0">
              <div className="relative w-[280px] h-[580px] rounded-[40px] border-[3px] bg-black overflow-hidden" style={{ borderColor: '#1F2128', boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 80px ${theme.glow}20` }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
                <div className="absolute inset-[3px] rounded-[37px] overflow-hidden">
                  {/* All 5 screens stacked absolutely */}
                  <div data-screen className="absolute inset-0"><ScreenHome accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0"><ScreenMarketplace accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0"><ScreenTrade accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0"><ScreenSusu accent={theme.accent} theme={theme} /></div>
                  <div data-screen className="absolute inset-0"><ScreenVault accent={theme.accent} theme={theme} /></div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 z-20" />
              </div>
            </div>

            {/* Right: Vertical dot indicator */}
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center" style={{ height: 200 }}>
                {/* Background line */}
                <div className="absolute top-0 bottom-0 w-[2px] rounded-full" style={{ backgroundColor: theme.border }} />
                {/* Fill line (scaleY driven by GSAP) */}
                <div data-line-fill className="absolute top-0 left-0 right-0 w-[2px] rounded-full origin-top" style={{ backgroundColor: theme.accent, height: '100%', transform: 'scaleY(0)' }} />
                {/* Dots */}
                {SCREENS.map((s, i) => (
                  <div key={s.id} data-dot className="relative z-10 rounded-full transition-all duration-200" style={{ width: i === 0 ? 14 : 6, height: i === 0 ? 14 : 6, backgroundColor: i === 0 ? theme.accent : `${theme.textMuted}40`, boxShadow: i === 0 ? `0 0 12px ${theme.accent}80` : 'none', marginTop: i === 0 ? 0 : 'auto', marginBottom: i === 4 ? 0 : 'auto' }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Mobile: 5 stacked Glass cards */
          <div className="flex flex-col gap-4">
            {SCREENS.map((screen, i) => {
              const Icon = screen.icon
              return (
                <motion.div key={screen.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Glass radius="xl" padding="md" tilt tiltMax={4}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}>
                        <Icon size={18} style={{ color: theme.accent }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold mb-1" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>{screen.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{screen.subtitle}</p>
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
// Phone Screen Components
// =============================================================================
type ScreenProps = { accent: string; theme: { surface: string; background: string; textPrimary: string; textMuted: string; success: string; warning: string; accent: string; border: string } }

function ScreenHome({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-[9px] text-center mb-3" style={{ color: theme.textMuted }}>9:41</div>
      <div className="text-sm font-black mb-4" style={{ fontFamily: 'Space Grotesk', color: accent }}>AZAMAN</div>
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #161618, #0A0A0C)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total Balance</div>
        <div className="text-2xl font-black mt-1" style={{ fontFamily: 'Space Grotesk', color: '#fff' }}>GHS 14,280.00</div>
        <div className="text-[10px] mt-1" style={{ color: accent }}>≈ $1,240 USDC</div>
      </div>
      <div className="flex gap-2">
        {[{ l: 'Available', v: '$890', c: theme.success }, { l: 'Vendor', v: '$200', c: accent }, { l: 'Escrow', v: '$148', c: theme.warning }, { l: 'Dispute', v: '$2', c: '#F6465D' }].map((p) => (
          <div key={p.l} className="flex-1 p-2 rounded-lg text-center" style={{ backgroundColor: `${p.c}10`, border: `1px solid ${p.c}20` }}>
            <div className="text-[7px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.l}</div>
            <div className="text-[9px] font-bold" style={{ color: p.c }}>{p.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenMarketplace({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="text-xs font-bold" style={{ color: theme.textPrimary }}>P2P Marketplace</div>
      {[
        { name: 'KwameGold', rate: '11.44', method: 'Bank', pct: '99%' },
        { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', pct: '95%' },
        { name: 'KofiBarter', rate: '11.60', method: 'CashApp', pct: '82%' },
      ].map((v) => (
        <div key={v.name} className="p-3 rounded-xl" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[11px] font-semibold" style={{ color: theme.textPrimary }}>{v.name}</div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>{v.method} · {v.pct}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold" style={{ color: accent }}>GH₵ {v.rate}</div>
              <div className="text-[8px] px-2 py-0.5 rounded-full font-bold mt-0.5" style={{ backgroundColor: accent, color: '#000' }}>Trade</div>
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
          {[0, 1, 2, 3, 4].map((i) => { const a = (i / 5) * Math.PI * 2 - Math.PI / 2; return <circle key={i} cx={50 + Math.cos(a) * 35} cy={50 + Math.sin(a) * 35} r="5" fill={`${accent}30`} stroke={accent} strokeWidth="0.5" /> })}
          <circle cx="50" cy="50" r="8" fill={`${accent}40`} />
        </svg>
      </div>
      <div className="rounded-xl p-3" style={{ backgroundColor: `${theme.surface}90`, border: `1px solid ${theme.border}` }}>
        <div className="flex justify-between text-[10px] mb-1">
          <span style={{ color: theme.textMuted }}>Next payout: Jun 15</span>
          <span style={{ color: accent }}>65%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
          <div className="h-full w-[65%] rounded-full" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  )
}

function ScreenVault({ accent, theme }: ScreenProps) {
  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-4" style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})` }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}>
        <span className="text-2xl">🔐</span>
      </div>
      <div className="text-center">
        <div className="text-xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>GHS 5,000</div>
        <div className="text-[10px] mt-1" style={{ color: theme.textMuted }}>Unlocks in 18 days</div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, border: `1px solid ${theme.success}30` }}>
        <span className="text-[10px] font-bold" style={{ color: theme.success }}>🔥 14 day streak</span>
      </div>
    </div>
  )
}
