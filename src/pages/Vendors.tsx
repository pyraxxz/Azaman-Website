// =============================================================================
// Vendors — the long-form vendor landing page that the mobile app deep-links to
// at https://azaman.me/vendors. Mirrors the app's vendor application flow:
//   - Explains the in-app pull-tab gestures (3-pull for new users, 1-pull
//     for existing vendors).
//   - Walks through the 5-step KYC.
//   - Shows the earnings model and competitive moat.
//   - Closes with a "Open the App" CTA + an email fallback.
// =============================================================================

import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Crown,
  FileImage,
  Flame,
  Gauge,
  Hand,
  Shield,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wallet,
  Wrench,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'

export default function VendorsPage() {
  const { theme } = useTheme()

  useEffect(() => {
    document.title = 'Become a Vendor — Azaman'
    const desc =
      'Apply to become a verified Azaman P2P vendor. Earn 40–50% of every margin spread, climb the leaderboard, and claim the boosted spotlight slot.'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc
    return () => {
      document.title = 'Azaman — The Future of P2P Finance in Africa'
    }
  }, [])

  return (
    <div style={{ backgroundColor: theme.background, color: theme.textPrimary }}>
      <VendorHero />
      <VendorPullTabExplainer />
      <VendorEarnings />
      <VendorApplicationSteps />
      <VendorRequirements />
      <VendorFAQ />
      <VendorClosing />
    </div>
  )
}

// =============================================================================
// HERO — crown / storefront / aurora gradient
// =============================================================================
function VendorHero() {
  const { theme } = useTheme()
  return (
    <section
      className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Ambient aurora */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none bg-aurora-shift"
      />
      {/* Orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: '10%',
          left: '6%',
          width: 420,
          height: 420,
          background: `radial-gradient(circle, ${theme.accent}22, transparent 70%)`,
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: '10%',
          right: '6%',
          width: 480,
          height: 480,
          background: `radial-gradient(circle, ${theme.accentSecondary}1f, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.warning}10`,
              border: `1px solid ${theme.warning}40`,
              color: theme.warning,
            }}
          >
            <Crown size={12} />
            Vendor Program
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-[72px] font-bold leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}
          >
            Run the rails.{' '}
            <span style={{ color: theme.accent, textShadow: `0 0 36px ${theme.accent}55` }}>
              Earn the spread.
            </span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed max-w-2xl mb-8" style={{ color: theme.textSecondary }}>
            Azaman vendors are the engine of the P2P marketplace. Set your own margins,
            keep 40–50% of every fill, and compete for the boosted leaderboard slot. Top
            vendors earn USD 500+ per month with under an hour of daily work.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold cursor-pointer"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff',
                boxShadow: `0 0 28px ${theme.accent}50`,
              }}
            >
              Start the application
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold"
              style={{
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
                backgroundColor: `color-mix(in srgb, ${theme.surface} 60%, transparent)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              ← Back to home
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
            {[
              { value: '40-50%', label: 'Margin share' },
              { value: '<60s', label: 'Approval queue' },
              { value: '$500+', label: 'Avg monthly' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center"
                style={{
                  backgroundColor: `color-mix(in srgb, ${theme.surface} 70%, transparent)`,
                  border: `1px solid ${theme.border}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  className="text-lg sm:text-xl font-black"
                  style={{ color: theme.accent, fontFamily: 'Space Grotesk' }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — vendor card mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center"
        >
          <Glass radius="2xl" padding="lg" tilt tiltMax={8} elevated className="w-full max-w-[420px]">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary})`,
                  color: theme.isDark ? '#000' : '#fff',
                  boxShadow: `0 0 20px ${theme.accent}80`,
                }}
              >
                K
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ color: theme.textPrimary }}>
                    KwameGold
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-[0.18em]"
                    style={{
                      background: `linear-gradient(120deg, ${theme.heroGradient[0]}, ${theme.heroGradient[1]}, ${theme.heroGradient[2]})`,
                      backgroundSize: '300% 300%',
                      animation: 'aurora-flow 8s ease infinite',
                      color: theme.isDark ? '#000' : '#fff',
                    }}
                  >
                    ★ BOOSTED
                  </span>
                </div>
                <div
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: theme.warning }}
                >
                  LEGEND · Trust 99.2%
                </div>
              </div>
              <Crown size={20} style={{ color: theme.accent }} />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Trades', value: '1,248' },
                { label: 'Volume', value: '$284K' },
                { label: 'Streak', value: '47d' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-2 text-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${theme.card} 80%, transparent)`,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="text-sm font-black"
                    style={{ color: theme.textPrimary, fontFamily: 'JetBrains Mono' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[9px] uppercase" style={{ color: theme.textMuted }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-3"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accent}03)`,
                border: `1px solid ${theme.accent}30`,
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold" style={{ color: theme.textPrimary }}>
                  This month's earnings
                </span>
                <TrendingUp size={12} style={{ color: theme.success }} />
              </div>
              <div
                className="text-3xl font-black"
                style={{ color: theme.accent, fontFamily: 'Space Grotesk' }}
              >
                $642.18
              </div>
              <div className="text-[10px] mt-1" style={{ color: theme.success }}>
                ▲ +18.4% vs last month
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px]" style={{ color: theme.textMuted }}>
              <Flame size={12} style={{ color: '#FF7A1A' }} />
              <span>12,400 AZM bid · holding boosted slot</span>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// PULL-TAB EXPLAINER — describes the in-app gesture for new users vs vendors
// =============================================================================
function VendorPullTabExplainer() {
  const { theme } = useTheme()

  return (
    <section
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Hand size={12} />
            How to access from the app
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            The vendor tab is hidden{' '}
            <span style={{ color: theme.accent }}>by design.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            On the P2P market screen, look for the floating tag on the left edge. The way you
            interact with it depends on whether you're already a verified vendor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* New user — 3 pulls */}
          <Glass radius="2xl" padding="lg" tilt tiltMax={5} elevated>
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${theme.warning}15`,
                  border: `1px solid ${theme.warning}30`,
                }}
              >
                <UserCheck size={20} style={{ color: theme.warning }} />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: theme.textMuted }}
                >
                  New users
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  Pull the tab three times.
                </h3>
              </div>
            </div>

            <ol className="space-y-3 mb-5">
              {[
                {
                  n: 1,
                  title: 'Toggle vendor mode in Settings.',
                  desc: 'Open the app, head to Settings → Vendor Mode, and flip it on. This unlocks the pull-tab on the P2P screen.',
                },
                {
                  n: 2,
                  title: 'Go back to the P2P market.',
                  desc: 'You\'ll see a floating tag on the left edge labeled "BECOME VENDOR".',
                },
                {
                  n: 3,
                  title: 'Pull the tab three times in a row.',
                  desc: 'Within five seconds: pull 1 shows what vendoring entails, pull 2 confirms intent, pull 3 launches the application.',
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}30`,
                    }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: theme.textPrimary }}>
                      {step.title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                      {step.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className="rounded-xl p-3 flex items-start gap-3"
              style={{
                backgroundColor: `${theme.accent}08`,
                border: `1px solid ${theme.accent}20`,
              }}
            >
              <Sparkles size={14} style={{ color: theme.accent }} className="mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                The friction is intentional. Vendoring is a real commitment with collateral, audits,
                and a 24/7 response window. The triple-pull stops impulsive sign-ups.
              </div>
            </div>
          </Glass>

          {/* Existing vendor — 1 pull */}
          <Glass radius="2xl" padding="lg" tilt tiltMax={5} elevated>
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accent}08)`,
                  border: `1px solid ${theme.accent}50`,
                }}
              >
                <Crown size={20} style={{ color: theme.accent }} />
              </div>
              <div>
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: theme.textMuted }}
                >
                  Verified vendors
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  Pull the tab once.
                </h3>
              </div>
            </div>

            <ol className="space-y-3 mb-5">
              {[
                {
                  n: 1,
                  title: 'Open the P2P market.',
                  desc: 'The pull-tab on the left edge now reads "VENDOR" — your verified credential is recognized.',
                },
                {
                  n: 2,
                  title: 'Drag the tab past the halfway mark.',
                  desc: 'A single pull past 50% of the screen width opens your Vendor Dashboard with haptic confirmation.',
                },
                {
                  n: 3,
                  title: 'Manage everything from one place.',
                  desc: 'Live ads, queue, dispute alerts, AZM boost auction, earnings, and trust score — all in the dashboard.',
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}30`,
                    }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: theme.textPrimary }}>
                      {step.title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                      {step.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className="rounded-xl p-3 flex items-start gap-3"
              style={{
                backgroundColor: `${theme.success}10`,
                border: `1px solid ${theme.success}25`,
              }}
            >
              <BadgeCheck size={14} style={{ color: theme.success }} className="mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>
                Approved vendors skip the gate entirely. One pull, you're in. Your AZM bid for the
                boosted slot is always one tap away.
              </div>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// EARNINGS — how vendors get paid
// =============================================================================
function VendorEarnings() {
  const { theme } = useTheme()
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: theme.background }}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.success}10`,
              border: `1px solid ${theme.success}30`,
              color: theme.success,
            }}
          >
            <Coins size={12} />
            How vendors earn
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Real spread.{' '}
            <span style={{ color: theme.accent }}>Real payouts.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Azaman doesn't charge users a visible fee. We split the spread between corporate
            and retail rates with our vendors. The harder you trade, the more you keep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Banknote,
              title: 'Margin share',
              metric: '40 – 50%',
              desc: 'Of every spread on every fill. Higher tier vendors get the bigger slice.',
            },
            {
              icon: Flame,
              title: 'Boost auction',
              metric: '4× traffic',
              desc: 'Burn AZM to claim the top "Boosted" slot and quadruple your inbound trade requests.',
            },
            {
              icon: Gauge,
              title: 'Tier system',
              metric: '5 levels',
              desc: 'Bronze → Silver → Gold → Diamond → Legend. Each tier unlocks larger limits and faster payouts.',
            },
          ].map((card) => {
            const Icon = card.icon
            return (
              <Glass key={card.title} radius="2xl" padding="lg" tilt tiltMax={6}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent}08)`,
                    border: `1px solid ${theme.accent}40`,
                  }}
                >
                  <Icon size={20} style={{ color: theme.accent }} />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: theme.textMuted }}>
                  {card.title}
                </div>
                <div
                  className="text-3xl font-black mb-2"
                  style={{ color: theme.accent, fontFamily: 'Space Grotesk' }}
                >
                  {card.metric}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                  {card.desc}
                </p>
              </Glass>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// 5-STEP APPLICATION — mirrors VendorApplyScreen in the app
// =============================================================================
function VendorApplicationSteps() {
  const { theme } = useTheme()
  const steps = [
    {
      n: 1,
      icon: UserCheck,
      title: 'Personal Identity',
      items: ['Legal name + date of birth', 'Government-issued ID (front + back)', 'Selfie holding the ID'],
    },
    {
      n: 2,
      icon: Building2,
      title: 'Proof of Address',
      items: ['Utility bill or bank statement (≤ 3 months)', 'Street, city, region, postal code', 'Auto-cross-checked with ID'],
    },
    {
      n: 3,
      icon: Wallet,
      title: 'Financial Background',
      items: ['Source of funds declaration', 'Expected monthly volume', 'Prior P2P platform experience'],
    },
    {
      n: 4,
      icon: Banknote,
      title: 'Payment Methods',
      items: ['Add at least 2 methods', 'Mobile money, bank, CashApp, Zelle', 'Names must match KYC profile'],
    },
    {
      n: 5,
      icon: ClipboardCheck,
      title: 'Collateral & Terms',
      items: ['$50 USDC vendor stake', 'Accept response-time SLA', 'Sign vendor agreement'],
    },
  ]

  return (
    <section
      id="apply"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.surface, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <FileImage size={12} />
            5-step application
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Binance-grade KYC.{' '}
            <span style={{ color: theme.accent }}>Built for trust.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Approval typically lands within 24 hours of submission. Have your documents ready and
            you'll fly through this in under 12 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <Glass key={s.n} radius="2xl" padding="md" tilt tiltMax={5} className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                    style={{
                      background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSecondary})`,
                      color: theme.isDark ? '#000' : '#fff',
                    }}
                  >
                    {s.n}
                  </div>
                  <Icon size={16} style={{ color: theme.accent }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  {s.title}
                </h3>
                <ul className="space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs" style={{ color: theme.textMuted }}>
                      <CheckCircle2 size={11} style={{ color: theme.success }} className="mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Glass>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// REQUIREMENTS CHECKLIST + tooling needed
// =============================================================================
function VendorRequirements() {
  const { theme } = useTheme()
  const checklist = [
    { icon: Shield, title: '18+ with valid government ID', sub: 'Passport, national ID, or driver\'s license' },
    { icon: Wallet, title: '$50 USDC collateral stake', sub: 'Refundable on graceful exit. Slashed on default.' },
    { icon: Wrench, title: 'At least 2 payment methods', sub: 'Mobile money, bank, CashApp, or Zelle' },
    { icon: Gauge, title: '15-minute average response time', sub: 'During declared availability windows' },
    { icon: ArrowDownToLine, title: 'A real device + stable connection', sub: 'For real-time chat and proof uploads' },
    { icon: BadgeCheck, title: 'Clean compliance history', sub: 'No active sanctions or fraud flags' },
  ]
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: theme.background }}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Make sure you{' '}
            <span style={{ color: theme.accent }}>tick every box.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Missing any of these will pause your application. Get them ready before you start.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checklist.map((c) => {
            const Icon = c.icon
            return (
              <Glass key={c.title} radius="lg" padding="md" tilt tiltMax={4}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${theme.accent}12`,
                      border: `1px solid ${theme.accent}30`,
                    }}
                  >
                    <Icon size={18} style={{ color: theme.accent }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5" style={{ color: theme.textPrimary }}>
                      {c.title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
                      {c.sub}
                    </div>
                  </div>
                </div>
              </Glass>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// FAQ — vendor-specific
// =============================================================================
function VendorFAQ() {
  const { theme } = useTheme()
  const faqs = [
    {
      q: 'How long does approval take?',
      a: 'Most clean applications are approved within 24 hours. Edge cases (foreign IDs, missing payment proofs) can take up to 72 hours.',
    },
    {
      q: 'Can I run a vendor account on multiple devices?',
      a: 'You can be logged in on multiple devices, but trades are bound to one active session at a time to prevent dispute conflicts.',
    },
    {
      q: 'What happens to my collateral if I miss a trade?',
      a: 'A single missed response triggers a warning. Repeat misses (3 in 30 days) auto-suspend the account and freeze the stake until review.',
    },
    {
      q: 'Do I get to set my own rates?',
      a: 'Yes — within platform-defined floor and ceiling bands tied to the live oracle rate. The AI matchmaker rewards competitive rates with more inbound matches.',
    },
    {
      q: 'How does the AZM boost auction work?',
      a: 'Vendors burn AZM tokens to bid for the top boosted leaderboard slot. The slot is recalculated continuously. Winners get 4× more inbound trade requests for the duration of their bid.',
    },
    {
      q: 'Can I deactivate vendor mode without losing my history?',
      a: 'Yes. Toggle off in Settings → Vendor Mode. Your trade history, reviews, and trust score are preserved. Reactivating restores everything.',
    },
  ]
  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: theme.surface, borderTop: `1px solid ${theme.border}` }}>
      <div className="max-w-[900px] mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Vendor{' '}
            <span style={{ color: theme.accent }}>FAQ</span>
          </h2>
          <p className="text-base" style={{ color: theme.textMuted }}>
            Quick answers to the questions every prospective vendor asks.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-2xl overflow-hidden"
              style={{
                backgroundColor: `color-mix(in srgb, ${theme.background} 70%, transparent)`,
                border: `1px solid ${theme.border}`,
              }}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 p-5"
                style={{ color: theme.textPrimary }}
              >
                <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-base font-bold transition-transform group-open:rotate-45 flex-shrink-0"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent,
                  }}
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CLOSING — final CTA: download + email
// =============================================================================
function VendorClosing() {
  const { theme } = useTheme()
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-aurora-shift" />
      <div className="relative max-w-[800px] mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Crown size={36} style={{ color: theme.accent, margin: '0 auto 16px' }} />
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Ready to{' '}
            <span style={{ color: theme.accent }}>run the rails?</span>
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: theme.textSecondary }}>
            Open the Azaman app, toggle vendor mode in Settings, head to the P2P market, and pull
            the tab three times. We'll take it from there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://azaman.me/app"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff',
                boxShadow: `0 0 32px ${theme.accent}50`,
              }}
            >
              Download the App
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="mailto:vendors@azaman.app?subject=Vendor%20Application%20Inquiry"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold"
              style={{
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`,
                backgroundColor: `color-mix(in srgb, ${theme.surface} 60%, transparent)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              Email vendors@azaman.app
            </a>
          </div>

          <p className="text-xs mt-8 uppercase tracking-wider" style={{ color: theme.textMuted }}>
            Licensed VASP under Act 1154 (2025) · Vendor agreement applies
          </p>
        </motion.div>
      </div>
    </section>
  )
}
