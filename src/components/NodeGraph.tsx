// =============================================================================
// NodeGraph - animated SVG node-graph. Used in:
//   - BentoEcosystem  -> "Smart Routes" cell (Wallet -> Calendar -> Risk -> MoMo)
//   - Reused for Susu's circular layout via positions prop.
//
// Each connection's path is drawn with a stroke-dash reveal, then a glowing
// orb travels along the path on a slow, looping cadence.
// =============================================================================

import { useEffect, useId, useRef } from 'react'
import { gsap, MotionPathPlugin, prefersReducedMotion } from '@/lib/gsap'
import { useTheme } from '@/contexts/ThemeContext'

export interface GraphNode {
  id: string
  label: string
  sublabel?: string
  x: number // 0..100 (% of viewBox)
  y: number // 0..100 (% of viewBox)
  emoji?: string
}

export interface GraphEdge {
  from: string
  to: string
  /** Curvature, +/- offset on the perpendicular midpoint. */
  curve?: number
}

interface Props {
  nodes: GraphNode[]
  edges: GraphEdge[]
  width?: number
  height?: number
  loopDelay?: number
}

export default function NodeGraph({
  nodes,
  edges,
  width = 480,
  height = 320,
  loopDelay = 0.5,
}: Props) {
  const { theme } = useTheme()
  const svgRef = useRef<SVGSVGElement>(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const reduced = prefersReducedMotion()

    // Reveal each edge path with stroke dash
    const paths = svg.querySelectorAll<SVGPathElement>('[data-edge]')
    paths.forEach((p) => {
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: reduced ? 0 : len })
    })

    if (reduced) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay })
    paths.forEach((p, i) => {
      tl.to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, i * 0.18)
    })

    // Orbs travel each edge after it's drawn
    paths.forEach((p, i) => {
      const orb = svg.querySelector<SVGCircleElement>(`[data-orb="${i}"]`)
      if (!orb) return
      tl.fromTo(
        orb,
        { opacity: 0 },
        {
          motionPath: { path: p, autoRotate: false },
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          repeat: 1,
          yoyo: false,
        },
        `<+0.4`
      )
      tl.to(orb, { opacity: 0, duration: 0.3 }, '<+1.4')
    })
    // Hold and fade everything at the end of the cycle
    tl.to(paths, { strokeDashoffset: (_i, t) => (t as SVGPathElement).getTotalLength(), duration: 0.6, stagger: 0.05, ease: 'power2.in' }, '+=0.6')

    return () => {
      tl.kill()
    }
  }, [nodes, edges, loopDelay])

  // Build path d-attrs (quadratic bezier with optional curve offset)
  const px = (n: GraphNode) => (n.x / 100) * width
  const py = (n: GraphNode) => (n.y / 100) * height

  function pathFor(edge: GraphEdge): string {
    const a = nodes.find((n) => n.id === edge.from)
    const b = nodes.find((n) => n.id === edge.to)
    if (!a || !b) return ''
    const ax = px(a)
    const ay = py(a)
    const bx = px(b)
    const by = py(b)
    const mx = (ax + bx) / 2
    const my = (ay + by) / 2
    // Perpendicular offset
    const dx = bx - ax
    const dy = by - ay
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    const c = edge.curve ?? 0
    const cx = mx + nx * c
    const cy = my + ny * c
    return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`
  }

  // Avoid unused-var lint when MotionPathPlugin isn't directly referenced
  void MotionPathPlugin

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`edge-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.accentSecondary} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`orb-${uid}`}>
          <stop offset="0%" stopColor={theme.accent} stopOpacity="1" />
          <stop offset="60%" stopColor={theme.accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`glow-${uid}`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => (
        <path
          key={`${e.from}-${e.to}-${i}`}
          data-edge
          d={pathFor(e)}
          fill="none"
          stroke={`url(#edge-${uid})`}
          strokeWidth="1.5"
          opacity="0.7"
          filter={`url(#glow-${uid})`}
        />
      ))}
      {/* Orbs travelling along edges */}
      {edges.map((_, i) => (
        <circle key={`orb-${i}`} data-orb={i} r="6" fill={`url(#orb-${uid})`} />
      ))}

      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${px(n)} ${py(n)})`}>
          <circle r="22" fill={theme.surface} stroke={theme.accent} strokeWidth="1.5" filter={`url(#glow-${uid})`} />
          <circle r="22" fill="none" stroke={theme.accent} strokeOpacity="0.2" strokeWidth="6" />
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fontSize="14"
            fontFamily="Space Grotesk, system-ui"
            fontWeight="700"
            fill={theme.accent}
          >
            {n.emoji ?? n.label.slice(0, 1)}
          </text>
          <text
            x={0}
            y={42}
            textAnchor="middle"
            fontSize="11"
            fontFamily="Inter, system-ui"
            fontWeight="600"
            fill={theme.textPrimary}
          >
            {n.label}
          </text>
          {n.sublabel && (
            <text
              x={0}
              y={56}
              textAnchor="middle"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill={theme.textMuted}
            >
              {n.sublabel}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
