import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Shield, Zap, Globe, TrendingUp } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const META_ITEMS = [
  { label: 'Scale Target', value: 'Enterprise / Millions', icon: TrendingUp },
  { label: 'Core Identity', value: 'Neo-Bank & P2P Hybrid', icon: Zap },
  { label: 'Primary Market', value: 'Ghana / West Africa', icon: Globe },
  { label: 'Regulatory Framework', value: 'Act 1154 (2025)', icon: Shield },
];

const TICKER_ITEMS = [
  { pair: 'USDC/GHS', value: '14.85', change: '+0.12%', positive: true },
  { pair: 'USDC/NGN', value: '1,615.00', change: '+0.34%', positive: true },
  { pair: 'BTC/USD', value: '67,842.50', change: '-0.18%', positive: false },
  { pair: 'ETH/USD', value: '3,521.30', change: '+1.24%', positive: true },
  { pair: 'MATIC/USD', value: '0.7842', change: '+0.56%', positive: true },
  { pair: 'Platform Vol.', value: '$2.4M', change: '24h', positive: true },
  { pair: 'Active Users', value: '12,847', change: '+342', positive: true },
  { pair: 'P2P Trades', value: '1,204', change: 'today', positive: true },
];

function AnimatedCounter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 2000;
    const startTime = Date.now();

    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function LiveTicker() {
  return (
    <div className="w-full overflow-hidden" style={{ borderTop: '1px solid #2a2a3e', borderBottom: '1px solid #2a2a3e' }}>
      <div className="flex animate-ticker">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-3 whitespace-nowrap shrink-0">
            <span className="text-xs font-medium" style={{ color: '#888' }}>{item.pair}</span>
            <span className="text-sm font-semibold text-white font-mono">{item.value}</span>
            <span className="text-xs font-medium" style={{ color: item.positive ? '#00ff88' : '#ff4444' }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative flex flex-col">
      <div className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden">
        <ParticleCanvas />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(circle at center, rgba(10,10,10,0.7) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-[2] px-5 max-w-4xl">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: '#00ff88' }} />
            <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#00d4ff' }}>
              Built for Act 1154 Compliance
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] mb-5 gradient-text font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            AZAMAN
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-light mb-3 font-heading"
            style={{ color: '#aaa' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Enterprise Neo-Bank & P2P Exchange Architecture
          </motion.p>

          <motion.p
            className="text-sm sm:text-base italic max-w-[640px] mx-auto mb-10 leading-relaxed"
            style={{ color: '#888' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            A purpose-built financial ecosystem unifying local fiat liquidity with a mathematically infallible USDC backend, engineered for emerging markets where legacy banking has not kept pace with digital asset adoption.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {META_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass-card p-4 text-center">
                  <Icon size={18} className="mx-auto mb-2" style={{ color: '#00d4ff' }} />
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] mb-1" style={{ color: '#888' }}>
                    {item.label}
                  </div>
                  <div className="text-sm sm:text-base font-semibold" style={{ color: '#00d4ff' }}>
                    {item.value}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-heading" style={{ color: '#00ff88' }}>
                <AnimatedCounter end={14} prefix="$" suffix=".85" />
              </div>
              <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#888' }}>USDC/GHS Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-heading" style={{ color: '#00d4ff' }}>
                <AnimatedCounter end={2} prefix="$" suffix=".4M" />
              </div>
              <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#888' }}>24h Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-heading" style={{ color: '#ffd700' }}>
                <AnimatedCounter end={12847} />
              </div>
              <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: '#888' }}>Active Users</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} style={{ color: '#888' }} />
        </motion.div>
      </div>

      <LiveTicker />
    </div>
  );
}
