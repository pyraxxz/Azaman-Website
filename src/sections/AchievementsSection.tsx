import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy, Flame, Star, Zap, Crown, Shield, Rocket, Heart,
  Users, Sparkles, Award, Target, Coins, Gem,
} from 'lucide-react'
import { useTheme, type ThemeColors } from '@/contexts/ThemeContext'

// =============================================================================
// ACHIEVEMENTS SHOWCASE
// Mirrors the backend's vendorGamificationService.ACHIEVEMENT_DEFINITIONS.
// Each card animates and unlocks visually as the user hovers.
// =============================================================================

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xp: number
  progress: number  // 0-100
  unlocked: boolean
}

const RARITY_COLORS: Record<Achievement['rarity'], string> = {
  common: '#9CA3AF',
  rare: '#60A5FA',
  epic: '#C084FC',
  legendary: '#FDE047',
}

const RARITY_GLOWS: Record<Achievement['rarity'], string> = {
  common: 'rgba(156,163,175,0.2)',
  rare: 'rgba(96,165,250,0.4)',
  epic: 'rgba(192,132,252,0.5)',
  legendary: 'rgba(253,224,71,0.7)',
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-trade', title: 'First Steps', description: 'Complete your first P2P trade', icon: Rocket, rarity: 'common', xp: 50, progress: 100, unlocked: true },
  { id: 'streak-7', title: 'On Fire', description: 'Trade 7 days in a row', icon: Flame, rarity: 'rare', xp: 200, progress: 100, unlocked: true },
  { id: 'volume-1k', title: 'Liquidity Provider', description: 'Hit $1,000 in trade volume', icon: Coins, rarity: 'rare', xp: 250, progress: 100, unlocked: true },
  { id: 'kyc', title: 'Verified Identity', description: 'Complete KYC verification', icon: Shield, rarity: 'common', xp: 100, progress: 100, unlocked: true },
  { id: 'completion-50', title: 'Reliable Trader', description: '50 successful trades, 95%+ completion', icon: Award, rarity: 'epic', xp: 500, progress: 86, unlocked: false },
  { id: 'streak-30', title: 'Unbreakable', description: '30-day trading streak', icon: Zap, rarity: 'epic', xp: 750, progress: 64, unlocked: false },
  { id: 'social-100', title: 'Network Effect', description: 'Refer 100 active users', icon: Users, rarity: 'epic', xp: 600, progress: 32, unlocked: false },
  { id: 'top-10', title: 'Top 10 Vendor', description: 'Reach the global top 10 leaderboard', icon: Crown, rarity: 'legendary', xp: 1500, progress: 18, unlocked: false },
  { id: 'volume-50k', title: 'Whale Status', description: 'Hit $50,000 in trade volume', icon: Gem, rarity: 'legendary', xp: 2000, progress: 12, unlocked: false },
  { id: 'streak-100', title: 'The Centurion', description: '100-day streak — the holy grail', icon: Trophy, rarity: 'legendary', xp: 3000, progress: 8, unlocked: false },
  { id: 'reviews-500', title: 'Beloved by All', description: '500+ positive reviews', icon: Heart, rarity: 'epic', xp: 800, progress: 45, unlocked: false },
  { id: 'speed-trader', title: 'Speed Demon', description: 'Complete a trade in under 60 seconds', icon: Sparkles, rarity: 'rare', xp: 150, progress: 100, unlocked: true },
]

const FILTERS = ['All', 'Unlocked', 'In Progress', 'Legendary'] as const

export default function AchievementsSection() {
  const { theme } = useTheme()
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All')
  const [selected, setSelected] = useState<Achievement | null>(null)

  const filtered = ACHIEVEMENTS.filter((a) => {
    if (filter === 'All') return true
    if (filter === 'Unlocked') return a.unlocked
    if (filter === 'In Progress') return !a.unlocked
    if (filter === 'Legendary') return a.rarity === 'legendary'
    return true
  })

  const totalXp = ACHIEVEMENTS.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0)
  const totalUnlocked = ACHIEVEMENTS.filter((a) => a.unlocked).length

  return (
    <section
      id="achievements"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Ambient background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${theme.accent}40 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}40 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
            style={{ color: theme.accentSecondary }}
          >
            Achievement System
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Unlock badges.{' '}
            <span style={{ color: theme.accent }}>Earn rewards.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: theme.textMuted }}>
            12+ achievements to chase. Real XP, real discount credits, real bragging rights.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-10"
        >
          <StatPill label="Unlocked" value={`${totalUnlocked}/${ACHIEVEMENTS.length}`} icon={Trophy} color={theme.accent} theme={theme} />
          <StatPill label="Total XP" value={totalXp.toLocaleString()} icon={Star} color={theme.warning} theme={theme} />
          <StatPill label="Completion" value={`${Math.round((totalUnlocked / ACHIEVEMENTS.length) * 100)}%`} icon={Target} color={theme.success} theme={theme} />
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: filter === f ? theme.accent : `${theme.accent}10`,
                color: filter === f ? (theme.isDark ? '#000' : '#fff') : theme.accent,
                border: `1px solid ${filter === f ? theme.accent : theme.border}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Achievement grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((ach, i) => {
              const Icon = ach.icon
              const rarityColor = RARITY_COLORS[ach.rarity]
              return (
                <motion.button
                  key={ach.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setSelected(ach)}
                  className="relative p-4 sm:p-5 rounded-2xl text-left transition-all"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${ach.unlocked ? rarityColor : theme.border}`,
                    boxShadow: ach.unlocked ? `0 0 20px ${RARITY_GLOWS[ach.rarity]}` : 'none',
                    opacity: ach.unlocked ? 1 : 0.6,
                  }}
                >
                  {/* Rarity stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ backgroundColor: rarityColor }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 mx-auto"
                    style={{
                      background: `linear-gradient(135deg, ${rarityColor}30, ${rarityColor}10)`,
                      border: `1px solid ${rarityColor}40`,
                    }}
                  >
                    <Icon size={22} style={{ color: rarityColor }} />
                  </div>

                  {/* Locked overlay */}
                  {!ach.unlocked && (
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
                      <div
                        className="text-2xl opacity-40"
                        style={{ filter: 'blur(0.5px)' }}
                      >
                        🔒
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="text-center">
                    <div className="font-bold text-xs sm:text-sm mb-1 line-clamp-1" style={{ color: theme.textPrimary }}>
                      {ach.title}
                    </div>
                    <div
                      className="text-[10px] sm:text-xs mb-2 line-clamp-2"
                      style={{ color: theme.textMuted, minHeight: '2em' }}
                    >
                      {ach.description}
                    </div>

                    {/* XP badge */}
                    <div
                      className="inline-block text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: `${theme.warning}15`,
                        color: theme.warning,
                      }}
                    >
                      +{ach.xp} XP
                    </div>

                    {/* Progress bar */}
                    {!ach.unlocked && (
                      <div className="mt-2">
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${ach.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: rarityColor }}
                          />
                        </div>
                        <div className="text-[9px] mt-1" style={{ color: theme.textMuted }}>
                          {ach.progress}%
                        </div>
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-5"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          >
            <AchievementDetailModal
              achievement={selected}
              onClose={() => setSelected(null)}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface AchievementDetailModalProps {
  achievement: Achievement
  onClose: () => void
  theme: ThemeColors
}

function AchievementDetailModal({ achievement, onClose, theme }: AchievementDetailModalProps) {
  const SelectedIcon = achievement.icon
  return (
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      onClick={(e) => e.stopPropagation()}
      className="relative max-w-md w-full p-8 rounded-3xl text-center"
      style={{
        backgroundColor: theme.surface,
        border: `2px solid ${RARITY_COLORS[achievement.rarity]}`,
        boxShadow: `0 0 60px ${RARITY_GLOWS[achievement.rarity]}`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: theme.border, color: theme.textMuted }}
      >
        ✕
      </button>
      <div
        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${RARITY_COLORS[achievement.rarity]}40, ${RARITY_COLORS[achievement.rarity]}10)`,
          border: `2px solid ${RARITY_COLORS[achievement.rarity]}`,
        }}
      >
        <SelectedIcon size={36} />
      </div>
      <div
        className="text-[10px] uppercase tracking-widest font-bold mb-2"
        style={{ color: RARITY_COLORS[achievement.rarity] }}
      >
        {achievement.rarity}
      </div>
      <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
        {achievement.title}
      </h3>
      <p className="text-sm mb-5" style={{ color: theme.textMuted }}>
        {achievement.description}
      </p>
      <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
        <div
          className="px-4 py-2 rounded-full text-sm font-bold"
          style={{ backgroundColor: `${theme.warning}15`, color: theme.warning }}
        >
          +{achievement.xp} XP
        </div>
        <div
          className="px-4 py-2 rounded-full text-sm font-bold"
          style={{
            backgroundColor: achievement.unlocked ? `${theme.success}15` : `${theme.danger}15`,
            color: achievement.unlocked ? theme.success : theme.danger,
          }}
        >
          {achievement.unlocked ? '✓ Unlocked' : `🔒 ${achievement.progress}% complete`}
        </div>
      </div>
      {!achievement.unlocked && (
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.border }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${achievement.progress}%`,
              backgroundColor: RARITY_COLORS[achievement.rarity],
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

interface StatPillProps {
  label: string
  value: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
  theme: ThemeColors
}

function StatPill({ label, value, icon: Icon, color, theme }: StatPillProps) {
  return (
    <div
      className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl"
      style={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.border}`,
      }}
    >
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div className="text-base sm:text-lg font-bold truncate" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
          {value}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: theme.textMuted }}>
          {label}
        </div>
      </div>
    </div>
  )
}
