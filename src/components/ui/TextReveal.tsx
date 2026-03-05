"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  splitBy?: "word" | "line";
  stagger?: number;
  scrollTrigger?: {
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  };
  delay?: number;
}

export default function TextReveal({
  children,
  as: Tag = "div",
  className = "",
  splitBy = "word",
  stagger = 0.05,
  scrollTrigger: stConfig,
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll("[data-reveal]");
      if (!elements.length) return;

      gsap.set(elements, { y: "100%", autoAlpha: 0 });

      const animConfig: gsap.TweenVars = {
        y: "0%",
        autoAlpha: 1,
        duration: 0.8,
        stagger,
        ease: "power3.out",
        delay,
      };

      if (stConfig) {
        gsap.to(elements, {
          ...animConfig,
          scrollTrigger: {
            trigger: stConfig.trigger || containerRef.current,
            start: stConfig.start || "top 80%",
            end: stConfig.end || "bottom 20%",
            scrub: stConfig.scrub ?? false,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.to(elements, animConfig);
      }
    },
    { scope: containerRef, dependencies: [children, stConfig] }
  );

  const words = children.split(splitBy === "line" ? "\n" : " ");

  return (
    <Tag ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span data-reveal className="inline-block">
            {word}
            {splitBy === "word" && i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
