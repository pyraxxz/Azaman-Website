import React from 'react';
import { motion } from 'framer-motion';

const ACCENT_MAP = {
  cyan: '#00d4ff',
  gold: '#ffd700',
  green: '#00ff88',
  red: '#ff4444',
  purple: '#ff00ff',
};

export function CardGrid({ cards, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 my-8 ${className}`}>
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className="arch-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <h4
            className="text-base font-semibold mb-2 font-heading"
            style={{ color: ACCENT_MAP[card.accent || 'cyan'] }}
          >
            {card.title}
          </h4>
          <div className="text-sm leading-relaxed" style={{ color: '#aaa' }}>{card.content}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function DataTable({ data, className = '' }) {
  return (
    <div className={`overflow-x-auto my-6 ${className}`}>
      <table className="w-full border-collapse rounded-xl overflow-hidden" style={{ background: '#1a1a2e' }}>
        <thead>
          <tr style={{ background: '#16213e' }}>
            {data.headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap"
                style={{ color: '#00d4ff' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr
              key={ri}
              className="transition-colors"
              style={{
                borderBottom: ri < data.rows.length - 1 ? '1px solid #2a2a3e' : 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,212,255,0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-sm align-top" style={{ color: '#aaa' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HighlightBox({ title, children, variant = 'cyan' }) {
  const classMap = { cyan: '', gold: 'gold', red: 'red', green: 'green', purple: 'purple' };
  return (
    <motion.div
      className={`highlight-box ${classMap[variant]}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="text-base font-semibold mb-2 text-white font-heading">{title}</h4>
      <div className="text-sm leading-relaxed" style={{ color: '#aaa' }}>{children}</div>
    </motion.div>
  );
}

export function FormulaDisplay({ formula }) {
  return (
    <div className="formula">
      <code>{formula}</code>
    </div>
  );
}

export function SectionIntro({ children }) {
  return <p className="section-intro">{children}</p>;
}

export function Tag({ children, variant = 'low' }) {
  const classMap = { low: 'tag-low', med: 'tag-med', high: 'tag-high' };
  return <span className={`tag ${classMap[variant]}`}>{children}</span>;
}
