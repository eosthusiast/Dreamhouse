"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top before anything else (scroll restoration fix)
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis raf to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing for accurate Lenis sync
    gsap.ticker.lagSmoothing(0);

    // Only lock scroll on the homepage (hero gate)
    const isHomepage = pathname === "/";
    if (isHomepage) {
      lenis.stop();

      // iOS: overflow:hidden doesn't prevent touch scroll
      // Target only the scroll canvas container, not the whole page
      const scrollCanvas = document.getElementById("scroll-canvas");
      const preventTouch = (e: TouchEvent) => e.preventDefault();
      scrollCanvas?.addEventListener("touchmove", preventTouch, { passive: false });

      // Listen for unlock event from the dream gate
      const handleUnlock = () => {
        lenis.start();
        scrollCanvas?.removeEventListener("touchmove", preventTouch);
      };

      window.addEventListener("dreamhouse:unlock-scroll", handleUnlock);

      return () => {
        window.removeEventListener("dreamhouse:unlock-scroll", handleUnlock);
        scrollCanvas?.removeEventListener("touchmove", preventTouch);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
