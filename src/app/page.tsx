"use client";

import { useState, useCallback } from "react";
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
      image: "/Dreamhouse/images/sections/beach-sunset.png",
      content: null, // Hero content handled internally by HeroSection
    },
    {
      id: "story-beach",
      image: "/Dreamhouse/images/sections/beach-sunset.png",
      content: <StorySection variant="beach" />,
    },
    {
      id: "story-ocean",
      image: "/Dreamhouse/images/sections/ocean-sparkle.png",
      content: <StorySection variant="ocean" />,
    },
    {
      id: "welcome",
      image: "/Dreamhouse/images/sections/welcome-silhouettes.png",
      imagePosition: "center 72%",
      content: <WelcomeSection />,
    },
    {
      id: "inspired",
      image: "/Dreamhouse/images/sections/inspired-dancing.png",
      content: <InspiredBySection />,
    },
    {
      id: "intelligent",
      image: "/Dreamhouse/images/sections/intelligent-ocean.png",
      content: <IntelligentSection />,
    },
    {
      id: "portal",
      image: "/Dreamhouse/images/sections/portal-waterfall.png",
      content: <PortalSection />,
    },
  ];

  const heroVideo = (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/Dreamhouse/videos/galaxy-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/Dreamhouse/videos/hero-bg-2.webm" type="video/webm" />
      </video>
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: "rgba(88, 44, 131, 0.30)", mixBlendMode: "color" }}
      />
    </>
  );

  return (
    <main>
      <Navigation visible={gateComplete} />

      <div id="scroll-canvas">
        <ScrollCanvas
          sections={sections}
          heroVideo={heroVideo}
          scrollPerSection={225}
        />
      </div>

      <GallerySection />

    </main>
  );
}
