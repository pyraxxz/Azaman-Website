import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3 } from '@/components/SectionHeading'
import { CardGrid, HighlightBox, SectionIntro } from '@/components/ReusableComponents'

const MOAT_CARDS = [
  {
    title: 'Regulatory First-Mover',
    content: 'Built from the ground up around Act 1154 mandates. While competitors retrofit compliance, Azaman\'s core architecture embeds it.',
    accent: 'cyan' as const,
  },
  {
    title: 'Treasury Arbitrage',
    content: 'The hidden spread model generates revenue without charging users exorbitant fees. Competitors must choose between profitability and user retention; Azaman achieves both.',
    accent: 'cyan' as const,
  },
  {
    title: 'Social Lock-In',
    content: 'The dual-environment chat system creates network effects. As users build contact networks and trade histories, switching costs rise.',
    accent: 'cyan' as const,
  },
  {
    title: 'AI Operational Leverage',
    content: 'Autonomous monitoring, dispute resolution, and liquidity management reduce human overhead as scale increases—unlike traditional exchanges that require linear headcount growth.',
    accent: 'cyan' as const,
  },
]

export default function StrategicVision() {
  return (
    <SectionWrapper id="strategic-vision">
      <H2>10. Strategic Vision &amp; Competitive Positioning</H2>
      <SectionIntro>
        Azaman is not merely reacting to the market. It is defining a new category of financial infrastructure.
      </SectionIntro>

      <H3 accent="gold">10.1 Market Opportunity</H3>
      <div className="animate-in text-[#aaa] space-y-3">
        <p>
          Ghana&apos;s digital economy is at an inflection point. With the passage of Act 1154, the regulatory framework now supports licensed, compliant digital asset service providers. The market has outpaced legacy banking infrastructure, creating a vacuum that Azaman is designed to fill.
        </p>
        <p>
          By positioning as the first enterprise-grade, Act 1154-compliant Neo-Bank and P2P Exchange hybrid, Azaman captures three simultaneous trends:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-white">Crypto Adoption</strong> — Growing demand for dollar-denominated savings and cross-border remittances</li>
          <li><strong className="text-white">Neo-Banking</strong> — Mobile-first, zero-branch financial services for the unbanked and underbanked</li>
          <li><strong className="text-white">Social Finance</strong> — The convergence of messaging, payments, and trading into unified platforms</li>
        </ul>
      </div>

      <H3 accent="gold">10.2 Competitive Moats</H3>
      <CardGrid cards={MOAT_CARDS} />

      <H3 accent="gold">10.3 The Path Forward</H3>
      <p className="animate-in text-[#aaa] mb-3">
        Azaman&apos;s architecture is designed for horizontal expansion:
      </p>
      <ul className="animate-in list-disc pl-6 space-y-2 text-[#aaa]">
        <li><strong className="text-white">Multi-Currency Support</strong> — The Hologram system can extend beyond GHS to NGN, KES, and other African currencies</li>
        <li><strong className="text-white">Institutional API</strong> — White-label treasury and escrow services for other fintechs</li>
        <li><strong className="text-white">Credit &amp; Lending</strong> — P2P lending backed by escrow-locked collateral</li>
        <li><strong className="text-white">Cross-Border Remittance</strong> — Leveraging the gasless internal transfer network for instant, zero-fee cross-border value movement between Azaman users</li>
      </ul>

      <HighlightBox title="The Addiction Loop" variant="purple">
        <p>
          By combining robust, ACID-compliant financial ledgers with gamified social mechanics and military-grade security, Azaman is not just building an app. It is building an addiction loop. Users do not merely transact; they compete, socialize, and accumulate status. The platform becomes a daily habit, not a monthly utility.
        </p>
      </HighlightBox>
    </SectionWrapper>
  )
}
