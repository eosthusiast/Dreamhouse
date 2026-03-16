"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/layout/Navigation";
import PageBackground from "@/components/PageBackground";
import { Fraunces, Nunito, Playfair_Display } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const PHASE_COLORS = ["#e8806a", "#e8b84b", "#8cb89a", "#b8a8d4"];

const SLIDER_TIERS = [
  { value: 3000,  label: "€3,000",  name: "covering costs",                                        accent: PHASE_COLORS[0] },
  { value: 5000,  label: "€5,000",  name: "covering true costs of 1 person",                       accent: PHASE_COLORS[1] },
  { value: 8000,  label: "€8,000",  name: "supporting others in experiencing this",                 accent: PHASE_COLORS[2] },
  { value: 9000, label: "€9,000", name: "you want Caro to get paid something for creating this",  accent: PHASE_COLORS[3] },
];

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,6,4,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          maxWidth: "min(90vw, 1200px)",
          maxHeight: "90vh",
          width: "100%",
          height: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </motion.div>
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "rgba(253,248,240,0.7)",
          fontSize: "2rem",
          cursor: "pointer",
          lineHeight: 1,
          padding: "0.25rem",
        }}
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  );
}

function DreamDuesSlider() {
  const [sliderVal, setSliderVal] = useState(5000);

  const tier = SLIDER_TIERS.reduce((prev, curr) =>
    Math.abs(curr.value - sliderVal) < Math.abs(prev.value - sliderVal) ? curr : prev
  );

  const pct = ((sliderVal - 3000) / (9000 - 3000)) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: "3rem" }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-nunito)",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--coral)",
          textAlign: "center",
          marginBottom: "1.25rem",
          opacity: 0.85,
        }}
      >
        Dream Dues
      </p>

      {/* Heading */}
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.08rem, 2.21vw, 1.72rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          color: "var(--text-dark)",
          textAlign: "center",
          marginBottom: "1.75rem",
        }}
      >
        Choose what
        <br />
        you can{" "}
        <em style={{ color: "var(--coral)", fontStyle: "italic" }}>give</em>
      </h2>

      {/* Intro */}
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          lineHeight: 1.85,
          color: "var(--text-mid)",
          textAlign: "center",
          maxWidth: "560px",
          margin: "0 auto 1.25rem",
        }}
      >
        Most people spend €4–6k on a single transformational week. Dream
        House is a month. Not-for-profit by design. Everything is included
        from the moment you arrive — your private room, meals, and every
        community experience.
      </p>

      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          lineHeight: 1.85,
          color: "var(--text-mid)",
          textAlign: "center",
          maxWidth: "560px",
          margin: "0 auto 1.25rem",
        }}
      >
        We offer a sliding scale: those who pay more help cover the true cost
        of running the residency and fund financial aid making this genuinely
        available to everyone who&apos;s meant to be here.
      </p>

      {/* Slider */}
      <div style={{ maxWidth: "560px", margin: "0 auto 2rem" }}>
        <style>{`
          .dh-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              to right,
              #e8806a ${pct}%,
              rgba(35,24,16,0.15) ${pct}%
            );
            outline: none;
            cursor: pointer;
          }
          .dh-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #fdf8f0;
            border: 2px solid #e8806a;
            box-shadow: 0 2px 12px rgba(232,128,106,0.35);
            cursor: pointer;
            transition: box-shadow 0.15s;
          }
          .dh-slider::-webkit-slider-thumb:hover {
            box-shadow: 0 2px 18px rgba(232,128,106,0.55);
          }
          .dh-slider::-moz-range-thumb {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #fdf8f0;
            border: 2px solid #e8806a;
            box-shadow: 0 2px 12px rgba(232,128,106,0.35);
            cursor: pointer;
          }
        `}</style>

        <input
          type="range"
          min={3000}
          max={9000}
          step={100}
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="dh-slider"
        />

        {/* Tick labels — positioned at true % along the 3k–10k range */}
        <div style={{ position: "relative", height: "1.5rem", marginTop: "0.75rem" }}>
          {[3000, 5000, 8000, 9000].map((v) => {
            const nudge: Record<number, number> = { 5000: 1.25, 8000: -1.25 };
            const pos = ((v - 3000) / (9000 - 3000)) * 100 + (nudge[v] ?? 0);
            return (
              <span
                key={v}
                onClick={() => setSliderVal(v)}
                style={{
                  position: "absolute",
                  left: `${pos}%`,
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.78rem",
                  color: sliderVal === v ? "var(--coral)" : "var(--text-soft)",
                  fontWeight: sliderVal === v ? 700 : 400,
                  transition: "color 0.2s",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                €{v.toLocaleString()}
              </span>
            );
          })}
        </div>
      </div>

      {/* Active tier card */}
      <motion.div
        key={tier.value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          maxWidth: "560px",
          margin: "0 auto 2rem",
          backgroundColor: `${tier.accent}10`,
          border: `1.5px solid ${tier.accent}44`,
          borderRadius: "16px",
          padding: "2rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--text-dark)",
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          €{sliderVal.toLocaleString()}
        </p>
        <p
          style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: tier.accent,
            marginBottom: "0.75rem",
            opacity: 0.9,
          }}
        >
          {tier.name}
        </p>
      </motion.div>

      {/* Financial Aid */}
      <p
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(1rem, 2vw, 1.1rem)",
          color: "var(--text-soft)",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Financial Aid Available — Send Carolin a message.
      </p>
    </motion.section>
  );
}

function ThinRule() {
  return (
    <hr
      style={{
        border: "none",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)",
        margin: "3rem auto",
        maxWidth: "480px",
      }}
    />
  );
}

export default function HousesContent() {
  const wrapperClass = `${fraunces.variable} ${nunito.variable} ${playfair.variable}`;
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const openLightbox = useCallback((src: string) => setLightboxSrc(src), []);

  return (
    <div
      className={wrapperClass}
      style={{
        ["--cream" as string]: "#fdf8f0",
        ["--coral" as string]: "#e8806a",
        ["--terra" as string]: "#c95f45",
        ["--gold" as string]: "#e8b84b",
        ["--sage" as string]: "#8cb89a",
        ["--lavender" as string]: "#b8a8d4",
        ["--text-dark" as string]: "#231810",
        ["--text-mid" as string]: "#5a3828",
        ["--text-soft" as string]: "#8a6050",
        backgroundColor: "var(--cream)",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>

      <PageBackground />

      <div style={{ position: "relative", zIndex: 3 }}>
        <Navigation variant="light" />

        {/* Hero */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "25vh",
            padding: "6rem 1.5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.8rem, 6.3vw, 5.6rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
            }}
          >
            Houses
          </motion.h1>

        </section>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 2rem 6rem" }}>

          {/* Chapter listings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.08rem, 2.21vw, 1.72rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              Next chapter:{" "}
              <a
                href="#fools-valley"
                style={{ color: "var(--coral)", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" }}
              >
                Fools Valley, Portugal
              </a>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              4th July &ndash; 2nd August 2026
            </p>

            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.08rem, 2.21vw, 1.72rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Past chapter:{" "}
              <a
                href="https://docs.google.com/presentation/d/1Mj1q4NIkL4EF7BFH0IJh_JKF-L6K33JQ98KiO-gWBgQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--coral)", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" }}
              >
                El Salvador
              </a>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              February 2025
            </p>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                fontStyle: "italic",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              More chapters coming soon &mdash;{" "}
              <a
                href="https://forms.gle/SPc8q7K1UsmV5iWF9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--coral)", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" }}
              >
                apply here
              </a>{" "}
              to register interest
            </p>
          </motion.section>

          {/* Photo 1 — full-width cinematic banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onClick={() => openLightbox("/images/houses/fools-valley-8_a.jpg")}
            style={{
              position: "relative",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              height: "55vh",
              overflow: "hidden",
              marginBottom: "3rem",
              cursor: "zoom-in",
            }}
          >
            <Image
              src="/images/houses/fools-valley-8_a.jpg"
              alt="Fools Valley, Portugal"
              fill
              style={{
                objectFit: "cover",
                filter: "saturate(0.82)",
              }}
              sizes="100vw"
            />
            {/* Dreamy cream overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(253,248,240,0.08) 0%, rgba(253,248,240,0.18) 100%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Rituals & Rhythms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.08rem, 2.21vw, 1.72rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              The rituals &amp; the rhythms
            </h2>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: "var(--text-soft)",
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              Enough structure to hold you, enough spaciousness to surprise you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {[
                {
                  icon: "🌙",
                  title: "The Opening Ceremony: A Mystery School for Connection",
                  body: "Your first weekend together is a mystery school for connection. Everyone must arrive by 12pm on July 4th. It\u2019s super important we open the experience together.",
                },
                {
                  icon: "🪄",
                  title: "Whiteboard",
                  body: "A whiteboard that each of you is encouraged to fill with your ideas and offerings.",
                },
                {
                  icon: "🍵",
                  title: "Daily Rituals",
                  body: "Sunrise tea ceremonies, morning intention settings, movement, lunch & learns\u2026 we get to create them, together.",
                },
                {
                  icon: "💻",
                  title: "Deep Work",
                  body: "Opportunities created to get into deep focus with supportive accountability and collaboration if useful. It could be your most productive month of the year.",
                },
                {
                  icon: "✨",
                  title: "Peer Workshops",
                  body: "Everyone in this house knows something the others don\u2019t. We make structured space for that exchange. You will teach. You will be taught. Often by the person you least expected.",
                },
                {
                  icon: "🌿",
                  title: "Giving Back",
                  body: "Opportunities to give back to the local community. Being of service.",
                },
                {
                  icon: "🔮",
                  title: "Community & Hosting",
                  body: "Some days the valley belongs only to us \u2014 intimate, held, sacred. Other days we open the gates and invite our wider European community in.",
                },
              ].map((ritual) => (
                <motion.div
                  key={ritual.title}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center" }}
                >
                  <span style={{ fontSize: "1.5rem" }}>
                    {ritual.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "clamp(1rem, 2vw, 1.15rem)",
                        fontWeight: 400,
                        color: "var(--text-dark)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {ritual.title}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(1.09rem, 2.07vw, 1.21rem)",
                        lineHeight: 1.75,
                        color: "var(--text-mid)",
                      }}
                    >
                      {ritual.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Photo grid — 3-column: 6 (vertical) | 2 (center) | 7 (vertical) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              marginBottom: "1.5rem",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            {[
              { src: "/images/houses/fools-valley-6.jpg", alt: "Fools Valley — the estate" },
              { src: "/images/houses/fools-valley-7.jpg", alt: "Fools Valley — the gardens" },
              { src: "/images/houses/fools-valley-2.jpg", alt: "Fools Valley — the valley" },
            ].map((img) => (
              <div
                key={img.src}
                onClick={() => openLightbox(img.src)}
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(35,24,16,0.10)",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover", filter: "saturate(0.88)" }}
                  sizes="33vw"
                />
              </div>
            ))}
          </motion.div>

          {/* Second row — 2-column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              marginBottom: "3rem",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            {[
              { src: "/images/houses/fools-valley-0.jpg", alt: "Fools Valley — overview" },
              { src: "/images/houses/fools-valley-9.jpg", alt: "Fools Valley — evening light" },
            ].map((img) => (
              <div
                key={img.src}
                onClick={() => openLightbox(img.src)}
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(35,24,16,0.10)",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover", filter: "saturate(0.88)" }}
                  sizes="50vw"
                />
              </div>
            ))}
          </motion.div>

          <ThinRule />

          {/* Fools Valley */}
          <motion.section
            id="fools-valley"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.54rem, 3.15vw, 2.45rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              <a
                href="https://maps.app.goo.gl/2i8Y1mDy1rbo8vun6"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--coral)", textDecoration: "none" }}
              >
                Fools Valley
              </a>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "clamp(1.15rem, 2.3vw, 1.32rem)", lineHeight: 1.85, color: "var(--text-mid)", textAlign: "center" }}>
              <p>Deep in Portugal, there is a place called{" "}
                <a
                  href="https://maps.app.goo.gl/2i8Y1mDy1rbo8vun6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--coral)", textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" }}
                >
                  Fools Valley
                </a>.
              </p>
              <p>
                Down a road that feels like it&apos;s keeping a secret. Past the
                olive groves. Into a private valley that somehow manages to be
                thirty minutes from Lisbon and twenty from the Atlantic and feel
                like neither. Like something older. Something that was waiting.
              </p>
              <p>
                This is your home for the month. Not a hotel. Not a venue. A home
                with a pool, a pond, a sauna, a dance hall, a co-working space
                where ideas arrive easily, and a private chef who conjures three
                nourishing meals a day from things that grew nearby.
              </p>
              <p>
                Everything here is designed, quietly and carefully, to bring you
                back to yourself. Your circadian rhythm, the one the modern world
                quietly broke slowly returns. You sleep deeply. Think clearly. Feel
                more like yourself, or perhaps like the person you always suspected
                you could be.
              </p>
            </div>

            {/* Amenities */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem 1rem",
                justifyContent: "center",
                marginTop: "2.5rem",
                color: "var(--text-soft)",
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              }}
            >
              {[
                "Private bedrooms", "Co-working space", "Sauna & pool",
                "Private pond", "Dance hall", "Private chef",
                "3 meals daily", "Workshop spaces",
                "30 min from Lisbon", "20 min from the Ocean",
                "Alcohol & Cigarette free",
              ].map((item, i) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {i > 0 && <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>·</span>}
                  {item}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Photo 4 — wide single, full-width */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            onClick={() => openLightbox("/images/houses/fools-valley-3.jpg")}
            style={{
              position: "relative",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              aspectRatio: "16/7",
              overflow: "hidden",
              marginBottom: "3rem",
              cursor: "zoom-in",
            }}
          >
            <Image
              src="/images/houses/fools-valley-3.jpg"
              alt="Fools Valley — a quiet corner"
              fill
              style={{ objectFit: "cover", filter: "saturate(0.85)" }}
              sizes="100vw"
            />
          </motion.div>

          <ThinRule />

          {/* French Castle */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.08rem, 2.21vw, 1.72rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                marginBottom: "1.5rem",
              }}
            >
              And then: a French castle
            </h2>

            <p
              style={{
                fontSize: "clamp(1.15rem, 2.3vw, 1.32rem)",
                lineHeight: 1.85,
                color: "var(--text-mid)",
                textAlign: "center",
              }}
            >
              <span
                onClick={() => openLightbox("/images/houses/french-castle.jpg")}
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "auto",
                  height: "8em",
                  aspectRatio: "3/4",
                  borderRadius: "6px",
                  overflow: "hidden",
                  float: "right",
                  marginLeft: "1rem",
                  marginBottom: "0.25rem",
                  flexShrink: 0,
                  verticalAlign: "middle",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src="/images/houses/french-castle.jpg"
                  alt="A French castle"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </span>
              For those who wish to continue the story, an invitation awaits. The
              week immediately after Portugal, a curated festival in a stunning
              ch&acirc;teau in France. The same spirit. A grander stage. Optional.
            </p>
          </motion.section>

          <ThinRule />

          {/* Dream Dues */}
          <DreamDuesSlider />

          <ThinRule />

          {/* Closing CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <a
              href="https://forms.gle/SPc8q7K1UsmV5iWF9"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                letterSpacing: "0.08em",
                color: "#fdf8f0",
                backgroundColor: "var(--coral)",
                borderRadius: "999px",
                padding: "0.85rem 2.5rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              If you&apos;re interested, apply here.
            </a>
          </motion.section>

          <ThinRule />

          {/* Photo 5 — closing 2-photo strip, full-width */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "5rem",
              width: "100vw",
              marginLeft: "calc(-50vw + 50%)",
              padding: "0 1rem",
              boxSizing: "border-box",
            }}
          >
            <div
              onClick={() => openLightbox("/images/houses/fools-valley-5.jpg")}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(35,24,16,0.10)",
                cursor: "zoom-in",
              }}
            >
              <Image
                src="/images/houses/fools-valley-5.jpg"
                alt="Fools Valley — parting glimpse"
                fill
                style={{ objectFit: "cover", filter: "saturate(0.85)" }}
                sizes="375px"
              />
            </div>
            <div
              onClick={() => openLightbox("/images/houses/fools-valley-1.jpg")}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(35,24,16,0.10)",
                cursor: "zoom-in",
              }}
            >
              <Image
                src="/images/houses/fools-valley-1.jpg"
                alt="Fools Valley — the valley at rest"
                fill
                style={{ objectFit: "cover", filter: "saturate(0.82)" }}
                sizes="375px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
