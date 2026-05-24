import { motion } from 'framer-motion'
import {
  Shield, Zap, Users, MessageCircle, TrendingUp, Smartphone,
  Lock, Palette, Bot, Wallet,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const FEATURES = [
  { icon: Wallet, title: 'Hologram Balance', description: 'Your USDC balance displayed in local currency, updating in real-time. Protected from devaluation, always reflecting true purchasing power.', color: '#00d4ff' },
  { icon: Zap, title: 'Zero-Fee Transfers', description: 'Send money to any Azaman user instantly. No gas fees, no network delays. Just a simple database update in milliseconds.', color: '#00ff88' },
  { icon: Shield, title: 'Escrow Protection', description: 'Every P2P trade is secured by smart escrow. Funds are locked until both parties confirm: trustless, instant settlement.', color: '#ffd700' },
  { icon: MessageCircle, title: 'Social Finance', description: 'Two chat environments: trade-bound and personal. Send money directly within conversations with biometric confirmation.', color: '#ff6b35' },
  { icon: Bot, title: 'AI-Powered Intelligence', description: 'Smart ad matching, automated dispute resolution, and predictive liquidity alerts. The AI learns and improves with every transaction.', color: '#8b5cf6' },
  { icon: TrendingUp, title: 'Vendor Marketplace', description: 'Become a vendor, set your margins, and earn from every trade. Dynamic risk profiling and queue management built-in.', color: '#ff0080' },
  { icon: Lock, title: 'Military-Grade Security', description: 'Biometric gates, ACID transactions, cold storage, multi-sig wallets, and rate limiting. Your assets are untouchable.', color: '#ff4444' },
  { icon: Users, title: 'Gamified Community', description: 'Earn badges, climb leaderboards, unlock discount credits. Trading becomes a social experience with real rewards.', color: '#06b6d4' },
  { icon: Palette, title: '11 Immersive Themes', description: 'From Neon Tokyo to Deep Ocean, Mars to Aurora. Every theme transforms the entire app into a unique visual experience.', color: '#e040fb' },
  { icon: Smartphone, title: 'Mobile-First Design', description: 'Premium glassmorphism UI with haptic feedback, smooth animations, and Apple Wallet-style card stacking. Feels native on every device.', color: '#00bfa5' },
]


export default function FeaturesGrid() {
  const { theme } = useTheme()

  return (
    <section
      id="features"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            ⚡ Platform Features
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Everything you need.{' '}
            <span style={{ color: theme.accent }}>Nothing you don't.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Built from the ground up for the African market. Every feature is designed to make
            digital finance accessible, safe, and rewarding.
          </p>
        </motion.div>


        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-6 rounded-2xl tilt-card transition-all"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.border}`,
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = feature.color
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px ${feature.color}30`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.borderColor = theme.border
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}08)`,
                    border: `1px solid ${feature.color}40`,
                  }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3
                  className="font-bold text-sm mb-2"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
