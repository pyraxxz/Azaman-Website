import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Palette, Check } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'

const NAV_LINKS = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Susu', href: '#susu' },
  { label: 'Auction', href: '#auction' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navigation() {
  const { theme, themeId, setThemeId, themes } = useTheme()
  const { scrollTo } = useLenis()
  const navigate = useNavigate()
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [themePickerOpen, setThemePickerOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      if (currentY < 10) {
        setVisible(true)
      } else if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false)
        setMobileOpen(false)
        setThemePickerOpen(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close theme picker when clicking outside
  useEffect(() => {
    if (!themePickerOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-theme-picker]')) setThemePickerOpen(false)
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [themePickerOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    // Absolute path → React Router
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    // Anchor link
    if (location.pathname !== '/') {
      // Go home first, then scroll once the layout has rendered
      navigate('/')
      window.setTimeout(() => scrollTo(href, { offset: -64 }), 80)
    } else {
      scrollTo(href, { offset: -64 })
    }
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? `${theme.background}D9` : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            if (location.pathname !== '/') {
              navigate('/')
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="relative">
            <span
              className="text-xl font-black tracking-tight"
              style={{
                fontFamily: 'Space Grotesk',
                color: theme.accent,
                textShadow: `0 0 20px ${theme.accent}60`,
              }}
            >
              AZAMAN
            </span>
            <span
              className="absolute -top-1 -right-3 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: theme.success }}
            />
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{ color: theme.textSecondary }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: theme picker + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme picker */}
          <div className="relative" data-theme-picker>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setThemePickerOpen(!themePickerOpen)
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: themePickerOpen ? `${theme.accent}20` : `${theme.surface}80`,
                border: `1px solid ${themePickerOpen ? theme.accent : theme.border}`,
              }}
              aria-label="Change theme"
              title="Change theme"
            >
              <span className="text-base">{theme.icon}</span>
            </button>
            <AnimatePresence>
              {themePickerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full right-0 mt-2 p-3 rounded-2xl w-[280px] sm:w-[320px]"
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

          {/* Sign In (desktop only) */}
          <a
            href="#download"
            onClick={(e) => handleClick(e, '#download')}
            className="hidden lg:inline text-sm font-medium transition-colors px-3 py-2"
            style={{ color: theme.textSecondary }}
          >
            Sign In
          </a>

          {/* CTA */}
          <motion.a
            href="#download"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, '#download')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer items-center gap-2"
            style={{
              backgroundColor: theme.accent,
              color: theme.isDark ? '#000' : '#fff',
              boxShadow: `0 0 20px ${theme.accent}40`,
            }}
          >
            Download
          </motion.a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ color: theme.textPrimary }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden py-4 px-5"
            style={{
              backgroundColor: `${theme.background}F5`,
              borderTop: `1px solid ${theme.border}`,
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block py-3 text-sm font-medium transition-colors"
                style={{ color: theme.textSecondary }}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${theme.border}` }}>
              <a
                href="#download"
                onClick={(e) => handleClick(e, '#download')}
                className="text-sm font-medium"
                style={{ color: theme.textMuted }}
              >
                Sign In
              </a>
              <a
                href="#download"
                onClick={(e) => handleClick(e, '#download')}
                className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-center block"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.isDark ? '#000' : '#fff',
                  boxShadow: `0 0 20px ${theme.accent}40`,
                }}
              >
                Download App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
