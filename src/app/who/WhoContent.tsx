"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import PageBackground from "@/components/PageBackground";
import { Fraunces, Nunito } from "next/font/google";

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

// Tag color configs
const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  tc: { bg: "rgba(232,128,106,0.12)", color: "var(--coral)", border: "rgba(232,128,106,0.35)" },
  tg: { bg: "rgba(232,184,75,0.12)", color: "#b08018", border: "rgba(232,184,75,0.4)" },
  ts: { bg: "rgba(140,184,154,0.15)", color: "#3a8055", border: "rgba(140,184,154,0.4)" },
  tl: { bg: "rgba(184,168,212,0.15)", color: "#6048a0", border: "rgba(184,168,212,0.4)" },
  tk: { bg: "rgba(158,200,224,0.15)", color: "#2878a0", border: "rgba(158,200,224,0.4)" },
};

const TAGS = [
  { label: "The Kind", type: "tc" },
  { label: "The Curious", type: "ts" },
  { label: "The Mischievous", type: "tl" },
  { label: "The Morally Ambitious", type: "tc" },
  { label: "The Creatives", type: "tg" },
  { label: "The Wonderers", type: "tk" },
  { label: "The Builders", type: "ts" },
  { label: "The Dreamers", type: "tl" },
];

const BULLET_COLORS = ["var(--coral)", "#3a8055", "#b08018", "#6048a0", "#2878a0"];

// ── Main component ─────────────────────────────────────────────────────
export default function WhoContent() {
  const wrapperClass = `${fraunces.variable} ${nunito.variable}`;

  return (
    <div
      className={wrapperClass}
      style={{
        // Color tokens
        ["--cream" as string]: "#fdf8f0",
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
    >
      {/* ── Background ── */}
      <PageBackground />

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
            minHeight: "40vh",
            padding: "6rem 1.5rem 3rem",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: "1.25rem",
              opacity: 0.9,
            }}
          >
            Dream House
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(4rem, 9vw, 8rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-dark)",
              marginBottom: "1.25rem",
              maxWidth: "800px",
              whiteSpace: "nowrap",
            }}
          >
            Who Is This{" "}
            <em style={{ color: "var(--coral)", fontStyle: "italic" }}>For?</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-soft)",
              maxWidth: "480px",
              marginBottom: "6rem",
            }}
          >
            You already know.
          </motion.p>
        </section>

        {/* ── CTA (top) ── */}
        <div style={{ textAlign: "center", padding: "0 2rem 6rem", position: "relative" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,128,106,0.10) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.a
            href="https://forms.gle/SPc8q7K1UsmV5iWF9"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(232,128,106,0.45)" }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fdf8f0",
              background: "linear-gradient(135deg, var(--coral), var(--terra))",
              padding: "0.85rem 2.5rem",
              borderRadius: "999px",
              textDecoration: "none",
              position: "relative",
              boxShadow: "0 4px 24px rgba(232,128,106,0.35)",
            }}
          >
            Apply here
          </motion.a>
        </div>

        {/* ── Content container ── */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem 6rem" }}>

          <ThinRule />

          {/* ── Ambitious Weirdos / Yes section ── */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "4rem", textAlign: "center" }}
          >
            {/* intro-lead: not a display heading — large body paragraph */}
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
                fontWeight: 400,
                lineHeight: 1.45,
                color: "var(--text-mid)",
                marginBottom: "1.5rem",
              }}
            >
              This is for the{" "}
              <em style={{ color: "var(--coral)", fontStyle: "italic" }}>ambitious weirdos.</em>
              <br />
              The Genuinely Good Eggs.
            </p>

            {/* Type tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {TAGS.map((tag) => {
                const s = TAG_STYLES[tag.type];
                return (
                  <span
                    key={tag.label}
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      padding: "0.55rem 1.3rem",
                      borderRadius: "999px",
                      border: `1.5px solid ${s.border}`,
                      backgroundColor: s.bg,
                      color: s.color,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {tag.label}
                  </span>
                );
              })}
            </div>

            <p
              style={{
                fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--text-mid)",
                maxWidth: "660px",
                margin: "0 auto 2.5rem",
              }}
            >
              The ones who are done waiting for life to get interesting
              <br />
              and have decided to make it that way themselves.
            </p>

            {/* Frosted glass yes-list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
              {[
                "You want to experiment with how to live more fully",
                "You want to figure out how to be of greater service to the world",
                "You're ready to dream bigger than you've let yourself before",
                "You believe joy and ambition belong in the same room",
                "You're genuinely interested in other people — not just networking, actually interested",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6, borderColor: "var(--coral)" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.4rem 1.8rem",
                    borderRadius: "14px",
                    border: "1.5px solid rgba(232,196,176,0.35)",
                    backgroundColor: "rgba(253,248,240,0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    style={{
                      color: BULLET_COLORS[i % BULLET_COLORS.length],
                      fontSize: "0.75rem",
                      marginTop: "0.3rem",
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  <span style={{ fontSize: "1.26rem", lineHeight: 1.7, color: "var(--text-mid)" }}>{item}</span>
                </motion.div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "var(--text-soft)",
                marginTop: "2rem",
                lineHeight: 1.65,
              }}
            >
              You don&apos;t need to have it figured out.
              <br />
              You just need to be willing to show up and find out.
            </p>
          </motion.section>

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
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
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
                  {
                    title: "You need alcohol to have fun",
                    body: "Dream House runs on something different. Genuine connection, deep conversation, and a dance hall that doesn't need a bar to get going.",
                  },
                  {
                    title: "You're looking for a conference, a vacation, or a structured curriculum",
                    body: "Dream House is a container, not a course. What you get out of it depends entirely on what you bring.",
                  },
                  {
                    title: "You need every outcome guaranteed before you arrive",
                    body: "The most important things that will happen to you here aren't on any agenda. They arrive sideways.",
                  },
                  {
                    title: "You want to observe from the edges",
                    body: "Everyone here contributes. That's not optional — it's the whole point.",
                  },
                  {
                    title: "This is someone else's idea of your yes",
                    body: "This has to come from you. Fully, freely, and genuinely.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.8rem 1fr",
                      gap: "0 1rem",
                      padding: "2rem 0",
                      borderBottom: "1px solid rgba(253,220,200,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontSize: "1.1rem",
                        color: "rgba(232,128,106,0.7)",
                        fontWeight: 700,
                        paddingTop: "0.15rem",
                      }}
                    >
                      ✕
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color: "rgba(253,220,200,0.9)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: "1.14rem",
                          lineHeight: 1.65,
                          color: "rgba(253,220,200,0.5)",
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Content container (continued) ── */}
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem" }}>

          {/* ── Different fields ── */}
          <div style={{ paddingTop: "4rem" }} />
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: "4rem" }}
          >
            <SectionLabel>The Community</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Different fields.
              <br />
              <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Same orientation.</em>
            </h2>

            {/* Fields list as individual spans */}
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: "1.2rem",
                fontWeight: 300,
                color: "var(--text-mid)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "0 0",
                marginBottom: "1.75rem",
                lineHeight: 2,
              }}
            >
              {[
                "Founders", "Writers", "Designers", "Artists",
                "Researchers", "Builders", "Makers", "Coaches",
                "Strategists", "Photographers",
              ].map((field) => (
                <span key={field} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{ transition: "color 0.2s", cursor: "default" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--coral)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = ""; }}
                  >
                    {field}
                  </span>
                  <span style={{ opacity: 0.4, margin: "0 0.5em" }}>·</span>
                </span>
              ))}
              <em>and everything in between</em>
            </div>

            <p
              style={{
                fontSize: "1.26rem",
                lineHeight: 1.95,
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              They come from different fields and different cities. What unites
              them isn&apos;t what they do. It&apos;s how they do it: with care,
              with curiosity, and with the quiet conviction that their work
              should mean something.
            </p>

            {/* Fit list */}
            <ThinRule />
            <div style={{ paddingTop: "2.5rem" }}>
            <SectionLabel>The Real Filter</SectionLabel>

            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "var(--text-dark)",
                textAlign: "center",
                marginBottom: "1.75rem",
              }}
            >
              You might be a{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>great fit</em>{" "}
              if you
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                {
                  title: "Have something you're building that matters to you",
                  body: "A project, a business, a body of work — and you want a month of real momentum on it",
                },
                {
                  title: "Miss the kind of community you had earlier in life",
                  body: "When interesting people were just around — and you haven't quite found that again since",
                },
                {
                  title: "Get genuinely energised by people who think differently to you",
                  body: "Not as a networking strategy. Just because other minds are one of life's great pleasures",
                },
                {
                  title: "Are willing to be seen — and to see others — honestly",
                  body: "The real version. Not the polished one",
                },
                {
                  title: "Are ready to spend a month living beautifully instead of just efficiently",
                  body: "Because those two things were never supposed to be opposites",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ paddingLeft: "0.5rem" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.6rem 1fr",
                    gap: "0 0.75rem",
                    padding: "1.8rem 0",
                    borderBottom: i < 2 ? "1px solid rgba(232,128,106,0.1)" : "none",
                  }}
                >
                  <span style={{ color: "var(--gold)", paddingTop: "0.15rem" }}>✦</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        color: "var(--text-dark)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: 1.65,
                        color: "var(--text-soft)",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          </motion.section>

        </div>

        {/* ── Founder section (wider, outside 760px container) ── */}
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 2rem" }}>
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
                padding: "4.9rem 2rem 7rem",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "var(--text-dark)",
                  marginBottom: "0.5rem",
                }}
              >
                Who am I?
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--coral)",
                  marginBottom: "2rem",
                }}
              >
                Founder &amp; Host
              </p>

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
                  src="/Dreamhouse/images/who/carolin-beach-1.png"
                  alt="Carolin Fleissner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 576px"
                  priority
                />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--text-dark)",
                  marginBottom: "1.75rem",
                }}
              >
                I&apos;m Carolin Fleissner
              </p>

              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  lineHeight: 2,
                  color: "var(--text-mid)",
                  marginBottom: "2rem",
                }}
              >
                <p>
                  The Dream House was born from my lifelong fascination with what
                  makes humans dream bigger, do the impossible, and live with more
                  presence, vitality, and love.
                </p>
                <p>
                  It emerged from a decade spent building intentional teams and
                  cultures{" "}
                  <em style={{ color: "var(--text-soft)" }}>
                    (which resulted in creating a multi-billion-dollar company that
                    taught cars to drive themselves.)
                  </em>
                </p>
                <p>
                  Combined with the last few years that I have spent immersing
                  myself in transformational containers around the world. After
                  witnessing how culture can drive billion-dollar innovation, I
                  became fascinated by how it might shape more loving, creative,
                  and conscious ways of living.
                </p>
              </div>

              {/* Frosted glass blockquote — consolidated passage */}
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
                  textAlign: "left",
                }}
              >
                <p style={{ marginBottom: "1rem" }}>This is my passionate project. A gift.</p>
                <p style={{ marginBottom: "1rem" }}>
                  I don&apos;t quite know why I pour so much of myself into
                  building this, and yet, I know that I have to.
                </p>
                <p>That magic is waiting on the other side of it.</p>
              </blockquote>

              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  lineHeight: 1.85,
                  color: "var(--text-mid)",
                  marginBottom: "2rem",
                }}
              >
                <p>
                  I&apos;ll be in residence with you, not just coordinating from
                  the sidelines. This is a shared experience, not a service.
                </p>
              </div>

              {/* Additional photos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { src: "/Dreamhouse/images/who/carolin-beach-2.png", alt: "Carolin at the beach" },
                  { src: "/Dreamhouse/images/who/carolin-singing.png", alt: "Carolin singing" },
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

              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontSize: "1.08rem",
                  color: "var(--text-mid)",
                  lineHeight: 1.85,
                  marginTop: "2rem",
                }}
              >
                A shared experience. Not a service.
              </p>
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
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
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

          {/* ── Bottom spacer ── */}
          <div style={{ paddingBottom: "4rem" }} />
        </div>
      </div>
    </div>
  );
}
