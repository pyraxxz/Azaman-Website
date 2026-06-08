// =============================================================================
// Glass — themed glassmorphic surface with optional 3D tilt and anamorphic
// cursor-tracking glow. Use it as the base for every premium card on the site.
// =============================================================================

import type { CSSProperties, ReactNode, HTMLAttributes } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useTilt3D } from '@/hooks/use-tilt-3d'
import { useMouseGlow } from '@/hooks/use-mouse-glow'
import { cn } from '@/lib/utils'

interface GlassProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode
  /** Add 3D tilt effect on pointer move. */
  tilt?: boolean
  /** Maximum tilt rotation in degrees. */
  tiltMax?: number
  /** Anamorphic mouse-follow glow layer. */
  mouseGlow?: boolean
  /** Border radius preset. */
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  /** How translucent the surface is (0..100). */
  surfaceOpacity?: number
  /** Padding preset. */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** When true, the card uses a slightly elevated styling. */
  elevated?: boolean
}

const RADIUS = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  '2xl': 'rounded-[28px]',
  '3xl': 'rounded-[36px]',
} as const

const PADDING = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
} as const

export default function Glass({
  children,
  tilt = false,
  tiltMax = 6,
  mouseGlow = true,
  radius = 'lg',
  surfaceOpacity = 70,
  padding = 'md',
  elevated = false,
  className,
  style,
  ...rest
}: GlassProps) {
  const { theme } = useTheme()
  const tiltRef = useTilt3D<HTMLDivElement>({ max: tiltMax })
  const glowRef = useMouseGlow<HTMLDivElement>()

  const surfaceMix = `color-mix(in srgb, ${theme.surface} ${surfaceOpacity}%, transparent)`
  // backdrop-filter is extremely expensive on mobile GPUs (especially iOS).
  // On touch devices, use a more opaque surface instead.
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches
  const innerStyle: CSSProperties = {
    backgroundColor: isTouchDevice
      ? `color-mix(in srgb, ${theme.surface} ${Math.min(surfaceOpacity + 25, 95)}%, transparent)`
      : surfaceMix,
    border: `1px solid ${theme.border}`,
    ...(isTouchDevice
      ? {}
      : {
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        }),
    boxShadow: elevated
      ? `0 24px 60px -20px rgba(0,0,0,0.55), inset 0 1px 0 0 color-mix(in srgb, ${theme.textPrimary} 6%, transparent)`
      : `0 12px 32px -16px rgba(0,0,0,0.45), inset 0 1px 0 0 color-mix(in srgb, ${theme.textPrimary} 4%, transparent)`,
    ...style,
  }

  // Compose refs: tilt wraps glow when both enabled. Otherwise apply only the
  // active one. We do this by picking which ref gets attached to the host.
  const ref = tilt ? tiltRef : mouseGlow ? glowRef : undefined

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1', RADIUS[radius], PADDING[padding], className)}
      style={innerStyle}
      {...rest}
    >
      {mouseGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, ${theme.glow} 28%, transparent) 0%, transparent 60%)`,
            opacity: 'var(--glow-opacity, 0)',
            transition: 'opacity 0.2s ease',
            mixBlendMode: 'screen',
          }}
        />
      )}
      {tilt && (
        <div
          aria-hidden
          data-tilt-glare
          className="pointer-events-none absolute -inset-1/2"
          style={{
            background: `radial-gradient(circle at center, color-mix(in srgb, ${theme.textPrimary} 16%, transparent) 0%, transparent 60%)`,
            opacity: 0,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      <div className="relative" style={{ transform: tilt ? 'translateZ(40px)' : undefined }}>
        {children}
      </div>
    </div>
  )
}
