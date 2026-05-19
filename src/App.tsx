import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/sections/HeroSection'
import ExecutiveOverview from '@/sections/ExecutiveOverview'
import RegulatorySection from '@/sections/RegulatorySection'
import TreasurySection from '@/sections/TreasurySection'
import P2PSection from '@/sections/P2PSection'
import ChatSystem from '@/sections/ChatSystem'
import AISystems from '@/sections/AISystems'
import AdminWarRoom from '@/sections/AdminWarRoom'
import ComplianceSection from '@/sections/ComplianceSection'
import RevenueSection from '@/sections/RevenueSection'
import StrategicVision from '@/sections/StrategicVision'
import ClosingSection from '@/sections/ClosingSection'
import FooterSection from '@/sections/FooterSection'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <ScrollProgress />
      <Navigation />

      <HeroSection />

      <div className="relative" style={{ background: '#0a0a0a' }}>
        <ExecutiveOverview />
        <RegulatorySection />
        <TreasurySection />
        <P2PSection />
        <ChatSystem />
        <AISystems />
        <AdminWarRoom />
        <ComplianceSection />
        <RevenueSection />
        <StrategicVision />
        <ClosingSection />
      </div>

      <FooterSection />
    </div>
  )
}
