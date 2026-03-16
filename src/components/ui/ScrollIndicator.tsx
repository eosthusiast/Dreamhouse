"use client";

import { useEffect, useRef } from "react";

interface ScrollIndicatorProps {
  visible: boolean;
  onHide: () => void;
}

export default function ScrollIndicator({ visible, onHide }: ScrollIndicatorProps) {
  const startScrollY = useRef(0);

  useEffect(() => {
    if (!visible) return;
    startScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY.current) > 1600) {
        onHide();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-end"
      style={{
        pointerEvents: "none",
        width: "280px",
        height: "140px",
        paddingBottom: "2rem",
        background: "none",
      }}
    >
      <div className="flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="font-playfair italic text-sm tracking-widest" style={{ color: "rgba(255,255,255,0.8)" }}>
          scroll
        </span>
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
        >
          <path
            d="M1 1L10 10L19 1"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
