import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/sections/HeroSection'
import FeaturesGrid from '@/sections/FeaturesGrid'
import AppShowcase from '@/sections/AppShowcase'
import ThemeShowcase from '@/sections/ThemeShowcase'
import StatsSection from '@/sections/StatsSection'
import InvestorSection from '@/sections/InvestorSection'
import ClosingSection from '@/sections/ClosingSection'
import FooterSection from '@/sections/FooterSection'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <AppShowcase />
      <StatsSection />
      <ThemeShowcase />
      <InvestorSection />
      <ClosingSection />
      <FooterSection />
    </div>
  )
}
