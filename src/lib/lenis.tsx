// =============================================================================
// AZAMAN — LenisProvider
// Wires Studio Freight's Lenis smooth-scroll into the React tree, syncs it with
// GSAP ScrollTrigger, and exposes a useLenis() hook + a scroll-velocity context
// that downstream components (e.g. ParticleCanvas) can read.
// =============================================================================

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { ScrollTrigger, prefersReducedMotion } from './gsap'

interface LenisContextValue {
  /** Latest scroll velocity in px/frame. Updated continuously. */
  velocityRef: React.MutableRefObject<number>
  /** Smoothly clamped 0..1 "intensity" used by visual effects. */
  intensityRef: React.MutableRefObject<number>
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; duration?: number }) => void
}

const LenisContext = createContext<LenisContextValue | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const velocityRef = useRef(0)
  const intensityRef = useRef(0)

  useEffect(() => {
    // Reduced motion: skip Lenis entirely so screen-readers + system prefs are honored.
    if (prefersReducedMotion()) {
      ScrollTrigger.defaults({ scroller: window })
      return
    }

    const instance = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      // Lenis v1 disables touch smoothing by default — keeps native iOS momentum.
      // We respect that for accessibility.
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = instance

    let rafId = 0
    function raf(time: number) {
      instance.raf(time)
      // Velocity is exposed via instance.velocity (px/ms internally).
      const v = Math.abs(instance.velocity)
      velocityRef.current = v
      // Smooth toward the new value (eased low-pass filter).
      const target = Math.min(1, v / 60)
      intensityRef.current += (target - intensityRef.current) * 0.12
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Bridge Lenis -> ScrollTrigger so any GSAP ScrollTrigger animations stay in sync.
    instance.on('scroll', ScrollTrigger.update)
    // Tell ScrollTrigger to trust our RAF, not its own ticker, for scroll values.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          instance.scrollTo(value, { immediate: true })
        }
        return window.scrollY
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })
    ScrollTrigger.defaults({ scroller: document.documentElement })

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      ScrollTrigger.defaults({ scroller: window })
      lenisRef.current = null
    }
  }, [])

  const value = useMemo<LenisContextValue>(
    () => ({
      velocityRef,
      intensityRef,
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current
        if (lenis) {
          lenis.scrollTo(target as never, { offset: opts?.offset, duration: opts?.duration })
        } else if (typeof target === 'string') {
          const el = document.querySelector(target)
          el?.scrollIntoView({ behavior: 'smooth' })
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'smooth' })
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      },
    }),
    []
  )

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}

export function useLenis(): LenisContextValue {
  const ctx = useContext(LenisContext)
  if (!ctx) throw new Error('useLenis must be used within a LenisProvider')
  return ctx
}
