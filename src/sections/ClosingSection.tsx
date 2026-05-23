import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ClosingSection() {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(0,212,255,0.08) 0%, transparent 60%)' }} />

      <div className="relative max-w-[800px] mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to join the{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#00ff88] to-[#ffd700] bg-clip-text text-transparent">
              future of finance?
            </span>
          </h2>
          <p className="text-[#999] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you're a trader looking for the best rates, a vendor building your business, or an investor seeking the next frontier — Azaman is built for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-black bg-gradient-to-r from-[#00d4ff] to-[#00ff88] shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[0_0_80px_rgba(0,212,255,0.5)] transition-shadow"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all"
            >
              Read the Whitepaper
            </motion.button>
          </div>

          {/* Trust line */}
          <p className="text-[#555] text-xs mt-12 uppercase tracking-wider">
            Licensed under Act 1154 (2025) &middot; Bank of Ghana Compliant &middot; USDC-backed
          </p>
        </motion.div>
      </div>
    </section>
  )
}
