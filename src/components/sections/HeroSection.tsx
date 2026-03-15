"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DreamInput from "@/components/ui/DreamInput";

interface HeroSectionProps {
  onGateComplete: () => void;
  onScrollComplete?: () => void;
  skipGate?: boolean;
}

export default function HeroSection({ onGateComplete, onScrollComplete, skipGate }: HeroSectionProps) {
  const [phase, setPhase] = useState<"loading" | "hero1" | "hero2" | "done">(
    "loading"
  );
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);

  // Skip gate when navigating back from sub-pages (skipGate prop)
  useGSAP(() => {
    if (!skipGate) return;

    setPhase("done");
    // Hide hero content immediately
    if (hero1Ref.current) gsap.set(hero1Ref.current, { autoAlpha: 0 });
    if (hero2Ref.current) gsap.set(hero2Ref.current, { autoAlpha: 0 });
    onGateComplete();

    // Auto-scroll to the beach section so user doesn't land on empty hero
    requestAnimationFrame(() => {
      const sectionVhs = [530, 530, 530, 530, 530, 530, 530, 100];
      const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const vh = viewportHeight / 100;
      const scrollRange = totalVh * vh - viewportHeight;
      const section2Start = (sectionVhs[0] + sectionVhs[1]) / totalVh;
      const section2Width = sectionVhs[2] / totalVh;
      const targetProgress = section2Start + 0.20 * section2Width;
      const targetScroll = targetProgress * scrollRange;
      window.scrollTo(0, targetScroll);
      onScrollComplete?.();
    });
  }, [skipGate, onGateComplete, onScrollComplete]);

  // 3-second delayed entrance animation (only if gate not skipped)
  useGSAP(() => {
    if (!headingRef.current || !inputRef.current) return;
    if (skipGate) return;

    gsap.set(headingRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(inputRef.current, { autoAlpha: 0, y: 10 });

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
      // Focus the input after animation makes it visible
      const input = inputRef.current?.querySelector("input");
      input?.focus();
    });
  }, [skipGate]);

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
        const sectionVhs = [530, 530, 530, 530, 530, 530, 530, 100];
        const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const vh = viewportHeight / 100;
        const scrollRange = totalVh * vh - viewportHeight;
        const section2Start = (sectionVhs[0] + sectionVhs[1]) / totalVh;
        const section2Width = sectionVhs[2] / totalVh;
        const targetProgress = section2Start + 0.20 * section2Width;
        const targetScroll = targetProgress * scrollRange;

        const scrollProxy = { y: window.scrollY };
        tl.to(scrollProxy, {
          y: targetScroll,
          duration: 3.5,
          ease: "power2.inOut",
          onUpdate: () => window.scrollTo(0, scrollProxy.y),
          onComplete: () => onScrollComplete?.(),
        }, "-=0.3");
      }, 400);
    },
    [onGateComplete, onScrollComplete]
  );

  return (
    <>
      {/* Hero 1 Content */}
      <div
        ref={hero1Ref}
        className="flex flex-col items-center justify-center h-full w-full px-4"
      >
        {/* Ornate PNG heading */}
        <div ref={headingRef} data-hero-heading className="text-center" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
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

        <a
          ref={skipRef}
          href="/?home"
          className="font-playfair italic text-xs tracking-wider absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: "rgba(251, 240, 224, 0.55)" }}
        >
          done this before? skip ahead
        </a>
      </div>

      {/* Hero 2 Content (hidden initially) */}
      <div
        ref={hero2Ref}
        className="absolute inset-0 flex flex-col items-center justify-center h-full w-full px-6"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div className="text-center" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
          <Image
            src="/images/typography/what-will-that-dream.png"
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
          placeholder="imagine it here"
          autoFocus={phase === "hero2"}
          visible={phase === "hero2"}
        />
      </div>
    </>
  );
}
