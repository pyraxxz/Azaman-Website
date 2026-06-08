// =============================================================================
// Home - the cinematic landing page. Extracted from App so React Router can
// handle additional routes (e.g. /vendors) cleanly.
// Below-the-fold sections are lazy-loaded so the hero is interactive faster.
// =============================================================================

import { lazy, Suspense } from 'react'
import HeroBridge from '@/sections/HeroBridge'
import LiveTickerSection from '@/sections/LiveTickerSection'

const ChatTicketsSection = lazy(() => import('@/sections/ChatTicketsSection'))
const BentoEcosystem = lazy(() => import('@/sections/BentoEcosystem'))
const SusuEngineSection = lazy(() => import('@/sections/SusuEngineSection'))
const AzmAuctionSection = lazy(() => import('@/sections/AzmAuctionSection'))
const AppShowcase = lazy(() => import('@/sections/AppShowcase'))
const StatsSection = lazy(() => import('@/sections/StatsSection'))
const InvestorSection = lazy(() => import('@/sections/InvestorSection'))
const FAQSection = lazy(() => import('@/sections/FAQSection'))
const ClosingSection = lazy(() => import('@/sections/ClosingSection'))

export default function Home() {
  return (
    <>
      <HeroBridge />
      <LiveTickerSection />
      <Suspense fallback={null}>
        <ChatTicketsSection />
        <BentoEcosystem />
        <SusuEngineSection />
        <AzmAuctionSection />
        <AppShowcase />
        <StatsSection />
        <InvestorSection />
        <FAQSection />
        <ClosingSection />
      </Suspense>
    </>
  )
}
