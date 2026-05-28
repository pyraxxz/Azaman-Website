import type React from 'react'
import { Mail } from 'lucide-react'
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
                { label: 'X', text: '𝕏', href: 'https://x.com/azaboraApp' },
                { label: 'LinkedIn', text: 'in', href: 'https://linkedin.com/company/azaman' },
                { label: 'GitHub', text: 'gh', href: 'https://github.com/pyraxxz' },
                { label: 'Email', text: '', href: 'mailto:hello@azaman.app', isEmail: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-xs font-bold"
                  style={{
                    backgroundColor: `${theme.accent}10`,
                    border: `1px solid ${theme.border}`,
                    color: theme.textSecondary,
                  }}
                >
                  {item.isEmail ? <Mail size={14} /> : <span>{item.text}</span>}
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
          className="pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: theme.textMuted }}>
            © {new Date().getFullYear()} Azaman Technologies Ltd. All rights reserved.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs"
            style={{ color: theme.textMuted }}
          >
            <span>Licensed VASP under Act 1154 (2025)</span>
            <span className="hidden sm:inline">·</span>
            <span>Accra, Ghana 🇬🇭</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
