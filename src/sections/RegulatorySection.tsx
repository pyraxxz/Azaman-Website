import SectionWrapper from '@/components/SectionWrapper'
import { H2 } from '@/components/SectionHeading'
import { HighlightBox, SectionIntro, DiagramPlaceholder } from '@/components/ReusableComponents'

export default function RegulatorySection() {
  return (
    <SectionWrapper id="regulatory">
      <H2>1. Strategic Imperative &amp; Regulatory Alignment</H2>
      <SectionIntro>
        Ghana stands at a critical inflection point in the global digital economy.
      </SectionIntro>

      <div className="animate-in space-y-4 text-[#aaa] leading-relaxed">
        <p>
          With crypto adoption accelerating rapidly across West Africa, legacy banking infrastructure has struggled to keep pace. The passage of the <strong className="text-white">Virtual Asset Service Providers Act, 2025 (Act 1154)</strong>, signed into law on December 30, 2025, formally legalized and regulated digital asset trading, ending years of regulatory ambiguity.
        </p>
        <p>
          The law mandates strict licensing under the <strong className="text-white">Bank of Ghana (BoG)</strong> and the <strong className="text-white">Securities and Exchange Commission (SEC)</strong>, with heavy emphasis on:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#aaa]">
          <li><strong className="text-white">Anti-Money Laundering (AML)</strong> — Comprehensive transaction monitoring and suspicious activity reporting</li>
          <li><strong className="text-white">Counter-Terrorism Financing (CFT)</strong> — Enhanced due diligence and sanctions screening</li>
          <li><strong className="text-white">The FATF Travel Rule</strong> — Information sharing for cross-border transfers exceeding thresholds</li>
          <li><strong className="text-white">Consumer Protection</strong> — Mandatory KYC, dispute resolution frameworks, and fund safeguarding</li>
        </ul>
      </div>

      <HighlightBox title="Built for Act 1154, Not Reacting to It" variant="gold">
        <p>
          Azaman is architected to thrive under Act 1154, not merely to comply with it, but to embed its mandates into the platform&apos;s DNA. By integrating mandatory KYC verification for all fiat payouts, cryptographically secure escrow mechanisms, and an AI-monitored system ledger, Azaman ensures absolute consumer protection and zero systemic risk. This positions the platform as the gold standard for licensed Virtual Asset Service Providers (VASPs) in Ghana.
        </p>
      </HighlightBox>

      <DiagramPlaceholder caption="Figure 1.1 — AML &amp; KYC Practices for Fintech: Azaman's compliance architecture maps directly to regulatory requirements under Act 1154." />
    </SectionWrapper>
  )
}
