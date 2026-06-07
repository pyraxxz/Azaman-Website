# Azaman Website

Marketing and landing site for the Azaman P2P crypto exchange platform. Deployed via GitHub Pages at `azaman.me`.

## Stack

- **Framework**: React 19, TypeScript, Vite 7.2
- **Styling**: Tailwind CSS 3 + shadcn/ui components
- **Animations**: GSAP 3.15 (ScrollTrigger, MotionPath, Flip), Framer Motion 12, Lenis smooth scroll
- **Data**: Tanstack Query 5, connects to `GET /api/public/stats` on the live backend
- **Routing**: React Router 7

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # TypeScript check + Vite build → dist/
```

The GitHub Actions workflow (`.github/workflows/static.yml`) builds and deploys to GitHub Pages on every push to `main`. Custom domain: `azaman.me` (via `public/CNAME`).

## Environment

The public stats endpoint is fetched from the live backend. For local development against a local backend:

```bash
# Override the backend URL via Vite's define or proxy:
VITE_API_URL=http://localhost:3000 npm run dev
```

## Sections

| Section | File | Description |
|---|---|---|
| **Hero** | `HeroBridge.tsx` | Full-screen cinematic hero. 3-act GSAP scroll timeline on desktop; Framer Motion sequence on mobile. Includes the LOCAL ⇄ USDC ⇄ GLOBAL payment bridge visualization showing supported rails (MoMo, Telecel, AirtelTigo, CashApp, Venmo, Zelle, Apple Pay) |
| **Live Ticker** | `LiveTickerSection.tsx` | Dual infinite-scroll marquee: live crypto/fiat rates (drifting) and recent trade activity |
| **Chat & Tickets** | `ChatTicketsSection.tsx` | 50/50 layout — animated phone mockup (GSAP chat loop) + 3 feature cards |
| **Bento Ecosystem** | `BentoEcosystem.tsx` | Asymmetric CSS Grid bento layout: Vaults, Smart Routes, 11-theme picker, AZM token, Hologram balance, Security, Live Oracle |
| **Susu Engine** | `SusuEngineSection.tsx` | Desktop: GSAP scroll-pinned 4-act circle animation. Mobile: horizontal snap-scroll cards with animated SVGs |
| **AZM Auction** | `AzmAuctionSection.tsx` | Live leaderboard with GSAP Flip re-ordering (every 8s a vendor outbids), burn ticker, 7-day bar chart |
| **App Showcase** | `AppShowcase.tsx` | Desktop: GSAP ScrollTrigger pinned 5-screen carousel (Home, Marketplace, Trade, Susu, Vault). Mobile: stacked Glass cards with mini phone mockups |
| **Stats** | `StatsSection.tsx` | Animated count-up on intersection: volume, users, uptime, settlement time |
| **Investors** | `InvestorSection.tsx` | Revenue model breakdown, competitive moats grid, traction timeline, investor deck CTA |
| **FAQ** | `FAQSection.tsx` | Two-column: search + category filter (left) + animated accordion (right) |
| **Closing / CTA** | `ClosingSection.tsx` | Email waitlist capture, App Store + Google Play badges, trust badges |
| **Vendors** | `src/pages/Vendors.tsx` | Full vendor landing page at `/vendors`: hero, pull-tab explainer, earnings model, interactive earnings calculator, 5-step application guide, requirements, FAQ, closing CTA |

## Key Components

| Component | Description |
|---|---|
| `Navigation.tsx` | Floating pill nav — GSAP morphs from full-width to pill on scroll. Theme picker (11 themes). Mobile overlay menu. |
| `Glass.tsx` | Glassmorphism card wrapper with 3D tilt on hover and optional mouse-glow effect |
| `PhoneFrame.tsx` | Realistic phone frame used in hero and chat sections |
| `ParticleCanvas.tsx` | Ambient particle background on the hero |
| `NodeGraph.tsx` | Animated node-edge graph for Smart Routes visualization |
| `ProgressRing.tsx` | SVG circular progress ring used in the Vaults bento cell |
| `CustomCursor.tsx` | Custom cursor with `data-cursor="hover"` / `data-cursor="hidden"` API |
| `PageTransition.tsx` | Route-level page transitions |
| `ScrollProgress.tsx` | Thin scroll-progress bar at top of viewport |

## Theming

11 themes switchable live from the nav picker. Each theme defines `background`, `surface`, `card`, `border`, `accent`, `glow`, `success`, `warning`, `danger`, `textPrimary`, `textSecondary`, `textMuted`, and `heroGradient`. Theme state is managed by `ThemeContext` and CSS variables are written to `:root` on each switch. See `src/contexts/ThemeContext.tsx`.

## GSAP Setup

All plugins (ScrollTrigger, MotionPathPlugin, Flip) are registered once in `src/lib/gsap.ts` and re-exported. Import from there, never from `gsap` directly:

```ts
import { gsap, ScrollTrigger, Flip, prefersReducedMotion } from '@/lib/gsap'
```

All animations respect `prefers-reduced-motion`.
