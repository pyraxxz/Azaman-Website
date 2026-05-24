import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// =============================================================================
// AZAMAN GLOBAL THEME SYSTEM
// 11 immersive themes that transform the ENTIRE website (not just a preview).
// Background, surfaces, accents, glows, text — all change globally.
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
    id: 'cyberBlue',
    name: 'Cyber Blue',
    icon: '💠',
    background: '#040B14',
    surface: '#0A1628',
    card: '#0D1B2A',
    border: 'rgba(0,229,255,0.10)',
    accent: '#00E5FF',
    accentSecondary: '#00B4D8',
    glow: '#00E5FF',
    success: '#00F5A0',
    danger: '#FF3366',
    warning: '#FFD600',
    textPrimary: '#E0F7FA',
    textSecondary: '#80DEEA',
    textMuted: '#4DB6AC',
    heroGradient: ['#00E5FF', '#00F5A0', '#00B4D8'],
    isDark: true,
  },
  {
    id: 'midnight',
    name: 'Midnight',
    icon: '✨',
    background: '#0D0618',
    surface: '#170D2E',
    card: '#1A1035',
    border: 'rgba(187,134,252,0.10)',
    accent: '#BB86FC',
    accentSecondary: '#E040FB',
    glow: '#BB86FC',
    success: '#69F0AE',
    danger: '#FF5252',
    warning: '#FFAB40',
    textPrimary: '#F3E5F5',
    textSecondary: '#CE93D8',
    textMuted: '#9C27B0',
    heroGradient: ['#BB86FC', '#E040FB', '#7C4DFF'],
    isDark: true,
  },
  {
    id: 'mars',
    name: 'Mars',
    icon: '🔴',
    background: '#1A0A08',
    surface: '#2D1410',
    card: '#3A1C16',
    border: 'rgba(255,109,58,0.12)',
    accent: '#FF6D3A',
    accentSecondary: '#FF8A50',
    glow: '#FF6D3A',
    success: '#66BB6A',
    danger: '#EF5350',
    warning: '#FFCA28',
    textPrimary: '#FFF3E0',
    textSecondary: '#BCAAA4',
    textMuted: '#8D6E63',
    heroGradient: ['#FF6D3A', '#FFCA28', '#FF8A50'],
    isDark: true,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    icon: '🪐',
    background: '#0C0B1A',
    surface: '#161433',
    card: '#1E1B40',
    border: 'rgba(255,213,79,0.10)',
    accent: '#FFD54F',
    accentSecondary: '#FFF176',
    glow: '#FFD54F',
    success: '#4CAF50',
    danger: '#E53935',
    warning: '#FFA726',
    textPrimary: '#F5F5DC',
    textSecondary: '#BDB9A2',
    textMuted: '#9E9D89',
    heroGradient: ['#FFD54F', '#FFF176', '#FFA726'],
    isDark: true,
  },
  {
    id: 'neonTokyo',
    name: 'Neon Tokyo',
    icon: '⚡',
    background: '#0A0012',
    surface: '#140020',
    card: '#1C002E',
    border: 'rgba(255,0,128,0.12)',
    accent: '#FF0080',
    accentSecondary: '#00FFFF',
    glow: '#FF0080',
    success: '#00FF88',
    danger: '#FF1744',
    warning: '#FFEA00',
    textPrimary: '#FFFFFF',
    textSecondary: '#E0E0E0',
    textMuted: '#FF0080',
    heroGradient: ['#FF0080', '#00FFFF', '#FFEA00'],
    isDark: true,
  },
  {
    id: 'deepOcean',
    name: 'Deep Ocean',
    icon: '🌊',
    background: '#021016',
    surface: '#041E28',
    card: '#062838',
    border: 'rgba(0,191,165,0.10)',
    accent: '#00BFA5',
    accentSecondary: '#64FFDA',
    glow: '#00BFA5',
    success: '#69F0AE',
    danger: '#FF5252',
    warning: '#FFD740',
    textPrimary: '#E0F2F1',
    textSecondary: '#80CBC4',
    textMuted: '#4DB6AC',
    heroGradient: ['#00BFA5', '#64FFDA', '#26C6DA'],
    isDark: true,
  },
  {
    id: 'volcanic',
    name: 'Volcanic',
    icon: '🌋',
    background: '#110808',
    surface: '#1E0F0F',
    card: '#2A1515',
    border: 'rgba(255,87,34,0.12)',
    accent: '#FF5722',
    accentSecondary: '#FF8A65',
    glow: '#FF5722',
    success: '#4CAF50',
    danger: '#D32F2F',
    warning: '#FFB300',
    textPrimary: '#FFF8E1',
    textSecondary: '#D7CCC8',
    textMuted: '#8D6E63',
    heroGradient: ['#FF5722', '#FFB300', '#FF8A65'],
    isDark: true,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    icon: '🌌',
    background: '#050812',
    surface: '#0A1020',
    card: '#0F1830',
    border: 'rgba(124,77,255,0.12)',
    accent: '#7C4DFF',
    accentSecondary: '#00E676',
    glow: '#7C4DFF',
    success: '#00E676',
    danger: '#FF5252',
    warning: '#FFD740',
    textPrimary: '#E8EAF6',
    textSecondary: '#9FA8DA',
    textMuted: '#7C4DFF',
    heroGradient: ['#7C4DFF', '#00E676', '#00B0FF'],
    isDark: true,
  },
  {
    id: 'snow',
    name: 'Snow',
    icon: '❄️',
    background: '#F8FAFF',
    surface: '#FFFFFF',
    card: '#F0F4FF',
    border: 'rgba(66,165,245,0.20)',
    accent: '#1976D2',
    accentSecondary: '#42A5F5',
    glow: '#42A5F5',
    success: '#26A69A',
    danger: '#EF5350',
    warning: '#FFA726',
    textPrimary: '#1A237E',
    textSecondary: '#5C6BC0',
    textMuted: '#9FA8DA',
    heroGradient: ['#1976D2', '#42A5F5', '#26A69A'],
    isDark: false,
  },
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
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('azaman-theme') || 'dark'
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
