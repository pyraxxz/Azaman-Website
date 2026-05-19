import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import { DataTable, FormulaDisplay, SectionIntro, DiagramPlaceholder } from '@/components/ReusableComponents'

const ANALYTICS_DATA = {
  headers: ['Analytics Card', 'Primary Metrics', 'Drill-Down Views', 'Actionability'],
  rows: [
    [<strong key="a1" style={{ color: '#00ff88' }}>Profit</strong>, 'Real-time P&L, margin splits, exit fee revenue', 'Spline charts by day/week/month; source breakdown (EXIT_FEE vs P2P_MARGIN)', '"Liquidate Profit" button moves system fees to Local Fiat Pool'],
    [<strong key="a2" style={{ color: '#00d4ff' }}>Users</strong>, 'Active volume, new registrations, retention curves', 'Geographic heatmap, cohort analysis, KYC funnel', 'Flag top users for discount credit approval'],
    [<strong key="a3" style={{ color: '#ffd700' }}>Volume</strong>, 'Deposit velocity, withdrawal patterns, P2P trade count', 'Liquidity depth charts, arbitrage spread trends, hourly breakdowns', 'Trigger corporate purchasing when reserves dip'],
  ],
}

const PURCHASING_LOG_DATA = {
  headers: ['Required Field', 'Purpose', 'Validation'],
  rows: [
    ['Discount Rate Given', 'Corporate rate received from Yellow Card', 'Must be below retail rate'],
    ['Actual Market Rate at Time', 'Snapshot of market conditions', 'Auto-populated from API'],
    ['USDC Amount Purchased', 'Total crypto acquired', 'Must match blockchain confirmation'],
    ['Fiat Sent (including all bank charges)', 'Total capital outlay', 'Must match bank statement'],
    ['Mandatory Screenshot/Receipt Upload', 'Audit trail evidence', 'Image required; cannot submit without'],
  ],
}

export default function AdminWarRoom() {
  return (
    <SectionWrapper id="admin-war-room">
      <H2>6. The Admin &quot;War Room&quot; &amp; God Mode</H2>
      <SectionIntro>
        The backend administrative portal provides institutional-grade oversight, ensuring flawless accounting and immediate intervention capabilities.
      </SectionIntro>

      <H3 accent="gold">6.1 The Analytics Triumvirate</H3>
      <p className="animate-in text-[#aaa] mb-4">
        The Admin dashboard features three massive, interactive analytics cards powered by fl_chart; drill-downs reveal interactive spline line charts and bar graphs separating revenue sources:
      </p>
      <DataTable data={ANALYTICS_DATA} />
      <p className="animate-in text-[#aaa] mt-4">
        All platform deposits and withdrawals are monitored in real-time. The Admin can view the full mathematical spread of any transaction, chat with users inside dispute tickets, and manually release frozen funds once verified.
      </p>

      <H3 accent="gold">6.2 Double-Check Security Invariant</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Every withdrawal triggers a mathematical invariant check. The system scans the entire database to enforce:
      </p>
      <FormulaDisplay formula="Σ(Deposits + Profits) − Σ(Withdrawals + Losses) = current availableBalance" />
      <p className="animate-in text-[#aaa]">
        If there is a micro-cent anomaly, the payout freezes automatically and an urgent <strong className="text-white">Dispute Ticket</strong> is created for Admin review before any funds leave the system. The Admin can view the full mathematical spread, chat with the user inside the ticket, and manually release the funds once verified.
      </p>

      <H3 accent="gold">6.3 The Spy Glass</H3>
      <div className="animate-in text-[#aaa]">
        <p className="mb-3">Admins can silently monitor active trade socket rooms in real-time to preempt fraud before it escalates. If an Admin intervenes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Their chat bubble renders with a <strong className="text-white">gold border</strong> and a verified <strong className="text-white">&quot;Admin&quot;</strong> shield</li>
          <li>This prevents user impersonation and establishes authority instantly</li>
          <li>All Admin interventions are logged in the DisputeResolutionLog for AI learning</li>
        </ul>
      </div>

      <H3 accent="gold">6.4 Corporate Purchasing Log</H3>
      <p className="animate-in text-[#aaa] mb-4">
        A bulletproof accounting portal for manual OTC treasury refills. When refilling the Master Treasury from Yellow Card (or manually when the API portal is unavailable), the Admin uses a strict logging form:
      </p>
      <DataTable data={PURCHASING_LOG_DATA} />
      <p className="animate-in text-[#aaa] mt-4">
        This maintains a flawless, regulator-ready audit trail for every bulk USDC acquisition.
      </p>

      <H3 accent="gold">6.5 iOS Compliance &amp; Deactivation</H3>
      <p className="animate-in text-[#aaa]">
        Users can deactivate their accounts in Settings, requiring mandatory text feedback (with a UI layout prepared for future audio-recording feedback). Data is anonymized to <code className="text-[#00d4ff]">DeletedUser_[UUID]</code>, not hard-deleted, preserving marketplace transaction histories for regulatory compliance and dispute resolution.
      </p>

      <H3 accent="gold">6.6 &quot;Ghost&quot; Ban System</H3>
      <div className="animate-in text-[#aaa]">
        <p className="mb-3">Banned users retain read-only access to browse the market. A persistent red banner sits at the top of the app indicating:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-white">banStatus</strong> — The reason for the restriction</li>
          <li><strong className="text-white">Countdown timer</strong> — If temporary, shows remaining duration</li>
          <li><strong className="text-white">&apos;Appeal via Email&apos; button</strong> — Direct line to Admin review</li>
        </ul>
        <p className="mt-3">This maintains engagement (banned users can still see market activity, reducing churn upon reinstatement) while enforcing consequences.</p>
      </div>

      <DiagramPlaceholder caption="Figure 6.1 — AI Command Center &amp; Admin War Room: Operational CFO monitoring, analytics triumvirate, corporate purchasing log, spy glass intervention, and the double-check security invariant." />
    </SectionWrapper>
  )
}
