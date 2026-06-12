// =============================================================================
// AZAMAN - Centralized GSAP setup
// One place to register plugins, expose easing tokens, and detect reduced motion.
// =============================================================================

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Flip } from 'gsap/Flip'

// Register plugins exactly once. Idempotent: re-registration is a no-op in GSAP 3.
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Flip)

// Default eases tuned to the "slender / cinematic" feel the brand wants.
export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expressive: 'expo.out',
  back: 'back.out(1.4)',
} as const

export const DUR = {
  micro: 0.25,
  base: 0.6,
  long: 1.1,
  cinematic: 1.6,
} as const

/** True if the user has requested reduced motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Re-export so consumers don't need a second import. */
export { gsap, ScrollTrigger, MotionPathPlugin, Flip }
