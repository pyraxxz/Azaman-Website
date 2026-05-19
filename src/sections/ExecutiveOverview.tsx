import SectionWrapper from '@/components/SectionWrapper'
import { H2 } from '@/components/SectionHeading'
import { CardGrid, SectionIntro } from '@/components/ReusableComponents'

const FEATURE_CARDS = [
  {
    title: 'Zero-Cost Internal Transfers',
    content: 'Users send funds instantly to other Azaman IDs via simple database updates. Zero on-chain gas fees. Zero network congestion. Zero settlement delay.',
    accent: 'cyan' as const,
  },
  {
    title: 'USDC-Backed Stability',
    content: 'All user balances stored strictly as USDC. The front-end displays a dynamic "Hologram" in local currency, shielding users from FX devaluation while reflecting exact purchasing power.',
    accent: 'cyan' as const,
  },
  {
    title: 'Escrow-Protected P2P',
    content: 'Every peer-to-peer trade is protected by algorithmic escrow, risk-adjusted margins, and a three-strike enforcement system that eliminates bad actors.',
    accent: 'cyan' as const,
  },
  {
    title: 'Social Neo-Bank',
    content: 'Two isolated chat environments—trade-bound and personal—turn every conversation into a potential transaction surface with biometric-gated transfers.',
    accent: 'cyan' as const,
  },
]

export default function ExecutiveOverview() {
  return (
    <SectionWrapper id="executive-overview">
      <H2>Executive Overview</H2>
      <SectionIntro>
        Azaman is not a conventional digital wallet. It is a purpose-built, enterprise-grade hybrid of a Neo-Bank and a Peer-to-Peer (P2P) Exchange.
      </SectionIntro>

      <div className="animate-in space-y-4 text-[#aaa] leading-relaxed">
        <p>
          Azaman is engineered for emerging markets where legacy banking infrastructure has struggled to keep pace with accelerating digital asset adoption. The platform unifies local fiat liquidity with a mathematically infallible USDC backend, creating a closed-loop financial ecosystem.
        </p>
        <p>
          Users can move value across borders instantly, trade digital assets with escrow protection, and communicate securely, all while being insulated from the volatility, gas fees, and technical friction of traditional blockchain networks.
        </p>
        <p>
          By combining gamified social finance, zero-cost internal transfers, and military-grade security, Azaman delivers an engagement loop that converts first-time users into long-term participants. The platform is not merely a wallet; it is not merely an exchange. It is a new category of financial infrastructure, built for the markets that need it most.
        </p>
      </div>

      <CardGrid cards={FEATURE_CARDS} />
    </SectionWrapper>
  )
}
