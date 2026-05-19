import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview', href: '#executive-overview' },
  { label: 'Treasury', href: '#treasury' },
  { label: 'P2P', href: '#p2p-marketplace' },
  { label: 'Chat', href: '#chat-systems' },
  { label: 'AI', href: '#ai-systems' },
  { label: 'Admin', href: '#admin-war-room' },
  { label: 'Compliance', href: '#compliance-gamification' },
  { label: 'Revenue', href: '#revenue' },
  { label: 'Vision', href: '#strategic-vision' },
];

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) setVisible(true);
      else if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false);
        setMobileOpen(false);
      } else setVisible(true);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(42, 42, 62, 0.6)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 flex items-center justify-between h-16">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col shrink-0"
        >
          <span className="font-bold text-lg leading-tight font-heading" style={{ color: '#00d4ff' }}>
            AZAMAN
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: '#888' }}>Architecture</span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded transition-colors relative"
              style={{ color: activeSection === link.href ? '#00d4ff' : '#888' }}
            >
              {link.label}
              {activeSection === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full" style={{ background: '#00d4ff' }} />
              )}
            </a>
          ))}
        </div>

        <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden py-3 px-5" style={{ background: 'rgba(10, 10, 10, 0.95)', borderTop: '1px solid #2a2a3e' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block py-2 text-sm font-medium"
              style={{ color: activeSection === link.href ? '#00d4ff' : '#aaa' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
