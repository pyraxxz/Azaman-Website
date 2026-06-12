// =============================================================================
// useTilt3D - pointer-tracking 3D perspective tilt for cards and mockups.
// Uses GSAP quickTo for damped interpolation. Honors reduced motion.
// Returns a ref + handlers to spread on the target element.
// =============================================================================

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface Options {
  /** Max rotation in degrees on each axis. */
  max?: number
  /** Lift on Z (translateZ) when hovered, in px. */
  lift?: number
  /** Glare layer? When true the host should render a child with [data-tilt-glare]. */
  glare?: boolean
  /** Disable on touch devices to avoid jitter. */
  disableOnTouch?: boolean
  /** Enable finger-drag tilt on touch devices (mirrors desktop mouse-move).
   *  Sets touch-action:none on the element so the drag tilts instead of scrolls. */
  touch?: boolean
}

export function useTilt3D<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const { max = 8, lift = 14, glare = true, disableOnTouch = true, touch = false } = options
  const ref = useRef<T>(null)
  const glareRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    // Skip on touch devices ONLY when finger-drag tilt isn't explicitly enabled.
    if (disableOnTouch && !touch && window.matchMedia('(hover: none)').matches) return

    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'
    // When touch tilt is on, claim the gesture so a finger drag tilts the
    // element (fires pointermove) instead of scrolling the page.
    if (touch) el.style.touchAction = 'none'

    glareRef.current = el.querySelector<HTMLElement>('[data-tilt-glare]')

    const xTo = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const zTo = gsap.quickTo(el, 'z', { duration: 0.6, ease: 'power3.out' })
    const glareXTo = glareRef.current
      ? gsap.quickTo(glareRef.current, 'x', { duration: 0.4, ease: 'power3.out' })
      : null
    const glareYTo = glareRef.current
      ? gsap.quickTo(glareRef.current, 'y', { duration: 0.4, ease: 'power3.out' })
      : null
    const glareOTo = glareRef.current
      ? gsap.quickTo(glareRef.current, 'opacity', { duration: 0.4, ease: 'power3.out' })
      : null

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height // 0..1
      const rx = (0.5 - py) * max * 2 // up = +rx
      const ry = (px - 0.5) * max * 2 // right = +ry
      xTo(ry)
      yTo(rx)
      zTo(lift)
      if (glare && glareXTo && glareYTo && glareOTo) {
        glareXTo(rect.width * (px - 0.5) * 1.4)
        glareYTo(rect.height * (py - 0.5) * 1.4)
        glareOTo(0.55)
      }
    }
    function onLeave() {
      xTo(0)
      yTo(0)
      zTo(0)
      if (glareOTo) glareOTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointercancel', onLeave)
    el.addEventListener('pointerup', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointercancel', onLeave)
      el.removeEventListener('pointerup', onLeave)
      gsap.set(el, { clearProps: 'transform,z,rotationX,rotationY,willChange' })
    }
  }, [max, lift, glare, disableOnTouch, touch])

  return ref
}
