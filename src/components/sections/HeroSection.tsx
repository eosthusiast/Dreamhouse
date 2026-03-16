"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import DreamInput from "@/components/ui/DreamInput";

interface HeroSectionProps {
  onGateComplete: () => void;
  onScrollComplete?: () => void;
  skipGate?: boolean;
  isMobile?: boolean;
}

export default function HeroSection({ onGateComplete, onScrollComplete, skipGate, isMobile }: HeroSectionProps) {
  const [phase, setPhase] = useState<"loading" | "hero1" | "hero2" | "done">(
    "loading"
  );
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardShift, setKeyboardShift] = useState(0);
  const initialVpHeight = useRef(0);
  const hero1Ref = useRef<HTMLDivElement>(null);
  const hero2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLAnchorElement>(null);

  // Detect keyboard open/close on mobile, compute pixel-based shift
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    initialVpHeight.current = vv.height;
    const onResize = () => {
      const isOpen = vv.height < initialVpHeight.current * 0.75;
      setKeyboardOpen(isOpen);
      if (isOpen) {
        const kbHeight = initialVpHeight.current - vv.height;
        // Shift up by 30% of keyboard height — keeps input visible above keyboard
        setKeyboardShift(kbHeight > 100 ? Math.round(kbHeight * 0.45) : 0);
      } else {
        setKeyboardShift(0);
      }
    };
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  // Skip gate when navigating back from sub-pages (skipGate prop)
  useGSAP(() => {
    if (!skipGate) return;

    setPhase("done");
    // Hide hero content immediately
    if (hero1Ref.current) gsap.set(hero1Ref.current, { autoAlpha: 0 });
    if (hero2Ref.current) gsap.set(hero2Ref.current, { autoAlpha: 0 });
    onGateComplete();

    // Auto-scroll to just before the first text in the beach section
    requestAnimationFrame(() => {
      const baseSectionVhs = [530, 530, 325, 315, 330, 340, 315, 235];
      const mobile = window.innerWidth < 768;
      const sectionVhs = baseSectionVhs.map(v => mobile ? Math.round(v * 0.85) : v);
      const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const vh = viewportHeight / 100;
      const scrollRange = totalVh * vh - viewportHeight;
      // Target: 40vh into section 2 (text starts at 52vh, land just before)
      const section2StartVh = sectionVhs[0] + sectionVhs[1];
      const targetVh = section2StartVh + 40;
      const targetProgress = targetVh / totalVh;
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
    // Set hero2 initial hidden state via GSAP (single source of truth)
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
      // Focus the input after animation makes it visible
      const input = inputRef.current?.querySelector("input");
      input?.focus();
    });
  }, [skipGate]);

  const handleHero1Submit = useCallback((dream: string) => {
    if (!hero1Ref.current || !hero2Ref.current) return;

    // Blur hero1 input first to dismiss iOS keyboard cleanly
    const hero1Input = hero1Ref.current.querySelector("input");
    hero1Input?.blur();

    // Wait for keyboard to dismiss before transitioning
    setTimeout(() => {
      // Set phase early so DreamInput renders during the fade-in (no layout shift)
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
            // Safety: ensure inline styles match GSAP's final state
            if (hero2Ref.current) {
              hero2Ref.current.style.visibility = "visible";
              hero2Ref.current.style.opacity = "1";
            }
            // Focus hero2 input now that it's guaranteed visible
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
        const baseSectionVhs = [530, 530, 325, 315, 330, 340, 315, 235];
      const mobile = window.innerWidth < 768;
      const sectionVhs = baseSectionVhs.map(v => mobile ? Math.round(v * 0.85) : v);
        const totalVh = sectionVhs.reduce((a, b) => a + b, 0);
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const vh = viewportHeight / 100;
        const scrollRange = totalVh * vh - viewportHeight;
        // Target: 40vh into section 2 (beach at full opacity, just before text starts)
        const section2StartVh = sectionVhs[0] + sectionVhs[1];
        const targetVh = section2StartVh + 40;
        const targetProgress = targetVh / totalVh;
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
        style={{ transition: "transform 0.3s ease-out", transform: keyboardShift ? `translateY(-${keyboardShift}px)` : "none" }}
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

        {!keyboardOpen && (
          <a
            ref={skipRef}
            href="/?home"
            className="font-playfair italic text-xs tracking-wider absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{ color: "rgba(251, 240, 224, 0.55)" }}
          >
            done this before? skip ahead
          </a>
        )}
      </div>

      {/* Hero 2 Content (hidden initially) */}
      <div
        ref={hero2Ref}
        onClick={() => { hero2Ref.current?.querySelector("input")?.focus(); }}
        className="absolute inset-0 flex flex-col items-center justify-center h-full w-full px-6"
        style={{
          visibility: "hidden",
          opacity: 0,
          transition: "transform 0.3s ease-out",
          transform: keyboardShift ? `translateY(-${keyboardShift}px)` : "none",
        }}
      >
        <div className="text-center" style={{ marginBottom: "1.5rem", overflow: "hidden" }}>
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
    </>
  );
}
