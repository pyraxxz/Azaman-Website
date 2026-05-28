import { useRef, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLenis } from '@/lib/lenis'

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
  const visibleRef = useRef(true)

  // Keep accent ref updated so the running animation picks up theme changes
  useEffect(() => {
    accentRef.current = theme.accent
  }, [theme.accent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const w = window.innerWidth
    const isMobile = w < 768
    const isTouch = window.matchMedia('(hover: none)').matches
    const drawConnections = !isMobile // skip O(n²) lines on phones
    const PARTICLE_COUNT = density ?? (isMobile ? 22 : 70)
    const CONNECTION_DISTANCE = isMobile ? 70 : 120
    const MOUSE_DISTANCE = isTouch ? 0 : 150 // touch devices skip mouse FX
    const MAX_SPEED = 0.3
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap DPR for fill-rate

    function hexToRgb(hex: string): [number, number, number] {
      const clean = hex.replace('#', '')
      const r = parseInt(clean.substring(0, 2), 16)
      const g = parseInt(clean.substring(2, 4), 16)
      const b = parseInt(clean.substring(4, 6), 16)
      return [r, g, b]
    }

    function resize() {
      const cw = canvas!.offsetWidth
      const ch = canvas!.offsetHeight
      canvas!.width = Math.floor(cw * dpr)
      canvas!.height = Math.floor(ch * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    function logicalSize() {
      return { w: canvas!.offsetWidth, h: canvas!.offsetHeight }
    }

    function initParticles() {
      const { w: cw, h: ch } = logicalSize()
      const particles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const radius = 1.2 + Math.random()
        particles.push({
          x: Math.random() * cw,
          y: Math.random() * ch,
          vx: (Math.random() - 0.5) * MAX_SPEED * 2,
          vy: (Math.random() - 0.5) * MAX_SPEED * 2,
          radius,
          baseRadius: radius,
        })
      }
      particlesRef.current = particles
    }
    initParticles()

    function animate() {
      if (!ctx || !canvas) return
      // Pause loop when canvas is offscreen — IO updates visibleRef.
      if (!visibleRef.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const { w: cw, h: ch } = logicalSize()
      ctx.clearRect(0, 0, cw, ch)

      // Lenis-driven warp coefficient (0..1, smoothed)
      const warp = reactToScroll ? Math.min(1.4, intensityRef.current) : 0
      const speedMul = 1 + warp * 1.6
      const stretchY = 1 + warp * 1.2

      const [r, g, b] = hexToRgb(accentRef.current)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const p of particles) {
        p.x += p.vx * speedMul
        p.y += p.vy * speedMul
        if (p.x < 0) p.x = cw
        if (p.x > cw) p.x = 0
        if (p.y < 0) p.y = ch
        if (p.y > ch) p.y = 0

        if (MOUSE_DISTANCE > 0) {
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
        }

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED * 2) {
          p.vx = (p.vx / speed) * MAX_SPEED * 2
          p.vy = (p.vy / speed) * MAX_SPEED * 2
        }
      }

      // Lines between particles — desktop only
      if (drawConnections) {
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

        // Mouse connection lines (desktop only)
        for (const p of particles) {
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
      }

      // Particles
      const fill = `rgba(${r}, ${g}, ${b}, ${0.5 + warp * 0.25})`
      ctx.fillStyle = fill
      for (const p of particles) {
        if (stretchY === 1) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.scale(1, stretchY)
          ctx.beginPath()
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Pause RAF when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { rootMargin: '50px', threshold: 0 }
    )
    observer.observe(canvas)

    // Pause when tab is hidden too (saves battery)
    const onVisibility = () => {
      visibleRef.current = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

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

    if (!isTouch) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (!isTouch) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [density, reactToScroll, intensityRef])

  return (
    <canvas
      ref={canvasRef}
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
