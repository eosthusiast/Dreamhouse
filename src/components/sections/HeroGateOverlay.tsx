"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DreamInput from "@/components/ui/DreamInput";

interface HeroGateOverlayProps {
  onGateComplete: () => void;
  onScrollComplete?: () => void;
  isMobile?: boolean;
  onDismiss: () => void;
}

export default function HeroGateOverlay({
  onGateComplete,
  onScrollComplete,
  onDismiss,
}: HeroGateOverlayProps) {
  const [phase, setPhase] = useState<"loading" | "hero1" | "hero2" | "done">(
    "loading"
  );
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const initialVpHeight = useRef(0);

  const keyboardOpen = keyboardHeight > 0;

  // Track keyboard height via visualViewport for content positioning.
  // Instead of resizing the overlay (which creates a gap with the fixed backdrop),
  // we keep the overlay at fixed inset-0 and use padding to center content
  // above the keyboard. visualViewport.resize fires once at the end of the
  // keyboard animation — the CSS transition on padding-bottom smooths this.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    initialVpHeight.current = vv.height;
    const update = () => {
      const kbHeight = initialVpHeight.current - vv.height;
      setKeyboardHeight(kbHeight > 100 ? kbHeight : 0);
    };

    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);

    // iOS 17+ bug: visualViewport.offsetTop may not reset after keyboard dismiss.
    // Force a scroll reset on focusout to clear stale viewport state.
    const onFocusOut = () => {
      setTimeout(() => window.scrollBy(0, 0), 120);
    };
    document.addEventListener("focusout", onFocusOut);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Entrance animation: 2s delay, then heading + input fade in
  useGSAP(() => {
    if (!headingRef.current || !inputRef.current) return;

    gsap.set(headingRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(inputRef.current, { autoAlpha: 0, y: 10 });
    if (hero2Ref.current) gsap.set(hero2Ref.current, { autoAlpha: 0 });

    const tl = gsap.timeline();

    tl.to(headingRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 2.7,
      ease: "power2.out",
      delay: 2,
    }).to(
      inputRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=0.5"
    );

    tl.eventCallback("onComplete", () => {
      setPhase("hero1");
      const input = inputRef.current?.querySelector("input");
      input?.focus();
    });
  }, []);

  const handleHero1Submit = useCallback((dream: string) => {
    if (!hero1Ref.current || !hero2Ref.current) return;

    const hero1Input = hero1Ref.current.querySelector("input");
    hero1Input?.blur();

    setTimeout(() => {
      setPhase("hero2");

      const tl = gsap.timeline();
      tl.to(hero1Ref.current!, {
        autoAlpha: 0,
        duration: 1.5,
        ease: "power2.inOut",
      }).fromTo(
        hero2Ref.current!,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => {
            const input = hero2Ref.current?.querySelector("input");
            input?.focus();
          },
        },
        "-=1.2"
      );
    }, 300);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("dream1", dream);
      fetch("/api/dreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream }),
      }).catch(() => {});
    }
  }, []);

  const handleHero2Submit = useCallback(
    (dream: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dream2", dream);
        fetch("/api/dreams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dream }),
        }).catch(() => {});
      }

      setPhase("done");
      onGateComplete();

      // Blur input to dismiss keyboard BEFORE scroll calculation
      const input = hero2Ref.current?.querySelector("input");
      input?.blur();

      // Wait for keyboard to fully dismiss, then fade out and navigate
      // to /?home for a clean page state. The GSAP scroll animation causes
      // persistent horizontal scroll on iOS (keyboard compositing offset).
      // Navigating to /?home triggers the skip flow with a fresh page state.
      setTimeout(() => {
        const tl = gsap.timeline();

        if (hero2Ref.current) {
          tl.to(hero2Ref.current, {
            autoAlpha: 0,
            duration: 1.2,
            ease: "power2.in",
          });
        }

        tl.call(() => {
          window.location.href = "/?home";
        });
      }, 400);
    },
    [onGateComplete, onScrollComplete, onDismiss]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999]"
      style={{
        background: "transparent",
        pointerEvents: phase === "done" ? "none" : "auto",
        overscrollBehavior: "none",
        overflow: "hidden",
      }}
    >
      {/* Hero 1 Content — padding-bottom accounts for keyboard, centering content above it.
          Overlay stays fixed inset-0 (matching the backdrop) so no dark gap appears. */}
      <div
        ref={hero1Ref}
        className="flex flex-col items-center w-full h-full px-4"
        style={{
          paddingBottom: keyboardHeight,
          transition: "padding-bottom 0.15s ease-out",
        }}
      >
        <div className="flex flex-col items-center w-full my-auto">
          <div
            ref={headingRef}
            data-hero-heading
            className="text-center"
            style={{
              marginBottom: keyboardOpen ? 0 : "0.75rem",
              overflow: "hidden",
              height: keyboardOpen ? 0 : "auto",
              opacity: keyboardOpen ? 0 : 1,
              transition: "height 0.2s ease-out, opacity 0.2s ease-out, margin-bottom 0.2s ease-out",
            }}
          >
            <Image
              src="/images/typography/dream-your-way-in.png"
              alt="Dream your way in"
              width={800}
              height={160}
              priority
              className="h-auto mx-auto"
              style={{
                width: "70vw",
                maxWidth: "600px",
                marginTop: "-14%",
                marginBottom: "-18%",
              }}
            />
          </div>

          <div ref={inputRef} data-hero-input>
            <DreamInput
              onSubmit={handleHero1Submit}
              ctaText="Submit your dream"
              placeholder="share a dream of yours"
              autoFocus
              visible={phase === "hero1" || phase === "loading"}

            />
          </div>
        </div>

        {/* Skip link — hidden when keyboard open to save vertical space */}
        {phase !== "hero2" && phase !== "done" && !keyboardOpen && (
          <a
            href="/?home"
            className="font-playfair italic text-xs tracking-wider pb-8"
            style={{ color: "rgba(251, 240, 224, 0.55)" }}
          >
            done this before? skip ahead
          </a>
        )}
      </div>

      {/* Hero 2 Content (hidden initially by GSAP) */}
      <div
        ref={hero2Ref}
        onClick={() => {
          hero2Ref.current?.querySelector("input")?.focus();
        }}
        className="absolute inset-0 flex flex-col items-center w-full px-4"
        style={{
          paddingBottom: keyboardHeight,
          transition: "padding-bottom 0.15s ease-out",
        }}
      >
        <div className="flex flex-col items-center w-full my-auto"
          style={{ padding: "0.5rem 0" }}
        >
          <div
            className="text-center"
            style={{
              marginBottom: keyboardOpen ? 0 : "0.5rem",
              overflow: "hidden",
              height: keyboardOpen ? 0 : "auto",
              opacity: keyboardOpen ? 0 : 1,
              transition: "height 0.2s ease-out, opacity 0.2s ease-out, margin-bottom 0.2s ease-out",
            }}
          >
            <Image
              src="/images/typography/how-can-others-support.png"
              alt="How can others support your dream?"
              width={1200}
              height={400}
              className="h-auto mx-auto"
              style={{
                width: "65vw",
                maxWidth: "900px",
                marginTop: "-10%",
                marginBottom: "-12%",
              }}
            />
          </div>

          <DreamInput
            onSubmit={handleHero2Submit}
            ctaText="Show me what&rsquo;s possible"
            placeholder="imagine it here"
            autoFocus={phase === "hero2"}
            visible={phase === "hero2"}

          />
        </div>
      </div>
    </div>
  );
}
