import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe, Sparkles, TrendingUp } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import { useTheme } from '@/contexts/ThemeContext'

function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const headlineWords = ['The', 'Future', 'of', 'P2P', 'Finance']

export default function HeroSection() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax scroll effects — three layers moving at different speeds
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const yFg = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <ParticleCanvas />

      {/* Layer 1 — slowest moving — large ambient orbs */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <div
          className="absolute"
          style={{
            top: '15%',
            left: '8%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '15%',
            right: '5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.accentSecondary}12 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.glow}10 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Layer 2 — mid speed — geometric shapes */}
      <motion.div
        style={{ y: yMid }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Rotating diamond */}
        <motion.div
          className="absolute"
          style={{
            top: '15%',
            right: '12%',
            width: 140,
            height: 140,
            border: `1px solid ${theme.accent}20`,
            borderRadius: 8,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        {/* Rotating ring */}
        <motion.div
          className="absolute"
          style={{
            bottom: '20%',
            left: '8%',
            width: 100,
            height: 100,
            border: `1px solid ${theme.accentSecondary}20`,
            borderRadius: '50%',
            borderTopColor: theme.accent,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {/* Hexagon */}
        <motion.svg
          className="absolute"
          style={{ top: '60%', right: '20%' }}
          width="60"
          height="60"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          <polygon
            points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5"
            fill="none"
            stroke={`${theme.glow}30`}
            strokeWidth="1"
          />
        </motion.svg>
      </motion.div>

      {/* Tech grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${theme.textPrimary}30 1px, transparent 1px), linear-gradient(90deg, ${theme.textPrimary}30 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Layer 3 — main content — moves up faster than scroll */}
      <motion.div
        style={{ y: yFg, opacity, scale }}
        className="relative z-[2] px-5 max-w-5xl text-center w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: theme.accent }}
              />
            </span>
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: theme.textMuted }}
            >
              Now Live in Ghana
            </span>
            <span style={{ color: theme.accent, fontSize: '10px' }}>·</span>
            <Sparkles size={10} style={{ color: theme.accent }} />
          </div>
        </motion.div>

        {/* Headline with staggered word animation */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[88px] font-bold leading-[0.95] tracking-[-0.03em] mb-7"
          style={{ fontFamily: 'Space Grotesk' }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              style={{
                color: word === 'Finance' ? theme.accent : theme.textPrimary,
                textShadow: word === 'Finance' ? `0 0 30px ${theme.accent}50` : undefined,
              }}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg lg:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed px-2"
          style={{ color: theme.textSecondary }}
        >
          Trade USDC instantly. Send money for free. Protect your wealth from currency
          devaluation. The most advanced P2P exchange built for Africa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#download"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold cursor-pointer"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#050508' : '#FFFFFF',
              boxShadow: `0 0 32px ${theme.accent}40, 0 8px 24px rgba(0,0,0,0.3)`,
            }}
          >
            Download the App
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#leaderboard"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold cursor-pointer transition-colors"
            style={{
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`,
              backgroundColor: `${theme.surface}80`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <TrendingUp size={18} />
            See Leaderboard
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 sm:mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } },
          }}
        >
          {[
            { icon: Shield, label: 'Act 1154 Compliant' },
            { icon: Zap, label: 'Instant Settlements' },
            { icon: Globe, label: 'Zero Gas Fees' },
          ].map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 text-sm"
              style={{ color: theme.textMuted }}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Icon size={16} style={{ color: theme.accent }} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: <AnimatedCounter target={50000} suffix="+" />, label: 'Users Onboarded' },
            { value: <AnimatedCounter target={2} suffix="M+" prefix="$" />, label: 'Volume Processed' },
            { value: <AnimatedCounter target={99} suffix="%" />, label: 'Uptime' },
            { value: <AnimatedCounter target={11} />, label: 'Themes' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  fontFamily: 'Space Grotesk',
                  color: theme.textPrimary,
                  textShadow: `0 0 20px ${theme.accent}30`,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs uppercase tracking-wider"
                style={{ color: theme.textMuted }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
          style={{ border: `2px solid ${theme.border}` }}
        >
          <div
            className="w-1.5 h-3 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
      </motion.div>
    </section>
  )
}
