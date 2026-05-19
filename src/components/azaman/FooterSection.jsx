import React from 'react';

export default function FooterSection() {
  return (
    <footer style={{ background: '#111111', borderTop: '1px solid #1a1a2e' }}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 py-16 text-center">
        <p className="text-lg font-semibold mb-3 font-heading" style={{ color: '#00d4ff' }}>
          AZAMAN
        </p>
        <p className="text-sm mb-5" style={{ color: '#888' }}>
          Enterprise Neo-Bank & P2P Exchange Architecture
        </p>
        <div className="w-16 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #00d4ff, #ffd700)' }} />
        <p className="text-xs mb-2" style={{ color: '#888' }}>
          Confidential & Proprietary — Not for Distribution
        </p>
        <p className="text-xs" style={{ color: '#555' }}>
          Document compiled from Master Architectural & Operational Blueprint
        </p>
      </div>
    </footer>
  );
}
