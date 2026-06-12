import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// =============================================================================
// AZAMAN GLOBAL THEME SYSTEM
// 11 immersive themes that transform the ENTIRE website (not just a preview).
// Background, surfaces, accents, glows, text - all change globally.
// =============================================================================

export interface ThemeColors {
  id: string
  name: string
  icon: string
  // Core palette
  background: string  // page background
  surface: string     // card/elevated surface
  card: string        // nested cards
  border: string      // dividers/borders
  // Accents
  accent: string      // primary brand color
  accentSecondary: string
  glow: string        // for glow effects
  // Status
  success: string
  danger: string
  warning: string
  // Text
  textPrimary: string
  textSecondary: string
  textMuted: string
  // Hero gradient stops
  heroGradient: [string, string, string]
  isDark: boolean
}

export const THEMES: ThemeColors[] = [
  {
    id: 'light',
    name: 'Light',
    icon: '☀️',
    background: '#FAFAF7',
    surface: '#FFFFFF',
    card: '#F2EFE6',
    border: 'rgba(184,148,30,0.18)',
    accent: '#B8941E',
    accentSecondary: '#D4AF37',
    glow: '#D4AF37',
    success: '#2E7D32',
    danger: '#C62828',
    warning: '#EF6C00',
    textPrimary: '#1A1A2E',
    textSecondary: '#4A4A5C',
    textMuted: '#7A7A8C',
    heroGradient: ['#B8941E', '#D4AF37', '#EF6C00'],
    isDark: false,
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: '🌙',
    background: '#050508',
    surface: '#0F1015',
    card: '#1A1B22',
    border: 'rgba(255,255,255,0.06)',
    accent: '#D4AF37',
    accentSecondary: '#F0B90B',
    glow: '#D4AF37',
    success: '#02C076',
    danger: '#F6465D',
    warning: '#F0B90B',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B8',
    textMuted: '#6B6B78',
    heroGradient: ['#D4AF37', '#02C076', '#F0B90B'],
    isDark: true,
  },
  {
    id: 'quantum',
    name: 'Quantum',
    icon: '⬡',
    background: '#060A12',
    surface: '#0C1320',
    card: '#121A2B',
    border: 'rgba(34,211,238,0.14)',
    accent: '#22D3EE',
    accentSecondary: '#6366F1',
    glow: '#22D3EE',
    success: '#34D399',
    danger: '#FF4D6D',
    warning: '#FBBF24',
    textPrimary: '#E5F2FF',
    textSecondary: '#9FBBD0',
    textMuted: '#5B7A8C',
    heroGradient: ['#22D3EE', '#6366F1', '#34D399'],
    isDark: true,
  },
]

interface ThemeContextValue {
  theme: ThemeColors
  themeId: string
  setThemeId: (id: string) => void
  themes: ThemeColors[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('azaman-theme') || 'light'
  })

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  const setThemeId = (id: string) => {
    setThemeIdState(id)
    if (typeof window !== 'undefined') {
      localStorage.setItem('azaman-theme', id)
    }
  }

  // Apply CSS variables to :root so even non-React styles can use them
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-bg', theme.background)
    root.style.setProperty('--theme-surface', theme.surface)
    root.style.setProperty('--theme-card', theme.card)
    root.style.setProperty('--theme-border', theme.border)
    root.style.setProperty('--theme-accent', theme.accent)
    root.style.setProperty('--theme-accent-secondary', theme.accentSecondary)
    root.style.setProperty('--theme-glow', theme.glow)
    root.style.setProperty('--theme-success', theme.success)
    root.style.setProperty('--theme-danger', theme.danger)
    root.style.setProperty('--theme-warning', theme.warning)
    root.style.setProperty('--theme-text-primary', theme.textPrimary)
    root.style.setProperty('--theme-text-secondary', theme.textSecondary)
    root.style.setProperty('--theme-text-muted', theme.textMuted)
    root.style.setProperty('--theme-hero-1', theme.heroGradient[0])
    root.style.setProperty('--theme-hero-2', theme.heroGradient[1])
    root.style.setProperty('--theme-hero-3', theme.heroGradient[2])
    document.body.style.backgroundColor = theme.background
    document.body.style.color = theme.textPrimary
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
