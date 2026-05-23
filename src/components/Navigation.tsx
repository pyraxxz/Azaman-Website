import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'App', href: '#showcase' },
  { label: 'Themes', href: '#themes' },
  { label: 'Investors', href: '#investors' },
]

export default function Navigation() {
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ffd700] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
            AZAMAN
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium text-[#888] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-[#888] hover:text-white transition-colors">
            Sign In
          </a>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00d4ff] to-[#00ff88] shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-shadow"
          >
            Download App
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-white/5 py-4 px-5"
          style={{ background: 'rgba(5, 5, 8, 0.98)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block py-3 text-sm font-medium text-[#aaa] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
            <a href="#" className="text-sm font-medium text-[#888]">Sign In</a>
            <button className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00d4ff] to-[#00ff88]">
              Download App
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
