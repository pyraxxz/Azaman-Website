import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ArrowLeftRight, MessageSquare, ShieldCheck, TrendingUp } from 'lucide-react'

const SCREENS = [
  {
    id: 'balance',
    label: 'Balance',
    icon: Wallet,
    title: 'Hologram Balance Card',
    description: 'Your net worth displayed beautifully. USDC balance converted to local currency in real-time using live oracle rates. The slender black card with titanium light sweep animation — pure premium.',
    screen: (
      <div className="w-full h-full bg-gradient-to-b from-[#0B0E11] to-[#161618] p-5 flex flex-col">
        {/* Status bar */}
        <div className="flex justify-between text-[8px] text-[#888] mb-4">
          <span>9:41</span>
          <div className="flex gap-1"><span>4G</span><span>100%</span></div>
        </div>
        {/* App bar */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-[#D4AF37] font-bold text-sm" style={{ fontFamily: 'Space Grotesk' }}>AZAMAN</span>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center"><MessageSquare size={10} className="text-white/60" /></div>
            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center"><span className="text-[8px] text-[#D4AF37] font-bold">HQ</span></div>
          </div>
        </div>
        {/* Balance card */}
        <div className="relative rounded-2xl p-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #161618, #0B0B0D, #000)' }}>
          <div className="absolute inset-0 border border-white/8 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="relative z-10">
            <div className="text-white/80 text-[10px] font-medium mb-1">pyraxxz</div>
            <div className="text-white/40 text-[7px] mb-4">@UID-1</div>
            <div className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>GH₵ 12,450.00</div>
            <div className="flex items-center gap-2 text-[8px]">
              <span className="text-[#D4AF37]">1,088.65 USDC</span>
              <span className="text-white/30">|</span>
              <span className="text-[#00ff88]">GH₵ 11.44</span>
              <span className="text-white/30">09:42</span>
            </div>
          </div>
        </div>
        {/* Quick actions */}
        <div className="flex justify-between mt-4 px-4">
          {['Deposit', 'Withdraw', 'Transfer'].map(action => (
            <div key={action} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
              <span className="text-[7px] text-white/50">{action}</span>
            </div>
          ))}
        </div>
        {/* Milestone */}
        <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="flex justify-between text-[8px] mb-1">
            <span className="text-white/60">Bronze Trader</span>
            <span className="text-[#D4AF37]">65%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#D4AF37] to-[#ffd700]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'p2p',
    label: 'P2P Market',
    icon: ArrowLeftRight,
    title: 'Live P2P Marketplace',
    description: 'Apple Wallet-style card stacking, AI smart filter toggle, real-time vendor ads with risk tags, and instant trade initiation. Liquid glass aesthetic with dynamic blur effects.',
    screen: (
      <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-3">
        <div className="flex justify-between text-[8px] text-[#888] mb-1">
          <span>9:41</span><span>P2P Market</span>
        </div>
        {/* AI Filter */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
          <span className="text-[9px] text-white/60 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" /> AI Smart Filter</span>
          <div className="w-8 h-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] flex items-center justify-end px-0.5">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
        {/* Vendor cards */}
        {[
          { name: 'KwameGold', rate: '11.44', method: 'Bank Transfer', risk: 'Low', color: '#00ff88', score: '94%' },
          { name: 'AkosuaSwap', rate: '11.52', method: 'MoMo', risk: 'Low', color: '#00ff88', score: '78%' },
          { name: 'KofiBarter', rate: '11.60', method: 'CashApp', risk: 'Med', color: '#ffaa00', score: '61%' },
        ].map((vendor) => (
          <div key={vendor.name} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[8px] font-bold text-[#D4AF37]">{vendor.name[0]}</div>
                <div>
                  <div className="text-[9px] text-white font-medium">{vendor.name}</div>
                  <div className="text-[7px] text-white/40">{vendor.method}</div>
                </div>
              </div>
              <span className="text-[7px] px-1.5 py-0.5 rounded-full border" style={{ color: vendor.color, borderColor: `${vendor.color}40` }}>{vendor.risk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white font-semibold">GH₵ {vendor.rate}/USDC</span>
              <div className="flex items-center gap-2">
                <span className="text-[7px] text-[#8b5cf6]">AI {vendor.score}</span>
                <button className="text-[7px] px-2 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#ffd700] text-black font-bold">Trade</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    title: 'Dual-Environment Chat',
    description: 'Trade-bound chats with floating countdown timer, payment proof uploads, and extension chips. Personal chats with in-chat transfers and biometric gates. Every conversation is a transaction surface.',
    screen: (
      <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[8px] font-bold text-[#D4AF37]">K</div>
          <div>
            <div className="text-[9px] text-white font-medium">Trade #1024</div>
            <div className="text-[7px] text-[#00ff88]">Active — Please make payment</div>
          </div>
        </div>
        {/* Timer pill */}
        <div className="self-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-3">
          <span className="text-[8px] text-[#D4AF37] font-mono">12:45 remaining</span>
        </div>
        {/* Messages */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="self-start max-w-[70%] px-3 py-2 rounded-xl rounded-bl-sm bg-[#1E2329] text-[8px] text-white/80">Please send to MTN MoMo: 024-xxx-xxxx</div>
          <div className="self-end max-w-[70%] px-3 py-2 rounded-xl rounded-br-sm bg-[#D4AF37]/20 text-[8px] text-white/80">Payment sent! Uploading proof now...</div>
          <div className="self-end max-w-[70%] px-2 py-1.5 rounded-xl rounded-br-sm bg-[#00ff88]/10 border border-[#00ff88]/20">
            <div className="text-[7px] text-[#00ff88] font-medium">Payment Proof Uploaded</div>
            <div className="text-[6px] text-white/40">Sender: Kofi Mensah</div>
          </div>
          <div className="self-start max-w-[70%] px-3 py-2 rounded-xl rounded-bl-sm bg-[#1E2329] text-[8px] text-white/80">Received! Releasing now... ✓</div>
        </div>
        {/* Extension chips */}
        <div className="flex gap-1 mt-2 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff]">+15m</span>
          <span className="px-2 py-0.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[7px] text-[#00d4ff]">+30m</span>
        </div>
        {/* Input */}
        <div className="flex gap-2 items-center">
          <div className="flex-1 h-7 rounded-full bg-white/5 border border-white/10 px-3 flex items-center">
            <span className="text-[8px] text-white/30">Type a message...</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <span className="text-[10px] text-black">→</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    title: 'Admin War Room',
    description: 'Full platform oversight with real-time analytics, system health monitoring, dispute resolution, and KYC management. Every metric from every corner of the platform, in one command center.',
    screen: (
      <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded bg-[#00d4ff]/15 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
            <span className="text-[6px] text-[#00d4ff]">◎</span>
          </div>
          <span className="text-[9px] text-white font-bold tracking-wider">ADMIN COMMAND CENTER</span>
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Profit', value: '$2,847', color: '#D4AF37' },
            { label: 'Users', value: '1,847', color: '#00ff88' },
            { label: '24h Vol', value: 'GHS 142K', color: '#ff6b35' },
          ].map(s => (
            <div key={s.label} className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-center">
              <div className="text-[10px] font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[6px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        {/* System health */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[7px] text-white/40 mb-1.5 uppercase tracking-wider">System Health</div>
          {['Master Crypto', 'Hot Wallet', 'Fiat Pool', 'Profit Fees'].map((pool, i) => (
            <div key={pool} className="flex items-center gap-2 mb-1">
              <span className="text-[7px] text-white/60 w-16">{pool}</span>
              <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${[80, 45, 60, 30][i]}%`, background: ['#D4AF37', '#00ff88', '#ff6b35', '#ff4444'][i] }} />
              </div>
            </div>
          ))}
        </div>
        {/* Engine status */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#00ff88]/5 border border-[#00ff88]/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
          <span className="text-[7px] text-[#00ff88] font-bold">ENGINE: ONLINE</span>
          <span className="text-[6px] text-white/30 ml-auto">Node v20.11</span>
        </div>
        {/* War room button */}
        <div className="mt-auto p-2 rounded-xl bg-gradient-to-r from-[#ff4444]/80 to-[#ff4444] text-center">
          <span className="text-[8px] text-white font-bold tracking-wider">OPEN WAR ROOM</span>
        </div>
      </div>
    ),
  },
  {
    id: 'savings',
    label: 'Savings',
    icon: TrendingUp,
    title: 'Goal-Based Savings',
    description: 'Lock funds toward goals with streak tracking, progress rings, and due date reminders. Gamified savings that make building wealth a daily habit, not a chore.',
    screen: (
      <div className="w-full h-full bg-[#0B0E11] p-4 flex flex-col gap-3">
        <div className="text-[9px] text-white font-bold mb-1">Savings Goals</div>
        {/* Total card */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 text-center">
          <div className="text-[8px] text-white/50 mb-0.5">Total Locked</div>
          <div className="text-lg font-bold text-[#D4AF37]" style={{ fontFamily: 'Space Grotesk' }}>$1,240.00</div>
          <div className="text-[7px] text-white/40">4 active goals</div>
        </div>
        {/* Goals */}
        {[
          { name: 'Emergency Fund', progress: 75, streak: 12, target: '$2,000', color: '#00ff88' },
          { name: 'New Phone', progress: 40, streak: 5, target: '$800', color: '#00d4ff' },
          { name: 'Travel Fund', progress: 20, streak: 3, target: '$3,000', color: '#ffd700' },
        ].map(goal => (
          <div key={goal.name} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[8px] text-white font-medium">{goal.name}</span>
              <span className="text-[7px]" style={{ color: goal.color }}>🔥 {goal.streak} days</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${goal.progress}%`, background: goal.color }} />
              </div>
              <span className="text-[7px] text-white/40">{goal.progress}%</span>
            </div>
            <div className="text-[6px] text-white/30 mt-1">Target: {goal.target}</div>
          </div>
        ))}
      </div>
    ),
  },
]

export default function AppShowcase() {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <section id="showcase" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-[#ffd700] uppercase tracking-[0.2em] mb-4 block">App Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            See it in action
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Every screen is crafted with premium glassmorphism, smooth animations, and instant responsiveness.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            {/* Phone frame */}
            <div className="relative w-[280px] h-[580px] rounded-[40px] border-[3px] border-[#333] bg-black shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_100px_rgba(0,212,255,0.1)] overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />
              {/* Screen content */}
              <div className="absolute inset-[3px] rounded-[37px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {SCREENS[activeScreen].screen}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/20 z-20" />
            </div>
            {/* Glow behind phone */}
            <div className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-20 bg-[#00d4ff]" />
          </motion.div>

          {/* Tab navigation + description */}
          <div className="flex-1 max-w-lg">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {SCREENS.map((screen, i) => {
                const Icon = screen.icon
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeScreen === i
                        ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30'
                        : 'text-[#888] border border-white/5 hover:border-white/10 hover:text-white/60'
                    }`}
                  >
                    <Icon size={14} />
                    {screen.label}
                  </button>
                )
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
              >
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                  {SCREENS[activeScreen].title}
                </h3>
                <p className="text-[#aaa] leading-relaxed">
                  {SCREENS[activeScreen].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
