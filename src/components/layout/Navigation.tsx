"use client";

import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "@/lib/constants";

interface NavigationProps {
  visible?: boolean;
  variant?: "dark" | "light";
}

export default function Navigation({ visible = true, variant = "dark" }: NavigationProps) {
  const isDark = variant === "dark";
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Reset hidden state when nav becomes visible
  useEffect(() => {
    if (visible) {
      setIsHidden(false);
    }
  }, [visible]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible
          ? isHidden
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-end py-4 md:py-6" style={{ paddingLeft: "2rem", paddingRight: "3rem" }}>
        {/* Nav items - desktop */}
        <ul className="hidden md:flex items-center gap-8 ml-auto">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`font-playfair italic text-sm lg:text-base transition-colors tracking-wider ${isDark ? "text-cream/80 hover:text-cream" : "text-galaxy-deep/70 hover:text-galaxy-deep"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden ml-auto p-2 ${isDark ? "text-cream" : "text-galaxy-deep"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-px ${isDark ? "bg-cream" : "bg-galaxy-deep"} transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-6 h-px ${isDark ? "bg-cream" : "bg-galaxy-deep"} transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px ${isDark ? "bg-cream" : "bg-galaxy-deep"} transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-galaxy-deep/95 flex items-center justify-center z-40">
          <ul className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`font-playfair italic text-2xl transition-colors ${isDark ? "text-cream/80 hover:text-cream" : "text-cream/80 hover:text-cream"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
