"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

const PALETTE = [
  "rgb(232, 184, 75)",
  "rgb(245, 168, 130)",
  "rgb(184, 168, 212)",
  "rgb(158, 200, 224)",
  "rgb(140, 184, 154)",
  "rgb(240, 192, 96)",
];

interface StarData {
  x: string;
  y: string;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  driftDuration: number;
  twinkleDuration: number;
  twinkleDelay: number;
  driftDelay: number;
}

export default function StarCanvas() {
  const stars = useMemo<StarData[]>(() => {
    // Generate deterministic-looking but random stars at mount
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 40;
    return Array.from({ length: count }, () => {
      const driftAmp = Math.random() * 12 + 4; // 4-16px drift
      const driftSpeed = Math.random() * 8 + 12; // 12-20s cycle
      return {
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 5, // 5-15px font size
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        driftX: driftAmp,
        driftY: driftAmp * (0.5 + Math.random() * 0.5),
        driftDuration: driftSpeed,
        twinkleDuration: Math.random() * 3 + 3, // 3-6s twinkle
        twinkleDelay: Math.random() * -6, // stagger start
        driftDelay: Math.random() * -20, // stagger drift
      };
    });
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {stars.map((s, i) => (
        <motion.span
          key={i}
          animate={{
            x: [0, s.driftX, -s.driftX * 0.5, 0],
            y: [0, -s.driftY, s.driftY * 0.7, 0],
            opacity: [0, 0.85, 0.15, 0.7, 0],
          }}
          transition={{
            x: {
              duration: s.driftDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.driftDelay,
            },
            y: {
              duration: s.driftDuration * 1.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.driftDelay,
            },
            opacity: {
              duration: s.twinkleDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.twinkleDelay,
            },
          }}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            fontSize: s.size,
            color: s.color,
            lineHeight: 1,
            willChange: "transform, opacity",
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
