# The Dream House

An immersive, scroll-driven website for [ourdream.house](https://ourdream.house) — a curated co-living experience for ambitious creatives seeking meaningful community and transformation.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript
- **Scroll Engine**: GSAP + ScrollTrigger (single master controller)
- **Smooth Scroll**: Lenis
- **Animations**: Framer Motion (stars, page transitions)
- **Styling**: Tailwind CSS 4 with custom theme
- **Typography**: Playfair Display (italic), Cormorant Garamond, Fraunces, Nunito
- **Hosting**: Vercel (serverless)
- **Storage**: Upstash Redis (dream submissions)
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx              # Homepage — orchestrates scroll experience
    layout.tsx            # Root layout, fonts, analytics
    api/dreams/route.ts   # Dream capture API (Upstash Redis)
    faq/                  # FAQ page
    houses/               # Houses info page
    principles/           # Values/principles page
    who/                  # About/team page
  components/
    scroll/
      ScrollCanvas.tsx    # Master scroll controller — single ScrollTrigger
    sections/
      HeroSection.tsx     # Hero gate (desktop/Android)
      HeroGateOverlay.tsx # Hero gate (iOS — fixed overlay)
      StorySection.tsx    # Beach/ocean story sections
      WelcomeSection.tsx  # Welcome section
      InspiredBySection.tsx
      IntelligentSection.tsx
      PortalSection.tsx
      GallerySection.tsx  # Image gallery with CTAs
    ui/
      DreamInput.tsx      # Styled input for hero gate
      TextReveal.tsx      # Text reveal animation
      ScrollIndicator.tsx
    layout/
      Navigation.tsx      # Responsive nav
    PageBackground.tsx    # Sub-page ambient background
    StarCanvas.tsx        # Twinkling star animations
  providers/
    LenisProvider.tsx     # Smooth scroll provider
  lib/
    constants.ts          # Colors, nav items, section definitions
public/
  images/
    sections/             # Section background images
    typography/           # PNG headings (welcome, portal)
    icons/                # Hand-drawn ritual icons
  videos/                 # Hero background videos (MP4 + WebM)
```

## Architecture

### Scroll System

The homepage is a full-screen scroll-driven experience built on a single GSAP `ScrollTrigger.create()` that drives all crossfades, text reveals, SVG line draws, and fade-outs from a unified `progress` value (0-1). Section components render static content only — no independent GSAP animations.

All reveal timing is anchored in absolute viewport heights (vh), not fractions of section progress. This means increasing a section's scroll height adds buffer without stretching animations.

### iOS Safari

Extensive iOS-specific handling throughout. Key architectural decisions:

- **Hero gate**: Renders as a `position: fixed` overlay on iOS (separate from ScrollCanvas) to avoid sticky viewport + keyboard interaction bugs
- **Galaxy backdrop**: `position: fixed; inset: 0` is the only reliable fullscreen technique on iOS
- **Keyboard tracking**: Inner content wrapper follows `visualViewport.height` + `offsetTop`
- **Video autoplay**: DOM property `video.muted = true` via ref (React attribute hydration unreliable)

See `CLAUDE.md` for the complete iOS Safari fix history and rules.

### API

- `POST /api/dreams` — saves hero gate submissions to Upstash Redis. Rate-limited to 5 per IP per hour.
- `GET /api/dreams` — returns saved dreams. Requires `Authorization: Bearer <DREAMS_API_KEY>` header.

Dreams are stored in two Redis keys: `dream` (hero1) and `dream-support` (hero2).

## Environment Variables

Set in Vercel dashboard:

| Variable | Purpose |
|----------|---------|
| `KV_REST_API_URL` | Upstash Redis URL (auto-set by Vercel) |
| `KV_REST_API_TOKEN` | Upstash Redis token (auto-set by Vercel) |
| `DREAMS_API_KEY` | Secret key for reading dream submissions |

## Key Documents

- `CLAUDE.md` — detailed architecture docs, iOS fix history, design system, component reference
- `COPY.md` — all website copy organized by page
- `RETROSPECTIVE.md` — lessons learned from building the site
- `scroll-timings.csv` — editable spreadsheet of all scroll element timing

## Deployment

Vercel auto-deploys on push to `main`. Preview deployments are created for every PR.

```bash
pnpm build    # Production build
pnpm dev      # Dev server
pnpm lint     # ESLint
```
