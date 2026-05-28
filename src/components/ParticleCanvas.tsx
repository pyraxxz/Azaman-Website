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

  // Keep accent ref updated so the running animation picks up theme changes
  useEffect(() => {
    accentRef.current = theme.accent
  }, [theme.accent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const PARTICLE_COUNT = density ?? (window.innerWidth < 768 ? 40 : 80)
    const CONNECTION_DISTANCE = window.innerWidth < 768 ? 80 : 120
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
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()

    function initParticles() {
      const particles: Particle[] = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const radius = 1.5 + Math.random()
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lenis-driven warp coefficient (0..1, smoothed). Reads ref every frame so
      // we never re-bind the canvas effect.
      const warp = reactToScroll ? Math.min(1.4, intensityRef.current) : 0
      const speedMul = 1 + warp * 1.6
      const stretchY = 1 + warp * 1.2 // vertical stretch on the rendered shapes

      const [r, g, b] = hexToRgb(accentRef.current)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const p of particles) {
        p.x += p.vx * speedMul
        p.y += p.vy * speedMul
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

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

      // Lines between particles
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

      // Particles + mouse lines
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
        ctx.save()
        ctx.translate(p.x, p.y)
        // Vertical stretch ellipse during fast scroll for "warp" feel
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    const handleResize = () => {
      resize()
      initParticles()
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
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
