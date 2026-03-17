"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import ScrollCanvas from "@/components/scroll/ScrollCanvas";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import InspiredBySection from "@/components/sections/InspiredBySection";
import IntelligentSection from "@/components/sections/IntelligentSection";
import PortalSection from "@/components/sections/PortalSection";
import GallerySection from "@/components/sections/GallerySection";

import HeroGateOverlay from "@/components/sections/HeroGateOverlay";
import Navigation from "@/components/layout/Navigation";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Home() {
  const [gateComplete, setGateComplete] = useState(false);
  const [navVariant, setNavVariant] = useState<"dark" | "light">("dark");
  const [canBlend, setCanBlend] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [skipGate, setSkipGate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [overlayDone, setOverlayDone] = useState(false);
  const [galaxyBackdropVisible, setGalaxyBackdropVisible] = useState(false);
  const [backdropImage, setBackdropImage] = useState<"galaxy" | "beach">("galaxy");
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropVideoRef = useRef<HTMLVideoElement>(null);
  const lastActiveRef = useRef(-1);

  const galleryRef = useRef<HTMLDivElement>(null);
  const inGalleryRef = useRef(false);

  // Detect iOS Safari, configure video playback, set blend mode
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);

    // mix-blend-mode over <video> renders black on iOS Safari
    if (!isIOSDevice) setCanBlend(true);
    setIsIOS(isIOSDevice);

    // On iOS (non-skip), show fullscreen galaxy backdrop during gate
    const params = new URLSearchParams(window.location.search);
    if (isIOSDevice && !params.has("home")) {
      setGalaxyBackdropVisible(true);
    } else if (isIOSDevice && params.has("home")) {
      // Show beach backdrop during /?home skip — covers the black gap
      // before GSAP initializes and reveals sections
      setGalaxyBackdropVisible(true);
      setBackdropImage("beach");
    }

    // Configure ScrollCanvas hero video
    const video = videoRef.current;
    const tryPlayVideo = video ? () => { video.play().catch(() => {}); } : null;
    if (video && tryPlayVideo) {
      video.muted = true;
      tryPlayVideo();
      video.addEventListener("canplay", tryPlayVideo, { once: true });
    }

    return () => {
      if (video && tryPlayVideo) video.removeEventListener("canplay", tryPlayVideo);
    };
  }, []);

  // Configure backdrop video playback when it mounts (iOS gate only)
  useEffect(() => {
    const bdVideo = backdropVideoRef.current;
    if (!bdVideo) return;
    bdVideo.muted = true;
    const tryPlay = () => { bdVideo.play().catch(() => {}); };
    tryPlay();
    bdVideo.addEventListener("canplay", tryPlay, { once: true });
    return () => bdVideo.removeEventListener("canplay", tryPlay);
  }, [galaxyBackdropVisible]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Detect ?home query param — skip gate and clean URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("home")) {
      setSkipGate(true);
      // Clean the URL so a reload shows the gate again
      history.replaceState(null, "", window.location.pathname);

      // Clean up beach backdrop after first scroll (toolbar auto-hides, gap gone)
      const onScroll = () => {
        setGalaxyBackdropVisible(false);
        window.removeEventListener("scroll", onScroll);
      };
      // Delay listener so the auto-scroll to beach doesn't trigger it
      setTimeout(() => {
        window.addEventListener("scroll", onScroll, { once: true, passive: true });
      }, 500);
      // Safety fallback
      setTimeout(() => {
        setGalaxyBackdropVisible(false);
      }, 3000);
    }
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

  const handleScrollComplete = useCallback(() => {
    setShowScrollHint(true);
  }, []);

  // Overlay dismissal: swap backdrop from galaxy to beach image, then drop
  // behind ScrollCanvas. The beach image fills the toolbar gap (matching the
  // visible section) instead of showing galaxy or black. Programmatic scrollTo()
  // doesn't trigger iOS toolbar auto-hide, so the backdrop stays until the user
  // scrolls manually (which hides the toolbar, eliminating the gap).
  const handleOverlayDismiss = useCallback(() => {
    setOverlayDone(true);
    // Swap galaxy video to beach image — matches the section we landed on
    setBackdropImage("beach");

    const backdrop = document.querySelector("[data-galaxy-backdrop]") as HTMLElement;
    if (backdrop) {
      // Drop behind ScrollCanvas — fills toolbar gap but invisible behind content
      backdrop.style.zIndex = "-1";

      // Unmount after first user scroll (toolbar will have auto-hidden)
      const cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        setGalaxyBackdropVisible(false);
      };
      const onScroll = () => cleanup();
      setTimeout(() => {
        window.addEventListener("scroll", onScroll, { once: true, passive: true });
      }, 100);
      // Safety fallback: unmount after 8s
      setTimeout(() => cleanup(), 3000);
    } else {
      setGalaxyBackdropVisible(false);
    }
  }, []);

  // On iOS (non-skip), overlay handles gate — section 0 content is empty
  const showOverlay = isIOS && !skipGate && !overlayDone;

  const sections = [
    {
      id: "hero-1",
      image: null,
      // On iOS non-skip: always null — HeroGateOverlay handles the gate.
      // Without this guard, overlayDone=true flips showOverlay to false,
      // which would render HeroSection mid-crossfade (ghosted PNG/input/button).
      content: (isIOS && !skipGate)
        ? null
        : <HeroSection onGateComplete={handleGateComplete} onScrollComplete={handleScrollComplete} skipGate={skipGate} isMobile={isMobile} />,
    },
    {
      id: "hero-2",
      image: "/images/sections/beach-sunset.jpg",
      imagePosition: "center 33%",
      content: null, // Hero content handled internally by HeroSection
    },
    {
      id: "story-beach",
      image: "/images/sections/beach-sunset.jpg",
      imagePosition: "center 33%",
      content: <StorySection variant="beach" />,
      scrollVh: 325,
    },
    {
      id: "story-ocean",
      image: "/images/sections/ocean-sparkle.jpg",
      mobileImagePosition: "20% 10%",
      content: <StorySection variant="ocean" />,
      scrollVh: 315,
    },
    {
      id: "welcome",
      image: "/images/sections/welcome-silhouettes.jpg",
      imagePosition: "center 72%",
      content: <WelcomeSection />,
      scrollVh: 330,
    },
    {
      id: "inspired",
      image: "/images/sections/inspired-dancing.jpg",
      mobileImagePosition: "40% 35%",
      content: <InspiredBySection />,
      scrollVh: 340,
    },
    {
      id: "intelligent",
      image: "/images/sections/intelligent-ocean.jpg",
      content: <IntelligentSection />,
      scrollVh: 315,
    },
    {
      id: "portal",
      image: "/images/sections/portal-waterfall.jpg",
      content: <PortalSection />,
      scrollVh: 235,
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
        poster="/videos/hero-bg-2-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
      >
        {/* MP4 first — Safari can't play WebM and must skip to next source */}
        <source src="/videos/hero-bg-2.mp4" type="video/mp4" />
        <source src="/videos/hero-bg-2.webm" type="video/webm" />
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
      <ScrollIndicator visible={showScrollHint} onHide={() => setShowScrollHint(false)} />

      {/* iOS backdrop: position:fixed covers full screen including behind Safari toolbar.
          During gate: galaxy video. After gate: beach image (matches visible section).
          Fills the toolbar gap that visualViewport.height causes on the sticky ScrollCanvas. */}
      {galaxyBackdropVisible && (
        <div
          className="fixed inset-0"
          style={{ pointerEvents: "none", zIndex: skipGate ? -1 : 9998 }}
          data-galaxy-backdrop
        >
          {backdropImage === "galaxy" ? (
            <>
              <div className="absolute inset-0" style={{ background: "#050a1a" }} />
              <video
                ref={backdropVideoRef}
                autoPlay
                loop
                muted
                playsInline
                poster="/videos/hero-bg-2-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
                onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
              >
                <source src="/videos/hero-bg-2.mp4" type="video/mp4" />
                <source src="/videos/hero-bg-2.webm" type="video/webm" />
              </video>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(88, 44, 131, 0.30)" }}
              />
            </>
          ) : (
            <Image
              src="/images/sections/beach-sunset.jpg"
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: "center 33%" }}
              sizes="100vw"
            />
          )}
        </div>
      )}

      <div id="scroll-canvas" className="relative z-[1]">
        <ScrollCanvas
          sections={sections}
          heroVideo={heroVideo}
          scrollPerSection={530}
          onActiveSection={handleActiveSection}
        />
      </div>

      {showOverlay && (
        <HeroGateOverlay
          onGateComplete={handleGateComplete}
          onScrollComplete={handleScrollComplete}
          isMobile={isMobile}
          onDismiss={handleOverlayDismiss}
        />
      )}

      <div ref={galleryRef}>
        <GallerySection />
      </div>

    </main>
  );
}
