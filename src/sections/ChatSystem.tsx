import SectionWrapper from '@/components/SectionWrapper'
import { H2, H3, H4 } from '@/components/SectionHeading'
import { CardGrid, DataTable, HighlightBox, SectionIntro, DiagramPlaceholder } from '@/components/ReusableComponents'

const TRADE_CHAT_CARDS = [
  { title: 'Draggable Pill Interface', content: 'The active countdown timer floats as a draggable widget over the chat. Vendors can tap preset chips (e.g., "+15m") to extend the trade window, triggering a fluid animation where the chip merges into the floating timer with a ripple effect.', accent: 'cyan' as const },
  { title: 'Direct Payee Widget', content: 'The approved fiat account details are pinned to the top of the chat with a one-tap "Copy Tag" button. This prevents manual typing errors and eliminates payment misdirection—one of the leading causes of P2P disputes.', accent: 'cyan' as const },
  { title: '3rd Party Sender Injection', content: 'When a buyer uploads payment proof, they must type the \'Sender Account Name\'. The system auto-generates a chat message: "Check for a sender\'s name such as [Name]" alongside the image, ensuring vendors verify the correct origin.', accent: 'cyan' as const },
  { title: 'Dynamic Chat Extensions', content: 'Above the chat keyboard, a persistent timer navbar exists. Vendors have preset chips (+15m, +30m) and a custom input field to extend the trade expiresAt time, all without leaving the conversation.', accent: 'cyan' as const },
]

const NOTIFICATION_TABLE = {
  headers: ['Hub Category', 'Purpose', 'Content Types', 'Priority'],
  rows: [
    [<strong key="n1" style={{ color: '#00ff88' }}>General</strong>, 'Standard user notifications', 'Deposits, milestone badges, leaderboard updates, system announcements', 'Normal'],
    [<strong key="n2" style={{ color: '#ff4444' }}>Security &amp; Account</strong>, 'Noise-free zone for critical alerts', 'Disputes, failed withdrawals, strike warnings, KYC reminders', 'High'],
    [<strong key="n3" style={{ color: '#ffd700' }}>Vendor Priority</strong>, 'Conditionally rendered for vendor accounts', 'OTC Pings, new trade requests, urgent disputes, queue notifications', 'Critical'],
  ],
}

export default function ChatSystem() {
  return (
    <SectionWrapper id="chat-systems">
      <H2>4. The Dual-Environment Chat System</H2>
      <SectionIntro>
        Azaman is a true social Neo-Bank. We have engineered two completely isolated chat environments that blend financial transactions with secure social communication.
      </SectionIntro>

      <H3 accent="gold">4.1 Trade Chats (Escrow-Bound)</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Temporary, highly secure chats tied directly to an active P2P trade. These chats exist only for the duration of the trade and are automatically archived upon completion or cancellation.
      </p>
      <CardGrid cards={TRADE_CHAT_CARDS} />

      <H3 accent="gold">4.2 Personal P2P Chats (The Social Hub)</H3>
      <p className="animate-in text-[#aaa] mb-4">
        Located in the <strong className="text-white">&quot;Messages Hub,&quot;</strong> searching an Azaman ID or completing an internal transfer opens a permanent, persistent social chat thread. This transforms Azaman from a transactional tool into a social financial network.
      </p>

      <HighlightBox title="In-Chat Transfers" variant="green">
        <p>
          Users tap a &quot;+&quot; button to instantly send or request crypto within the chat thread. To prevent errors, inputting an ID triggers a <strong className="text-white">Profile Pop-Up</strong> allowing the sender to visually confirm the recipient before sending.
        </p>
      </HighlightBox>

      <HighlightBox title="Biometric Security Gate" variant="red">
        <p>
          Sending funds triggers a mandatory <strong className="text-white">Face ID or 4-digit Azaman PIN</strong> confirmation. Upon success, a verified <strong className="text-white">&quot;Payment Completed&quot;</strong> bubble renders in the chat UI, providing cryptographic proof of settlement within the conversation itself.
        </p>
      </HighlightBox>

      <H3 accent="gold">4.3 Notification &amp; Routing Center</H3>

      <H4 accent="cyan">Deep Linking &amp; State Persistence</H4>
      <div className="animate-in text-[#aaa] space-y-3 mb-4">
        <p>
          Push notifications carry embedded JSON payloads (actionPayload). Tapping an alert bypasses the home screen entirely and deep-links the user directly into the exact active trade, chat, or dispute ticket, instantly resuming their previous state without manual navigation.
        </p>
        <p>
          Notifications save the tradeId. Tapping a notification resumes the exact state of the trade or dispute, eliminating friction and reducing abandonment.
        </p>
      </div>

      <DataTable data={NOTIFICATION_TABLE} />

      <DiagramPlaceholder caption="Figure 4.1 — Dual-Environment Chat System: Trade chats with escrow-bound security features and personal P2P social hub with biometric-gated transfers." />
    </SectionWrapper>
  )
}
