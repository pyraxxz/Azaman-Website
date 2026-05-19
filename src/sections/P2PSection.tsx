import { useState } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import {
  DataTable, HighlightBox, SectionIntro,
  DiagramPlaceholder, Tag
} from '@/components/ReusableComponents'
import { ChevronDown } from 'lucide-react'

const WALLET_PARTITION_DATA = {
  headers: ['Partition', 'Purpose', 'Behavior'],
  rows: [
    [<strong key="a" style={{ color: '#00ff88' }}>availableBalance</strong>, 'Total liquid, freely usable funds', 'Can be sent, withdrawn, or allocated to vendor ads'],
    [<strong key="b" style={{ color: '#00d4ff' }}>vendorUnallocatedBalance</strong>, 'Funds explicitly reserved by a vendor to back their active marketplace ads', 'Isolated from spending; released when ad closes or trade completes'],
    [<strong key="c" style={{ color: '#ffd700' }}>escrowLockedBalance</strong>, 'Funds currently frozen in an active P2P trade', 'Guarantees the buyer receives their asset before the seller is paid'],
    [<strong key="d" style={{ color: '#ff4444' }}>disputeEscrowBalance</strong>, 'A secondary quarantine lock used exclusively during active disputes', 'Prevents either party from moving contested funds; allows vendor to keep trading with remaining balance'],
  ],
}

const PAYMENT_METHOD_DATA = {
  headers: ['Payment Method', 'Risk Level', 'Base Margin', 'UI Tag'],
  rows: [
    ['Bank Transfer', <Tag key="t1" variant="low">Low Risk</Tag>, '15%', 'Irreversible, bank-verified'],
    ['Mobile Money (MoMo)', <Tag key="t2" variant="low">Low Risk</Tag>, '15%', 'Instant, carrier-backed'],
    ['CashApp / Zelle', <Tag key="t3" variant="med">Medium Risk</Tag>, '12% - 15%', 'Possible chargebacks within 72h'],
    ['PayPal / Venmo', <Tag key="t4" variant="high">High Risk</Tag>, '15% - 20%', 'Reversible up to 180 days'],
  ],
}

const TRADE_SCENARIO_DATA = {
  headers: ['Scenario', 'Trigger', 'System Action', 'Outcome'],
  rows: [
    [<strong key="s1">Underpayment</strong>, 'Buyer sends less fiat than agreed', 'Vendor inputs exact amount received; system adjusts locked escrow', 'Completed funds released; difference refunded to vendor'],
    [<strong key="s2">Overpayment</strong>, 'Buyer sends more fiat than agreed', 'User raises dispute, marks "Overpaid" with proof', 'Disputed difference locked from vendor\'s balance to disputeEscrowBalance; Admin reviews'],
    [<strong key="s3">Double Transaction</strong>, 'Buyer accidentally sends payment twice', 'Same as overpayment workflow', 'Vendor must refund verified overpayments or face immediate sanctions'],
  ],
}

const VENDOR_VERIFICATION_DATA = {
  headers: ['Account Type', 'Purpose', 'Verification Requirement', 'Status Flow'],
  rows: [
    [<strong key="v1">TradeAccounts</strong>, 'Receiving fiat from buyers during P2P trades', 'Upload screenshot of account details; tailored inputs (e.g., $Cashtag vs. Bank Routing)', 'PENDING → Admin Approved'],
    [<strong key="v2">PayoutDestinations</strong>, 'Withdrawing funds to external wallets/accounts', 'Custom nicknames (e.g., "My Kraken Wallet")', 'User-managed with confirmation gates'],
  ],
}

function StrikeCard({ num, title, content }: { num: number; title: string; content: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="arch-card animate-in">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-base font-semibold" style={{ color: num === 3 ? '#ff4444' : '#ffd700', fontFamily: 'Space Grotesk' }}>
          Strike {num}: {title}
        </h4>
        <ChevronDown
          size={18}
          className="text-[#888] transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-[#aaa] text-sm leading-relaxed pt-3">{content}</p>
      </div>
    </div>
  )
}

export default function P2PSection() {
  return (
    <SectionWrapper id="p2p-marketplace">
      <H2>3. The P2P Marketplace &amp; Escrow Dynamics</H2>
      <SectionIntro>
        Azaman operates a dynamic, risk-adjusted Peer-to-Peer marketplace where users trade safely under algorithmic supervision.
      </SectionIntro>

      <H3 accent="gold">3.1 Unified Wallet Segmentation</H3>
      <p className="animate-in text-[#aaa] mb-4">
        To prevent double-spending and ensure funds are always traceable during trades, each user&apos;s singular USDC balance is strictly partitioned within the database:
      </p>
      <DataTable data={WALLET_PARTITION_DATA} />

      <H3 accent="gold">3.2 Dynamic Vendor Margins &amp; Risk Profiling</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Vendors configure their desired profit margins through a haptic-feedback UI slider. The system enforces <strong className="text-white">base percentage margins</strong> based on the chargeback risk of each payment method, and publicly displays risk tags on every ad.
      </p>
      <DataTable data={PAYMENT_METHOD_DATA} />

      <HighlightBox title="The Margin Split" variant="gold">
        <p className="mb-2">Upon a successful trade, the <strong className="text-white">total margin profit</strong> is automatically split between the Vendor and the Azaman System Ledger:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-white">60/40</strong> for trades under $1,000 (Vendor / Platform)</li>
          <li><strong className="text-white">50/50</strong> for trades $1,000 and above</li>
        </ul>
        <p className="mt-2 italic">During ad creation, the Vendor Slider dynamically projects profit: &quot;At +3%, you will make $2 profit on a $50 trade, $20 on $500.&quot;</p>
      </HighlightBox>

      <H3 accent="gold">3.3 The &quot;Ping&quot; System (OTC Trading)</H3>
      <div className="animate-in text-[#aaa] space-y-3">
        <p>If a vendor has an active ad but insufficient vendorUnallocatedBalance to cover a new incoming order, the buyer can &quot;ping&quot; the vendor:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Buyer sends a ping, locking themselves into a <strong className="text-white">5-minute timeout window</strong></li>
          <li>Vendor receives an instant push notification</li>
          <li>Vendor uses a UI slider to sweep funds from availableBalance to vendorUnallocatedBalance</li>
          <li>Buyer is notified of acceptance/rejection to proceed</li>
        </ol>
        <p>This creates an Over-The-Counter (OTC) dynamic where vendors can maintain lean allocations while still capturing opportunistic large trades.</p>
      </div>

      <H3 accent="gold">3.4 Trade Adjustments &amp; The Strike System</H3>

      <HighlightBox title="Escrow Security Disclaimer" variant="red">
        <p className="italic">&quot;Escrow only locks the exact crypto amount requested. Underpayments can be retrieved, but overpayments are not guaranteed. Vendors failing to refund verified overpayments will be sanctioned.&quot;</p>
      </HighlightBox>

      <DataTable data={TRADE_SCENARIO_DATA} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <StrikeCard num={1} title="Warning" content="Warning notification + Rate limit applied to account. User receives educational prompt about proper trade etiquette." />
        <StrikeCard num={2} title="Restriction" content="Reduced trade volumes. User restricted from high-value ads and premium vendor listings." />
        <StrikeCard num={3} title="Sanction" content="Automated sanctions: shadow-ban from marketplace, restricted access to premium ads, account flagged for Admin review." />
      </div>

      <H3 accent="gold">3.5 Smart Queue &amp; Load Balancing</H3>
      <div className="animate-in text-[#aaa]">
        <p className="mb-3">Vendors set <strong className="text-white">&quot;Max Concurrent Trades&quot;</strong> during ad creation. When a vendor is at capacity, buyers clicking their ad enter a <strong className="text-white">&quot;Waiting Room&quot;</strong> UI:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Queue position displayed in real-time</li>
          <li>Exact rate disclaimer: <em>&quot;Rates are finalized only when you exit the queue and enter the active trade.&quot;</em></li>
          <li>When a trade frees up, the next buyer is automatically popped from the queue</li>
        </ul>
      </div>

      <H3 accent="gold">3.6 Mandatory Vendor Verification</H3>
      <DataTable data={VENDOR_VERIFICATION_DATA} />

      <DiagramPlaceholder caption="Figure 3.1 — P2P Marketplace &amp; Escrow Dynamics: Complete trade lifecycle, wallet partitions, ping system, strike enforcement, and vendor verification workflow." />
    </SectionWrapper>
  )
}
