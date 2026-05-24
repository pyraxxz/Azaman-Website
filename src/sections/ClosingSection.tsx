import type React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FloatingElement } from '@/components/ScrollAnimations'

export default function ClosingSection() {
  const handleDownload = () => {
    const el = document.getElementById('download')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="download" className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background: noise texture + subtle ambient light */}
      <div className="absolute inset-0 bg-[#050508]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 70%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Floating decoration shapes */}
      <FloatingElement amplitude={12} duration={4} delay={0} className="absolute top-20 left-[10%] pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/10" />
      </FloatingElement>
      <FloatingElement amplitude={8} duration={5} delay={1} className="absolute top-32 right-[15%] pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/10" />
      </FloatingElement>
      <FloatingElement amplitude={15} duration={6} delay={0.5} className="absolute bottom-32 left-[20%] pointer-events-none">
        <div className="w-4 h-4 rotate-45 bg-[#D4AF37]/10 border border-[#D4AF37]/10" />
      </FloatingElement>
      <FloatingElement amplitude={10} duration={4.5} delay={2} className="absolute bottom-24 right-[10%] pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/10" />
      </FloatingElement>
      <FloatingElement amplitude={6} duration={3.5} delay={1.5} className="absolute top-1/2 left-[5%] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
      </FloatingElement>

      <div className="relative max-w-[800px] mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
            Ready to join the future of{' '}
            <span className="text-[#D4AF37]">finance?</span>
          </h2>
          <p className="text-[#999] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you're a trader looking for the best rates, a vendor building your business, or an investor seeking the next frontier — Azaman is built for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              className="group flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-black transition-shadow"
              style={{
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.15)',
              }}
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="#investors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                const el = document.getElementById('investors')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all cursor-pointer"
            >
              Read the Whitepaper
            </motion.a>
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
