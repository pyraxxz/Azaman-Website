// =============================================================================
// HScrollRail - focus carousel on mobile, normal grid on desktop.
// On mobile the rail centre-snaps and "locks" onto the nearest card: the
// centred card is full size/opacity, its neighbours shrink and dim, and a dot
// strip tracks position - the same idiom used across the showcase sections.
// Desktop (md+) falls back to a static grid.
// =============================================================================

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface HScrollRailProps {
  items: ReactNode[]
  /** Tailwind grid columns applied at md+ (e.g. "md:grid-cols-4"). */
  gridClass: string
  /** Kept for API compatibility; mobile width is handled internally now. */
  itemClass?: string
}

// Mobile card width and the spacer needed to centre the first / last card.
const CARD_W = 'min(78vw, 300px)'
const SPACER = `calc(50% - ${CARD_W} / 2)`

export default function HScrollRail({ items, gridClass }: HScrollRailProps) {
  const { theme } = useTheme()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track which card sits nearest the horizontal centre of the scroller.
  useEffect(() => {
    if (isWide) return
    const scroller = scrollerRef.current
    if (!scroller) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const cards = scroller.querySelectorAll<HTMLElement>('[data-rail-item]')
        const center = scroller.scrollLeft + scroller.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        cards.forEach((el, i) => {
          const c = el.offsetLeft + el.offsetWidth / 2
          const d = Math.abs(c - center)
          if (d < bestDist) { bestDist = d; best = i }
        })
        setActive(best)
      })
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { scroller.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [isWide])

  const goTo = (i: number) => {
    const el = scrollerRef.current?.querySelectorAll<HTMLElement>('[data-rail-item]')[i]
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  // Desktop: static grid.
  if (isWide) {
    return (
      <div className={`grid gap-4 ${gridClass}`}>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    )
  }

  // Mobile: centre-snap focus carousel.
  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', gap: 16 }}
      >
        <div className="shrink-0" style={{ width: SPACER }} aria-hidden="true" />
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <div
              key={i}
              data-rail-item
              className="shrink-0 snap-center transition-all duration-500 ease-out"
              style={{
                width: CARD_W,
                transform: `scale(${isActive ? 1 : 0.9})`,
                opacity: isActive ? 1 : 0.45,
                filter: isActive ? 'none' : 'saturate(0.7)',
              }}
            >
              {item}
            </div>
          )
        })}
        <div className="shrink-0" style={{ width: SPACER }} aria-hidden="true" />
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 26 : 8,
              height: 8,
              backgroundColor: i === active ? theme.accent : `${theme.textMuted}55`,
              boxShadow: i === active ? `0 0 12px ${theme.accent}80` : 'none',
            }}
            data-cursor="hover"
          />
        ))}
      </div>
    </div>
  )
}
