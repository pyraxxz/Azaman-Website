import type React from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'

interface FooterLink {
  label: string
  /** Either a hash (#section) or absolute path (/vendors). */
  to: string
}

// Brand glyphs as inline SVG - lucide dropped brand icons, so we keep paths
// inline (the same convention the original footer used).
const SOCIAL: { label: string; svg: ReactNode }[] = [
  {
    label: 'X',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: 'Discord',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106a13.1 13.1 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.84 19.84 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" /></svg>,
  },
  {
    label: 'Instagram',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    label: 'LinkedIn',
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
]

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

  const sections: { title: string; links: FooterLink[]; note?: string }[] = [
    {
      title: 'Product',
      links: [
        { label: 'P2P Trading', to: '#live-market' },
        { label: 'Susu Savings', to: '#susu' },
        { label: 'Smart Routes', to: '#ecosystem' },
        { label: 'Vaults', to: '#ecosystem' },
        { label: 'AZM Rewards', to: '#auction' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '#ecosystem' },
        { label: 'Investors', to: '#investors' },
        { label: 'Become a Vendor', to: '/vendors' },
        { label: 'Press Kit', to: '#investors' },
        { label: 'FAQ', to: '#faq' },
        { label: 'Contact', to: '#download' },
      ],
    },
    {
      title: 'Legal & Compliance',
      links: [
        { label: 'Privacy Policy', to: '#download' },
        { label: 'Terms of Service', to: '#download' },
        { label: 'AML/CFT Policy', to: '#download' },
        { label: 'Act 1154 Info', to: '#download' },
      ],
      note: "Licensed VASP operating under Ghana's Payment Systems Act (Act 987) and Virtual Assets Act (Act 1154).",
    },
  ]

  return (
    <footer
      className="border-t"
      style={{ backgroundColor: theme.surface, borderColor: theme.border }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span
              className="inline-block"
              style={{ fontFamily: 'Space Grotesk', fontWeight: 900, fontSize: 24, color: theme.accent, letterSpacing: '-0.04em' }}
            >
              AZAMAN
            </span>
            <p className="mt-2" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 13, color: theme.textMuted }}>
              The future of African finance.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex items-center justify-center transition-all"
                  style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: theme.card, border: `1px solid ${theme.border}`, color: theme.textMuted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.accent
                    e.currentTarget.style.borderColor = theme.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textMuted
                    e.currentTarget.style.borderColor = theme.border
                  }}
                  data-cursor="hover"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2-4 - Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm mb-4" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.to}
                      onClick={(e) => handleClick(e, item.to)}
                      className="text-sm transition-colors cursor-pointer"
                      style={{ color: theme.textMuted }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = theme.accent)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = theme.textMuted)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {section.note && (
                <p className="mt-4 max-w-[200px] leading-relaxed" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 11, color: theme.textMuted }}>
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 12, color: theme.textMuted }}>
            © 2025 Azaman Technologies Ltd. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 12, color: theme.textMuted }}>
            Built in Accra 🇬🇭
          </p>
        </div>

        {/* Designed & built credit */}
        <p
          className="mt-6 text-center"
          style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 11, color: theme.textMuted, opacity: 0.6, letterSpacing: '0.02em' }}
        >
          Crafted by Taimako Sugru (Pyrax)
        </p>
      </div>
    </footer>
  )
}
