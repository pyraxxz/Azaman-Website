// =============================================================================
// Home — the cinematic landing page. The hero ships in the main bundle so it
// paints fast; everything below the fold is code-split via React.lazy + a
// scroll-triggered loader so phones don't pay the full bundle on first paint.
// =============================================================================

import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from 'react'
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

/**
 * Mounts a lazy section only after a placeholder enters the viewport. Keeps
 * the initial JS payload small while preserving the visual flow.
 */
function LazySection({
  loader,
  minHeight = 600,
}: {
  loader: () => ComponentType
  minHeight?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [Component, setComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setComponent(() => loader())
          obs.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
    // loader is stable per call site
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} style={{ minHeight: Component ? undefined : minHeight }}>
      {Component ? (
        <Suspense fallback={<div style={{ minHeight }} />}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <HeroBridge />
      <LiveTickerSection />
      <LazySection loader={() => ChatTicketsSection} />
      <LazySection loader={() => BentoEcosystem} />
      <LazySection loader={() => SusuEngineSection} />
      <LazySection loader={() => AzmAuctionSection} />
      <LazySection loader={() => AppShowcase} />
      <LazySection loader={() => StatsSection} minHeight={400} />
      <LazySection loader={() => InvestorSection} />
      <LazySection loader={() => FAQSection} />
      <LazySection loader={() => ClosingSection} />
    </>
  )
}
