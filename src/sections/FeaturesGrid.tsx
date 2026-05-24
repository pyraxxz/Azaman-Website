import { motion } from 'framer-motion'
import { Shield, Zap, Users, MessageCircle, TrendingUp, Smartphone, Lock, Palette, Bot, Wallet } from 'lucide-react'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Hologram Balance',
    description: 'Your USDC balance displayed in local currency, updating in real-time. Protected from devaluation, always reflecting true purchasing power.',
    color: '#00d4ff',
  },
  {
    icon: Zap,
    title: 'Zero-Fee Transfers',
    description: 'Send money to any Azaman user instantly. No gas fees, no network delays. Just a simple database update in milliseconds.',
    color: '#00ff88',
  },
  {
    icon: Shield,
    title: 'Escrow Protection',
    description: 'Every P2P trade is secured by smart escrow. Funds are locked until both parties confirm — trustless, instant settlement.',
    color: '#ffd700',
  },
  {
    icon: MessageCircle,
    title: 'Social Finance',
    description: 'Two chat environments — trade-bound and personal. Send money directly within conversations with biometric confirmation.',
    color: '#ff6b35',
  },
  {
    icon: Bot,
    title: 'AI-Powered Intelligence',
    description: 'Smart ad matching, automated dispute resolution, and predictive liquidity alerts. The AI learns and improves with every transaction.',
    color: '#8b5cf6',
  },
  {
    icon: TrendingUp,
    title: 'Vendor Marketplace',
    description: 'Become a vendor, set your margins, and earn from every trade. Dynamic risk profiling and queue management built-in.',
    color: '#ff0080',
  },
  {
    icon: Lock,
    title: 'Military-Grade Security',
    description: 'Biometric gates, ACID transactions, cold storage, multi-sig wallets, and rate limiting. Your assets are untouchable.',
    color: '#ff4444',
  },
  {
    icon: Users,
    title: 'Gamified Community',
    description: 'Earn badges, climb leaderboards, unlock discount credits. Trading becomes a social experience with real rewards.',
    color: '#06b6d4',
  },
  {
    icon: Palette,
    title: '11 Immersive Themes',
    description: 'From Neon Tokyo to Deep Ocean, Mars to Aurora — every theme transforms the entire app into a unique visual experience.',
    color: '#e040fb',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Premium glassmorphism UI with haptic feedback, smooth animations, and Apple Wallet-style card stacking. Feels native on every device.',
    color: '#00bfa5',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#00d4ff] uppercase tracking-[0.2em] mb-4 block">Platform Features</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Everything you need.{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#ffd700] bg-clip-text text-transparent">Nothing you don't.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Built from the ground up for the African market. Every feature is designed to make digital finance accessible, safe, and rewarding.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            // First row: 5 items, second row: 5 items
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                >
                  <Icon size={20} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                  {feature.title}
                </h3>
                <p className="text-[#888] text-xs leading-relaxed">{feature.description}</p>

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${feature.color}08 0%, transparent 70%)` }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
