// =============================================================================
// FAQSection — Two-column layout with search + category filter + accordion
// =============================================================================

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Search } from 'lucide-react'
import Glass from '@/components/Glass'
import { useTheme } from '@/contexts/ThemeContext'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'security' | 'fees' | 'vendors'
}

const FAQS: FAQItem[] = [
  { category: 'general', question: 'What is Azaman and how does it work?', answer: 'Azaman is a P2P finance platform built for Africa. Buy/sell USDC at competitive rates, send money instantly for free, and protect savings from devaluation. Verified vendors + smart escrow = secure trades.' },
  { category: 'fees', question: 'Does Azaman charge fees?', answer: 'Internal transfers are free. Revenue comes from the spread between corporate and retail rates — users never see explicit fees. 2% exit fee only on fiat/crypto withdrawals.' },
  { category: 'security', question: 'How are my funds protected?', answer: 'Biometric auth, multi-sig cold storage, ACID transactions, rate limiting, real-time fraud detection. Every P2P trade locked in escrow. Licensed under Act 1154 (2025).' },
  { category: 'general', question: 'How fast are transactions?', answer: 'Internal: under 0.3s. P2P trades: 2-5 minutes after payment confirmation. Crypto withdrawals: 1-3 minutes depending on network.' },
  { category: 'vendors', question: 'How do I become a vendor?', answer: 'Complete KYC, pass background check, apply in-app. Set your own margins. Keep 40-50% of margin profit per trade. Top vendors earn $500+/month.' },
  { category: 'security', question: 'What happens in a dispute?', answer: 'Funds frozen in escrow. AI-powered evidence review + human moderation. Most resolved in under 30 minutes. Fraudulent vendors permanently banned.' },
  { category: 'fees', question: 'Why deposit GHS first?', answer: 'Pre-funding means instant access to best rates. Deposits free via MoMo or bank. Credited within 60 seconds. Withdraw anytime (2% exit fee).' },
  { category: 'general', question: 'Which countries are supported?', answer: 'Live in Ghana. Nigeria, Kenya, South Africa launching Q2 2026. Hologram system scales to 40+ African currencies.' },
  { category: 'general', question: 'Is there a mobile app?', answer: 'Native iOS and Android with full feature parity. Available on App Store and Google Play. Real-time sync via WebSocket.' },
  { category: 'fees', question: 'Can I get my money back?', answer: 'Yes. Failed vendor releases trigger automatic escrow refund. Unauthorized access covered by internal insurance up to $5,000 USDC per incident.' },
]

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '💬' },
  { id: 'general', label: 'General', emoji: '🌍' },
  { id: 'fees', label: 'Fees', emoji: '💰' },
  { id: 'security', label: 'Security', emoji: '🔒' },
  { id: 'vendors', label: 'Vendors', emoji: '🏪' },
] as const

export default function FAQSection() {
  const { theme } = useTheme()
  const [open, setOpen] = useState<number | null>(0)
  const [category, setCategory] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let items = FAQS
    if (category !== 'all') items = items.filter((f) => f.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
    }
    return items
  }, [category, search])

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}>
            <HelpCircle size={12} />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Got questions? <span style={{ color: theme.accent }}>We have answers.</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Search + Categories */}
          <div className="lg:col-span-4">
            {/* Search */}
            <Glass radius="xl" padding="none" className="mb-4">
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={16} style={{ color: theme.textMuted }} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: theme.textPrimary }}
                  data-cursor="hidden"
                />
              </div>
            </Glass>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setCategory(cat.id); setOpen(null) }}
                  data-cursor="hover"
                >
                  <Glass radius="lg" padding="none">
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all"
                      style={{
                        color: category === cat.id ? theme.accent : theme.textMuted,
                        borderLeft: category === cat.id ? `2px solid ${theme.accent}` : '2px solid transparent',
                      }}
                    >
                      <span>{cat.emoji}</span>
                      {cat.label}
                    </div>
                  </Glass>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((faq, i) => {
                const isOpen = open === i
                return (
                  <motion.div
                    key={`${category}-${faq.question}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                  >
                    <Glass radius="xl" padding="none" mouseGlow>
                      <div
                        className="transition-colors duration-200"
                        style={{ borderColor: isOpen ? theme.accent : 'transparent', borderWidth: '1px', borderStyle: 'solid', borderRadius: 'inherit' }}
                      >
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left"
                          data-cursor="hover"
                        >
                          <span className="font-semibold text-sm" style={{ color: theme.textPrimary }}>{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                            style={{ backgroundColor: isOpen ? theme.accent : `${theme.accent}15`, color: isOpen ? (theme.isDark ? '#000' : '#fff') : theme.accent }}
                          >
                            +
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: theme.textSecondary }}>{faq.answer}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Glass>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
