"use client";

import { useRef, useEffect, useState } from "react";

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  ctaText: string;
  placeholder?: string;
  autoFocus?: boolean;
  visible?: boolean;
  compact?: boolean;
}

export default function DreamInput({
  onSubmit,
  ctaText,
  placeholder = "share a dream of yours",
  autoFocus = false,
  visible = true,
  compact = false,
}: DreamInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    if (autoFocus && visible && inputRef.current) {
      // Try to focus immediately, then retry a few times
      // (browsers may block focus during animations)
      // Gate retries: only focus if element is actually visible in DOM
      inputRef.current.focus();
      const retries = [100, 300, 600, 1000];
      const timers = retries.map((delay) =>
        setTimeout(() => {
          if (visible && inputRef.current?.offsetParent !== null) {
            inputRef.current?.focus();
          }
        }, delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [autoFocus, visible]);

  const handleSubmit = () => {
    if (value.trim() && !submittedRef.current) {
      submittedRef.current = true;
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      handleSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 safe-area-bottom"
      style={{
        gap: compact ? "0.75rem" : "1.25rem",
        pointerEvents: visible ? "auto" : "none",
        transition: "gap 0.3s ease-out",
      }}
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      action="javascript:void(0)"
    >
      {/* Dream input — real visible input, styled to look minimal */}
      <div className="relative w-full max-w-full">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type your dream"
          inputMode="text"
          enterKeyHint="go"
          autoComplete="off"
          autoCapitalize="off"
          autoFocus={autoFocus && visible}
          placeholder={placeholder}
          className="
            w-full bg-transparent border-0 border-b border-turquoise/30
            text-center font-playfair italic font-bold text-sm md:text-3xl
            text-turquoise placeholder:text-[rgba(200,220,218,0.7)] placeholder:font-normal
            focus:outline-none focus:border-turquoise/60
            caret-turquoise py-2 transition-colors duration-300
          "
          style={{
            caretColor: "#5CE0D2",
            touchAction: "auto",
            userSelect: "text",
            WebkitUserSelect: "text",
          } as React.CSSProperties}
        />
        {/* Blinking cursor hint when empty */}
        {!value && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-turquoise/50 text-sm md:text-3xl cursor-blink pointer-events-none font-playfair italic">
            |
          </span>
        )}
      </div>

      {/* CTA Button — matching the mockup: soft gradient pill */}
      <button
        type="submit"
        disabled={!value.trim()}
        onPointerDown={(e) => {
          // Fire at contact — before iOS blurs input and shifts layout
          if (value.trim()) {
            e.preventDefault(); // prevent focus moving to button (keeps keyboard stable)
            handleSubmit();
            setTimeout(() => inputRef.current?.blur(), 50);
          }
        }}
        onClick={(e) => {
          // Fallback for keyboard Enter, accessibility, non-touch
          e.preventDefault();
          if (value.trim()) {
            handleSubmit();
            inputRef.current?.blur();
          }
        }}
        className={`
          relative rounded-full
          font-playfair italic text-sm md:text-lg tracking-wide
          transition-all duration-500 cursor-pointer
          ${
            value.trim()
              ? "hover:scale-[1.03] hover:shadow-lg hover:shadow-coral-start/20"
              : "cursor-not-allowed"
          }
        `}
        style={{
          padding: compact ? "0.7rem 2.4rem" : "1.05rem 3.6rem",
          transition: "padding 0.3s ease-out",
          background: value.trim()
            ? "linear-gradient(135deg, #e8a87c 0%, #d4a0c0 50%, #b8a9c9 100%)"
            : "rgba(255,255,255,0.12)",
          color: "rgba(255, 255, 255, 0.95)",
          border: value.trim() ? "none" : "1px solid rgba(255,255,255,0.2)",
          boxShadow: value.trim()
            ? "0 4px 20px rgba(232, 168, 124, 0.25)"
            : "none",
          touchAction: "manipulation",
        }}
      >
        <span className="relative z-10">{ctaText}</span>
      </button>
    </form>
  );
}
