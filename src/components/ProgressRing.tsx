// =============================================================================
// ProgressRing — SVG circular progress that animates as it enters the viewport.
// Used in the Vault bento cell.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  value: number // 0..1
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
  color?: string
  trackColor?: string
}

export default function ProgressRing({
  value,
  size = 180,
  stroke = 10,
  label,
  sublabel,
  color,
  trackColor,
}: Props) {
  const { theme } = useTheme()
  const [animated, setAnimated] = useState(0)
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setAnimated(value))
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - animated)
  const strokeColor = color ?? theme.accent
  const trackStroke = trackColor ?? theme.border

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={theme.accentSecondary} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackStroke}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: `drop-shadow(0 0 8px ${strokeColor}80)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {label && (
          <div className="text-3xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            {label}
          </div>
        )}
        {sublabel && (
          <div className="text-[11px] uppercase tracking-[0.18em] mt-0.5" style={{ color: theme.textMuted }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  )
}
