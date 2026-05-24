import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
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
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden"
      style={{ backgroundColor: '#050508' }}
    >
      <ParticleCanvas />

      {/* Noise grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle tech grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating geometric shape - rotating diamond */}
      <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '18%',
          right: '12%',
          width: 120,
          height: 120,
          border: '1px solid rgba(212, 175, 55, 0.12)',
          borderRadius: 4,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Second floating shape - smaller hexagon-like */}
      <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{
          bottom: '22%',
          left: '8%',
          width: 80,
          height: 80,
          border: '1px solid rgba(0, 212, 255, 0.08)',
          borderRadius: 4,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle radial ambient light - not a gradient overlay, just a soft glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 35%, rgba(212,175,55,0.03) 0%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-[2] px-5 max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-medium text-[#888] uppercase tracking-wider">Now Live in Ghana</span>
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
              className={`inline-block mr-[0.25em] ${word === 'Finance' ? 'text-[#D4AF37]' : 'text-white'}`}
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
          className="text-base sm:text-lg lg:text-2xl text-[#999] font-light max-w-2xl mx-auto mb-10 leading-relaxed px-2"
        >
          Trade USDC instantly. Send money for free. Protect your wealth from currency devaluation. The most advanced P2P exchange built for Africa.
        </motion.p>

        {/* CTAs - solid colors, no gradients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#download"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              const el = document.getElementById('download')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-[#050508] cursor-pointer transition-shadow duration-300"
            style={{
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 32px rgba(212, 175, 55, 0.25), 0 4px 16px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(212, 175, 55, 0.4), 0 4px 24px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(212, 175, 55, 0.25), 0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            Download the App
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#investors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              const el = document.getElementById('investors')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer"
            style={{
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            Investor Deck
            <ArrowRight size={18} />
          </motion.a>
        </motion.div>

        {/* Trust badges with staggered fade-in */}
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
              className="flex items-center gap-2 text-sm text-[#888]"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Icon size={16} className="text-[#00d4ff]" />
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
            { value: <AnimatedCounter target={11} />, label: 'Immersive Themes' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#888] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#333] flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-[#D4AF37]" />
        </div>
      </motion.div>
    </section>
  )
}
