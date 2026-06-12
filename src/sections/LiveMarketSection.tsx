// =============================================================================
// LiveMarketSection - a living P2P trading terminal.
// Left: vendor order book with live-updating rates + a recent-trades feed.
// Right: market stats (count-up) + a 7-day rate chart (recharts).
// =============================================================================

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, CheckCircle2, ArrowRight } from 'lucide-react'
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import Glass from '@/components/Glass'
import AmbientOrbs from '@/components/AmbientOrbs'
import { useTheme } from '@/contexts/ThemeContext'

// Payment-brand constants (brand-neutral, same convention as the hero rails).
const METHOD_COLORS: Record<string, string> = {
  CashApp: '#00D54B',
  Zelle: '#6D1ED4',
  Venmo: '#3D95CE',
  Wise: '#9FE870',
  Bank: '#0088FF',
}

interface Vendor {
  id: string
  name: string
  initials: string
  rate: number
  method: string
  trades: number
  completion: number
}

// --- Count-up number (mirrors StatsSection's Counter logic) -------------------
function Counter({ target, prefix = '', suffix = '', decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
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

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString('en-US')

  return (
    <div ref={ref}>
      <span className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>
        {prefix}{display}{suffix}
      </span>
    </div>
  )
}

interface RecentTrade {
  id: number
  vendor: string
  user: string
  amount: number
  seconds: number
}

export default function LiveMarketSection() {
  const { theme } = useTheme()

  const VENDOR_DATA = useMemo<Vendor[]>(() => [
    { id: '1', name: 'KwameGold', initials: 'KG', rate: 11.44, method: 'CashApp', trades: 1248, completion: 99.2 },
    { id: '2', name: 'AkosuaSwap', initials: 'AS', rate: 11.52, method: 'Zelle', trades: 892, completion: 98.7 },
    { id: '3', name: 'AmaCrypto', initials: 'AM', rate: 11.46, method: 'Venmo', trades: 612, completion: 97.4 },
    { id: '4', name: 'KojoFX', initials: 'KF', rate: 11.55, method: 'Wise', trades: 547, completion: 96.8 },
  ], [])

  const [rates, setRates] = useState<number[]>(() => VENDOR_DATA.map((v) => v.rate))
  const [flashes, setFlashes] = useState<Array<'up' | 'down' | null>>(() => VENDOR_DATA.map(() => null))

  // Live rate ticker - random vendor, random nudge, flash the cell.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const idx = Math.floor(Math.random() * VENDOR_DATA.length)
      const delta = (Math.floor(Math.random() * 3) + 1) * 0.01
      const dir = Math.random() > 0.5 ? 1 : -1
      setRates((prev) => {
        const next = [...prev]
        next[idx] = +(next[idx] + dir * delta).toFixed(2)
        return next
      })
      setFlashes((prev) => {
        const next = [...prev]
        next[idx] = dir > 0 ? 'up' : 'down'
        return next
      })
      window.setTimeout(() => {
        setFlashes((prev) => {
          const next = [...prev]
          next[idx] = null
          return next
        })
      }, 800)
      timer = setTimeout(tick, 5000 + Math.random() * 4000)
    }
    timer = setTimeout(tick, 5000 + Math.random() * 4000)
    return () => clearTimeout(timer)
  }, [VENDOR_DATA])

  // Recent trades feed.
  const tradeId = useRef(100)
  const [trades, setTrades] = useState<RecentTrade[]>(() => [
    { id: 1, vendor: 'KwameGold', user: '482', amount: 200, seconds: 4 },
    { id: 2, vendor: 'AkosuaSwap', user: '117', amount: 540, seconds: 12 },
    { id: 3, vendor: 'NanaTrades', user: '903', amount: 75, seconds: 21 },
    { id: 4, vendor: 'KojoFX', user: '256', amount: 1200, seconds: 38 },
  ])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: ReturnType<typeof setTimeout>
    const names = VENDOR_DATA.map((v) => v.name)
    const amounts = [50, 75, 120, 200, 340, 500, 720, 1000, 1200]
    const add = () => {
      const next: RecentTrade = {
        id: ++tradeId.current,
        vendor: names[Math.floor(Math.random() * names.length)],
        user: String(Math.floor(100 + Math.random() * 900)),
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        seconds: 1 + Math.floor(Math.random() * 3),
      }
      setTrades((prev) => [next, ...prev].slice(0, 4))
      timer = setTimeout(add, 8000 + Math.random() * 7000)
    }
    timer = setTimeout(add, 8000 + Math.random() * 7000)
    return () => clearTimeout(timer)
  }, [VENDOR_DATA])

  // 7-day rate history (seeded, static).
  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const seed = [11.39, 11.44, 11.41, 11.5, 11.47, 11.55, 11.52]
    return days.map((d, i) => ({ day: d, rate: seed[i] }))
  }, [])

  const ChartTooltip = ({ active, payload, label }: {
    active?: boolean
    payload?: Array<{ value?: number }>
    label?: string
  }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '6px 10px' }}>
        <div style={{ fontSize: 10, color: theme.textMuted }}>{label}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
          {payload[0].value} GH₵
        </div>
      </div>
    )
  }

  return (
    <section
      id="live-market"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={3} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 900px 600px at 50% 50%, ${theme.glow}1A, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
          >
            <Activity size={12} />
            ● Live P2P Market
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            The Market.{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow">Always moving.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-5" style={{ color: theme.textSecondary }}>
            Powered by real vendors. Settled in real seconds.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Order book */}
          <div className="w-full lg:w-3/5">
            <Glass radius="2xl" padding="none" elevated mouseGlow>
              {/* Tabs + live indicator */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-5">
                  <span className="text-sm font-semibold pb-1" style={{ color: theme.textPrimary, borderBottom: `2px solid ${theme.accent}` }}>
                    BUY ADS
                  </span>
                  <span className="text-sm pb-1" style={{ color: theme.textMuted }}>
                    SELL ADS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: theme.success }}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.success }}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Live
                </div>
              </div>

              {/* Table header */}
              <div
                className="flex items-center px-4 sm:px-6 py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.12em]"
                style={{ borderBottom: `1px solid ${theme.border}`, color: theme.textMuted }}
              >
                <span style={{ width: '36%' }}>Vendor</span>
                <span style={{ width: '18%' }}>Rate</span>
                <span style={{ width: '16%' }}>Method</span>
                <span className="hidden sm:block" style={{ width: '12%' }}>Trades</span>
                <span style={{ width: '18%' }}>Action</span>
              </div>

              {/* Rows */}
              {VENDOR_DATA.map((v, i) => {
                const methodColor = METHOD_COLORS[v.method] ?? theme.accent
                const flash = flashes[i]
                const rateColor = flash === 'up' ? theme.success : flash === 'down' ? theme.danger : theme.textPrimary
                return (
                  <div
                    key={v.id}
                    className="flex items-center px-4 sm:px-6 py-4 transition-colors duration-150"
                    style={{ borderBottom: `1px solid ${theme.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${theme.card}80`)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div className="flex items-center gap-2 min-w-0" style={{ width: '36%' }}>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
                      >
                        {v.initials}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold flex items-center gap-1 min-w-0" style={{ color: theme.textPrimary }}>
                        <span className="whitespace-nowrap">{v.name}</span>
                        <CheckCircle2 size={11} style={{ color: theme.success, flexShrink: 0 }} />
                      </span>
                    </div>
                    <span
                      className="text-xs sm:text-sm font-medium"
                      style={{ width: '18%', fontFamily: 'JetBrains Mono', color: rateColor, transition: 'color 0.2s ease' }}
                    >
                      {rates[i].toFixed(2)}
                    </span>
                    <span style={{ width: '16%' }}>
                      <span
                        className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 whitespace-nowrap"
                        style={{ backgroundColor: `${methodColor}20`, border: `1px solid ${methodColor}40`, color: methodColor, borderRadius: 12 }}
                      >
                        {v.method}
                      </span>
                    </span>
                    <span className="hidden sm:block text-sm" style={{ width: '12%', color: theme.textMuted }}>
                      {v.trades.toLocaleString('en-US')} ✓
                    </span>
                    <span style={{ width: '18%' }}>
                      <button
                        className="text-xs font-semibold px-3 sm:px-4 py-1.5 transition-colors duration-150"
                        style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}40`, color: theme.accent, borderRadius: 12 }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${theme.accent}30`)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${theme.accent}15`)}
                        data-cursor="hover"
                      >
                        Buy
                      </button>
                    </span>
                  </div>
                )
              })}

              {/* Recent trades feed */}
              <div className="px-6 pb-4">
                {trades.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-[11px] py-2"
                    style={{ color: theme.textMuted, borderTop: `1px solid ${theme.border}`, fontFamily: 'Inter' }}
                  >
                    <span style={{ color: theme.success }}>✓</span>
                    {'  '}{t.vendor} → @user_{t.user}{'  '}{t.amount} USDC{'  '}{t.seconds}s ago
                  </motion.div>
                ))}
              </div>
            </Glass>
          </div>

          {/* RIGHT: Market stats */}
          <div className="w-full lg:w-2/5">
            <Glass radius="2xl" padding="lg" elevated mouseGlow>
              {/* Block 1 */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>24H Volume</div>
                <div className="flex items-center gap-3 mt-1">
                  <Counter target={2841400} prefix="GH₵ " />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, color: theme.success }}>
                    +4.2%
                  </span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${theme.border}` }} className="my-4" />

              {/* Block 2 */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>Active Vendors</div>
                <div className="flex items-center gap-3 mt-1">
                  <Counter target={247} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${theme.success}15`, color: theme.success }}>
                    ↑ 12 new today
                  </span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${theme.border}` }} className="my-4" />

              {/* Block 3 */}
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>Avg Settlement</div>
                <div className="flex items-center gap-3 mt-1">
                  <Counter target={4.8} suffix="s" decimals={1} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${theme.warning}15`, color: theme.warning }}>
                    ⚡ fastest on continent
                  </span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${theme.border}` }} className="my-4" />

              {/* Mini chart */}
              <div className="text-xs mb-2" style={{ color: theme.textMuted }}>Rate History (7d)</div>
              <div style={{ width: '100%', height: 120 }} aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="lm-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={theme.accent} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={theme.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={theme.border} strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fill: theme.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[11.3, 11.6]} tick={{ fill: theme.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} width={44} />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: theme.border }} />
                    <Area type="monotone" dataKey="rate" stroke={theme.accent} strokeWidth={2} fill="url(#lm-area)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Vendor link */}
              <Link
                to="/vendors"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: theme.accent }}
                data-cursor="hover"
              >
                Join as a vendor
                <ArrowRight size={14} />
              </Link>
            </Glass>
          </div>
        </div>
      </div>
    </section>
  )
}
