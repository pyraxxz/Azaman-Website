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

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
      <ParticleCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050508]/60 via-transparent to-[#050508]" />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(0,212,255,0.06) 0%, transparent 60%)' }} />

      {/* Main content */}
      <div className="relative z-[2] px-5 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-xs font-medium text-[#aaa] uppercase tracking-wider">Now Live in Ghana</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[88px] font-bold leading-[0.92] tracking-[-0.03em] mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="block text-white">The Future of</span>
            <span className="block bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#ffd700] bg-clip-text text-transparent">
              P2P Finance
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-2xl text-[#999] font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Trade USDC instantly. Send money for free. Protect your wealth from currency devaluation. The most advanced P2P exchange built for Africa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.a
              href="#download"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                const el = document.getElementById('download')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-black bg-gradient-to-r from-[#00d4ff] to-[#00ff88] shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-shadow hover:shadow-[0_0_60px_rgba(0,212,255,0.5)] cursor-pointer"
            >
              Download the App
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#investors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                const el = document.getElementById('investors')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#ffd700]/40 hover:bg-[#ffd700]/5 transition-all cursor-pointer"
            >
              Investor Deck
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 sm:mb-16"
        >
          {[
            { icon: Shield, label: 'Act 1154 Compliant' },
            { icon: Zap, label: 'Instant Settlements' },
            { icon: Globe, label: 'Zero Gas Fees' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-[#888]">
              <Icon size={16} className="text-[#00d4ff]" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#444] flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-[#00d4ff] animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
