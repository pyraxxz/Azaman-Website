export default function FooterSection() {
  return (
    <footer className="border-t border-[#1a1a2e]" style={{ background: '#111111' }}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 py-16 text-center">
        <p
          className="text-lg font-semibold mb-3"
          style={{ color: '#00d4ff', fontFamily: 'Space Grotesk' }}
        >
          AZAMAN
        </p>
        <p className="text-sm text-[#888] mb-5">
          Enterprise Neo-Bank &amp; P2P Exchange Architecture
        </p>
        <p className="text-xs text-[#888] mb-2">
          Confidential &amp; Proprietary — Not for Distribution
        </p>
        <p className="text-xs" style={{ color: '#555' }}>
          Document compiled from Master Architectural &amp; Operational Blueprint
        </p>
      </div>
    </footer>
  )
}
