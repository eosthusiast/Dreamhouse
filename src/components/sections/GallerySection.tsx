"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_1 = [
  {
    src: "/Dreamhouse/images/gallery/waterfall-closeup.jpg",
    alt: "Waterfall closeup",
    width: "40%",
    marginLeft: "auto",
    marginRight: "5%",
    rotate: "-2deg",
    marginTop: "0",
  },
  {
    src: "/Dreamhouse/images/gallery/deck-chairs.png",
    alt: "Relaxing on deck chairs",
    width: "45%",
    marginLeft: "auto",
    marginRight: "auto",
    rotate: "1deg",
    marginTop: "-4rem",
  },
  {
    src: "/Dreamhouse/images/gallery/dancing-indoors.png",
    alt: "Dancing indoors",
    width: "40%",
    marginLeft: "5%",
    marginRight: "auto",
    rotate: "-1deg",
    marginTop: "-3rem",
  },
];

const GALLERY_2 = [
  {
    src: "/Dreamhouse/images/gallery/meditation-group.png",
    alt: "Group meditation",
    width: "40%",
    marginLeft: "5%",
    marginRight: "auto",
    rotate: "1deg",
    marginTop: "0",
  },
  {
    src: "/Dreamhouse/images/gallery/surfer.jpg",
    alt: "Surfer riding a wave",
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    rotate: "-1deg",
    marginTop: "-3rem",
  },
  {
    src: "/Dreamhouse/images/gallery/beach-woman.jpg",
    alt: "Woman watching the ocean",
    width: "40%",
    marginLeft: "auto",
    marginRight: "5%",
    rotate: "2deg",
    marginTop: "-4rem",
  },
];

type GalleryImage = (typeof GALLERY_1)[number];

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
      <GalleryGroup images={GALLERY_1} />
      <GalleryGroup images={GALLERY_2} />
    </section>
  );
}
