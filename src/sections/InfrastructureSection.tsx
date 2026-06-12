// =============================================================================
// InfrastructureSection - "The rails behind the rates."
// How Azaman actually moves and funds money: Mooler on-ramp, Mooler off-ramp,
// Kotani bulk liquidity (what powers the corporate rate), and enforced KYC.
// Compact horizontal rail so four ideas read fast without a long scroll.
// =============================================================================

import { motion } from 'framer-motion'
import { ArrowDownToLine, ArrowUpFromLine, Layers, Fingerprint, Network } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Glass from '@/components/Glass'
import AmbientOrbs from '@/components/AmbientOrbs'
import HScrollRail from '@/components/HScrollRail'
import { useTheme } from '@/contexts/ThemeContext'
import type { ThemeColors } from '@/contexts/ThemeContext'

interface Pillar {
  icon: LucideIcon
  tag: string
  title: string
  desc: string
  tint: (t: ThemeColors) => string
}

const PILLARS: Pillar[] = [
  {
    icon: ArrowDownToLine,
    tag: 'Mooler · On-ramp',
    title: 'Fund your wallet instantly',
    desc: 'Money you send in, whether mobile money or bank, is collected through Mooler and credited to your USDC wallet in seconds. No manual top-ups.',
    tint: (t) => t.success,
  },
  {
    icon: ArrowUpFromLine,
    tag: 'Mooler · Off-ramp',
    title: 'Cash out on autopilot',
    desc: 'Withdraw USDC and Mooler pushes the funds straight to your local wallet automatically, with no waiting on a human to release anything.',
    tint: (t) => t.accent,
  },
  {
    icon: Layers,
    tag: 'Kotani Pay · Liquidity',
    title: 'Pools funded in bulk',
    desc: 'We buy USDC in bulk through Kotani Pay to keep our pools deep. That wholesale cost is exactly what lets us offer the corporate rate you saw above.',
    tint: (t) => t.accentSecondary,
  },
  {
    icon: Fingerprint,
    tag: 'Compliance · KYC',
    title: 'Verified, every time',
    desc: 'Full KYC and AML checks are enforced on every account before money moves, protecting the network, the pools, and everyone you trade with.',
    tint: (t) => t.warning,
  },
]

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { theme } = useTheme()
  const Icon = pillar.icon
  const tint = pillar.tint(theme)
  return (
    <Glass radius="2xl" padding="lg" elevated mouseGlow className="h-full">
      <div className="flex flex-col h-full gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${tint}18`, border: `1px solid ${tint}40` }}
        >
          <Icon size={20} style={{ color: tint }} />
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: tint }}>
          {pillar.tag}
        </div>
        <h3 className="text-lg font-bold leading-tight" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
          {pillar.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
          {pillar.desc}
        </p>
      </div>
    </Glass>
  )
}

export default function InfrastructureSection() {
  const { theme } = useTheme()

  return (
    <section
      id="infrastructure"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 900px 500px at 20% 0%, ${theme.glow}14, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
          >
            <Network size={12} />
            Infrastructure &amp; Trust
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            The rails behind{' '}
            <span className="text-gradient-flow">the rates.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-5" style={{ color: theme.textSecondary }}>
            Real integrations move the money, and verified identity keeps it safe.
          </p>
        </motion.div>

        <HScrollRail
          gridClass="md:grid-cols-2 lg:grid-cols-4"
          items={PILLARS.map((p) => <PillarCard key={p.tag} pillar={p} />)}
        />
      </div>
    </section>
  )
}
