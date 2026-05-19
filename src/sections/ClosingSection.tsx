import SectionWrapper from '@/components/SectionWrapper'
import { H2 } from '@/components/SectionHeading'

export default function ClosingSection() {
  return (
    <SectionWrapper id="closing">
      <H2>Closing Statement</H2>

      <div className="animate-in space-y-4 text-[#aaa] leading-relaxed">
        <p>
          Azaman combines ACID-compliant financial ledgers, gamified social mechanics, and military-grade security into a single, cohesive ecosystem. It is not a wallet. It is not an exchange. It is a new category of financial infrastructure, built for the markets that need it most.
        </p>

        <p>
          The platform&apos;s architecture addresses the three fundamental failures of legacy crypto adoption in emerging markets:
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-white">Volatility</strong> — Solved by the 1:1 USDC backing and Hologram display
          </li>
          <li>
            <strong className="text-white">Complexity</strong> — Solved by gasless internal transfers and familiar banking UX
          </li>
          <li>
            <strong className="text-white">Trust</strong> — Solved by escrow-protected P2P, mandatory KYC, and AI-monitored compliance
          </li>
        </ol>

        <p>
          With regulatory alignment under Act 1154, a mathematically infallible treasury engine, and an engagement loop that converts users into participants, Azaman is positioned to become the definitive financial platform for West Africa&apos;s digital economy.
        </p>
      </div>
    </SectionWrapper>
  )
}
