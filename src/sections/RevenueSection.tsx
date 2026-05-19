import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import { DataTable, HighlightBox, SectionIntro } from '@/components/ReusableComponents'

const REVENUE_DATA = {
  headers: ['Revenue Stream', 'Mechanism', 'Rate', 'User Impact'],
  rows: [
    [
      <strong key="r1">Arbitrage Spread</strong>,
      'Buy USDC at corporate rates, sell at retail; liquidate accumulated crypto on Binance P2P at higher rates',
      'Variable (market-dependent)',
      'None ; invisible to users',
    ],
    [
      <strong key="r2">Exit Fee (Fiat)</strong>,
      '2% on all local fiat withdrawals',
      '2%',
      'Prevents arbitrage bot abuse; funds platform',
    ],
    [
      <strong key="r3">Exit Fee (Crypto)</strong>,
      '2% on all external crypto withdrawals + 100% gas fee',
      '2% + gas',
      'Covers operational costs',
    ],
    [
      <strong key="r4">P2P Margin Split</strong>,
      'Platform takes 40% (under $1K) or 50% (over $1K) of vendor margin profit',
      '40-50% of margin',
      'Shared with vendors who set their own rates',
    ],
    [
      <strong key="r5">Influencer Affiliate</strong>,
      '1% of the 2% exit fee credited to referring influencer',
      '1% of exit fee',
      'Zero-cost user acquisition',
    ],
  ],
}

export default function RevenueSection() {
  return (
    <SectionWrapper id="revenue">
      <H2>9. Platform Economics &amp; Revenue Streams</H2>
      <SectionIntro>
        Azaman generates sustainable revenue through multiple streams, all designed to align platform success with user satisfaction.
      </SectionIntro>

      <DataTable data={REVENUE_DATA} />

      <HighlightBox title="The Arbitrage Shield" variant="gold">
        <p>
          The 2% exit fee is mathematically designed to prevent users from using Azaman as a free arbitrage bot. Without it, sophisticated traders could deposit at the Yellow Card buy rate, withdraw at the sell rate, and extract risk-free profit, draining the platform&apos;s spread and destabilizing the treasury.
        </p>
      </HighlightBox>

      <H3 accent="gold">9.1 Affiliate Split (Zero-Cost Acquisition)</H3>
      <div className="animate-in text-[#aaa] space-y-3">
        <p>
          During registration, users are presented with a <strong className="text-white">&quot;Where did you hear about Azaman?&quot;</strong> survey where they can input an <code className="text-[#00d4ff]">influencerCode</code>. When that user withdraws, the 2% fee is split:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-white">1%</strong> to the <code className="text-[#00d4ff]">SYSTEM_PROFIT_FEES</code> ledger (platform revenue)</li>
          <li><strong className="text-white">1%</strong> credited to the Influencer&apos;s availableBalance</li>
        </ul>
        <p>
          This creates a viral growth loop where influencers are incentivized to drive high-volume users to the platform, as their earnings scale with their referrals&apos; activity.
        </p>
      </div>
    </SectionWrapper>
  )
}
