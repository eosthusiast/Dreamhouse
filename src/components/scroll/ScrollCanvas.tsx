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
  scrollPerSection = 225,
  onActiveSection,
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
          const activeIndex = Math.min(Math.floor(progress * N), N - 1);
          const sectionProgress = progress * N - activeIndex; // 0..1 within section

          onActiveSection?.(activeIndex);

          // --- Crossfade logic ---
          const FADE_ZONE = 0.25; // Normal crossfade for non-hero sections

          // Galaxy fade: slow dissolve from 50% of section 0 to 75% into section 2
          const galaxyFadeStart = (0 + 0.5) / N;
          const galaxyFadeEnd = (2 + 0.75) / N;

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
              blendMode = alpha > 0 ? "screen" : "normal";
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
              if (i === activeIndex) {
                alpha = sectionProgress < FADE_ZONE
                  ? smoothstep(sectionProgress / FADE_ZONE)
                  : 1.0;
              } else if (i === activeIndex - 1 && sectionProgress < FADE_ZONE) {
                alpha = 1.0 - smoothstep(sectionProgress / FADE_ZONE);
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
              // Beach section: text after galaxy fade; other sections: text after normal crossfade
              const textStart = i === 2 ? 0.30 : 0.10;
              const textSpan = i === 2 ? 0.55 : 0.70;
              const revealProgress = clamp(
                (sectionProgress - textStart) / textSpan,
                0,
                1
              );
              const M = reveals.length;

              // Each element gets an equal slice of the progress bar
              // Element j occupies [j/M, (j+1)/M] — fade in over the first 30% of its slice
              reveals.forEach((el, j) => {
                const sliceStart = j / M;
                const sliceEnd = (j + 0.3) / M; // fade in over 30% of its slice
                const elementAlpha = clamp(
                  (revealProgress - sliceStart) / (sliceEnd - sliceStart),
                  0,
                  1
                );
                gsap.set(el, {
                  autoAlpha: elementAlpha,
                  y: 12 * (1 - elementAlpha),
                });
              });
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
              const lineEnd = (i === 2 ? 0.35 : 0.15) + (i === 2 ? 0.50 : 0.65); // 0.80
              const afterLineSpan = 0.10;
              const revealProgress = clamp((sectionProgress - lineEnd) / afterLineSpan, 0, 1);
              const M = reveals.length;
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
              const lineStart = i === 2 ? 0.35 : 0.15;
              const lineSpan = i === 2 ? 0.50 : 0.65;
              const overallProgress = clamp(
                (sectionProgress - lineStart) / lineSpan,
                0,
                1
              );
              const L = lines.length;
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
                  // Fallback: if getTotalLength returned 0, use opacity only
                  gsap.set(el, { autoAlpha: lineProgress > 0 ? 1 : 0 });
                }
              });
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
    { scope: containerRef, dependencies: [scrollPerSection] }
  );

  const totalHeight = sections.length * scrollPerSection;

  return (
    <div
      ref={containerRef}
      style={{ height: `${totalHeight}vh` }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100lvh] w-full overflow-hidden"
        style={{ height: "100lvh" }}
      >
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
  );
}
