import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'security' | 'fees' | 'vendors'
}

const FAQS: FAQItem[] = [
  {
    category: 'general',
    question: 'What is Azaman and how does it work?',
    answer:
      'Azaman is a P2P (peer-to-peer) finance platform built specifically for the African market. You can buy and sell USDC stablecoin at competitive rates, send money instantly to other users for free, and protect your savings from currency devaluation. We connect verified vendors with buyers using a smart escrow system, so every trade is secure.',
  },
  {
    category: 'fees',
    question: 'Does Azaman charge fees?',
    answer:
      'Internal Azaman-to-Azaman transfers are completely free. For P2P trades, our revenue comes from the spread between corporate and retail rates — meaning users never see explicit "fees" on the rate they get. There is a flat 2% exit fee only when withdrawing fiat or crypto out of the platform.',
  },
  {
    category: 'security',
    question: 'How are my funds protected?',
    answer:
      'We use military-grade security: biometric authentication, multi-signature cold storage wallets, ACID-compliant transaction database, rate limiting, and real-time fraud detection. Every P2P trade is locked in escrow until both parties confirm. We are licensed under Ghana\'s Act 1154 (2025) as a regulated VASP.',
  },
  {
    category: 'general',
    question: 'How fast are transactions?',
    answer:
      'Internal transfers between Azaman users are instant — under 0.3 seconds, settled in our database. P2P trades average 2-5 minutes once payment is confirmed. Crypto withdrawals to external wallets typically settle within 1-3 minutes depending on network congestion.',
  },
  {
    category: 'vendors',
    question: 'How do I become a vendor?',
    answer:
      'Complete KYC verification, pass our background check, and apply through the in-app vendor portal. Once approved, you can post buy/sell ads, set your own margins (within platform limits), and start earning. Vendors keep 40-50% of the platform\'s margin profit on each trade. Top vendors earn over $500/month passively.',
  },
  {
    category: 'security',
    question: 'What happens if there is a dispute?',
    answer:
      'Disputes are escalated to our support team within seconds. Funds remain frozen in escrow until resolution. We use AI-powered evidence review combined with human moderation. Most disputes are resolved in under 30 minutes. Fraudulent vendors are permanently banned and lose their stake.',
  },
  {
    category: 'fees',
    question: 'Why do I need to deposit GHS first?',
    answer:
      'Pre-funding your fiat wallet means you can grab the best vendor rates instantly without delays. Deposits are free via mobile money (MoMo) or bank transfer. Funds are credited within 60 seconds. Your money stays yours — withdraw anytime with the standard 2% exit fee.',
  },
  {
    category: 'general',
    question: 'Which countries are supported?',
    answer:
      'Currently live in Ghana with full regulatory approval. Nigeria (NGN), Kenya (KES), and South Africa (ZAR) are launching in Q2 2026. Our hologram balance system is designed to scale to 40+ African currencies. Sign up now to be notified when your country goes live.',
  },
  {
    category: 'general',
    question: 'Is there a mobile app?',
    answer:
      'Yes — native iOS and Android apps with full feature parity. Available on the App Store and Google Play. The web version is coming soon for desktop traders. All apps stay in sync via real-time WebSocket connections.',
  },
  {
    category: 'fees',
    question: 'Can I get my money back if something goes wrong?',
    answer:
      'Yes. Every completed trade is final, but if a vendor fails to release crypto after payment, our escrow system automatically refunds you. Unauthorized account access is covered by our internal insurance fund up to $5,000 USDC per incident.',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Questions', emoji: '💬' },
  { id: 'general', label: 'General', emoji: '🌍' },
  { id: 'security', label: 'Security', emoji: '🔒' },
  { id: 'fees', label: 'Fees & Pricing', emoji: '💰' },
  { id: 'vendors', label: 'For Vendors', emoji: '🏪' },
] as const

export default function FAQSection() {
  const { theme } = useTheme()
  const [open, setOpen] = useState<number | null>(0)
  const [category, setCategory] = useState<string>('all')

  const filtered = FAQS.filter((f) => category === 'all' || f.category === category)

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <div className="relative max-w-[900px] mx-auto px-5 lg:px-8">
        {/* Header */}
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
            <HelpCircle size={12} />
            FAQ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Got questions?{' '}
            <span style={{ color: theme.accent }}>We have answers.</span>
          </h2>
          <p className="text-lg" style={{ color: theme.textMuted }}>
            Everything you need to know before you start. Still curious? Hit us up on X.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id)
                setOpen(null)
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: category === cat.id ? theme.accent : `${theme.accent}10`,
                color: category === cat.id ? (theme.isDark ? '#000' : '#fff') : theme.accent,
                border: `1px solid ${category === cat.id ? theme.accent : theme.border}`,
              }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {filtered.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={`${category}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden transition-colors"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${isOpen ? theme.accent : theme.border}`,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base" style={{ color: theme.textPrimary }}>
                    {faq.question}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                      backgroundColor: isOpen ? theme.accent : `${theme.accent}15`,
                      color: isOpen ? (theme.isDark ? '#000' : '#fff') : theme.accent,
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5 text-sm leading-relaxed"
                        style={{ color: theme.textSecondary }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 p-6 rounded-2xl"
          style={{
            backgroundColor: `${theme.accent}08`,
            border: `1px solid ${theme.accent}20`,
          }}
        >
          <p className="text-base mb-3" style={{ color: theme.textPrimary }}>
            Can't find what you're looking for?
          </p>
          <a
            href="mailto:support@azaman.app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-transform hover:scale-105"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#000' : '#fff',
            }}
          >
            Contact Support →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
