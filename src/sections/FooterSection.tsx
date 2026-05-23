export default function FooterSection() {
  return (
    <footer className="border-t border-white/5 bg-[#030305]">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ffd700] bg-clip-text text-transparent" style={{ fontFamily: 'Space Grotesk' }}>
                AZAMAN
              </span>
            </div>
            <p className="text-[#888] text-sm leading-relaxed mb-4">
              The future of P2P finance in Africa. Trade, save, and grow your wealth with the most advanced platform built for emerging markets.
            </p>
            <div className="flex gap-3">
              {['X', 'In', 'Gh'].map((social) => (
                <a key={social} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-[#888] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['P2P Exchange', 'Savings Goals', 'Vendor Portal', 'AI Matching', 'Social Chat'].map(item => (
                <li key={item}><a href="#features" className="text-[#888] text-sm hover:text-[#00d4ff] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Press Kit', 'Contact', 'Investor Relations'].map(item => (
                <li key={item}><a href="#" className="text-[#888] text-sm hover:text-[#00d4ff] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal & Compliance</h4>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'AML/CFT Policy', 'Act 1154 License', 'Cookie Settings'].map(item => (
                <li key={item}><a href="#" className="text-[#888] text-sm hover:text-[#00d4ff] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-xs">
            &copy; {new Date().getFullYear()} Azaman Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#555] text-xs">
            <span>Licensed VASP under Act 1154 (2025)</span>
            <span>&middot;</span>
            <span>Accra, Ghana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
