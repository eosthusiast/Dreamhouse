"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSection {
  id: string;
  image: string | null;
  imagePosition?: string;
  mobileImagePosition?: string;
  content: React.ReactNode;
  scrollVh?: number;
}

interface ScrollCanvasProps {
  sections: ScrollSection[];
  heroVideo?: React.ReactNode;
  scrollPerSection?: number;
  onActiveSection?: (index: number) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function ScrollCanvas({
  sections,
  heroVideo,
  scrollPerSection = 260,
  onActiveSection,
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);
    setIsIOSSafari(isIOS);

    // On iOS, 100dvh doesn't track toolbar show/hide for sticky elements.
    // Use visualViewport.height (iOS 13+) or innerHeight (older) instead.
    if (isIOS && stickyRef.current) {
      const sticky = stickyRef.current;
      let rafId: number;

      const updateHeight = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const h = window.visualViewport?.height ?? window.innerHeight;
          sticky.style.height = `${h}px`;
        });
      };

      updateHeight();

      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", updateHeight);
      }
      window.addEventListener("orientationchange", updateHeight);
      window.addEventListener("resize", updateHeight);

      return () => {
        window.visualViewport?.removeEventListener("resize", updateHeight);
        window.removeEventListener("orientationchange", updateHeight);
        window.removeEventListener("resize", updateHeight);
        cancelAnimationFrame(rafId);
      };
    }
  }, []);

  // Safety fallback: if GSAP fails to init, reveal first section after 3s
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!stickyRef.current) return;
      const images = stickyRef.current.querySelectorAll("[data-scroll-image]");
      const contents = stickyRef.current.querySelectorAll("[data-scroll-content]");
      if (images[0]) (images[0] as HTMLElement).style.cssText += "visibility:visible;opacity:1;";
      if (contents[0]) (contents[0] as HTMLElement).style.cssText += "visibility:visible;opacity:1;";
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !stickyRef.current) return;

      const images =
        stickyRef.current.querySelectorAll<HTMLElement>("[data-scroll-image]");
      const contents =
        stickyRef.current.querySelectorAll<HTMLElement>(
          "[data-scroll-content]"
        );

      const N = sections.length;

      // Pre-compute per-section scroll heights and normalized boundaries
      const sectionVhs = sections.map(s => s.scrollVh ?? scrollPerSection);
      const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
      const sectionNormStarts = sectionVhs.map((_, i) =>
        sectionVhs.slice(0, i).reduce((a, b) => a + b, 0) / totalVh
      );
      const sectionNormWidths = sectionVhs.map(h => h / totalVh);

      // Pre-query all reveal elements per section
      const revealsPerSection: HTMLElement[][] = [];
      const revealsAfterLinePerSection: HTMLElement[][] = [];
      contents.forEach((contentEl) => {
        revealsPerSection.push(
          Array.from(contentEl.querySelectorAll<HTMLElement>("[data-reveal]"))
        );
        revealsAfterLinePerSection.push(
          Array.from(contentEl.querySelectorAll<HTMLElement>("[data-reveal-after-line]"))
        );
      });

      // Line elements queried lazily (dynamically rendered by child components)
      let lastActiveIndex = -1;
      function getLinesPerSection() {
        const result: { el: SVGPathElement; length: number }[][] = [];
        contents.forEach((contentEl) => {
          const paths = Array.from(contentEl.querySelectorAll<SVGPathElement>("[data-line]"));
          result.push(
            paths.map((p) => ({ el: p, length: p.getTotalLength() }))
          );
        });
        return result;
      }

      // Absolute vh values for reveal timing — anchored so they don't scale with scrollVh.
      // Increasing a section's scrollVh adds buffer at the end, not stretching reveals.
      const TEXT_START_VH = (idx: number) => idx === 2 ? 52 : idx === 4 ? 72.8 : 26;
      const TEXT_SPAN_VH = 182;
      const LINE_START_VH = (idx: number) => idx === 2 ? 78 : 39;
      const LINE_SPAN_VH = (idx: number) => idx === 2 ? 143 : 169;
      const AFTER_LINE_SPAN_VH = 26;

      // Pre-compute per-section fadeOut timing
      // fadeOutStart = when last element reaches full opacity + 50vh hold
      // fadeOutSpan = ~34vh normalized to each section's scrollVh
      const HOLD_VH = 50;
      const FADEOUT_VH = 34;
      const fadeOutStartPerSection: number[] = [];
      const fadeOutSpanPerSection: number[] = [];
      for (let i = 0; i < N; i++) {
        const sVh = sectionVhs[i];
        const reveals = revealsPerSection[i];
        const afterLineReveals = revealsAfterLinePerSection[i];

        // Compute when last data-reveal element reaches full opacity (absolute vh)
        let lastFullVh = -1;
        if (reveals.length > 0) {
          const M = reveals.length;
          const fadeFraction = i === 4 ? 0.4 : 0.3;
          const lastSliceEnd = ((M - 1) + fadeFraction) / M;
          lastFullVh = TEXT_START_VH(i) + lastSliceEnd * TEXT_SPAN_VH;
        }

        // Compute when last data-reveal-after-line element reaches full opacity
        if (afterLineReveals.length > 0) {
          const M = afterLineReveals.length;
          const lineEndVh = LINE_START_VH(i) + LINE_SPAN_VH(i);
          const lastSliceEnd = ((M - 1) + 0.3) / M;
          const afterLineFullVh = lineEndVh + lastSliceEnd * AFTER_LINE_SPAN_VH;
          lastFullVh = Math.max(lastFullVh, afterLineFullVh);
        }

        if (lastFullVh > 0) {
          fadeOutStartPerSection[i] = (lastFullVh + HOLD_VH) / sVh;
          fadeOutSpanPerSection[i] = FADEOUT_VH / sVh;
        } else {
          // No reveals — use defaults (won't be used)
          fadeOutStartPerSection[i] = 0.90;
          fadeOutSpanPerSection[i] = FADEOUT_VH / sVh;
        }
      }

      // Set initial states — everything hidden except section 0
      images.forEach((img, i) => {
        gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 });
      });
      contents.forEach((content, i) => {
        gsap.set(content, { autoAlpha: i === 0 ? 1 : 0 });
      });
      // Hide all reveal elements
      revealsPerSection.forEach((reveals) => {
        if (reveals.length > 0) gsap.set(reveals, { autoAlpha: 0, y: 12 });
      });
      revealsAfterLinePerSection.forEach((reveals) => {
        if (reveals.length > 0) gsap.set(reveals, { autoAlpha: 0, y: 12 });
      });

      // Single master ScrollTrigger drives everything
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1

          let activeIndex = N - 1;
          let sectionProgress = 1;
          for (let i = 0; i < N; i++) {
            if (progress < sectionNormStarts[i] + sectionNormWidths[i] || i === N - 1) {
              activeIndex = i;
              sectionProgress = clamp(
                (progress - sectionNormStarts[i]) / sectionNormWidths[i],
                0, 1
              );
              break;
            }
          }

          onActiveSection?.(activeIndex);

          // --- Crossfade logic ---
          const FADE_ZONE = 0.15; // Normal crossfade for non-hero sections
          const DEAD_ZONE = 0.11; // ~30vh hold after text before crossfade starts

          // Galaxy fade: slow dissolve from 50% of section 0 to 20% into section 2
          // Beach must be at full opacity by section 2 progress 0.20 (gate skip landing point)
          const galaxyFadeStart = sectionNormStarts[0] + 0.5 * sectionNormWidths[0];
          const galaxyFadeEnd = sectionNormStarts[2] + 0.20 * sectionNormWidths[2];

          for (let i = 0; i < N; i++) {
            let alpha = 0;
            let blendMode = "normal";

            if (i === 0) {
              // Galaxy video: screen blend with quadratic alpha curve
              // Quadratic (1-t)² fades faster early, reducing mid-transition brightness
              if (progress < galaxyFadeStart) {
                alpha = 1;
              } else if (progress < galaxyFadeEnd) {
                const t = (progress - galaxyFadeStart) / (galaxyFadeEnd - galaxyFadeStart);
                alpha = (1 - t) * (1 - t);
              }
              blendMode = (!isIOSSafari && alpha > 0) ? "screen" : "normal";
              if (images[i]) {
                (images[i] as HTMLElement).style.zIndex = alpha > 0 ? "10" : "1";
              }
            } else if (i === 1) {
              // Beach under galaxy: quadratic fade-in (t²) synced with galaxy
              // Slower early = less combined brightness at mid-transition
              if (progress < galaxyFadeStart) {
                alpha = 0;
              } else if (progress < galaxyFadeEnd) {
                const t = (progress - galaxyFadeStart) / (galaxyFadeEnd - galaxyFadeStart);
                alpha = t * t;
              } else if (activeIndex <= 2) {
                alpha = 1;
              } else if (activeIndex === 3 && sectionProgress < FADE_ZONE) {
                alpha = 1 - smoothstep(sectionProgress / FADE_ZONE);
              }
            } else if (i === 2 && progress < galaxyFadeEnd) {
              alpha = 0;
            } else if (i === 2 && progress < galaxyFadeEnd + 0.02) {
              // Brief fade-in to avoid snap when section 2 becomes active
              alpha = (progress - galaxyFadeEnd) / 0.02;
            } else {
              // Normal crossfade for all other sections
              // DEAD_ZONE delays the crossfade start, creating a hold after text reveals
              if (i === activeIndex) {
                if (sectionProgress < DEAD_ZONE) {
                  alpha = 0; // Hold — previous section still showing
                } else {
                  const fadeProgress = sectionProgress - DEAD_ZONE;
                  alpha = fadeProgress < FADE_ZONE
                    ? smoothstep(fadeProgress / FADE_ZONE)
                    : 1.0;
                }
              } else if (i === activeIndex - 1 && sectionProgress < DEAD_ZONE + FADE_ZONE) {
                if (sectionProgress < DEAD_ZONE) {
                  alpha = 1.0; // Hold at full opacity during dead zone
                } else {
                  const fadeProgress = sectionProgress - DEAD_ZONE;
                  alpha = 1.0 - smoothstep(fadeProgress / FADE_ZONE);
                }
              }
            }

            // Section 2 content: allow text/lines to show even while image is suppressed
            // (section 1's beach provides the background image during galaxy fade)
            let contentAlpha = alpha;
            if (i === 2 && activeIndex === 2 && progress < galaxyFadeEnd + 0.02) {
              contentAlpha = 1;
            }

            gsap.set(images[i], { autoAlpha: alpha });
            gsap.set(contents[i], { autoAlpha: contentAlpha });

            if (images[i]) {
              (images[i] as HTMLElement).style.mixBlendMode = blendMode;
            }
          }

          // --- Sequential text reveals (staggered, one at a time) ---
          for (let i = 0; i < N; i++) {
            const reveals = revealsPerSection[i];
            if (reveals.length === 0) continue;

            if (i === activeIndex) {
              // Timing anchored in absolute vh, normalized to this section's scrollVh
              const sVh = sectionVhs[i];
              const textStart = TEXT_START_VH(i) / sVh;
              const textSpan = TEXT_SPAN_VH / sVh;
              const revealProgress = clamp(
                (sectionProgress - textStart) / textSpan,
                0,
                1
              );
              const M = reveals.length;

              // Each element gets an equal slice of the progress bar
              // Element j occupies [j/M, (j+1)/M] — fade in over the first 30% of its slice
              // Welcome section (4): 0.5x speed = fade over 15% of slice instead of 30%
              const fadeFraction = i === 4 ? 0.4 : 0.3;
              const yOffset = i === 4 ? 50 : 12;

              // Fade-out zone: after reveals complete, fade out with upward drift (skip last section)
              const fadeOutStart = fadeOutStartPerSection[i];
              const fadeOutSpan = fadeOutSpanPerSection[i];
              const isLastSection = i === N - 1;

              if (!isLastSection && sectionProgress > fadeOutStart) {
                const fadeOutProgress = clamp((sectionProgress - fadeOutStart) / fadeOutSpan, 0, 1);
                reveals.forEach((el) => {
                  gsap.set(el, {
                    autoAlpha: 1 - fadeOutProgress,
                    y: -yOffset * fadeOutProgress,
                  });
                });
              } else {
                reveals.forEach((el, j) => {
                  const sliceStart = j / M;
                  const sliceEnd = (j + fadeFraction) / M;
                  const elementAlpha = clamp(
                    (revealProgress - sliceStart) / (sliceEnd - sliceStart),
                    0,
                    1
                  );
                  gsap.set(el, {
                    autoAlpha: elementAlpha,
                    y: yOffset * (1 - elementAlpha),
                  });
                });
              }
            } else {
              // Reset non-active sections' reveals to hidden
              gsap.set(reveals, { autoAlpha: 0, y: 12 });
            }
          }

          // --- Reveals that appear only after the line is fully drawn ---
          for (let i = 0; i < N; i++) {
            const reveals = revealsAfterLinePerSection[i];
            if (reveals.length === 0) continue;

            if (i === activeIndex) {
              const sVh = sectionVhs[i];
              const lineEnd = (LINE_START_VH(i) + LINE_SPAN_VH(i)) / sVh;
              const afterLineSpan = AFTER_LINE_SPAN_VH / sVh;
              const revealProgress = clamp((sectionProgress - lineEnd) / afterLineSpan, 0, 1);
              const M = reveals.length;

              // Fade-out zone (skip last section)
              const fadeOutStart = fadeOutStartPerSection[i];
              const fadeOutSpan = fadeOutSpanPerSection[i];
              const isLastSection = i === N - 1;

              if (!isLastSection && sectionProgress > fadeOutStart) {
                const fadeOutProgress = clamp((sectionProgress - fadeOutStart) / fadeOutSpan, 0, 1);
                reveals.forEach((el) => {
                  gsap.set(el, { autoAlpha: 1 - fadeOutProgress, y: -12 * fadeOutProgress });
                });
              } else {
                reveals.forEach((el, j) => {
                  const sliceStart = j / M;
                  const sliceEnd = (j + 0.3) / M;
                  const elementAlpha = clamp(
                    (revealProgress - sliceStart) / (sliceEnd - sliceStart),
                    0,
                    1
                  );
                  gsap.set(el, { autoAlpha: elementAlpha, y: 12 * (1 - elementAlpha) });
                });
              }
            } else {
              gsap.set(reveals, { autoAlpha: 0, y: 12 });
            }
          }

          // --- Line drawing (each line gets its own slice, synced with text reveals) ---
          // Re-query lines lazily (they may be dynamically rendered by child components)
          const linesPerSection = getLinesPerSection();
          for (let i = 0; i < N; i++) {
            const lines = linesPerSection[i] || [];
            if (lines.length === 0) continue;

            if (i === activeIndex) {
              const sVh = sectionVhs[i];
              const lineStart = LINE_START_VH(i) / sVh;
              const lineSpan = LINE_SPAN_VH(i) / sVh;
              const overallProgress = clamp(
                (sectionProgress - lineStart) / lineSpan,
                0,
                1
              );
              const L = lines.length;

              // Fade-out zone (skip last section)
              const fadeOutStart = fadeOutStartPerSection[i];
              const fadeOutSpan = fadeOutSpanPerSection[i];
              const isLastSection = i === N - 1;

              if (!isLastSection && sectionProgress > fadeOutStart) {
                const fadeOutProgress = clamp((sectionProgress - fadeOutStart) / fadeOutSpan, 0, 1);
                lines.forEach(({ el, length }) => {
                  gsap.set(el, {
                    strokeDasharray: length,
                    strokeDashoffset: length * fadeOutProgress,
                    autoAlpha: 1 - fadeOutProgress,
                  });
                });
              } else {
                lines.forEach(({ el, length }, k) => {
                  // Each line draws during its own slice of the progress
                  const sliceStart = k / L;
                  const sliceEnd = (k + 1) / L;
                  const lineProgress = clamp(
                    (overallProgress - sliceStart) / (sliceEnd - sliceStart),
                    0,
                    1
                  );
                  if (length > 0) {
                    gsap.set(el, {
                      strokeDasharray: length,
                      strokeDashoffset: length * (1 - lineProgress),
                      autoAlpha: lineProgress > 0 ? 1 : 0,
                    });
                  } else {
                    gsap.set(el, { autoAlpha: lineProgress > 0 ? 1 : 0 });
                  }
                });
              }
            } else {
              // Reset — fully hidden
              lines.forEach(({ el, length }) => {
                gsap.set(el, {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                  autoAlpha: 0,
                });
              });
            }
          }
        },
      });
    },
    { scope: containerRef, dependencies: [scrollPerSection, sections] }
  );

  const totalHeight = sections.reduce((sum, s) => sum + (s.scrollVh ?? scrollPerSection), 0);

  return (
    <div
      ref={containerRef}
      style={{ height: `${totalHeight}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full"
        data-sticky-viewport
        style={{ height: "100dvh" }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Background layers */}
          {sections.map((section, i) => (
            <div
              key={section.id}
              data-scroll-image
              data-section-index={i}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: i + 1 }}
            >
              {section.image ? (
                <Image
                  src={section.image}
                  alt=""
                  fill
                  className="object-cover"
                  style={{
                    objectPosition:
                      isMobile && section.mobileImagePosition
                        ? section.mobileImagePosition
                        : section.imagePosition ?? undefined,
                  }}
                  sizes="100vw"
                  priority={i < 2}
                  quality={85}
                />
              ) : i === 0 || i === 1 ? (
                i === 0 ? heroVideo : null
              ) : null}
            </div>
          ))}

          {/* Content overlays */}
          {sections.map((section, i) => (
            <div
              key={`content-${section.id}`}
              data-scroll-content
              data-section-index={i}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              style={{ zIndex: sections.length + i + 1 }}
            >
              {section.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
