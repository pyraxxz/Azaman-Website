import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import { HighlightBox, SectionIntro, DiagramPlaceholder } from '@/components/ReusableComponents'

export default function AISystems() {
  return (
    <SectionWrapper id="ai-systems">
      <H2>5. AI Command Center &amp; Smart Systems</H2>
      <SectionIntro>
        Azaman is powered by an embedded Large Language Model (LLM) framework that acts as an autonomous operational and support layer, reducing human overhead while improving decision quality.
      </SectionIntro>

      <H3 accent="gold">5.1 AI Operational CFO</H3>
      <p className="animate-in text-[#aaa] mb-4">
        A persistent backend worker monitors the System Hot Wallet and Local Fiat Pool in real time. If MATIC reserves drop to 5% of the operational threshold, or if fiat liquidity hits critical lows, the AI generates natural-language alerts to the Admin War Room:
      </p>

      <HighlightBox title="Example Alerts" variant="red">
        <p className="italic mb-2">&quot;MATIC reserves at 5%. External payouts will fail in approximately 12 hours. Top-up required.&quot;</p>
        <p className="italic">&quot;Fiat pool is critically low due to a 45% spike in withdrawal volume. Recommend liquidating 10,000 USDC on Binance.&quot;</p>
      </HighlightBox>

      <p className="animate-in text-[#aaa]">
        This replaces static dashboards with actionable, context-aware intelligence. The AI also monitors operational expenses (gas fees, API costs) and logs them for P&amp;L analysis.
      </p>

      <H3 accent="gold">5.2 Smart Ad Matchmaking</H3>
      <p className="animate-in text-[#aaa]">
        Users can toggle an <strong className="text-white">&quot;AI Smart Filter.&quot;</strong> The LLM learns from their transaction history; preferred payment methods, typical trade sizes, vendor reliability scores, and dynamically reorganizes the marketplace feed to surface ads that statistically match their behavior profile, regardless of their current internal balance.
      </p>

      <H3 accent="gold">5.3 AI Dispute Memory</H3>
      <p className="animate-in text-[#aaa] mb-4">
        When a dispute ticket opens, the AI reads the historical DisputeResolutionLog and privately suggests a resolution path to the assigned Admin based on past precedents. The AI learns from how disputes are handled, improving its suggestions over time:
      </p>

      <HighlightBox title="Example AI Suggestion" variant="gold">
        <p className="italic">&quot;Past 3 similar cases ruled in buyer favor. Recommend release. Confidence: 87%.&quot;</p>
      </HighlightBox>

      <p className="animate-in text-[#aaa]">
        This ensures fair, consistent, and swift arbitration while reducing cognitive load on human operators. The Admin retains final authority. The AI provides guidance, not governance.
      </p>

      <H3 accent="gold">5.4 AI-Driven Liquidity Monitor</H3>
      <p className="animate-in text-[#aaa]">
        The dual-monitoring system constantly watches both the Local Fiat Pool and the System Crypto Hot Wallet. When either pool drops below operational thresholds, the system uses an LLM to generate natural-language reasoning for the Admin, explaining <em>why</em> the alert was triggered and <em>what</em> action is recommended.
      </p>

      <DiagramPlaceholder caption="Figure 5.1 — AI-Powered Financial Intelligence: Context-aware alerts and predictive analytics for operational treasury management." />
    </SectionWrapper>
  )
}
