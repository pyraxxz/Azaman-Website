import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Cpu, Globe, Coins, CheckCircle2, Rocket, ArrowRight } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import AmbientOrbs from '@/components/AmbientOrbs'
import Glass from '@/components/Glass'
import HScrollRail from '@/components/HScrollRail'

// Compact count-up for the "scale we're building toward" strip (merged in from
// the old standalone Stats section to keep the page shorter).
function Counter({ target, prefix = '', suffix = '', decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number
}) {
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(target); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000, fps = 60
        const totalFrames = (duration / 1000) * fps
        let frame = 0
        const timer = setInterval(() => {
          frame++
          const eased = 1 - Math.pow(1 - frame / totalFrames, 3)
          setCount(target * eased)
          if (frame >= totalFrames) { setCount(target); clearInterval(timer) }
        }, 1000 / fps)
      }
    }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString('en-US')
  return (
    <div ref={ref}>
      <span className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>
        {prefix}{display}{suffix}
      </span>
    </div>
  )
}

const SCALE_STATS = [
  { target: 50, prefix: '$', suffix: 'M', decimals: 0, label: 'Yr 1 volume target' },
  { target: 100000, prefix: '', suffix: '+', decimals: 0, label: 'Users by 2026' },
  { target: 99.9, prefix: '', suffix: '%', decimals: 1, label: 'Uptime target' },
  { target: 5, prefix: '<', suffix: 's', decimals: 0, label: 'Trade settlement' },
]

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
  const { theme } = useTheme()
  return (
    <section
      id="investors"
      className="relative py-24 lg:py-40"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${theme.warning}10`, border: `1px solid ${theme.warning}30`, color: theme.warning }}
          >
            💼 For Investors
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            A $50B market.{' '}
            <span className="text-gradient-flow">One platform.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Africa's digital finance market is projected to reach $50B by 2028. Azaman is positioned at the intersection of crypto adoption, neo-banking, and social finance.
          </p>
        </motion.div>

        {/* Scale strip - the numbers we're building toward */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16"
        >
          {SCALE_STATS.map((s) => (
            <Glass key={s.label} radius="xl" padding="none">
              <div className="text-center px-3 py-5">
                <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                <div className="text-xs mt-1" style={{ color: theme.textMuted }}>{s.label}</div>
              </div>
            </Glass>
          ))}
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-8 mb-16"
          style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: theme.accent, fontFamily: 'Space Grotesk' }}>
            Revenue Model
          </h3>
          <HScrollRail
            gridClass="md:grid-cols-2 lg:grid-cols-4"
            itemClass="w-[70%] sm:w-[260px]"
            items={REVENUE_STREAMS.map((stream) => (
              <div
                key={stream.label}
                className="h-full p-4 rounded-xl"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: theme.accent, fontFamily: 'Space Grotesk' }}>
                  {stream.pct}
                </div>
                <div className="font-medium text-sm mb-1" style={{ color: theme.textPrimary }}>
                  {stream.label}
                </div>
                <div className="text-xs" style={{ color: theme.textMuted }}>
                  {stream.desc}
                </div>
              </div>
            ))}
          />
          <div
            className="mt-6 p-4 rounded-xl"
            style={{ backgroundColor: `${theme.accent}08`, border: `1px solid ${theme.accent}20` }}
          >
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              <strong style={{ color: theme.textPrimary }}>Key insight:</strong> Revenue is generated from the <em>spread</em> between corporate and retail rates - users never see fees. This makes Azaman more affordable than competitors while being more profitable.
            </p>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-xl font-bold mb-8 text-center" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Competitive Moats
          </h3>
          <HScrollRail
            gridClass="md:grid-cols-2 lg:grid-cols-3"
            itemClass="w-[72%] sm:w-[280px]"
            items={MOATS.map((moat) => {
              const Icon = moat.icon
              return (
                <div
                  key={moat.title}
                  className="h-full p-5 rounded-xl"
                  style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}` }}
                >
                  <Icon size={20} style={{ color: theme.accent }} className="mb-3" />
                  <h4 className="font-semibold mb-1 text-sm" style={{ color: theme.textPrimary }}>
                    {moat.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                    {moat.desc}
                  </p>
                </div>
              )
            })}
          />
        </motion.div>

        {/* Early traction - the product is built */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <Glass radius="2xl" padding="lg" elevated mouseGlow>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Left */}
              <div className="lg:col-span-3">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
                >
                  ✦ Early Traction
                </div>
                <h3 className="text-2xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
                  The product is built.
                </h3>
                <p className="text-base mt-2 mb-6 max-w-md" style={{ color: theme.textSecondary }}>
                  Not a pitch deck. Not a prototype. A fully-functioning platform, ready to launch.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    'Android & iOS app, built, tested, and store-ready',
                    'Backend API live on production infrastructure',
                    'KYC pipeline integrated with Dojah Ghana',
                    'P2P escrow system operational end-to-end',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={20} style={{ color: theme.success, flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: theme.textPrimary }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <Glass radius="xl" padding="lg" mouseGlow={false} className="w-full">
                  <div className="flex flex-col items-center text-center">
                    <Rocket size={32} style={{ color: theme.accent }} />
                    <h4 className="text-xl font-bold mt-3" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
                      Ready to talk?
                    </h4>
                    <p className="text-sm mt-2 mb-5" style={{ color: theme.textMuted }}>
                      Schedule a call with the founding team.
                    </p>
                    <a
                      href="mailto:team@azaman.app"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.glow})`,
                        color: theme.isDark ? '#000' : '#fff',
                      }}
                      data-cursor="hover"
                    >
                      Schedule a Call
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </Glass>
              </div>
            </div>
          </Glass>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <motion.a
            href="mailto:investors@azaman.app?subject=Investor%20Deck%20Request"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-10 py-4 rounded-2xl font-semibold cursor-pointer"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#000' : '#fff',
              boxShadow: `0 0 40px ${theme.accent}40`,
            }}
          >
            Request Investor Deck {'->'}
          </motion.a>
          <p className="text-sm mt-4" style={{ color: theme.textMuted }}>
            Detailed financials, projections, and team bios available on request.
          </p>
        </motion.div>

        {/* Traction - connected roadmap timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <h3 className="text-xl font-bold mb-2 text-center" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Traction
          </h3>
          <p className="text-sm text-center mb-12" style={{ color: theme.textMuted }}>
            From zero to live in West Africa - and scaling.
          </p>

          <div className="relative grid grid-cols-3 gap-2 md:gap-4">
            {/* Gradient connector line - sits behind the nodes */}
            <div
              aria-hidden
              className="absolute top-[26px] md:top-[34px] left-[16%] right-[16%] h-[2px] rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.success}, ${theme.accent}, ${theme.warning})`,
                opacity: 0.45,
              }}
            />
            {[
              { title: 'Beta Complete', status: 'Shipped', color: theme.success, icon: CheckCircle2, desc: 'Private beta onboarded - first live P2P trades and Susu cycles completed end-to-end.' },
              { title: 'Public Launch - Ghana', status: 'Live now', color: theme.accent, icon: Rocket, desc: 'Open in Ghana with the vendor program running. Nigeria waitlist filling fast.' },
              { title: 'Seed Raise - $500K', status: 'Open', color: theme.warning, icon: TrendingUp, desc: 'Raising to scale infrastructure and launch Nigeria. Investor deck available on request.' },
            ].map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Phase node */}
                  <div
                    className="relative z-10 w-12 h-12 md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center mb-3 md:mb-5"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${p.color}, ${theme.surface})`,
                      border: `1px solid ${p.color}66`,
                      boxShadow: `0 0 28px ${p.color}44`,
                    }}
                  >
                    <Icon size={20} className="md:hidden" style={{ color: '#fff' }} />
                    <Icon size={26} className="hidden md:block" style={{ color: '#fff' }} />
                    <span
                      className="absolute -bottom-1 -right-1 text-[8px] md:text-[9px] font-black px-1 md:px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: theme.background, color: p.color, border: `1px solid ${p.color}` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Status pill */}
                  <span
                    className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full mb-2 md:mb-3 whitespace-nowrap"
                    style={{ color: p.color, backgroundColor: `${p.color}15`, border: `1px solid ${p.color}40` }}
                  >
                    {p.status}
                  </span>

                  <h4 className="font-bold text-xs md:text-base mb-1 md:mb-1.5 leading-tight" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
                    {p.title}
                  </h4>
                  <p className="text-[10px] md:text-xs leading-relaxed max-w-[260px]" style={{ color: theme.textMuted }}>
                    {p.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
