"use client";

import { useState } from "react";
import { motion } from "motion/react";
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

function TarotCard({ principleColor, title }: { principleColor: string; title: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "800px", width: "200px", height: "300px", flexShrink: 0 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((f) => !f)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        {/* Back face (tarot image) — shown by default */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(35,24,16,0.18)",
          }}
        >
          <Image
            src="/images/principles/tarot-back.jpg"
            alt="Tarot card back"
            fill
            style={{ objectFit: "cover" }}
            sizes="200px"
          />
        </div>

        {/* Front face (colored side) — revealed on flip */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(35,24,16,0.18)",
            backgroundColor: "#1a1a4e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>✦</span>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "0.85rem",
              fontStyle: "italic",
              color: principleColor,
              textAlign: "center",
              padding: "0 1rem",
              lineHeight: 1.4,
            }}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

const PRINCIPLES = [
  {
    title: "Be a dreamer",
    body: "Everything IS possible. Question the limiting belief, not the dream.",
    color: "#e8806a",
  },
  {
    title: "Be ridiculous",
    body: "Play. Be silly. Take your masks off. No need for performing here. Fail. Take risks. Just try, and laugh at yourself when it doesn't work out, knowing that you are one step closer to brilliance.",
    color: "#e8b84b",
  },
  {
    title: "Be embodied",
    body: "We move, rest, eat, and breathe with intention. We live in rhythm with nature. Your body knows things your mind talks you out of. This is the place where you get to listen.",
    color: "#8cb89a",
  },
  {
    title: "Be abundant",
    body: "We are generous with our gifts. We trust that everything we need, we already have. And we give freely — in time, in energy, in kindness.",
    color: "#b8a8d4",
  },
  {
    title: "Be a maverick",
    body: "Do it your way. Be authentic, be bold. There's no template here, just you, doing the thing only you can do.",
    color: "#9ec8e0",
  },
];

export default function PrinciplesContent() {
  const wrapperClass = `${fraunces.variable} ${nunito.variable} ${playfair.variable}`;

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
            minHeight: "35vh",
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.45rem, 5.6vw, 4.9rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
            }}
          >
            Principles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              maxWidth: "520px",
              marginBottom: "3rem",
            }}
          >
            <span style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(0.89rem, 1.79vw, 1.34rem)",
              fontWeight: 400,
              color: "var(--text-soft)",
              display: "block",
              marginBottom: "0.3rem",
            }}>
              Where inspiring people go to get inspired.
            </span>
            <span style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(0.75rem, 1.4vw, 1.05rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-soft)",
            }}>
              A detox from the modern world and its limiting beliefs.
            </span>
          </motion.p>
        </section>

        {/* Content container */}
        <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 2rem 6rem" }}>

          {/* Divider */}
          <hr style={{ border: "none", height: "1px", background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)", margin: "0 auto 3rem", maxWidth: "480px" }} />

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.85,
                color: "var(--text-mid)",
              }}
            >
              I could tell you that integrity, curiosity, kindness etc is
              important. And they are. Those are expected&hellip;.
              <br />
              <br />
              <span style={{ color: "var(--coral)", fontWeight: 360 }}>
                These are the principles that make us a little more unique:
              </span>
            </p>
          </motion.section>

          {/* Principles */}
          {PRINCIPLES.map((principle, idx) => {
            const cardLeft = idx % 2 === 0;
            return (
              <div key={principle.title}>
                {/* Coloured rule divider */}
                {idx > 0 && (
                  <div style={{ display: "flex", justifyContent: "center", margin: "3rem auto" }}>
                    <div style={{ width: "80px", height: "1px", backgroundColor: `${principle.color}66` }} />
                  </div>
                )}

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ marginBottom: 0 }}
                >
                  {/* Mobile: stack card above text; Desktop: side-by-side */}
                  <style>{`
                    @media (max-width: 767px) {
                      .tarot-row { flex-direction: column !important; align-items: center !important; }
                      .tarot-card-wrap { width: 60% !important; margin-bottom: 1.5rem; }
                    }
                  `}</style>
                  <div
                    className="tarot-row"
                    style={{
                      display: "flex",
                      flexDirection: cardLeft ? "row" : "row-reverse",
                      alignItems: "center",
                      gap: "2.5rem",
                    } as React.CSSProperties}
                  >
                    <div className="tarot-card-wrap" style={{ flexShrink: 0 }}>
                      <TarotCard principleColor={principle.color} title={principle.title} />
                    </div>

                    <div style={{ flex: 1, textAlign: "center" }}>
                      <h2
                        style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: "clamp(1.4rem, 3.5vw, 2.24rem)",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.15,
                          color: "var(--text-dark)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <span style={{ borderBottom: `3px solid ${principle.color}`, paddingBottom: "0.2rem" }}>
                          {principle.title}
                        </span>
                      </h2>

                      <p
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontSize: "clamp(1rem, 2vw, 1.15rem)",
                          fontWeight: 300,
                          lineHeight: 1.85,
                          color: "var(--text-mid)",
                        }}
                      >
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </motion.section>
              </div>
            );
          })}

          {/* Final divider */}
          <div style={{ display: "flex", justifyContent: "center", margin: "3rem auto" }}>
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(to right, transparent, rgba(232,128,106,0.35), transparent)" }} />
          </div>

        </div>
      </div>
    </div>
  );
}
