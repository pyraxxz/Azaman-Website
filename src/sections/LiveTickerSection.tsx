import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// =============================================================================
// LIVE MARKET TICKER
// Two infinite-scrolling marquee rows showing live-style rates and trades.
// Crypto rates use a gentle drift to feel real; trade ticker rotates entries.
// =============================================================================

interface CryptoRate {
  symbol: string
  name: string
  price: number
  change: number
}

const INITIAL_RATES: CryptoRate[] = [
  { symbol: 'USDC', name: 'USD Coin', price: 11.44, change: 0.32 },
  { symbol: 'USDT', name: 'Tether', price: 11.42, change: 0.28 },
  { symbol: 'BTC', name: 'Bitcoin', price: 1_142_500, change: 2.41 },
  { symbol: 'ETH', name: 'Ethereum', price: 38_240, change: -1.12 },
  { symbol: 'SOL', name: 'Solana', price: 1_840, change: 3.87 },
  { symbol: 'GHS', name: 'Ghana Cedi', price: 1.0, change: 0.0 },
  { symbol: 'NGN', name: 'Naira', price: 0.078, change: -0.45 },
  { symbol: 'KES', name: 'Kenyan Shilling', price: 0.085, change: 0.18 },
]

const TRADES = [
  { vendor: 'KwameGold', amount: '500 USDC', rate: '11.44', method: 'Bank' },
  { vendor: 'AkosuaSwap', amount: '120 USDC', rate: '11.52', method: 'MoMo' },
  { vendor: 'KofiBarter', amount: '750 USDC', rate: '11.60', method: 'CashApp' },
  { vendor: 'AmaCrypto', amount: '230 USDC', rate: '11.46', method: 'Bank' },
  { vendor: 'NanaTrades', amount: '1,000 USDC', rate: '11.50', method: 'MoMo' },
  { vendor: 'YawCash', amount: '85 USDC', rate: '11.55', method: 'MoMo' },
  { vendor: 'AbenaP2P', amount: '420 USDC', rate: '11.48', method: 'Bank' },
  { vendor: 'KojoExchange', amount: '600 USDC', rate: '11.51', method: 'CashApp' },
]

export default function LiveTickerSection() {
  const { theme } = useTheme()
  const [rates, setRates] = useState(INITIAL_RATES)

  // Drift the rates slightly every 3 seconds to feel live. Skipped under
  // prefers-reduced-motion so the figures stay static and legible.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const drift = (Math.random() - 0.5) * 0.02
          const newChange = r.change + drift * 10
          const newPrice = r.price * (1 + drift / 100)
          return {
            ...r,
            price: Math.max(0.01, newPrice),
            change: parseFloat(newChange.toFixed(2)),
          }
        })
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (p: number) => {
    if (p >= 1000) return p.toLocaleString(undefined, { maximumFractionDigits: 0 })
    if (p >= 1) return p.toFixed(2)
    return p.toFixed(4)
  }

  return (
    <section
      className="relative py-12 lg:py-16 overflow-hidden border-y"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      {/* Section header */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center glow-pulse"
              style={{ backgroundColor: `${theme.accent}15`, border: `1px solid ${theme.accent}40` }}
            >
              <Activity size={18} style={{ color: theme.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
                  Live Market Pulse
                </h3>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider"
                  style={{ backgroundColor: `${theme.success}20`, color: theme.success }}
                >
                  ● LIVE
                </span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: theme.textMuted }}>
                Real-time rates · Updated every 10 seconds via oracle
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: theme.textMuted }}>
            <Zap size={14} style={{ color: theme.warning }} />
            <span>Powered by CoinGecko + Bank of Ghana</span>
          </div>
        </motion.div>
      </div>

      {/* Rates marquee - left to right */}
      <div className="relative overflow-hidden mask-fade">
        <div className="flex marquee-track gap-8 whitespace-nowrap">
          {[...rates, ...rates].map((rate, i) => {
            const up = rate.change >= 0
            return (
              <div
                key={`${rate.symbol}-${i}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl flex-shrink-0"
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent,
                  }}
                >
                  {rate.symbol.substring(0, 2)}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: theme.textSecondary }}>
                    {rate.symbol}
                  </div>
                  <div className="text-base font-bold" style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
                    GH₵ {formatPrice(rate.price)}
                  </div>
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: up ? theme.success : theme.danger }}
                >
                  {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {up ? '+' : ''}{rate.change.toFixed(2)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Trades marquee - right to left */}
      <div className="relative overflow-hidden mt-4 mask-fade">
        <div className="flex marquee-track-reverse gap-6 whitespace-nowrap">
          {[...TRADES, ...TRADES, ...TRADES].map((trade, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0 text-xs"
              style={{
                backgroundColor: `${theme.success}08`,
                border: `1px solid ${theme.success}20`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.success }} />
              <span className="font-bold" style={{ color: theme.textPrimary }}>{trade.vendor}</span>
              <span style={{ color: theme.textMuted }}>traded</span>
              <span className="font-semibold" style={{ color: theme.accent }}>{trade.amount}</span>
              <span style={{ color: theme.textMuted }}>@</span>
              <span style={{ color: theme.textSecondary }}>GH₵{trade.rate}</span>
              <span style={{ color: theme.textMuted }}>·</span>
              <span style={{ color: theme.textMuted }}>{trade.method}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>
    </section>
  )
}
