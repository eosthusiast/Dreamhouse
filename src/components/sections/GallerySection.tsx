"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: "/images/gallery/surfer-girl.jpg",
    alt: "Surfer watching the waves",
    width: "40%",
    marginLeft: "auto",
    marginRight: "5%",
    rotate: "-2deg",
    marginTop: "0",
  },
  {
    src: "/images/gallery/dancing-light.jpg",
    alt: "Dancing indoors in golden light",
    width: "45%",
    marginLeft: "auto",
    marginRight: "auto",
    rotate: "1deg",
    marginTop: "-4rem",
  },
  {
    src: "/images/gallery/deck-guitar.jpg",
    alt: "Relaxing on deck chairs with guitar",
    width: "40%",
    marginLeft: "5%",
    marginRight: "auto",
    rotate: "-1deg",
    marginTop: "-3rem",
  },
  {
    src: "/images/gallery/meditation-circle.jpg",
    alt: "Meditation circle at sunset",
    width: "40%",
    marginLeft: "25%",
    marginRight: "auto",
    rotate: "1deg",
    marginTop: "-6rem",
  },
  {
    src: "/images/gallery/surfer-wave.jpg",
    alt: "Surfer riding a wave",
    width: "45%",
    marginLeft: "45%",
    marginRight: "auto",
    rotate: "-1deg",
    marginTop: "-4rem",
  },
  {
    src: "/images/gallery/links-gathering.jpg",
    alt: "Community gathering",
    width: "40%",
    marginLeft: "16%",
    marginRight: "auto",
    rotate: "2deg",
    marginTop: "-5rem",
  },
];

type GalleryImage = (typeof GALLERY_IMAGES)[number];

function GalleryGroup({
  images,
}: {
  images: GalleryImage[];
}) {
  const groupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!groupRef.current) return;

      const imgs = groupRef.current.querySelectorAll("[data-gallery-img]");

      imgs.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 60 + i * 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: groupRef }
  );

  return (
    <div ref={groupRef} style={{ maxWidth: "72rem", margin: "0 auto", padding: "2rem 1rem" }}>
      {images.map((img, i) => (
        <div
          key={i}
          data-gallery-img
          style={{
            position: "relative",
            width: img.width,
            aspectRatio: "4/3",
            overflow: "hidden",
            borderRadius: "0.125rem",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            marginLeft: img.marginLeft,
            marginRight: img.marginRight,
            marginTop: img.marginTop,
            transform: `rotate(${img.rotate})`,
            display: "block",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 60vw, 45vw"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="bg-cream relative z-10" style={{ padding: "4rem 0 6rem" }}>
      <div className="flex justify-center" style={{ marginBottom: "3rem" }}>
        <a
          href="/who"
          className="font-playfair italic text-lg md:text-xl tracking-wide transition-all duration-500 hover:shadow-lg"
          style={{
            padding: "1.05rem 3.6rem",
            background: "linear-gradient(135deg, #e8a87c 0%, #d4a0c0 50%, #b8a9c9 100%)",
            color: "rgba(255, 255, 255, 0.95)",
            borderRadius: "9999px",
            boxShadow: "0 4px 20px rgba(232, 168, 124, 0.25)",
          }}
        >
          I accept the invitation
        </a>
      </div>
      <GalleryGroup images={GALLERY_IMAGES} />
    </section>
  );
}
