interface SectionHeadingProps {
  children: React.ReactNode
  accent?: 'cyan' | 'gold' | 'green' | 'red' | 'purple'
  className?: string
}

const ACCENT_MAP = {
  cyan: '#00d4ff',
  gold: '#ffd700',
  green: '#00ff88',
  red: '#ff4444',
  purple: '#ff00ff',
}

export function H2({ children, accent = 'cyan', className = '' }: SectionHeadingProps) {
  return (
    <h2
      className={`text-2xl sm:text-3xl lg:text-[40px] font-semibold mb-4 leading-tight ${className}`}
      style={{ color: ACCENT_MAP[accent], fontFamily: 'Space Grotesk', letterSpacing: '-0.01em' }}
    >
      {children}
    </h2>
  )
}

export function H3({ children, accent = 'gold', className = '' }: SectionHeadingProps) {
  return (
    <h3
      className={`text-lg sm:text-xl lg:text-[22px] font-semibold mt-8 mb-4 leading-snug ${className}`}
      style={{ color: ACCENT_MAP[accent], fontFamily: 'Space Grotesk' }}
    >
      {children}
    </h3>
  )
}

export function H4({ children, accent = 'green', className = '' }: SectionHeadingProps) {
  return (
    <h4
      className={`text-base sm:text-lg font-semibold mt-6 mb-3 leading-snug ${className}`}
      style={{ color: ACCENT_MAP[accent], fontFamily: 'Space Grotesk' }}
    >
      {children}
    </h4>
  )
}
