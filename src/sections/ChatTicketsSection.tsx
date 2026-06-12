// =============================================================================
// ChatTicketsSection - "Chat that moves money."
// A friend chat where you gift money inside the conversation: messages pop in,
// a Send sheet slides up (amount + reference), a slide-to-confirm travels across,
// then confetti bursts and the screen flips to "Money sent". Auto-plays (and
// loops) when scrolled into view. Reduced-motion shows the final sent state.
// =============================================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Gift, Wallet, ShieldCheck, Send, Check, ChevronsRight } from 'lucide-react'
import Glass from '@/components/Glass'
import PhoneFrame from '@/components/PhoneFrame'
import { useTheme } from '@/contexts/ThemeContext'
import type { ThemeColors } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

const FEATURE_CARDS = [
  {
    icon: Gift,
    title: 'Gift a friend in seconds',
    desc: 'Split a bill, send a birthday gift, settle up. Drop USDC right into the chat with a note like “🎂 Happy Birthday”.',
  },
  {
    icon: Wallet,
    title: 'No addresses, no app-switching',
    desc: 'No copy-pasting wallet addresses or leaving the conversation. The chat is the wallet.',
  },
  {
    icon: ShieldCheck,
    title: 'Confirmed by you',
    desc: 'Every transfer ends with a deliberate slide-to-send, so money only moves the moment you mean it.',
  },
]

export default function ChatTicketsSection() {
  const { theme } = useTheme()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  return (
    <section
      id="chat-tickets"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 800px 500px at 30% 50%, ${theme.glow}10 0%, transparent 70%)` }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: Phone mockup */}
        <div className="flex items-center justify-center order-2 lg:order-1">
          <div style={{ perspective: '1400px' }}>
            <PhoneFrame width={isMobile ? 250 : 330} height={isMobile ? 520 : 680} tilt scanlines>
              <ChatStage theme={theme} />
            </PhoneFrame>
          </div>
        </div>

        {/* RIGHT: Feature cards */}
        <div className="flex flex-col gap-4 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
            >
              <MessageCircle size={12} />
              Social Payments
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-[1.05]"
              style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
            >
              Chat that{' '}
              <span className="text-gradient-flow">moves money.</span>
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
              Message your friends, then send them USDC without ever leaving the conversation. Add a note, slide to send, done.
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
                  <div className="flex items-start gap-4">
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
// ChatStage - scripted friend-chat + gift flow inside the phone.
// =============================================================================

const MESSAGES = [
  { side: 'in', text: 'Yooo guess what 👀' },
  { side: 'in', text: 'It’s my birthday today!! 🎂🎉' },
  { side: 'out', text: 'Happy birthday bestie 🥳' },
  { side: 'out', text: 'Sending you something rn 👇' },
] as const

const CONFETTI_COUNT = 30

function ChatStage({ theme }: { theme: ThemeColors }) {
  const rootRef = useRef<HTMLDivElement>(null)

  const confettiColors = [theme.accent, theme.accentSecondary, theme.success, theme.warning, theme.textPrimary]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const bubbles = root.querySelectorAll<HTMLElement>('[data-bubble]')
    const sheet = root.querySelector<HTMLElement>('[data-sheet]')
    const amount = root.querySelector<HTMLElement>('[data-amount]')
    const ref = root.querySelector<HTMLElement>('[data-ref]')
    const track = root.querySelector<HTMLElement>('[data-slide-track]')
    const thumb = root.querySelector<HTMLElement>('[data-slide-thumb]')
    const fill = root.querySelector<HTMLElement>('[data-slide-fill]')
    const slideLabel = root.querySelector<HTMLElement>('[data-slide-label]')
    const success = root.querySelector<HTMLElement>('[data-success]')
    const pieces = root.querySelectorAll<HTMLElement>('[data-confetti-piece]')
    if (!sheet || !track || !thumb || !fill || !success) return

    // Reduced motion: show the completed "sent" state, nothing animates.
    if (prefersReducedMotion()) {
      gsap.set(bubbles, { opacity: 1, y: 0 })
      gsap.set(sheet, { yPercent: 0, opacity: 1 })
      gsap.set(success, { opacity: 1, scale: 1 })
      return
    }

    const fireConfetti = () => {
      pieces.forEach((p) => {
        const angle = Math.random() * Math.PI * 2
        const dist = 50 + Math.random() * 130
        gsap.killTweensOf(p)
        gsap.set(p, { x: 0, y: 0, opacity: 1, scale: 0.5 + Math.random() * 0.9 })
        gsap.to(p, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist - 30,
          rotation: (Math.random() - 0.5) * 600,
          opacity: 0,
          duration: 1.1 + Math.random() * 0.7,
          ease: 'power2.out',
        })
      })
    }

    const slideMax = () => Math.max(0, track.clientWidth - thumb.offsetWidth - 8)

    const reset = () => {
      gsap.set(bubbles, { opacity: 0, y: 16 })
      gsap.set(sheet, { yPercent: 110, opacity: 0 })
      gsap.set([amount, ref], { opacity: 0, y: 8 })
      gsap.set(thumb, { x: 0 })
      gsap.set(fill, { width: 0 })
      gsap.set(slideLabel, { opacity: 1 })
      gsap.set(success, { opacity: 0, scale: 0.9 })
      gsap.set(pieces, { opacity: 0, x: 0, y: 0 })
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, paused: true })
    tl.call(reset)
      .to(bubbles, { opacity: 1, y: 0, duration: 0.45, stagger: 0.5, ease: 'power3.out' })
      .to(sheet, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.3)' }, '+=0.2')
      .to(amount, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1')
      .to(ref, { opacity: 1, y: 0, duration: 0.35 }, '-=0.15')
      .to(fill, { width: '100%', duration: 1.1, ease: 'power2.inOut' }, '+=0.35')
      .to(thumb, { x: slideMax, duration: 1.1, ease: 'power2.inOut' }, '<')
      .to(slideLabel, { opacity: 0, duration: 0.3 }, '<')
      .call(fireConfetti, [], '-=0.05')
      .to(success, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.05')
      .to(sheet, { opacity: 0.15, duration: 0.4 }, '<')

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tl.play()
        else tl.pause()
      },
      { threshold: 0.35 }
    )
    io.observe(root)

    return () => { io.disconnect(); tl.kill() }
  }, [theme])

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})`,
        boxShadow: `inset 0 0 40px ${theme.glow}15`,
      }}
    >
      <div className="flex flex-col w-full h-full">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 pt-8 pb-3 border-b" style={{ borderColor: theme.border }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary})`, color: theme.isDark ? '#000' : '#fff' }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate" style={{ color: theme.textPrimary }}>Ama 🎂</div>
            <div className="text-[10px] flex items-center gap-1" style={{ color: theme.success }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
              online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2">
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              data-bubble
              className={`max-w-[80%] text-[11px] px-3.5 py-2 leading-relaxed rounded-2xl ${m.side === 'out' ? 'self-end rounded-br-md' : 'self-start rounded-bl-md'}`}
              style={
                m.side === 'out'
                  ? { backgroundColor: `${theme.accent}25`, border: `1px solid ${theme.accent}40`, color: theme.textPrimary }
                  : { backgroundColor: theme.card, border: `1px solid ${theme.border}`, color: theme.textPrimary }
              }
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Send-money sheet */}
        <div
          data-sheet
          className="relative mx-2 mb-2 rounded-2xl p-3"
          style={{ background: `linear-gradient(135deg, ${theme.surface}, ${theme.card})`, border: `1px solid ${theme.accent}40`, boxShadow: `0 -8px 30px ${theme.glow}20` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gift size={13} style={{ color: theme.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: theme.accent }}>Send to Ama</span>
          </div>

          <div data-amount className="flex items-end gap-1.5 mb-2">
            <span className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>GH₵ 200</span>
            <span className="text-[10px] mb-1" style={{ color: theme.textMuted }}>≈ 17.5 USDC</span>
          </div>

          <div data-ref className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ backgroundColor: `${theme.accent}12`, border: `1px solid ${theme.accent}25` }}>
            <span className="text-[10px]" style={{ color: theme.textSecondary }}>🎂 Happy Birthday Ama!</span>
          </div>

          {/* Slide to send */}
          <div
            data-slide-track
            className="relative h-10 rounded-full overflow-hidden flex items-center"
            style={{ backgroundColor: `${theme.textMuted}1F`, border: `1px solid ${theme.border}` }}
          >
            <div data-slide-fill className="absolute left-0 top-0 bottom-0 rounded-full" style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentSecondary})`, width: 0 }} aria-hidden="true" />
            <span data-slide-label className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold pointer-events-none" style={{ color: theme.textSecondary }}>
              Slide to send →
            </span>
            <div
              data-slide-thumb
              className="relative z-10 w-8 h-8 ml-1 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000' : '#fff' }}
            >
              <ChevronsRight size={16} />
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
          <div className="flex-1 h-8 rounded-full text-[11px] px-4 flex items-center" style={{ backgroundColor: theme.background, border: `1px solid ${theme.border}`, color: theme.textMuted }}>
            Message Ama…
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.accent }}>
            <Send size={14} style={{ color: theme.isDark ? '#000' : '#fff' }} />
          </div>
        </div>
      </div>

      {/* Success overlay */}
      <div
        data-success
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})`, opacity: 0 }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${theme.success}, ${theme.accent})`, boxShadow: `0 0 40px ${theme.success}66` }}>
          <Check size={30} style={{ color: theme.isDark ? '#000' : '#fff' }} strokeWidth={3} />
        </div>
        <div className="text-xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>Money sent</div>
        <div className="text-2xl font-black mt-1" style={{ fontFamily: 'Space Grotesk', color: theme.accent }}>GH₵ 200 → Ama</div>
        <div className="text-xs mt-2" style={{ color: theme.textMuted }}>She’ll get a notification 🎉</div>
      </div>

      {/* Confetti layer */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none z-20" aria-hidden="true">
        {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
          <span
            key={i}
            data-confetti-piece
            className="absolute block rounded-[2px]"
            style={{
              width: i % 3 === 0 ? 6 : 8,
              height: i % 3 === 0 ? 10 : 8,
              backgroundColor: confettiColors[i % confettiColors.length],
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
