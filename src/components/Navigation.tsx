// =============================================================================
// NAVIGATION — Floating island nav
// Starts full-width. After 80px scroll → collapses to pill (680px, rounded).
// GSAP ScrollTrigger scrub for the morph. IntersectionObserver for active link.
// =============================================================================

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Palette, Check } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'
import { useMagnetic } from '@/hooks/use-magnetic'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Susu', href: '#susu' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Investors', href: '#investors' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navigation() {
  const { theme, themeId, setThemeId, themes } = useTheme()
  const { scrollTo } = useLenis()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [themePickerOpen, setThemePickerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const navRef = useRef<HTMLElement>(null)
  const navInnerRef = useRef<HTMLDivElement>(null)
  const dlRef = useMagnetic<HTMLSpanElement>(0.4)

  // ─── GSAP pill morph on scroll ───────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) return
    const nav = navRef.current
    const inner = navInnerRef.current
    if (!nav || !inner) return

    // Only do the pill morph on desktop
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '80px top',
          scrub: 0.6,
        },
      })

      tl.fromTo(
        inner,
        {
          maxWidth: '100%',
          borderRadius: '0px',
          padding: '0 48px',
        },
        {
          maxWidth: '680px',
          borderRadius: '99px',
          padding: '0 24px',
          ease: 'none',
        }
      )

      return () => {
        tl.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  // ─── IntersectionObserver for active section ─────────────────────────────────
  useEffect(() => {
    if (location.pathname !== '/') return

    const sectionIds = ['features', 'susu', 'vendors', 'investors', 'faq', 'ecosystem', 'auction', 'stats']
    const observers: IntersectionObserver[] = []

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    observers.push(observer)

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [location.pathname])

  // ─── Close theme picker on outside click ─────────────────────────────────────
  useEffect(() => {
    if (!themePickerOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-theme-picker]')) setThemePickerOpen(false)
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [themePickerOpen])

  // ─── Lock body scroll when mobile menu open ──────────────────────────────────
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ─── Navigation handler ──────────────────────────────────────────────────────
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)

    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => scrollTo(href, { offset: -80 }), 100)
    } else {
      scrollTo(href, { offset: -80 })
    }
  }, [navigate, location.pathname, scrollTo])

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ padding: '12px 16px' }}
      >
        <div
          ref={navInnerRef}
          className="pointer-events-auto w-full flex items-center justify-between h-[56px]"
          style={{
            maxWidth: '100%',
            borderRadius: '0px',
            padding: '0 48px',
            backgroundColor: `${theme.background}D9`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'background-color 0.3s, border-color 0.3s',
          }}
        >
          {/* Left: AZAMAN wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              if (location.pathname !== '/') navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="shrink-0"
            aria-label="Azaman home"
          >
            <span
              className="text-lg font-black tracking-tight text-gradient-flow"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              AZAMAN
            </span>
          </a>

          {/* Center: Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith('#')
                ? activeSection === link.href
                : location.pathname === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative text-[13px] font-medium transition-colors duration-200 py-1"
                  style={{
                    color: isActive ? theme.accent : theme.textSecondary,
                  }}
                  data-cursor="hover"
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ease-out"
                    style={{
                      width: isActive ? '100%' : '0%',
                      backgroundColor: theme.accent,
                    }}
                  />
                </a>
              )
            })}
          </div>

          {/* Right: Theme picker + CTA + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme picker */}
            <div className="relative" data-theme-picker>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setThemePickerOpen(!themePickerOpen)
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: themePickerOpen ? `${theme.accent}20` : `${theme.surface}80`,
                  border: `1px solid ${themePickerOpen ? theme.accent : theme.border}`,
                }}
                aria-label="Change theme"
                title="Change theme"
                data-cursor="hover"
              >
                <span className="text-sm">{themes.find(t => t.id === themeId)?.icon}</span>
              </button>
              <AnimatePresence>
                {themePickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 p-3 rounded-2xl w-[280px] sm:w-[320px]"
                    style={{
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 24px ${theme.glow}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <Palette size={14} style={{ color: theme.accent }} />
                      <span className="text-xs font-bold tracking-wider uppercase" style={{ color: theme.textMuted }}>
                        Pick a theme
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {themes.map((t) => {
                        const isActive = themeId === t.id
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setThemeId(t.id)
                              setTimeout(() => setThemePickerOpen(false), 250)
                            }}
                            className="relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all hover:scale-105"
                            style={{
                              backgroundColor: isActive ? `${t.accent}20` : 'transparent',
                              border: `1px solid ${isActive ? t.accent : 'transparent'}`,
                            }}
                            title={t.name}
                            data-cursor="hover"
                          >
                            <div className="relative">
                              <div
                                className="w-8 h-8 rounded-full"
                                style={{
                                  background: `linear-gradient(135deg, ${t.background}, ${t.surface})`,
                                  border: `2px solid ${t.accent}`,
                                  boxShadow: isActive ? `0 0 12px ${t.glow}80` : 'none',
                                }}
                              />
                              {isActive && (
                                <div
                                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: t.accent, color: t.isDark ? '#000' : '#fff' }}
                                >
                                  <Check size={10} strokeWidth={3} />
                                </div>
                              )}
                            </div>
                            <span className="text-[9px] font-medium truncate w-full text-center" style={{ color: theme.textSecondary }}>
                              {t.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download App CTA — desktop only */}
            <span ref={dlRef} className="hidden md:inline-block">
            <a
              href="#download"
              onClick={(e) => handleClick(e, '#download')}
              className="inline-flex items-center px-4 py-[7px] rounded-full text-[13px] font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff',
                height: 36,
                boxShadow: `0 0 20px ${theme.accent}40`,
              }}
              data-cursor="hover"
            >
              Download App
            </a>
            </span>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ color: theme.textPrimary }}
              data-cursor="hover"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile overlay ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[49] flex flex-col items-center justify-center md:hidden"
            style={{
              backgroundColor: `${theme.background}F5`,
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                backgroundColor: `${theme.surface}80`,
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary,
              }}
            >
              <X size={20} />
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-12">
              {NAV_LINKS.map((link, i) => {
                const isActive = link.href.startsWith('#')
                  ? activeSection === link.href
                  : location.pathname === link.href
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[32px] font-semibold transition-all duration-200"
                    style={{
                      fontFamily: 'Space Grotesk',
                      color: isActive ? theme.accent : theme.textPrimary,
                    }}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
            </div>

            {/* Bottom CTA */}
            <motion.a
              href="#download"
              onClick={(e) => handleClick(e, '#download')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute bottom-12 px-8 py-4 rounded-full text-base font-semibold"
              style={{
                backgroundColor: theme.accent,
                color: theme.isDark ? '#000' : '#fff',
                boxShadow: `0 0 28px ${theme.accent}50`,
              }}
            >
              Download App
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
