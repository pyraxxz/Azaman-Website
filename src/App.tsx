import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
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
        <ScrollProgress />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <FooterSection />
      </div>
    </BrowserRouter>
  )
}
