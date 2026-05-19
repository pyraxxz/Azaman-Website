import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { DataTable, HighlightBox, SectionIntro } from './ReusableComponents';

const REVENUE_DATA = {
  headers: ['Revenue Stream', 'Mechanism', 'Rate', 'User Impact'],
  rows: [
    [<strong key="r1" className="text-white">Arbitrage Spread</strong>, 'Buy at corporate rates, sell at retail', 'Variable', 'Invisible to users'],
    [<strong key="r2" className="text-white">Exit Fee (Fiat)</strong>, '2% on all fiat withdrawals', '2%', 'Prevents arb abuse'],
    [<strong key="r3" className="text-white">Exit Fee (Crypto)</strong>, '2% + 100% gas on crypto withdrawals', '2% + gas', 'Covers ops costs'],
    [<strong key="r4" className="text-white">P2P Margin Split</strong>, '40–50% of vendor margin profit', '40-50%', 'Shared with vendors'],
    [<strong key="r5" className="text-white">Influencer Affiliate</strong>, '1% of exit fee to referrer', '1%', 'Zero-cost acquisition'],
  ],
};

const CHART_DATA = [
  { name: 'Arbitrage', value: 42000, color: '#00d4ff' },
  { name: 'Exit Fee', value: 38000, color: '#ffd700' },
  { name: 'P2P Split', value: 35000, color: '#00ff88' },
  { name: 'Affiliate', value: 5000, color: '#ff6b35' },
];

const tooltipStyle = { background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '11px' };

export default function RevenueSection() {
  return (
    <SectionWrapper id="revenue">
      <H2>9. Platform Economics & Revenue Streams</H2>
      <SectionIntro>
        Azaman generates sustainable revenue through multiple streams, all designed to align platform success with user satisfaction.
      </SectionIntro>

      <div className="rounded-xl p-5 my-6" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
        <h4 className="text-sm font-semibold text-white font-heading mb-4">Monthly Revenue by Stream</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${v.toLocaleString()}`} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {CHART_DATA.map((entry, i) => <Cell key={i} fill={entry.color} opacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable data={REVENUE_DATA} />

      <HighlightBox title="The Arbitrage Shield" variant="gold">
        <p>
          The 2% exit fee prevents users from using Azaman as a free arbitrage bot. Without it, traders could deposit at buy rate, withdraw at sell rate, and extract risk-free profit — draining the treasury.
        </p>
      </HighlightBox>

      <H3 accent="gold">9.1 Affiliate Split (Zero-Cost Acquisition)</H3>
      <div className="leading-relaxed space-y-3" style={{ color: '#aaa' }}>
        <p>
          During registration, users input an <code className="font-mono" style={{ color: '#00d4ff' }}>influencerCode</code>. The 2% exit fee is split:
        </p>
        <div className="flex gap-4">
          <div className="flex-1 p-3 rounded-lg text-center" style={{ background: '#111', border: '1px solid #2a2a3e' }}>
            <div className="text-lg font-bold font-heading" style={{ color: '#00d4ff' }}>1%</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#888' }}>Platform Revenue</div>
          </div>
          <div className="flex-1 p-3 rounded-lg text-center" style={{ background: '#111', border: '1px solid #2a2a3e' }}>
            <div className="text-lg font-bold font-heading" style={{ color: '#ffd700' }}>1%</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#888' }}>Influencer Credit</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
