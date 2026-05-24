import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ArrowLeftRight,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Bell,
  Send,
  Download,
  Upload,
  ArrowUpDown,
  MessageCircle,
  History,
  Shield,
  Megaphone,
  ChevronRight,
} from 'lucide-react';

interface ScreenTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

const TABS: ScreenTab[] = [
  {
    id: 'balance',
    label: 'Balance',
    icon: Wallet,
    title: 'Hologram Balance Card',
    description:
      'Your net worth displayed beautifully. USDC balance converted to local currency in real-time using live oracle rates. The slender black card with titanium light sweep animation — pure premium.',
  },
  {
    id: 'p2p',
    label: 'P2P Market',
    icon: ArrowLeftRight,
    title: 'Live P2P Marketplace',
    description:
      'Apple Wallet-style card stacking, AI smart filter toggle, real-time vendor ads with risk tags, and instant trade initiation. Liquid glass aesthetic with dynamic blur effects.',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    title: 'Trade-Bound Chat',
    description:
      'Trade-bound chats with draggable countdown timer, payment proof uploads, and extension chips. Every conversation is a transaction surface with real-time status.',
  },

  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    title: 'Admin Command Center',
    description:
      'Full platform oversight with real-time analytics, system health monitoring, oracle status, and engine diagnostics. Every metric from every corner of the platform, in one war room.',
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: TrendingUp,
    title: 'Goal-Based Savings',
    description:
      'Lock funds toward goals with streak tracking, progress bars, and automated deposits. Gamified savings that make building wealth a daily habit, not a chore.',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    title: 'Activity Center',
    description:
      'Unified notification hub with categorized alerts for trades, transactions, security events, and platform announcements. Never miss an important update.',
  },
];


function BalanceScreen() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0B0E11] to-[#161618] p-4 flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between text-[8px] text-[#888] mb-3">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>4G</span>
          <span>100%</span>
        </div>
      </div>
      {/* App bar */}
      <div className="flex justify-between items-center mb-4">
        <span
          className="text-[#D4AF37] font-bold text-sm"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          AZAMAN
        </span>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
            <MessageSquare size={10} className="text-white/60" />
          </div>
          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-[8px] text-[#D4AF37] font-bold">HQ</span>
          </div>
        </div>
      </div>

      {/* Balance card with titanium sweep */}
      <div
        className="relative rounded-2xl p-4 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #161618, #0B0B0D, #000)',
        }}
      >
        <div className="absolute inset-0 border border-white/[0.08] rounded-2xl" />
        {/* Titanium sweep animation */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/80 text-[10px] font-medium">pyraxxz</div>
              <div className="text-white/40 text-[7px]">@UID-1</div>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <div className="w-1 h-1 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[6px] text-[#D4AF37] font-mono">04:32</span>
            </div>
          </div>
          <div
            className="text-white text-xl font-bold mt-3 mb-1"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            GH₵ 12,450.00
          </div>
          <div className="flex items-center gap-2 text-[8px]">
            <span className="text-[#D4AF37]">1,088.65 USDC</span>
            <span className="text-white/30">|</span>
            <span className="text-[#02C076]">Rate: GH₵ 11.44</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex justify-between mt-4 px-2">
        {[
          { label: 'Deposit', Icon: Download },
          { label: 'Withdraw', Icon: Upload },
          { label: 'Transfer', Icon: ArrowUpDown },
        ].map(({ label, Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <Icon size={12} className="text-[#D4AF37]" />
            </div>
            <span className="text-[7px] text-white/50">{label}</span>
          </div>
        ))}
      </div>

      {/* Balance chips */}
      <div className="flex gap-2 mt-4">
        <div className="flex-1 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
          <div className="text-[7px] text-white/40">Available</div>
          <div className="text-[9px] text-[#02C076] font-semibold">$890.00</div>
        </div>
        <div className="flex-1 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
          <div className="text-[7px] text-white/40">Escrow</div>
          <div className="text-[9px] text-[#F0B90B] font-semibold">$148.65</div>
        </div>
        <div className="flex-1 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-center">
          <div className="text-[7px] text-white/40">AZM</div>
          <div className="text-[9px] text-[#D4AF37] font-semibold">$50.00</div>
        </div>
      </div>
    </div>
  );
}


function P2PMarketScreen() {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex justify-between text-[8px] text-[#888] mb-1">
        <span>9:41</span>
        <span className="text-white/60 font-medium">P2P Market</span>
        <span>●●●</span>
      </div>
      {/* AI Smart Filter toggle */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <span className="text-[9px] text-white/60 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#02C076] animate-pulse" />
          AI Smart Filter
        </span>
        <div className="w-9 h-[18px] rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] flex items-center justify-end px-0.5">
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
        </div>
      </div>

      {/* Vendor cards */}
      {[
        {
          name: 'KwameGold',
          rate: '11.44',
          method: 'Bank Transfer',
          risk: 'Low Risk',
          riskColor: '#02C076',
          trades: 312,
          completion: '98%',
          aiScore: '94%',
        },
        {
          name: 'AkosuaSwap',
          rate: '11.52',
          method: 'MoMo',
          risk: 'Low Risk',
          riskColor: '#02C076',
          trades: 189,
          completion: '95%',
          aiScore: '78%',
        },
        {
          name: 'KofiBarter',
          rate: '11.60',
          method: 'CashApp',
          risk: 'Med Risk',
          riskColor: '#F0B90B',
          trades: 67,
          completion: '82%',
          aiScore: '61%',
        },
      ].map((vendor) => (
        <div
          key={vendor.name}
          className="p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[9px] font-bold text-[#D4AF37]">
                {vendor.name[0]}
              </div>
              <div>
                <div className="text-[9px] text-white font-medium">{vendor.name}</div>
                <div className="text-[7px] text-white/40">{vendor.method}</div>
              </div>
            </div>
            <span
              className="text-[6px] px-1.5 py-0.5 rounded-full border"
              style={{
                color: vendor.riskColor,
                borderColor: `${vendor.riskColor}40`,
                backgroundColor: `${vendor.riskColor}10`,
              }}
            >
              {vendor.risk}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white font-semibold">
              GH₵ {vendor.rate}/USDC
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[6px] text-white/40">
                <span>{vendor.trades} trades</span>
                <span>•</span>
                <span>{vendor.completion}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[7px] text-[#8b5cf6] font-medium">
              AI Score: {vendor.aiScore}
            </span>
            <button className="text-[7px] px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#ffd700] text-black font-bold">
              Trade Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


function ChatScreen() {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col">
      {/* Trade header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[9px] font-bold text-[#D4AF37]">
          K
        </div>
        <div className="flex-1">
          <div className="text-[9px] text-white font-medium">Trade #1024</div>
          <div className="text-[7px] text-[#02C076] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#02C076]" />
            Active
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#02C076]/10 border border-[#02C076]/20">
          <span className="text-[7px] text-[#02C076]">In Progress</span>
        </div>
      </div>

      {/* Countdown timer pill */}
      <div className="self-center px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-3 cursor-grab">
        <span className="text-[9px] text-[#D4AF37] font-mono font-bold">
          ⏱ 12:45 remaining
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {/* System message */}
        <div className="self-center px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
          <span className="text-[7px] text-white/40">
            Trade initiated • GH₵ 1,144 for 100 USDC
          </span>
        </div>
        {/* Seller message */}
        <div className="self-start max-w-[75%] px-3 py-2 rounded-xl rounded-bl-sm bg-[#1E2329] text-[8px] text-white/80">
          Please send to MTN MoMo: 024-xxx-xxxx. Name: Kwame A.
        </div>
        {/* Buyer message */}
        <div className="self-end max-w-[75%] px-3 py-2 rounded-xl rounded-br-sm bg-[#D4AF37]/20 text-[8px] text-white/80">
          Payment sent! Uploading proof now...
        </div>
        {/* Payment proof */}
        <div className="self-end max-w-[75%] px-2.5 py-2 rounded-xl rounded-br-sm bg-[#02C076]/10 border border-[#02C076]/20">
          <div className="text-[7px] text-[#02C076] font-medium flex items-center gap-1">
            <Upload size={8} />
            Payment Proof Uploaded
          </div>
          <div className="text-[6px] text-white/40 mt-0.5">
            MoMo Receipt • Ref: TXN-88421
          </div>
        </div>
      </div>

      {/* Extension chips */}
      <div className="flex gap-1.5 mt-2 mb-2">
        <span className="px-2.5 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff] font-medium">
          +15m
        </span>
        <span className="px-2.5 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff] font-medium">
          +30m
        </span>
      </div>

      {/* Input field */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 h-8 rounded-full bg-white/5 border border-white/10 px-3 flex items-center">
          <span className="text-[8px] text-white/30">Type a message...</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
          <Send size={10} className="text-black" />
        </div>
      </div>
    </div>
  );
}


function AdminScreen() {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-3.5 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-4 h-4 rounded bg-[#00d4ff]/15 flex items-center justify-center animate-spin"
          style={{ animationDuration: '3s' }}
        >
          <span className="text-[7px] text-[#00d4ff]">◎</span>
        </div>
        <span className="text-[8px] text-white font-bold tracking-[0.15em]">
          ADMIN COMMAND CENTER
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Profit', value: '$2,847', color: '#D4AF37' },
          { label: 'Users', value: '1,847', color: '#02C076' },
          { label: '24h Vol', value: 'GHS 142K', color: '#ff6b35' },
        ].map((s) => (
          <div
            key={s.label}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center"
          >
            <div className="text-[10px] font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-[6px] text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="text-[7px] text-white/40 mb-1.5 uppercase tracking-wider">
          System Health
        </div>
        {[
          { name: 'Master Crypto', pct: 80, color: '#D4AF37' },
          { name: 'Hot Wallet', pct: 45, color: '#02C076' },
          { name: 'Fiat Pool', pct: 60, color: '#ff6b35' },
          { name: 'Profit Fees', pct: 30, color: '#F6465D' },
        ].map((pool) => (
          <div key={pool.name} className="flex items-center gap-2 mb-1">
            <span className="text-[6px] text-white/60 w-16 truncate">{pool.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pool.pct}%`, background: pool.color }}
              />
            </div>
            <span className="text-[6px] text-white/40 w-6 text-right">{pool.pct}%</span>
          </div>
        ))}
      </div>

      {/* Oracle Status */}
      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="text-[7px] text-white/40 mb-1 uppercase tracking-wider flex items-center justify-between">
          <span>Oracle Status</span>
          <span className="text-[6px] px-1 py-0.5 rounded bg-[#02C076]/10 text-[#02C076]">
            LIVE
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          <div className="text-center">
            <div className="text-[6px] text-white/30">USD→GHS</div>
            <div className="text-[8px] text-white font-semibold">15.20</div>
          </div>
          <div className="text-center">
            <div className="text-[6px] text-white/30">Retail</div>
            <div className="text-[8px] text-white font-semibold">15.45</div>
          </div>
          <div className="text-center">
            <div className="text-[6px] text-white/30">Corporate</div>
            <div className="text-[8px] text-white font-semibold">14.80</div>
          </div>
        </div>
      </div>

      {/* Engine status */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#02C076]/5 border border-[#02C076]/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#02C076] animate-pulse" />
        <span className="text-[7px] text-[#02C076] font-bold">ONLINE</span>
        <span className="text-[6px] text-white/30">Node v20.11</span>
        <span className="text-[6px] text-white/30 ml-auto">Uptime 47d</span>
      </div>

      {/* War room button */}
      <div className="mt-auto p-2.5 rounded-xl bg-gradient-to-r from-[#F6465D]/80 to-[#F6465D] text-center cursor-pointer hover:opacity-90 transition-opacity">
        <span className="text-[8px] text-white font-bold tracking-wider">
          🚨 OPEN WAR ROOM
        </span>
      </div>
    </div>
  );
}


function SavingsScreen() {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] text-white font-bold">Savings Goals</span>
        <TrendingUp size={12} className="text-[#D4AF37]" />
      </div>

      {/* Total locked card */}
      <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 text-center">
        <div className="text-[7px] text-white/50 mb-0.5">Total Locked</div>
        <div
          className="text-lg font-bold text-[#D4AF37]"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          GH₵ 4,200.00
        </div>
        <div className="text-[7px] text-white/40">≈ $367.13 USDC</div>
      </div>

      {/* Stats row */}
      <div className="flex justify-between px-1">
        {[
          { emoji: '🔥', label: '12 Streak' },
          { emoji: '🏆', label: '18 Best' },
          { emoji: '💰', label: '47 Deposits' },
          { emoji: '🎯', label: '4 Goals' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[10px]">{stat.emoji}</div>
            <div className="text-[6px] text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Goal cards */}
      {[
        {
          name: 'Emergency Fund',
          progress: 75,
          streak: 12,
          status: 'ACTIVE',
          current: 'GH₵ 1,500',
          target: 'GH₵ 2,000',
          freq: 'WEEKLY GH₵ 100',
          color: '#02C076',
        },
        {
          name: 'New MacBook',
          progress: 40,
          streak: 5,
          status: 'ACTIVE',
          current: 'GH₵ 2,000',
          target: 'GH₵ 5,000',
          freq: 'MONTHLY GH₵ 500',
          color: '#00d4ff',
        },
        {
          name: 'Travel Fund',
          progress: 20,
          streak: 3,
          status: 'ACTIVE',
          current: 'GH₵ 600',
          target: 'GH₵ 3,000',
          freq: 'BIWEEKLY GH₵ 200',
          color: '#D4AF37',
        },
      ].map((goal) => (
        <div
          key={goal.name}
          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] text-white font-medium">{goal.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[6px]" style={{ color: goal.color }}>
                🔥 {goal.streak} days
              </span>
              <span className="text-[5px] px-1 py-0.5 rounded bg-[#02C076]/10 text-[#02C076] font-bold">
                {goal.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${goal.progress}%`, background: goal.color }}
              />
            </div>
            <span className="text-[7px] text-white/50">{goal.progress}%</span>
          </div>
          <div className="flex justify-between text-[6px] text-white/30">
            <span>
              {goal.current}/{goal.target}
            </span>
            <span>{goal.freq}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


function NotificationsScreen() {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-white font-bold">Activity Center</span>
        <Bell size={12} className="text-[#D4AF37]" />
      </div>

      {/* Category cards */}
      {[
        {
          icon: MessageCircle,
          title: 'Active Chats & Trades',
          subtitle: '2 trades need attention',
          accent: '#00d4ff',
          badge: '2',
        },
        {
          icon: History,
          title: 'Transaction History',
          subtitle: '12 transactions this week',
          accent: '#02C076',
          badge: null,
        },
        {
          icon: Shield,
          title: 'Security & Account',
          subtitle: 'New login detected',
          accent: '#F6465D',
          badge: '!',
        },
        {
          icon: Megaphone,
          title: 'Announcements',
          subtitle: 'v4.0 is live!',
          accent: '#D4AF37',
          badge: null,
        },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${item.accent}15` }}
            >
              <Icon size={14} style={{ color: item.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-white font-medium">{item.title}</div>
              <div className="text-[7px] text-white/40 mt-0.5">{item.subtitle}</div>
            </div>
            {item.badge ? (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white"
                style={{ backgroundColor: item.accent }}
              >
                {item.badge}
              </div>
            ) : (
              <ChevronRight size={12} className="text-white/20 flex-shrink-0" />
            )}
          </div>
        );
      })}

      {/* Recent activity preview */}
      <div className="mt-auto p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="text-[7px] text-white/40 mb-1.5 uppercase tracking-wider">
          Latest
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#02C076]" />
          <span className="text-[7px] text-white/60">
            Trade #1024 completed • 2 min ago
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[7px] text-white/60">
            Deposit confirmed • GH₵ 500 • 15 min ago
          </span>
        </div>
      </div>
    </div>
  );
}


const SCREEN_COMPONENTS: Record<string, React.FC> = {
  balance: BalanceScreen,
  p2p: P2PMarketScreen,
  chat: ChatScreen,
  admin: AdminScreen,
  savings: SavingsScreen,
  notifications: NotificationsScreen,
};

export default function AppShowcase() {
  const [activeScreen, setActiveScreen] = useState(0);

  const ActiveScreenComponent = SCREEN_COMPONENTS[TABS[activeScreen].id];

  return (
    <section id="showcase" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-[#ffd700] uppercase tracking-[0.2em] mb-4 block">
            App Experience
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            See it in action
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Every screen is crafted with premium glassmorphism, smooth animations, and
            instant responsiveness.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0 order-1 lg:order-none"
          >
            {/* Phone frame */}
            <div className="relative w-[240px] h-[500px] sm:w-[280px] sm:h-[580px] rounded-[36px] sm:rounded-[40px] border-[3px] border-[#333] bg-black shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_100px_rgba(0,212,255,0.1)] overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 sm:h-6 bg-black rounded-b-2xl z-20" />
              {/* Screen content */}
              <div className="absolute inset-[3px] rounded-[33px] sm:rounded-[37px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ActiveScreenComponent />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 rounded-full bg-white/20 z-20" />
            </div>
            {/* Glow behind phone */}
            <div className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-20 bg-[#00d4ff]" />
          </motion.div>

          {/* Tab navigation + description */}
          <div className="flex-1 w-full max-w-lg order-2 lg:order-none">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {TABS.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(i)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                      activeScreen === i
                        ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30 shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                        : 'text-[#888] border border-white/5 hover:border-white/15 hover:text-white/70 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center lg:text-left"
              >
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {TABS[activeScreen].title}
                </h3>
                <p className="text-[#aaa] text-sm sm:text-base leading-relaxed">
                  {TABS[activeScreen].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
