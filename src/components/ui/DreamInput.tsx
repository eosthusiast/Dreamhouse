"use client";

import { useRef, useEffect, useState } from "react";

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  ctaText: string;
  autoFocus?: boolean;
  visible?: boolean;
}

export default function DreamInput({
  onSubmit,
  ctaText,
  autoFocus = false,
  visible = true,
}: DreamInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (autoFocus && visible && inputRef.current) {
      // Try to focus immediately, then retry a few times
      // (browsers may block focus during animations)
      inputRef.current.focus();
      const retries = [100, 300, 600, 1000];
      const timers = retries.map((delay) =>
        setTimeout(() => inputRef.current?.focus(), delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [autoFocus, visible]);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      handleSubmit();
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full max-w-xl mx-auto px-4"
      style={{ gap: "1.25rem", pointerEvents: visible ? "auto" : "none" }}
    >
      {/* Dream input — real visible input, styled to look minimal */}
      <div className="relative w-full max-w-sm">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type your dream"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          autoFocus={autoFocus && visible}
          placeholder=""
          className="
            w-full bg-transparent border-0 border-b border-turquoise/30
            text-center font-playfair italic font-bold text-2xl md:text-3xl
            text-turquoise placeholder:text-turquoise/20
            focus:outline-none focus:border-turquoise/60
            caret-turquoise py-2 transition-colors duration-300
          "
          style={{ caretColor: "#5CE0D2" }}
        />
        {/* Blinking cursor hint when empty */}
        {!value && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-turquoise/50 text-2xl md:text-3xl cursor-blink pointer-events-none font-playfair italic">
            |
          </span>
        )}
      </div>

      {/* CTA Button — matching the mockup: soft gradient pill */}
      <button
        onClick={handleSubmit}
        disabled={!value.trim()}
        className={`
          relative rounded-full
          font-playfair italic text-base md:text-lg tracking-wide
          transition-all duration-500 cursor-pointer
          ${
            value.trim()
              ? "opacity-100 hover:scale-[1.03] hover:shadow-lg hover:shadow-coral-start/20"
              : "opacity-30 cursor-not-allowed"
          }
        `}
        style={{
          padding: "1.05rem 3.6rem",
          background: "linear-gradient(135deg, #e8a87c 0%, #d4a0c0 50%, #b8a9c9 100%)",
          color: "rgba(255, 255, 255, 0.95)",
          boxShadow: value.trim()
            ? "0 4px 20px rgba(232, 168, 124, 0.25)"
            : "none",
        }}
      >
        <span className="relative z-10">{ctaText}</span>
      </button>
    </div>
  );
}
