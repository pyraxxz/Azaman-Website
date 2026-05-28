// =============================================================================
// PhoneFrame — premium 3D-bezelled mobile mockup. Used in HeroBridge and
// across showcase sections. Supports optional pointer-tracking tilt.
// =============================================================================

import type { ReactNode, CSSProperties } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useTilt3D } from '@/hooks/use-tilt-3d'

interface PhoneFrameProps {
  children: ReactNode
  width?: number
  height?: number
  tilt?: boolean
  className?: string
  style?: CSSProperties
}

export default function PhoneFrame({
  children,
  width = 280,
  height = 580,
  tilt = false,
  className,
  style,
}: PhoneFrameProps) {
  const { theme } = useTheme()
  const ref = useTilt3D<HTMLDivElement>({ max: tilt ? 10 : 0, lift: tilt ? 24 : 0, glare: tilt })

  return (
    <div
      ref={tilt ? ref : undefined}
      className={className}
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 44,
        background: 'linear-gradient(160deg, #1f2128 0%, #0a0b0f 100%)',
        padding: 4,
        boxShadow: `
          0 60px 120px -30px rgba(0,0,0,0.7),
          0 0 0 1px rgba(255,255,255,0.06),
          inset 0 1px 0 0 rgba(255,255,255,0.18),
          0 0 80px ${theme.glow}30
        `,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* glare surface used by tilt hook */}
      {tilt && (
        <div
          aria-hidden
          data-tilt-glare
          className="pointer-events-none absolute -inset-1/2 rounded-[60px]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 55%)',
            opacity: 0,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Inner bezel ring */}
      <div
        className="absolute inset-1 rounded-[40px] pointer-events-none"
        style={{
          border: '1px solid rgba(255,255,255,0.04)',
        }}
      />

      {/* Notch / Dynamic Island */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 rounded-b-[18px] z-30 pointer-events-none"
        style={{
          background: '#000',
          boxShadow: 'inset 0 -1px 1px rgba(255,255,255,0.04)',
        }}
      />

      {/* Side buttons (silhouette) */}
      <div className="absolute -left-[3px] top-24 w-[3px] h-9 rounded-l-sm bg-[#0a0b0f] pointer-events-none" />
      <div className="absolute -left-[3px] top-40 w-[3px] h-14 rounded-l-sm bg-[#0a0b0f] pointer-events-none" />
      <div className="absolute -right-[3px] top-32 w-[3px] h-20 rounded-r-sm bg-[#0a0b0f] pointer-events-none" />

      {/* Screen */}
      <div
        className="relative w-full h-full rounded-[40px] overflow-hidden"
        style={{
          background: '#000',
          transform: tilt ? 'translateZ(40px)' : undefined,
        }}
      >
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40 z-30 pointer-events-none" />
    </div>
  )
}
