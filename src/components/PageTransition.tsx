// =============================================================================
// PAGE TRANSITION — full-screen accent overlay sweep between routes
// Uses scaleY animation: covering from bottom, revealing from top.
// z-index 99998 (just below custom cursor).
// =============================================================================

import { useEffect, useRef, useState, Children, cloneElement, isValidElement, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'

type TransitionStage = 'idle' | 'covering' | 'revealing'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { theme } = useTheme()
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<TransitionStage>('idle')
  const overlayRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef(location.pathname)
  const reducedMotion = useRef(false)

  // Check reduced motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }, [])

  // Trigger transition on route change
  useEffect(() => {
    if (location.pathname === prevPathRef.current) return
    prevPathRef.current = location.pathname

    if (reducedMotion.current) {
      // Skip animation entirely
      setDisplayLocation(location)
      window.scrollTo(0, 0)
      return
    }

    // Start covering
    setTransitionStage('covering')
  }, [location])

  // Handle animation end on overlay
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    const onAnimationEnd = () => {
      if (transitionStage === 'covering') {
        // Swap content, reset scroll, start revealing
        setDisplayLocation(location)
        window.scrollTo(0, 0)
        setTransitionStage('revealing')
      } else if (transitionStage === 'revealing') {
        setTransitionStage('idle')
      }
    }

    overlay.addEventListener('animationend', onAnimationEnd)
    return () => overlay.removeEventListener('animationend', onAnimationEnd)
  }, [transitionStage, location])

  // Determine overlay styles based on stage
  const getOverlayStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      zIndex: 99998,
      pointerEvents: 'none',
      background: theme.accent,
      display: transitionStage === 'idle' ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    if (transitionStage === 'covering') {
      return {
        ...base,
        transformOrigin: 'bottom center',
        animation: 'pageTransitionCover 0.45s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      }
    }

    if (transitionStage === 'revealing') {
      return {
        ...base,
        transformOrigin: 'top center',
        animation: 'pageTransitionReveal 0.45s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      }
    }

    return base
  }

  const getWordmarkStyle = (): React.CSSProperties => {
    return {
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      fontWeight: 900,
      fontSize: 32,
      color: theme.isDark ? '#000' : '#fff',
      opacity: transitionStage === 'covering' || transitionStage === 'revealing' ? 1 : 0,
      transition: 'opacity 0.2s ease',
      letterSpacing: '-0.02em',
    }
  }

  // Clone Routes children and inject displayLocation
  const renderedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<{ location?: typeof displayLocation }>, {
        location: displayLocation,
      })
    }
    return child
  })

  return (
    <>
      {/* Overlay */}
      <div ref={overlayRef} style={getOverlayStyle()} aria-hidden="true">
        <span style={getWordmarkStyle()}>
          AZAMAN
        </span>
      </div>

      {/* Render children at displayLocation */}
      {renderedChildren}
    </>
  )
}
