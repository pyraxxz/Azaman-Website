import { motion } from 'framer-motion'
import { Check, Palette } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// =============================================================================
// THEME SHOWCASE — Now wired to the GLOBAL ThemeContext.
// Clicking a theme tile actually changes the entire website appearance.
// =============================================================================

export default function ThemeShowcase() {
  const { theme, themeId, setThemeId, themes } = useTheme()

  return (
    <section
      id="themes"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 800px 600px at 50% 50%, ${theme.glow}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: `${theme.accent}10`,
              border: `1px solid ${theme.accent}30`,
              color: theme.accent,
            }}
          >
            <Palette size={12} />
            Personalization
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
          >
            11 Immersive Themes.{' '}
            <span style={{ color: theme.accent }}>Try them now.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.textMuted }}>
            Tap any theme below to instantly transform this entire website. Background,
            accents, glows, cards — all change together. The same engine powers the mobile app.
          </p>
        </motion.div>

        {/* Theme picker grid — clicking changes the global theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2 sm:gap-3 mb-10"
        >
          {themes.map((t, i) => {
            const isActive = themeId === t.id
            return (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setThemeId(t.id)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="relative flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl transition-all"
                style={{
                  backgroundColor: isActive ? `${t.accent}15` : theme.surface,
                  border: `1.5px solid ${isActive ? t.accent : theme.border}`,
                  boxShadow: isActive ? `0 0 24px ${t.glow}40, 0 4px 16px rgba(0,0,0,0.2)` : 'none',
                }}
              >
                {/* Theme color preview disc */}
                <div className="relative">
                  <div
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${t.background}, ${t.surface})`,
                      border: `2px solid ${isActive ? t.accent : 'transparent'}`,
                      boxShadow: `0 0 ${isActive ? '16px' : '6px'} ${t.glow}${isActive ? '60' : '20'}`,
                    }}
                  />
                  {/* Accent dot */}
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: t.accent,
                      borderColor: isActive ? t.accent : theme.surface,
                    }}
                  />
                  {/* Active checkmark */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: t.accent, color: t.isDark ? '#000' : '#fff' }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <span
                  className="text-[9px] sm:text-[10px] font-semibold truncate w-full text-center"
                  style={{ color: isActive ? t.accent : theme.textSecondary }}
                >
                  {t.icon} {t.name}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Live preview card — updates as the user picks themes */}
        <motion.div
          key={themeId}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl p-6 sm:p-10 overflow-hidden"
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
          }}
        >
          {/* Glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse, ${theme.glow}30 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Theme info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="text-5xl mb-3">{theme.icon}</div>
              <h3
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
              >
                {theme.name} Theme
              </h3>
              <div
                className="inline-block text-[10px] uppercase tracking-widest font-bold mb-4 px-2 py-1 rounded-full"
                style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
              >
                ● Active Now
              </div>
              <p className="text-sm sm:text-base mb-6 leading-relaxed" style={{ color: theme.textSecondary }}>
                Notice how the entire page shifted? Every element on this site — navigation,
                cards, buttons, text, glows — is now powered by the {theme.name} palette.
                The mobile app does this too, in milliseconds, with full haptic feedback.
              </p>

              {/* Color swatches */}
              <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                {[
                  { label: 'Background', color: theme.background },
                  { label: 'Surface', color: theme.surface },
                  { label: 'Accent', color: theme.accent },
                  { label: 'Glow', color: theme.glow },
                  { label: 'Success', color: theme.success },
                ].map((swatch) => (
                  <div key={swatch.label} className="text-center">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-1.5"
                      style={{
                        background: swatch.color,
                        border: `1px solid ${theme.border}`,
                      }}
                    />
                    <span
                      className="text-[9px] sm:text-[10px] uppercase tracking-wider"
                      style={{ color: theme.textMuted }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini phone preview — also themed */}
            <div
              className="w-44 h-80 sm:w-52 sm:h-96 rounded-3xl p-3 sm:p-4 flex flex-col flex-shrink-0"
              style={{
                backgroundColor: theme.card,
                border: `2px solid ${theme.accent}30`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 24px ${theme.glow}20`,
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold tracking-wider" style={{ color: theme.accent }}>
                  AZAMAN
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.success }}
                />
              </div>
              <div
                className="rounded-xl p-3 mb-2.5"
                style={{
                  backgroundColor: theme.background,
                  border: `1px solid ${theme.accent}20`,
                }}
              >
                <div className="text-[8px] mb-0.5" style={{ color: theme.textMuted }}>
                  Total Balance
                </div>
                <div
                  className="text-base sm:text-lg font-bold"
                  style={{ color: theme.textPrimary, fontFamily: 'Space Grotesk' }}
                >
                  GH₵ 12,450
                </div>
                <div className="text-[8px]" style={{ color: theme.accent }}>
                  1,088.65 USDC
                </div>
              </div>
              <div className="flex gap-1.5 mb-2.5">
                {['Send', 'Trade', 'Save'].map((btn) => (
                  <div
                    key={btn}
                    className="flex-1 py-1.5 rounded-lg text-center text-[8px] font-semibold"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.accent,
                      border: `1px solid ${theme.accent}30`,
                    }}
                  >
                    {btn}
                  </div>
                ))}
              </div>
              <div
                className="flex-1 rounded-xl p-2.5 space-y-1.5"
                style={{
                  backgroundColor: theme.background,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div className="text-[8px] uppercase tracking-wider mb-1" style={{ color: theme.textMuted }}>
                  Market
                </div>
                {['KwameGold', 'AkosuaSwap', 'KofiBarter'].map((vendor) => (
                  <div key={vendor} className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded text-[7px] flex items-center justify-center font-bold"
                      style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
                    >
                      {vendor[0]}
                    </div>
                    <span className="text-[7px] flex-1 truncate" style={{ color: theme.textSecondary }}>
                      {vendor}
                    </span>
                    <span className="text-[7px] font-bold" style={{ color: theme.success }}>
                      11.4{Math.floor(Math.random() * 10)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs mt-6"
          style={{ color: theme.textMuted }}
        >
          ↑ Try clicking different themes above to see the entire site morph
        </motion.p>
      </div>
    </section>
  )
}
