"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

interface TextConfig {
  text: string;
  x: number;
  y: number;
  mobileX?: number;
  mobileY: number;
  align: "left" | "right";
  topAlign?: boolean;
  maxWidth: string;
}

const TEXTS: TextConfig[] = [
  {
    text: "For those that feel the need for a more intelligent way to live",
    x: 15,
    y: 30,
    mobileY: 12,
    align: "left",
    topAlign: true,
    maxWidth: "28rem",
  },
  {
    text: "in connection with nature, ourselves and each other.",
    x: 82,
    y: 63,
    mobileX: 94,
    mobileY: 56,
    align: "right",
    maxWidth: "24rem",
  },
  {
    text: "Fertile soil for the truest version of yourself to play.",
    x: 82,
    y: 75,
    mobileX: 94,
    mobileY: 76,
    align: "right",
    maxWidth: "22rem",
  },
];

const LINE_STYLE = {
  stroke: "rgba(251, 240, 224, 0.4)",
  strokeWidth: 1.5,
  fill: "none",
  strokeLinecap: "round" as const,
};

export default function IntelligentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [path, setPath] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  const computePath = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const refs = textRefs.current;
    if (refs.some((r) => !r)) return;

    const containerRect = container.getBoundingClientRect();
    const mobile = containerRect.width < 768;
    setIsMobile(mobile);

    // Temporarily reset GSAP y to 0 so getBoundingClientRect reflects true position.
    // This avoids stale GSAP cache issues on mobile after React re-renders.
    const savedY = refs.map(r => Number(gsap.getProperty(r!, "y")) || 0);
    refs.forEach(r => gsap.set(r!, { y: 0 }));

    const rects = refs.map((r) => {
      const rect = r!.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: rect.top - containerRect.top + rect.height / 2,
      };
    });

    refs.forEach((r, i) => gsap.set(r!, { y: savedY[i] }));

    if (rects.length >= 2) {
      // S-curve from bottom-center of block 0 to above block 1 (identical to ocean StorySection)
      const startX = mobile ? rects[0].left : rects[0].centerX;
      const startY = rects[0].bottom + 12;
      const endX = mobile ? rects[1].centerX : rects[1].left - 12;
      const endY = rects[1].top - 12;

      const cp1x = startX + (endX - startX) * 0.15;
      const cp1y = startY + (endY - startY) * 0.55;
      const cp2x = endX - (endX - startX) * 0.15;
      const cp2y = startY + (endY - startY) * 0.45;

      setPath(`M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`);
    }
  }, []);

  // Wait for fonts to load before measuring
  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      document.body.offsetHeight; // force layout flush so font metrics are applied
      if (live) computePath();
    });
    return () => { live = false; };
  }, [computePath]);

  // Re-compute path after isMobile state change triggers re-render
  useEffect(() => {
    computePath();
  }, [isMobile, computePath]);

  useEffect(() => {
    const observer = new ResizeObserver(() => computePath());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [computePath]);

  return (
    <div className="relative w-full h-full">
      {/* Purple-golden gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(120, 60, 120, 0.35), rgba(180, 120, 60, 0.25))",
          mixBlendMode: "overlay",
        }}
      />

      <div ref={containerRef} className="relative z-20 w-full h-full">
        {path && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
          >
            <path data-line d={path} {...LINE_STYLE} />
          </svg>
        )}

        {TEXTS.map((item, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            {...(i === 0 ? { "data-reveal": true } : { "data-reveal-after-line": true })}
            className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl"
            style={{
              ...(item.align === "right"
                ? {
                    right: isMobile
                      ? `${100 - (item.mobileX ?? item.x)}%`
                      : `${100 - item.x}%`,
                    left: "auto",
                  }
                : {
                    left: isMobile ? "8%" : `${item.x}%`,
                  }),
              top: isMobile ? `${item.mobileY}%` : `${item.y}%`,
              maxWidth: isMobile ? "85%" : item.maxWidth,
              textAlign: item.align,
              transform: `translate(0, ${item.topAlign && !isMobile ? "0" : "-50%"})`,
              textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
