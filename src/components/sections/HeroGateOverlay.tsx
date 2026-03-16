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
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const initialVpHeight = useRef(0);

  // Track visualViewport.height, offsetTop, AND keyboard state.
  // iOS shifts the visual viewport down when keyboard opens — offsetTop tracks this.
  // Keyboard detection enables compact layout for small viewports (iPhone SE etc).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const el = overlayRef.current;
    if (!el) return;
    initialVpHeight.current = vv.height;
    const update = () => {
      el.style.height = `${vv.height}px`;
      el.style.top = `${vv.offsetTop}px`;
      setKeyboardOpen(vv.height < initialVpHeight.current * 0.75);
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
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

      // Wait for keyboard to fully dismiss (~300ms iOS animation),
      // then start fade + scroll with correct viewport measurements
      setTimeout(() => {
        const tl = gsap.timeline();

        // 1. Fade out hero2 content
        if (hero2Ref.current) {
          tl.to(hero2Ref.current, {
            autoAlpha: 0,
            duration: 1.2,
            ease: "power2.in",
          });
        }

        // 2. After fade: compute scroll target (keyboard now dismissed, viewport correct)
        tl.call(() => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = "none";
          }

          const baseSectionVhs = [530, 530, 325, 315, 330, 340, 315, 235];
          const mobile = window.innerWidth < 768;
          const sectionVhs = baseSectionVhs.map((v) =>
            mobile ? Math.round(v * 0.85) : v
          );
          const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
          const viewportHeight =
            window.visualViewport?.height ?? window.innerHeight;
          const vh = viewportHeight / 100;
          const scrollRange = totalVh * vh - viewportHeight;
          const section2StartVh = sectionVhs[0] + sectionVhs[1];
          const targetVh = section2StartVh + 40;
          const targetProgress = targetVh / totalVh;
          const targetScroll = targetProgress * scrollRange;

          const scrollProxy = { y: window.scrollY };
          gsap.to(scrollProxy, {
            y: targetScroll,
            duration: 3.5,
            ease: "power2.inOut",
            onUpdate: () => window.scrollTo(0, scrollProxy.y),
            onComplete: () => {
              onScrollComplete?.();
              onDismiss();
            },
          });
        });
      }, 400);
    },
    [onGateComplete, onScrollComplete, onDismiss]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed left-0 right-0 z-[9999] flex flex-col items-center px-4"
      style={{
        top: 0,
        height: "100dvh",
        background: "transparent",
        pointerEvents: phase === "done" ? "none" : "auto",
        overscrollBehavior: "none",
        overflow: "hidden",
      }}
    >
      {/* Hero 1 Content — my-auto centers safely (no top-clipping on overflow) */}
      <div
        ref={hero1Ref}
        className="flex flex-col items-center w-full my-auto"
      >
        <div
          ref={headingRef}
          data-hero-heading
          className="text-center"
          style={{ marginBottom: keyboardOpen ? "0.75rem" : "1.5rem", overflow: "hidden" }}
        >
          <Image
            src="/images/typography/dream-your-way-in.png"
            alt="Dream your way in"
            width={800}
            height={160}
            priority
            className="h-auto mx-auto"
            style={{
              width: keyboardOpen ? "70vw" : "85vw",
              maxWidth: keyboardOpen ? "600px" : "800px",
              marginTop: keyboardOpen ? "-14%" : "-18%",
              marginBottom: keyboardOpen ? "-18%" : "-22%",
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
            compact={keyboardOpen}
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

      {/* Hero 2 Content (hidden initially by GSAP) */}
      {/* Uses my-auto wrapper for safe centering — prevents top-clipping
          that justify-center causes when content exceeds viewport height
          (e.g. iPhone SE with keyboard open). Content aligns to top when
          it overflows instead of clipping the heading. */}
      <div
        ref={hero2Ref}
        onClick={() => {
          hero2Ref.current?.querySelector("input")?.focus();
        }}
        className="absolute inset-0 flex flex-col items-center w-full px-4"
      >
        <div className="flex flex-col items-center w-full my-auto"
          style={{ padding: keyboardOpen ? "0.5rem 0" : "1rem 0" }}
        >
          <div
            className="text-center"
            style={{
              marginBottom: keyboardOpen ? "0.5rem" : "1.5rem",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/typography/how-can-others-support.png"
              alt="How can others support your dream?"
              width={1200}
              height={400}
              className="h-auto mx-auto"
              style={{
                width: keyboardOpen ? "65vw" : "90vw",
                maxWidth: "900px",
                marginTop: keyboardOpen ? "-10%" : "-15%",
                marginBottom: keyboardOpen ? "-12%" : "-18%",
              }}
            />
          </div>

          <DreamInput
            onSubmit={handleHero2Submit}
            ctaText="Show me what&rsquo;s possible"
            placeholder="imagine it here"
            autoFocus={phase === "hero2"}
            visible={phase === "hero2"}
            compact={keyboardOpen}
          />
        </div>
      </div>
    </div>
  );
}
