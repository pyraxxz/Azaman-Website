import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import {
  CardGrid, DataTable, HighlightBox, FormulaDisplay,
  DiagramPlaceholder, SectionIntro
} from '@/components/ReusableComponents'

const TRI_WALLET_DATA = {
  headers: ['Wallet Tier', 'Function', 'Security Posture', 'Asset Type'],
  rows: [
    [
      <strong key="1" style={{ color: '#ffd700' }}>System Master Crypto Treasury (Cold/Warm)</strong>,
      'Holds the vast majority of platform USDC. A significant percentage is kept entirely offline in physical Ledger hardware wallets.',
      'Air-gapped / Multi-sig',
      'USDC (Bulk Holdings)',
    ],
    [
      <strong key="2" style={{ color: '#ff4444' }}>System Hot Wallet</strong>,
      'An automated Polygon wallet used exclusively to process user withdrawals to external, third-party Web3 wallets.',
      'Automated / Rate-limited',
      'USDC + MATIC (Gas Reserve)',
    ],
    [
      <strong key="3" style={{ color: '#00d4ff' }}>Local Fiat Pool</strong>,
      "Azaman's corporate local bank and Mobile Money (MoMo) accounts, holding the physical GHS used to fulfill user requests for local fiat withdrawals.",
      'Segregated / Reconciled Daily',
      'GHS (Payout Liquidity)',
    ],
  ],
}

const ARBITRAGE_CARDS = [
  {
    title: 'Corporate Purchasing',
    content: 'Admins purchase bulk USDC via a dedicated portal at subsidized corporate rates through Yellow Card\'s institutional desk.',
    accent: 'cyan' as const,
  },
  {
    title: 'The Spread',
    content: 'When users deposit fiat to buy USDC, they do so at standard retail rates. When users withdraw fiat, Azaman pays them from the Local Fiat Pool and takes ownership of their USDC into the Master Treasury.',
    accent: 'cyan' as const,
  },
  {
    title: 'Bulk Liquidation',
    content: 'Accumulated crypto is liquidated in bulk on platforms like Binance P2P at higher selling rates, capturing the arbitrage spread as platform revenue.',
    accent: 'cyan' as const,
  },
  {
    title: 'The 2% Exit Fee',
    content: 'All local fiat withdrawals incur a strict 2% fee. This is mathematically designed to prevent users from treating Azaman as a free arbitrage bot, preserving the economic integrity of the spread model.',
    accent: 'cyan' as const,
  },
]

const FLOW_TABS = [
  {
    label: 'Local Fiat Deposit',
    color: '#00ff88',
    steps: ['User deposits GHS via local payment aggregators (MoMo/Bank)', 'Backend instantly calculates equivalent USDC at live Yellow Card rate', "Credits user's availableBalance; GHS moves to Local Fiat Pool"],
    fee: 'No deposit fee',
  },
  {
    label: 'Local Fiat Withdrawal',
    color: '#ff4444',
    steps: ['User requests GHS payout from availableBalance', '2% Exit Fee deducted (1% to SYSTEM_PROFIT_FEES, 1% to Influencer if referred)', 'GHS paid from Local Fiat Pool; equivalent USDC moved to Master Treasury'],
    fee: '2% Exit Fee',
  },
  {
    label: 'External Crypto Deposit',
    color: '#00d4ff',
    steps: ['User deposits to dedicated Polygon USDC wallet address', 'Funds automatically swept into Azaman\'s Master Crypto Treasury', "User's sub-wallet acts as routing address; UI balance updated"],
    fee: 'Network gas only',
  },
  {
    label: 'External Crypto Withdrawal',
    color: '#ff6b35',
    steps: ['User requests USDC to external Web3 wallet', '2% Exit Fee applied first; then 100% of MATIC gas deducted from transfer amount', 'Funds leave System Hot Wallet; user pays all network fees'],
    fee: '2% Exit + 100% Gas',
  },
]

export default function TreasurySection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <SectionWrapper id="treasury">
      <H2>2. The Treasury Engine &amp; Hologram Ledger System</H2>
      <SectionIntro>
        The fundamental challenge with crypto adoption in emerging markets is the dual threat of foreign exchange (FX) death spirals and prohibitive on-chain gas fees. Azaman solves this by removing local fiat from the core ledger entirely.
      </SectionIntro>

      <H3 accent="gold">2.1 The 1:1 USDC Rule &amp; The Hologram</H3>
      <div className="animate-in text-[#aaa] leading-relaxed space-y-4">
        <p>
          User balances are stored strictly as <strong className="text-white">USDC</strong>; a stablecoin pegged 1:1 to the U.S. Dollar. To preserve a familiar banking experience, the front-end renders a <strong className="text-white">&quot;Hologram&quot;</strong> of the user&apos;s net worth in Ghanaian Cedis (GHS).
        </p>
        <FormulaDisplay formula="User USDC Balance × Live Market Rate = Displayed GHS" />
        <p>
          <strong className="text-white">The Mechanism:</strong> The backend continuously polls live market rates via our Yellow Card API integration. The displayed GHS balance is a dynamic, real-time calculation that updates without lag.
        </p>
        <p>
          <strong className="text-white">The Result:</strong> Users are shielded from local currency devaluation because their underlying wealth is denominated in stable USD value. The UI dynamically reflects their exact local purchasing power without ever exposing them to exchange-rate risk on the backend.
        </p>
      </div>

      <H3 accent="gold">2.2 Zero-Cost Internal Transfers (Gasless Architecture)</H3>
      <div className="animate-in text-[#aaa] leading-relaxed">
        <p className="mb-3">
          Traditional crypto transfers require users to pay variable &quot;gas fees&quot; to network validators. Azaman bypasses this entirely for intra-platform movements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#aaa]">
          <li>Users send funds instantly to other Azaman IDs</li>
          <li>Because the funds remain within Azaman&apos;s unified system ledgers, the transfer is executed as a simple database update—debiting Sender A and crediting Receiver B in milliseconds</li>
          <li><strong className="text-white">Zero on-chain gas fees. Zero network congestion. Zero settlement delay.</strong></li>
        </ul>
      </div>

      <H3 accent="gold">2.3 The Tri-Wallet Enterprise Flow</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Money does not move on-chain for every transaction. Azaman utilizes an institutional-grade treasury architecture:
      </p>
      <DataTable data={TRI_WALLET_DATA} />

      <HighlightBox title="Corporate Supply Chain" variant="cyan">
        <p>
          Azaman acts as the primary USDC supplier. The Admin portal features a dedicated buying system (via API or USSD push) allowing the Admin to purchase bulk USDC from Yellow Card at subsidized corporate rates. Azaman then supplies this to users at the standard Yellow Card retail rate, profiting from the spread.
        </p>
      </HighlightBox>

      <H3 accent="gold">2.4 The Arbitrage Engine (Platform Economics)</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Azaman functions as the ultimate liquidity provider. This is where the platform generates sustainable revenue without charging exorbitant user fees:
      </p>
      <CardGrid cards={ARBITRAGE_CARDS} />

      <H3 accent="gold">2.5 Deposits &amp; Withdrawals Flow</H3>

      <div className="animate-in">
        <div className="flex flex-wrap gap-1 mb-4">
          {FLOW_TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2"
              style={{
                color: activeTab === i ? tab.color : '#888',
                borderColor: activeTab === i ? tab.color : 'transparent',
                opacity: activeTab === i ? 1 : 0.6,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="rounded-xl p-5 border animate-in"
          style={{ background: '#1a1a2e', borderColor: '#2a2a3e' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: FLOW_TABS[activeTab].color }} />
            <h4 className="text-sm font-semibold text-white">{FLOW_TABS[activeTab].label}</h4>
          </div>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#aaa] mb-4">
            {FLOW_TABS[activeTab].steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <div className="flex items-center gap-2 pt-3 border-t border-[#2a2a3e]">
            <span className="text-xs text-[#888] uppercase tracking-wider">Fee:</span>
            <span className="text-sm font-medium" style={{ color: FLOW_TABS[activeTab].color }}>
              {FLOW_TABS[activeTab].fee}
            </span>
          </div>
        </div>
      </div>

      <HighlightBox title="Dynamic Fiat Liquidity Tags" variant="red">
        <p>
          When the Local Fiat Pool is running low, particularly during high-volume periods or late-night operations, the system displays a <strong className="text-white">&quot;Limited Fiat&quot;</strong> tag on the withdrawal screen under local payment methods. Tapping the tag reveals: <em>&quot;Limited local fiat withdrawals at this time. If it fails, try again within an hour.&quot;</em> This transparency prevents user frustration while protecting the platform from over-commitment.
        </p>
      </HighlightBox>

      <DiagramPlaceholder caption="Figure 2.1 — Azaman Treasury Engine &amp; Hologram Ledger: The complete tri-wallet enterprise architecture showing money flows, arbitrage mechanics, and the security invariant." />
    </SectionWrapper>
  )
}
