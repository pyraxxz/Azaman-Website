// =============================================================================
// useInViewport — lightweight IntersectionObserver. Components use it to pause
// expensive work (RAF loops, intervals, GSAP timelines) when they're offscreen.
// =============================================================================

import { useEffect, useRef, useState } from 'react'

export function useInViewport<T extends Element = HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
