# Dream House Website — Lessons Learned Retrospective

**Project**: ourdream.house — immersive scroll-driven landing page + sub-pages
**Duration**: March 5–17, 2026 (13 days)
**Commits**: 75+ across 107 files
**Stack**: Next.js (App Router), TypeScript, GSAP + ScrollTrigger, Tailwind CSS, Lenis smooth scroll

---

## The Story in Numbers

| Category | Count | % of total |
|----------|------:|:----------:|
| Total commits | 70 | 100% |
| Feature / content work | ~21 | 30% |
| Bug fixes | ~38 | 54% |
| iOS Safari–specific fixes | ~28 | 40% |
| Reverted commits | 4+ | 6% |
| "Fix the fix" chains (3+ sequential fix commits) | 3 chains | — |

Day 1–10 (Mar 5–15): Built the entire site — scroll engine, 8 sections, 4 sub-pages, gallery, hero gate, animations, deployment.

Day 11 (Mar 16): **26 commits in a single day.** Nearly all iOS Safari fixes. This one day accounts for 37% of the entire project's commits.

---

## Part 1: What Went Well

### 1. The scroll engine architecture was right from the start

The single-ScrollTrigger architecture — one `progress` value (0–1) driving ALL crossfades, reveals, line draws, and fade-outs — was the foundational decision that made the rest of the scroll experience possible. Early experiments with individual per-element ScrollTriggers failed (content overlapping, text appearing all at once) and were quickly abandoned.

**In plain terms**: Instead of having 50 separate "when should I appear?" rules fighting each other, we built one master clock that everything listens to. One source of truth, no conflicts.

### 2. Absolute vh timing system

Anchoring all reveal timing in absolute viewport heights (e.g. "text starts appearing at 52vh of scroll") rather than fractions of section progress was a key insight. It meant that making a section longer just added breathing room at the end without stretching or slowing existing animations.

**In plain terms**: When we wanted more pause time at the end of a section, we just made the section taller. The text animations stayed exactly the same speed — they just had more empty space after them. No recalibration needed.

### 3. Fast v0.1 → iterate

The entire v0.1 (scroll engine, all sections, hero gate, video backgrounds) shipped in a single commit on day 1. Having everything roughly working immediately meant all subsequent work was refinement, not construction.

### 4. Sub-page design system emerged naturally

The four sub-pages (/who, /houses, /faq, /principles) developed a coherent design system through iteration — shared color tokens, typography hierarchy, animation patterns, and CTA styling. This wasn't planned upfront but crystallized around commit `9e51e93` (Normalize Houses page design system) and was documented for consistency.

### 5. The iOS overlay architecture was the right escape hatch

After 5 commits of cascading bugs trying to make the hero gate work inside ScrollCanvas on iOS (height capping fighting keyboard shift fighting GSAP state fighting touchmove prevention), the decision to extract the entire gate into a separate `position: fixed` overlay (`dc1c6eb`) was the turning point. It eliminated every cascading interaction by separating concerns architecturally.

**In plain terms**: We had a room where every time we fixed one leak, another sprung. Instead of more patches, we moved the furniture to a different room entirely. The old room's problems became irrelevant.

---

## Part 2: What Went Wrong

### 1. iOS Safari consumed 40% of all development effort

28 of 70 commits were iOS Safari–specific. The hero gate alone required 18 commits across 6 phases to get right. This wasn't scope creep — it was the same feature (show a galaxy video with a text input) requiring fundamentally different approaches on one platform.

**Root causes**:
- iOS Safari has unique viewport behavior (toolbars that appear/disappear, `visualViewport` vs `innerHeight`, keyboard pushing content)
- `position: sticky` is fragile on iOS — many CSS properties that are safe elsewhere break it silently
- React's hydration doesn't reliably set video DOM properties that iOS checks for autoplay permission
- Testing on real iOS devices happened late (day 10+), after the architecture was already committed

### 2. The "fix the fix" chains

Three times, we entered a pattern where fixing one iOS bug created another, which required another fix, which broke something else:

**Chain 1** — Sticky height during gate (4 commits):
- `bfee9be`: Changed `100dvh` → `100vh` (keyboard fix ✓, centering broke ✗)
- `5171076`: Reverted to `100dvh` + added height capping (centering ✓, galaxy shrunk ✗)
- `dc1c6eb`: Abandoned approach entirely → overlay architecture

**Chain 2** — Galaxy fullscreen (5 commits):
- `3016b9b`: Freeze height at initial value (keyboard fix ✓, still excluded toolbar ✗)
- `7e0e564`: Use `Math.max(visualViewport, innerHeight)` (both identical on iOS ✗)
- `dd9edfd`: Set height to `100vh` via JS (blank page ✗✗✗)
- `3ece8bb`: Revert, use color workaround (visible seam ✗)
- `b543944`: Abandon sticky-based approaches → fixed backdrop

**Chain 3** — Overflow-x (7+ commits):
- `4451c9f`: Add `overflow-x: hidden` to html + scroll-canvas (all sections black ✗✗✗)
- `6196888`: Remove from scroll-canvas (still black ✗)
- `61e61c0`: Remove from html too (horizontal scroll returns ✗)
- `801986c` → `aeb82b8` → `4d47537`: Try `clip` in CSS (Chrome breaks), revert, apply via JS only on iOS ✓ (on iOS 14/15)
- `32e7741`: Restore GSAP scroll + aggressive scrollLeft reset + `overflow-x: clip` on `[data-scroll-content]` (horizontal scroll persists ✗)
- `4f3db9c`: Discover `overflow-x: clip` on `<html>` breaks sticky on iOS 16+ — property is supported there and behaves like `hidden`. Remove from `<html>` and `<main>` (sections work on all iOS ✓, horizontal scroll persists ✗)
- `b53a613`: Abandon GSAP scroll on iOS → `/?home` navigation (clean page state, no keyboard artifacts ✓)

**In plain terms**: We spent hours playing whack-a-mole. Fix one thing, break another. The pattern was always the same: we were trying to work within a constraint (`position: sticky` inside a scroll container) that iOS Safari fundamentally handles differently. The real fix each time was to stop fighting the constraint and find a completely different approach.

### 3. Insufficient cross-browser testing during development

Most iOS bugs were discovered on day 10+ when testing on real devices. By then, the scroll architecture was deeply committed. Changes that would have been trivial on day 3 (like using `position: fixed` for the gate from the start) required architectural surgery on day 11.

### 4. CSS spec knowledge gaps caused catastrophic failures

Three separate times, adding `overflow-x: hidden` or `overflow-x: clip` to a parent element caused ALL post-hero sections to render as black screens. The CSS specification states that setting `overflow-x` to any non-visible value forces `overflow-y` to `auto`, which creates a new scroll container — breaking `position: sticky` for any descendant.

This is an obscure but well-documented CSS rule. Had we known it upfront, we would never have attempted those approaches.

**In plain terms**: CSS has a hidden rule — if you say "don't let content overflow sideways," the browser also secretly changes how vertical scrolling works, and that breaks any element that's supposed to "stick" to the screen. We hit this wall three separate times before we fully understood it.

### 5. The `100vh` vs `100dvh` vs `visualViewport.height` confusion

iOS Safari has three different "viewport height" values, and none of them means what you'd expect:

| Value | What it actually is on iOS Safari |
|-------|----------------------------------|
| `100vh` | The *largest possible viewport* (toolbar hidden). Setting this via JS on a sticky element causes a blank page. |
| `100dvh` | The *current dynamic viewport*. Tracks toolbar show/hide for CSS, but NOT for sticky element height. |
| `visualViewport.height` | The *visible area*, excluding toolbars AND keyboard. Accurate but always smaller than what CSS `100dvh` gives. |

None of these gives you "fullscreen including behind the toolbar." The only way to get that is `position: fixed; inset: 0` — which uses the *layout viewport*, the one value iOS doesn't expose via any JavaScript API.

**In plain terms**: We needed to know "how tall is the entire phone screen." iOS gives you three different answers, and all of them are wrong for what we needed. The actual answer can only be expressed in CSS, not JavaScript.

### 6. GSAP + React hydration timing issues

Multiple bugs stemmed from the gap between when React renders HTML and when GSAP initializes animations. Elements would flash (hero heading at wrong position, hero2 appearing before transition) because React rendered them visible and GSAP hadn't hidden them yet.

Solutions were ad-hoc:
- CSS `visibility: hidden; opacity: 0` on `[data-scroll-image]`, `[data-scroll-content]`, `[data-hero-heading]`, `[data-hero-input]`
- Inline styles `visibility: hidden; opacity: 0` on hero2 (CSS data attributes weren't enough for an `absolute inset-0` element)
- 3-second safety fallback that reveals hero elements if GSAP fails entirely

**In plain terms**: The page draws itself before the animation library is ready. That means users briefly see elements in the wrong place. We had to add CSS-level hiding as a first line of defense, with the animation library revealing things properly once it loads.

---

## Part 3: Technical Lessons

### Lesson 1: `position: sticky` is a house of cards on iOS

Any of the following breaks it, often silently (no error, just blank rendering):
- `overflow-x: hidden` on ANY ancestor element
- `overflow-x: clip` on `html` — Chrome treats it like `hidden`; **iOS 16+ Safari also breaks** (the property is supported and triggers the same scroll container behavior as `hidden` on the root element). Only iOS 14/15 is safe (property unsupported, silently ignored).
- `overflow-x: clip` on `<main>` or any ancestor in the sticky scroll chain — same risk
- `overflow: hidden` directly on the sticky element
- Setting `height: 100vh` via JavaScript on iOS Safari
- Any ancestor creating a new scroll container (which the overflow rules above do)

**Rule**: Treat the entire ancestor chain of a sticky element as a protected zone. Don't add overflow, transforms, or containment to any of them without testing on all browsers. `overflow-x: clip` is ONLY safe on non-ancestor elements (e.g. `[data-scroll-content]` children inside the sticky viewport).

### Lesson 2: CSS `overflow` has hidden coupling

```css
/* This ALSO secretly sets overflow-y: auto */
html { overflow-x: hidden; }
```

The CSS spec says: "If one computed value of overflow-x or overflow-y is not visible and the other is visible, the visible value computes to auto." This creates a scroll container, which is the sticky-killer. `overflow-x: clip` was designed to avoid this, but Chrome doesn't honor the distinction on the `html` element.

### Lesson 3: There are exactly two reliable fullscreen techniques on iOS Safari

1. **`position: fixed; inset: 0`** — Covers the full layout viewport including behind toolbars. The only truly fullscreen approach.
2. **CSS `100dvh`** (for non-sticky, non-JS-sized elements only) — Tracks the dynamic viewport, but only when the browser controls the sizing.

Everything else (`100vh`, `visualViewport.height`, `innerHeight`, any JS-computed height) will either exclude the toolbar, exclude the keyboard, or cause rendering failures.

### Lesson 4: Keyboard handling on iOS requires architectural separation

The iOS keyboard doesn't just reduce the viewport — it shifts the visual viewport downward (`visualViewport.offsetTop`), changes `visualViewport.height`, but does NOT change `innerHeight` or CSS viewport units. Any UI that needs to stay centered above the keyboard needs to track both `height` and `offsetTop`.

The overlay architecture (separate `position: fixed` element tracking `visualViewport` directly) was far simpler than trying to compensate within a sticky scroll container.

### Lesson 5: React `muted` attribute doesn't set the DOM property on iOS

```jsx
// This does NOT reliably allow autoplay on iOS
<video muted autoPlay />

// This does
const ref = useRef<HTMLVideoElement>(null);
useEffect(() => {
  const v = ref.current;
  if (v) { v.muted = true; v.play().catch(() => {}); }
}, []);
```

iOS Safari checks the *DOM property* `video.muted`, not the HTML attribute. React's hydration doesn't always sync attributes to properties before iOS checks.

### Lesson 6: `mix-blend-mode` over `<video>` is broken on iOS Safari

Renders as a solid black rectangle. Must detect iOS and conditionally omit the blend mode. SSR must never include it either (hydration mismatch would flash black).

### Lesson 7: `overflow-x: clip` is the right CSS primitive, but support is broken everywhere on root elements

`overflow-x: clip` was designed to clip overflow without creating a scroll container. In practice:
- **Chrome (all platforms)**: Treats `clip` on `<html>` the same as `hidden` — creates a scroll container, breaks sticky.
- **iOS Safari 16+**: Also breaks `position: sticky` when `clip` is applied to `<html>`. The property IS supported (unlike iOS 14/15 where it's ignored), but `<html>` has special scroll root behavior.
- **iOS Safari 14/15**: `clip` is unsupported, silently ignored — sticky works by accident.

**The only safe usage**: Apply `overflow-x: clip` to non-ancestor elements like `[data-scroll-content]` (children inside the sticky viewport). Never on `<html>`, `<main>`, or any element in the sticky scroll chain.

### Lesson 8: SVG measurements are invalidated by GSAP transforms

GSAP's `gsap.set(el, { y: 12 })` applies a CSS transform. `getBoundingClientRect()` includes transforms, so measured positions are offset by GSAP's current transform values. To measure true layout positions:

```js
const savedY = gsap.getProperty(el, "y");
gsap.set(el, { y: 0 });        // reset transform
const rect = el.getBoundingClientRect(); // measure
gsap.set(el, { y: savedY });   // restore
```

### Lesson 9: iOS keyboard leaves persistent horizontal scroll compositing offset

After keyboard open/close on a `position: fixed` element on iOS Safari, a horizontal scroll offset can persist even after the fixed element is removed. This offset cannot be cleared by:
- `window.scrollTo({ left: 0 })`
- `document.documentElement.scrollLeft = 0`
- `document.body.scrollLeft = 0`
- Forced layout reflow (`void document.body.offsetHeight`)

The offset lives at the WebKit compositing layer, below the JavaScript scroll API. The only reliable fix is a full page navigation (`window.location.href = "/?home"`) which resets all compositing state.

**Rule**: After iOS keyboard interaction, don't try to continue with GSAP scroll animations. Navigate to a clean page state instead.

### Lesson 10: MP4 must come before WebM in `<source>` order

Safari can't play WebM. If WebM is listed first, Safari tries it, fails, then falls back to MP4 — wasting seconds of load time. MP4 first means Safari starts playback immediately and Chrome/Firefox still prefer WebM if they check subsequent sources.

### Lesson 11: `justify-center` + `overflow: hidden` clips content from the top

When content exceeds its container and `justify-center` is used with `overflow: hidden`, the content is clipped equally from top and bottom — losing the top of the content entirely. `margin: auto` (via Tailwind's `my-auto`) collapses to zero when content overflows, aligning to the top instead.

---

## Part 4: Process Lessons

### Lesson 1: Test on real devices early — not as a final step

The most expensive bugs were all discovered when testing on physical iOS devices on day 10+. By then, the scroll architecture was committed and every iOS fix required working within (or around) existing constraints.

**What we'd do differently**: Borrow/simulate an iPhone on day 2. Build the hero gate with `position: fixed` from the start on iOS. The entire "height capping → shift math → overlay extraction" journey (commits `351064b` through `bfb0154`, 6 commits) would have been avoided.

### Lesson 2: When you're on the third fix for the same bug, change the architecture

Each "fix the fix" chain followed the same pattern: incremental patches within the existing architecture, each creating new interactions. The resolution was always an architectural change (overlay, fixed backdrop, JS-only overflow-x).

**The signal**: If you're fixing the same visual symptom for the third time, the problem isn't the symptom — it's the structure. Step back and redesign the approach.

### Lesson 3: Document failure modes, not just solutions

The CLAUDE.md accumulated a detailed "Fix History" section that documented not just what works, but what was tried and failed, and *why* it failed. This prevented re-attempting approaches that had already been proven broken (like setting `100vh` via JS on sticky elements).

Without this history, it would have been tempting to try `100vh` again — it sounds like it should work. The documentation saved at least 2-3 additional failed attempts.

### Lesson 4: One platform's fix is another platform's regression

Three times, a fix that worked perfectly on iOS broke Android/desktop (and vice versa):
- `overflow-x: clip` in CSS — Safari ✓, Chrome ✗
- `100vh` via JS — Desktop ✓, iOS ✗✗✗
- Gate height capping — Keyboard ✓, toolbar ✗

**Rule**: Every CSS or viewport change must be tested on at minimum: iOS Safari, Android Chrome, and desktop Chrome/Firefox. If a fix can't work on all three, it needs a platform-conditional code path.

### Lesson 5: Deployment infrastructure should be settled before creative work

Three commits were spent on GitHub Pages basePath issues (`99fcc15`, `8678274`, `73d58e7`). Font paths broke because CSS `@font-face url()` doesn't auto-prepend `basePath`. Image paths broke for the same reason. Then when the custom domain was set up, all the basePath prefixes had to be removed.

**What we'd do differently**: Set up the deployment target (custom domain, no basePath) on day 1 before writing any asset paths.

### Lesson 6: Image optimization should happen during asset creation, not after

Commit `0293507` converted all section PNGs to JPG, reducing total image size from ~32MB to ~2MB. This should have been done when the images were first added. The initial page load was 30MB+ for days.

### Lesson 7: Commit messages are your debugging changelog

Every commit message in this project describes what was done and why. The multi-line commit messages on complex changes (like `7364e41` which describes three separate issues in the auto-scroll) were invaluable for understanding what broke and when during the iOS debugging marathon.

---

## Part 5: Architectural Patterns That Emerged

### Pattern 1: Platform-conditional rendering

```
Desktop/Android: Component A inside shared container
iOS:             Component B as fixed overlay + Component C as fixed backdrop
```

When a shared architecture can't handle platform differences, it's better to render entirely different component trees than to pile conditionals into a single component. The iOS hero gate (HeroGateOverlay + galaxy backdrop) and the desktop hero gate (HeroSection inside ScrollCanvas) share zero code.

### Pattern 2: CSS for structure, JS for platform workarounds

CSS `position: fixed; inset: 0` solves the fullscreen problem that no JS API could. But `overflow-x: clip` works on Safari and not Chrome — so JS applies it conditionally. The pattern: use CSS for the things it does reliably across browsers, and use JS to patch the gaps between browsers.

### Pattern 3: The "backdrop + overlay + canvas" stack

```
z-9998: Fixed backdrop (galaxy video or beach image, fullscreen via CSS)
z-9999: Fixed overlay (gate UI, tracks visualViewport for keyboard)
z-1:    Sticky scroll canvas (main scroll experience)
```

Three separate rendering layers, each solving one problem, none depending on the others' sizing. This separation of concerns was the key to making iOS work.

### Pattern 4: Defensive CSS pre-hiding

```css
[data-scroll-image], [data-scroll-content] { visibility: hidden; opacity: 0; }
[data-hero-heading], [data-hero-input] { visibility: hidden; opacity: 0; }
```

GSAP overrides these once it initializes. But if GSAP is slow or fails, the CSS prevents flash-of-unstyled-content. A 3-second safety fallback reveals hero elements if GSAP never runs. Belt and suspenders.

---

## Part 6: If We Were Starting Over

1. **Build the iOS path first.** The most constrained platform should define the architecture. Every "how does this work on iOS?" question would have been answered before desktop refinement began.

2. **Use `position: fixed` for any fullscreen UI from day 1.** Don't try to make sticky containers fullscreen on iOS. It doesn't work. Ever. Fixed is the only reliable fullscreen.

3. **Set up real-device testing on day 1.** BrowserStack, a physical iPhone, anything. The cost of discovering iOS bugs on day 10 was 26 commits in a single day.

4. **Never put `overflow` properties on ancestors of sticky elements.** Not `hidden`, not `clip`, not anything. `overflow-x: clip` breaks sticky on iOS 16+ and Chrome when applied to `<html>` or `<main>`. Only safe on non-ancestor leaf elements like `[data-scroll-content]`.

5. **Use one video format (MP4) with proper poster images.** The WebM/MP4 dual-source approach added complexity for marginal savings. Safari can't play WebM at all. Just ship MP4.

6. **Optimize images on creation, not after.** Ship JPGs from the start. Don't commit 32MB of PNGs and convert later.

7. **Separate the scroll engine from section content from day 1.** The single-ScrollTrigger architecture was right, but it should have been the *starting* architecture, not discovered after failed alternatives.

---

## The Meta-Lesson

The most expensive bugs weren't the hardest to fix in isolation. They were the ones where multiple correct-seeming fixes interacted in unexpected ways. `overflow-x: hidden` is correct CSS. `position: sticky` is correct CSS. But combining them triggers a spec-level interaction that breaks everything.

The way out was never "try harder within the same approach." It was always "find a fundamentally different approach that avoids the interaction entirely."

Build for the most constrained platform first. When you hit the third fix for the same bug, stop fixing and start redesigning. And test on real devices before the architecture is committed.

---

## Part 7: iOS Interaction & Animation Fixes (Day 13)

Three more iOS Safari issues discovered through real-device testing on iPhone SE:

### Lesson 12: iOS Safari caches `position: fixed` canvas layers as static bitmaps

**Problem**: `StarCanvas` used a `<canvas>` element with `position: fixed; inset: 0` and `requestAnimationFrame` for continuous star animation. On iOS Safari, stars appeared frozen — occasionally jumping to new positions during scroll.

**Root cause**: iOS Safari's compositor treats fixed canvas elements as static bitmap layers. It caches the initial render and only re-composites during scroll events (which is when the stars "jumped" to their current animation state). The JS `requestAnimationFrame` loop ran fine, but the compositor never picked up the new pixels.

**Fix**: Replaced the canvas entirely with Framer Motion `motion.span` elements — each star is a `✦` character with independent drift (x/y transform) and twinkle (opacity) animations. The compositor handles CSS transform animations natively (same engine that drove the blob animations, which always worked on iOS).

**Rule**: Never use `<canvas>` with `position: fixed` for continuous animation on iOS Safari. Use CSS transform/opacity animations (via Framer Motion or CSS @keyframes) which the compositor handles natively.

### Lesson 13: React `onChange` on `<input type="range">` fires every frame

**Problem**: Dream Dues slider was extremely sluggish on iOS despite using refs + rAF for DOM updates.

**Root cause**: React's `onChange` on `<input type="range">` maps to the native `input` event (NOT the native `change` event). It fires on every drag frame, calling `setSliderVal()` which triggered a full React re-render of the entire slider component ~60fps — completely negating the ref-based optimizations.

**Fix**: Removed `onChange` entirely. State syncs only on native `pointerup`/`touchend` via `useEffect` listeners on the input ref. All visual updates during drag go through direct DOM writes. Also moved slider CSS from an inline `<style>` tag to `globals.css` (React was diffing a 40-line style element on every re-render).

**Rule**: For real-time slider interaction, never use React's `onChange` to update state during drag. Use `onInput` for visual feedback via refs, and native `pointerup`/`touchend` for state sync.

### Lesson 14: CSS 3D transitions don't interpolate on iOS Safari

**Problem**: Tarot card flip animation on Principles page snapped instantly instead of showing a smooth 0.6s rotation.

**Root cause**: CSS `transition` on `transform: rotateY()` with `transformStyle: preserve-3d` skips interpolation on iOS Safari and jumps to the final value. Adding `will-change: transform` to child face divs made it worse by promoting each face to its own compositing layer, breaking the 3D stacking context.

**Fix**: Replaced the inner `<div>` with Framer Motion `<motion.div animate={{ rotateY }}>`. Framer Motion drives the animation via JS requestAnimationFrame interpolation, completely bypassing WebKit's broken CSS transition engine for 3D transforms. Removed `will-change` from face divs.

**Rule**: For 3D transforms on iOS, use JS-driven animation (Framer Motion) instead of CSS transitions. Don't add `will-change: transform` to children of `preserve-3d` containers.

---

## Part 8: Vercel Migration & API Layer (Day 15)

### Migration from GitHub Pages to Vercel

Moved hosting from GitHub Pages (static export) to Vercel to unlock serverless API routes. Key changes:

- Removed `output: "export"` from `next.config.ts` — API routes now run as Vercel serverless functions
- Deleted `.github/workflows/deploy.yml` (GitHub Pages workflow)
- Vercel auto-deploys on push to `main` and creates preview deployments for every PR

### Dream Capture API

The hero gate inputs ("share a dream" and "how can others support your dream") now persist to Upstash Redis via a serverless API route:

- `POST /api/dreams` — public, rate-limited (5 per IP per hour via `@upstash/ratelimit`)
- `GET /api/dreams` — gated behind `Authorization: Bearer <DREAMS_API_KEY>` header
- Hero1 entries stored under Redis key `dream`, hero2 under `dream-support`

### Lesson 15: Safety fallbacks can become the bug

**Problem**: After the hero gate skip to the beach section, the ocean section would flash in briefly after ~3 seconds, then correct itself when the user scrolled.

**Root cause**: ScrollCanvas had a 3-second safety fallback that reveals sections if GSAP fails to initialize. It fired unconditionally — even when GSAP was already running. It used a simple linear index (`progress * sectionCount`) that didn't match GSAP's weighted `scrollVh` mapping, computing ocean (section 3) instead of beach (section 2). The forced inline styles overrode GSAP's correct state until the next scroll event.

**Fix**: Added a `gsapReady` ref. The fallback now skips if GSAP has already initialized. The fallback still fires correctly if GSAP genuinely fails to load.

**Rule**: Safety fallbacks must check whether the system they're backing up is already running. An unconditional fallback can fight with the primary system.

### Lesson 16: iOS keyboard centering requires tracking `visualViewport.offsetTop`

**Problem**: After refactoring the hero gate overlay to use `paddingBottom: keyboardHeight` for centering content above the keyboard, the input was pushed too high — above the visible viewport.

**Root cause**: iOS Safari shifts the visual viewport downward when focusing an input (`visualViewport.offsetTop` becomes non-zero). The `paddingBottom` approach only accounted for keyboard height, not the viewport offset. The content was centered in a space that didn't match what the user actually saw.

**Fix**: Hybrid architecture — outer overlay stays `fixed inset-0` (no dark gap with galaxy backdrop), inner content wrapper tracks both `visualViewport.height` and `visualViewport.offsetTop`. This gives the same correct centering as the original approach without exposing the dark gap that prompted the refactor.

**Rule**: On iOS, `visualViewport.height` and `visualViewport.offsetTop` must always be tracked together. Using one without the other will misposition content when the keyboard is open.

### Lesson 17: `Math.random()` in SSR components causes hydration mismatches

**Problem**: StarCanvas generated random star positions using `Math.random()` in a `useMemo`. Server and client produced different values, causing a hydration mismatch warning (red error overlay in dev).

**Fix**: Added a `mounted` state gate — component returns `null` during SSR, renders stars only after mount on the client. No server HTML means no mismatch.

**Rule**: Components that use `Math.random()`, `Date.now()`, or any non-deterministic value must skip SSR rendering entirely. Use a `mounted` state pattern to render only on the client.

### Lesson 18: iOS Low Power Mode silently blocks video autoplay

**Problem**: On iOS in Low Power Mode, the hero galaxy video failed to autoplay. The `play().catch()` handler hid the video element (`display: none`), revealing only a solid `#050a1a` background — a dark purple screen with no visual content.

**Root cause**: iOS Low Power Mode blocks all video autoplay regardless of the `muted` attribute. The existing code correctly detected the failure and hid the video, but the fallback behind it was just a solid color div — no poster image.

**Fix**: Extracted a frame from `galaxy.mp4` (using ffmpeg) as `galaxy-poster.jpg`. Used it as both the `<video poster>` attribute and as a CSS `background-image` on the div behind the video (`background: #050a1a url('/videos/galaxy-poster.jpg') center/cover no-repeat`). When Low Power Mode blocks autoplay and the video is hidden, the galaxy starfield image shows through instead of a solid color. Applied to both the ScrollCanvas hero video and the iOS galaxy backdrop.

**Rule**: Always provide a meaningful static fallback behind `<video>` elements — not just a solid color. iOS Low Power Mode, data saver modes, and slow connections can all prevent video playback. The fallback should be visually equivalent to a frame of the video.
