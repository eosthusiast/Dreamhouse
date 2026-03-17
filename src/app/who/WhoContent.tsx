"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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

// ── Helpers ────────────────────────────────────────────────────────────
function ThinRule() {
  return (
    <hr
      style={{
        border: "none",
        height: "1px",
        background:
          "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)",
        margin: "3rem auto",
        maxWidth: "480px",
      }}
    />
  );
}


// Section label above headings
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-nunito)",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--coral)",
        marginBottom: "1.4rem",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}


const TAGS = [
  { label: "kind", type: "tc" },
  { label: "curious", type: "ts" },
  { label: "mischievous", type: "tl" },
  { label: "morally ambitious", type: "tc" },
  { label: "creative", type: "tg" },
  { label: "wonderers", type: "tk" },
  { label: "builders", type: "ts" },
  { label: "dreamers", type: "tl" },
];


// ── Main component ─────────────────────────────────────────────────────
export default function WhoContent() {
  const wrapperClass = `${fraunces.variable} ${nunito.variable} ${playfair.variable}`;
  const [tagIndex, setTagIndex] = useState(0);
  const [showBullets, setShowBullets] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTagIndex((i) => (i + 1) % TAGS.length), 2500);
    return () => clearInterval(id);
  }, []);
  // Show bullets after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBullets(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  // Match body background to page theme (prevent dark peek-through)
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#faf4ea";
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <>
    <PageBackground />
    <div
      className={wrapperClass}
      style={{
        // Color tokens
        ["--cream" as string]: "#faf4ea",
        ["--coral" as string]: "#e8806a",
        ["--terra" as string]: "#c95f45",
        ["--gold" as string]: "#e8b84b",
        ["--sage" as string]: "#8cb89a",
        ["--lavender" as string]: "#b8a8d4",
        ["--text-dark" as string]: "#231810",
        ["--text-mid" as string]: "#5a3828",
        ["--text-soft" as string]: "#8a6050",
        ["--night" as string]: "#1c1018",
        backgroundColor: "var(--cream)",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
      data-page-wrapper
    >

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <Navigation variant="light" />

        {/* ── Hero ── */}
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
            Who is this{" "}
            <em style={{ color: "var(--coral)", fontStyle: "italic" }}>for?</em>
          </motion.h1>
        </section>

        {/* Banner photo with rotator overlay */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            position: "relative",
            width: "100vw",
            height: "55vh",
            overflow: "hidden",
            marginBottom: "3rem",
          }}
        >
          <Image
            src="/images/sections/pexels-lum3n.jpg"
            alt="Nature landscape"
            fill
            priority
            style={{
              objectFit: "cover",
              filter: "saturate(0.85)",
            }}
            sizes="100vw"
          />
          {/* Darkening overlay for text legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Rotator overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#faf4ea",
                  textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                  textAlign: "center",
                }}
              >
                <p style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                  margin: "0 0 0.15em",
                  opacity: 0.85,
                }}>
                  We are
                </p>
                <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", minHeight: "1.3em" }}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={tagIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.5 }}
                      style={{ margin: 0 }}
                    >
                      {TAGS[tagIndex].label}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Yes-list + CTA ── */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem 6rem" }}>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(0.89rem, 1.79vw, 1.34rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-soft)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            This is for the ambitious weirdos &amp; genuinely good eggs.
          </motion.p>

          {/* Yes-list — each item reveals individually on scroll */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "We accidentally inspire people, constantly",
              "We believe joy and ambition belong in the same room",
              "We share our gifts and being of service energises us",
              "We have something we're building that means something to us",
              "We miss the kind of community that was just around us earlier in life",
              "We get genuinely energised by people who think differently to us",
              "We are willing to be fully seen and see others honestly",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={showBullets ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: showBullets ? i * 0.5 : 0 }}
                whileHover={{ borderColor: "var(--coral)" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1.4rem 1.8rem",
                  borderRadius: "14px",
                  border: "1.5px solid rgba(232,196,176,0.35)",
                  backgroundColor: "rgba(253,248,240,0.55)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  textAlign: "center",
                }}
              >
                <span style={{ color: ["var(--coral)", "#3a8055", "#b08018", "#6048a0", "#2878a0"][i % 5], fontSize: "0.75rem" }}>✦</span>
                <span style={{ fontSize: "1.26rem", lineHeight: 1.7, color: "var(--text-mid)" }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", paddingTop: "3rem", position: "relative" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,128,106,0.10) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                position: "relative",
              }}
            >
              <motion.a
                href="/houses"
                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(232,128,106,0.45)" }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#faf4ea",
                  background: "linear-gradient(135deg, var(--coral), var(--terra))",
                  padding: "0.85rem 2.5rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(232,128,106,0.35)",
                }}
              >
                Upcoming Dream House
              </motion.a>
              <motion.a
                href="https://forms.gle/SPc8q7K1UsmV5iWF9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(184,168,212,0.45)" }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#faf4ea",
                  background: "linear-gradient(135deg, var(--lavender), #8a7cb8)",
                  padding: "0.85rem 2.5rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(184,168,212,0.35)",
                }}
              >
                Apply Now
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* ── Dark "not for you" section ── */}
        <section
          style={{
            backgroundColor: "var(--night)",
            padding: "5rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* dark blobs */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[
              { color: "rgba(232,128,106,0.08)", top: "10%", left: "5%", size: 320 },
              { color: "rgba(184,168,212,0.07)", bottom: "15%", right: "8%", size: 280 },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "top" in b ? b.top : undefined,
                  bottom: "bottom" in b ? b.bottom : undefined,
                  left: "left" in b ? b.left : undefined,
                  right: "right" in b ? b.right : undefined,
                  width: b.size,
                  height: b.size,
                  borderRadius: "50%",
                  background: b.color,
                  filter: "blur(60px)",
                }}
              />
            ))}
          </div>

          <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel>A note of honesty</SectionLabel>

              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.54rem, 3.15vw, 2.52rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  color: "rgba(253,220,200,0.95)",
                  textAlign: "center",
                  marginBottom: "3rem",
                }}
              >
                This probably <em style={{ color: "rgba(232,128,106,0.85)", fontStyle: "italic" }}>isn&apos;t</em> for you if
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  "You need alcohol to have fun",
                  "You're looking for a conference, a vacation, or a structured curriculum",
                  "You need every outcome guaranteed before you arrive",
                  "You want to observe from the edges",
                ].map((title, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "2rem 0",
                      borderBottom: "1px solid rgba(253,220,200,0.08)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontSize: "1.1rem",
                        color: "rgba(232,128,106,0.7)",
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        color: "rgba(253,220,200,0.9)",
                      }}
                    >
                      {title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Founder section (wider, outside 760px container) ── */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "5rem 2rem 0" }}>
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "4rem" }}
          >
            <div
              style={{
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(232,128,106,0.1) 0%, rgba(184,168,212,0.12) 50%, rgba(140,184,154,0.1) 100%)",
                padding: "2.5rem 2rem 3rem",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.26rem, 2.8vw, 1.96rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "var(--text-dark)",
                  marginBottom: "2rem",
                }}
              >
                Hello, I&apos;m Carolin Fleissner
              </h2>

              {/* Main photo */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(35,24,16,0.18)",
                  marginBottom: "2rem",
                }}
              >
                <Image
                  src="/images/who/carolin-beach-1.png"
                  alt="Carolin Fleissner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 576px"
                  priority
                />
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  lineHeight: 2,
                  color: "var(--text-mid)",
                  marginBottom: "2rem",
                }}
              >
                <p>
                  The Dream House was born from my lifelong fascination with what
                  makes humans dream bigger, do the impossible, and live with more
                  presence, vitality, and love. It emerged from a decade spent
                  building intentional teams and cultures{" "}
                  <em style={{ color: "var(--text-soft)" }}>
                    (which resulted in creating a multi-billion-dollar company that
                    taught cars to drive themselves.)
                  </em>{" "}
                  Combined with the last few years that I have spent immersing
                  myself in transformational containers around the world. After
                  witnessing how culture can drive billion-dollar innovation, I
                  became fascinated by how it might shape more loving, creative,
                  and conscious ways of living.
                </p>
              </div>

              {/* Frosted glass blockquote */}
              <blockquote
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "var(--terra)",
                  padding: "2.5rem",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(232,128,106,0.3)",
                  backgroundColor: "rgba(255,255,255,0.52)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  margin: "3.5rem 0",
                  textAlign: "center",
                }}
              >
                This is my passionate project. A gift. I join the experiment
                just like everyone else, and am along for the rollercoaster,
                the adventure.
              </blockquote>

              {/* Additional photos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { src: "/images/who/carolin-beach-2.png", alt: "Carolin at the beach" },
                  { src: "/images/who/carolin-singing.png", alt: "Carolin singing" },
                ].map((img) => (
                  <div
                    key={img.src}
                    style={{
                      position: "relative",
                      aspectRatio: "3/4",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 12px 40px rgba(35,24,16,0.14)",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 45vw, 280px"
                    />
                  </div>
                ))}
              </div>

            </div>
          </motion.section>
        </div>

        {/* ── Content container (continued after founder) ── */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem" }}>
          <ThinRule />

          {/* ── Testimonials ── */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: "4rem", textAlign: "center" }}
          >
            <SectionLabel>From Past Residents</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.54rem, 3.15vw, 2.52rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                color: "var(--text-dark)",
                marginBottom: "2rem",
              }}
            >
              What people <em style={{ fontStyle: "italic" }}>say</em>
            </h2>

            <p
              style={{
                fontSize: "1.15rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "var(--text-dark)",
                maxWidth: "660px",
                margin: "0 auto 2rem",
              }}
            >
              In 2025, we ran our first experiment. People called it
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {[
                "a home for inspiring people to be inspired",
                "a manifestation accelerator",
                "a container for miracles",
                "the most fertile soil for transformation",
              ].map((quote) => (
                <motion.p
                  key={quote}
                  whileHover={{ color: "var(--coral)" }}
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "var(--text-soft)",
                    cursor: "default",
                    transition: "color 0.5s",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </motion.p>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "1.15rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "var(--text-dark)",
                maxWidth: "660px",
                margin: "0 auto 2rem",
              }}
            >
              <p>Some fell in love.</p>
              <p>Some launched companies.</p>
              <p>Others met parts of themselves they&apos;d never known.</p>
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "var(--text-dark)",
                opacity: 0.7,
                lineHeight: 1.65,
              }}
            >
              It was the kind of place where
              <br />
              everything felt possible.
            </p>
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "1.06rem",
                color: "var(--text-soft)",
                opacity: 0.7,
                marginTop: "0.75rem",
              }}
            >
              As it does when you&apos;re surrounded by the right community.
            </p>
          </motion.section>

          <ThinRule />

          {/* ── Bottom CTA ── */}
          <div style={{ textAlign: "center", paddingBottom: "5rem", position: "relative" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,128,106,0.10) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                position: "relative",
              }}
            >
              <motion.a
                href="/houses"
                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(232,128,106,0.45)" }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#faf4ea",
                  background: "linear-gradient(135deg, var(--coral), var(--terra))",
                  padding: "0.85rem 2.5rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(232,128,106,0.35)",
                }}
              >
                Upcoming Dream House
              </motion.a>
              <motion.a
                href="https://forms.gle/SPc8q7K1UsmV5iWF9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(184,168,212,0.45)" }}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#faf4ea",
                  background: "linear-gradient(135deg, var(--lavender), #8a7cb8)",
                  padding: "0.85rem 2.5rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(184,168,212,0.35)",
                }}
              >
                Apply Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
