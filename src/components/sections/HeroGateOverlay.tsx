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
  const overlayRef = useRef<HTMLDivElement>(null);
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Track visualViewport.height for iOS keyboard/toolbar — the key simplification.
  // When keyboard opens, visualViewport.height shrinks, overlay shrinks,
  // justify-center re-centers content above keyboard. No shift math needed.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const el = overlayRef.current;
    if (!el) return;
    const update = () => {
      el.style.height = `${vv.height}px`;
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

      setTimeout(() => {
        const tl = gsap.timeline();

        // Fade out hero2 content
        if (hero2Ref.current) {
          tl.to(hero2Ref.current, {
            autoAlpha: 0,
            duration: 1.2,
            ease: "power2.in",
          });
        }

        // Allow pointer events through to ScrollCanvas during scroll animation
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
        }

        // Animated scroll — drives the ScrollCanvas crossfade from galaxy to beach
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
        tl.to(
          scrollProxy,
          {
            y: targetScroll,
            duration: 3.5,
            ease: "power2.inOut",
            onUpdate: () => window.scrollTo(0, scrollProxy.y),
            onComplete: () => {
              onScrollComplete?.();
              onDismiss();
            },
          },
          "-=0.3"
        );
      }, 400);
    },
    [onGateComplete, onScrollComplete, onDismiss]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4"
      style={{
        height: "100dvh",
        background: "transparent",
        pointerEvents: phase === "done" ? "none" : "auto",
        overscrollBehavior: "none",
      }}
    >
      {/* Hero 1 Content */}
      <div
        ref={hero1Ref}
        className="flex flex-col items-center justify-center w-full"
      >
        <div
          ref={headingRef}
          data-hero-heading
          className="text-center"
          style={{ marginBottom: "1.5rem", overflow: "hidden" }}
        >
          <Image
            src="/images/typography/dream-your-way-in.png"
            alt="Dream your way in"
            width={800}
            height={160}
            priority
            className="w-[85vw] max-w-[700px] md:max-w-[800px] h-auto mx-auto"
            style={{ marginTop: "-18%", marginBottom: "-22%" }}
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

      {/* Skip link — in flex flow, pushed to bottom naturally */}
      {phase !== "hero2" && phase !== "done" && (
        <a
          href="/?home"
          className="font-playfair italic text-xs tracking-wider mt-auto pb-8"
          style={{ color: "rgba(251, 240, 224, 0.55)" }}
        >
          done this before? skip ahead
        </a>
      )}

      {/* Hero 2 Content (hidden initially by GSAP) */}
      <div
        ref={hero2Ref}
        onClick={() => {
          hero2Ref.current?.querySelector("input")?.focus();
        }}
        className="absolute inset-0 flex flex-col items-center justify-center w-full px-6"
      >
        <div
          className="text-center"
          style={{ marginBottom: "1.5rem", overflow: "hidden" }}
        >
          <Image
            src="/images/typography/how-can-others-support.png"
            alt="How can others support your dream?"
            width={1200}
            height={400}
            className="w-[90vw] max-w-[900px] h-auto mx-auto"
            style={{ marginTop: "-15%", marginBottom: "-18%" }}
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
  );
}
