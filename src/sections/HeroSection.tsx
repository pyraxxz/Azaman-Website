import ParticleCanvas from '@/components/ParticleCanvas'
import { ChevronDown } from 'lucide-react'

const META_ITEMS = [
  { label: 'Scale Target', value: 'Enterprise / Millions' },
  { label: 'Core Identity', value: 'Neo-Bank & P2P Hybrid' },
  { label: 'Primary Market', value: 'Ghana / West Africa' },
  { label: 'Regulatory Framework', value: 'Act 1154 (2025)' },
]

export default function HeroSection() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden">
      <ParticleCanvas />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(circle at center, rgba(10,10,10,0.7) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-[2] px-5 max-w-4xl">
        <h1
          className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[0.95] tracking-[-0.03em] mb-5 gradient-text"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          AZAMAN
        </h1>
        <p
          className="text-lg sm:text-xl lg:text-2xl text-[#aaa] font-light mb-3"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Enterprise Neo-Bank &amp; P2P Exchange Architecture
        </p>
        <p className="text-sm sm:text-base text-[#888] italic max-w-[640px] mx-auto mb-10 leading-relaxed">
          A purpose-built financial ecosystem unifying local fiat liquidity with a mathematically infallible USDC backend, engineered for emerging markets where legacy banking has not kept pace with digital asset adoption.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8">
          {META_ITEMS.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#888] mb-1">
                {item.label}
              </div>
              <div className="text-sm sm:text-base text-[#00d4ff] font-semibold">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-bounce">
        <ChevronDown className="text-[#888]" size={24} />
      </div>
    </div>
  )
}
