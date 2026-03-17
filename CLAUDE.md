# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Next.js dev server at localhost:3000)
- **Build**: `npm run build` (static export to `out/`)
- **Lint**: `npm run lint` (ESLint)
- **Package manager**: pnpm (lockfile is `pnpm-lock.yaml`)
- **No test suite configured**

## Architecture

**Next.js 16 App Router** with static export (`output: "export"`) deployed to GitHub Pages. React 19, TypeScript strict mode, Tailwind CSS 4.

### Page Pattern

Each route (`/faq`, `/houses`, `/principles`, `/who`) has a thin `page.tsx` that exports metadata and renders a `*Content.tsx` client component containing all logic. The homepage (`/`) is different — it orchestrates a scroll-driven experience.

### Homepage Scroll System

The homepage is a full-screen scroll-driven animation built on three integrated systems:

1. **Lenis** (`src/providers/LenisProvider.tsx`) — smooth scroll, synced to GSAP's ticker via `gsap.ticker.lagSmoothing(0)`
2. **GSAP ScrollTrigger** (`src/components/scroll/ScrollCanvas.tsx`) — master timeline pinning a sticky viewport, cycling through sections defined in `src/lib/constants.ts`
3. **Framer Motion** (`motion` package) — used for star animations (`StarCanvas.tsx`), not scroll

**Hero Gate flow**: On homepage load, Lenis is stopped. The gate (dream input interaction) must complete before scroll unlocks via `CustomEvent("dreamhouse:unlock-scroll")`. iOS uses `HeroGateOverlay` (fixed overlay); non-iOS uses scroll canvas section 0. After gate completes, `dreamhouse:scroll-complete` fires when scroll animation ends.

### iOS Safari Workarounds

This codebase has extensive iOS Safari handling — preserve these patterns when making changes:

- `visualViewport.height` tracking for sticky elements (toolbar show/hide changes viewport)
- `mix-blend-mode: screen` disabled on iOS (causes black rectangle over video)
- Touch scroll prevention on scroll canvas during hero gate (`passive: false`)
- Beach backdrop image covers iOS toolbar gap
- Keyboard detection via `visualViewport.height` ratio

iOS detection: `/iPad|iPhone|iPod/.test(navigator.userAgent)` plus Mac with touch support check.

### Styling

Tailwind CSS 4 with custom theme in `src/app/globals.css` via `@theme inline`. Key custom colors defined in `COLORS` constant (`src/lib/constants.ts`): galaxy, turquoise, cream, coral. Fonts: Playfair Display (italic), Cormorant Garamond.

### Component Organization

- `src/components/sections/` — full-screen content sections composing the homepage scroll experience
- `src/components/scroll/ScrollCanvas.tsx` — the master scroll driver; most animation logic lives here
- `src/components/ui/` — reusable UI primitives (DreamInput, TextReveal, ScrollIndicator)
- `src/components/layout/Navigation.tsx` — sticky responsive nav
- `src/lib/constants.ts` — centralized colors, nav items, section definitions

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to main.
