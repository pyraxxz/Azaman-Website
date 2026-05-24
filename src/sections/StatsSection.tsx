import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RevealOnScroll } from '@/components/ScrollAnimations'

function Counter({ target, prefix = '', suffix = '', decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2500
          const fps = 60
          const totalFrames = (duration / 1000) * fps
          let frame = 0
          const timer = setInterval(() => {
            frame++
            const progress = frame / totalFrames
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            setCount(current)
            if (frame >= totalFrames) {
              setCount(target)
              clearInterval(timer)
            }
          }, 1000 / fps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()

  return (
    <div ref={ref}>
      <span
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
        style={{
          fontFamily: 'Space Grotesk',
          textShadow: '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
        }}
      >
        {prefix}{display}{suffix}
      </span>
    </div>
  )
}

const STATS = [
  { target: 2.4, prefix: '$', suffix: 'M', decimals: 1, label: 'Volume Processed', sublabel: 'Total platform throughput' },
  { target: 50000, prefix: '', suffix: '+', decimals: 0, label: 'Users Registered', sublabel: 'And growing every day' },
  { target: 99.9, prefix: '', suffix: '%', decimals: 1, label: 'Platform Uptime', sublabel: 'Enterprise reliability' },
  { target: 0.3, prefix: '<', suffix: 's', decimals: 1, label: 'Settlement Time', sublabel: 'Internal transfers' },
]

export default function StatsSection() {
  return (
    <section className="relative py-24 lg:py-32 border-y border-white/5">
      {/* Background: noise texture + subtle single ambient glow */}
      <div className="absolute inset-0 bg-[#050508]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#00ff88] uppercase tracking-[0.2em] mb-4 block">Platform Metrics</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            Numbers that{' '}
            <span className="text-[#D4AF37]">speak volumes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={i} direction="up" delay={i * 0.15}>
              <div className="text-center">
                <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                <div className="text-white font-medium mt-3 mb-1">{stat.label}</div>
                <div className="text-[#888] text-sm">{stat.sublabel}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
