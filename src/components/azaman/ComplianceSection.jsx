import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Key, ShieldCheck, Settings, Share2, Award, Trophy, Fingerprint, Database, Lock, Server, Clock } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { DataTable, SectionIntro } from './ReusableComponents';

function OnboardingFlow() {
  const steps = [
    { icon: UserPlus, label: 'SSO Login', desc: 'Google or Apple sign-in', color: '#00d4ff' },
    { icon: ShieldCheck, label: 'KYC Verify', desc: 'Identity verification', color: '#ffd700' },
    { icon: Key, label: '2FA Setup', desc: 'Authenticator app', color: '#00ff88' },
    { icon: Settings, label: 'Classify', desc: 'User / Vendor / Admin', color: '#ff6b35' },
    { icon: Share2, label: 'Referral', desc: 'Influencer code', color: '#ff00ff' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 my-8 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <React.Fragment key={i}>
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl shrink-0"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', minWidth: '160px' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{s.label}</div>
                <div className="text-[10px]" style={{ color: '#888' }}>{s.desc}</div>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="hidden sm:block w-6 h-[2px] shrink-0" style={{ background: '#2a2a3e' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function BadgeSystem() {
  const badges = [
    { name: 'Bronze Trader', volume: '10K', color: '#cd7f32', pct: 20 },
    { name: 'Silver Whale', volume: '50K', color: '#c0c0c0', pct: 50 },
    { name: 'Gold Titan', volume: '100K', color: '#ffd700', pct: 75 },
    { name: 'Diamond OG', volume: '500K', color: '#00d4ff', pct: 100 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className="rounded-xl p-4 text-center"
          style={{ background: '#1a1a2e', border: `1px solid ${b.color}20` }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `${b.color}15`, border: `2px solid ${b.color}40` }}>
            <Trophy size={18} style={{ color: b.color }} />
          </div>
          <div className="text-xs font-semibold text-white mb-1">{b.name}</div>
          <div className="text-[10px] font-mono" style={{ color: b.color }}>${b.volume} Vol.</div>
          <div className="w-full h-1 rounded-full mt-2" style={{ background: '#2a2a3e' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: b.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${b.pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const ACCOUNT_STATES = [
  { name: 'ACTIVE', color: '#00ff88', trading: 'Full', chat: 'Full', withdraw: 'Full', indicator: 'None' },
  { name: 'PENDING KYC', color: '#ff6b35', trading: 'Crypto-only', chat: 'Full', withdraw: 'Crypto only', indicator: 'Yellow KYC banner' },
  { name: 'STRIKE WARNING', color: '#ffaa00', trading: 'Rate-limited', chat: 'Full', withdraw: 'Reduced', indicator: 'Orange strike banner' },
  { name: 'GHOST BANNED', color: '#ff4444', trading: 'None', chat: 'Read-only', withdraw: 'None', indicator: 'Red ban banner' },
  { name: 'SOFT DELETED', color: '#888', trading: 'None', chat: 'None', withdraw: 'None', indicator: 'Anonymized UUID' },
];

const SECURITY_ITEMS = [
  { icon: Fingerprint, title: 'Biometric Gate', desc: 'FaceID or PIN for all transfers', color: '#00d4ff' },
  { icon: Database, title: 'ACID Transactions', desc: 'Atomic operations, zero double-spend', color: '#ffd700' },
  { icon: Lock, title: 'Cold Storage', desc: 'Ledger hardware, offline USDC', color: '#00ff88' },
  { icon: Key, title: 'Multi-Sig Wallets', desc: 'Multiple signatures for treasury', color: '#ff6b35' },
  { icon: Server, title: 'Rate Limiting', desc: 'Automated brute-force prevention', color: '#ff4444' },
  { icon: ShieldCheck, title: '2FA Everywhere', desc: 'Authenticator for all admin ops', color: '#ff00ff' },
];

export default function ComplianceSection() {
  const [activeState, setActiveState] = useState(0);

  return (
    <SectionWrapper id="compliance-gamification">
      <H2>7. Compliance, Gamification & User Lifecycle</H2>
      <SectionIntro>
        Regulatory alignment, social finance mechanics, and the engagement loop that converts first-time users into long-term participants.
      </SectionIntro>

      <H3 accent="gold">7.1 Onboarding Flow</H3>
      <OnboardingFlow />

      <H3 accent="gold">7.2 Gamification: Badges & Leaderboards</H3>
      <BadgeSystem />

      <H3 accent="gold">7.3 The Addiction Loop</H3>
      <div className="flex flex-wrap gap-2 my-6">
        {['Discovery', 'Onboarding', 'First Deposit', 'P2P Trade', 'Social Chat', 'Badge Unlock', 'Repeat'].map((step, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -5 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', color: '#aaa' }}>
              <span className="font-bold text-white mr-1">{i + 1}.</span> {step}
            </div>
            {i < 6 && <span style={{ color: '#2a2a3e' }}>→</span>}
          </motion.div>
        ))}
      </div>

      <H3 accent="gold">7.4 Account States</H3>
      <div className="my-6">
        <div className="flex flex-wrap gap-1 mb-4">
          {ACCOUNT_STATES.map((state, i) => (
            <button
              key={i}
              onClick={() => setActiveState(i)}
              className="px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2"
              style={{
                color: activeState === i ? state.color : '#888',
                borderColor: activeState === i ? state.color : 'transparent',
                opacity: activeState === i ? 1 : 0.6,
              }}
            >
              {state.name}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-5" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ background: ACCOUNT_STATES[activeState].color }} />
            <h4 className="text-sm font-semibold" style={{ color: ACCOUNT_STATES[activeState].color }}>{ACCOUNT_STATES[activeState].name}</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div><span style={{ color: '#888' }}>Trading:</span> <span style={{ color: '#aaa' }}>{ACCOUNT_STATES[activeState].trading}</span></div>
            <div><span style={{ color: '#888' }}>Chat:</span> <span style={{ color: '#aaa' }}>{ACCOUNT_STATES[activeState].chat}</span></div>
            <div><span style={{ color: '#888' }}>Withdraw:</span> <span style={{ color: '#aaa' }}>{ACCOUNT_STATES[activeState].withdraw}</span></div>
          </div>
          <div className="mt-3 pt-3 text-xs" style={{ borderTop: '1px solid #2a2a3e', color: '#888' }}>
            <span className="uppercase tracking-wider">Indicator: </span>
            <span style={{ color: '#aaa' }}>{ACCOUNT_STATES[activeState].indicator}</span>
          </div>
        </div>
      </div>

      <H3 accent="gold">7.5 Security Architecture</H3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
        {SECURITY_ITEMS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              className="rounded-xl p-4"
              style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Icon size={18} style={{ color: s.color }} className="mb-2" />
              <div className="text-xs font-semibold text-white mb-0.5">{s.title}</div>
              <div className="text-[10px]" style={{ color: '#888' }}>{s.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
