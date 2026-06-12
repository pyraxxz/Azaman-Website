// =============================================================================
// AfricaSection - the Pan-African expansion story told through an SVG map.
// Ghana is live (pulsing); five corridors animate in on scroll with dashed
// connectors drawn from Ghana. Stats row counts up below the map.
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Glass from '@/components/Glass'
import AmbientOrbs from '@/components/AmbientOrbs'
import { useTheme } from '@/contexts/ThemeContext'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useInViewport } from '@/hooks/use-in-viewport'

// Low-poly Africa silhouette (viewBox 0 0 800 800). Recognisable landmarks:
// the NW Maghreb coast, the West-African bulge (Senegal westmost), the Gulf of
// Guinea indent, the Horn of Africa to the east, tapering to the Cape.
const AFRICA_PATH =
  'M215 150 L300 128 L385 120 L470 135 L545 150 L575 168 L600 235 L628 275 ' +
  'L690 300 L705 322 L660 360 L610 395 L598 450 L590 520 L560 575 L505 640 ' +
  'L455 685 L425 700 L390 660 L372 590 L360 500 L388 452 L360 448 L300 452 ' +
  'L250 442 L195 400 L165 345 L180 300 L190 250 L200 195 Z'

const GHANA = { x: 300, y: 448 }

interface Corridor {
  id: string
  name: string
  x: number
  y: number
  tooltip: string
}

const CORRIDORS: Corridor[] = [
  { id: 'ng', name: 'Nigeria', x: 360, y: 432, tooltip: 'Nigeria · NGN → USDC · Coming soon' },
  { id: 'ke', name: 'Kenya', x: 600, y: 408, tooltip: 'Kenya · KES → USDC · Coming soon' },
  { id: 'za', name: 'South Africa', x: 442, y: 648, tooltip: 'South Africa · ZAR → USDC · Coming soon' },
  { id: 'sn', name: 'Senegal', x: 182, y: 344, tooltip: 'Senegal · XOF → USDC · Coming soon' },
  { id: 'et', name: 'Ethiopia', x: 622, y: 300, tooltip: 'Ethiopia · ETB → USDC · Coming soon' },
]

// --- Count-up (mirrors StatsSection's Counter logic) --------------------------
function Counter({ target }: { target: number }) {
  const { theme } = useTheme()
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000, fps = 60
        const totalFrames = (duration / 1000) * fps
        let frame = 0
        const timer = setInterval(() => {
          frame++
          const progress = frame / totalFrames
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(target * eased)
          if (frame >= totalFrames) {
            setCount(target)
            clearInterval(timer)
          }
        }, 1000 / fps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      <span className="text-4xl font-black" style={{ fontFamily: 'Space Grotesk', color: theme.textPrimary }}>
        {Math.floor(count)}
      </span>
    </div>
  )
}

const STATS = [
  { target: 1, label: 'Country Live', sub: 'Established operations' },
  { target: 5, label: 'Corridors Planned', sub: 'Expansion in progress' },
  { target: 54, label: 'African Markets', sub: 'Total addressable frontier' },
]

export default function AfricaSection() {
  const { theme } = useTheme()
  const [containerRef, visible] = useInViewport<HTMLDivElement>(0.25)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    if (!visible) return
    const svg = svgRef.current
    if (!svg) return
    const dots = svg.querySelectorAll<SVGCircleElement>('[data-expansion-dot]')
    const lines = svg.querySelectorAll<SVGLineElement>('[data-expansion-line]')

    if (prefersReducedMotion()) {
      gsap.set(dots, { scale: 1, opacity: 1 })
      lines.forEach((line, i) => {
        line.setAttribute('x2', String(CORRIDORS[i].x))
        line.setAttribute('y2', String(CORRIDORS[i].y))
      })
      return
    }

    gsap.set(dots, { scale: 0, opacity: 0, transformOrigin: 'center center' })
    const dotTween = gsap.to(dots, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' })

    const lineTweens = Array.from(lines).map((line, i) => {
      gsap.set(line, { attr: { x2: GHANA.x, y2: GHANA.y } })
      return gsap.to(line, {
        attr: { x2: CORRIDORS[i].x, y2: CORRIDORS[i].y },
        duration: 1.5,
        delay: 0.15 * i,
        ease: 'power2.out',
      })
    })

    return () => {
      dotTween.kill()
      lineTweens.forEach((t) => t.kill())
    }
  }, [visible])

  return (
    <section
      id="africa"
      className="relative py-24 lg:py-40 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      <AmbientOrbs count={2} />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 800px 600px at 10% 100%, ${theme.glow}1A, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ backgroundColor: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, color: theme.accent }}
          >
            🌍 Expansion
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}>
            Built in Ghana.{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-flow">For a billion people.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-5" style={{ color: theme.textSecondary }}>
            Starting where trust is earned. Growing to where it’s needed most.
          </p>
        </motion.div>

        {/* Map */}
        <div ref={containerRef} className="relative mx-auto" style={{ maxWidth: 700 }}>
          <svg ref={svgRef} viewBox="0 0 800 800" width="100%" height="auto" aria-hidden="true">
            <defs>
              <linearGradient id="africa-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={theme.accent} stopOpacity={0.22} />
                <stop offset="100%" stopColor={theme.accentSecondary} stopOpacity={0.12} />
              </linearGradient>
            </defs>
            <path
              d={AFRICA_PATH}
              fill="url(#africa-fill)"
              stroke={theme.accent}
              strokeOpacity={0.55}
              strokeWidth={2}
              style={{ filter: `drop-shadow(0 0 16px ${theme.glow}40)` }}
            />

            {/* Dashed connectors (drawn from Ghana) */}
            {CORRIDORS.map((c) => (
              <line
                key={`line-${c.id}`}
                data-expansion-line
                x1={GHANA.x}
                y1={GHANA.y}
                x2={GHANA.x}
                y2={GHANA.y}
                stroke={theme.accent}
                strokeOpacity={0.3}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ))}

            {/* Ghana - live, pulsing */}
            <motion.circle
              cx={GHANA.x}
              cy={GHANA.y}
              r={8}
              fill="none"
              stroke={theme.accent}
              strokeWidth={1}
              style={{ transformOrigin: `${GHANA.x}px ${GHANA.y}px` }}
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <circle cx={GHANA.x} cy={GHANA.y} r={8} fill={theme.accent} />
            <text x={GHANA.x + 14} y={GHANA.y + 4} fontSize={11} fontFamily="Inter" fontWeight={500} fill={theme.textPrimary}>
              Ghana 🇬🇭
            </text>

            {/* Expansion corridors */}
            {CORRIDORS.map((c) => (
              <circle
                key={c.id}
                data-expansion-dot
                cx={c.x}
                cy={c.y}
                r={6}
                fill={theme.accentSecondary}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>

          {/* Hover tooltips */}
          <AnimatePresence>
            {hovered && (() => {
              const c = CORRIDORS.find((x) => x.id === hovered)
              if (!c) return null
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-full"
                  style={{ left: `${(c.x / 800) * 100}%`, top: `${(c.y / 800) * 100}%` }}
                >
                  <Glass radius="lg" padding="sm" mouseGlow={false}>
                    <span className="text-xs whitespace-nowrap" style={{ color: theme.textPrimary }}>{c.tooltip}</span>
                  </Glass>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          {STATS.map((s) => (
            <Glass key={s.label} radius="xl" padding="lg">
              <div className="text-center">
                <Counter target={s.target} />
                <div className="font-semibold mt-2 mb-1" style={{ color: theme.textPrimary }}>{s.label}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{s.sub}</div>
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  )
}
