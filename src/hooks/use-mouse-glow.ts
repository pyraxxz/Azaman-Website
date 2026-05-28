// =============================================================================
// useMouseGlow — anamorphic radial glow that follows the cursor inside an
// element. Updates two CSS custom properties: --mx, --my (in % of the box).
// The host element styles its own glow layer using those vars; this keeps it
// theme-agnostic and lets us re-use it everywhere.
// =============================================================================

import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function useMouseGlow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
    el.style.setProperty('--glow-opacity', '0')

    const mxTo = gsap.quickTo(el, '--mx' as never, { duration: 0.35, ease: 'power3.out' })
    const myTo = gsap.quickTo(el, '--my' as never, { duration: 0.35, ease: 'power3.out' })
    const oTo = gsap.quickTo(el, '--glow-opacity' as never, { duration: 0.35, ease: 'power3.out' })

    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      mxTo(px)
      myTo(py)
      oTo(1)
    }
    function onLeave() {
      oTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return ref
}
