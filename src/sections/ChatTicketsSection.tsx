// =============================================================================
// ChatTicketsSection - 50/50 layout
// LEFT: Phone mockup with GSAP chat loop (preserved logic)
// RIGHT: 3 stacked Glass feature cards sliding in from right
// =============================================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Receipt,
  Users,
  Play,
  Send,
  CheckCheck,
  Upload,
  Mic,
} from 'lucide-react'
import Glass from '@/components/Glass'
import PhoneFrame from '@/components/PhoneFrame'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export default function ChatTicketsSection() {
  const { theme } = useTheme()
  const stageRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  // GSAP chat loop - messages reveal progressively as the phone scrolls into
  // view. The same scroll-scrubbed timeline now drives BOTH mobile and desktop:
  // previously desktop ran an auto-playing loop, so on a laptop you had to sit
  // and wait for each message to play out instead of pulling them in on scroll.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (prefersReducedMotion()) return

    let tl: gsap.core.Timeline | null = null

    const setup = () => {
      gsap.set(stage.querySelectorAll('[data-msg]'), { opacity: 0, y: 16 })
      gsap.set(stage.querySelector('[data-typing]'), { opacity: 0 })
      gsap.set(stage.querySelectorAll('[data-bar]'), { scaleY: 0.2 })
      gsap.set(stage.querySelector('[data-progress]'), { width: '0%' })
      gsap.set(stage.querySelector('[data-ticket]'), { opacity: 0, scale: 0.85, y: 12 })

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 85%',
          end: isMobile ? 'center center' : 'center 45%',
          scrub: 0.5,
        },
        defaults: { ease: 'power3.out' },
      })

      tl.to(stage.querySelector('[data-msg="0"]'), { opacity: 1, y: 0, duration: 0.5 })
      tl.to(stage.querySelector('[data-typing]'), { opacity: 1, duration: 0.3 }, '+=0.2')
      tl.to(stage.querySelector('[data-msg="1"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.3')
      tl.to(stage.querySelector('[data-typing]'), { opacity: 0, duration: 0.2 }, '<')
      tl.to(stage.querySelector('[data-msg="2"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.2')
      const bars = stage.querySelectorAll('[data-bar]')
      tl.to(bars, {
        scaleY: () => 0.3 + Math.random() * 1.3,
        duration: 0.16,
        stagger: { each: 0.04, repeat: 3, yoyo: true },
        ease: 'sine.inOut',
      }, '<')
      tl.to(stage.querySelector('[data-progress]'), { width: '100%', duration: 1.5, ease: 'none' }, '<')
      tl.to(stage.querySelector('[data-ticket]'), { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }, '+=0.2')
      tl.to(stage.querySelector('[data-msg="3"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.2')
      tl.to(stage.querySelector('[data-msg="4"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.2')
    }

    setup()

    return () => { tl?.scrollTrigger?.kill(); tl?.kill() }
  }, [isMobile])

  const FEATURE_CARDS = [
    {
      icon: MessageCircle,
      title: 'Trade Chat',
      desc: 'Every trade has its own private channel. Send proof, voice notes, and files - end-to-end secured.',
    },
    {
      icon: Receipt,
      title: 'Support Tickets',
      desc: 'Disputes auto-escalate. AI reviews the evidence. Most resolved in under 30 minutes.',
    },
    {
      icon: Users,
      title: 'Social Chat',
      desc: 'Send money inside any conversation. Biometric confirmed.',
    },
  ]

  return (
    <section
      id="chat-tickets"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 800px 500px at 30% 50%, ${theme.glow}10 0%, transparent 70%)` }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: Phone mockup */}
        <div className="flex items-center justify-center">
          <div ref={stageRef} style={{ perspective: '1400px' }}>
            <PhoneFrame width={isMobile ? 240 : 300} height={isMobile ? 500 : 620} tilt scanlines>
              <ChatStage isMobile={isMobile} />
            </PhoneFrame>
          </div>
        </div>

        {/* RIGHT: Feature cards */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
            >
              <MessageCircle size={12} />
              Social-Transactional
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-[1.05]"
              style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
            >
              Chat that closes{' '}
              <span className="text-gradient-flow">the deal.</span>
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
              Trade-bound chat with built-in audio, payment proof, and live tickets.
            </p>
          </motion.div>

          {FEATURE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Glass tilt tiltMax={4} radius="xl" padding="md" mouseGlow>
                  <div
                    className="flex items-start gap-4 group transition-all duration-200"
                    style={{ borderLeft: '3px solid transparent' }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}
                    >
                      <Icon size={20} style={{ color: theme.accent }} />
                    </div>
                    <div>
                      <div className="text-base font-bold mb-1" style={{ color: theme.textPrimary }}>
                        {card.title}
                      </div>
                      <div className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                        {card.desc}
                      </div>
                    </div>
                  </div>
                </Glass>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// ChatStage - scripted chat view inside the phone
// =============================================================================

function ChatStage({ isMobile }: { isMobile: boolean }) {
  const { theme } = useTheme()

  // Responsive sizes - dramatically smaller for mobile
  const s = isMobile ? {
    headerPx: 'px-2.5 pt-6 pb-2',
    avatarSize: 'w-7 h-7 text-xs',
    nameText: 'text-xs',
    statusText: 'text-[8px]',
    timerPx: 'px-1.5 py-0.5',
    timerText: 'text-[8px]',
    msgPadding: 'p-2 gap-2',
    systemText: 'text-[7px] px-2 py-0.5',
    bubbleText: 'text-[9px] px-2.5 py-1.5',
    audioSize: 'w-5 h-5',
    audioPlaySize: 9,
    audioBarGap: 'gap-[1px]',
    audioTime: 'text-[8px]',
    ticketPx: 'px-2 py-1.5',
    ticketHeaderPx: 'px-2 py-1.5',
    ticketIcon: 10,
    ticketTitle: 'text-[8px]',
    ticketTx: 'text-[7px]',
    ticketLabel: 'text-[7px]',
    ticketValue: 'text-[9px]',
    proofPx: 'px-2 py-1.5',
    proofIcon: 9,
    proofText: 'text-[8px]',
    proofDesc: 'text-[7px] px-2 pb-1.5',
    composerPx: 'px-2 py-2',
    composerIcon: 14,
    composerHeight: 'h-7',
    composerText: 'text-[9px] px-3',
    composerBtnSize: 'w-7 h-7',
    composerBtnIcon: 12,
  } : {
    headerPx: 'px-4 pt-8 pb-3',
    avatarSize: 'w-9 h-9 text-sm',
    nameText: 'text-sm',
    statusText: 'text-[10px]',
    timerPx: 'px-2 py-1',
    timerText: 'text-[10px]',
    msgPadding: 'p-3 gap-2.5',
    systemText: 'text-[9px] px-3 py-1',
    bubbleText: 'text-[11px] px-3.5 py-2',
    audioSize: 'w-7 h-7',
    audioPlaySize: 11,
    audioBarGap: 'gap-[2px]',
    audioTime: 'text-[10px]',
    ticketPx: 'px-3 py-2.5',
    ticketHeaderPx: 'px-3 py-2',
    ticketIcon: 12,
    ticketTitle: 'text-[10px]',
    ticketTx: 'text-[9px]',
    ticketLabel: 'text-[8px]',
    ticketValue: 'text-[11px]',
    proofPx: 'px-3 py-2',
    proofIcon: 11,
    proofText: 'text-[10px]',
    proofDesc: 'text-[9px] px-3 pb-2',
    composerPx: 'px-3 py-3',
    composerIcon: 16,
    composerHeight: 'h-9',
    composerText: 'text-[11px] px-4',
    composerBtnSize: 'w-9 h-9',
    composerBtnIcon: 14,
  };

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})`,
        boxShadow: `inset 0 0 40px ${theme.glow}15`,
      }}
    >
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className={`flex items-center gap-2.5 ${s.headerPx} border-b`} style={{ borderColor: theme.border }}>
          <div
            className={`${s.avatarSize} rounded-full flex items-center justify-center font-bold`}
            style={{ backgroundColor: `${theme.accent}20`, color: theme.accent, border: `1px solid ${theme.accent}` }}
          >
            KG
          </div>
          <div className="flex-1 min-w-0">
            <div className={`${s.nameText} font-bold truncate`} style={{ color: theme.textPrimary }}>KwameGold</div>
            <div className={`${s.statusText} flex items-center gap-1`} style={{ color: theme.success }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
              Trade #1024 · Active
            </div>
          </div>
          <motion.div
            className={`${s.timerPx} rounded-full`}
            style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={`${s.timerText} font-mono font-bold`} style={{ color: theme.accent }}>⏱ 12:45</span>
          </motion.div>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-hidden ${s.msgPadding} flex flex-col relative`}>
          <div data-msg="0" className={`self-center ${s.systemText} rounded-full`} style={{ backgroundColor: `${theme.surface}b0`, color: theme.textMuted }}>
            Trade started · 100 USDC for GH₵ 1,144
          </div>

          {/* Vendor bubble */}
          <div data-msg="1" className={`self-start max-w-[78%] ${s.bubbleText} rounded-2xl rounded-bl-md leading-relaxed`} style={{ backgroundColor: theme.card, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>
            Hey 👋 Send to MTN MoMo: <strong>024-xxx-1234</strong>. Name: Kwame A.
          </div>

          {/* Typing */}
          <div data-typing className={`self-start flex items-center gap-1 ${isMobile ? 'px-2 py-1.5' : 'px-3 py-2'} rounded-2xl`} style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.textMuted }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }} />
            ))}
          </div>

          {/* Audio waveform */}
          <div data-msg="2" className={`self-end max-w-[80%] ${isMobile ? 'px-2 py-2' : 'px-3 py-2.5'} rounded-2xl rounded-br-md flex items-center gap-2`} style={{ backgroundColor: `${theme.accent}25`, border: `1px solid ${theme.accent}40` }}>
            <div className={`${s.audioSize} rounded-full flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: theme.accent }}>
              <Play size={s.audioPlaySize} className="text-black" fill="currentColor" />
            </div>
            <div className={`flex-1 flex items-center ${s.audioBarGap} ${s.audioSize}`}>
              {Array.from({ length: isMobile ? 20 : 28 }).map((_, i) => (
                <div key={i} data-bar className="flex-1 rounded-full" style={{ backgroundColor: theme.accent, height: '70%', transformOrigin: 'center' }} />
              ))}
            </div>
            <span className={`${s.audioTime} font-mono flex-shrink-0`} style={{ color: theme.accent }}>0:08</span>
          </div>

          {/* Progress */}
          <div className="self-end -mt-1 h-[2px] rounded-full overflow-hidden" style={{ width: '70%', backgroundColor: `${theme.accent}20` }}>
            <div data-progress className="h-full" style={{ backgroundColor: theme.accent, width: 0 }} />
          </div>

          {/* Ticket card */}
          <div
            data-ticket
            className={`self-center ${isMobile ? 'w-[95%] mt-0.5' : 'w-[90%] mt-1'} rounded-2xl overflow-hidden`}
            style={{
              background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
              border: `1px solid ${theme.accent}50`,
              borderLeft: `1px dashed ${theme.accent}50`,
              borderRight: `1px dashed ${theme.accent}50`,
              boxShadow: `0 0 24px ${theme.accent}30`,
            }}
          >
            <div className={`flex items-center gap-2 ${s.ticketHeaderPx} border-b`} style={{ borderColor: `${theme.accent}30` }}>
              <Receipt size={s.ticketIcon} style={{ color: theme.accent }} />
              <span className={`${s.ticketTitle} font-bold tracking-[0.18em] uppercase`} style={{ color: theme.accent }}>
                TRADE #4721
              </span>
              <span className={`ml-auto ${s.ticketTx}`} style={{ color: theme.textMuted }}>#TX-88421</span>
            </div>
            <div className={`${s.ticketPx} grid grid-cols-3 gap-2`}>
              <div>
                <div className={s.ticketLabel} style={{ color: theme.textMuted }}>Amount</div>
                <div className={`${s.ticketValue} font-bold`} style={{ color: theme.textPrimary }}>100 USDC</div>
              </div>
              <div>
                <div className={s.ticketLabel} style={{ color: theme.textMuted }}>Rate</div>
                <div className={`${s.ticketValue} font-bold`} style={{ color: theme.accent }}>GH₵ 11.44</div>
              </div>
              <div>
                <div className={s.ticketLabel} style={{ color: theme.textMuted }}>Status</div>
                <div className={`${s.ticketValue} font-bold`} style={{ color: theme.success }}>Open</div>
              </div>
            </div>
            {/* SVG barcode pattern */}
            <div className={isMobile ? 'px-2 pb-1.5' : 'px-3 pb-2'}>
              <svg width="100%" height={isMobile ? '10' : '12'} viewBox="0 0 200 12" preserveAspectRatio="none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 5}
                    y={0}
                    width={i % 3 === 0 ? 3 : 1.5}
                    height={12}
                    fill={theme.accent}
                    opacity={0.3}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* User reply */}
          <div data-msg="3" className={`self-end max-w-[78%] ${s.bubbleText} rounded-2xl rounded-br-md leading-relaxed flex items-center gap-2`} style={{ backgroundColor: `${theme.accent}25`, border: `1px solid ${theme.accent}40`, color: theme.textPrimary }}>
            <span>Sent. Uploading proof now…</span>
            <CheckCheck size={isMobile ? 9 : 11} style={{ color: theme.accent }} />
          </div>

          {/* Payment proof */}
          <div data-msg="4" className="self-end max-w-[78%] rounded-2xl rounded-br-md overflow-hidden" style={{ backgroundColor: `${theme.success}10`, border: `1px solid ${theme.success}30` }}>
            <div className={`${s.proofPx} flex items-center gap-2`}>
              <Upload size={s.proofIcon} style={{ color: theme.success }} />
              <span className={`${s.proofText} font-bold`} style={{ color: theme.success }}>Payment Proof Uploaded</span>
            </div>
            <div className={`${s.proofDesc}`} style={{ color: theme.textMuted }}>
              MoMo Receipt · TXN-88421 · Verified by AI
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className={`flex items-center gap-2 ${s.composerPx} border-t`} style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
          <Mic size={s.composerIcon} style={{ color: theme.textMuted }} />
          <div className={`flex-1 ${s.composerHeight} rounded-full ${s.composerText} flex items-center`} style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.textMuted }}>
            Type a message…
          </div>
          <div className={`${s.composerBtnSize} rounded-full flex items-center justify-center`} style={{ backgroundColor: theme.accent }}>
            <Send size={s.composerBtnIcon} style={{ color: theme.isDark ? '#000' : '#fff' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
