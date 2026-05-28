// =============================================================================
// ChatTicketsSection — "Social-Transactional"
// An interactive chat mockup that loops a scripted exchange:
//   1) trade header in
//   2) vendor message (typing -> bubble)
//   3) audio waveform with playback progress
//   4) Ticket card materializes inline
//   5) reply with payment proof
// Plays only when section enters viewport.
// =============================================================================

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Receipt,
  Mic,
  Play,
  Send,
  CheckCheck,
  Upload,
} from 'lucide-react'
import Glass from '@/components/Glass'
import PhoneFrame from '@/components/PhoneFrame'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export default function ChatTicketsSection() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (prefersReducedMotion()) return

    let tl: gsap.core.Timeline | null = null

    const startLoop = () => {
      // Reset
      gsap.set(stage.querySelectorAll('[data-msg]'), { opacity: 0, y: 16 })
      gsap.set(stage.querySelector('[data-typing]'), { opacity: 0 })
      gsap.set(stage.querySelectorAll('[data-bar]'), { scaleY: 0.2 })
      gsap.set(stage.querySelector('[data-progress]'), { width: '0%' })
      gsap.set(stage.querySelector('[data-ticket]'), { opacity: 0, scale: 0.85, y: 12 })

      tl = gsap.timeline({ defaults: { ease: 'power3.out' }, repeat: -1, repeatDelay: 1.6 })

      // 1) Trade header / system line
      tl.to(stage.querySelector('[data-msg="0"]'), { opacity: 1, y: 0, duration: 0.5 })

      // 2) Vendor: typing then bubble
      tl.to(stage.querySelector('[data-typing]'), { opacity: 1, duration: 0.3 }, '+=0.4')
      tl.to(stage.querySelector('[data-msg="1"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=1')
      tl.to(stage.querySelector('[data-typing]'), { opacity: 0, duration: 0.2 }, '<')

      // 3) User: audio waveform message
      tl.to(stage.querySelector('[data-msg="2"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.6')
      const bars = stage.querySelectorAll('[data-bar]')
      tl.to(bars, {
        scaleY: () => 0.3 + Math.random() * 1.3,
        duration: 0.16,
        stagger: { each: 0.04, repeat: 3, yoyo: true },
        ease: 'sine.inOut',
      }, '<')
      tl.to(stage.querySelector('[data-progress]'), { width: '100%', duration: 2.2, ease: 'none' }, '<')

      // 4) Ticket materializes
      tl.to(stage.querySelector('[data-ticket]'), {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
      }, '+=0.4')

      // 5) Reply with payment proof
      tl.to(stage.querySelector('[data-msg="3"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.6')
      tl.to(stage.querySelector('[data-msg="4"]'), { opacity: 1, y: 0, duration: 0.5 }, '+=0.4')

      // 6) Read receipts pop
      tl.fromTo(
        stage.querySelectorAll('[data-receipt]'),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3 },
        '+=0.3'
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (tl) tl.play()
          else startLoop()
        } else {
          tl?.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(stage)

    return () => {
      observer.disconnect()
      tl?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="chat-tickets"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 500px at 30% 50%, ${theme.glow}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Copy */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                backgroundColor: `${theme.accent}10`,
                border: `1px solid ${theme.accent}30`,
                color: theme.accent,
              }}
            >
              <MessageCircle size={12} />
              Social-Transactional
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.05]"
              style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
            >
              Chat that closes{' '}
              <span style={{ color: theme.accent }}>the deal.</span>
            </h2>
            <p className="text-base lg:text-lg leading-relaxed mb-6" style={{ color: theme.textSecondary }}>
              Trade-bound chat with built-in audio messages, payment proof, and live tickets. Every
              negotiation captured, every receipt verified. No screenshots. No disputes lost.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: Mic,
                  title: 'Audio Messages',
                  desc: 'Record voice notes inline with waveform playback.',
                },
                {
                  icon: Receipt,
                  title: 'Live Tickets',
                  desc: 'Every transaction generates a receipt card on the spot.',
                },
                {
                  icon: Upload,
                  title: 'Proof of Payment',
                  desc: 'Upload MoMo / bank screenshots verified by AI.',
                },
                {
                  icon: CheckCheck,
                  title: 'Read Receipts',
                  desc: 'Know exactly when your vendor saw the message.',
                },
              ].map((f) => {
                const Icon = f.icon
                return (
                  <Glass key={f.title} radius="lg" padding="md" tilt tiltMax={5}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${theme.accent}15`,
                          border: `1px solid ${theme.accent}30`,
                        }}
                      >
                        <Icon size={16} style={{ color: theme.accent }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold mb-0.5" style={{ color: theme.textPrimary }}>
                          {f.title}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  </Glass>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Phone with chat stage */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
          <div ref={stageRef} style={{ perspective: '1400px' }}>
            <PhoneFrame width={320} height={660} tilt>
              <ChatStage />
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// ChatStage — the actual scripted chat view rendered inside the phone.
// =============================================================================

function ChatStage() {
  const { theme } = useTheme()

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${theme.surface}, ${theme.background})`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-8 pb-3 border-b"
        style={{ borderColor: theme.border }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
          style={{
            backgroundColor: `${theme.accent}15`,
            color: theme.accent,
            border: `1px solid ${theme.accent}30`,
          }}
        >
          K
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold" style={{ color: theme.textPrimary }}>
            KwameGold
          </div>
          <div className="text-[10px] flex items-center gap-1" style={{ color: theme.success }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
            Trade #1024 · Active
          </div>
        </div>
        <motion.div
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-mono font-bold" style={{ color: theme.accent }}>
            ⏱ 12:45
          </span>
        </motion.div>
      </div>

      {/* Messages stage */}
      <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2.5 relative">
        <div
          data-msg="0"
          className="self-center px-3 py-1 rounded-full text-[9px]"
          style={{ backgroundColor: `${theme.surface}b0`, color: theme.textMuted }}
        >
          Trade started · 100 USDC for GH₵ 1,144
        </div>

        {/* Vendor bubble */}
        <div
          data-msg="1"
          className="self-start max-w-[78%] px-3.5 py-2 rounded-2xl rounded-bl-md text-[11px] leading-relaxed"
          style={{
            backgroundColor: theme.card,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
          }}
        >
          Hey 👋 Send to MTN MoMo: <strong>024-xxx-1234</strong>. Name on file: Kwame A.
        </div>

        {/* typing indicator (under vendor) */}
        <div
          data-typing
          className="self-start flex items-center gap-1 px-3 py-2 rounded-2xl"
          style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: theme.textMuted }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </div>

        {/* User audio waveform message */}
        <div
          data-msg="2"
          className="self-end max-w-[80%] px-3 py-2.5 rounded-2xl rounded-br-md flex items-center gap-2"
          style={{
            backgroundColor: `${theme.accent}25`,
            border: `1px solid ${theme.accent}40`,
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.accent }}
          >
            <Play size={11} className="text-black" fill="currentColor" />
          </div>
          <div className="flex-1 flex items-center gap-[2px] h-7">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                data-bar
                className="flex-1 rounded-full"
                style={{
                  backgroundColor: theme.accent,
                  height: '70%',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono flex-shrink-0" style={{ color: theme.accent }}>
            0:08
          </span>
        </div>

        {/* progress fill (overlay under audio bubble) */}
        <div
          className="self-end -mt-2 h-[2px] rounded-full overflow-hidden"
          style={{ width: '70%', backgroundColor: `${theme.accent}20` }}
        >
          <div data-progress className="h-full" style={{ backgroundColor: theme.accent, width: 0 }} />
        </div>

        {/* Ticket card */}
        <div
          data-ticket
          className="self-center w-[90%] mt-1 rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
            border: `1px solid ${theme.accent}50`,
            boxShadow: `0 0 24px ${theme.accent}30`,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: `${theme.accent}30` }}>
            <Receipt size={12} style={{ color: theme.accent }} />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: theme.accent }}>
              Ticket Generated
            </span>
            <span className="ml-auto text-[9px]" style={{ color: theme.textMuted }}>
              #TX-88421
            </span>
          </div>
          <div className="px-3 py-2.5 grid grid-cols-3 gap-2">
            <div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>
                Amount
              </div>
              <div className="text-[11px] font-bold" style={{ color: theme.textPrimary }}>
                100 USDC
              </div>
            </div>
            <div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>
                Rate
              </div>
              <div className="text-[11px] font-bold" style={{ color: theme.accent }}>
                GH₵ 11.44
              </div>
            </div>
            <div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>
                Status
              </div>
              <div className="text-[11px] font-bold" style={{ color: theme.success }}>
                Open
              </div>
            </div>
          </div>
        </div>

        {/* User text reply */}
        <div
          data-msg="3"
          className="self-end max-w-[78%] px-3.5 py-2 rounded-2xl rounded-br-md text-[11px] leading-relaxed flex items-center gap-2"
          style={{
            backgroundColor: `${theme.accent}25`,
            border: `1px solid ${theme.accent}40`,
            color: theme.textPrimary,
          }}
        >
          <span>Sent. Uploading proof now…</span>
          <div className="flex gap-0.5">
            <CheckCheck data-receipt size={11} style={{ color: theme.accent }} />
          </div>
        </div>

        {/* Payment proof */}
        <div
          data-msg="4"
          className="self-end max-w-[78%] rounded-2xl rounded-br-md overflow-hidden"
          style={{
            backgroundColor: `${theme.success}10`,
            border: `1px solid ${theme.success}30`,
          }}
        >
          <div className="px-3 py-2 flex items-center gap-2">
            <Upload size={11} style={{ color: theme.success }} />
            <span className="text-[10px] font-bold" style={{ color: theme.success }}>
              Payment Proof Uploaded
            </span>
          </div>
          <div className="px-3 pb-2 text-[9px]" style={{ color: theme.textMuted }}>
            MoMo Receipt · TXN-88421 · Verified by AI
          </div>
        </div>
      </div>

      {/* Composer */}
      <div
        className="flex items-center gap-2 px-3 py-3 border-t"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <div
          className="flex-1 h-9 rounded-full px-4 flex items-center text-[11px]"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            color: theme.textMuted,
          }}
        >
          Type a message…
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: theme.accent }}
        >
          <Send size={14} style={{ color: theme.isDark ? '#000' : '#fff' }} />
        </div>
      </div>
    </div>
  )
}
