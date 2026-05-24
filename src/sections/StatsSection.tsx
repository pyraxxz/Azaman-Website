import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
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
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
      {prefix}{display}{suffix}
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a15] to-[#050508]" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.03) 0%, transparent 50%)' }} />

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
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent">speak volumes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <Counter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              <div className="text-white font-medium mt-3 mb-1">{stat.label}</div>
              <div className="text-[#888] text-sm">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
