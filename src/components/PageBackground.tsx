"use client";

import { motion } from "motion/react";
import StarCanvas from "./StarCanvas";

export default function PageBackground() {
  return (
    <>
      {/* Animated blobs */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {[
          { color: "rgba(232,128,106,0.22)", top: "10%", left: "5%", size: 420 },
          { color: "rgba(232,184,75,0.18)", top: "40%", right: "8%", size: 350 },
          { color: "rgba(184,168,212,0.20)", top: "65%", left: "15%", size: 380 },
          { color: "rgba(140,184,154,0.18)", top: "85%", right: "5%", size: 300 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 20, -15, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.05, 0.97, 1],
            }}
            transition={{
              duration: 14 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
            style={{
              position: "absolute",
              top: b.top,
              left: "left" in b ? b.left : undefined,
              right: "right" in b ? b.right : undefined,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: b.color,
              filter: "blur(70px)",
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Star canvas */}
      <StarCanvas />
    </>
  );
}
