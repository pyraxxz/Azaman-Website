import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, ShieldAlert, Ban } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { DataTable, HighlightBox, SectionIntro, Tag } from './ReusableComponents';

function WalletPartitions() {
  const partitions = [
    { name: 'availableBalance', color: '#00ff88', pct: 45, value: '$4,500.00', desc: 'Freely usable funds' },
    { name: 'vendorUnallocated', color: '#00d4ff', pct: 25, value: '$2,500.00', desc: 'Reserved for active ads' },
    { name: 'escrowLocked', color: '#ffd700', pct: 20, value: '$2,000.00', desc: 'Frozen in active trade' },
    { name: 'disputeEscrow', color: '#ff4444', pct: 10, value: '$1,000.00', desc: 'Quarantined in dispute' },
  ];

  return (
    <div className="my-8 rounded-xl p-6" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white font-heading">Unified USDC Wallet — $10,000.00</h4>
        <span className="text-xs font-mono" style={{ color: '#888' }}>user_wallet_001</span>
      </div>

      <div className="flex h-8 rounded-lg overflow-hidden mb-6">
        {partitions.map((p, i) => (
          <motion.div
            key={i}
            className="relative"
            style={{ width: `${p.pct}%`, background: p.color + '30' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold" style={{ color: p.color }}>{p.pct}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {partitions.map((p, i) => (
          <div key={i} className="p-3 rounded-lg" style={{ background: '#111', border: `1px solid ${p.color}20` }}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: p.color }}>{p.name}</span>
            </div>
            <div className="text-lg font-bold text-white font-heading">{p.value}</div>
            <div className="text-[10px]" style={{ color: '#888' }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarginCalculator() {
  const [tradeAmount, setTradeAmount] = useState(500);
  const [marginPct, setMarginPct] = useState(3);

  const margin = tradeAmount * (marginPct / 100);
  const platformSplit = tradeAmount >= 1000 ? 50 : 40;
  const vendorSplit = 100 - platformSplit;
  const vendorProfit = margin * (vendorSplit / 100);
  const platformProfit = margin * (platformSplit / 100);

  return (
    <div className="my-6 rounded-xl p-6" style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid rgba(255, 215, 0, 0.15)' }}>
      <h4 className="text-sm font-semibold mb-4 font-heading" style={{ color: '#ffd700' }}>Interactive Margin Calculator</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: '#888' }}>Trade Amount (USDC)</label>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={tradeAmount}
            onChange={(e) => setTradeAmount(Number(e.target.value))}
            className="w-full accent-[#ffd700]"
          />
          <div className="text-right text-sm font-mono text-white">${tradeAmount.toLocaleString()}</div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider block mb-2" style={{ color: '#888' }}>Vendor Margin (%)</label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={marginPct}
            onChange={(e) => setMarginPct(Number(e.target.value))}
            className="w-full accent-[#00d4ff]"
          />
          <div className="text-right text-sm font-mono text-white">+{marginPct}%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg text-center" style={{ background: '#111' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#888' }}>Total Margin</div>
          <div className="text-lg font-bold font-heading text-white">${margin.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: '#111' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#00ff88' }}>Vendor ({vendorSplit}%)</div>
          <div className="text-lg font-bold font-heading" style={{ color: '#00ff88' }}>${vendorProfit.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded-lg text-center" style={{ background: '#111' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#00d4ff' }}>Platform ({platformSplit}%)</div>
          <div className="text-lg font-bold font-heading" style={{ color: '#00d4ff' }}>${platformProfit.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-xs mt-3 italic" style={{ color: '#888' }}>
        Split: {tradeAmount >= 1000 ? '50/50' : '60/40'} (Vendor/Platform) — threshold at $1,000
      </p>
    </div>
  );
}

function StrikeSystem() {
  const [activeStrike, setActiveStrike] = useState(null);
  const strikes = [
    { num: 1, title: 'Warning', icon: AlertTriangle, color: '#ffd700', desc: 'Warning notification + rate limit. User receives educational prompt about trade etiquette.' },
    { num: 2, title: 'Restriction', icon: ShieldAlert, color: '#ff6b35', desc: 'Reduced trade volumes. Restricted from high-value ads and premium vendor listings.' },
    { num: 3, title: 'Sanction', icon: Ban, color: '#ff4444', desc: 'Shadow-ban from marketplace. Restricted access to premium ads. Account flagged for Admin review.' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {strikes.map((s) => {
        const Icon = s.icon;
        const isOpen = activeStrike === s.num;
        return (
          <motion.div
            key={s.num}
            className="rounded-xl p-5 cursor-pointer"
            style={{
              background: isOpen ? `${s.color}08` : '#1a1a2e',
              border: `1px solid ${isOpen ? s.color + '40' : '#2a2a3e'}`,
            }}
            onClick={() => setActiveStrike(isOpen ? null : s.num)}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider" style={{ color: '#888' }}>Strike</span>
                <span className="text-lg font-bold font-heading ml-1" style={{ color: s.color }}>{s.num}</span>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">{s.title}</h4>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  className="text-xs leading-relaxed"
                  style={{ color: '#aaa' }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {s.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

const PAYMENT_METHOD_DATA = {
  headers: ['Payment Method', 'Risk Level', 'Base Margin', 'UI Tag'],
  rows: [
    ['Bank Transfer', <Tag key="t1" variant="low">Low Risk</Tag>, '15%', 'Irreversible, bank-verified'],
    ['Mobile Money', <Tag key="t2" variant="low">Low Risk</Tag>, '15%', 'Instant, carrier-backed'],
    ['CashApp / Zelle', <Tag key="t3" variant="med">Medium Risk</Tag>, '12% - 15%', 'Chargebacks within 72h'],
    ['PayPal / Venmo', <Tag key="t4" variant="high">High Risk</Tag>, '15% - 20%', 'Reversible up to 180 days'],
  ],
};

export default function P2PSection() {
  return (
    <SectionWrapper id="p2p-marketplace">
      <H2>3. The P2P Marketplace & Escrow Dynamics</H2>
      <SectionIntro>
        Azaman operates a dynamic, risk-adjusted Peer-to-Peer marketplace where users trade safely under algorithmic supervision.
      </SectionIntro>

      <H3 accent="gold">3.1 Unified Wallet Segmentation</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        Each user's singular USDC balance is strictly partitioned within the database to prevent double-spending:
      </p>
      <WalletPartitions />

      <H3 accent="gold">3.2 Dynamic Vendor Margins & Risk Profiling</H3>
      <p className="leading-relaxed mb-4" style={{ color: '#aaa' }}>
        Vendors configure profit margins with a haptic-feedback slider. The system enforces base margins based on chargeback risk:
      </p>
      <DataTable data={PAYMENT_METHOD_DATA} />
      <MarginCalculator />

      <H3 accent="gold">3.3 The "Ping" System (OTC Trading)</H3>
      <div className="space-y-3 leading-relaxed" style={{ color: '#aaa' }}>
        <p>If a vendor has insufficient balance, buyers can "ping" them:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Buyer sends a ping, locking into a <strong className="text-white">5-minute timeout</strong></li>
          <li>Vendor receives instant push notification</li>
          <li>Vendor sweeps funds via UI slider to cover the order</li>
          <li>Buyer is notified of acceptance/rejection</li>
        </ol>
      </div>

      <H3 accent="gold">3.4 The Strike System</H3>
      <HighlightBox title="Escrow Security Disclaimer" variant="red">
        <p className="italic">"Escrow only locks the exact crypto amount requested. Underpayments can be retrieved, but overpayments are not guaranteed."</p>
      </HighlightBox>
      <StrikeSystem />

      <H3 accent="gold">3.5 Smart Queue & Load Balancing</H3>
      <div className="leading-relaxed" style={{ color: '#aaa' }}>
        <p className="mb-3">Vendors set <strong className="text-white">"Max Concurrent Trades"</strong> during ad creation. When at capacity, buyers enter a <strong className="text-white">"Waiting Room"</strong>:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Queue position displayed in real-time</li>
          <li>Rates finalized only when exiting queue and entering active trade</li>
          <li>Next buyer auto-popped when a trade frees up</li>
        </ul>
      </div>
    </SectionWrapper>
  );
}
