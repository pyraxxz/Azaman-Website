import { useRef, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'
import { useInViewport } from '@/hooks/use-in-viewport'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
}

interface Props {
  /** When true (default) the particles react to Lenis scroll velocity. */
  reactToScroll?: boolean
  density?: number
}

export default function ParticleCanvas({ reactToScroll = true, density }: Props) {
  const { theme } = useTheme()
  const { intensityRef } = useLenis()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const accentRef = useRef(theme.accent)
  const [viewportRef, isVisible] = useInViewport<HTMLCanvasElement>(0.05)

  // Keep accent ref updated so the running animation picks up theme changes
  useEffect(() => {
    accentRef.current = theme.accent
  }, [theme.accent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const PARTICLE_COUNT = density ?? (isMobile ? 25 : 80)
    const DRAW_CONNECTIONS = !isMobile
    const CONNECTION_DISTANCE = 120
    const MOUSE_DISTANCE = 150
    const MAX_SPEED = 0.3

    function hexToRgb(hex: string): [number, number, number] {
      const clean = hex.replace('#', '')
      const r = parseInt(clean.substring(0, 2), 16)
      const g = parseInt(clean.substring(2, 4), 16)
      const b = parseInt(clean.substring(4, 6), 16)
      return [r, g, b]
    }

    function resize() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    function initParticles() {
      const particles: Particle[] = []
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const radius = 1.5 + Math.random()
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * MAX_SPEED * 2,
          vy: (Math.random() - 0.5) * MAX_SPEED * 2,
          radius,
          baseRadius: radius,
        })
      }
      particlesRef.current = particles
    }
    initParticles()

    let paused = false

    function animate() {
      if (paused) { rafRef.current = requestAnimationFrame(animate); return }
      if (!ctx || !canvas) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const warp = reactToScroll ? Math.min(1.4, intensityRef.current) : 0
      const speedMul = 1 + warp * 1.6
      const stretchY = 1 + warp * 1.2

      const [r, g, b] = hexToRgb(accentRef.current)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const p of particles) {
        p.x += p.vx * speedMul
        p.y += p.vy * speedMul
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const dMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dMouse < MOUSE_DISTANCE) {
          const force = ((MOUSE_DISTANCE - dMouse) / MOUSE_DISTANCE) * 0.5
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x)
          p.vx += Math.cos(angle) * force * 0.1
          p.vy += Math.sin(angle) * force * 0.1
          p.radius = p.baseRadius + 0.5
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.1
        }

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED * 2) {
          p.vx = (p.vx / speed) * MAX_SPEED * 2
          p.vy = (p.vy / speed) * MAX_SPEED * 2
        }
      }

      // Lines between particles (skip on mobile — O(n²) is the biggest cost)
      if (DRAW_CONNECTIONS) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d = Math.hypot(dx, dy)
            if (d < CONNECTION_DISTANCE) {
              const opacity = (1 - d / CONNECTION_DISTANCE) * (0.14 + warp * 0.18)
              ctx.beginPath()
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
              ctx.lineWidth = 0.6
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Particles + mouse lines
      for (const p of particles) {
        if (!isMobile) {
          const dMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (dMouse < MOUSE_DISTANCE) {
            const opacity = (1 - dMouse / MOUSE_DISTANCE) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.scale(1, stretchY)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.5 + warp * 0.25})`
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Pause when tab is hidden
    const handleVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', handleVisibility)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    const handleResize = () => {
      resize()
      initParticles()
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [density, reactToScroll, intensityRef])

  // Pause/resume based on viewport visibility
  useEffect(() => {
    // The paused flag inside the RAF loop is controlled by visibility change.
    // For offscreen, we simply cancel/restart the RAF.
    if (!isVisible) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  return (
    <canvas
      ref={(el) => {
        canvasRef.current = el
        // Also assign to viewport observer ref
        ;(viewportRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
