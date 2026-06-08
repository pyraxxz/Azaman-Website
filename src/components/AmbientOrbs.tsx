// =============================================================================
// AmbientOrbs - soft, blurred accent orbs that drift behind a section for
// living depth. Pure CSS animation (.drift-slow), pointer-events-none, themed.
// Drop <AmbientOrbs /> as the first child of a `relative` section.
// =============================================================================

import { useTheme } from '@/contexts/ThemeContext'

interface AmbientOrbsProps {
  /** Number of orbs (1-3 looks best). */
  count?: number
  className?: string
}

export default function AmbientOrbs({ count = 2, className }: AmbientOrbsProps) {
  const { theme } = useTheme()

  const orbs = [
    { color: theme.glow, size: 460, top: '-8%', left: '-6%', delay: '0s', dur: '11s' },
    { color: theme.accentSecondary, size: 380, bottom: '-10%', right: '-4%', delay: '1.5s', dur: '13s' },
    { color: theme.accent, size: 300, top: '40%', left: '55%', delay: '3s', dur: '9s' },
  ].slice(0, count)

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full drift-slow"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            right: o.right,
            bottom: o.bottom,
            background: `radial-gradient(circle, ${o.color}22 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animationDelay: o.delay,
            animationDuration: o.dur,
          }}
        />
      ))}
    </div>
  )
}
