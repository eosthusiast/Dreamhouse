"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DreamInput from "@/components/ui/DreamInput";

interface HeroSectionProps {
  onGateComplete: () => void;
}

export default function HeroSection({ onGateComplete }: HeroSectionProps) {
  const [phase, setPhase] = useState<"loading" | "hero1" | "hero2" | "done">(
    "loading"
  );
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Skip gate if already completed this session
  useGSAP(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("dream1")) {
      setPhase("done");
      onGateComplete();
      return;
    }
  }, [onGateComplete]);

  // 3-second delayed entrance animation
  useGSAP(() => {
    if (!headingRef.current || !inputRef.current) return;

    gsap.set(headingRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(inputRef.current, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline();

    tl.to(headingRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 2.7,
      ease: "power2.out",
      delay: 3,
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
      // Focus the input after animation makes it visible
      const input = inputRef.current?.querySelector("input");
      input?.focus();
    });
  }, []);

  const handleHero1Submit = useCallback((dream: string) => {
    if (!hero1Ref.current || !hero2Ref.current) return;

    // Set phase early so DreamInput renders during the fade-in (no layout shift)
    setPhase("hero2");

    const tl = gsap.timeline();
    tl.to(hero1Ref.current, {
      autoAlpha: 0,
      duration: 1.5,
      ease: "power2.inOut",
    }).fromTo(
      hero2Ref.current,
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

    if (typeof window !== "undefined") {
      sessionStorage.setItem("dream1", dream);
      fetch("/Dreamhouse/api/dreams", {
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
        fetch("/Dreamhouse/api/dreams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dream }),
        }).catch(() => {});
      }
      // Disable input immediately but keep it rendered (no layout shift)
      setPhase("done");
      onGateComplete();

      // Animated transition: fade out hero2 content, then GSAP-scroll
      // through the dark→light crossfade to land on blank beach
      setTimeout(() => {
        const tl = gsap.timeline();

        // 1. Fade out hero2 content (slower, no snap)
        if (hero2Ref.current) {
          tl.to(hero2Ref.current, {
            autoAlpha: 0,
            duration: 1.2,
            ease: "power2.in",
          });
        }

        // 2. Animated scroll — drives the ScrollCanvas crossfade from galaxy to beach
        const N = 8;
        const scrollPerSectionVh = 265;
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const vh = viewportHeight / 100;
        const scrollRange = N * scrollPerSectionVh * vh - viewportHeight;
        // Target: 44% into section 2 — "You've felt it" visible, line about to start
        const targetProgress = (2 + 0.44) / N;
        const targetScroll = targetProgress * scrollRange;

        const scrollProxy = { y: window.scrollY };
        tl.to(scrollProxy, {
          y: targetScroll,
          duration: 3.5,
          ease: "power2.inOut",
          onUpdate: () => window.scrollTo(0, scrollProxy.y),
        }, "-=0.3");
      }, 400);
    },
    [onGateComplete]
  );

  return (
    <>
      {/* Hero 1 Content */}
      <div
        ref={hero1Ref}
        className="flex flex-col items-center justify-center h-full w-full px-4"
      >
        {/* Ornate PNG heading */}
        <div ref={headingRef} className="text-center" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
          <Image
            src="/Dreamhouse/images/typography/dream-your-way-in.png"
            alt="Dream your way in"
            width={800}
            height={160}
            priority
            className="w-[85vw] max-w-[700px] md:max-w-[800px] h-auto mx-auto"
            style={{ marginTop: "-18%", marginBottom: "-22%" }}
          />
        </div>

        <div ref={inputRef}>
          <DreamInput
            onSubmit={handleHero1Submit}
            ctaText="Submit your dream"
            autoFocus
            visible={phase === "hero1" || phase === "loading"}
          />
        </div>
      </div>

      {/* Hero 2 Content (hidden initially) */}
      <div
        ref={hero2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center h-full w-full px-6"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div className="text-center" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
          <Image
            src="/Dreamhouse/images/typography/what-will-that-dream.png"
            alt="What would that dream dare to become with the right community by your side?"
            width={1200}
            height={400}
            className="w-[90vw] max-w-[900px] h-auto mx-auto"
            style={{ marginTop: "-15%", marginBottom: "-18%" }}
          />
        </div>

        <DreamInput
          onSubmit={handleHero2Submit}
          ctaText="Show me what&rsquo;s possible"
          autoFocus={phase === "hero2"}
          visible={phase === "hero2"}
        />
      </div>
    </>
  );
}
