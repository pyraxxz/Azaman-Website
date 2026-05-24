import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wallet, ArrowLeftRight, MessageSquare, ShieldCheck, TrendingUp, Bell,
  Send, Download, Upload, ArrowUpDown, MessageCircle, History, Shield,
  Megaphone, ChevronRight, Sparkles, Flame,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Tab {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  title: string
  description: string
  highlight: string
}

const TABS: Tab[] = [
  {
    id: 'balance',
    label: 'Balance',
    icon: Wallet,
    title: 'Hologram Balance Card',
    description:
      "Your net worth, displayed beautifully. The slender black card features a titanium light sweep animation. USDC balance converts to local currency in real-time using the live oracle rate.",
    highlight: 'Live oracle · Refreshed every 10 minutes',
  },
  {
    id: 'p2p',
    label: 'P2P Market',
    icon: ArrowLeftRight,
    title: 'Live P2P Marketplace',
    description:
      'Apple Wallet-style stacking cards with AI Smart Filter. Each vendor card shows real-time rates, risk tags, completion rates, and an AI match score. Tap to trade instantly.',
    highlight: 'AI matching · Risk-tagged vendors',
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    title: 'Trade-Bound Chat',
    description:
      'Every trade gets its own chat with a draggable countdown timer overlay. Upload payment proof inline, request time extensions, and never lose context of your trade.',
    highlight: 'Draggable timer · Payment proof uploads',
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    title: 'Admin Command Center',
    description:
      'Real-time platform oversight: profit & loss, system health bars, oracle status, engine diagnostics, dispute queue. Everything you need to run a regulated VASP.',
    highlight: 'War Room access · 24/7 monitoring',
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: TrendingUp,
    title: 'Goal-Based Savings',
    description:
      'Lock funds toward goals with daily/weekly/monthly schedules. Streak tracking rewards consistency. Early withdrawal triggers a configurable penalty — discipline by design.',
    highlight: 'Streak rewards · Auto-deposits',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    title: 'Activity Center',
    description:
      'Categorized notifications: active chats, transaction history, security events, and announcements. Every notification deep-links straight to the right screen.',
    highlight: 'Real-time push · Deep-linked',
  },
]

// =============================================================================
// SCREEN COMPONENTS — Each renders inside the phone mockup.
// =============================================================================

function BalanceScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#0B0E11] to-[#161618] p-4 flex flex-col">
      <div className="flex justify-between text-[8px] text-white/50 mb-3">
        <span>9:41</span>
        <div className="flex gap-1"><span>4G</span><span>100%</span></div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-sm" style={{ fontFamily: 'Space Grotesk', color: accent }}>
          AZAMAN
        </span>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
            <MessageSquare size={10} className="text-white/60" />
          </div>
          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-[8px] font-bold" style={{ color: accent }}>HQ</span>
          </div>
        </div>
      </div>
      <div className="relative rounded-2xl p-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #161618, #0B0B0D, #000)' }}>
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white/85 text-[10px] font-medium">pyraxxz</div>
              <div className="text-white/40 text-[7px]">@UID-1</div>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}30` }}>
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
              <span className="text-[6px] font-mono" style={{ color: accent }}>04:32</span>
            </div>
          </div>
          <div className="text-white text-xl font-bold mt-3 mb-1" style={{ fontFamily: 'Space Grotesk' }}>GH₵ 12,450.00</div>
          <div className="flex items-center gap-2 text-[8px]">
            <span style={{ color: accent }}>1,088.65 USDC</span>
            <span className="text-white/30">|</span>
            <span className="text-[#02C076]">Rate: GH₵ 11.44</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 px-2">
        {[
          { label: 'Deposit', Icon: Download },
          { label: 'Withdraw', Icon: Upload },
          { label: 'Transfer', Icon: ArrowUpDown },
        ].map(({ label, Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <Icon size={12} style={{ color: accent }} />
            </div>
            <span className="text-[7px] text-white/60">{label}</span>
          </div>
        ))}
      </div>
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
          <div className="text-[9px] font-semibold" style={{ color: accent }}>$50.00</div>
        </div>
      </div>
    </div>
  )
}

function P2PMarketScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-2.5">
      <div className="flex justify-between text-[8px] text-white/50 mb-1">
        <span>9:41</span>
        <span className="text-white/70 font-medium">P2P Market</span>
        <span>●●●</span>
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <span className="text-[9px] text-white/70 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#02C076] animate-pulse" />
          AI Smart Filter
        </span>
        <div className="w-9 h-[18px] rounded-full flex items-center justify-end px-0.5" style={{ background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)' }}>
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
        </div>
      </div>
      {[
        { name: 'KwameGold', rate: '11.44', method: 'Bank Transfer', risk: 'Low', riskColor: '#02C076', trades: 312, completion: '98%', aiScore: '94%' },
        { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', risk: 'Low', riskColor: '#02C076', trades: 189, completion: '95%', aiScore: '78%' },
        { name: 'KofiBarter', rate: '11.60', method: 'CashApp', risk: 'Med', riskColor: '#F0B90B', trades: 67, completion: '82%', aiScore: '61%' },
      ].map((vendor, i) => (
        <motion.div
          key={vendor.name}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="p-3 rounded-xl border border-white/5 bg-white/[0.02]"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: `${accent}15`, color: accent }}>
                {vendor.name[0]}
              </div>
              <div>
                <div className="text-[9px] text-white font-medium">{vendor.name}</div>
                <div className="text-[7px] text-white/40">{vendor.method}</div>
              </div>
            </div>
            <span className="text-[6px] px-1.5 py-0.5 rounded-full border" style={{ color: vendor.riskColor, borderColor: `${vendor.riskColor}40`, backgroundColor: `${vendor.riskColor}10` }}>
              {vendor.risk}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-white font-semibold">GH₵ {vendor.rate}/USDC</span>
            <div className="flex items-center gap-1 text-[6px] text-white/50">
              <span>{vendor.trades} trades</span>
              <span>•</span>
              <span>{vendor.completion}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[7px] text-[#8b5cf6] font-medium">AI Score: {vendor.aiScore}</span>
            <button className="text-[7px] px-2.5 py-1 rounded-lg font-bold" style={{ backgroundColor: accent, color: '#000' }}>
              Trade Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ChatScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: `${accent}15`, color: accent }}>K</div>
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
      <motion.div
        className="self-center px-4 py-1.5 rounded-full mb-3 cursor-grab"
        style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}40` }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] font-mono font-bold" style={{ color: accent }}>⏱ 12:45 remaining</span>
      </motion.div>
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        <div className="self-center px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
          <span className="text-[7px] text-white/50">Trade initiated • GH₵ 1,144 for 100 USDC</span>
        </div>
        <div className="self-start max-w-[75%] px-3 py-2 rounded-xl rounded-bl-sm bg-[#1E2329] text-[8px] text-white/80">
          Please send to MTN MoMo: 024-xxx-xxxx. Name: Kwame A.
        </div>
        <div className="self-end max-w-[75%] px-3 py-2 rounded-xl rounded-br-sm text-[8px] text-white/85" style={{ backgroundColor: `${accent}25` }}>
          Payment sent! Uploading proof now...
        </div>
        <div className="self-end max-w-[75%] px-2.5 py-2 rounded-xl rounded-br-sm bg-[#02C076]/10 border border-[#02C076]/20">
          <div className="text-[7px] text-[#02C076] font-medium flex items-center gap-1">
            <Upload size={8} />
            Payment Proof Uploaded
          </div>
          <div className="text-[6px] text-white/40 mt-0.5">MoMo Receipt • Ref: TXN-88421</div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-2 mb-2">
        <span className="px-2.5 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff] font-medium">+15m</span>
        <span className="px-2.5 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff] font-medium">+30m</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex-1 h-8 rounded-full bg-white/5 border border-white/10 px-3 flex items-center">
          <span className="text-[8px] text-white/40">Type a message...</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
          <Send size={10} className="text-black" />
        </div>
      </div>
    </div>
  )
}

function AdminScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-3.5 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <motion.div
          className="w-4 h-4 rounded flex items-center justify-center"
          style={{ backgroundColor: `${accent}15` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-[7px]" style={{ color: accent }}>◎</span>
        </motion.div>
        <span className="text-[8px] text-white font-bold tracking-[0.15em]">ADMIN COMMAND CENTER</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Profit', value: '$2,847', color: accent },
          { label: 'Users', value: '1,847', color: '#02C076' },
          { label: '24h Vol', value: 'GHS 142K', color: '#ff6b35' },
        ].map((s) => (
          <div key={s.label} className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-[10px] font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[6px] text-white/50 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="text-[7px] text-white/50 mb-1.5 uppercase tracking-wider">System Health</div>
        {[
          { name: 'Master Crypto', pct: 80, color: accent },
          { name: 'Hot Wallet', pct: 45, color: '#02C076' },
          { name: 'Fiat Pool', pct: 60, color: '#ff6b35' },
          { name: 'Profit Fees', pct: 30, color: '#F6465D' },
        ].map((pool, i) => (
          <div key={pool.name} className="flex items-center gap-2 mb-1">
            <span className="text-[6px] text-white/70 w-16 truncate">{pool.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pool.pct}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ background: pool.color }}
              />
            </div>
            <span className="text-[6px] text-white/50 w-6 text-right">{pool.pct}%</span>
          </div>
        ))}
      </div>
      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="text-[7px] text-white/50 mb-1 uppercase tracking-wider flex items-center justify-between">
          <span>Oracle Status</span>
          <span className="text-[6px] px-1 py-0.5 rounded bg-[#02C076]/10 text-[#02C076]">LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1">
          {[
            ['USD→GHS', '15.20'],
            ['Retail', '15.45'],
            ['Corporate', '14.80'],
          ].map(([label, val]) => (
            <div key={label} className="text-center">
              <div className="text-[6px] text-white/40">{label}</div>
              <div className="text-[8px] text-white font-semibold">{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#02C076]/5 border border-[#02C076]/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#02C076] animate-pulse" />
        <span className="text-[7px] text-[#02C076] font-bold">ONLINE</span>
        <span className="text-[6px] text-white/40">Node v22</span>
        <span className="text-[6px] text-white/40 ml-auto">Uptime 47d</span>
      </div>
      <div className="mt-auto p-2.5 rounded-xl text-center cursor-pointer" style={{ background: 'linear-gradient(90deg, rgba(246,70,93,0.8), #F6465D)' }}>
        <span className="text-[8px] text-white font-bold tracking-wider">🚨 OPEN WAR ROOM</span>
      </div>
    </div>
  )
}

function SavingsScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-2.5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] text-white font-bold">Savings Goals</span>
        <TrendingUp size={12} style={{ color: accent }} />
      </div>
      <div
        className="p-3 rounded-xl text-center"
        style={{
          background: `linear-gradient(135deg, ${accent}15, transparent)`,
          border: `1px solid ${accent}25`,
        }}
      >
        <div className="text-[7px] text-white/60 mb-0.5">Total Locked</div>
        <div className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk', color: accent }}>GH₵ 4,200.00</div>
        <div className="text-[7px] text-white/50">≈ $367.13 USDC</div>
      </div>
      <div className="flex justify-between px-1">
        {[
          { emoji: '🔥', label: '12 Streak' },
          { emoji: '🏆', label: '18 Best' },
          { emoji: '💰', label: '47 Deps' },
          { emoji: '🎯', label: '4 Goals' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[12px]">{stat.emoji}</div>
            <div className="text-[6px] text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>
      {[
        { name: 'Emergency Fund', progress: 75, streak: 12, current: 'GH₵ 1,500', target: 'GH₵ 2,000', freq: 'WEEKLY · GH₵ 100', color: '#02C076' },
        { name: 'New MacBook', progress: 40, streak: 5, current: 'GH₵ 2,000', target: 'GH₵ 5,000', freq: 'MONTHLY · GH₵ 500', color: '#00d4ff' },
        { name: 'Travel Fund', progress: 20, streak: 3, current: 'GH₵ 600', target: 'GH₵ 3,000', freq: 'BIWEEKLY · GH₵ 200', color: accent },
      ].map((goal, i) => (
        <motion.div
          key={goal.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] text-white font-medium">{goal.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[6px] flex items-center gap-0.5" style={{ color: goal.color }}>
                <Flame size={8} /> {goal.streak}d
              </span>
              <span className="text-[5px] px-1 py-0.5 rounded bg-[#02C076]/10 text-[#02C076] font-bold">ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="h-full rounded-full"
                style={{ background: goal.color }}
              />
            </div>
            <span className="text-[7px] text-white/60">{goal.progress}%</span>
          </div>
          <div className="flex justify-between text-[6px] text-white/40">
            <span>{goal.current} / {goal.target}</span>
            <span>{goal.freq}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function NotificationsScreen({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-white font-bold">Activity Center</span>
        <Bell size={12} style={{ color: accent }} />
      </div>
      {[
        { icon: MessageCircle, title: 'Active Chats & Trades', subtitle: '2 trades need attention', accent: '#00d4ff', badge: '2' },
        { icon: History, title: 'Transaction History', subtitle: '12 transactions this week', accent: '#02C076', badge: null as string | null },
        { icon: Shield, title: 'Security & Account', subtitle: 'New login detected', accent: '#F6465D', badge: '!' },
        { icon: Megaphone, title: 'Announcements', subtitle: 'v4.0 is live!', accent, badge: null as string | null },
      ].map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.accent}20` }}>
              <Icon size={14} style={{ color: item.accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-white font-medium">{item.title}</div>
              <div className="text-[7px] text-white/50 mt-0.5">{item.subtitle}</div>
            </div>
            {item.badge ? (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ backgroundColor: item.accent }}>
                {item.badge}
              </div>
            ) : (
              <ChevronRight size={12} className="text-white/30 flex-shrink-0" />
            )}
          </motion.div>
        )
      })}
      <div className="mt-auto p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="text-[7px] text-white/50 mb-1.5 uppercase tracking-wider">Latest</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#02C076]" />
          <span className="text-[7px] text-white/70">Trade #1024 completed • 2 min ago</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-[7px] text-white/70">Deposit confirmed • GH₵ 500 • 15 min ago</span>
        </div>
      </div>
    </div>
  )
}

const SCREENS: Record<string, React.FC<{ accent: string }>> = {
  balance: BalanceScreen,
  p2p: P2PMarketScreen,
  chat: ChatScreen,
  admin: AdminScreen,
  savings: SavingsScreen,
  notifications: NotificationsScreen,
}

export default function AppShowcase() {
  const { theme } = useTheme()
  const [activeIdx, setActiveIdx] = useState(0)
  const activeTab = TABS[activeIdx]
  const ActiveScreen = SCREENS[activeTab.id]

  return (
    <section
      id="showcase"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Ambient glow that follows the active tab */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 600px at 50% 50%, ${theme.glow}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Sparkles size={12} />
            App Experience
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            Tap any screen to{' '}
            <span style={{ color: theme.accent }}>see it live.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: theme.textMuted }}>
            Every screen is crafted with premium glassmorphism, real animations, and instant
            responsiveness. Try them all.
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
            <div
              className="relative w-[260px] h-[540px] sm:w-[290px] sm:h-[600px] rounded-[40px] border-[3px] bg-black overflow-hidden"
              style={{
                borderColor: '#1F2128',
                boxShadow: `0 0 60px rgba(0,0,0,0.8), 0 0 120px ${theme.glow}25`,
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
              {/* Screen */}
              <div className="absolute inset-[3px] rounded-[37px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <ActiveScreen accent={theme.accent} />
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/30 z-20" />
            </div>
            {/* Themed glow behind phone */}
            <div
              className="absolute -inset-12 -z-10 rounded-full blur-3xl opacity-30"
              style={{ background: theme.glow }}
            />
          </motion.div>

          {/* Tabs + description */}
          <div className="flex-1 w-full max-w-lg order-2 lg:order-none">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {TABS.map((tab, i) => {
                const Icon = tab.icon
                const isActive = activeIdx === i
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveIdx(i)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? `${theme.accent}20` : `${theme.surface}80`,
                      color: isActive ? theme.accent : theme.textSecondary,
                      border: `1.5px solid ${isActive ? theme.accent : theme.border}`,
                      boxShadow: isActive ? `0 0 20px ${theme.accent}30` : 'none',
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center lg:text-left"
              >
                <h3
                  className="text-xl sm:text-2xl font-bold mb-3"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  {activeTab.title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed mb-4"
                  style={{ color: theme.textSecondary }}
                >
                  {activeTab.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${theme.accent}10`,
                    border: `1px solid ${theme.accent}25`,
                    color: theme.accent,
                  }}
                >
                  <Sparkles size={12} />
                  {activeTab.highlight}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tab counter */}
            <div className="mt-6 flex items-center gap-2 text-xs" style={{ color: theme.textMuted }}>
              <span>{activeIdx + 1} / {TABS.length}</span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.border }} />
              <span>← → to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
