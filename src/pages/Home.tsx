// =============================================================================
// Home — the cinematic landing page. Extracted from App so React Router can
// handle additional routes (e.g. /vendors) cleanly.
// =============================================================================

import HeroBridge from '@/sections/HeroBridge'
import LiveTickerSection from '@/sections/LiveTickerSection'
import ChatTicketsSection from '@/sections/ChatTicketsSection'
import BentoEcosystem from '@/sections/BentoEcosystem'
import SusuEngineSection from '@/sections/SusuEngineSection'
import AzmAuctionSection from '@/sections/AzmAuctionSection'
import AppShowcase from '@/sections/AppShowcase'
import StatsSection from '@/sections/StatsSection'
import InvestorSection from '@/sections/InvestorSection'
import FAQSection from '@/sections/FAQSection'
import ClosingSection from '@/sections/ClosingSection'

export default function Home() {
  return (
    <>
      <HeroBridge />
      <LiveTickerSection />
      <ChatTicketsSection />
      <BentoEcosystem />
      <SusuEngineSection />
      <AzmAuctionSection />
      <AppShowcase />
      <StatsSection />
      <InvestorSection />
      <FAQSection />
      <ClosingSection />
    </>
  )
}
