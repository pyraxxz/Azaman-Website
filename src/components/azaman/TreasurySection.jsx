import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, ArrowRightLeft, RefreshCw, Wallet, Lock, Building } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { DataTable, HighlightBox, FormulaDisplay, SectionIntro, CardGrid } from './ReusableComponents';

function HologramConverter() {
  const [usdcAmount, setUsdcAmount] = useState(1000);
  const [rate, setRate] = useState(14.85);
  const [rateHistory, setRateHistory] = useState(() => {
    const data = [];
    for (let i = 24; i >= 0; i--) {
      data.push({ hour: `${i}h`, rate: 14.5 + Math.random() * 0.8 });
    }
    return data;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 14.5 + Math.random() * 0.8;
      setRate(Number(newRate.toFixed(2)));
      setRateHistory(prev => {
        const next = [...prev.slice(1), { hour: 'now', rate: newRate }];
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ghsValue = (usdcAmount * rate).toFixed(2);

  return (
    <div className="rounded-2xl overflow-hidden my-8" style={{ background: 'rgba(26, 26, 46, 0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-semibold text-white font-heading">Live Hologram Converter</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
            <span className="text-xs font-mono" style={{ color: '#00ff88' }}>LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="p-4 rounded-xl" style={{ background: '#111', border: '1px solid #2a2a3e' }}>
            <label className="text-[10px] uppercase tracking-wider mb-2 block" style={{ color: '#888' }}>You Hold (USDC)</label>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white font-heading">$</span>
              <input
                type="number"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(Number(e.target.value) || 0)}
                className="bg-transparent text-2xl font-bold text-white font-heading w-full outline-none"
                style={{ appearance: 'textfield' }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: '#888' }}>Stablecoin • 1:1 USD Peg</p>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw size={20} style={{ color: '#00d4ff' }} />
            </motion.div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
            <label className="text-[10px] uppercase tracking-wider mb-2 block" style={{ color: '#888' }}>Displayed as (GHS)</label>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-heading" style={{ color: '#ffd700' }}>₵</span>
              <motion.span
                key={ghsValue}
                className="text-2xl font-bold font-heading"
                style={{ color: '#ffd700' }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Number(ghsValue).toLocaleString()}
              </motion.span>
            </div>
            <p className="text-xs mt-1" style={{ color: '#888' }}>
              Rate: <span className="font-mono" style={{ color: '#00d4ff' }}>{rate}</span> GHS/USDC
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-2 mt-4">
        <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#888' }}>24h Rate History</p>
        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rateHistory}>
              <defs>
                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="rate" stroke="#00d4ff" fill="url(#rateGrad)" strokeWidth={1.5} dot={false} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#888' }}
                itemStyle={{ color: '#00d4ff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function TriWalletDiagram() {
  const wallets = [
    { name: 'Master Treasury', subtitle: 'Cold/Warm Storage', icon: Lock, color: '#ffd700', pct: 85, asset: 'USDC (Bulk)' },
    { name: 'System Hot Wallet', subtitle: 'Automated Payouts', icon: Wallet, color: '#ff4444', pct: 10, asset: 'USDC + MATIC' },
    { name: 'Local Fiat Pool', subtitle: 'GHS Liquidity', icon: Building, color: '#00d4ff', pct: 5, asset: 'GHS' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      {wallets.map((w, i) => {
        const Icon = w.icon;
        return (
          <motion.div
            key={i}
            className="relative rounded-xl p-5 overflow-hidden"
            style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="absolute bottom-0 left-0 right-0 transition-all duration-1000" style={{ height: `${w.pct}%`, background: `${w.color}08` }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Icon size={18} style={{ color: w.color }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: w.color }}>{w.name}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: '#888' }}>{w.subtitle}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold font-heading text-white">{w.pct}%</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: '#888' }}>{w.asset}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const FLOW_TABS = [
  {
    label: 'Fiat Deposit', color: '#00ff88', icon: ArrowDown,
    steps: ['User deposits GHS via MoMo or Bank Transfer', 'Backend calculates equivalent USDC at live Yellow Card rate', "Credits user's availableBalance; GHS moves to Local Fiat Pool"],
    fee: 'No deposit fee',
  },
  {
    label: 'Fiat Withdrawal', color: '#ff4444', icon: ArrowUp,
    steps: ['User requests GHS payout from availableBalance', '2% Exit Fee deducted (1% platform, 1% influencer)', 'GHS paid from Local Fiat Pool; USDC moves to Master Treasury'],
    fee: '2% Exit Fee',
  },
  {
    label: 'Crypto Deposit', color: '#00d4ff', icon: ArrowDown,
    steps: ['User deposits to dedicated Polygon USDC address', 'Funds swept into Master Crypto Treasury', "User's sub-wallet acts as routing address; balance updated"],
    fee: 'Network gas only',
  },
  {
    label: 'Crypto Withdrawal', color: '#ff6b35', icon: ArrowUp,
    steps: ['User requests USDC to external Web3 wallet', '2% Exit Fee + 100% MATIC gas deducted', 'Funds leave System Hot Wallet; user pays all network fees'],
    fee: '2% Exit + Gas',
  },
];

const ARBITRAGE_CARDS = [
  { title: 'Corporate Purchasing', content: 'Admins purchase bulk USDC via institutional desk at subsidized corporate rates through Yellow Card.', accent: 'cyan' },
  { title: 'The Spread', content: 'Users deposit at retail rates. On withdrawal, Azaman takes ownership of USDC into Master Treasury at the spread.', accent: 'cyan' },
  { title: 'Bulk Liquidation', content: 'Accumulated crypto liquidated on Binance P2P at higher selling rates, capturing arbitrage as revenue.', accent: 'cyan' },
  { title: 'The 2% Exit Fee', content: 'All local fiat withdrawals incur 2% fee — mathematically prevents users from treating Azaman as an arbitrage bot.', accent: 'cyan' },
];

export default function TreasurySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionWrapper id="treasury">
      <H2>2. The Treasury Engine & Hologram Ledger System</H2>
      <SectionIntro>
        The fundamental challenge with crypto adoption in emerging markets is the dual threat of FX death spirals and prohibitive gas fees. Azaman solves this by removing local fiat from the core ledger entirely.
      </SectionIntro>

      <H3 accent="gold">2.1 The 1:1 USDC Rule & The Hologram</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        User balances are stored strictly as <strong className="text-white">USDC</strong>. The front-end renders a <strong className="text-white">"Hologram"</strong> of net worth in GHS via live market rates:
      </p>
      <FormulaDisplay formula="User USDC Balance × Live Market Rate = Displayed GHS" />

      <HologramConverter />

      <H3 accent="gold">2.2 Zero-Cost Internal Transfers</H3>
      <p className="leading-relaxed" style={{ color: '#aaa' }}>
        Traditional crypto transfers require gas fees. Azaman bypasses this for intra-platform movements — transfers execute as database updates in milliseconds.
        <strong className="text-white"> Zero gas. Zero congestion. Zero delay.</strong>
      </p>

      <H3 accent="gold">2.3 The Tri-Wallet Enterprise Flow</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        Money does not move on-chain for every transaction. Azaman utilizes an institutional-grade treasury architecture:
      </p>
      <TriWalletDiagram />

      <HighlightBox title="Corporate Supply Chain" variant="cyan">
        <p>
          Azaman acts as the primary USDC supplier. The Admin portal features a dedicated buying system allowing bulk USDC purchases at subsidized corporate rates. Azaman then supplies this to users at retail rate, profiting from the spread.
        </p>
      </HighlightBox>

      <H3 accent="gold">2.4 The Arbitrage Engine</H3>
      <p className="leading-relaxed mb-2" style={{ color: '#aaa' }}>
        Azaman generates sustainable revenue without charging exorbitant fees:
      </p>
      <CardGrid cards={ARBITRAGE_CARDS} />

      <H3 accent="gold">2.5 Deposits & Withdrawals</H3>

      <div className="my-6">
        <div className="flex flex-wrap gap-1 mb-4">
          {FLOW_TABS.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2"
                style={{
                  color: activeTab === i ? tab.color : '#888',
                  borderColor: activeTab === i ? tab.color : 'transparent',
                  opacity: activeTab === i ? 1 : 0.6,
                }}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="rounded-xl p-5"
            style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: FLOW_TABS[activeTab].color }} />
              <h4 className="text-sm font-semibold text-white">{FLOW_TABS[activeTab].label}</h4>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-sm mb-4" style={{ color: '#aaa' }}>
              {FLOW_TABS[activeTab].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
            <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid #2a2a3e' }}>
              <span className="text-xs uppercase tracking-wider" style={{ color: '#888' }}>Fee:</span>
              <span className="text-sm font-medium font-mono" style={{ color: FLOW_TABS[activeTab].color }}>
                {FLOW_TABS[activeTab].fee}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <HighlightBox title="Dynamic Fiat Liquidity Tags" variant="red">
        <p>
          When the Local Fiat Pool is low, the system displays a <strong className="text-white">"Limited Fiat"</strong> tag on the withdrawal screen. Tapping reveals: <em>"Limited local fiat withdrawals at this time. If it fails, try again within an hour."</em>
        </p>
      </HighlightBox>
    </SectionWrapper>
  );
}
