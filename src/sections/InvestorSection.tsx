import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Cpu, Globe, Coins } from 'lucide-react'

const REVENUE_STREAMS = [
  { label: 'Arbitrage Spread', desc: 'Buy USDC at corporate rates, sell at retail', pct: '40%' },
  { label: '2% Exit Fee', desc: 'On all fiat & crypto withdrawals', pct: '30%' },
  { label: 'P2P Margin Split', desc: '40-50% of vendor margin profit', pct: '20%' },
  { label: 'Affiliate Program', desc: '1% referral revenue share', pct: '10%' },
]

const MOATS = [
  { icon: Shield, title: 'Regulatory First-Mover', desc: 'Built around Act 1154 from day one. Competitors retrofit; we embed.' },
  { icon: Coins, title: 'Hidden Arbitrage Model', desc: 'Revenue without user-facing fees. Competitors choose between profit and retention.' },
  { icon: Users, title: 'Social Lock-In', desc: 'Chat + transfers + trade history create switching costs that compound over time.' },
  { icon: Cpu, title: 'AI Leverage', desc: 'Operational costs stay flat as scale grows. No linear headcount requirement.' },
  { icon: Globe, title: 'Pan-African Expansion', desc: 'Hologram system extends to NGN, KES, and 40+ African currencies.' },
  { icon: TrendingUp, title: 'Network Effects', desc: 'Every new user makes the platform more valuable for existing users.' },
]

export default function InvestorSection() {
  return (
    <section id="investors" className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#ffd700] uppercase tracking-[0.2em] mb-4 block">For Investors</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            A $50B market.{' '}
            <span className="bg-gradient-to-r from-[#ffd700] to-[#ff6b35] bg-clip-text text-transparent">One platform.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Africa's digital finance market is projected to reach $50B by 2028. Azaman is positioned at the intersection of crypto adoption, neo-banking, and social finance.
          </p>
        </motion.div>

        {/* Revenue model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-[#ffd700]/10 bg-[#ffd700]/[0.02] p-8 mb-16"
        >
          <h3 className="text-xl font-bold text-[#ffd700] mb-6" style={{ fontFamily: 'Space Grotesk' }}>Revenue Model</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVENUE_STREAMS.map((stream, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl font-bold text-[#ffd700] mb-1" style={{ fontFamily: 'Space Grotesk' }}>{stream.pct}</div>
                <div className="text-white font-medium text-sm mb-1">{stream.label}</div>
                <div className="text-[#888] text-xs">{stream.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-[#ffd700]/5 border border-[#ffd700]/10">
            <p className="text-sm text-[#aaa]">
              <strong className="text-white">Key insight:</strong> Revenue is generated from the <em>spread</em> between corporate and retail rates — users never see fees. This makes Azaman more affordable than competitors while being more profitable.
            </p>
          </div>
        </motion.div>

        {/* Competitive moats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'Space Grotesk' }}>Competitive Moats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOATS.map((moat, i) => {
              const Icon = moat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#ffd700]/20 transition-colors"
                >
                  <Icon size={20} className="text-[#ffd700] mb-3" />
                  <h4 className="text-white font-semibold mb-1 text-sm">{moat.title}</h4>
                  <p className="text-[#888] text-xs leading-relaxed">{moat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="mailto:investors@azaman.app?subject=Investor%20Deck%20Request"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-10 py-4 rounded-2xl font-semibold text-black bg-gradient-to-r from-[#ffd700] to-[#ff6b35] shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:shadow-[0_0_60px_rgba(255,215,0,0.4)] transition-shadow cursor-pointer"
          >
            Request Investor Deck →
          </motion.a>
          <p className="text-[#888] text-sm mt-4">Detailed financials, projections, and team bios available on request.</p>
        </motion.div>
      </div>
    </section>
  )
}
