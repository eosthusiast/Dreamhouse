"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ScrollCanvas from "@/components/scroll/ScrollCanvas";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import InspiredBySection from "@/components/sections/InspiredBySection";
import IntelligentSection from "@/components/sections/IntelligentSection";
import PortalSection from "@/components/sections/PortalSection";
import GallerySection from "@/components/sections/GallerySection";

import Navigation from "@/components/layout/Navigation";

export default function Home() {
  const [gateComplete, setGateComplete] = useState(false);
  const [navVariant, setNavVariant] = useState<"dark" | "light">("dark");
  const [canBlend, setCanBlend] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastActiveRef = useRef(-1);

  const galleryRef = useRef<HTMLDivElement>(null);
  const inGalleryRef = useRef(false);

  // Detect iOS Safari, configure video playback, set blend mode
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);

    // mix-blend-mode over <video> renders black on iOS Safari
    if (!isIOS) setCanBlend(true);

    const video = videoRef.current;
    if (!video) return;

    // Use smaller video on mobile (1MB vs 12MB)
    if (window.innerWidth < 768) {
      video.src = "/Dreamhouse/videos/hero-bg-2-mobile.mp4";
    }

    // Fix React muted attribute hydration bug — iOS checks DOM property, not attribute
    video.muted = true;

    // Programmatic play for iOS (autoPlay attribute alone is unreliable)
    const tryPlay = () => { video.play().catch(() => {}); };
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  // Sections with light backgrounds where nav needs dark text
  const LIGHT_SECTIONS = new Set([4]); // welcome

  const handleActiveSection = useCallback((index: number) => {
    if (inGalleryRef.current) return; // gallery overrides
    if (index === lastActiveRef.current) return;
    lastActiveRef.current = index;
    setNavVariant(LIGHT_SECTIONS.has(index) ? "light" : "dark");
  }, []);

  // Watch gallery section entering viewport
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inGalleryRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setNavVariant("light");
        } else {
          // Revert to whatever the scroll canvas section dictates
          setNavVariant(LIGHT_SECTIONS.has(lastActiveRef.current) ? "light" : "dark");
        }
      },
      { threshold: 0, rootMargin: "0px 0px -90% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleGateComplete = useCallback(() => {
    setGateComplete(true);
    // Unlock scroll via custom event (LenisProvider listens)
    window.dispatchEvent(new CustomEvent("dreamhouse:unlock-scroll"));
  }, []);

  const sections = [
    {
      id: "hero-1",
      image: null,
      content: <HeroSection onGateComplete={handleGateComplete} />,
    },
    {
      id: "hero-2",
      image: "/Dreamhouse/images/sections/beach-sunset.jpg",
      imagePosition: "center 33%",
      content: null, // Hero content handled internally by HeroSection
    },
    {
      id: "story-beach",
      image: "/Dreamhouse/images/sections/beach-sunset.jpg",
      imagePosition: "center 33%",
      content: <StorySection variant="beach" />,
    },
    {
      id: "story-ocean",
      image: "/Dreamhouse/images/sections/ocean-sparkle.jpg",
      mobileImagePosition: "20% 10%",
      content: <StorySection variant="ocean" />,
    },
    {
      id: "welcome",
      image: "/Dreamhouse/images/sections/welcome-silhouettes.jpg",
      imagePosition: "center 72%",
      content: <WelcomeSection />,
    },
    {
      id: "inspired",
      image: "/Dreamhouse/images/sections/inspired-dancing.jpg",
      content: <InspiredBySection />,
    },
    {
      id: "intelligent",
      image: "/Dreamhouse/images/sections/intelligent-ocean.jpg",
      content: <IntelligentSection />,
    },
    {
      id: "portal",
      image: "/Dreamhouse/images/sections/portal-waterfall.jpg",
      content: <PortalSection />,
      scrollVh: 100,
    },
  ];

  const heroVideo = useMemo(() => (
    <>
      <div className="absolute inset-0 w-full h-full" style={{ background: "#050a1a" }} />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/Dreamhouse/videos/hero-bg-2-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
      >
        {/* MP4 first — Safari can't play WebM and must skip to next source */}
        <source src="/Dreamhouse/videos/hero-bg-2.mp4" type="video/mp4" />
        <source src="/Dreamhouse/videos/hero-bg-2.webm" type="video/webm" />
      </video>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "rgba(88, 44, 131, 0.30)",
          // Only apply after confirming non-iOS — SSR ships without it
          // to prevent the black-rectangle bug (mix-blend-mode over <video> on iOS)
          ...(canBlend ? { mixBlendMode: "color" as const } : {}),
        }}
      />
    </>
  ), [canBlend]);

  return (
    <main>
      <Navigation visible={gateComplete} variant={navVariant} />

      <div id="scroll-canvas">
        <ScrollCanvas
          sections={sections}
          heroVideo={heroVideo}
          scrollPerSection={265}
          onActiveSection={handleActiveSection}
        />
      </div>

      <div ref={galleryRef}>
        <GallerySection />
      </div>

    </main>
  );
}
