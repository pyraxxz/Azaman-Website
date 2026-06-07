import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'
import SkipToContent from '@/components/SkipToContent'
import FooterSection from '@/sections/FooterSection'
import Home from '@/pages/Home'
import Vendors from '@/pages/Vendors'
import { useTheme } from '@/contexts/ThemeContext'

export default function App() {
  const { theme } = useTheme()
  return (
    <BrowserRouter>
      <div
        className="min-h-screen overflow-x-hidden transition-colors duration-500"
        style={{
          backgroundColor: theme.background,
          color: theme.textPrimary,
        }}
      >
        <SkipToContent />
        <CustomCursor />
        <ScrollProgress />
        {/* Site-wide film grain for analog depth. Fixed + pointer-events-none,
            z below the nav (z-50) so the nav stays crisp. */}
        <div aria-hidden className="grain-overlay" style={{ position: 'fixed', zIndex: 40 }} />
        <Navigation />
        <main id="main-content">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </PageTransition>
        </main>
        <FooterSection />
      </div>
    </BrowserRouter>
  )
}
