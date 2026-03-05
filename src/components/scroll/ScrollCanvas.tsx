"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSection {
  id: string;
  image: string | null;
  content: React.ReactNode;
}

interface ScrollCanvasProps {
  sections: ScrollSection[];
  heroVideo?: React.ReactNode;
  scrollPerSection?: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollCanvas({
  sections,
  heroVideo,
  scrollPerSection = 225,
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

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
      contents.forEach((contentEl) => {
        revealsPerSection.push(
          Array.from(contentEl.querySelectorAll<HTMLElement>("[data-reveal]"))
        );
      });

      // Set initial states — everything hidden except section 0
      images.forEach((img, i) => {
        gsap.set(img, { autoAlpha: i === 0 ? 1 : 0 });
      });
      contents.forEach((content, i) => {
        gsap.set(content, { autoAlpha: i === 0 ? 1 : 0 });
      });
      // Hide all reveal elements
      revealsPerSection.forEach((reveals) => {
        if (reveals.length > 0) {
          gsap.set(reveals, { autoAlpha: 0, y: 12 });
        }
      });

      // Single master ScrollTrigger drives everything
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const activeIndex = Math.min(Math.floor(progress * N), N - 1);
          const sectionProgress = progress * N - activeIndex; // 0..1 within section

          // --- Crossfade logic ---
          for (let i = 0; i < N; i++) {
            let alpha = 0;

            if (i === activeIndex) {
              // Active section: fade in during first 10%, fully visible rest
              alpha = sectionProgress < 0.1
                ? sectionProgress / 0.1
                : 1.0;
            } else if (i === activeIndex - 1 && sectionProgress < 0.1) {
              // Previous section lingering during fade-in of current
              alpha = 1.0 - sectionProgress / 0.1;
            }

            // First section starts fully visible at progress 0
            if (i === 0 && activeIndex === 0) {
              alpha = 1.0;
            }

            gsap.set(images[i], { autoAlpha: alpha });
            gsap.set(contents[i], { autoAlpha: alpha });
          }

          // --- Sequential text reveals ---
          for (let i = 0; i < N; i++) {
            const reveals = revealsPerSection[i];
            if (reveals.length === 0) continue;

            if (i === activeIndex) {
              // Reveal text from 5% to 60% of section (~135vh of 225vh), 90vh linger
              const revealProgress = clamp(
                (sectionProgress - 0.05) / 0.55,
                0,
                1
              );
              const M = reveals.length;

              reveals.forEach((el, j) => {
                const threshold = j / M;
                const elementAlpha = clamp(
                  (revealProgress - threshold) * M * 1.5,
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
        },
      });
    },
    { scope: containerRef, dependencies: [sections, scrollPerSection] }
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
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: i + 1 }}
          >
            {section.image ? (
              <Image
                src={section.image}
                alt=""
                fill
                className="object-cover"
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
