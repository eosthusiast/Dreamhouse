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

  // 3-second delayed entrance animation
  useGSAP(() => {
    if (!headingRef.current || !inputRef.current) return;

    gsap.set(headingRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(inputRef.current, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline();

    tl.to(headingRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 1.8,
      ease: "power2.out",
      delay: 3,
    }).to(
      inputRef.current,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    tl.eventCallback("onComplete", () => {
      setPhase("hero1");
    });
  }, []);

  const handleHero1Submit = useCallback((dream: string) => {
    if (!hero1Ref.current || !hero2Ref.current) return;

    const tl = gsap.timeline();
    tl.to(hero1Ref.current, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }).fromTo(
      hero2Ref.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.3"
    );

    tl.eventCallback("onComplete", () => {
      setPhase("hero2");
    });

    if (typeof window !== "undefined") {
      sessionStorage.setItem("dream1", dream);
    }
  }, []);

  const handleHero2Submit = useCallback(
    (dream: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dream2", dream);
      }
      setPhase("done");
      onGateComplete();
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
        <div ref={headingRef} className="text-center mb-12">
          <Image
            src="/images/typography/dream-your-way-in.png"
            alt="Dream your way in"
            width={800}
            height={160}
            priority
            className="w-[85vw] max-w-[700px] md:max-w-[800px] h-auto mx-auto"
          />
        </div>

        <div ref={inputRef}>
          <DreamInput
            onSubmit={handleHero1Submit}
            ctaText="I dare to dream"
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
        <div className="text-center mb-12 max-w-4xl">
          <Image
            src="/images/typography/what-will-that-dream.png"
            alt="What would that dream dare to become with the right community by your side?"
            width={1200}
            height={400}
            className="w-[90vw] max-w-[900px] h-auto mx-auto"
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
