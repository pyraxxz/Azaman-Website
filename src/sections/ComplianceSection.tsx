import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import { CardGrid, DataTable, DiagramPlaceholder, SectionIntro } from '@/components/ReusableComponents'

const ONBOARDING_DATA = {
  headers: ['Step', 'Action', 'Requirement', 'Purpose'],
  rows: [
    ['1', 'SSO Login', 'Google or Apple (mandatory for iOS)', 'Frictionless entry, verified identity anchor'],
    ['2', 'Identity Verification', 'KYC for fiat payouts', 'Act 1154 compliance, AML/CFT adherence'],
    ['3', '2FA Setup', 'Authenticator app support', 'Account security, withdrawal protection'],
    ['4', 'Account Classification', 'USER / VENDOR / ADMIN', 'Feature gating, permission control'],
    ['5', 'Influencer Code', 'Optional referral tracking', 'Zero-cost acquisition, viral growth'],
  ],
}

const BADGE_CARDS = [
  {
    title: 'Milestone Badges',
    content: (
      <>
        <p className="mb-2">A sleek UI progress bar tracks volume toward automated badges:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong className="text-white">Bronze Trader</strong> — 10k Volume</li>
          <li><strong className="text-white">Silver Whale</strong> — 50k Volume</li>
          <li><strong className="text-white">Gold Titan</strong> — 100k Volume</li>
          <li><strong className="text-white">Diamond OG</strong> — 500k Volume</li>
        </ul>
      </>
    ),
    accent: 'cyan' as const,
  },
  {
    title: 'Weekly Leaderboards',
    content: 'A Top 50 leaderboard ranked by trade volume. Top users are automatically flagged to the Admin to receive "Discount Credits"—margin subsidies that gamify marketplace liquidity by incentivizing high-volume traders to stay active.',
    accent: 'cyan' as const,
  },
]

const ACCOUNT_STATES = [
  { name: 'ACTIVE', color: '#00ff88', trading: 'Full', chat: 'Full', withdraw: 'Full', browse: 'Full', indicator: 'None' },
  { name: 'PENDING KYC', color: '#ff6b35', trading: 'Crypto-only', chat: 'Full', withdraw: 'Crypto only', browse: 'Full', indicator: 'Yellow banner: "Complete KYC to withdraw fiat"' },
  { name: 'STRIKE WARNING', color: '#ffaa00', trading: 'Rate-limited', chat: 'Full', withdraw: 'Reduced limits', browse: 'Full', indicator: 'Orange banner with strike count' },
  { name: 'GHOST BANNED', color: '#ff4444', trading: 'None', chat: 'Read-only', withdraw: 'None', browse: 'Read-only', indicator: 'Red banner: banStatus + countdown + Appeal button' },
  { name: 'SOFT DELETED', color: '#888', trading: 'None', chat: 'None', withdraw: 'None', browse: 'None', indicator: 'Account anonymized as DeletedUser_[UUID]' },
]

const SECURITY_CARDS = [
  { title: 'Biometric Gate', content: 'FaceID or 4-digit Azaman PIN required for all transfers, withdrawals, and sensitive account changes.', accent: 'cyan' as const },
  { title: 'ACID Transactions', content: 'Prisma $transaction blocks ensure atomic database operations. If two requests hit simultaneously, they are queued perfectly—mathematically impossible to double-spend.', accent: 'cyan' as const },
  { title: 'Cold Storage', content: 'Ledger hardware wallets keep the majority of platform USDC entirely offline, immune to remote intrusion.', accent: 'cyan' as const },
  { title: 'Multi-Sig Warm Wallets', content: 'Institutional-grade access controls requiring multiple signatures for large treasury movements.', accent: 'cyan' as const },
  { title: 'Rate Limiting', content: 'Automated throttling on sensitive endpoints prevents brute-force attacks and API abuse.', accent: 'cyan' as const },
  { title: '2FA Everywhere', content: 'Authenticator app support for all Admin operations and high-value user actions.', accent: 'cyan' as const },
]

export default function ComplianceSection() {
  const [activeState, setActiveState] = useState(0)

  return (
    <SectionWrapper id="compliance-gamification">
      <H2>7. Compliance, Gamification &amp; User Lifecycle</H2>
      <SectionIntro>
        Regulatory alignment, social finance mechanics, and the addiction loop that converts first-time users into long-term participants.
      </SectionIntro>

      <H3 accent="gold">7.1 Onboarding &amp; Security</H3>
      <p className="animate-in text-[#aaa] mb-4">
        The onboarding flow is designed for maximum conversion while maintaining regulatory compliance:
      </p>
      <DataTable data={ONBOARDING_DATA} />

      <H3 accent="gold">7.2 Gamification: Badges &amp; Leaderboards</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Azaman converts financial activity into social status, creating an engagement loop that rewards volume and loyalty:
      </p>
      <CardGrid cards={BADGE_CARDS} />

      <H3 accent="gold">7.3 The Addiction Loop</H3>
      <p className="animate-in text-[#aaa] mb-3">
        The complete user lifecycle is designed as a closed engagement system:
      </p>
      <ol className="animate-in list-decimal pl-6 space-y-2 text-[#aaa]">
        <li><strong className="text-white">Discovery</strong> — Influencer referral or organic discovery</li>
        <li><strong className="text-white">Onboarding</strong> — SSO + KYC completed in under 2 minutes</li>
        <li><strong className="text-white">First Deposit</strong> — GHS converted to USDC instantly</li>
        <li><strong className="text-white">P2P Trade</strong> — Escrow-protected exchange with a verified vendor</li>
        <li><strong className="text-white">Social Chat</strong> — In-chat transfers create network effects</li>
        <li><strong className="text-white">Badge Unlock</strong> — Milestone celebration with shareable achievement</li>
        <li><strong className="text-white">Repeat</strong> — Volume drives leaderboard position → Discount Credits → Lower margins → More trades</li>
      </ol>

      <H3 accent="gold">7.4 Account States &amp; Security Architecture</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Azaman maintains five distinct account states, each with precisely defined permissions:
      </p>

      <div className="animate-in">
        <div className="flex flex-wrap gap-1 mb-4">
          {ACCOUNT_STATES.map((state, i) => (
            <button
              key={i}
              onClick={() => setActiveState(i)}
              className="px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2"
              style={{
                color: activeState === i ? state.color : '#888',
                borderColor: activeState === i ? state.color : 'transparent',
                opacity: activeState === i ? 1 : 0.6,
              }}
            >
              {state.name}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-5 border animate-in" style={{ background: '#1a1a2e', borderColor: '#2a2a3e' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: ACCOUNT_STATES[activeState].color }} />
            <h4 className="text-sm font-semibold" style={{ color: ACCOUNT_STATES[activeState].color }}>{ACCOUNT_STATES[activeState].name}</h4>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-[#888]">Trading:</span> <span className="text-[#aaa]">{ACCOUNT_STATES[activeState].trading}</span></div>
            <div><span className="text-[#888]">Chatting:</span> <span className="text-[#aaa]">{ACCOUNT_STATES[activeState].chat}</span></div>
            <div><span className="text-[#888]">Withdrawing:</span> <span className="text-[#aaa]">{ACCOUNT_STATES[activeState].withdraw}</span></div>
            <div><span className="text-[#888]">Market Browse:</span> <span className="text-[#aaa]">{ACCOUNT_STATES[activeState].browse}</span></div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#2a2a3e] text-xs text-[#888]">
            <span className="uppercase tracking-wider">UI Indicator: </span>
            <span className="text-[#aaa]">{ACCOUNT_STATES[activeState].indicator}</span>
          </div>
        </div>
      </div>

      <H3 accent="gold">7.5 Account Deactivation Flow</H3>
      <ol className="animate-in list-decimal pl-6 space-y-2 text-[#aaa]">
        <li>User initiates deactivation from Settings</li>
        <li><strong className="text-white">Mandatory feedback</strong> — Text input required (UI prepared for future audio recording with &quot;Hold to Record&quot; microphone button and visual waveforms)</li>
        <li>Data is anonymized to <code className="text-[#00d4ff]">DeletedUser_[UUID]</code> — marketplace transaction histories preserved for compliance</li>
        <li>Account enters soft-deleted state; hard deletion requires Admin approval after regulatory retention period</li>
      </ol>

      <H3 accent="gold">7.6 Security Architecture</H3>
      <CardGrid cards={SECURITY_CARDS} />

      <DiagramPlaceholder caption="Figure 7.1 — Compliance, Gamification &amp; User Lifecycle: KYC onboarding flow, milestone badges, weekly leaderboards, account states, deactivation flow, and security architecture." />
    </SectionWrapper>
  )
}
