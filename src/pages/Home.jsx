import React from 'react';
import Navigation from '../components/azaman/Navigation';
import ScrollProgress from '../components/azaman/ScrollProgress';
import HeroSection from '../components/azaman/HeroSection';
import ExecutiveOverview from '../components/azaman/ExecutiveOverview';
import RegulatorySection from '../components/azaman/RegulatorySection';
import TreasurySection from '../components/azaman/TreasurySection';
import P2PSection from '../components/azaman/P2PSection';
import ChatSystem from '../components/azaman/ChatSystem';
import AISystems from '../components/azaman/AISystems';
import AdminWarRoom from '../components/azaman/AdminWarRoom';
import ComplianceSection from '../components/azaman/ComplianceSection';
import RevenueSection from '../components/azaman/RevenueSection';
import StrategicVision from '../components/azaman/StrategicVision';
import ClosingSection from '../components/azaman/ClosingSection';
import FooterSection from '../components/azaman/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
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
      <FooterSection />
    </div>
  );
}
