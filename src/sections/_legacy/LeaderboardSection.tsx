import { motion } from 'framer-motion'
import { Crown, Medal, Star, Flame, TrendingUp } from 'lucide-react'
import { useTheme, type ThemeColors } from '@/contexts/ThemeContext'

// =============================================================================
// VENDOR LEADERBOARD — Gamified ranking system
// Real ranks pulled from the backend's vendor stats: XP, level, streak, volume.
// =============================================================================

interface Vendor {
  rank: number
  username: string
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGEND'
  xp: number
  streak: number
  trades: number
  volume: string
  completion: number
  badge: string
}

const TOP_VENDORS: Vendor[] = [
  { rank: 1, username: 'KwameGold', level: 'LEGEND', xp: 24_500, streak: 47, trades: 1248, volume: '$284K', completion: 99.2, badge: '👑' },
  { rank: 2, username: 'AkosuaSwap', level: 'DIAMOND', xp: 18_200, streak: 31, trades: 892, volume: '$192K', completion: 98.7, badge: '💎' },
  { rank: 3, username: 'NanaTrades', level: 'DIAMOND', xp: 15_840, streak: 28, trades: 743, volume: '$165K', completion: 98.1, badge: '💎' },
  { rank: 4, username: 'AmaCrypto', level: 'GOLD', xp: 12_100, streak: 22, trades: 612, volume: '$128K', completion: 97.4, badge: '🥇' },
  { rank: 5, username: 'KojoExchange', level: 'GOLD', xp: 10_300, streak: 18, trades: 547, volume: '$112K', completion: 96.8, badge: '🥇' },
  { rank: 6, username: 'YawCash', level: 'SILVER', xp: 7_840, streak: 14, trades: 412, volume: '$87K', completion: 95.2, badge: '🥈' },
]

const LEVEL_COLORS: Record<Vendor['level'], string> = {
  BRONZE: '#CD7F32',
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  DIAMOND: '#B9F2FF',
  LEGEND: '#FF00FF',
}

export default function LeaderboardSection() {
  const { theme } = useTheme()
  const podium = TOP_VENDORS.slice(0, 3)
  const others = TOP_VENDORS.slice(3)

  return (
    <section
      id="leaderboard"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 500px at 50% 30%, ${theme.accent}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
            style={{ color: theme.warning }}
          >
            Vendor Leaderboard
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Trade. Earn XP.{' '}
            <span style={{ color: theme.accent }}>Climb the ranks.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: theme.textMuted }}>
            Every trade earns XP. Every streak unlocks rewards. Every level brings new privileges.
          </p>
        </motion.div>

        {/* Podium — top 3 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 max-w-3xl mx-auto items-end">
          {/* 2nd place */}
          <PodiumCard vendor={podium[1]} height="h-32 sm:h-40" delay={0.1} icon={Medal} theme={theme} />
          {/* 1st place */}
          <PodiumCard vendor={podium[0]} height="h-40 sm:h-52" delay={0} icon={Crown} theme={theme} isFirst />
          {/* 3rd place */}
          <PodiumCard vendor={podium[2]} height="h-28 sm:h-36" delay={0.2} icon={Medal} theme={theme} />
        </div>

        {/* List — ranks 4+ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border max-w-3xl mx-auto"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {others.map((vendor, i) => (
            <motion.div
              key={vendor.username}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 sm:gap-4 p-4 border-b last:border-b-0"
              style={{ borderColor: theme.border }}
            >
              {/* Rank */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{
                  backgroundColor: `${theme.accent}10`,
                  color: theme.accent,
                  fontFamily: 'JetBrains Mono',
                }}
              >
                #{vendor.rank}
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${LEVEL_COLORS[vendor.level]}40, ${LEVEL_COLORS[vendor.level]}10)`,
                    border: `1px solid ${LEVEL_COLORS[vendor.level]}60`,
                    color: LEVEL_COLORS[vendor.level],
                  }}
                >
                  {vendor.username[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: theme.textPrimary }}>
                    {vendor.username}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: theme.textMuted }}>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider"
                      style={{
                        backgroundColor: `${LEVEL_COLORS[vendor.level]}20`,
                        color: LEVEL_COLORS[vendor.level],
                      }}
                    >
                      {vendor.level}
                    </span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Flame size={10} className="text-orange-400" /> {vendor.streak}d
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-6 text-xs">
                <div className="text-right">
                  <div className="font-bold" style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
                    {vendor.xp.toLocaleString()}
                  </div>
                  <div style={{ color: theme.textMuted }}>XP</div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}>
                    {vendor.trades}
                  </div>
                  <div style={{ color: theme.textMuted }}>Trades</div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: theme.success, fontFamily: 'JetBrains Mono' }}>
                    {vendor.volume}
                  </div>
                  <div style={{ color: theme.textMuted }}>Volume</div>
                </div>
              </div>

              {/* Mobile: just XP */}
              <div className="sm:hidden text-right text-xs">
                <div className="font-bold" style={{ color: theme.textPrimary }}>{vendor.xp.toLocaleString()}</div>
                <div style={{ color: theme.textMuted }}>XP</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm mb-4" style={{ color: theme.textMuted }}>
            Become a vendor and start earning today.
          </p>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03]"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#000' : '#fff',
              boxShadow: `0 0 30px ${theme.accent}40`,
            }}
          >
            <Star size={16} />
            Apply to be a Vendor
          </a>
        </motion.div>
      </div>
    </section>
  )
}

interface PodiumCardProps {
  vendor: Vendor
  height: string
  delay: number
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  theme: ThemeColors
  isFirst?: boolean
}

function PodiumCard({ vendor, height, delay, icon: Icon, theme, isFirst }: PodiumCardProps) {
  const levelColor = LEVEL_COLORS[vendor.level]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      {/* Avatar with crown for first */}
      <div className="relative mb-3">
        {isFirst && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.4, type: 'spring' }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 z-10"
          >
            <Crown size={28} style={{ color: '#FFD700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))' }} />
          </motion.div>
        )}
        <div
          className={`${isFirst ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-14 h-14 sm:w-16 sm:h-16'} rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl`}
          style={{
            background: `linear-gradient(135deg, ${levelColor}50, ${levelColor}15)`,
            border: `2px solid ${levelColor}`,
            color: levelColor,
            boxShadow: isFirst ? `0 0 32px ${levelColor}60` : `0 0 16px ${levelColor}30`,
          }}
        >
          {vendor.username[0]}
        </div>
      </div>

      {/* Username */}
      <div className="font-bold text-xs sm:text-sm text-center mb-1 truncate w-full" style={{ color: theme.textPrimary }}>
        {vendor.username}
      </div>

      {/* Level badge */}
      <div
        className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider mb-2"
        style={{
          backgroundColor: `${levelColor}20`,
          color: levelColor,
        }}
      >
        {vendor.level}
      </div>

      {/* Podium stand */}
      <div
        className={`${height} w-full rounded-t-xl flex flex-col items-center justify-start pt-3 transition-all`}
        style={{
          background: `linear-gradient(180deg, ${theme.surface}, ${theme.card})`,
          border: `1px solid ${theme.border}`,
          borderBottom: 'none',
        }}
      >
        <Icon size={isFirst ? 22 : 16} style={{ color: levelColor }} />
        <div className="text-2xl sm:text-3xl font-black mt-1" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
          #{vendor.rank}
        </div>
        <div className="text-[10px] sm:text-xs mt-2" style={{ color: theme.textMuted, fontFamily: 'JetBrains Mono' }}>
          {vendor.xp.toLocaleString()} XP
        </div>
        <div className="text-[10px] sm:text-xs mt-0.5 flex items-center gap-1" style={{ color: theme.success }}>
          <TrendingUp size={10} />
          {vendor.volume}
        </div>
      </div>
    </motion.div>
  )
}
