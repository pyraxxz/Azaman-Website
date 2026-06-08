import type React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'

interface FooterLink {
  label: string
  /** Either a hash (#section) or absolute path (/vendors). */
  to: string
}

export default function FooterSection() {
  const { theme } = useTheme()
  const { scrollTo } = useLenis()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault()
    if (to.startsWith('/')) {
      navigate(to)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => scrollTo(to, { offset: -64 }), 80)
    } else {
      scrollTo(to, { offset: -64 })
    }
  }

  const sections: { title: string; links: FooterLink[] }[] = [
    {
      title: 'Product',
      links: [
        { label: 'Ecosystem', to: '#ecosystem' },
        { label: 'Susu Engine', to: '#susu' },
        { label: 'Vendor Auction', to: '#auction' },
        { label: 'Become a Vendor', to: '/vendors' },
        { label: 'App Showcase', to: '#showcase' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '#ecosystem' },
        { label: 'Investors', to: '#investors' },
        { label: 'FAQ', to: '#faq' },
        { label: 'Contact', to: '#download' },
        { label: 'Press', to: '#investors' },
      ],
    },
    {
      title: 'Legal',
      // TODO: replace placeholder hrefs with /privacy /terms /aml routes once those pages are built
      links: [
        { label: 'Privacy Policy', to: '#download' },
        { label: 'Terms of Service', to: '#download' },
        { label: 'AML/CFT Policy', to: '#download' },
        { label: 'Act 1154 License', to: '#download' },
        { label: 'Cookie Settings', to: '#download' },
      ],
    },
  ]

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <span
              className="text-xl font-black tracking-tight inline-block mb-4"
              style={{
                fontFamily: 'Space Grotesk',
                color: theme.accent,
                textShadow: `0 0 20px ${theme.accent}50`,
              }}
            >
              AZAMAN
            </span>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textMuted }}>
              The future of P2P finance in Africa. Trade, save, and grow your wealth with the most
              advanced platform built for emerging markets.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'X', href: 'https://x.com/azaboraApp', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/azaman', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: 'GitHub', href: 'https://github.com/pyraxxz', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-[0.92]"
                  style={{
                    backgroundColor: `${theme.accent}10`,
                    border: `1px solid ${theme.border}`,
                    color: theme.textSecondary,
                  }}
                  data-cursor="hover"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4
                className="font-bold text-sm mb-4"
                style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.to}
                      onClick={(e) => handleClick(e, item.to)}
                      className="text-sm transition-colors cursor-pointer hover:opacity-100"
                      style={{ color: theme.textMuted }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = theme.accent)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = theme.textMuted)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between relative"
          style={{ borderTop: 'none' }}
        >
          {/* Gradient separator */}
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${theme.border}, transparent)` }} />

          <p className="text-xs text-center sm:text-left" style={{ color: theme.textMuted }}>
            © {new Date().getFullYear()} Azaman Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs" style={{ color: theme.textMuted }}>
              <span>Licensed VASP under Act 1154 (2025)</span>
              <span className="hidden sm:inline">·</span>
              <span>Accra, Ghana 🇬🇭</span>
            </div>
            {/* Back to top */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:scale-105 active:scale-[0.97]"
              style={{
                backgroundColor: `${theme.accent}10`,
                border: `1px solid ${theme.border}`,
                color: theme.textMuted,
              }}
              aria-label="Back to top"
              data-cursor="hover"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
