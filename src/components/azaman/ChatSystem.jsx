import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lock, Bell, Timer, Copy, UserCheck, Fingerprint } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { H2, H3, H4 } from './SectionHeading';
import { DataTable, HighlightBox, SectionIntro } from './ReusableComponents';

function ChatFeatureCard({ icon: Icon, title, description, color, delay = 0 }) {
  return (
    <motion.div
      className="rounded-xl p-5"
      style={{ background: '#1a1a2e', border: '1px solid #2a2a3e' }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ borderColor: `${color}40` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <h4 className="text-sm font-semibold text-white font-heading">{title}</h4>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{description}</p>
    </motion.div>
  );
}

function MockChatPreview() {
  const messages = [
    { sender: 'Buyer', text: 'Payment sent via MoMo. Check for sender "Kwame Asante"', time: '2:14 PM', isBuyer: true },
    { sender: 'Vendor', text: 'Received ₵1,485.00. Releasing escrow now.', time: '2:15 PM', isBuyer: false },
    { sender: 'System', text: '✓ Escrow released. 100.00 USDC credited to buyer.', time: '2:15 PM', isSystem: true },
  ];

  return (
    <div className="rounded-xl overflow-hidden my-6" style={{ background: '#111', border: '1px solid #2a2a3e' }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#1a1a2e', borderBottom: '1px solid #2a2a3e' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#00d4ff20' }}>
            <MessageCircle size={12} style={{ color: '#00d4ff' }} />
          </div>
          <span className="text-xs font-semibold text-white">Trade #AZ-7842</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer size={12} style={{ color: '#ffd700' }} />
          <span className="text-xs font-mono" style={{ color: '#ffd700' }}>12:45 remaining</span>
        </div>
      </div>

      <div className="mx-3 mt-3 p-2.5 rounded-lg flex items-center justify-between" style={{ background: '#1a1a2e', border: '1px solid rgba(0, 255, 136, 0.15)' }}>
        <div>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: '#888' }}>Pay to: </span>
          <span className="text-xs font-mono text-white">MoMo — 024-XXX-XXXX</span>
        </div>
        <button className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ color: '#00d4ff', background: '#00d4ff10' }}>
          <Copy size={10} /> Copy
        </button>
      </div>

      <div className="p-3 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.isBuyer ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div
              className="max-w-[80%] rounded-xl px-3 py-2"
              style={{
                background: msg.isSystem ? 'rgba(0, 255, 136, 0.08)' : msg.isBuyer ? '#16213e' : '#1a1a2e',
                border: msg.isSystem ? '1px solid rgba(0, 255, 136, 0.2)' : '1px solid #2a2a3e',
              }}
            >
              {!msg.isSystem && (
                <span className="text-[10px] font-semibold block mb-0.5" style={{ color: msg.isBuyer ? '#00d4ff' : '#ffd700' }}>
                  {msg.sender}
                </span>
              )}
              <p className="text-xs" style={{ color: msg.isSystem ? '#00ff88' : '#ccc' }}>{msg.text}</p>
              <span className="text-[9px] block text-right mt-1" style={{ color: '#666' }}>{msg.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const NOTIFICATION_TABLE = {
  headers: ['Hub', 'Purpose', 'Content Types', 'Priority'],
  rows: [
    [<strong key="n1" style={{ color: '#00ff88' }}>General</strong>, 'Standard notifications', 'Deposits, badges, system announcements', 'Normal'],
    [<strong key="n2" style={{ color: '#ff4444' }}>Security</strong>, 'Critical alerts only', 'Disputes, failed withdrawals, KYC reminders', 'High'],
    [<strong key="n3" style={{ color: '#ffd700' }}>Vendor Priority</strong>, 'Vendor accounts only', 'OTC Pings, trade requests, urgent disputes', 'Critical'],
  ],
};

export default function ChatSystem() {
  return (
    <SectionWrapper id="chat-systems">
      <H2>4. The Dual-Environment Chat System</H2>
      <SectionIntro>
        Azaman is a true social Neo-Bank with two completely isolated chat environments blending financial transactions with secure communication.
      </SectionIntro>

      <H3 accent="gold">4.1 Trade Chats (Escrow-Bound)</H3>
      <p className="leading-relaxed mb-4" style={{ color: '#aaa' }}>
        Temporary, secure chats tied to active P2P trades. Archived upon completion or cancellation.
      </p>

      <MockChatPreview />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChatFeatureCard icon={Timer} title="Draggable Pill Timer" description="Floating countdown widget with preset extension chips (+15m, +30m) that merge into the timer with ripple effects." color="#00d4ff" delay={0} />
        <ChatFeatureCard icon={Copy} title="Direct Payee Widget" description="Approved fiat details pinned to chat top with one-tap copy. Prevents typing errors and payment misdirection." color="#00ff88" delay={0.1} />
        <ChatFeatureCard icon={UserCheck} title="3rd Party Sender Injection" description='Auto-generates "Check for sender name [Name]" message when buyer uploads payment proof.' color="#ffd700" delay={0.2} />
        <ChatFeatureCard icon={Timer} title="Dynamic Chat Extensions" description="Persistent timer navbar above keyboard. Vendors extend trade expiresAt without leaving conversation." color="#ff6b35" delay={0.3} />
      </div>

      <H3 accent="gold">4.2 Personal P2P Chats (Social Hub)</H3>
      <p className="leading-relaxed mb-4" style={{ color: '#aaa' }}>
        Located in the <strong className="text-white">"Messages Hub"</strong>. Searching an Azaman ID opens a permanent social chat thread.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HighlightBox title="In-Chat Transfers" variant="green">
          <p>Tap "+" to instantly send or request crypto. A Profile Pop-Up confirms the recipient before sending.</p>
        </HighlightBox>
        <HighlightBox title="Biometric Security Gate" variant="red">
          <p>Every transfer triggers Face ID or 4-digit PIN. A verified "Payment Completed" bubble renders as cryptographic proof.</p>
        </HighlightBox>
      </div>

      <H3 accent="gold">4.3 Notification Center</H3>
      <H4 accent="cyan">Deep Linking & State Persistence</H4>
      <p className="leading-relaxed mb-4" style={{ color: '#aaa' }}>
        Push notifications carry embedded JSON payloads. Tapping deep-links directly into the exact trade, chat, or dispute ticket.
      </p>
      <DataTable data={NOTIFICATION_TABLE} />
    </SectionWrapper>
  );
}
