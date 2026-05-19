import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Eye, Users } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2 } from './SectionHeading';
import { HighlightBox, SectionIntro } from './ReusableComponents';

const MANDATES = [
  { icon: Shield, title: 'Anti-Money Laundering (AML)', desc: 'Comprehensive transaction monitoring and suspicious activity reporting', color: '#00d4ff' },
  { icon: Eye, title: 'Counter-Terrorism Financing (CFT)', desc: 'Enhanced due diligence and sanctions screening', color: '#ffd700' },
  { icon: FileCheck, title: 'The FATF Travel Rule', desc: 'Information sharing for cross-border transfers exceeding thresholds', color: '#00ff88' },
  { icon: Users, title: 'Consumer Protection', desc: 'Mandatory KYC, dispute resolution frameworks, and fund safeguarding', color: '#ff6b35' },
];

export default function RegulatorySection() {
  return (
    <SectionWrapper id="regulatory">
      <H2>1. Strategic Imperative & Regulatory Alignment</H2>
      <SectionIntro>
        Ghana stands at a critical inflection point in the global digital economy.
      </SectionIntro>

      <div className="space-y-4 leading-relaxed mb-10" style={{ color: '#aaa' }}>
        <p>
          With crypto adoption accelerating rapidly across West Africa, legacy banking infrastructure has struggled to keep pace. The passage of the <strong className="text-white">Virtual Asset Service Providers Act, 2025 (Act 1154)</strong>, signed into law on December 30, 2025, formally legalized and regulated digital asset trading.
        </p>
        <p>
          The law mandates strict licensing under the <strong className="text-white">Bank of Ghana (BoG)</strong> and the <strong className="text-white">Securities and Exchange Commission (SEC)</strong>, with heavy emphasis on:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {MANDATES.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{ background: 'rgba(26, 26, 46, 0.5)', border: '1px solid #2a2a3e' }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${m.color}12`, border: `1px solid ${m.color}25` }}>
                <Icon size={18} style={{ color: m.color }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{m.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{m.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <HighlightBox title="Built for Act 1154, Not Reacting to It" variant="gold">
        <p>
          Azaman is architected to thrive under Act 1154, not merely to comply with it, but to embed its mandates into the platform's DNA. By integrating mandatory KYC verification, cryptographically secure escrow mechanisms, and an AI-monitored system ledger, Azaman ensures absolute consumer protection and zero systemic risk.
        </p>
      </HighlightBox>
    </SectionWrapper>
  );
}
