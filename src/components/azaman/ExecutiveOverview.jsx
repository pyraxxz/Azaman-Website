import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Shield, DollarSign, MessageCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2 } from './SectionHeading';
import { SectionIntro } from './ReusableComponents';

const FEATURE_CARDS = [
  {
    icon: ArrowRightLeft,
    title: 'Zero-Cost Internal Transfers',
    content: 'Users send funds instantly to other Azaman IDs via simple database updates. Zero on-chain gas fees. Zero network congestion. Zero settlement delay.',
    color: '#00d4ff',
  },
  {
    icon: DollarSign,
    title: 'USDC-Backed Stability',
    content: 'All user balances stored strictly as USDC. The front-end displays a dynamic "Hologram" in local currency, shielding users from FX devaluation.',
    color: '#ffd700',
  },
  {
    icon: Shield,
    title: 'Escrow-Protected P2P',
    content: 'Every peer-to-peer trade is protected by algorithmic escrow, risk-adjusted margins, and a three-strike enforcement system that eliminates bad actors.',
    color: '#00ff88',
  },
  {
    icon: MessageCircle,
    title: 'Social Neo-Bank',
    content: 'Two isolated chat environments—trade-bound and personal—turn every conversation into a potential transaction surface with biometric-gated transfers.',
    color: '#ff00ff',
  },
];

export default function ExecutiveOverview() {
  return (
    <SectionWrapper id="executive-overview">
      <H2>Executive Overview</H2>
      <SectionIntro>
        Azaman is not a conventional digital wallet. It is a purpose-built, enterprise-grade hybrid of a Neo-Bank and a Peer-to-Peer (P2P) Exchange.
      </SectionIntro>

      <div className="space-y-4 leading-relaxed mb-12" style={{ color: '#aaa' }}>
        <p>
          Azaman is engineered for emerging markets where legacy banking infrastructure has struggled to keep pace with accelerating digital asset adoption. The platform unifies local fiat liquidity with a mathematically infallible USDC backend, creating a closed-loop financial ecosystem.
        </p>
        <p>
          Users can move value across borders instantly, trade digital assets with escrow protection, and communicate securely, all while being insulated from the volatility, gas fees, and technical friction of traditional blockchain networks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURE_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-2xl p-6 group cursor-default"
              style={{
                background: 'rgba(26, 26, 46, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${card.color}08 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}12`, border: `1px solid ${card.color}25` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <h4 className="text-base font-semibold mb-2 text-white font-heading">
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#aaa' }}>
                  {card.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
