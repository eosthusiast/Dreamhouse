"use client";

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";

interface StorySectionProps {
  variant: "beach" | "ocean";
}

interface TextConfig {
  text: string;
  x: number;
  y: number;
  mobileX?: number;
  mobileY: number;
  align: "left" | "right";
  topAlign?: boolean;
}

const BEACH_TEXTS: TextConfig[] = [
  { text: "You\u2019ve felt it.", x: 6, y: 12, mobileY: 8, align: "left", topAlign: true },
  {
    text: "That version of yourself that\u2019s lit up, inspired, in love with being alive.",
    x: 25,
    y: 12,
    mobileY: 25,
    align: "left",
    topAlign: true,
  },
  { text: "When everything feels possible.", x: 78, y: 78, mobileX: 94, mobileY: 75, align: "right" },
];

const OCEAN_TEXTS: TextConfig[] = [
  {
    text: "Where dancing with your dreams is just a Tuesday\u2026",
    x: 10,
    y: 18,
    mobileY: 10,
    align: "left",
  },
  {
    text: "Where your dreams become reality on the same day you dream them.",
    x: 78,
    y: 68,
    mobileX: 94,
    mobileY: 65,
    align: "right",
  },
  { text: "What if that wasn\u2019t luck?", x: 78, y: 82, mobileX: 94, mobileY: 72, align: "right" },
];

const LINE_STYLE = {
  stroke: "rgba(251, 240, 224, 0.9)",
  strokeWidth: 1.8,
  fill: "none",
  strokeLinecap: "round" as const,
};

export default function StorySection({ variant }: StorySectionProps) {
  const texts = variant === "beach" ? BEACH_TEXTS : OCEAN_TEXTS;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const computePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const refs = textRefs.current;
    if (refs.some((r) => !r)) return;

    const containerRect = container.getBoundingClientRect();
    const mobile = containerRect.width < 768;
    setIsMobile(mobile);

    const rects = refs.map((r) => {
      const rect = r!.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: rect.top - containerRect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    });

    if (variant === "beach" && rects.length >= 3) {
      const newPaths: string[] = [];

      // Line 1: connects text 1 to text 2
      const gap = rects[1].left - rects[0].right;
      if (gap > 30) {
        // Desktop: horizontal line from right of text 1 to left of text 2
        const line1Y = rects[0].centerY;
        const line1StartX = rects[0].right + 12;
        const line1EndX = rects[1].left - 12;
        newPaths.push(`M ${line1StartX} ${line1Y} L ${line1EndX} ${line1Y}`);
      } else {
        // Mobile/narrow: vertical line from bottom-left of text 1 to top-left of text 2
        const startX = rects[0].left;
        const startY = rects[0].bottom + 8;
        const endX = rects[1].left;
        const endY = rects[1].top - 13;
        newPaths.push(`M ${startX} ${startY} L ${endX} ${endY}`);
      }

      // Line 2: curve from under text 2 to left edge of text 3
      // Desktop: bottom-center; Mobile: bottom-left, slightly lower
      const startX = mobile ? rects[1].left : rects[1].centerX;
      const startY = rects[1].bottom + (mobile ? 18 : 8);
      const endX = rects[2].left - 8;
      const endY = rects[2].centerY;
      // Control point: same x as start, same y as end — creates wide sweeping arc
      newPaths.push(`M ${startX} ${startY} Q ${startX} ${endY} ${endX} ${endY}`);

      setPaths(newPaths);
    } else if (variant === "ocean" && rects.length >= 3) {
      // S-curve from bottom-center of text 1 to top-left of text 2
      const startX = rects[0].centerX;
      const startY = rects[0].bottom + 12;
      const endX = mobile ? rects[1].centerX : rects[1].left - 12;
      const endY = rects[1].top - 12;

      // Cubic Bézier control points for S-shape
      // CP1: pull right and slightly down from start — first arc of the S
      const cp1x = startX + (endX - startX) * 0.15;
      const cp1y = startY + (endY - startY) * 0.55;
      // CP2: pull left and slightly up from end — second arc of the S
      const cp2x = endX - (endX - startX) * 0.15;
      const cp2y = startY + (endY - startY) * 0.45;

      const path = `M ${startX} ${startY} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`;
      setPaths([path]);
    }
  }, [variant]);

  // Compute synchronously before paint so ScrollCanvas can find the lines
  useLayoutEffect(() => {
    computePaths();
  }, [computePaths]);

  // Recompute on resize
  useEffect(() => {
    const observer = new ResizeObserver(() => computePaths());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [computePaths]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* SVG lines — dynamically positioned from text elements */}
      {paths.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
        >
          {paths.map((d, i) => (
            <path key={i} data-line d={d} {...LINE_STYLE} />
          ))}
        </svg>
      )}

      {/* Text anchors */}
      {texts.map((item, i) => (
        <div
          key={i}
          ref={(el) => { textRefs.current[i] = el; }}
          {...(variant === "ocean" && i >= 1 ? { "data-reveal-after-line": true } : { "data-reveal": true })}
          className={`absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl ${
            variant === "beach" && i === 1
              ? "max-w-[85%] md:max-w-md lg:max-w-lg"
              : variant === "ocean"
                ? "max-w-[75%] md:max-w-xs lg:max-w-sm"
                : i === texts.length - 1
                  ? "max-w-[70%] md:max-w-xs lg:max-w-sm"
                  : "max-w-[80%] md:max-w-xs lg:max-w-sm"
          }`}
          style={{
            ...(variant === "ocean" && item.align === "right"
              ? {
                  right: isMobile ? `${100 - (item.mobileX ?? item.x)}%` : `${100 - item.x}%`,
                  left: "auto",
                }
              : {
                  left: isMobile
                    ? (item.mobileX ? `${item.mobileX}%` : item.align === "right" ? `${item.x}%` : "6%")
                    : `${item.x}%`,
                }),
            top: isMobile ? `${item.mobileY}%` : `${item.y}%`,
            textAlign: item.align,
            transform: `translate(0, ${item.topAlign && !isMobile ? "0" : "-50%"})`,
            ...(variant === "ocean" ? { textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" } : {}),
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
