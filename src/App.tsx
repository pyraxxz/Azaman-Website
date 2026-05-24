import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/sections/HeroSection'
import LiveTickerSection from '@/sections/LiveTickerSection'
import FeaturesGrid from '@/sections/FeaturesGrid'
import AppShowcase from '@/sections/AppShowcase'
import StatsSection from '@/sections/StatsSection'
import ThemeShowcase from '@/sections/ThemeShowcase'
import LeaderboardSection from '@/sections/LeaderboardSection'
import AchievementsSection from '@/sections/AchievementsSection'
import InvestorSection from '@/sections/InvestorSection'
import FAQSection from '@/sections/FAQSection'
import ClosingSection from '@/sections/ClosingSection'
import FooterSection from '@/sections/FooterSection'
import { useTheme } from '@/contexts/ThemeContext'

export default function App() {
  const { theme } = useTheme()
  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        backgroundColor: theme.background,
        color: theme.textPrimary,
      }}
    >
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <LiveTickerSection />
      <FeaturesGrid />
      <AppShowcase />
      <StatsSection />
      <ThemeShowcase />
      <LeaderboardSection />
      <AchievementsSection />
      <InvestorSection />
      <FAQSection />
      <ClosingSection />
      <FooterSection />
    </div>
  )
}
