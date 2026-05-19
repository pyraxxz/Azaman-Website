import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Shield } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2 } from './SectionHeading';

const PILLARS = [
  { icon: DollarSign, problem: 'Volatility', solution: 'Solved by 1:1 USDC backing and Hologram display', color: '#00d4ff' },
  { icon: Zap, problem: 'Complexity', solution: 'Solved by gasless internal transfers and familiar banking UX', color: '#ffd700' },
  { icon: Shield, problem: 'Trust', solution: 'Solved by escrow-protected P2P, mandatory KYC, and AI compliance', color: '#00ff88' },
];

export default function ClosingSection() {
  return (
    <SectionWrapper id="closing">
      <H2>Closing Statement</H2>

      <p className="leading-relaxed mb-8" style={{ color: '#aaa' }}>
        Azaman combines ACID-compliant financial ledgers, gamified social mechanics, and military-grade security into a single ecosystem. It is a new category of financial infrastructure, built for the markets that need it most.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={i}
              className="rounded-xl p-5 text-center"
              style={{ background: '#1a1a2e', border: `1px solid ${p.color}20` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${p.color}10`, border: `2px solid ${p.color}30` }}>
                <Icon size={22} style={{ color: p.color }} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{p.problem}</div>
              <p className="text-xs" style={{ color: '#aaa' }}>{p.solution}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        className="text-center text-sm italic leading-relaxed max-w-[600px] mx-auto"
        style={{ color: '#888' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        With regulatory alignment under Act 1154, a mathematically infallible treasury engine, and an engagement loop that converts users into participants, Azaman is positioned to become the definitive financial platform for West Africa's digital economy.
      </motion.p>
    </SectionWrapper>
  );
}
