// =============================================================================
// PreloaderAnimation - first-visit-only branded loader.
// Renders a full-screen themed overlay once per session (sessionStorage key
// 'az_loaded'), then animates itself out with GSAP and unmounts.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

const SESSION_KEY = 'az_loaded'

export default function PreloaderAnimation() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) !== '1'
  })

  const overlayRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    if (!overlay) return

    const finish = () => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setMounted(false)
    }

    // Reduced motion: skip every tween, dismiss on the next frame.
    if (prefersReducedMotion()) {
      const t = setTimeout(finish, 300)
      return () => clearTimeout(t)
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'left center' }
      )
      gsap.fromTo(
        loadingRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.2 }
      )
      gsap.to(overlay, {
        scale: 1.06,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        delay: 0.9,
        onComplete: finish,
      })
    }, overlay)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: theme.background, zIndex: 9999 }}
      aria-hidden="true"
    >
      <div
        ref={wordmarkRef}
        className="font-black text-[40px] lg:text-[56px]"
        style={{ fontFamily: 'Space Grotesk', color: theme.accent, letterSpacing: '-0.04em' }}
      >
        AZAMAN
      </div>
      <div
        className="mt-4 h-[2px] w-[200px] overflow-hidden rounded-full"
        style={{ backgroundColor: theme.border }}
      >
        <div
          ref={fillRef}
          className="h-full w-full rounded-full"
          style={{ backgroundColor: theme.accent, transformOrigin: 'left center' }}
        />
      </div>
      <div
        ref={loadingRef}
        className="mt-3 text-xs"
        style={{ fontFamily: 'Inter', fontWeight: 400, color: theme.textMuted }}
      >
        Loading
      </div>
    </div>
  )
}
