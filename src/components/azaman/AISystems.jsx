import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertTriangle, Sparkles, Activity, ChevronRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2, H3 } from './SectionHeading';
import { SectionIntro } from './ReusableComponents';

function AIAlertTerminal() {
  const alerts = [
    { type: 'warning', text: 'MATIC reserves at 5%. External payouts will fail in ~12 hours. Top-up required.', time: '14:23:01', confidence: null },
    { type: 'critical', text: 'Fiat pool critically low — 45% spike in withdrawal volume. Recommend liquidating 10,000 USDC on Binance.', time: '14:23:45', confidence: null },
    { type: 'info', text: 'Smart Filter detected user_3847 prefers MoMo + $200-500 trades. Reordering marketplace feed.', time: '14:24:12', confidence: null },
    { type: 'dispute', text: 'Past 3 similar cases ruled in buyer favor. Recommend release. Confidence: 87%.', time: '14:25:03', confidence: 87 },
  ];

  const [visibleAlerts, setVisibleAlerts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (currentIdx >= alerts.length) return;
    const timer = setTimeout(() => {
      setVisibleAlerts(prev => [...prev, alerts[currentIdx]]);
      setCurrentIdx(prev => prev + 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [currentIdx]);

  const getColor = (type) => {
    switch (type) {
      case 'warning': return '#ffd700';
      case 'critical': return '#ff4444';
      case 'info': return '#00d4ff';
      case 'dispute': return '#ff00ff';
      default: return '#888';
    }
  };

  return (
    <div className="rounded-xl overflow-hidden my-8" style={{ background: '#0d0d0d', border: '1px solid #2a2a3e' }}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: '#1a1a2e', borderBottom: '1px solid #2a2a3e' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff4444' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffd700' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00ff88' }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider ml-2" style={{ color: '#888' }}>
          AI Operational CFO — Live Feed
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
          <span className="text-[10px] font-mono" style={{ color: '#00ff88' }}>ONLINE</span>
        </div>
      </div>

      <div className="p-4 space-y-2 min-h-[200px] font-mono text-xs">
        <AnimatePresence>
          {visibleAlerts.map((alert, i) => (
            <motion.div
              key={i}
              className="flex gap-3 items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span style={{ color: '#555' }}>[{alert.time}]</span>
              <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ color: getColor(alert.type), background: `${getColor(alert.type)}10` }}>
                {alert.type}
              </span>
              <span style={{ color: '#ccc' }}>{alert.text}</span>
              {alert.confidence && (
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#ff00ff15', color: '#ff00ff' }}>
                  {alert.confidence}%
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {visibleAlerts.length < alerts.length && (
          <div className="flex items-center gap-1" style={{ color: '#555' }}>
            <span className="animate-pulse">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

const AI_FEATURES = [
  {
    icon: Brain,
    title: 'AI Operational CFO',
    desc: 'Monitors MATIC reserves and fiat liquidity in real time. Generates natural-language alerts when thresholds are breached.',
    color: '#00d4ff',
    detail: 'Replaces static dashboards with actionable, context-aware intelligence.',
  },
  {
    icon: Sparkles,
    title: 'Smart Ad Matchmaking',
    desc: 'LLM learns transaction history, payment preferences, and trade sizes to dynamically reorder marketplace feed.',
    color: '#ffd700',
    detail: 'Users toggle "AI Smart Filter" for personalized vendor recommendations.',
  },
  {
    icon: Activity,
    title: 'AI Dispute Memory',
    desc: 'Reads DisputeResolutionLog to suggest resolution paths. Learns from outcomes to improve accuracy.',
    color: '#ff00ff',
    detail: 'Admin retains final authority — AI provides guidance, not governance.',
  },
  {
    icon: AlertTriangle,
    title: 'AI Liquidity Monitor',
    desc: 'Dual-pool monitoring with LLM reasoning. Explains why alerts triggered and recommended actions.',
    color: '#00ff88',
    detail: 'Watches Local Fiat Pool and System Hot Wallet simultaneously.',
  },
];

export default function AISystems() {
  const [expanded, setExpanded] = useState(null);

  return (
    <SectionWrapper id="ai-systems">
      <H2>5. AI Command Center & Smart Systems</H2>
      <SectionIntro>
        Azaman is powered by an embedded LLM framework that acts as an autonomous operational layer, reducing human overhead while improving decision quality.
      </SectionIntro>

      <AIAlertTerminal />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AI_FEATURES.map((f, i) => {
          const Icon = f.icon;
          const isExpanded = expanded === i;
          return (
            <motion.div
              key={i}
              className="rounded-xl p-5 cursor-pointer"
              style={{
                background: isExpanded ? `${f.color}05` : '#1a1a2e',
                border: `1px solid ${isExpanded ? f.color + '30' : '#2a2a3e'}`,
              }}
              onClick={() => setExpanded(isExpanded ? null : i)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${f.color}12` }}>
                  <Icon size={18} style={{ color: f.color }} />
                </div>
                <h4 className="text-sm font-semibold text-white font-heading flex-1">{f.title}</h4>
                <ChevronRight
                  size={14}
                  className="transition-transform"
                  style={{ color: '#888', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }}
                />
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{f.desc}</p>
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    className="text-xs mt-3 pt-3 italic"
                    style={{ color: '#888', borderTop: '1px solid #2a2a3e' }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {f.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
