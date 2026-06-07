# Azaman Website

Marketing and landing site for the Azaman P2P crypto exchange platform. Deployed via GitHub Pages.

## Stack

- **Framework**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS 3 + shadcn/ui
- **Animations**: GSAP 3, Framer Motion 12, Lenis (smooth scroll)
- **Data**: Tanstack Query 5, connects to `GET /api/public/stats` on the live backend

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build        # outputs to dist/
```

The GitHub Actions workflow (`.github/workflows/static.yml`) automatically builds and deploys to GitHub Pages on every push to `main`.

## Sections

| Section | Description |
|---|---|
| **Hero / Bridge** | Main hero with animated background |
| **Stats** | Live platform numbers (users, trades, volume) fetched from the backend `/api/public/stats` endpoint, cached 5 min |
| **Live Ticker** | Scrolling ticker of recent activity |
| **Bento Ecosystem** | Feature grid cards |
| **App Showcase** | Mobile app screenshot showcase |
| **Susu Engine** | Private savings circle feature highlight |
| **AZM Auction** | AZM loyalty point mechanics |
| **Chat / Tickets** | Chat and tickets feature highlight |
| **FAQ** | Frequently asked questions |
| **Closing / CTA** | Call-to-action and footer |
| **Investors** | Investor section |

## Environment

The site reads `VITE_API_URL` for the backend URL (defaults to the live Render deployment). For local development pointing at a local backend:

```bash
VITE_API_URL=http://localhost:3000 npm run dev
```
