import { useState } from 'react'
import { motion } from 'framer-motion'

const THEMES = [
  { name: 'Dark', icon: '🌙', bg: '#0B0E11', surface: '#1E2329', accent: '#D4AF37', text: '#ffffff', glow: '#D4AF37' },
  { name: 'Cyber Blue', icon: '💠', bg: '#040B14', surface: '#0D1B2A', accent: '#00E5FF', text: '#E0F7FA', glow: '#00E5FF' },
  { name: 'Midnight', icon: '✨', bg: '#0D0618', surface: '#1A1035', accent: '#BB86FC', text: '#F3E5F5', glow: '#BB86FC' },
  { name: 'Mars', icon: '🔴', bg: '#1A0A08', surface: '#3A1C16', accent: '#FF6D3A', text: '#FFF3E0', glow: '#FF6D3A' },
  { name: 'Saturn', icon: '🪐', bg: '#0C0B1A', surface: '#1E1B40', accent: '#FFD54F', text: '#F5F5DC', glow: '#FFD54F' },
  { name: 'Snow', icon: '❄️', bg: '#F8FAFF', surface: '#FFFFFF', accent: '#42A5F5', text: '#1A237E', glow: '#42A5F5' },
  { name: 'Neon Tokyo', icon: '⚡', bg: '#0A0012', surface: '#1C002E', accent: '#FF0080', text: '#FFFFFF', glow: '#FF0080' },
  { name: 'Deep Ocean', icon: '🌊', bg: '#021016', surface: '#062838', accent: '#00BFA5', text: '#E0F2F1', glow: '#00BFA5' },
  { name: 'Volcanic', icon: '🌋', bg: '#110808', surface: '#2A1515', accent: '#FF5722', text: '#FFF8E1', glow: '#FF5722' },
  { name: 'Aurora', icon: '🌌', bg: '#050812', surface: '#0F1830', accent: '#7C4DFF', text: '#E8EAF6', glow: '#7C4DFF' },
  { name: 'Light', icon: '☀️', bg: '#F5F5F7', surface: '#FFFFFF', accent: '#D4AF37', text: '#1A1A2E', glow: '#D4AF37' },
]

export default function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState(0)
  const theme = THEMES[activeTheme]

  return (
    <section id="themes" className="relative py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#e040fb] uppercase tracking-[0.2em] mb-4 block">Personalization</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            11 Immersive Themes.{' '}
            <span className="bg-gradient-to-r from-[#e040fb] to-[#00d4ff] bg-clip-text text-transparent">Your Vibe.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Every theme transforms the entire app — backgrounds, accents, glows, cards, and typography. Not just colors — entire identities.
          </p>
        </motion.div>

        {/* Theme selector grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3 mb-12">
          {THEMES.map((t, i) => (
            <motion.button
              key={t.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTheme(i)}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                activeTheme === i
                  ? 'border-white/30 bg-white/5 shadow-lg'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${t.bg}, ${t.surface})`,
                  borderColor: activeTheme === i ? t.accent : 'transparent',
                  boxShadow: activeTheme === i ? `0 0 12px ${t.glow}40` : 'none',
                }}
              />
              <span className="text-[9px] font-medium text-[#aaa]">{t.name}</span>
              {activeTheme === i && (
                <motion.div
                  layoutId="theme-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: t.accent }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Preview */}
        <motion.div
          key={activeTheme}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-8 border relative overflow-hidden"
          style={{ background: theme.bg, borderColor: `${theme.accent}20` }}
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] -translate-y-1/2 rounded-full blur-3xl opacity-20" style={{ background: theme.glow }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Theme info */}
            <div className="flex-1">
              <div className="text-3xl mb-2">{theme.icon}</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: theme.text, fontFamily: 'Space Grotesk' }}>
                {theme.name} Theme
              </h3>
              <p className="text-sm mb-6" style={{ color: `${theme.text}99` }}>
                Every element adapts — navigation, cards, buttons, charts, and even the balance card glow. A complete visual transformation.
              </p>

              {/* Color swatches */}
              <div className="flex gap-3">
                {[
                  { label: 'Background', color: theme.bg },
                  { label: 'Surface', color: theme.surface },
                  { label: 'Accent', color: theme.accent },
                  { label: 'Glow', color: theme.glow },
                ].map(swatch => (
                  <div key={swatch.label} className="text-center">
                    <div
                      className="w-10 h-10 rounded-lg border border-white/10 mb-1"
                      style={{ background: swatch.color }}
                    />
                    <span className="text-[8px] uppercase tracking-wider" style={{ color: `${theme.text}60` }}>{swatch.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini phone preview */}
            <div
              className="w-48 h-80 rounded-3xl p-4 flex flex-col border"
              style={{ background: theme.surface, borderColor: `${theme.accent}20` }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[8px] font-bold" style={{ color: theme.accent }}>AZAMAN</span>
                <div className="w-3 h-3 rounded-full" style={{ background: `${theme.accent}20`, border: `1px solid ${theme.accent}40` }} />
              </div>
              <div className="rounded-xl p-3 mb-2" style={{ background: `${theme.bg}`, border: `1px solid ${theme.accent}15` }}>
                <div className="text-[7px] mb-0.5" style={{ color: `${theme.text}60` }}>Balance</div>
                <div className="text-sm font-bold" style={{ color: theme.text, fontFamily: 'Space Grotesk' }}>GH₵ 12,450</div>
                <div className="text-[7px]" style={{ color: theme.accent }}>1,088.65 USDC</div>
              </div>
              <div className="flex gap-1 mb-2">
                {['Dep', 'Send', 'P2P'].map(btn => (
                  <div key={btn} className="flex-1 py-1 rounded-lg text-center text-[6px] font-medium" style={{ background: `${theme.accent}15`, color: theme.accent }}>
                    {btn}
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-xl p-2" style={{ background: `${theme.bg}`, border: `1px solid ${theme.accent}10` }}>
                <div className="text-[6px] uppercase tracking-wider mb-1" style={{ color: `${theme.text}40` }}>Market</div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-3 h-3 rounded" style={{ background: `${theme.accent}20` }} />
                    <div className="flex-1 h-1 rounded-full" style={{ background: `${theme.accent}15` }} />
                    <div className="w-6 h-3 rounded text-[5px] flex items-center justify-center font-bold" style={{ background: `${theme.accent}20`, color: theme.accent }}>
                      Trade
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
