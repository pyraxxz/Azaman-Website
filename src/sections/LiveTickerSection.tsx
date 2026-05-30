// =============================================================================
// LIVE MARKET TICKER — Two-row infinite marquee
// Row 1: Crypto rates in Glass mini-cards
// Row 2: Recent trades (sold=danger, bought=success, >500 USDC = 🔥)
// Edge fade mask. LIVE badge with pulsing green dot.
// =============================================================================

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'

interface CryptoRate {
  symbol: string
  pair: string
  price: number
  change: number
}

const INITIAL_RATES: CryptoRate[] = [
  { symbol: 'USDC', pair: 'USDC/GHS', price: 11.44, change: 0.32 },
  { symbol: 'USDT', pair: 'USDT/GHS', price: 11.42, change: 0.28 },
  { symbol: 'BTC', pair: 'BTC/GHS', price: 1_142_500, change: 2.41 },
  { symbol: 'ETH', pair: 'ETH/GHS', price: 38_240, change: -1.12 },
  { symbol: 'SOL', pair: 'SOL/GHS', price: 1_840, change: 3.87 },
  { symbol: 'GHS', pair: 'GHS/USD', price: 0.087, change: -0.45 },
  { symbol: 'NGN', pair: 'NGN/USD', price: 0.00062, change: -0.18 },
  { symbol: 'KES', pair: 'KES/USD', price: 0.0077, change: 0.12 },
]

interface Trade {
  vendor: string
  amount: number
  type: 'sold' | 'bought'
  method: string
}

const TRADES: Trade[] = [
  { vendor: 'KwameGold', amount: 500, type: 'sold', method: 'Bank' },
  { vendor: 'AkosuaSwap', amount: 120, type: 'bought', method: 'MoMo' },
  { vendor: 'KofiBarter', amount: 750, type: 'sold', method: 'CashApp' },
  { vendor: 'AmaCrypto', amount: 230, type: 'bought', method: 'Bank' },
  { vendor: 'NanaTrades', amount: 1000, type: 'sold', method: 'MoMo' },
  { vendor: 'YawCash', amount: 85, type: 'bought', method: 'MoMo' },
  { vendor: 'AbenaP2P', amount: 420, type: 'sold', method: 'Bank' },
  { vendor: 'KojoExchange', amount: 600, type: 'bought', method: 'CashApp' },
]

export default function LiveTickerSection() {
  const { theme } = useTheme()
  const [rates, setRates] = useState(INITIAL_RATES)

  // Drift rates every 3s to feel live
  useEffect(() => {
    const interval = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const drift = (Math.random() - 0.5) * 0.02
          const newChange = r.change + drift * 10
          const newPrice = r.price * (1 + drift / 100)
          return { ...r, price: Math.max(0.001, newPrice), change: parseFloat(newChange.toFixed(2)) }
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
      id="ticker"
      className="relative py-10 lg:py-14 overflow-hidden"
      style={{ backgroundColor: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}
    >
      {/* LIVE badge — top right */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-1.5">
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: theme.success }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: theme.success }}
        >
          LIVE
        </span>
      </div>

      {/* Row 1: Rates marquee */}
      <div className="relative overflow-hidden ticker-mask mb-4">
        <div className="flex marquee-track gap-4 whitespace-nowrap">
          {[...rates, ...rates].map((rate, i) => {
            const up = rate.change >= 0
            return (
              <div key={`${rate.symbol}-${i}`} className="flex-shrink-0">
                <Glass radius="md" padding="none" mouseGlow={false}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
                    >
                      {rate.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-[11px] font-medium" style={{ color: theme.textMuted }}>
                        {rate.pair}
                      </div>
                      <div
                        className="text-base font-bold"
                        style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}
                      >
                        {formatPrice(rate.price)}
                      </div>
                    </div>
                    <div
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        color: up ? theme.success : theme.danger,
                        backgroundColor: up ? `${theme.success}12` : `${theme.danger}12`,
                      }}
                    >
                      {up ? '+' : ''}{rate.change.toFixed(2)}%
                    </div>
                  </div>
                </Glass>
              </div>
            )
          })}
        </div>
      </div>

      {/* Row 2: Trades marquee (reverse direction) */}
      <div className="relative overflow-hidden ticker-mask">
        <div className="flex marquee-track-reverse gap-4 whitespace-nowrap">
          {[...TRADES, ...TRADES, ...TRADES].map((trade, i) => {
            const isSold = trade.type === 'sold'
            const isLarge = trade.amount >= 500
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-shrink-0 text-xs"
                style={{
                  backgroundColor: isSold ? `${theme.danger}08` : `${theme.success}08`,
                  border: `1px solid ${isSold ? theme.danger : theme.success}20`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: isSold ? theme.danger : theme.success }}
                />
                <span className="font-bold" style={{ color: theme.textPrimary }}>
                  {trade.vendor}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: isSold ? theme.danger : theme.success }}
                >
                  {trade.type}
                </span>
                <span className="font-semibold" style={{ color: theme.accent }}>
                  {isLarge ? '🔥 ' : ''}{trade.amount} USDC
                </span>
                <span style={{ color: theme.textMuted }}>· {trade.method}</span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .ticker-mask {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  )
}
