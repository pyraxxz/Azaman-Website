import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ScrollProgress() {
  const { theme } = useTheme()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setProgress(pct)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${theme.heroGradient[0]}, ${theme.heroGradient[1]}, ${theme.heroGradient[2]})`,
          boxShadow: `0 0 12px ${theme.accent}80`,
        }}
      />
    </div>
  )
}
