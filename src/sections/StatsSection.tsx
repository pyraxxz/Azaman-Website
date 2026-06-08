import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

function Counter({ target, prefix = '', suffix = '', decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    // Reduced-motion fallback: show the final figure immediately, no count-up.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2500, fps = 60
        const totalFrames = (duration / 1000) * fps
        let frame = 0
        const timer = setInterval(() => {
          frame++
          const progress = frame / totalFrames
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(target * eased)
          if (frame >= totalFrames) {
            setCount(target)
            clearInterval(timer)
          }
        }, 1000 / fps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()

  return (
    <div ref={ref}>
      <span
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
        style={{
          fontFamily: 'Space Grotesk',
          color: theme.textPrimary,
          textShadow: `0 0 24px ${theme.accent}40, 0 0 48px ${theme.accent}20`,
        }}
      >
        {prefix}{display}{suffix}
      </span>
    </div>
  )
}


const STATS = [
  { target: 2.4, prefix: '$', suffix: 'M', decimals: 1, label: 'Volume Potential', sub: 'Projected throughput at scale' },
  { target: 50000, prefix: '', suffix: '+', decimals: 0, label: 'Users Within Reach', sub: 'Across our expansion markets' },
  { target: 99.9, prefix: '', suffix: '%', decimals: 1, label: 'Target Uptime', sub: 'Enterprise-grade reliability' },
  { target: 0.3, prefix: '<', suffix: 's', decimals: 1, label: 'Settlement Speed', sub: 'Built for instant transfers' },
]

export default function StatsSection() {
  const { theme } = useTheme()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-40 overflow-hidden border-y"
      style={{ backgroundColor: theme.background, borderColor: theme.border }}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 800px 500px at 50% 50%, ${theme.glow}10 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.success}10`,
              border: `1px solid ${theme.success}30`,
              color: theme.success,
            }}
          >
            📈 Market Opportunity
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            The scale we're{' '}
            <span className="text-gradient-flow">building toward</span>
          </h2>
          <p
            className="max-w-2xl mx-auto mt-5 text-base lg:text-lg leading-relaxed"
            style={{ color: theme.textSecondary }}
          >
            Africa's digital economy is accelerating fast. These are the numbers Azaman is
            engineered to reach as we expand across the continent — our projected potential, not
            today's totals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              <div className="font-semibold mt-3 mb-1" style={{ color: theme.textPrimary }}>
                {stat.label}
              </div>
              <div className="text-sm" style={{ color: theme.textMuted }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
