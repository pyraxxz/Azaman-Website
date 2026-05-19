import React from 'react';
import { motion } from 'framer-motion';

const ACCENT_MAP = {
  cyan: '#00d4ff',
  gold: '#ffd700',
  green: '#00ff88',
  red: '#ff4444',
  purple: '#ff00ff',
};

export function H2({ children, accent = 'cyan', className = '' }) {
  return (
    <motion.h2
      className={`text-2xl sm:text-3xl lg:text-[40px] font-semibold mb-4 leading-tight font-heading ${className}`}
      style={{ color: ACCENT_MAP[accent], letterSpacing: '-0.01em' }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
}

export function H3({ children, accent = 'gold', className = '' }) {
  return (
    <h3
      className={`text-lg sm:text-xl lg:text-[22px] font-semibold mt-10 mb-4 leading-snug font-heading ${className}`}
      style={{ color: ACCENT_MAP[accent] }}
    >
      {children}
    </h3>
  );
}

export function H4({ children, accent = 'green', className = '' }) {
  return (
    <h4
      className={`text-base sm:text-lg font-semibold mt-6 mb-3 leading-snug font-heading ${className}`}
      style={{ color: ACCENT_MAP[accent] }}
    >
      {children}
    </h4>
  );
}
