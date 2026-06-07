// =============================================================================
// useScrollAnim — thin wrapper around useGSAP that auto-cleans ScrollTriggers.
// Pass a setup function that receives the element ref and returns nothing or a
// gsap.context cleanup. ScrollTrigger.refresh is called on theme changes to
// keep pin durations correct after layout shifts.
// =============================================================================

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTheme } from '@/contexts/ThemeContext'

type SetupFn = (ctx: { ref: React.RefObject<HTMLElement | null>; gsap: typeof gsap }) => void | (() => void)

export function useScrollAnim<T extends HTMLElement = HTMLElement>(setup: SetupFn) {
  const ref = useRef<T>(null)
  const { themeId } = useTheme()

  useGSAP(
    () => {
      const cleanup = setup({ ref: ref as unknown as React.RefObject<HTMLElement | null>, gsap })
      return typeof cleanup === 'function' ? cleanup : undefined
    },
    { scope: ref, dependencies: [themeId] }
  )

  // After theme change, layout heights can shift — refresh ScrollTrigger.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => window.clearTimeout(id)
  }, [themeId])

  return ref
}
