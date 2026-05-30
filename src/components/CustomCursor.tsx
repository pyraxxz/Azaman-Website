// =============================================================================
// CUSTOM CURSOR — high-performance custom cursor with state machine
// Only renders on devices with fine pointer (desktop). Uses refs + rAF for
// 60fps updates without React re-renders.
// =============================================================================

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

type CursorState = 'default' | 'hover' | 'text' | 'hidden'

export default function CustomCursor() {
  const { theme } = useTheme()

  // Guard: only mount on devices with fine pointer (no touch)
  const canHover = useRef(false)
  if (typeof window !== 'undefined') {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const ringX = useRef(0)
  const ringY = useRef(0)
  const rafId = useRef<number>(0)
  const stateRef = useRef<CursorState>('default')
  const reducedMotion = useRef(false)

  const applyState = useCallback((state: CursorState) => {
    if (stateRef.current === state) return
    stateRef.current = state
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    switch (state) {
      case 'default':
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderRadius = '50%'
        ring.style.background = 'transparent'
        ring.style.border = `1.5px solid ${theme.accent}70`
        ring.style.opacity = '1'
        dot.style.opacity = '1'
        dot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%) scale(1)`
        break
      case 'hover':
        ring.style.width = '56px'
        ring.style.height = '56px'
        ring.style.borderRadius = '50%'
        ring.style.background = `${theme.accent}12`
        ring.style.border = `1.5px solid ${theme.accent}70`
        ring.style.opacity = '1'
        dot.style.opacity = '0'
        break
      case 'text':
        ring.style.width = '3px'
        ring.style.height = '28px'
        ring.style.borderRadius = '3px'
        ring.style.background = `${theme.accent}80`
        ring.style.border = 'none'
        ring.style.opacity = '1'
        dot.style.opacity = '0'
        break
      case 'hidden':
        ring.style.opacity = '0'
        dot.style.opacity = '0'
        break
    }
  }, [theme.accent])

  useEffect(() => {
    if (!canHover.current) return

    // Check reduced motion preference
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Add class to hide native cursor
    document.documentElement.classList.add('custom-cursor-active')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Mouse move handler — direct DOM mutation for zero-lag dot
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      // Dot follows instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(${stateRef.current === 'default' ? 1 : 0.6})`

      if (reducedMotion.current) {
        // Skip lerp — apply directly
        ringX.current = e.clientX
        ringY.current = e.clientY
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    // rAF loop for ring lerp
    const loop = () => {
      if (!reducedMotion.current) {
        ringX.current += (mouseX.current - ringX.current) * 0.12
        ringY.current += (mouseY.current - ringY.current) * 0.12
        ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    // Delegated mouseover for state detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target || !target.closest) return

      if (target.closest('input,textarea,select,[data-cursor="hidden"]')) {
        applyState('hidden')
      } else if (target.closest('a,button,[role="button"],[data-cursor="hover"]')) {
        applyState('hover')
      } else if (target.closest('p,h1,h2,h3,h4,h5,h6,span,label,[data-cursor="text"]')) {
        applyState('text')
      } else {
        applyState('default')
      }
    }

    // Click flash
    const onMouseDown = () => {
      if (dot) {
        dot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%) scale(0.6)`
      }
    }
    const onMouseUp = () => {
      if (dot) {
        dot.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%) scale(1)`
      }
    }

    // Mouse leave window — hide cursor
    const onMouseLeave = () => {
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
    }
    const onMouseEnter = () => {
      applyState(stateRef.current)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [applyState])

  // Update ring/dot colors when theme changes
  useEffect(() => {
    if (!canHover.current) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    dot.style.background = theme.accent
    // Re-apply current state with new theme colors
    const currentState = stateRef.current
    stateRef.current = '' as CursorState // force re-apply
    applyState(currentState)
  }, [theme.accent, applyState])

  // Don't render on touch/mobile
  if (typeof window === 'undefined') return null
  if (!canHover.current) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 99999,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Inner dot — zero lag */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: theme.accent,
          willChange: 'transform',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Outer ring — lerp follow */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1.5px solid ${theme.accent}70`,
          background: 'transparent',
          willChange: 'transform',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.18s ease, height 0.18s ease, border-radius 0.18s ease, background 0.18s ease, opacity 0.18s ease',
        }}
      />
    </div>
  )
}
