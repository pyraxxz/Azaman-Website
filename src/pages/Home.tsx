// =============================================================================
// Home - the cinematic landing page. Extracted from App so React Router can
// handle additional routes (e.g. /vendors) cleanly.
// Below-the-fold sections are lazy-loaded so the hero is interactive faster.
// =============================================================================

import { lazy, Suspense } from 'react'
import HeroBridge from '@/sections/HeroBridge'

const BuyDirectSection = lazy(() => import('@/sections/BuyDirectSection'))
const HowItWorksSection = lazy(() => import('@/sections/HowItWorksSection'))
const LiveMarketSection = lazy(() => import('@/sections/LiveMarketSection'))
const ChatTicketsSection = lazy(() => import('@/sections/ChatTicketsSection'))
const BentoEcosystem = lazy(() => import('@/sections/BentoEcosystem'))
const SusuEngineSection = lazy(() => import('@/sections/SusuEngineSection'))
const InfrastructureSection = lazy(() => import('@/sections/InfrastructureSection'))
const AfricaSection = lazy(() => import('@/sections/AfricaSection'))
const AzmAuctionSection = lazy(() => import('@/sections/AzmAuctionSection'))
const AppShowcase = lazy(() => import('@/sections/AppShowcase'))
const InvestorSection = lazy(() => import('@/sections/InvestorSection'))
const FAQSection = lazy(() => import('@/sections/FAQSection'))
const ClosingSection = lazy(() => import('@/sections/ClosingSection'))

export default function Home() {
  return (
    <>
      <HeroBridge />
      <Suspense fallback={null}>
        <BuyDirectSection />
        <HowItWorksSection />
        <LiveMarketSection />
        <ChatTicketsSection />
        <BentoEcosystem />
        <SusuEngineSection />
        <InfrastructureSection />
        <AfricaSection />
        <AzmAuctionSection />
        <AppShowcase />
        <InvestorSection />
        <FAQSection />
        <ClosingSection />
      </Suspense>
    </>
  )
}
