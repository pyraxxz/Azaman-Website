import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, MessageCircle, Brain, Globe, Building, CreditCard, ArrowRightLeft } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { HighlightBox, SectionIntro } from './ReusableComponents';

const MOAT_CARDS = [
  { icon: Shield, title: 'Regulatory First-Mover', desc: "Built around Act 1154 from the ground up. Competitors must retrofit.", color: '#00d4ff' },
  { icon: TrendingUp, title: 'Treasury Arbitrage', desc: 'Hidden spread model generates revenue without exorbitant user fees.', color: '#ffd700' },
  { icon: MessageCircle, title: 'Social Lock-In', desc: 'Dual chat system creates network effects. Switching costs rise with usage.', color: '#00ff88' },
  { icon: Brain, title: 'AI Operational Leverage', desc: 'Autonomous monitoring reduces headcount growth as scale increases.', color: '#ff00ff' },
];

const ROADMAP = [
  { icon: Globe, title: 'Multi-Currency', desc: 'Extend Hologram beyond GHS to NGN, KES, and other African currencies', color: '#00d4ff' },
  { icon: Building, title: 'Institutional API', desc: 'White-label treasury and escrow services for other fintechs', color: '#ffd700' },
  { icon: CreditCard, title: 'Credit & Lending', desc: 'P2P lending backed by escrow-locked collateral', color: '#00ff88' },
  { icon: ArrowRightLeft, title: 'Cross-Border Remittance', desc: 'Instant zero-fee value movement between Azaman users globally', color: '#ff6b35' },
];

export default function StrategicVision() {
  return (
    <SectionWrapper id="strategic-vision">
      <H2>10. Strategic Vision & Competitive Positioning</H2>
      <SectionIntro>
        Azaman is not merely reacting to the market. It is defining a new category of financial infrastructure.
      </SectionIntro>

      <H3 accent="gold">10.1 Market Opportunity</H3>
      <div className="leading-relaxed space-y-3 mb-6" style={{ color: '#aaa' }}>
        <p>
          Ghana's digital economy is at an inflection point. Act 1154 now supports licensed VASPs. Azaman captures three simultaneous trends:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Crypto Adoption', 'Neo-Banking', 'Social Finance'].map((trend, i) => (
            <motion.div
              key={i}
              className="p-4 rounded-xl text-center"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-sm font-semibold text-white">{trend}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <H3 accent="gold">10.2 Competitive Moats</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {MOAT_CARDS.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              className="rounded-xl p-5"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, borderColor: `${m.color}30` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${m.color}12` }}>
                  <Icon size={16} style={{ color: m.color }} />
                </div>
                <h4 className="text-sm font-semibold text-white font-heading">{m.title}</h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{m.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <H3 accent="gold">10.3 The Path Forward</H3>
      <div className="relative my-6">
        {ROADMAP.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={i}
              className="flex items-start gap-4 mb-4 last:mb-0"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${r.color}12` }}>
                  <Icon size={16} style={{ color: r.color }} />
                </div>
                {i < ROADMAP.length - 1 && <div className="w-px h-8" style={{ background: '#2a2a3e' }} />}
              </div>
              <div className="pt-1">
                <h4 className="text-sm font-semibold text-white mb-0.5">{r.title}</h4>
                <p className="text-xs" style={{ color: '#aaa' }}>{r.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <HighlightBox title="The Addiction Loop" variant="purple">
        <p>
          By combining ACID-compliant financial ledgers with gamified social mechanics and military-grade security, Azaman is building an addiction loop. Users compete, socialize, and accumulate status. The platform becomes a daily habit, not a monthly utility.
        </p>
      </HighlightBox>
    </SectionWrapper>
  );
}
