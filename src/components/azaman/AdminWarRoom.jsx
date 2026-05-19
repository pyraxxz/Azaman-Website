import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3, Eye, Shield, Trash2, Upload } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { FormulaDisplay, SectionIntro } from './ReusableComponents';

function generateDailyData() {
  const data = [];
  for (let i = 0; i < 14; i++) {
    data.push({
      day: `May ${i + 1}`,
      profit: 800 + Math.random() * 1200,
      volume: 40000 + Math.random() * 60000,
      users: 200 + Math.floor(Math.random() * 300),
      exitFee: 300 + Math.random() * 500,
      p2pMargin: 500 + Math.random() * 700,
    });
  }
  return data;
}

const CHART_DATA = generateDailyData();

const REVENUE_BREAKDOWN = [
  { name: 'Exit Fee', value: 38, color: '#00d4ff' },
  { name: 'P2P Margin', value: 35, color: '#ffd700' },
  { name: 'Arbitrage', value: 22, color: '#00ff88' },
  { name: 'Affiliate', value: 5, color: '#ff6b35' },
];

function StatCard({ title, value, change, icon: Icon, color, children }) {
  return (
    <motion.div
      className="rounded-xl p-5 stat-glow"
      style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
            <Icon size={16} style={{ color }} />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#888' }}>{title}</span>
        </div>
        {change && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: '#00ff88', background: 'rgba(0, 255, 136, 0.08)' }}>
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold font-heading text-white mb-3">{value}</div>
      {children}
    </motion.div>
  );
}

function SpyGlassPreview() {
  const trades = [
    { id: 'AZ-7842', buyer: 'user_38', vendor: 'vendor_12', amount: '$450', status: 'active', time: '2m ago' },
    { id: 'AZ-7841', buyer: 'user_92', vendor: 'vendor_05', amount: '$1,200', status: 'pending', time: '5m ago' },
    { id: 'AZ-7840', buyer: 'user_15', vendor: 'vendor_12', amount: '$300', status: 'completed', time: '8m ago' },
  ];

  const statusColors = { active: '#00ff88', pending: '#ffd700', completed: '#888' };

  return (
    <div className="rounded-xl overflow-hidden my-6" style={{ background: '#0d0d0d', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#1a1a2e', borderBottom: '1px solid rgba(255, 215, 0, 0.15)' }}>
        <Eye size={14} style={{ color: '#ffd700' }} />
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#ffd700' }}>Spy Glass — Live Monitoring</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ffd700' }} />
          <span className="text-[10px] font-mono" style={{ color: '#ffd700' }}>3 ACTIVE</span>
        </div>
      </div>

      <div className="p-3">
        {trades.map((t, i) => (
          <div key={i} className="flex items-center justify-between py-2 text-xs" style={{ borderBottom: i < trades.length - 1 ? '1px solid #1a1a2e' : 'none' }}>
            <div className="flex items-center gap-3">
              <span className="font-mono font-semibold text-white">{t.id}</span>
              <span style={{ color: '#888' }}>{t.buyer} → {t.vendor}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-white">{t.amount}</span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[t.status] }} />
                <span style={{ color: statusColors[t.status] }}>{t.status}</span>
              </span>
              <span style={{ color: '#555' }}>{t.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PurchasingLog() {
  const fields = [
    { field: 'Discount Rate', value: '14.20 GHS/USDC', status: 'Below retail ✓' },
    { field: 'Market Rate (Snapshot)', value: '14.85 GHS/USDC', status: 'Auto-populated' },
    { field: 'USDC Purchased', value: '25,000.00 USDC', status: 'Blockchain confirmed ✓' },
    { field: 'Fiat Sent (incl. fees)', value: '₵355,000.00', status: 'Bank matched ✓' },
    { field: 'Receipt Upload', value: 'receipt_2025_05_19.pdf', status: 'Attached ✓' },
  ];

  return (
    <div className="rounded-xl overflow-hidden my-6" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#16213e' }}>
        <Upload size={14} style={{ color: '#00d4ff' }} />
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#00d4ff' }}>Corporate Purchase Log — Entry #247</span>
      </div>
      {fields.map((f, i) => (
        <div key={i} className="flex items-center justify-between px-4 py-3 text-xs" style={{ borderBottom: i < fields.length - 1 ? '1px solid #2a2a3e' : 'none' }}>
          <span style={{ color: '#888' }}>{f.field}</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-white">{f.value}</span>
            <span style={{ color: '#00ff88' }}>{f.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const tooltipStyle = { background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '11px' };

export default function AdminWarRoom() {
  return (
    <SectionWrapper id="admin-war-room">
      <H2>6. The Admin "War Room" & God Mode</H2>
      <SectionIntro>
        The backend administrative portal provides institutional-grade oversight, ensuring flawless accounting and immediate intervention capabilities.
      </SectionIntro>

      <H3 accent="gold">6.1 The Analytics Triumvirate</H3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
        <StatCard title="Profit" value="$18,420" change="+12.4%" icon={TrendingUp} color="#00ff88">
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="profit" stroke="#00ff88" fill="url(#profitGrad)" strokeWidth={1.5} dot={false} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#00ff88' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </StatCard>

        <StatCard title="Active Users" value="12,847" change="+342" icon={Users} color="#00d4ff">
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA.slice(-7)}>
                <Bar dataKey="users" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.7} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#00d4ff' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </StatCard>

        <StatCard title="Volume (24h)" value="$2.4M" change="+8.2%" icon={BarChart3} color="#ffd700">
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd700" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ffd700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="volume" stroke="#ffd700" fill="url(#volumeGrad)" strokeWidth={1.5} dot={false} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#ffd700' }} formatter={(v) => `$${(v / 1000).toFixed(1)}K`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </StatCard>
      </div>

      <div className="rounded-xl p-5 my-6" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}>
        <h4 className="text-sm font-semibold text-white font-heading mb-4">Revenue Breakdown</h4>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-[140px] h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REVENUE_BREAKDOWN} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {REVENUE_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {REVENUE_BREAKDOWN.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: r.color }} />
                <span className="text-xs" style={{ color: '#aaa' }}>{r.name}</span>
                <span className="text-xs font-bold font-mono text-white">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <H3 accent="gold">6.2 Double-Check Security Invariant</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        Every withdrawal triggers a mathematical invariant check:
      </p>
      <FormulaDisplay formula="Σ(Deposits + Profits) − Σ(Withdrawals + Losses) = current availableBalance" />
      <p className="leading-relaxed" style={{ color: '#aaa' }}>
        If there is a micro-cent anomaly, the payout freezes automatically and a <strong className="text-white">Dispute Ticket</strong> is created for Admin review.
      </p>

      <H3 accent="gold">6.3 The Spy Glass</H3>
      <SpyGlassPreview />
      <p className="leading-relaxed" style={{ color: '#aaa' }}>
        Admin chat bubbles render with a <strong className="text-white">gold border</strong> and verified "Admin" shield. All interventions are logged in the DisputeResolutionLog.
      </p>

      <H3 accent="gold">6.4 Corporate Purchasing Log</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        A bulletproof accounting portal for manual OTC treasury refills:
      </p>
      <PurchasingLog />

      <H3 accent="gold">6.5 iOS Compliance & Deactivation</H3>
      <p className="leading-relaxed" style={{ color: '#aaa' }}>
        Data anonymized to <code className="font-mono" style={{ color: '#00d4ff' }}>DeletedUser_[UUID]</code>, not hard-deleted. Preserves marketplace histories for regulatory compliance.
      </p>

      <H3 accent="gold">6.6 "Ghost" Ban System</H3>
      <div className="rounded-xl overflow-hidden my-4" style={{ border: '1px solid rgba(255, 68, 68, 0.3)' }}>
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(255, 68, 68, 0.08)' }}>
          <Shield size={16} style={{ color: '#ff4444' }} />
          <div className="flex-1">
            <span className="text-xs font-semibold" style={{ color: '#ff4444' }}>Account Restricted</span>
            <span className="text-xs ml-2" style={{ color: '#888' }}>Violation of trade policy §3.4</span>
          </div>
          <div className="text-xs font-mono" style={{ color: '#ff4444' }}>23:45:12 remaining</div>
          <button className="text-xs px-3 py-1 rounded-full" style={{ color: '#ff4444', border: '1px solid rgba(255, 68, 68, 0.3)' }}>
            Appeal
          </button>
        </div>
      </div>
      <p className="leading-relaxed" style={{ color: '#aaa' }}>
        Banned users retain read-only access. A persistent red banner shows ban status, countdown timer, and appeal button — maintaining engagement for reinstatement.
      </p>
    </SectionWrapper>
  );
}
