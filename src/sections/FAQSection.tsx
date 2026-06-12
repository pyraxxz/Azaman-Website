// =============================================================================
// FAQSection - Two-column layout with search + category filter + accordion
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
  { category: 'general', question: 'What is Azaman?', answer: 'Azaman is a Gen-Z social finance platform built for Africa. It combines a P2P USDC trading marketplace, community savings groups (Susu), digital vaults, and social chat, all in one app. Think of it as your bank, your savings group, and your trading desk, in your pocket.' },
  { category: 'general', question: 'How does P2P trading work on Azaman?', answer: 'You browse live ads from KYC-verified vendors offering to buy or sell USDC. When you start a trade, USDC is locked in Azaman\'s smart escrow. You pay the vendor via any supported method (Cash App, Zelle, MoMo, bank transfer, and more). Once payment is confirmed, escrow releases in seconds. The whole process takes under 5 minutes for new users and under 30 seconds for experienced ones.' },
  { category: 'general', question: 'What is Susu and how is it different from a regular savings app?', answer: 'Susu is a traditional West African rotating savings system (called tontine elsewhere). Azaman digitizes it: a group of 5-20 people contribute a fixed amount of USDC each cycle, and one member receives the full pot. Azaman adds escrow protection, trust scoring, KYC identity gates, and automatic cycle management, so the system that has worked for generations is now secured by smart contracts.' },
  { category: 'security', question: 'Is my money safe? What if a trade goes wrong?', answer: 'Every trade uses non-custodial escrow. USDC is locked before any payment changes hands. If a dispute arises, Azaman\'s admin team reviews the chat history and proof of payment. Most disputes are resolved in under 30 minutes. Vendors are KYC-verified and carry trust scores based on their trade history.' },
  { category: 'vendors', question: 'How do I become a vendor?', answer: 'Visit our Vendors page for the full application process. Vendors go through enhanced KYC, a document verification step, and a probationary period before their ads are published. In return, vendors earn XP, achievements, and AZM tokens, plus access to Azaman\'s growing user base.' },
  { category: 'fees', question: 'What are AZM tokens?', answer: 'AZM is Azaman\'s reward token. You earn AZM by trading, saving, referring friends, and maintaining streaks. AZM can be spent on fee discounts, ad boosts, and won-in-auction rewards. It is not a cryptocurrency; it is an in-app loyalty currency.' },
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
  const [open, setOpen] = useState<string | null>(FAQS[0].question)
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
    <section id="faq" className="relative py-16 lg:py-40 overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}>
            <HelpCircle size={12} />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Got questions? <span className="text-gradient-flow">We have answers.</span>
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
                  onClick={() => setCategory(cat.id)}
                  data-cursor="hover"
                  className="transition-transform active:scale-[0.97]"
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
                const isOpen = open === faq.question
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
                          onClick={() => setOpen(isOpen ? null : faq.question)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left transition-transform active:scale-[0.99]"
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
